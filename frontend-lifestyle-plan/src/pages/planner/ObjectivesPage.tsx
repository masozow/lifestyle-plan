import { ObjectivesCard } from "@/components";
import { motion } from "motion/react";

export const ObjectivesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-90 sm:w-1/2 mx-auto mt-10"
    >
      <ObjectivesCard />
    </motion.div>
  );
};
