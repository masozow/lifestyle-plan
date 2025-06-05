import { z } from "zod";

export const schema_registerForm = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  phone: z.string().min(8),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  statusId: z.number().min(1),
  roleId: z.number().min(1),
});

export type RegisterFormValues = z.infer<typeof schema_registerForm>;
