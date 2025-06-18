import { Request, Response } from "express";
import {
  UserMealProgress,
  UserDailyMeal,
  UserDailyIntake,
  OpenAIResponse,
} from "../models/index.js";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";


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

const getStructuredMealPlan = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const progressEntries = await UserMealProgress.findAll({
      where: { userId },
      include: [
        {
          model: UserDailyMeal,
          as: "dailyMeals",
          include: [
            {
              model: UserDailyIntake,
              as: "intake",
              required: false,
            },
          ],
        },
      ],
      order: [["date", "ASC"]],
    });

    if (!progressEntries.length) {
      return res.status(200).json({ success: true, data: [] });
    }

    const {
      language,
      unitSystem,
      portionUnit,
      macroProteinUnit,
      macroCarbsUnit,
      macroFatUnit,
      macroEnergyUnit,
      dailyCalorieTarget,
      ratioProtein,
      ratioCarbs,
      ratioFat,
    } = progressEntries[0];

    const mealsByDay: Record<string, any[]> = {};

    for (const entry of progressEntries) {
      for (const meal of entry.dailyMeals || []) {
        if (!mealsByDay[meal.day]) {
          mealsByDay[meal.day] = [];
        }

        mealsByDay[meal.day].push({
          id: meal.id,
          food: meal.intake?.consumedFood ?? meal.recommendedMeal,
          meal: meal.recommendedMeal,
          portion: meal.intake?.consumedPortion ?? meal.targetPortion,
          macro: {
            protein: meal.intake?.consumedProtein ?? meal.targetProtein,
            carbs: meal.intake?.consumedCarbs ?? meal.targetCarbs,
            fat: meal.intake?.consumedFat ?? meal.targetFat,
            energy: meal.intake?.consumedEnergy ?? meal.targetEnergy,
          },
        });
      }
    }

    const weekly_plan = Object.entries(mealsByDay).map(([day, meals]) => ({
      day,
      date: meals[0]?.createdAt?.toISOString().split("T")[0] ?? null,
      meals,
    }));

    const responseData = {
      id: progressEntries[0].id,
      userPromptId: progressEntries[0].openAIResponseId,
      userId,
      response: {
        meta: {
          generated_at: progressEntries[0].createdAt.toISOString(),
          model: "llama-3.3-70b-versatile",
        },
        unit_system: unitSystem,
        units: {
          portion: portionUnit,
          macro: {
            protein: macroProteinUnit,
            carbs: macroCarbsUnit,
            fat: macroFatUnit,
            energy: macroEnergyUnit,
          },
        },
        macro_ratios: {
          protein: ratioProtein,
          carbs: ratioCarbs,
          fat: ratioFat,
        },
        daily_calorie_target: dailyCalorieTarget,
        weekly_plan,
      },
      createdAt: progressEntries[0].createdAt,
      updatedAt: progressEntries[0].updatedAt,
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
  getStructuredMealPlan,
};
