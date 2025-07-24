import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  textSize?: string;
  text: string;
};

export const TextWaveBase = ({ textSize, text }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full m-auto">
      <p className={cn("flex gap-[1px]", textSize ?? "text-4xl")}>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: index * 0.06,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </p>
    </div>
  );
};
