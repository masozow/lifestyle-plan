import { lazy } from "react";
const LoginForm = lazy(
  () => import("@/components/my-components/forms/LoginForm/LoginForm")
);
import landing_image from "../landing/landing_image.png";
import { AuthFormWrapper } from "@/layouts/auth-form-layout/AuthFormWrapper";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
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

export default LoginPage;
