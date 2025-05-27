import type { PlannerFormValues } from "@/schemas";

interface FormStep {
  title: string;
  name: string;
}

interface RadioStep extends FormStep {
  options: { value: string; labelKey: string }[];
  defaultValue: string;
}

export const steps: (RadioStep | FormStep)[] = [
  {
    title: "Goal",
    name: "objective",
    options: [
      { value: "lose-fat", labelKey: "plannerForm.options.lose-fat" },
      { value: "gain-muscle", labelKey: "plannerForm.options.gain-muscle" },
      { value: "maintain-weight", labelKey: "plannerForm.options.maintain-weight" }
    ],
    defaultValue: "lose-fat"
  },
  {
    title: "Restriction",
    name: "restriction",
    options: [
      { value: "none", labelKey: "plannerForm.options.none" },
      { value: "vegetarian", labelKey: "plannerForm.options.vegetarian" },
      { value: "gluten-free", labelKey: "plannerForm.options.gluten-free" },
      { value: "dairy-free", labelKey: "plannerForm.options.dairy-free" }
    ],
    defaultValue: "none"
  },
  {
    title: "Preference",
    name: "preference",
    options: [
      { value: "latin", labelKey: "plannerForm.options.latin" },
      { value: "mediterranean", labelKey: "plannerForm.options.mediterranean" },
      { value: "asian", labelKey: "plannerForm.options.asian" },
      { value: "high-protein", labelKey: "plannerForm.options.high-protein" }
    ],
    defaultValue: "latin"
  },
  {
    title: "Extras",
    name: "extras"
  }
] as const;

export type Step = typeof steps[number];
export type RadioStepType = Extract<Step, { options: any }>;
export type FormFieldName = keyof PlannerFormValues;