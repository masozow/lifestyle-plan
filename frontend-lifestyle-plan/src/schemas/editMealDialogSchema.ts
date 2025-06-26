// schemas/replacementMealSchema.ts
import { z } from "zod";

export const schema_replacementMeal = z.object({
  food: z.string().min(1, "Required"),
  portion: z.number().min(1),
  macro: z.object({
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    energy: z.number().min(1),
  }),
});

export type ReplacementMealFormValues = z.infer<typeof schema_replacementMeal>;
