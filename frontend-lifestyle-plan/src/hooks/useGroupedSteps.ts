import { useTranslation } from "react-i18next";
import type { Step, StepConfig } from "@/config";

export const useGroupedSteps = (
  groupedConfigs: StepConfig[][],
  skipStepName?: string | null
): {
  steps: Step[][];
  fieldNamesPerStep: string[][];
  getDefaultValues: () => Record<string, any>;
} => {
  const { t } = useTranslation();

  const steps = groupedConfigs.map((group) =>
    group
      .filter((config) => config.name !== skipStepName)
      .map((config) => ({
        ...config,
        title: t(config.titleKey),
        options: config.options?.map((opt) => ({
          value: opt.value,
          label: t(opt.labelKey),
        })),
      }))
  );

  const fieldNamesPerStep = steps.map((group) => group.map((s) => s.name));

  const getDefaultValues = () =>
    steps.flat().reduce((acc, step) => {
      if (step.defaultValue !== undefined) {
        acc[step.name] = step.defaultValue;
      }
      return acc;
    }, {} as Record<string, any>);

  return { steps, fieldNamesPerStep, getDefaultValues };
};
