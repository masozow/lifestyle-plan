import type { PlannerFormValues } from "@/schemas";
import { useTranslation } from "react-i18next";

export interface FormStep {
  name: keyof PlannerFormValues;
  title: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
}

export const usePlannerSteps = (): FormStep[] => {
  const { t } = useTranslation();

  const stepsData = t("plannerForm.options", { returnObjects: true }) as Record<
    string,
    Record<string, string>
  >;

  return [
    {
      name: "objective",
      title: t("plannerForm.objective") || "Goal",
      options: Object.entries(stepsData.objective).map(([value, label]) => ({
        value,
        label,
      })),
      defaultValue: "lose-fat",
    },
    {
      name: "restriction",
      title: t("plannerForm.restriction") || "Restriction",
      options: Object.entries(stepsData.restriction).map(([value, label]) => ({
        value,
        label,
      })),
      defaultValue: "none",
    },
    {
      name: "preference",
      title: t("plannerForm.preference") || "Preference",
      options: Object.entries(stepsData.preference).map(([value, label]) => ({
        value,
        label,
      })),
      defaultValue: "latin",
    },
    {
      name: "extras",
      title: t("plannerForm.extras") || "Extras",
    },
  ];
};