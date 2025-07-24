import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

// interface Props {}

const ComponentError = () => {
  const { t } = useTranslation();
  const handleReload = () => {
    window.location.reload();
  };
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
          <NavLink to="/" className="h-[4rem]">
            <span className="text-1xl md:text-3xl">
              {t("errorBoundaries.componentError.buttonSecondary")}
            </span>
          </NavLink>
        </Button>
        <Button className="mt-10 h-[4rem]" onClick={handleReload}>
          <span className="text-1xl md:text-3xl">
            {t("errorBoundaries.componentError.buttonPrimary")}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ComponentError;
