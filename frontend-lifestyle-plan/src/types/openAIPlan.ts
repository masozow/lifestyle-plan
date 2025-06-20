export interface Macro {
  protein: number;
  carbs: number;
  fat: number;
  energy: number;
}

export interface Meal {
  id: number;
  meal: string;
  targetPortion: number;
  targetFood: string;
  targetProtein: number;
  targetFat: number;
  targetCarbs: number;
  targetEnergy: number;
  consumed: boolean;
  intake?: ReplacementMeal;
  day: string;
  date: string;
  macro: Macro;
}
export interface ReplacementMeal {
  id: number;
  day: string;
  date: string;
  meal: string;
  userDailyMealId: number;
  consumedFood: string;
  consumedPortion: number;
  consumedProtein: number;
  consumedFat: number;
  consumedCarbs: number;
  consumedEnergy: number;
  consumed: boolean;
  isIntake?: boolean;
}
export interface IntakeReplacementPayload {
  userDailyMealId: number;
  consumedFood: string;
  consumedPortion: number;
  consumedProtein: number;
  consumedFat: number;
  consumedCarbs: number;
  consumedEnergy: number;
  consumed: boolean;
  day: string;
  date: string;
  meal: string;
}

export interface DayPlan {
  day: string;
  date: string;
  meals: Meal[];
}

export interface Units {
  portion: string;
  macro: {
    protein: string;
    carbs: string;
    fat: string;
    energy: string;
  };
}

export interface MacroRatios {
  protein: number;
  carbs: number;
  fat: number;
}

export interface OpenAIResponsePayload {
  meta: {
    model: string;
    generated_at: string;
  };
  unit_system: string;
  units: Units;
  macro_ratios: MacroRatios;
  daily_calorie_target: number;
  weekly_plan: DayPlan[];
}

export interface OpenAIResponseFromServer {
  id: number;
  userPromptId: number;
  userId: number;
  response: OpenAIResponsePayload;
  createdAt: string;
  updatedAt: string;
}


export interface MealStatusItem {
  completed: boolean;
  userDailyMealId: number;
  targetMeal?: Meal;
  replacement?: ReplacementMeal;
}

export type MealStatus = Record<number, MealStatusItem>;
