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
import { useApiRequest } from "@/hooks";
import { schema_registerForm, type RegisterFormValues } from "@/schemas";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAuthStore, useSessionStore } from "@/store";
import { CustomRadiogroup } from "@/components";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const RegisterFormSteps = () => {
  const navigate = useNavigate();
  const { setCredentials } = useAuthStore();
  const { fetchSession } = useSessionStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);

  const registerMutation = useApiRequest<RegisterFormValues>({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`,
    method: "POST",
  });

  const loginMutation = useApiRequest({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`,
    method: "POST",
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema_registerForm),
    mode: "onBlur",
    defaultValues: {
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
    formState: { errors },
  } = form;

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
      const registerResult = await registerMutation.mutateAsync({
        ...data,
        statusId: 1,
        roleId: 2,
      });

      toast.success(
        registerResult.message || "Registration successful! Logging in...",
        {
          action: (
            <Button
              onClick={() => toast.dismiss()}
              variant="ghost"
              className="font-bold"
            >
              <X className="h-4 w-4" />
            </Button>
          ),
        }
      );

      await loginMutation.mutateAsync({ email, password });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred during registration or login.");
      }
    }
  };

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 0) {
      isValid = await form.trigger(["name", "phone"]);
    } else if (currentStep === 1) {
      isValid = await form.trigger(["email", "password", "confirmPassword"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["birthDate", "gender"]);
    }

    if (isValid) {
      if (currentStep < 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setCurrentStep(2);
        setTimeout(() => {
          setShowSubmit(true);
        }, 0);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setShowSubmit(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 justify-start"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        {/* Step 1: Name and Phone */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="55544433" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Step 2: Email and Passwords */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Step 3: Birth Date and Gender */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="YYYY-MM-DD"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomRadiogroup<RegisterFormValues>
              control={form.control}
              title="Gender"
              name="gender"
              defaultValue="male"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              error={form.formState.errors.gender}
            />
          </div>
        )}

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
            <div /> // Empty div to maintain space
          )}

          {currentStep < 2 ? (
            <Button type="button" onClick={handleNext} className="text-lg p-4">
              Next
            </Button>
          ) : showSubmit ? (
            <Button
              type="submit"
              className={cn("text-lg p-4")}
              disabled={
                registerMutation.isPending || registerMutation.isSuccess
              }
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className="text-lg p-4"
              disabled={!form.errors}
            >
              Next
            </Button>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Step {currentStep + 1} of 3
        </div>
      </form>
    </Form>
  );
};
