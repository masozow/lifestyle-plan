import type { 
  DayPlan, 
  MacroRatios, 
  Meal, 
  MealStatus, 
  MealStatusItem, 
  ReplacementMeal 
} from "@/types/openAIPlan"

export const toggleMealStatus = (
  mealStatus: MealStatus,
  meal: Meal,
  consumed: boolean
): MealStatus => {
  const updatedStatus: MealStatusItem = {
    consumed,
    userDailyMealId: meal.id,
    userDailyIntakeId: meal.intake?.id,
    replacement: meal.intake
      ? { ...meal.intake, isIntake: true }
      : undefined,
    targetMeal: meal,
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
  const current = mealStatus[meal.id] || {
    consumed: true,
    userDailyMealId: meal.id,
    targetMeal: meal,
  };

  return {
    ...mealStatus,
    [meal.id]: {
      ...current,
      replacement: {
        ...data,
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
    targetCalories += meal.macro.energy;
    targetProtein += meal.macro.protein;
    targetCarbs += meal.macro.carbs;
    targetFat += meal.macro.fat;

    const status = mealStatus[meal.id];
    if (status?.consumed) {
      const m = status.replacement || status.targetMeal;
      if (m && 'macro' in m) {
        totalCalories += m.macro.energy;
        totalProtein += m.macro.protein;
        totalCarbs += m.macro.carbs;
        totalFat += m.macro.fat;
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
      isCompleted: !!status?.consumed,
      hasReplacement: !!status?.replacement,
      replacement: status?.replacement
        ? {
            title: status.replacement.food,
            portion: status.replacement.portion,
            calories: status.replacement.macro.energy,
            carbs: status.replacement.macro.carbs,
            fat: status.replacement.macro.fat,
            protein: status.replacement.macro.protein,
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
