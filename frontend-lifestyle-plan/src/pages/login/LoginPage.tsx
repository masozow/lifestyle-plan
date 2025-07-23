import { LoginForm } from "@/components";
import landing_image from "../landing/landing_image.png";
import { AuthFormWrapper } from "@/layouts";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <AuthFormWrapper
      landing_image_url={landing_image}
      landing_image_alt={t("loginPage.imageAlt")}
    >
      <LoginForm />
    </AuthFormWrapper>
  );
};
