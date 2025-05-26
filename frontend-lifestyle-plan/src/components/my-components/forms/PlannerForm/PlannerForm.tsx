import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { schema_plannerForm, type PlannerFormValues } from "@/schemas";
import { steps } from "./helpers";

type FormType = z.infer<typeof schema_plannerForm>;

export const PlannerForm = () => {
  const [plan, setPlan] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlannerFormValues>({
    resolver: zodResolver(schema_plannerForm),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormType) => {
    console.log("Data: ", data);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="min-h-[10rem] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentStep < 3 && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Label className="text-2xl font-semibold">
                {steps[currentStep].title}
              </Label>
              <RadioGroup defaultValue={steps[currentStep].defaultValue}>
                {steps[currentStep].options &&
                  steps[currentStep].options.map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={opt}
                        id={`${steps[currentStep].name}-${opt}`}
                        {...register(steps[currentStep].name)}
                      />
                      <Label
                        className="capitalize cursor-pointer"
                        htmlFor={`${steps[currentStep].name}-${opt}`}
                      >
                        {opt}
                      </Label>
                    </div>
                  ))}
              </RadioGroup>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="textarea"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Label className="text-2xl">{steps[currentStep].title}</Label>
              <Textarea
                placeholder={`${steps[currentStep].title}...`}
                {...register("extras")}
                className="mt-4 resize-none overflow-y-scroll h-[5rem]"
                rows={4}
              />
            </motion.div>
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

        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={nextStep} className="text-lg p-4">
            Next
          </Button>
        ) : (
          <Button type="submit" className="text-lg p-4">
            Generate Plan
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
          <pre className="whitespace-pre-wrap">{plan}</pre>
        </motion.div>
      )}
    </motion.form>
  );
};
