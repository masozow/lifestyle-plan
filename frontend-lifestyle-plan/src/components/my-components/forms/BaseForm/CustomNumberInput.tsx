import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
// import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: FieldError;
  unit?: string;
  autoFocus?: boolean;
}

export const CustomNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  unit,
  autoFocus = true,
}: Props<T>) => {
  // const [isTouched, setIsTouched] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <Label
        htmlFor={name.toString()}
        className="text-md sm:text-2xl text-left mb-4 font-semibold"
      >
        {label} {unit && `(${unit})`}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={name.toString()}
            type="number"
            value={field.value ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value === "" ? undefined : Number(value));
            }}
            autoFocus={autoFocus}
            onBlur={() => {
              field.onBlur();
              // setIsTouched(true);
            }}
            onFocus={(e) => e.target.select()}
          />
        )}
      />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </motion.div>
  );
};
