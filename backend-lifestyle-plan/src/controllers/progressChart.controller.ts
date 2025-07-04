import { Request, Response } from "express";
import  sequelize  from "../config/sequelize.js";
import { QueryTypes } from "sequelize";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";

const getUserProgressData = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Unauthorized: User not authenticated`,
        userId,
      })
    );

  try {
    // Consumed Energy Query
    const consumedResults = await sequelize.query(
      `
      SELECT 
        M.date AS date,
        SUM(COALESCE(I.consumedEnergy, M.targetEnergy)) AS energy
      FROM nutrition.userDailyMeal AS M
      LEFT JOIN nutrition.userDailyIntake AS I 
        ON I.userDailyMealId = M.id
      JOIN nutrition.userMealProgress AS U
        ON M.userMealProgressId = U.id
      WHERE U.userId = :userId
        AND (I.consumed = 1 OR M.consumed = 1)
      GROUP BY M.date
      ORDER BY M.date
      `,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );

    // Target Energy Query (only highest mealProgress per date)
    const targetResults = await sequelize.query(
      `
      SELECT 
        M.date AS date,
        SUM(M.targetEnergy) AS energy
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
      ORDER BY M.date
      `,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      success: true,
      data: {
        consumedEnergy: consumedResults,
        targetEnergy: targetResults,
      },
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

