import { Cherry } from "lucide-react";
import type { JSX } from "react";
import { Link } from "react-router";

interface Props {
  children: React.ReactNode;
  landing_image_url: string;
  landing_image_alt: string;
}
export const AuthFormWrapper = ({
  children,
  landing_image_url,
  landing_image_alt,
}: Props): JSX.Element => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 my-5">
        <div className="flex justify-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 font-medium justify-center"
          >
            <div className="flex h-6 w-6 sm:h-15 sm:w-15 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Cherry className="size-4 sm:size-10" />
            </div>
            <p className="text-2xl font-bold">
              <span className="text-primary">Fit</span>app
            </p>
          </Link>
        </div>
        <div className="flex flex-1 items-start sm:mt-0 sm:items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={landing_image_url}
          alt={landing_image_alt}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthFormWrapper;
