import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { schema_plannerForm, type PlannerFormValues } from "@/schemas";
import CustomRadiogroup from "../BaseForm/CustomRadiogroup";
import CustomTextArea from "../BaseForm/CustomTextArea";
import SummaryCard from "./SummaryCard";
import { useTranslation } from "react-i18next";

interface FormStep {
  name: keyof PlannerFormValues;
  title: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
}

const usePlannerSteps = (): FormStep[] => {
  const { t } = useTranslation();

  const stepsData = t("plannerForm.options", { returnObjects: true }) as Record<
    string,
    Record<string, string>
  >;

  return [
    {
      name: "objective",
      title: t("plannerForm.objective") || "Goal",
      options: Object.entries(stepsData.objective).map(([value, label]) => ({
        value,
        label,
      })),
      defaultValue: "lose-fat",
    },
    {
      name: "restriction",
      title: t("plannerForm.restriction") || "Restriction",
      options: Object.entries(stepsData.restriction).map(([value, label]) => ({
        value,
        label,
      })),
      defaultValue: "none",
    },
    {
      name: "preference",
      title: t("plannerForm.preference") || "Preference",
      options: Object.entries(stepsData.preference).map(([value, label]) => ({
        value,
        label,
      })),
      defaultValue: "latin",
    },
    {
      name: "extras",
      title: t("plannerForm.extras") || "Extras",
    },
  ];
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
  const { t } = useTranslation();
  const steps = usePlannerSteps();
  const [currentStep, setCurrentStep] = useState(0);

  const getDefaultValues = (): PlannerFormValues => {
    return steps.reduce((acc, step) => {
      if (step.defaultValue) {
        return { ...acc, [step.name]: step.defaultValue };
      }
      return { ...acc, [step.name]: "" };
    }, {} as PlannerFormValues);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlannerFormValues>({
    resolver: zodResolver(schema_plannerForm),
    mode: "onChange",
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (currentStep === steps.length) {
      titleChangeFunction(t("plannerPage.titleReview"));
    }
  }, [currentStep, t, titleChangeFunction, steps.length]);

  const nextStep = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    if (newStep === steps.length) {
      titleChangeFunction(t("plannerPage.titleReview"));
    }
  };

  const prevStep = () => {
    titleChangeFunction();
    setCurrentStep((prev) => prev - 1);
  };

  const isRadioStep = (
    step: FormStep
  ): step is FormStep & { options: { value: string; label: string }[] } => {
    return !!step.options;
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
          {currentStep < steps.length - 1 ? (
            isRadioStep(steps[currentStep]) && (
              <CustomRadiogroup<PlannerFormValues>
                key={steps[currentStep].name}
                control={control}
                name={steps[currentStep].name}
                defaultValue={steps[currentStep].defaultValue || ""}
                options={steps[currentStep].options}
                error={errors[steps[currentStep].name]}
              />
            )
          ) : currentStep === steps.length - 1 ? (
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
            {t("plannerForm.buttons.back")}
          </Button>
        )}

        {currentStep < steps.length ? (
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
