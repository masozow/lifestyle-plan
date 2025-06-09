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
import { useApiRequest, useSteps } from "@/hooks";
import { profileSteps } from "@/config";
import { useProfileStore, useSessionStore } from "@/store";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { date, diffYears } from "@formkit/tempo";

interface Props {
  titleChangeFunction: (title?: string) => void;
  initialValues?: Partial<ProfileFormValues>;
}

export const ProfileForm = ({ titleChangeFunction, initialValues }: Props) => {
  const { t } = useTranslation();
  const { setProfile } = useProfileStore();
  const { user } = useSessionStore();

  const { steps, getDefaultValues } = useSteps(
    profileSteps,
    user?.gender === "male" ? "hip" : null
  );

  const defaultValues = getDefaultValues();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const navigate = useNavigate();

  const profileMutation = useApiRequest<ProfileFormValues & { userId: number }>(
    {
      url: API_ENDPOINTS.profile,
      method: "POST",
    }
  );
  const age = diffYears(new Date(), date(user?.birthDate)) || 18;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema_profileForm),
    mode: "onBlur",
    defaultValues: {
      ...defaultValues,
      ...initialValues,
      age: age,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
    trigger,
  } = form;

  const unitSystem = watch("unitSystem");

  const getUnit = (field: string) => {
    if (field === "weight") return unitSystem === "metric" ? "kg" : "lbs";
    if (field === "height") return unitSystem === "metric" ? "cm" : "inches";
    // if (field === "age") return "";
    return unitSystem === "metric" ? "cm" : "inches";
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (user?.id) {
      try {
        const result = await profileMutation.mutateAsync({
          ...data,
          userId: user.id,
          age: age,
        });
        console.log("Mutation started:", result);
      } catch (error) {
        console.error("Error during profile mutation:", error);
      }
    } else {
      toast.error("User session is missing. Please log in again.");
    }
  };

  const isStepValid = async () => {
    const currentField = steps[currentStep].name;
    await trigger(currentField as keyof ProfileFormValues);
    return !errors[currentField as keyof ProfileFormValues];
  };

  const handleNext = async () => {
    if (await isStepValid()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        titleChangeFunction(t("profilePage.titleReview"));
        setTimeout(() => setShowSubmit(true), 0);
      }
    }
  };

  const prevStep = () => {
    setIsCompleted(false);
    setShowSubmit(false);
    titleChangeFunction();
    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (profileMutation.isSuccess) {
      const formData = getValues();
      toast.success(profileMutation.data?.message || "Profile created", {
        action: (
          <Button
            variant="ghost"
            className="font-bold"
            onClick={() => toast.dismiss()}
          >
            <X className="h-4 w-4" />
          </Button>
        ),
      });
      setProfile({ ...formData, age: age });
      navigate("/app/dashboard");
    }

    if (profileMutation.isError) {
      toast.error(profileMutation.error?.message || "An error occurred", {
        action: (
          <Button
            variant="ghost"
            className="font-bold"
            onClick={() => toast.dismiss()}
          >
            <X className="h-4 w-4" />
          </Button>
        ),
      });
    }
  }, [
    profileMutation.isSuccess,
    profileMutation.isError,
    profileMutation.error?.message,
    profileMutation.data?.message,
    getValues,
    setProfile,
    navigate,
    age,
  ]);

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
              title={steps[currentStep].title}
              name={steps[currentStep].name as keyof ProfileFormValues}
              defaultValue={steps[currentStep].defaultValue || ""}
              options={steps[currentStep].options || []}
              error={errors[steps[currentStep].name as keyof ProfileFormValues]}
            />
          ) : (
            !isCompleted && (
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
          )}
          {isCompleted && (
            <SummaryCard<ProfileFormValues>
              data={getValues()}
              translationPrefix="profileForm"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 justify-end">
        {currentStep > 0 && (
          <Button
            type="button"
            onClick={prevStep}
            variant="outline"
            className="text-lg p-4"
          >
            {t("profileForm.buttons.back")}
          </Button>
        )}
        {!isCompleted || !showSubmit ? (
          <Button
            type="button"
            onClick={handleNext}
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
            className={cn("text-lg p-4")}
            disabled={profileMutation.isPending || profileMutation.isSuccess}
          >
            {t("profileForm.buttons.submit")}
          </Button>
        )}
      </div>
    </motion.form>
  );
};
