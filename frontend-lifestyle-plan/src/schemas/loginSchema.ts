import { z } from "zod";

export const schema_loginForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormValues = z.infer<typeof schema_loginForm>;
