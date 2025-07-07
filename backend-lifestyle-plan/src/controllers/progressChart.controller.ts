import { Request, Response } from "express";
import sequelize from "../config/sequelize.js";
import { QueryTypes } from "sequelize";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";

interface ProgressRow{
  date: string;
  targetEnergy: number;
  consumedEnergy: number;
  targetProtein: number;
  consumedProtein: number;
  targetCarbs: number;
  consumedCarbs: number;
  targetFat: number;
  consumedFat: number;
}

const getUserProgressData = async (req: Request, res: Response) => {
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
       const results = await sequelize.query<ProgressRow>(
      `
        SELECT
          T.date,
          T.targetEnergy,
          COALESCE(C.consumedEnergy, 0) AS consumedEnergy,
          T.targetProtein,
          COALESCE(C.consumedProtein, 0) AS consumedProtein,
          T.targetCarbs,
          COALESCE(C.consumedCarbs, 0) AS consumedCarbs,
          T.targetFat,
          COALESCE(C.consumedFat, 0) AS consumedFat
        FROM (
          SELECT
            M.date,
            SUM(M.targetEnergy) AS targetEnergy,
            SUM(M.targetProtein) AS targetProtein,
            SUM(M.targetCarbs) AS targetCarbs,
            SUM(M.targetFat) AS targetFat
          FROM nutrition.userDailyMeal AS M
          JOIN nutrition.userMealProgress AS U
            ON M.userMealProgressId = U.id
          JOIN (
            SELECT 
              M2.date,
              MAX(M2.userMealProgressId) AS MaxProgressId
            FROM nutrition.userDailyMeal AS M2
            JOIN nutrition.userMealProgress AS U2
              ON M2.userMealProgressId = U2.id
            WHERE U2.userId = :userId
            GROUP BY M2.date
          ) AS latest
            ON M.date = latest.date
          AND M.userMealProgressId = latest.MaxProgressId
          WHERE U.userId = :userId
          GROUP BY M.date
        ) AS T
        LEFT JOIN (
          SELECT
            M.date,
            SUM(COALESCE(I.consumedEnergy, M.targetEnergy)) AS consumedEnergy,
            SUM(COALESCE(I.consumedProtein, M.targetProtein)) AS consumedProtein,
            SUM(COALESCE(I.consumedCarbs, M.targetCarbs)) AS consumedCarbs,
            SUM(COALESCE(I.consumedFat, M.targetFat)) AS consumedFat
          FROM nutrition.userDailyMeal AS M
          JOIN nutrition.userMealProgress AS U
            ON M.userMealProgressId = U.id
          LEFT JOIN nutrition.userDailyIntake AS I
            ON I.userDailyMealId = M.id
          WHERE U.userId = :userId
            AND (I.consumed = 1 OR M.consumed = 1)
          GROUP BY M.date
        ) AS C
        ON T.date = C.date
        ORDER BY T.date;
      `,{
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );
    const data = {
      energy: [],
      protein: [],
      carbs: [],
      fat: [],
    };
    results.forEach((row) => {
      data.energy.push({
        date: row.date,
        target: row.targetEnergy,
        consumed: row.consumedEnergy,
      });
      data.protein.push({
        date: row.date,
        target: row.targetProtein,
        consumed: row.consumedProtein,
      });
      data.carbs.push({
        date: row.date,
        target: row.targetCarbs,
        consumed: row.consumedCarbs,
      });
      data.fat.push({
        date: row.date,
        target: row.targetFat,
        consumed: row.consumedFat,
      });
    });
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

export const ProgressChartController = {
  getUserProgressData,
};
