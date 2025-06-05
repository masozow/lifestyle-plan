import { PlannerForm } from "@/components";
import type { PlannerFormValues } from "@/schemas";
import { usePlanStore } from "@/store";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const PlannerPage = () => {
  const { t } = useTranslation();
  const [customTitle, setCustomTitle] = useState<string | undefined>();
  const plan = usePlanStore((state) => state.plan);
  const setPlan = usePlanStore((state) => state.setPlan);
  const onSubmit = async (data: PlannerFormValues) => {
    setPlan(data);
  };

  const handleFormTitleChange = (title?: string) => {
    setCustomTitle(title);
  };

  const formTitle = customTitle || t("plannerPage.title");
  console.log("Plan from store: ", plan);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="max-w-xl mx-auto pt-10 sm:pt-1"
    >
      <h2 className="text-3xl font-bold tracking-wider mx-auto p-4">
        {formTitle}
      </h2>
      <PlannerForm
        submitFunction={onSubmit}
        plan={plan}
        titleChangeFunction={handleFormTitleChange}
      />
    </motion.div>
  );
};
