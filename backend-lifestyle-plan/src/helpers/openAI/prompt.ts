export const prompt = (
  unitSystem: string,
  language: string,
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
): string => `Using this language: ${language} and this unit system: ${unitSystem}. Create a 7-day meal plan in PURE JSON format with:
- daily_calorie_target (number)
- macro_ratios (object with protein, carbs, fat)
- unit_system (metric, imperial, US customary, etc.) 
- an object with the explanation of the unit used:
  "units": {
    "macro": {
      "protein": "g",
      "carbs": "g",
      "fat": "g",
      "energy":"kcal"
    },
    "portion": "g"
  }
- weekly_plan (array of days with three meals and two snacks per day, where each array of meals belongs to each day), something like this:
   "weekly_plan": [
        {
            "day": "Monday",
            "meals": [
                {
                    "meal": "Breakfast",
                    "food": "Oatmeal with fruits and nuts",
                    "portion": 300,
                    "macro": {
                        "protein": 20,
                        "carbs": 40,
                        "fat": 10,
                        "energy":400
                    }
                },
                {
                    "meal": "Lunch",
                ...
                },
                ....
            ]
        },
        {
            "day": "Tuesday",
            "meals": [
                ...
            ]
        },
        ...
    ]
    Keep the shape for the snacks and the amount of meals I asked for.

Utilize this user details to generate the plan:
${JSON.stringify({
  weight, height, age, gender, waist, neck, hip,
  objectives: { objective, restriction, preference },
  userAnnotations: { extras}
})}

IMPORTANT: Respond ONLY with valid JSON, no commentary, and not forget the language, make sure JSON is valid.
`;