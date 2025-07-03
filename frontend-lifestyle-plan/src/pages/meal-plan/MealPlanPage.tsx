import { MealPlanForm } from "@/components";
import { motion } from "motion/react";

export const MealPlanPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full mx-auto pt-10 sm:pt-1  p-4 md:p-6 "
    >
      <MealPlanForm />
    </motion.div>
  );
};

export default MealPlanPage;
