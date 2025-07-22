import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useApiRequest, useGroupedSteps } from "@/hooks";
import { schema_registerForm, type RegisterFormValues } from "@/schemas";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAuthStore, useSessionStore } from "@/store";
import { CustomRadiogroup } from "@/components";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { registerGroupedSteps } from "@/config/stepsForForms/registerSteps";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export const RegisterFormSteps = () => {
  const navigate = useNavigate();
  const { setCredentials } = useAuthStore();
  const { fetchSession } = useSessionStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const { t } = useTranslation();
  const registerMutation = useApiRequest<RegisterFormValues>({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`,
    method: "POST",
  });

  const loginMutation = useApiRequest({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`,
    method: "POST",
  });

  const { steps, fieldNamesPerStep, getDefaultValues } =
    useGroupedSteps(registerGroupedSteps);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema_registerForm),
    mode: "onBlur",
    defaultValues: {
      ...getDefaultValues(),
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      phone: "",
      birthDate: "",
      statusId: 1,
      roleId: 2,
      gender: "male",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = form;

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      setTimeout(() => {
        setShowSubmit(true);
      }, 0);
    }
  }, [currentStep, steps.length]);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const handleSessionFetch = async () => {
        await fetchSession();
        navigate("/app/profile");
      };
      handleSessionFetch();
    }
  }, [loginMutation.isSuccess, fetchSession, navigate]);

  const onSubmit = async (data: RegisterFormValues) => {
    const { email, password } = data;
    setCredentials(email, password);

    try {
      const registerResult = await registerMutation.mutateAsync(data);

      toast.success(registerResult.message || "Registered! Logging in...", {
        action: (
          <Button
            onClick={() => toast.dismiss()}
            variant="ghost"
            className="font-bold"
          >
            <X className="h-4 w-4" />
          </Button>
        ),
      });

      await loginMutation.mutateAsync({ email, password });
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unexpected registration error."
      );
    }
  };

  const handleNext = async () => {
    const currentFields = fieldNamesPerStep[
      currentStep
    ] as (keyof RegisterFormValues)[];
    const isValid = await trigger(currentFields);

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setShowSubmit(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 justify-center items-center w-[80%] sm:w-[40%]"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t("registerPage.title")}</h1>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 w-full"
          >
            {steps[currentStep].map((step, index) => (
              <FormField
                key={step.name}
                control={control}
                name={step.name as keyof RegisterFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{step.title}</FormLabel>
                    <FormControl>
                      {step.type === "radio" ? (
                        <CustomRadiogroup<RegisterFormValues>
                          control={control}
                          title={step.title}
                          name={step.name as keyof RegisterFormValues}
                          options={step.options || []}
                          defaultValue={step.defaultValue || ""}
                          error={errors[step.name as keyof RegisterFormValues]}
                          autoFocus={false}
                        />
                      ) : (
                        <Input
                          type={
                            step.type === "password" ? "password" : step.type
                          }
                          placeholder={step.title}
                          autoFocus={index === 0}
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          {currentStep > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="text-lg p-4"
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {!showSubmit ? (
            <Button
              type="button"
              onClick={handleNext}
              className="text-lg p-4"
              disabled={steps[currentStep].some(
                (step) => !!errors[step.name as keyof RegisterFormValues]
              )}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className={cn("text-lg p-4")}
              disabled={
                registerMutation.isPending || registerMutation.isSuccess
              }
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </Button>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </div>
      </form>
    </Form>
  );
};
