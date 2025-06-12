import { Button } from "@/components/ui/button";
import { usePlanStore, useProfileStore, useSessionStore } from "@/store";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { diffYears, date } from "@formkit/tempo";
export const NewPlanForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { plan, setPlan } = usePlanStore((state) => state);
  const { profile, setProfile } = useProfileStore();
  const { user } = useSessionStore();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const age = diffYears(date(user?.birthDate), new Date());
    console.log({
      ...plan,
      userId: user?.id,
      age: age,
      gender: user?.gender,
      ...profile,
    });
    // setTimeout(() => {
    //   navigate("/app/meal-plan");
    // }, 0);
  };
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
            <Link to="/app/dashboard">
              {t("newPlanForm.buttons.secondary")}
            </Link>
          </Button>

          <Button type="submit" className="text-lg px-4 py-8">
            {t("newPlanForm.buttons.primary")}
          </Button>
        </div>
      </motion.div>
    </motion.form>
  );
};
