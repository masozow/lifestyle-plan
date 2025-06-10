import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  title: string;
  autoFocus?: boolean;
}

export const CustomTextArea = <T extends FieldValues>({
  name,
  control,
  error,
  title,
  autoFocus = false,
}: Props<T>) => {
  return (
    <motion.div
      key={`textarea-${title}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Label
        className="text-2xl text-left mb-4 font-semibold"
        htmlFor={`textarea-${title}`}
      >
        {title}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            id={`textarea-${title}`}
            placeholder={`${title}...`}
            autoFocus={autoFocus}
            {...field}
            className="mt-4 resize-none overflow-y-auto h-[5rem]"
            rows={4}
          />
        )}
      />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </motion.div>
  );
};
