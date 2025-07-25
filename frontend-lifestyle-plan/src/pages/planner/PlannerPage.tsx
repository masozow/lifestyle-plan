import { lazy } from "react";
const PlannerForm = lazy(
  () => import("@/components/my-components/forms/PlannerForm/PlannerForm")
);
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PlannerPage = () => {
  const { t } = useTranslation();
  const [customTitle, setCustomTitle] = useState<string | undefined>();

  const handleFormTitleChange = (title?: string) => {
    setCustomTitle(title);
  };

  const formTitle = customTitle || t("plannerPage.title");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="max-w-md mx-auto p-4"
    >
      <h2 className="text-3xl font-bold tracking-wider">{formTitle}</h2>
      <PlannerForm titleChangeFunction={handleFormTitleChange} />
    </motion.div>
  );
};

export default PlannerPage;
