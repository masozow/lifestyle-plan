import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props<T extends FieldValues> {
  control: Control<T>;
  defaultValue: string;
  options: { value: string; label: string }[]; // Now accepts value-label pairs
  name: Path<T>;
  error?: FieldError;
}

const CustomRadiogroup = <T extends FieldValues>({
  control,
  defaultValue,
  options,
  name,
  error,
}: Props<T>) => {
  const { t } = useTranslation();

  return (
    <motion.div
      key={name.toString()}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: t("validation.required") || "Required" }} // Get message from locales
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            defaultValue={defaultValue}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${name.toString()}-${option.value}`}
                />
                <Label
                  className="cursor-pointer"
                  htmlFor={`${name.toString()}-${option.value}`}
                >
                  {option.label}
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
