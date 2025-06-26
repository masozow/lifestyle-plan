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
    const progressEntries = await UserMealProgress.findOne({
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
        {
          model: OpenAIResponse,
          as: "openAIResponse",
          attributes: ["id", "userPromptId", "userId", "response", "createdAt", "updatedAt"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    if (!progressEntries) {
      return res.status(404).json({ success: false, message: "No meal plan found." });
    }

    const firstEntry = progressEntries;

    const parsedResponse = typeof firstEntry.openAIResponse?.response === "string"
      ? JSON.parse(firstEntry.openAIResponse.response)
      : firstEntry.openAIResponse?.response;

    const grouped: Record<string, { day: string; date: string | null; meals: any[]; day_macro_targets: { energy: number; protein: number; carbs: number; fat: number; } }> = {};

    const entry = progressEntries;
      for (const meal of entry.dailyMeals ?? []) {
        const intake = meal.intake;
        const mealDay = meal.day;

        if (!grouped[mealDay]) {
          grouped[mealDay] = {
            day: mealDay,
            date: meal.date ?? null,
            day_macro_targets: {
              energy: 0,
              protein: 0,
              carbs: 0,
              fat: 0,
            },
            meals: [],
          };
        }
        //accumulating macro targets, the original ones
        grouped[mealDay].day_macro_targets.energy += meal.targetEnergy ?? 0;
        grouped[mealDay].day_macro_targets.protein += meal.targetProtein ?? 0;
        grouped[mealDay].day_macro_targets.carbs += meal.targetCarbs ?? 0;
        grouped[mealDay].day_macro_targets.fat += meal.targetFat ?? 0;

        grouped[mealDay].meals.push({
          id: meal.id,
          food: intake?.consumedFood ?? meal.recommendedMeal,
          meal: meal.meal,
          portion: intake?.consumedPortion ?? meal.targetPortion,
          day: mealDay,
          date: meal.date,
          macro: {
            protein: intake?.consumedProtein ?? meal.targetProtein,
            carbs: intake?.consumedCarbs ?? meal.targetCarbs,
            fat: intake?.consumedFat ?? meal.targetFat,
            energy: intake?.consumedEnergy ?? meal.targetEnergy,
          },
          consumed: intake?.consumed ?? meal.consumed,
        });
      }
    

    const response = {
      meta: parsedResponse?.meta ?? null,
      unit_system: firstEntry.unitSystem ?? null,
      units: {
        portion: firstEntry.portionUnit ?? null,
        macro: {
          protein: firstEntry.macroProteinUnit ?? null,
          carbs: firstEntry.macroCarbsUnit ?? null,
          fat: firstEntry.macroFatUnit ?? null,
          energy: firstEntry.macroEnergyUnit ?? null,
        },
      },
      macro_ratios: {
        protein: firstEntry.ratioProtein ?? null,
        carbs: firstEntry.ratioCarbs ?? null,
        fat: firstEntry.ratioFat ?? null,
      },
      daily_calorie_target: firstEntry.dailyCalorieTarget ?? null,
      weekly_plan: Object.values(grouped),
    };

    return res.status(200).json({
      success: true,
      data: 
        {
          id: firstEntry.openAIResponseId,
          userPromptId: firstEntry.openAIResponse?.userPromptId,
          userId,
          response,
          createdAt: firstEntry.openAIResponse?.createdAt,
          updatedAt: firstEntry.openAIResponse?.updatedAt,
        },
    });
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
