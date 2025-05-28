export const prompt = (
  weight: number, 
  height: number, 
  age: number, 
  waist: number, 
  neck: number, 
  hip: number | undefined, 
  gender: string, 
  objective: string, 
  restriction: string, 
  preference: string, 
  extras: string | undefined
): string => `Create a 7-day meal plan in PURE JSON format with:
- daily_calorie_target (number)
- macro_ratios (object with protein, carbs, fat)
- weekly_plan (array of days with meals)

User details:
${JSON.stringify({
  weight, height, age, gender,
  objectives: { objective, restriction, preference }
})}

IMPORTANT: Respond ONLY with valid JSON, no commentary.
`;