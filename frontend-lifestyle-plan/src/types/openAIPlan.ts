export interface Macro {
  protein: number;
  carbs: number;
  fat: number;
  energy: number;
}

export interface Meal {
  id: number;
  food: string;
  meal: string;
  portion: number;
  day: string;
  date: string;
  macro: Macro;
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

export interface MacroRatios  {
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
  macro_ratios: {
    protein: number;
    carbs: number;
    fat: number;
  };
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
