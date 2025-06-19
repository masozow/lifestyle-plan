import { Request, Response } from "express";
import {
  UserDailyIntake,
  UserDailyMeal,
} from "../models/index.js";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";

const upsertUserDailyIntake = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const {
    day,
    date,
    meal,
    userDailyMealId,
    consumedFood,
    consumedPortion,
    consumedProtein,
    consumedFat,
    consumedCarbs,
    consumedEnergy,
    consumed,
  } = req.body;

  if (!userId || !userDailyMealId) {
    return res.status(400).json({ error: "Missing userDailyMealId or userId" });
  }

  try {
    const existing = await UserDailyIntake.findOne({ where: { userDailyMealId } });

    if (existing) {
      await existing.update({
        consumedFood,
        consumedPortion,
        consumedProtein,
        consumedFat,
        consumedCarbs,
        consumedEnergy,
        consumed,
        day,
        date,
        meal,
      });
    } else {
      await UserDailyIntake.create({
        userDailyMealId,
        consumedFood,
        consumedPortion,
        consumedProtein,
        consumedFat,
        consumedCarbs,
        consumedEnergy,
        consumed,
        day,
        date,
        meal,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error upserting daily intake: ${(error as Error).message}`,
        userId,
        genericId: userDailyMealId,
      })
    );
  }
};

const upsertConsumedStatus = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const {
    userDailyMealId,
    userDailyIntakeId,
    consumed,
    origin,
  } = req.body;

  if (!userId || !userDailyMealId || typeof consumed !== "boolean") {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    if (origin === "intake" && userDailyIntakeId) {
      const intake = await UserDailyIntake.findByPk(userDailyIntakeId);
      if (!intake) {
        return res.status(404).json({ error: "Intake not found" });
      }
      await intake.update({ consumed });
    } else {
      const meal = await UserDailyMeal.findByPk(userDailyMealId);
      if (!meal) {
        return res.status(404).json({ error: "Daily meal not found" });
      }
      await meal.update({ consumed });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error updating consumed status: ${(error as Error).message}`,
        userId,
        genericId: userDailyMealId,
      })
    );
  }
};

export const UserDailyMealAndIntakeController = {
  upsertUserDailyIntake,
  upsertConsumedStatus,
};
