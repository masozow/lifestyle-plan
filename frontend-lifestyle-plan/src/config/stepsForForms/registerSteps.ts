import type { StepConfig } from "./stepsTypes";

export const registerGroupedSteps: StepConfig[][] = [
  [
    {
      name: "name",
      titleKey: "registerForm.name.title",
      type: "text",
    },
    {
      name: "phone",
      titleKey: "registerForm.phone.title",
      type: "text",
    },
  ],
  [
    {
      name: "email",
      titleKey: "registerForm.email.title",
      type: "email",
    },
    {
      name: "password",
      titleKey: "registerForm.password.title",
      type: "password",
    },
    {
      name: "confirmPassword",
      titleKey: "registerForm.passwordConfirmation.title",
      type: "password",
    },
  ],
  [
    {
      name: "birthDate",
      titleKey: "registerForm.birthDate.title",
      type: "date",
    },
    {
      name: "gender",
      titleKey: "registerForm.gender.title",
      type: "radio",
      options: [
        { value: "male", labelKey: "Male" },
        { value: "female", labelKey: "Female" },
      ],
      defaultValue: "male",
    },
  ],
];
