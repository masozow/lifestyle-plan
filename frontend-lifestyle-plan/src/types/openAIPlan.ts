export interface Macro {
  protein: number;
  carbs: number;
  fat: number;
  energy: number;
}

export interface ReplacementMeal {
  id: number;
  day: string;
  date: string;
  meal: string;
  userDailyMealId: number;
  consumedFood: string;
  consumedPortion: number;
  macro: Macro;
  consumed: boolean;
  isIntake?: boolean;
}

export interface Meal {
  id: number;
  day: string;
  date: string;
  meal: string;
  targetFood: string;
  targetPortion: number;
  macro: Macro;
  consumed: boolean;
  intake?: ReplacementMeal;
}

export interface DayPlan {
  day: string;
  date: string;
  meals: Meal[];
}

export interface Units {
  portion: string;
  macro: { protein: string; carbs: string; fat: string; energy: string };
}

export interface MacroRatios { protein: number; carbs: number; fat: number; }

export interface OpenAIResponsePayload {
  meta: { model: string; generated_at: string };
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
  userDailyIntakeId?: number;
  replacement?: ReplacementMeal;
  targetMeal?: Meal; 
}

// mutation payload for consumed status endpoint
export interface ConsumedUpdate {
  userDailyMealId: number;
  userDailyIntakeId?: number;
  consumed: boolean;
  origin: "intake" | "meal";
}
export type MealStatus = Record<number, MealStatusItem>;


