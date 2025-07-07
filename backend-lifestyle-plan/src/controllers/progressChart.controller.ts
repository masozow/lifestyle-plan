import { Request, Response } from "express";
import sequelize from "../config/sequelize.js";
import { QueryTypes } from "sequelize";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";

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
    const result = await sequelize.transaction(async (t) => {
      const makeQuery = (column: string) => `
        SELECT
          T.date AS 'date',
          T.value AS 'target',
          COALESCE(C.value, 0) AS 'consumed'
        FROM (
          SELECT
            M.date,
            SUM(M.target${column}) AS value
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
            SUM(COALESCE(I.consumed${column},M.target${column})) AS value
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
      `;

      const energy = await sequelize.query(makeQuery("Energy"), {
        replacements: { userId },
        type: QueryTypes.SELECT,
        transaction: t,
      });
      console.log("📊 Energy query result:", energy);
      const protein = await sequelize.query(makeQuery("Protein"), {
        replacements: { userId },
        type: QueryTypes.SELECT,
        transaction: t,
      });
      console.log("💪 Protein query result:", protein);
      const carbs = await sequelize.query(makeQuery("Carbs"), {
        replacements: { userId },
        type: QueryTypes.SELECT,
        transaction: t,
      });
      console.log("🥔 Carbs query result:", carbs);
      const fat = await sequelize.query(makeQuery("Fat"), {
        replacements: { userId },
        type: QueryTypes.SELECT,
        transaction: t,
      });
      console.log("💦 Fat query result:", fat);
      return { energy, protein, carbs, fat };
    });

    return res.status(200).json({
      success: true,
      data: result,
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
