import { ProfileForm } from "@/components";
import type { ProfileFormValues } from "@/schemas";
import { useProfileStore } from "@/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [customTitle, setCustomTitle] = useState<string | undefined>();
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);

  const onSubmit = (data: ProfileFormValues) => {
    setProfile(data);
    console.log("Profile data set in Zustand:", data);
  };

  const handleFormTitleChange = (title?: string) => {
    setCustomTitle(title);
  };

  const formTitle = customTitle || t("profilePage.title");
  console.log("Profile from store: ", profile);
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl font-bold tracking-wider mx-auto p-4">
        {formTitle}
      </h2>
      <ProfileForm
        submitFunction={onSubmit}
        profile={profile}
        titleChangeFunction={handleFormTitleChange}
      />
    </div>
  );
};

export default ProfilePage;
