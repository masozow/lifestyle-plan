import { NewUserForm } from "@/components";
import { useTranslation } from "react-i18next";

export const NewUserPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl font-bold tracking-wider mx-auto p-4">
        {t("newUserPage.title") || "New User"}
      </h2>
      <NewUserForm />
    </div>
  );
};
