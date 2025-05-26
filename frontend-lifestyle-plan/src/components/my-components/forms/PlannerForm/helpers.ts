import { schema_nutritionForm } from "@/schemas";

export const steps = [
    {
      title: "Goal",
      name: "objective",
      options: schema_nutritionForm.shape.objective.options,
      defaultValue: "lose fat",
    },
    {
      title: "Restriction",
      name: "restriction",
      options: schema_nutritionForm.shape.restriction.options,
      defaultValue: "none",
    },
    {
      title: "Preference",
      name: "preference",
      options: schema_nutritionForm.shape.preference.options,
      defaultValue: "latin",
    },
    {
        title:"Extras",
        name:"extras",
        options: "",
        defaultValue: "",
    }
  ] as const;