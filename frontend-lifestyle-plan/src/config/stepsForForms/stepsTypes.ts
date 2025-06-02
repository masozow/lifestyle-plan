export type StepType  = 'radio'| 'number'| 'textarea';

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

export interface StepConfig extends Omit<Step, 'title' | 'options'> {
  titleKey: string;    
  options?: {
    value: string;
    labelKey: string;  
  }[];
}