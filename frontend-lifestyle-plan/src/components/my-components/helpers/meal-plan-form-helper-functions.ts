import type { DayPlan, MacroRatios, Meal,MealStatus, ReplacementMeal } from "@/types/openAIPlan"

export const toggleMealStatus = (
  mealStatus: MealStatus,
  meal: Meal,
  completed: boolean
): MealStatus => {
  const updatedStatus = {
    completed,
    userDailyMealId: meal.id,
    userDailyIntakeId: meal.intake?.id,
    replacement: meal.intake
      ? {
          ...meal.intake,
          isIntake: true,
        }
      : undefined,
  };

  return {
    ...mealStatus,
    [meal.id]: updatedStatus,
  };
};

export const saveReplacementMeal = (
  mealStatus: MealStatus,
  meal: Meal,
  data: ReplacementMeal
): MealStatus => {
  const current = mealStatus[meal.id] || { completed: true, userDailyMealId: meal.id };
  return {
    ...mealStatus,
    [meal.id]: {
      ...current,
      replacement: {
        ...data,
        userDailyMealId: meal.id,
        isIntake: true,
      },
    },
  };
};

export const calculateDayTotals = (day: DayPlan, mealStatus: MealStatus) => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  let targetCalories = 0;
  let targetProtein = 0;
  let targetCarbs = 0;
  let targetFat = 0;

  day.meals.forEach((meal) => {
    targetCalories += meal.targetEnergy;
    targetProtein += meal.targetProtein;
    targetCarbs += meal.targetCarbs;
    targetFat += meal.targetFat;

    const status = mealStatus[meal.id];

    if (status?.completed) {
      const m = status.replacement || meal;
      if ('consumedEnergy' in m) {
        const replacement = m as ReplacementMeal;
        totalCalories += replacement.consumedEnergy;
        totalProtein += replacement.consumedProtein;
        totalCarbs += replacement.consumedCarbs;
        totalFat += replacement.consumedFat;
      } else {
        const meal = m as Meal;
        totalCalories += meal.targetEnergy;
        totalProtein += meal.targetProtein;
        totalCarbs += meal.targetCarbs;
        totalFat += meal.targetFat;
      }
    }
  });

  return {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    targetCalories,
    targetProtein,
    targetCarbs,
    targetFat,
  };
};

export const getMealStatuses = (day: DayPlan, mealStatus: MealStatus) => {
  return day.meals.map((meal) => {
    const status = mealStatus[meal.id];
    return {
      isCompleted: !!status?.completed,
      hasReplacement: !!status?.replacement,
      replacement: status?.replacement
        ? {
            title: status.replacement.consumedFood,
            portion: status.replacement.consumedPortion,
            calories: status.replacement.consumedEnergy,
            carbs: status.replacement.consumedCarbs,
            fat: status.replacement.consumedFat,
            protein: status.replacement.consumedProtein,
          }
        : undefined,
    };
  });
};

export const calculateMacroPercentages = (macroRatios: MacroRatios) => {
  return {
    protein: Math.round(macroRatios.protein * 100),
    carbs: Math.round(macroRatios.carbs * 100),
    fat: Math.round(macroRatios.fat * 100),
  };
};
