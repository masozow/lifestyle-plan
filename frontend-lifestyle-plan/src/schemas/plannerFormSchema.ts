import { z } from "zod";

export const schema_plannerForm = z.object({
  objective: z.string().min(1, "Required"), 
  restriction: z.string().min(1, "Required"),
  preference: z.string().min(1, "Required"),
  extras: z.string().max(300).optional(),
});

export type PlannerFormValues = z.infer<typeof schema_plannerForm>;