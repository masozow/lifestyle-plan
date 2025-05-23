import { Link } from "react-router";
import landing_image from "./landing_image.png";
import { Button } from "@/components/ui/button";
import "./LandingPage.module.css";
import { motion } from "motion/react";
const LandingPage = () => {
  return (
    <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
      <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
        <motion.h1
          className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Plan your daily meals with no stress.
        </motion.h1>
        <motion.div className="h-[72px] relative overflow-hidden">
          <motion.p
            className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left absolute w-full"
            initial={{ y: 0, opacity: 1 }}
            animate={{
              y: [0, -72, -72, 0, 0],
              opacity: [1, 0, 0, 0, 1],
            }}
            transition={{
              duration: 12,
              times: [0, 0.083, 0.5, 0.583, 1],
              repeat: Infinity,
              delay: 4,
            }}
          >
            Set your goals and adjust your meals to fit your lifestyle.
          </motion.p>

          <motion.p
            className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left absolute w-full"
            initial={{ y: 72, opacity: 0 }}
            animate={{
              y: [72, 0, 0, -72, -72],
              opacity: [0, 1, 1, 0, 0],
            }}
            transition={{
              duration: 12,
              times: [0, 0.083, 0.5, 0.583, 1],
              repeat: Infinity,
              delay: 4,
            }}
          >
            Provide feedback and track your progress.
          </motion.p>
        </motion.div>
        <div className="mx-auto lg:mx-0 ">
          <Button asChild className="p-8 text-2xl">
            <Link to="/">Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
        <img
          src={landing_image}
          alt="woman cooking"
          className="hover:filter hover:drop-shadow-lg transition-all duration-200 hover:scale-y-[0.98] hover:scale-x-[0.98]"
        />
      </div>
    </div>
  );
};

export default LandingPage;
