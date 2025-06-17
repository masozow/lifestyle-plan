import { UserDailyMeal, UserMealProgress } from "../models/index.js";

export const upsertMealPlanStructure = async ({
  userId,
  openAIResponseId,
  weeklyPlan,
  transaction,
}) => {
  const dayNameToOffset = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6,
  };

  const today = new Date();

  for (const day of weeklyPlan) {
    const offset = dayNameToOffset[day.day.toLowerCase()] ?? 0;
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const formattedDate = date.toISOString().split("T")[0];

    let progress = await UserMealProgress.findOne({
      where: {
        userId,
        date: formattedDate,
      },
      transaction,
    });

    if (!progress) {
      progress = await UserMealProgress.create(
        {
          userId,
          openAIResponseId,
          date: formattedDate,
        },
        { transaction }
      );
    }

    for (const meal of day.meals) {
      const [dailyMeal, created] = await UserDailyMeal.findOrCreate({
        where: {
          userMealProgressId: progress.id,
          recommendedMeal: meal.food,
        },
        defaults: {
          targetPortion: meal.portion,
          targetProtein: meal.macro.protein,
          targetFat: meal.macro.fat,
          targetCarbs: meal.macro.carbs,
          targetEnergy: meal.macro.energy,
          consumed: false,
        },
        transaction,
      });

      if (!created) {
        await dailyMeal.update(
          {
            targetPortion: meal.portion,
            targetProtein: meal.macro.protein,
            targetFat: meal.macro.fat,
            targetCarbs: meal.macro.carbs,
            targetEnergy: meal.macro.energy,
          },
          { transaction }
        );
      }
    }
  }
};
