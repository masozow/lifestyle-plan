import { lazy } from "react";
// import { NewPlanForm } from "@/components/my-components/forms/NewPlanForm/NewPlanForm";
const NewPlanForm = lazy(
  () => import("@/components/my-components/forms/NewPlanForm/NewPlanForm")
);
import { useTranslation } from "react-i18next";

const NewPlanPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl font-bold tracking-wider mx-auto p-4">
        {t("newPlanPage.title") || "Do you want to create a new plan?"}
      </h2>
      <NewPlanForm />
    </div>
  );
};

export default NewPlanPage;
