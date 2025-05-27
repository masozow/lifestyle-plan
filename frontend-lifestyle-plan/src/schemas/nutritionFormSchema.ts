import { z } from "zod";

 export const schema_plannerForm = z.object({
  objective: z.enum(["lose fat", "gain muscle", "maintain weight"]),
  restriction: z.enum(["none", "vegetarian", "gluten-free", "dairy-free"]),
  preference: z.enum(["latin", "mediterranean", "asian", "high protein"]),
  extras: z.string().max(300).optional(),
});

export type PlannerFormValues = z.infer<typeof schema_plannerForm>;