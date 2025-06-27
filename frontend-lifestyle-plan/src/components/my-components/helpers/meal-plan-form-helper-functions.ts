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
  const existing = mealStatus[meal.id];

  const updatedStatus: MealStatusItem = {
    consumed,
    userDailyMealId: meal.id,
    userDailyIntakeId: existing?.userDailyIntakeId ?? meal.intake?.id,
    replacement: existing?.replacement ?? (meal.intake ? { ...meal.intake, isIntake: true } : undefined),
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

/**
 * Return the effective meal for a given meal status, which is either the replacement
 * meal if it exists, or the target meal if there is no replacement.
 */
export const getEffectiveMeal = (status: MealStatusItem): Meal | ReplacementMeal | undefined => {
  console.log("getEffectiveMeal:", status);
  return status.replacement ?? status.targetMeal;
};
export const calculateDayTotals = (
  meals: MealStatusItem[]
): {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
} => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let targetCalories = 0;
  let targetProtein = 0;
  let targetCarbs = 0;
  let targetFat = 0;

  meals.forEach((item) => {
    const target = item.targetMeal;
    if (!target) return;

    targetCalories += target.macro.energy;
    targetProtein += target.macro.protein;
    targetCarbs += target.macro.carbs;
    targetFat += target.macro.fat;

    if (item.consumed) {
      const actual = item.replacement ?? item.targetMeal;
      if (!actual) return;

      totalCalories += actual.macro.energy;
      totalProtein += actual.macro.protein;
      totalCarbs += actual.macro.carbs;
      totalFat += actual.macro.fat;
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

export const groupMealsByDay = (mealStatus: MealStatus) => {
  const grouped = new Map<string, { day: string; date: string; meals: MealStatusItem[] }>();

  Object.values(mealStatus).forEach((status) => {
     const meal = getEffectiveMeal(status);
    if (!meal) return;

    const key = meal.date;

    if (!grouped.has(key)) {
      grouped.set(key, {
        day: meal.day,
        date: meal.date,
        meals: [],
      });
    }

    grouped.get(key)!.meals.push(status);
  });

  return [...grouped.values()];
};