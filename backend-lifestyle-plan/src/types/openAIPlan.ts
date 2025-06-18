export interface Macro {
  protein: number;
  carbs: number;
  fat: number;
  energy: number;
}

export interface Meal {
  meal: string;
  food: string;
  portion: number;
  macro: Macro;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export interface Units {
  macro: {
    protein: string;
    carbs: string;
    fat: string;
    energy: string;
  };
  portion: string;
}

export interface OpenAIResponsePayload {
  language: string;
  daily_calorie_target: number;
  macro_ratios: {
    protein: number;
    carbs: number;
    fat: number;
  };
  unit_system: string;
  units: Units;
  weekly_plan: DayPlan[];
  meta?: unknown;
}

export interface OpenAIResponseFromServer {
  id: number;
  userPromptId: number;
  userId: number;
  response: OpenAIResponsePayload;
  createdAt: string;
  updatedAt: string;
}
