import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  defaultValue: PathValue<T, Path<T>>;
  options: readonly string[];
  name: Path<T>;
  error?: FieldError | undefined; // Explicitly type as FieldError or undefined
}

const CustomRadiogroup = <T extends FieldValues>({
  control,
  defaultValue,
  options,
  name,
  error,
}: Props<T>) => {
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
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            value={field.value as string}
            onValueChange={field.onChange}
            defaultValue={defaultValue as string}
          >
            {options.map((opt) => (
              <div key={opt} className="flex items-center space-x-2">
                <RadioGroupItem value={opt} id={`${name.toString()}-${opt}`} />
                <Label
                  className="capitalize cursor-pointer"
                  htmlFor={`${name.toString()}-${opt}`}
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
