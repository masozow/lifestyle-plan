export enum StepType {
  RADIO = 'radio',
  NUMBER = 'number',
  TEXTAREA = 'textarea'
}

export type Step = {
  name: string;
  title: string;
  options?: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
  type: StepType;
  optional?: boolean;
};

export type StepConfig = {
  name: string;
  titleKey: string;
  options?: {
    value: string;
    labelKey: string;
  }[];
  defaultValue?: string;
  type: StepType;
  optional?: boolean;
};