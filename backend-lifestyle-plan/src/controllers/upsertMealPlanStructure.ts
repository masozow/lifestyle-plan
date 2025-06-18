import { UserDailyMeal } from "../models/index.js";

export const upsertMealPlanStructure = async ({
  userId,
  userMealProgressId,
  openAIResponseId,
  weeklyPlan,
  transaction,
}: {
  userId: number;
  userMealProgressId: number;
  openAIResponseId: number;
  weeklyPlan: any[];
  transaction: any;
}) => {
  const today = new Date();
  const todayDay = today.getDay();

  for (let i = 0; i < weeklyPlan.length; i++) {
    const { day, meals } = weeklyPlan[i];
    console.log('---------------------------------');
    console.log(`original day: ${day}`);
    const offset = todayDay ===(i+1)? 0: (i - todayDay + 7) % 7 +1;
    console.log(`offset: ${offset}`);    
    console.log(`today dayIndex: ${todayDay}`);
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const formattedDate = date.toISOString().split("T")[0];
    console.log("new date:", formattedDate);

    let counter = 0;
    for (const meal of meals) {
      //------------------------------
      console.log(`day index: ${i} - row:${counter} - meal: ${meal.meal} - food: ${meal.food} - portion: ${meal.portion} - user: ${userId}, openAIResponseId ${openAIResponseId}, and date ${formattedDate} --> for day: ${day} \n>>> Macros: -protein: ${meal.macro.protein} -carbs: ${meal.macro.carbs} -fat: ${meal.macro.fat} \n`);
      counter++;
      //------------------------------

      const [dailyMeal, created] = await UserDailyMeal.findOrCreate({
        where: {
          userMealProgressId: userMealProgressId,
          date: formattedDate,
          meal: meal.meal,
        },
        defaults: {
          day,
          meal: meal.meal,
          targetPortion: meal.portion,
          targetProtein: meal.macro.protein,
          targetFat: meal.macro.fat,
          date: new Date(formattedDate).toISOString().split("T")[0],
          targetCarbs: meal.macro.carbs,
          targetEnergy: meal.macro.energy,
          consumed: false,
          userMealProgressId: userMealProgressId,
          recommendedMeal: meal.food,
        },
        transaction
      });
      
      if (!created) {
        await dailyMeal.update(
          {
            day,
            meal: meal.meal,
            targetPortion: meal.portion,
            targetProtein: meal.macro.protein,
            targetFat: meal.macro.fat,
            date: formattedDate,
            targetCarbs: meal.macro.carbs,
            targetEnergy: meal.macro.energy,
            consumed: false,
            userMealProgressId: userMealProgressId,
            recommendedMeal: meal.food,
          },
          { transaction }
        );
      }
    }
  }
};

