// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   CustomRadiogroup,
//   CustomNumberInput,
//   CustomTextArea,
// } from "@/components";
// import type z from "zod";

// type FormStep = {
//   name: string;
//   titleKey: string;
//   type: "radio" | "number" | "textarea";
//   options?: { value: string; labelKey: string }[];
//   defaultValue?: string | number;
//   optional?: boolean;
// };

// interface MultiStepFormProps<T extends Record<string, any>> {
//   steps: FormStep[];
//   schema: z.ZodSchema<T>;
//   onSubmit: (data: T) => void;
//   initialValues?: Partial<T>;
//   summaryComponent?: React.ComponentType<{ data: T }>;
// }

// export const MultiStepForm = <T extends Record<string, any>>({
//   steps,
//   schema,
//   onSubmit,
//   summaryComponent: SummaryComponent,
// }: MultiStepFormProps<T>) => {
//   const { t } = useTranslation();
//   const [currentStep, setCurrentStep] = useState(0);

//   const {
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<T>({
//     resolver: zodResolver(schema),
//     defaultValues: steps.reduce(
//       (acc, step) => ({
//         ...acc,
//         [step.name]: step.defaultValue,
//       }),
//       {} as T
//     ),
//   });

//   const nextStep = () => setCurrentStep((prev) => prev + 1);
//   const prevStep = () => setCurrentStep((prev) => prev - 1);

//   const currentField = steps[currentStep];
//   const isLastStep = currentStep === steps.length - 1;
//   const showSummary = currentStep === steps.length;

//   return (
//     <motion.form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex flex-col justify-between gap-6"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeInOut" }}
//     >
//       <div className="min-h-[12rem] flex flex-col justify-center">
//         <AnimatePresence mode="wait">
//           {showSummary && SummaryComponent ? (
//             <SummaryComponent data={watch()} />
//           ) : currentField.type === "radio" ? (
//             <CustomRadiogroup
//               key={currentField.name}
//               control={control}
//               name={currentField.name as keyof T}
//               defaultValue={currentField.defaultValue?.toString() || ""}
//               options={
//                 currentField.options?.map((opt) => ({
//                   value: opt.value,
//                   label: t(opt.labelKey),
//                 })) || []
//               }
//               error={errors[currentField.name as keyof T]}
//             />
//           ) : currentField.type === "number" ? (
//             <CustomNumberInput
//               key={currentField.name}
//               control={control}
//               name={currentField.name as keyof T}
//               label={t(currentField.titleKey)}
//               error={errors[currentField.name as keyof T]}
//             />
//           ) : (
//             <CustomTextArea
//               key={currentField.name}
//               control={control}
//               name={currentField.name as keyof T}
//               label={t(currentField.titleKey)}
//               error={errors[currentField.name as keyof T]}
//             />
//           )}
//         </AnimatePresence>
//       </div>

//       <div className="flex gap-4 justify-end">
//         {currentStep > 0 && (
//           <Button
//             type="button"
//             onClick={prevStep}
//             className="text-lg p-4"
//             variant="outline"
//           >
//             {t("form.buttons.back")}
//           </Button>
//         )}

//         {!showSummary ? (
//           <Button
//             type="button"
//             onClick={nextStep}
//             className="text-lg p-4"
//             disabled={!!errors[currentField.name as keyof T]}
//           >
//             {isLastStep ? t("form.buttons.review") : t("form.buttons.next")}
//           </Button>
//         ) : (
//           <Button type="submit" className="text-lg p-4">
//             {t("form.buttons.submit")}
//           </Button>
//         )}
//       </div>
//     </motion.form>
//   );
// };
