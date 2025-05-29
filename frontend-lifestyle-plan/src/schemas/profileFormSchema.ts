import { z } from "zod";

export const schema_profileForm = z.object({
  unitSystem: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  age: z.number().min(18).max(120),
  waist: z.number().min(50).max(200),
  neck: z.number().min(30).max(60),
  hip: z.number().min(60).max(200).optional(),
});

export type ProfileFormValues = z.infer<typeof schema_profileForm>;