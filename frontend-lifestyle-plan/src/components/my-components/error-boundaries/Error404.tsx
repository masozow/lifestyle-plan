import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export const Error404 = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full flex-wrap gap-10">
      <h1 className="text-9xl font-bold"> {t("errorBoundaries.404.title")}</h1>
      <h2 className="text-6xl font-semibold">
        {t("errorBoundaries.404.message")}
      </h2>
      <Button asChild className="mt-10">
        <NavLink to="/" className="h-[4rem]">
          <span className="text-3xl">{t("errorBoundaries.404.button")}</span>
        </NavLink>
      </Button>
    </div>
  );
};
