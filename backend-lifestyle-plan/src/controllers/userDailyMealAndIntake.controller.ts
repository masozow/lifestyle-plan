import { Request, Response } from "express";
import { UserDailyIntake, UserDailyMeal } from "../models/index.js";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";


const upsertUserDailyIntake = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const {
    day,
    date,
    meal,
    userDailyMealId,
    food,
    portion,
    macro,
    consumed,
  } = req.body;
  const objectToStore = {
    userDailyMealId,
    consumedFood:food,
    consumedPortion:portion,
    consumedProtein:macro?.protein,
    consumedFat:macro?.fat,
    consumedCarbs:macro?.carbs,
    consumedEnergy:macro?.energy,
    consumed,
    day,
    date,
    meal,
  }
  console.groupCollapsed(
    "~ log from upsertUserDailyIntake ~ line 31 req.body:"
  );
  console.log(req.body);
  console.log("~ log from upsertUserDailyIntake ~ line 32 objectToStore:", objectToStore);
  console.groupEnd();
  if (!userId || !userDailyMealId) {
    return res.status(400).json({ error: "Missing userDailyMealId or userId" });
  }
  const registryID = [];
  try {
    const existing = await UserDailyIntake.findOne({ where: { userDailyMealId } });
    if (existing) {
      const updated = await existing.update({
        consumedFood:food,
        consumedPortion:portion,
        consumedProtein:macro?.protein,
        consumedFat:macro?.fat,
        consumedCarbs:macro?.carbs,
        consumedEnergy:macro?.energy,
        consumed,
        day,
        date,
        meal,
      });
      registryID.push(updated?.id);
      console.log("~ log from upsertUserDailyIntake ~ line 42 updated:", registryID[0], "\n");
    } else {
      const created = await UserDailyIntake.create({
        userDailyMealId,
        consumedFood:food,
        consumedPortion:portion,
        consumedProtein:macro?.protein,
        consumedFat:macro?.fat,
        consumedCarbs:macro?.carbs,
        consumedEnergy:macro?.energy,
        consumed,
        day,
        date,
        meal,
      });
      registryID.push(created?.id);
      console.log("~ log from upsertUserDailyIntake ~ line 58 created:", registryID[0], "\n");
    }
    return res.status(200).json({ success: true, message: `Daily intake upserted: ${registryID}`});
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
  const { userDailyMealId, consumed } = req.body;
  console.log("~ log from upsertConsumedStatus ~ line 91 req.body:", req.body, "\n");
  if (!userId || !userDailyMealId || typeof consumed !== "boolean") {
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.warn,
        message: "Missing required fields",
        userId: req.user?.id || 0,
      })
    );
  }

  try {
     const meal = await UserDailyMeal.findByPk(userDailyMealId, {
      include: [{ model: UserDailyIntake, as: "intake" }],
    });

    if (!meal) {
      return res.status(404).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "Daily meal not found",
          userId,
          genericId: userDailyMealId,
        })
      );
    }

    if (meal.intake) {
      const result=await meal.intake.update({ consumed });
      console.log("✅ Intake consumed updated");
      return res.status(200).json({
        success: true,
        message: `Intake ${meal.intake.id} consumed updated to ${consumed}`,
      });
    }
    await meal.update({ consumed });
    console.log("✅ Meal consumed updated");
    return res.status(200).json({
      success: true,
      message: `Meal ${meal.id} consumed updated to ${consumed}`,
    });
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

