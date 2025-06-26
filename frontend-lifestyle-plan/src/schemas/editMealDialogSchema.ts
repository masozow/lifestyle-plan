import { z } from "zod";

export const schema_replacementMeal = z.object({
  id: z.number(),
  day: z.string(),
  date: z.string(),
  meal: z.string(),
  userDailyMealId: z.number(),
  food: z.string().min(1, "Required"),
  portion: z.number().min(1),
  macro: z.object({
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    energy: z.number().min(1),
  }),
  consumed: z.boolean(),
  isIntake: z.boolean().optional(),
});

export type ReplacementMealFormValues = z.infer<typeof schema_replacementMeal>;
