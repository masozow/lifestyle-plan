import { useLocale } from "@/hooks/useLocale";
import { Button } from "../ui/button";

export const LanguageToggle = () => {
  const { locale, changeLocale } = useLocale();

  return (
    <Button onClick={() => changeLocale(locale === "es" ? "en" : "es")}>
      {locale === "es" ? "Switch to English" : "Cambiar a Español"}
    </Button>
  );
};
