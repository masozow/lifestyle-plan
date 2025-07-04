import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type Props = {
  textSize?: string;
};

export const CheckingCredentialsLoader = ({ textSize }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col justify-center items-center h-full w-full m-auto"
    >
      <motion.p
        className={cn("text-2xl", textSize)}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "circInOut" }}
      >
        Checking credentials
      </motion.p>
    </motion.div>
  );
};
