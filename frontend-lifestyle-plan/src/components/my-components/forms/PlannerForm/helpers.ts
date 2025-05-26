import { schema_plannerForm } from "@/schemas";

export const steps = [
  {
    title: "Goal",
    name: "objective",
    options: schema_plannerForm.shape.objective.options,
    defaultValue: "lose fat",
  },
  {
    title: "Restriction",
    name: "restriction",
    options: schema_plannerForm.shape.restriction.options,
    defaultValue: "none",
  },
  {
    title: "Preference",
    name: "preference",
    options: schema_plannerForm.shape.preference.options,
    defaultValue: "latin",
  },
  {
    title: "Extras",
    name: "extras",
  }
] as const;

export type Step = typeof steps[number];