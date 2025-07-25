import { lazy } from "react";
import landing_image from "../landing/landing_image.png";
import { AuthFormWrapper } from "@/layouts/auth-form-layout/AuthFormWrapper";

const RegisterFormSteps = lazy(
  () =>
    import("@/components/my-components/forms/RegisterForm/RegisterFormSteps")
);
export const RegisterPage = () => {
  return (
    <AuthFormWrapper
      landing_image_url={landing_image}
      landing_image_alt="Woman cooking"
    >
      <RegisterFormSteps />
      {/* <RegisterForm /> */}
    </AuthFormWrapper>
  );
};

export default RegisterPage;
