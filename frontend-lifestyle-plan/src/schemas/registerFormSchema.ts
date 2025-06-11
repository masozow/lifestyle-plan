import i18n from "@/lib/i18n";
import { diffYears } from "@formkit/tempo";
import { z } from "zod";

export const schema_registerForm = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
  phone: z.string().min(8).regex(/^\d+$/, {
    message: i18n.t('zod.phone_invalid_format', { 
      defaultValue: 'Phone must contain only digits.' 
    })
  }),
  birthDate: z.string().refine((value) => {
    const age = diffYears(new Date(), new Date(value));
    return age >= 18;
  }, {
    message: i18n.t('zod.birthdate_min_age', {
      defaultValue: 'You must be at least 18 years old.'
    }),
  }),
  gender: z.enum(["male", "female"]),
  statusId: z.number(),
  roleId: z.number(),
})
.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: i18n.t('zod.password_mismatch', {
      defaultValue: 'Passwords do not match'
    }),
    path: ["confirmPassword"]
  }
);

export type RegisterFormValues = z.infer<typeof schema_registerForm>;