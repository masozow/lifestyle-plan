import { type Control, Controller, type FieldError } from "react-hook-form";
import "./CustomInput.css";
import { FormValues } from "../models";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const CustomInput = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="form-group">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            type={type}
            {...field}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
