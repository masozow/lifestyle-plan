import { lazy } from "react";
const ProfileForm = lazy(
  () => import("@/components/my-components/forms/ProfileForm/ProfileForm")
);
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [customTitle, setCustomTitle] = useState<string | undefined>();

  const handleFormTitleChange = (title?: string) => {
    setCustomTitle(title);
  };

  const formTitle = customTitle || t("profilePage.title");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="max-w-md mx-auto p-4 flex flex-col gap-4 w-full"
    >
      <h2 className="text-3xl font-bold tracking-wider">{formTitle}</h2>
      <ProfileForm titleChangeFunction={handleFormTitleChange} />
    </motion.div>
  );
};

export default ProfilePage;
