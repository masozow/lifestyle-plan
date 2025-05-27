import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { schema_plannerForm, type PlannerFormValues } from "@/schemas";
import { steps } from "./helpers";
import CustomRadiogroup from "../BaseForm/CustomRadiogroup";
import CustomTextArea from "../BaseForm/CustomTextArea";
// import { Card, CardContent } from "@/components/ui/card";
import SummaryCard from "./SummaryCard";

type Step = (typeof steps)[number];
type RadioStep = Extract<Step, { options: readonly string[] }>;

const getDefaultValues = (steps: readonly Step[]): PlannerFormValues => {
  return steps.reduce((acc, step) => {
    if ("defaultValue" in step) {
      return { ...acc, [step.name]: step.defaultValue };
    }
    return { ...acc, [step.name]: "" };
  }, {} as PlannerFormValues);
};

interface Props {
  submitFunction: (data: PlannerFormValues) => void;
  titleChangeFunction: (title?: string) => void;
  plan?: PlannerFormValues | null;
}
export const PlannerForm = ({
  plan,
  submitFunction,
  titleChangeFunction,
}: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlannerFormValues>({
    resolver: zodResolver(schema_plannerForm),
    mode: "onChange",
    defaultValues: getDefaultValues(steps),
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    if (currentStep === steps.length - 1) {
      titleChangeFunction("Review your plan");
    }
    console.log("Step: ", currentStep);
    console.log("Step length: ", steps.length);
  };

  const prevStep = () => {
    titleChangeFunction();
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(submitFunction)}
      className="flex flex-col gap-4 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="min-h-[12rem] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentStep < 3 ? (
            <CustomRadiogroup<PlannerFormValues>
              key={steps[currentStep].name}
              control={control}
              name={steps[currentStep].name as keyof PlannerFormValues}
              options={(steps[currentStep] as RadioStep).options}
              defaultValue={(steps[currentStep] as RadioStep).defaultValue}
              error={errors[steps[currentStep].name] as FieldError | undefined}
            />
          ) : currentStep === 3 ? (
            <CustomTextArea<PlannerFormValues>
              key="extras"
              name="extras"
              control={control}
              error={errors.extras}
              title={steps[currentStep].title}
            />
          ) : (
            <SummaryCard key="summary" data={plan as PlannerFormValues} />
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

        {currentStep < steps.length ? (
          <Button
            type="button"
            onClick={nextStep}
            className="text-lg p-4"
            disabled={Object.keys(errors).length > 0}
          >
            Next
          </Button>
        ) : (
          <Button type="submit" className="text-lg p-4">
            Generate Plan
          </Button>
        )}
      </div>
    </motion.form>
  );
};
