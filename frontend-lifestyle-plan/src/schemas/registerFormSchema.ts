import { diffYears } from "@formkit/tempo";
import { z } from "zod";

export const schema_registerForm = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(8).regex(/^\d+$/, { message: "phone_invalid_format" }), // Use a translation key
  birthDate: z.string().refine((value) => {
    const age = diffYears(new Date(), new Date(value));
    return age >= 18;
  }, {
    message: "birthdate_min_age",
  }),
  gender: z.enum(["male", "female"]),
  statusId: z.number(),
  roleId: z.number(),
});

export type RegisterFormValues = z.infer<typeof schema_registerForm>;
