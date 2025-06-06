import { z } from "zod";

export const schema_registerForm = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(8),
  birthDate: z.string(),
  gender: z.enum(["male", "female"]), // ✅ Agregado
  statusId: z.number(),
  roleId: z.number(),
});

export type RegisterFormValues = z.infer<typeof schema_registerForm>;

