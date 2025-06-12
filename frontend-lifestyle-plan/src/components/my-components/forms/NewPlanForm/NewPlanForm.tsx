import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const NewPlanForm = () => {
  const { t } = useTranslation();

  return (
    <motion.form
      className="flex flex-col justify-between gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="min-h-[12rem] flex flex-col justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex w-full justify-between">
          <Button
            type="button"
            variant="outline"
            className="text-lg px-4 py-8"
            asChild
          >
            <Link to="/app/dashboard">{t(".buttons.secondary")}</Link>
          </Button>

          <Button type="button" className="text-lg px-4 py-8" asChild>
            <Link to="/app/meal-plan"> {t(".buttons.primary")}</Link>
          </Button>
        </div>
      </motion.div>
    </motion.form>
  );
};
