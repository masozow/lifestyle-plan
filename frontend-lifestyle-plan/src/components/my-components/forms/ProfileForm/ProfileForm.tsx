import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { schema_profileForm, type ProfileFormValues } from "@/schemas";
import { CustomRadiogroup, CustomNumberInput } from "@/components";
import { useTranslation } from "react-i18next";

interface Props {
  onSubmit: (data: ProfileFormValues) => void;
  initialValues?: Partial<ProfileFormValues>;
}

export const ProfileForm = ({ onSubmit, initialValues }: Props) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      name: "unitSystem",
      title: t("profileForm.unitSystem.title"),
      options: [
        { value: "metric", label: t("profileForm.unitSystem.metric") },
        { value: "imperial", label: t("profileForm.unitSystem.imperial") },
      ],
      defaultValue: "metric",
      type: "radio",
    },
    {
      name: "gender",
      title: t("profileForm.gender.title"),
      options: [
        { value: "female", label: t("profileForm.gender.female") },
        { value: "male", label: t("profileForm.gender.male") },
      ],
      defaultValue: "female",
      type: "radio",
    },
    {
      name: "weight",
      title: t("profileForm.weight"),
      type: "number",
    },
    {
      name: "height",
      title: t("profileForm.height"),
      type: "number",
    },
    {
      name: "age",
      title: t("profileForm.age"),
      type: "number",
    },
    {
      name: "waist",
      title: t("profileForm.waist"),
      type: "number",
    },
    {
      name: "neck",
      title: t("profileForm.neck"),
      type: "number",
    },
    {
      name: "hip",
      title: t("profileForm.hip"),
      type: "number",
      optional: true,
    },
  ];

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
  //   const gender = watch("gender");

  const getUnit = (field: string) => {
    if (field === "weight") return unitSystem === "metric" ? "kg" : "lbs";
    if (field === "height") return unitSystem === "metric" ? "cm" : "inches";
    return "cm"; // For waist, neck, hip
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

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
          ) : (
            <CustomNumberInput<ProfileFormValues>
              key={steps[currentStep].name}
              control={control}
              name={steps[currentStep].name as keyof ProfileFormValues}
              label={steps[currentStep].title}
              unit={getUnit(steps[currentStep].name)}
              error={errors[steps[currentStep].name as keyof ProfileFormValues]}
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
            {t("form.buttons.back")}
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
            {t("form.buttons.next")}
          </Button>
        ) : (
          <Button type="submit" className="text-lg p-4">
            {t("form.buttons.submit")}
          </Button>
        )}
      </div>
    </motion.form>
  );
};
