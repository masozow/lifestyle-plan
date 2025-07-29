import { Request, Response } from "express";
import sequelize from "../config/sequelize.js";
import { QueryTypes } from "sequelize";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";
type MealResult = {
  id: number;
  date: string;
  meal: string;
  day: string;
  recommendedMeal: string;
  targetPortion: number;
  targetEnergy: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  consumed: boolean;
  consumedFood: string | null;
  consumedPortion: number | null;
  consumedEnergy: number | null;
  consumedProtein: number | null;
  consumedCarbs: number | null;
  consumedFat: number | null;
  intakeConsumed: boolean | null;
  unitSystem: string;
  portionUnit: string;
  macroProteinUnit: string;
  macroCarbsUnit: string;
  macroFatUnit: string;
  macroEnergyUnit: string;
  ratioProtein: number;
  ratioCarbs: number;
  ratioFat: number;
  dailyCalorieTarget: number;  
};

const getUserHistoricData = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Unauthorized: User not authenticated`,
        userId,
      })
    );
  }

  try {
    const results = await sequelize.query<MealResult>(
    `
    SELECT 
      M.id AS id,
      M.date,
      M.day,
      M.meal,
      M.recommendedMeal,
      M.targetPortion,
      M.targetEnergy,
      M.targetProtein,
      M.targetCarbs,
      M.targetFat,
      M.consumed,
      I.consumedFood,
      I.consumedPortion,
      I.consumedEnergy,
      I.consumedProtein,
      I.consumedCarbs,
      I.consumedFat,
      I.consumed AS intakeConsumed,
      U.unitSystem,
      U.portionUnit,
      U.macroProteinUnit,
      U.macroCarbsUnit,
      U.macroFatUnit,
      U.macroEnergyUnit,
      U.ratioProtein,
      U.ratioCarbs,
      U.ratioFat,
      U.dailyCalorieTarget
    FROM userDailyMeal AS M
    JOIN userMealProgress AS U ON M.userMealProgressId = U.id
    JOIN (
      SELECT 
        M2.date,
        MAX(M2.userMealProgressId) AS MaxProgressId
      FROM userDailyMeal AS M2
      JOIN userMealProgress AS U2 ON M2.userMealProgressId = U2.id
      WHERE U2.userId = :userId
      GROUP BY M2.date
    ) AS latest
      ON M.date = latest.date AND M.userMealProgressId = latest.MaxProgressId
    LEFT JOIN userDailyIntake AS I ON I.userDailyMealId = M.id
    ORDER BY M.date DESC, M.meal ASC
    `,
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    }
  );

  if (!results.length) return null;

  const grouped: Record<string, {
    day: string;
    date: string | null;
    meals: {
        id: number;
        food: string;
        meal: string;
        portion: number;
        day: string;
        date: string;
        macro: {
        protein: number;
        carbs: number;
        fat: number;
        energy: number;
        };
        consumed: boolean;
    }[];
    day_macro_targets: {
        energy: number;
        protein: number;
        carbs: number;
        fat: number;
    };
    }> = {};


  for (const meal of results) {
    const mealDay = meal.day;


    if (!grouped[mealDay]) {
       grouped[mealDay] = {
            day: mealDay,
            date: meal.date,
            meals: [],
            day_macro_targets: {
            protein: meal.targetProtein,
            carbs: meal.targetCarbs,
            fat: meal.targetFat,
            energy: meal.targetEnergy,
            },
        };
    }

    grouped[mealDay].meals.push({
      id: meal.id,
      food: meal.consumedFood ?? meal.recommendedMeal,
      meal: meal.meal,
      portion: meal.consumedPortion ?? meal.targetPortion,
      day: mealDay,
      date: meal.date,
      macro: {
        protein: meal.consumedProtein ?? meal.targetProtein,
        carbs: meal.consumedCarbs ?? meal.targetCarbs,
        fat: meal.consumedFat ?? meal.targetFat,
        energy: meal.consumedEnergy ?? meal.targetEnergy,
      },
      consumed: meal.intakeConsumed ?? meal.consumed,
    });
  }

  const firstEntry = results[0];
  const data = {
    meta: null,
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
      data,
    });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error getting progress data: ${(error as Error).message}`,
        userId,
      })
    );
  }
};

export const HistoricDataController = {
  getUserHistoricData,
};
