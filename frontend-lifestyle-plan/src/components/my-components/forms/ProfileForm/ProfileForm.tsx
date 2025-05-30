import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { schema_profileForm, type ProfileFormValues } from "@/schemas";
import { CustomRadiogroup, CustomNumberInput } from "@/components";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import SummaryCard from "../PlannerForm/SummaryCard";
import { useProfileSteps } from "@/hooks";

interface Props {
  submitFunction: (data: ProfileFormValues) => void;
  titleChangeFunction: (title?: string) => void;
  initialValues?: Partial<ProfileFormValues>;
  profile?: ProfileFormValues | null;
}

export const ProfileForm = ({
  profile,
  submitFunction: onSubmit,
  titleChangeFunction,
  initialValues,
}: Props) => {
  const { t } = useTranslation();
  const { steps } = useProfileSteps();
  const [currentStep, setCurrentStep] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(schema_profileForm),
    mode: "onChange",
    defaultValues: {
      unitSystem: "metric",
      gender: "female",
      ...initialValues,
    },
  });

  const unitSystem = watch("unitSystem");
  const gender = watch("gender");

  const getUnit = (field: string) => {
    if (field === "weight") return unitSystem === "metric" ? "kg" : "lbs";
    if (field === "height") return unitSystem === "metric" ? "cm" : "inches";
    if (field === "age") return "";
    return unitSystem === "metric" ? "cm" : "inches"; // For waist, neck, hip
  };

  useEffect(() => {
    if (currentStep === steps.length) {
      titleChangeFunction(t("profilePage.titleReview"));
    }
  }, [currentStep, t, titleChangeFunction, steps.length]);
  const nextStep = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    if (newStep === steps.length) {
      titleChangeFunction(t("profilePage.titleReview"));
    }
  };
  const prevStep = () => {
    titleChangeFunction();
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="min-h-[12rem] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {steps[currentStep].type === "radio" ? (
            <CustomRadiogroup<ProfileFormValues>
              key={steps[currentStep].name}
              control={control}
              name={steps[currentStep].name as keyof ProfileFormValues}
              defaultValue={steps[currentStep].defaultValue || ""}
              options={steps[currentStep].options || []}
              error={errors[steps[currentStep].name as keyof ProfileFormValues]}
            />
          ) : currentStep < steps.length - 1 ? (
            !(gender === "male" && steps[currentStep].name === "hips") && (
              <CustomNumberInput<ProfileFormValues>
                key={steps[currentStep].name}
                control={control}
                name={steps[currentStep].name as keyof ProfileFormValues}
                label={steps[currentStep].title}
                unit={getUnit(steps[currentStep].name)}
                error={
                  errors[steps[currentStep].name as keyof ProfileFormValues]
                }
              />
            )
          ) : (
            <SummaryCard key="summary" data={profile as ProfileFormValues} />
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
            {t("profileForm.buttons.back")}
          </Button>
        )}

        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            className="text-lg p-4"
            disabled={
              !!errors[steps[currentStep].name as keyof ProfileFormValues]
            }
          >
            {t("profileForm.buttons.next")}
          </Button>
        ) : (
          <Button
            type="submit"
            className={cn("text-lg p-4", errors && "cursor-not-allowed")}
            disabled={!!errors}
          >
            {t("profileForm.buttons.submit")}
          </Button>
        )}
      </div>
    </motion.form>
  );
};
