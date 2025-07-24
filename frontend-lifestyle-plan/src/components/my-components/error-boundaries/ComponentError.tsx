import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { type FallbackProps } from "react-error-boundary";

// interface Props {}

const ComponentError = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();
  console.error(`Error message: ${error?.message}\n\nStack:\n${error?.stack}`);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full flex-wrap gap-10">
      <h1 className="text-6xl md:text-9xl font-bold">
        {" "}
        {t("errorBoundaries.componentError.title")}
      </h1>
      <h2 className="text-3xl md:text-6xl font-semibold">
        {t("errorBoundaries.componentError.message")}
      </h2>
      <div className="flex flex-wrap justify-between gap-10">
        <Button asChild className="mt-10" variant="secondary">
          <a
            href={`mailto:support@support.com?subject=App%20Error&body=${encodeURIComponent(
              `Error message: ${error?.message}\n\nStack:\n${error?.stack}`
            )}`}
            className="h-[4rem]"
          >
            <span className="text-1xl md:text-3xl">
              {t("errorBoundaries.componentError.buttonSecondary")}
            </span>
          </a>
        </Button>
        <Button
          className="mt-10 h-[4rem] cursor-pointer"
          onClick={() => resetErrorBoundary()}
        >
          <span className="text-1xl md:text-3xl">
            {t("errorBoundaries.componentError.buttonPrimary")}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ComponentError;
