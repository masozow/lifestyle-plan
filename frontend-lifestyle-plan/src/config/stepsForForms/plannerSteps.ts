import type { StepConfig } from "./stepsTypes";

export const plannerSteps: StepConfig[] = [
  {
    name: "objective",
    titleKey: "plannerForm.objective.title",
    options: [
      { value: "lose-fat", labelKey: "plannerForm.objective.options.lose-fat" },
      { value: "gain-muscle", labelKey: "plannerForm.objective.options.gain-muscle" },
      { value: "maintain-weight", labelKey: "plannerForm.objective.options.maintain-weight" },
    ],
    defaultValue: "lose-fat",
    type: "radio",
  },
  {
    name: "restriction",
    titleKey: "plannerForm.restriction.title",
    options: [
      { value: "none", labelKey: "plannerForm.restriction.options.none" },
      { value: "vegetarian", labelKey: "plannerForm.restriction.options.vegetarian" },
      { value: "gluten-free", labelKey: "plannerForm.restriction.options.gluten-free" },
      { value: "dairy-free", labelKey: "plannerForm.restriction.options.dairy-free" },
    ],
    defaultValue: "none",
    type: "radio",
  },
  {
    name: "preference",
    titleKey: "plannerForm.preference.title",
    options: [
      { value: "latin", labelKey: "plannerForm.preference.options.latin" },
      { value: "mediterranean", labelKey: "plannerForm.preference.options.mediterranean" },
      { value: "asian", labelKey: "plannerForm.preference.options.asian" },
      { value: "high-protein", labelKey: "plannerForm.preference.options.high-protein" },
    ],
    defaultValue: "latin",
    type: "radio",
  },
  {
    name: "extras",
    titleKey: "plannerForm.extras.title",
    type: "textarea",
    optional: true,
  },
] as const;
