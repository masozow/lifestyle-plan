import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { schema_plannerForm, type PlannerFormValues } from "@/schemas";
import { CustomRadiogroup, CustomTextArea } from "@/components";
import SummaryCard from "./SummaryCard";
import { useTranslation } from "react-i18next";
import { usePlannerSteps } from "@/hooks";

interface Props {
  submitFunction: (data: PlannerFormValues) => void;
  titleChangeFunction: (title?: string) => void;
  initialValues?: Partial<PlannerFormValues>;
  plan?: PlannerFormValues | null;
}

export const PlannerForm = ({
  plan,
  submitFunction,
  titleChangeFunction,
  initialValues,
}: Props) => {
  const { t } = useTranslation();
  const { steps, getDefaultValues } = usePlannerSteps();
  const [currentStep, setCurrentStep] = useState(0);
  const defaultValues = getDefaultValues();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlannerFormValues>({
    resolver: zodResolver(schema_plannerForm),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  useEffect(() => {
    if (currentStep === steps.length) {
      titleChangeFunction(t("plannerPage.titleReview"));
    }
  }, [currentStep, t, titleChangeFunction, steps.length]);
  const [isCompleted, setIsCompleted] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      titleChangeFunction(t("profilePage.titleReview"));
    }
  };

  const prevStep = () => {
    titleChangeFunction();
    setCurrentStep((prev) => prev - 1);
    setIsCompleted(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(submitFunction)}
      className="flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="min-h-[12rem] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {steps[currentStep].type === "radio" ? (
            <CustomRadiogroup<PlannerFormValues>
              key={steps[currentStep].name}
              control={control}
              name={steps[currentStep].name as keyof PlannerFormValues}
              defaultValue={steps[currentStep].defaultValue || ""}
              options={steps[currentStep].options || []}
              error={errors[steps[currentStep].name as keyof PlannerFormValues]}
            />
          ) : (
            !isCompleted && (
              <CustomTextArea<PlannerFormValues>
                key="extras"
                name="extras"
                control={control}
                error={errors.extras}
                title={steps[currentStep].title}
              />
            )
          )}
          {isCompleted && (
            <SummaryCard key="summary" data={plan as PlannerFormValues} />
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 justify-end text-right">
        {currentStep > 0 && (
          <Button
            type="button"
            onClick={prevStep}
            className="text-lg p-4"
            variant="outline"
          >
            {t("plannerForm.buttons.back")}
          </Button>
        )}

        {!isCompleted ? (
          <Button
            type="button"
            onClick={nextStep}
            className="text-lg p-4"
            disabled={Object.keys(errors).length > 0}
          >
            {t("plannerForm.buttons.next")}
          </Button>
        ) : (
          <Button type="submit" className="text-lg p-4">
            {t("nutrition.submit")}
          </Button>
        )}
      </div>
    </motion.form>
  );
};
