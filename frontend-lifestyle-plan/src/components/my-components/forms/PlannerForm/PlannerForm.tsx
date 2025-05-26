import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { schema_plannerForm, type PlannerFormValues } from "@/schemas";
import { steps } from "./helpers";
import CustomRadiogroup from "../BaseForm/CustomRadiogroup";
import CustomTextArea from "../BaseForm/CustomTextArea";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

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
  titleChangeFunction: (title: string) => void;
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
    mode: "onBlur",
    defaultValues: getDefaultValues(steps),
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    if (currentStep === steps.length - 1) {
      titleChangeFunction("Review your plan");
    }
  };

  const prevStep = () => {
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
          ) : currentStep === steps.length - 2 ? (
            <CustomTextArea<PlannerFormValues>
              key="extras"
              name="extras"
              control={control}
              error={errors.extras}
              title={steps[currentStep].title}
            />
          ) : (
            <Card key="summary" className="flex flex-col gap-4 p-4">
              <CardTitle className="text-2xl font-bold">
                {plan?.objective ?? ""}
              </CardTitle>
              <CardContent className="flex flex-col gap-4">
                {JSON.stringify(plan, null, 2)}
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="text-lg p-4">
                  Generate Plan
                </Button>
              </CardFooter>
            </Card>
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

        {currentStep < steps.length - 1 && (
          <Button type="button" onClick={nextStep} className="text-lg p-4">
            Next
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
