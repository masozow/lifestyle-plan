import { ProfileForm } from "@/components";
import { useAuthStore } from "@/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ProfilePage = () => {
  const { t } = useTranslation();
  const [customTitle, setCustomTitle] = useState<string | undefined>();
  const { credentials } = useAuthStore((state) => state);

  console.log("Credentials from Zustand:", credentials!);
  const handleFormTitleChange = (title?: string) => {
    setCustomTitle(title);
  };

  const formTitle = customTitle || t("profilePage.title");

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl font-bold tracking-wider mx-auto p-4">
        {formTitle}
      </h2>
      <ProfileForm titleChangeFunction={handleFormTitleChange} />
    </div>
  );
};
