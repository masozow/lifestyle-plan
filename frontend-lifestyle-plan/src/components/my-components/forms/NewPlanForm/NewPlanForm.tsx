import { Button } from "@/components/ui/button";
import { usePlanStore, useProfileStore, useSessionStore } from "@/store";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { diffYears, date } from "@formkit/tempo";
import type { LocaleCode } from "@/locales/localesTypes";
import { useApiRequest } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useEffect } from "react";

import { toast } from "sonner";
import { NeuralNetworkLoader } from "@/components/my-components/loaders/NeuralNetwork";

const NewPlanForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { plan } = usePlanStore((state) => state);
  const { profile } = useProfileStore();
  const { user } = useSessionStore();
  const locale = i18n.language as LocaleCode;

  const newPlanMutation = useApiRequest({
    url: `${API_ENDPOINTS.openai}/sendPrompt`,
    method: "POST",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const age = diffYears(date(user?.birthDate), new Date());
    const payLoad = {
      ...plan,
      age,
      gender: user?.gender,
      ...profile,
      language: locale,
    };

    if (!payLoad) return;
    newPlanMutation.mutate(payLoad);
  };

  useEffect(() => {
    if (newPlanMutation.isSuccess) {
      toast.success(newPlanMutation.data.message);
      setTimeout(() => {
        navigate("/app/meal-plan");
      }, 0);
    } else if (newPlanMutation.isError) {
      toast.error(newPlanMutation.error.message);
    }
  }, [
    navigate,
    newPlanMutation.isSuccess,
    newPlanMutation.isError,
    newPlanMutation.error?.message,
    newPlanMutation.data?.message,
  ]);

  return !newPlanMutation.isPending ? (
    <motion.form
      className="flex flex-col justify-between gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onSubmit={onSubmit}
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
            <Link to="/app">{t("newPlanForm.buttons.secondary")}</Link>
          </Button>

          <Button type="submit" className="text-lg px-4 py-8">
            {t("newPlanForm.buttons.primary")}
          </Button>
        </div>
      </motion.div>
    </motion.form>
  ) : (
    <div className="flex items-center justify-center w-full h-full mx-auto">
      <NeuralNetworkLoader style={{ height: "100%", width: "100%" }} />
    </div>
  );
};
export default NewPlanForm;
