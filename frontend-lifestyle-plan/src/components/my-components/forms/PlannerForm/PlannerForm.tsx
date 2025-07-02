import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { schema_plannerForm, type PlannerFormValues } from "@/schemas";
import { CustomRadiogroup, CustomTextArea } from "@/components";
import SummaryCard from "./SummaryCard";
import { useTranslation } from "react-i18next";
import { useApiRequest, useSteps } from "@/hooks";
import { plannerSteps } from "@/config";
import { usePlanStore, useSessionStore } from "@/store";
import { useNavigate } from "react-router";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import { toast } from "sonner";
import { X } from "lucide-react";

interface Props {
  titleChangeFunction: (title?: string) => void;
  initialValues?: Partial<PlannerFormValues>;
}

export const PlannerForm = ({ titleChangeFunction, initialValues }: Props) => {
  const { t } = useTranslation();
  const { steps, getDefaultValues } = useSteps(plannerSteps);
  const defaultValues = getDefaultValues();
  const { user } = useSessionStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { plan, setPlan } = usePlanStore((state) => state);
  const [showSubmit, setShowSubmit] = useState(false);
  const plannerMutation = useApiRequest<PlannerFormValues>({
    url: API_ENDPOINTS.plan,
    method: "POST",
  });

  const onSubmit = async (data: PlannerFormValues) => {
    // console.log("onSubmit", {
    //   ...data,
    // });
    if (user?.id) {
      try {
        const result = await plannerMutation.mutateAsync({
          ...data,
        });
        console.log("Mutation started:", result);
      } catch (error) {
        console.error("Error during plan mutation:", error);
      }
    } else {
      toast.error("User session is missing. Please log in again.");
    }
  };

  const form = useForm<PlannerFormValues>({
    resolver: zodResolver(schema_plannerForm),
    mode: "onBlur",
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = form;

  useEffect(() => {
    if (plannerMutation.isSuccess) {
      toast.success(plannerMutation.data?.message || "Profile created", {
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
      navigate("/app/new-plan");
    }

    if (plannerMutation.isError) {
      toast.error(plannerMutation.error?.message, {
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
    plannerMutation.isSuccess,
    plannerMutation.isError,
    plannerMutation.error?.message,
    plannerMutation.data?.message,
    getValues,
    navigate,
  ]);

  useEffect(() => {
    if (currentStep === steps.length) {
      titleChangeFunction(t("plannerPage.titleReview"));
    }
  }, [currentStep, t, titleChangeFunction, steps.length]);
  const [isCompleted, setIsCompleted] = useState(false);
  const nextStep = async () => {
    const isValid = await trigger(
      steps[currentStep].name as keyof PlannerFormValues
    );
    if (!isValid) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      const formData = getValues();
      setPlan(formData);
      titleChangeFunction(t("plannerPage.titleReview"));
      setTimeout(() => setShowSubmit(true), 0);
    }
  };

  const prevStep = () => {
    titleChangeFunction();
    setCurrentStep((prev) => prev - 1);
    setIsCompleted(false);
    setShowSubmit(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
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
              title={`${steps[currentStep].title}`}
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
                autoFocus={true}
              />
            )
          )}
          {isCompleted && (
            <SummaryCard<PlannerFormValues>
              data={plan ?? null}
              translationPrefix="plannerForm"
            />
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

        {!isCompleted || !showSubmit ? (
          <Button type="button" onClick={nextStep} className="text-lg p-4">
            {t("plannerForm.buttons.next")}
          </Button>
        ) : (
          <Button type="submit" className="text-lg p-4">
            {t("plannerForm.buttons.submit")}
          </Button>
        )}
      </div>
    </motion.form>
  );
};
