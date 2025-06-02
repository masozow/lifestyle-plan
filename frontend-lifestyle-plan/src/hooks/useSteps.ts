import { useTranslation } from "react-i18next";
const validateStepConfig = (config: StepConfig[]) => {
  config.forEach(step => {
    if (step.type === 'radio' && !step.options) {
      throw new Error(`Radio step ${step.name} must have options`);
    }
  });
};

export const useSteps = (stepConfig: StepConfig[]) => {
  const { t } = useTranslation();

  validateStepConfig(stepConfig);

  const translatedSteps = stepConfig.map(step => ({
    ...step,
    title: t(step.titleKey),
    options: step.options?.map(option => ({
      value: option.value,
      label: t(option.labelKey)
    }))
  }));

  const getDefaultValues = () => {
    return translatedSteps.reduce((acc: Record<string, any>, step) => {
      if (step.defaultValue !== undefined) {
        acc[step.name] = step.defaultValue;
      }
      return acc;
    }, {});
  };

  return { steps: translatedSteps, getDefaultValues };
};

interface StepConfig {
  name: string;
  titleKey: string;
  options?: {
    value: string;
    labelKey: string;
  }[];
  defaultValue?: string;
  type: 'radio' | 'number' | 'textarea';
  optional?: boolean;
}

