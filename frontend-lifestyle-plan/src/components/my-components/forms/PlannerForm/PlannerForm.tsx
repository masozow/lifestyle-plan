import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { schema_plannerForm, type PlannerFormValues } from "@/schemas";
import { steps } from "./helpers";
import CustomRadiogroup from "../BaseForm/CustomRadiogroup";
import CustomTextArea from "../BaseForm/CustomTextArea";

type Step = (typeof steps)[number];
type RadioStep = Extract<Step, { options: readonly string[] }>;

export const PlannerForm = () => {
  const [plan, setPlan] = useState<PlannerFormValues | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlannerFormValues>({
    resolver: zodResolver(schema_plannerForm),
    mode: "onBlur",
    defaultValues: {
      objective: "lose fat",
      restriction: "none",
      preference: "latin",
      extras: "",
    },
  });

  const onSubmit = async (data: PlannerFormValues) => {
    setPlan(data);
    console.log("Data: ", data);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="min-h-[12rem] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentStep < 3 ? (
            <CustomRadiogroup
              key={steps[currentStep].name}
              control={control}
              name={steps[currentStep].name as keyof PlannerFormValues}
              options={(steps[currentStep] as RadioStep).options}
              defaultValue={(steps[currentStep] as RadioStep).defaultValue}
              error={errors[steps[currentStep].name] as FieldError | undefined}
            />
          ) : (
            <CustomTextArea
              key="extras"
              name="extras"
              control={control}
              error={errors.extras}
              title={steps[currentStep].title}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 justify-end">
        {currentStep > 0 && (
          <Button
            type="button"
            onClick={prevStep}
            className="text-lg p-4"
            variant="outline"
          >
            Back
          </Button>
        )}

        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={nextStep} className="text-lg p-4">
            Next
          </Button>
        ) : (
          <Button type="submit" className="text-lg p-4">
            Generate Plan
          </Button>
        )}
      </div>

      {plan && (
        <motion.div
          className="mt-4 p-4 bg-muted rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-bold mb-2">Generated Plan:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(plan, null, 2)}
          </pre>
        </motion.div>
      )}
    </motion.form>
  );
};
