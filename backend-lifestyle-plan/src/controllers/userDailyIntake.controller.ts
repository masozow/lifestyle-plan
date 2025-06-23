import { Request, Response } from "express";
import { UserDailyIntake} from "../models/index.js";
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
  console.log("\n~ log from upsertUserDailyIntake ~ line 20 req.body:", req.body, "\n");
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

export const UserDailyIntakeController={
  upsertUserDailyIntake
}