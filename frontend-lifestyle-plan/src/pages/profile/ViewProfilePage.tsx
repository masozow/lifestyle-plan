import { ProfileCard } from "@/components";
import { motion } from "motion/react";

const ViewProfilePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-90 sm:w-1/2 mx-auto mt-10"
    >
      <ProfileCard />
    </motion.div>
  );
};

export default ViewProfilePage;
