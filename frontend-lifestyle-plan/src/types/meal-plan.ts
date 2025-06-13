export interface MacroNutrients {
  protein: number
  carbs: number
  fat: number
  energy: number
}

export interface Units {
  macro: {
    protein: string
    carbs: string
    fat: string
    energy: string
  }
  portion: string
}

export interface Meal {
  meal: string
  food: string
  portion: number
  macro: MacroNutrients
}

export interface ReplacementMeal {
  title: string
  portion: number
  calories: number
  carbs: number
  fat: number
  protein: number
}

export interface MealStatus {
  completed: boolean
  replacement?: ReplacementMeal
}

export interface DayPlan {
  day: string
  meals: Meal[]
}

export interface MealPlanData {
  language: string
  daily_calorie_target: number
  macro_ratios: {
    protein: number
    carbs: number
    fat: number
  }
  unit_system: string
  units: Units
  weekly_plan: DayPlan[]
}

export interface MealPlanState {
  mealPlanData: MealPlanData | null
  mealStatus: Record<string, MealStatus>
  lastSyncedAt: number | null
}
