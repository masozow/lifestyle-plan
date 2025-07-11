import { useTranslation } from "react-i18next";
import type { Step, StepConfig } from "@/config";

export const useSteps = (
  stepConfigs: StepConfig[],
  skipStepName?: string | null
): { steps: Step[]; getDefaultValues: () => Record<string, any> } => {
  
  const { t } = useTranslation();

  const steps: Step[] = stepConfigs
    .filter((config) => config.name !== skipStepName)
    .map((config) => ({
      ...config,
      title: t(config.titleKey),
      options: config.options?.map((opt) => ({
        value: opt.value,
        label: t(opt.labelKey),
      })),
    }));

  const getDefaultValues = () =>
    steps.reduce((acc, step) => {
      if (step.defaultValue !== undefined) {
        acc[step.name] = step.defaultValue;
      }
      return acc;
    }, {} as Record<string, any>);

  return { steps, getDefaultValues };
};
