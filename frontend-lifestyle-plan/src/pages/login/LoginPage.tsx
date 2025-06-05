import { LoginForm } from "@/components";
import { Cherry } from "lucide-react";
import landing_image from "../landing/landing_image.png";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-2 p-4 justify-center items-center">
        <div className="flex sm:justify-center gap-2 justify-start mt-10">
          <Link
            to="/"
            className="flex items-center gap-2 font-medium justify-center"
          >
            <div className="flex h-6 w-6 sm:h-15 sm:w-15 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Cherry className="size-4 sm:size-10" />
            </div>
            Acme Inc.
          </Link>
        </div>
        <div className="flex flex-1 mt-6 items-start justify-center">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={landing_image}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
          style={{ width: "100vw", height: "100vh" }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
