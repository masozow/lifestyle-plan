interface ReplacementMeal {
  title: string
  portion: number
  calories: number
  carbs: number
  fat: number
  protein: number
}

interface MealStatus {
  [key: string]: {
    completed: boolean
    replacement?: ReplacementMeal
  }
}

export const getMealKey = (day: string, mealIndex: number): string => {
  return `${day}-${mealIndex}`
}

export const toggleMealStatus = (mealStatus: MealStatus, day: string, mealIndex: number): MealStatus => {
  const key = getMealKey(day, mealIndex)
  return {
    ...mealStatus,
    [key]: {
      ...mealStatus[key],
      completed: !mealStatus[key]?.completed,
    },
  }
}

export const saveReplacementMeal = (
  mealStatus: MealStatus,
  day: string,
  mealIndex: number,
  data: ReplacementMeal,
): MealStatus => {
  const key = getMealKey(day, mealIndex)
  return {
    ...mealStatus,
    [key]: {
      ...mealStatus[key],
      replacement: data,
    },
  }
}

export const calculateDayTotals = (day: any, mealStatus: MealStatus) => {
  let totalCalories = 0
  let totalProtein = 0
  let totalCarbs = 0
  let totalFat = 0

  let targetCalories = 0
  let targetProtein = 0
  let targetCarbs = 0
  let targetFat = 0

  day.meals.forEach((meal: any, index: number) => {
    const key = getMealKey(day.day, index)
    const status = mealStatus[key]

    // Always add to target totals
    targetCalories += meal.macro.energy
    targetProtein += meal.macro.protein
    targetCarbs += meal.macro.carbs
    targetFat += meal.macro.fat

    // Only add to actual totals if completed
    if (status?.completed === true) {
      if (status?.replacement) {
        // Use replacement meal if available
        totalCalories += status.replacement.calories
        totalProtein += status.replacement.protein
        totalCarbs += status.replacement.carbs
        totalFat += status.replacement.fat
      } else {
        // Use original meal
        totalCalories += meal.macro.energy
        totalProtein += meal.macro.protein
        totalCarbs += meal.macro.carbs
        totalFat += meal.macro.fat
      }
    }
  })

  return {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    targetCalories,
    targetProtein,
    targetCarbs,
    targetFat,
  }
}

export const getMealStatuses = (day: any, mealStatus: MealStatus) => {
  return day.meals.map((_: any, index: number) => {
    const key = getMealKey(day.day, index)
    const status = mealStatus[key]
    return {
      isCompleted: status?.completed === true,
      hasReplacement: !!status?.replacement,
      replacement: status?.replacement,
    }
  })
}

export const createEditingMeal = (day: string, mealIndex: number, meal: any) => {
  return { day, mealIndex, meal }
}

export const calculateMacroPercentages = (macroRatios: any) => {
  return {
    protein: Math.round(macroRatios.protein * 100),
    carbs: Math.round(macroRatios.carbs * 100),
    fat: Math.round(macroRatios.fat * 100),
  }
}
