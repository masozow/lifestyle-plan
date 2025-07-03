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
import { NeuralNetworkLoader } from "../../loaders/NeuralNetwork";
import type { PlannerFormValues, ProfileFormValues } from "@/schemas";
import { toast } from "sonner";

interface NewPlanFormPayload {
  objective: PlannerFormValues["objective"];
  restriction: PlannerFormValues["restriction"];
  preference: PlannerFormValues["preference"];
  extras: PlannerFormValues["extras"];
  age: number;
  gender: string;
  weight: ProfileFormValues["weight"];
  height: ProfileFormValues["height"];
  waist: ProfileFormValues["waist"];
  neck: ProfileFormValues["neck"];
  hip?: ProfileFormValues["hip"];
  language: LocaleCode;
}

export const NewPlanForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { plan } = usePlanStore((state) => state);
  const { profile } = useProfileStore();
  const { user } = useSessionStore();
  const locale = i18n.language as LocaleCode;

  const newPlanMutation = useApiRequest<NewPlanFormPayload>({
    url: `${API_ENDPOINTS.openai}/sendPrompt`,
    method: "POST",
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const age = diffYears(date(user?.birthDate), new Date());
    const payLoad: NewPlanFormPayload = {
      objective: plan?.objective ?? "",
      restriction: plan?.restriction ?? "",
      preference: plan?.preference ?? "",
      extras: plan?.extras ?? "",
      age: age,
      gender: user?.gender ?? "male",
      weight: profile?.weight ?? 0,
      height: profile?.height ?? 0,
      waist: profile?.waist ?? 0,
      neck: profile?.neck ?? 0,
      hip: profile?.hip,
      language: locale,
    };

    // console.log("Data to send to server:", payLoad);
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
  return (
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
        {newPlanMutation.isPending && (
          <NeuralNetworkLoader width={200} height={200} />
        )}
      </motion.div>
    </motion.form>
  );
};
