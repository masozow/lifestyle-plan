import { Request, Response } from "express";
import {UserMealProgress , UserDailyMeal, UserDailyIntake, OpenAIResponse} from "../models/index.js";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";
import sequelize from "../config/sequelize.js";
import type { OpenAIResponsePayload } from "../types/openAIPlan.js"; 


const getUserMealPlan = async (req: Request, res: Response) => {
  const { userId } = req.params;
 if (!userId) {
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.warn,
        message: "Missing userId in request params",
      })
    );
  }
  try {
    const progress = await UserMealProgress.findOne({
      where: { userId },
      include: [
        {
          model: UserDailyMeal,
          include: [
            {
              model: UserDailyIntake,
              required: false, 
            },
          ],
        },
      ],
      order: [["date", "ASC"]],
    });

    return res.status(200).json({ success: true, data: progress });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error fetching meal plan for user ${userId}: ${(error as Error).message}`,
        userId: Number(userId),
        genericId: userId,
      })
    );
  }
};


 const upsertUserMealPlan = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { openAIResponseId, weekly_plan } = req.body;

  if (!userId || !openAIResponseId || !weekly_plan || !Array.isArray(weekly_plan)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const t = await sequelize.transaction();

  try {
    for (const day of weekly_plan) {
      const { day: date, meals } = day;

      let progress = await UserMealProgress.findOne({
        where: { userId, date },
        transaction: t,
      });

      if (!progress) {
        progress = await UserMealProgress.create(
          { userId, openAIResponseId, date },
          { transaction: t }
        );
      }

      const progressId = progress.id;

      for (const meal of meals) {
        const { meal: recommendedMeal, portion, macro } = meal;

        await UserDailyMeal.create(
          {
            userMealProgressId: progressId,
            recommendedMeal,
            targetPortion: portion,
            targetProtein: macro.protein,
            targetCarbs: macro.carbs,
            targetFat: macro.fat,
            targetEnergy: macro.energy,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();

    return res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "Meal plan upserted successfully",
        shouldSaveLog: true,
        userId,
        genericId: openAIResponseId.toString(),
      })
    );
  } catch (error) {
    await t.rollback();

    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error upserting meal plan: ${(error as Error).message}`,
        userId: userId || 0,
      })
    );
  }
};


export const getStructuredMealPlan = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const progressEntries = await UserMealProgress.findAll({
      where: { userId },
      include: [
        {
          model: UserDailyMeal,
          as: "dailyMeals",
          include: [{ model: UserDailyIntake, as: "intake", required: false }],
        },
        {
          model: OpenAIResponse,
          as: "openAIResponse",
          attributes: ["id", "response"],
        },
      ],
      order: [["date", "ASC"]],
    });

    if (!progressEntries.length) {
      return res.status(200).json({ success: true, data: [] });
    }

    const openAIResponse = progressEntries[0].openAIResponse;
    const { response } = openAIResponse as any;

    const weekMap: Record<string, any> = {};

    for (const entry of progressEntries) {
      const { date, dailyMeals } = entry;

      const matchingDay = (response.weekly_plan as any[]).find((d) => {
        console.log(`~ userMealPlan.controller.ts:46: date received => ${entry.date}  `);
        return new Date(entry.date).toISOString().split("T")[0] === new Date(d.date).toISOString().split("T")[0];
      });

      const weekDay = matchingDay?.day || date; // fallback if not found

      const meals = dailyMeals?.map((meal) => {
        const intake = meal.intake;
        return {
          id: meal.id,
          food: intake?.consumedFood ?? meal.recommendedMeal,
          meal: matchingDay?.meals.find((m) => m.food === meal.recommendedMeal)?.meal ?? meal.recommendedMeal,
          portion: intake?.consumedPortion ?? meal.targetPortion,
          macro: {
            protein: intake?.consumedProtein ?? meal.targetProtein,
            carbs: intake?.consumedCarbs ?? meal.targetCarbs,
            fat: intake?.consumedFat ?? meal.targetFat,
            energy: intake?.consumedEnergy ?? meal.targetEnergy,
          },
        };
      }) ?? [];

      weekMap[weekDay] = {
        day: weekDay,
        date,
        meals,
      };
    }

    const finalWeeklyPlan = Object.values(weekMap);

    const responseData = {
      id: openAIResponse.id,
      userPromptId: openAIResponse.userPromptId,
      userId,
      response: {
        meta: response.meta,
        units: response.units,
        unit_system: response.unit_system,
        macro_ratios: response.macro_ratios,
        daily_calorie_target: response.daily_calorie_target,
        weekly_plan: finalWeeklyPlan,
      },
      createdAt: openAIResponse.createdAt,
      updatedAt: openAIResponse.updatedAt,
    };

    return res.status(200).json({ success: true, data: [responseData] });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error structuring meal plan: ${(error as Error).message}`,
        userId,
      })
    );
  }
};


export const UserMealPlanController = {
  getUserMealPlan,
  upsertUserMealPlan,
  getStructuredMealPlan
}