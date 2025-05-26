import { type JSX } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { motion } from "motion/react";
import { Controller, type Control, type FieldError } from "react-hook-form";
import type { PlannerFormValues, schema_plannerForm } from "@/schemas";
type Props = {
  control: Control<PlannerFormValues>;
  defaultValue: string;
  options: typeof schema_plannerForm.shape.objective.options;
  name: keyof PlannerFormValues;
  error?: FieldError;
  currentStep: number;
};

const CustomRadiogroup = ({
  defaultValue,
  options,
  name,
  currentStep,
  error,
  control,
}: Props): JSX.Element => {
  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <RadioGroup defaultValue={defaultValue}>
        {options &&
          options.map((opt) => (
            <div key={opt} className="flex items-center space-x-2">
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <RadioGroupItem
                    value={opt}
                    id={`${name}-${opt}`}
                    {...field}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                  />
                )}
              />
              <Label
                className="capitalize cursor-pointer"
                htmlFor={`${name}-${opt}`}
              >
                {opt}
              </Label>
            </div>
          ))}
      </RadioGroup>
      {error && <p className="error">{error.message}</p>}
    </motion.div>
  );
};

export default CustomRadiogroup;
