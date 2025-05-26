import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion"; // Changed from "motion/react"
import { Controller, type Control, type FieldError } from "react-hook-form";
import type { PlannerFormValues } from "@/schemas";

interface Props {
  control: Control<PlannerFormValues>;
  defaultValue: string;
  options: readonly string[];
  name: keyof PlannerFormValues;
  error?: FieldError;
  currentStep?: number; // Made optional since it's not crucial for functionality
}

const CustomRadiogroup = ({
  defaultValue,
  options,
  name,
  error,
  control,
}: Props) => {
  return (
    <motion.div
      key={name} // Changed from currentStep for better key stability
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            defaultValue={defaultValue}
          >
            {options.map((opt) => (
              <div key={opt} className="flex items-center space-x-2">
                <RadioGroupItem value={opt} id={`${name}-${opt}`} />
                <Label
                  className="capitalize cursor-pointer"
                  htmlFor={`${name}-${opt}`}
                >
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </motion.div>
  );
};

export default CustomRadiogroup;
