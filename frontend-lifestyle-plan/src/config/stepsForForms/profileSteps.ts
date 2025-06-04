import type { StepConfig } from "./stepsTypes";

export const profileSteps: StepConfig[] = [
  {
    name: "unitSystem",
    titleKey: "profileForm.unitSystem.title",
    options: [
      { value: "metric", labelKey: "profileForm.unitSystem.options.metric" },
      { value: "imperial", labelKey: "profileForm.unitSystem.options.imperial" },
    ],
    defaultValue: "metric",
    type: "radio",
  },
  {
    name: "gender",
    titleKey: "profileForm.gender.title",
    options: [
      { value: "female", labelKey: "profileForm.gender.options.female" },
      { value: "male", labelKey: "profileForm.gender.options.male" },
    ],
    defaultValue: "female",
    type: "radio",
  },
  {
    name: "weight",
    titleKey: "profileForm.weight.title",
    type: "number",
  },
  {
    name: "height",
    titleKey: "profileForm.height.title",
    type: "number",
  },
  {
    name: "age",
    titleKey: "profileForm.age.title",
    type: "number",
  },
  {
    name: "waist",
    titleKey: "profileForm.waist.title",
    type: "number",
  },
  {
    name: "neck",
    titleKey: "profileForm.neck.title",
    type: "number",
  },
  {
    name: "hip",
    titleKey: "profileForm.hip.title",
    type: "number",
    optional: true,
  },
] as const;
