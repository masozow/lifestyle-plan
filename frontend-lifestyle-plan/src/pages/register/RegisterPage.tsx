import { RegisterForm } from "@/components";
import landing_image from "../landing/landing_image.png";
import { AuthFormWrapper } from "@/layouts";

export const RegisterPage = () => {
  return (
    <AuthFormWrapper
      landing_image_url={landing_image}
      landing_image_alt="Woman cooking"
    >
      <RegisterForm />
    </AuthFormWrapper>
  );
};
