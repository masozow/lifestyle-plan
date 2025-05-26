import { useState } from "react";
import i18next from "@/lib/i18n";

type Locale = "en" | "es";
export const useLocale = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    const currentLang = i18next.language;
    return currentLang === "en" || currentLang === "es" ? currentLang : "en";
  });

  const changeLocale = async (newLocale: Locale) => {
    if (newLocale !== "en" && newLocale !== "es") return;
    await i18next.changeLanguage(newLocale);
    setLocale(newLocale);
  };

  return { locale, changeLocale };
};
