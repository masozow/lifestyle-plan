import { Link } from "react-router";
import landing_image from "./landing_image.png";
import { Button } from "@/components/ui/button";
import "./LandingPage.module.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// const LazyMotion = await import("motion/react");
export const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container flex flex-col justify-center items-center gap-12 pt-10 px-4 mx-auto sm:flex-row lg:px-40">
      <div className="flex flex-col w-full m-2 lg:m-5 xl:m-10 lg:mt:16 md:w-1/2 lg:w-1/3 xl:w-1/2">
        <motion.h1
          className="text-4xl font-bold text-center md:text-5xl lg:text-6xl lg:max-w-md sm:text-left"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {t("landingPage.title")}
        </motion.h1>
        <motion.div className="h-[72px] relative overflow-hidden">
          <motion.p
            className="text-1xl md:text-2xl text-center text-gray-400 lg:max-w-md sm:text-left absolute w-full"
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
            {t("landingPage.subtitle1")}
          </motion.p>

          <motion.p
            className="text-1xl md:text-2xl text-center text-gray-400 lg:max-w-md sm:text-left absolute w-full"
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
            {t("landingPage.subtitle2")}
          </motion.p>
        </motion.div>
        <div className="text-center ">
          <Button asChild className="mt-4 p-4 md:p-8 text-1xl md:text-2xl">
            <Link to="/app">{t("landingPage.button")}</Link>
          </Button>
        </div>
      </div>
      <div className="hidden w-1/2 sm:block mb-24 md:mb-0 md:w-1/2 lg:w-2/3 md:mx-auto xl:w-1/2">
        <img
          src={landing_image}
          alt="woman cooking"
          className="hover:filter hover:drop-shadow-lg transition-all duration-200 hover:scale-y-[0.98] hover:scale-x-[0.98]"
          loading="lazy"
        />
      </div>
    </div>
  );
};
