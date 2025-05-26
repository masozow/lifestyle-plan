import { useState } from "react";
import i18next from "@/lib/i18n";

const SUPPORTED_LOCALES = ["en", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export const useLocale = () => {
  const [locale, setLocale] = useState<Locale>(
    () => i18next.language as Locale
  );

  const changeLocale = async (newLocale: Locale) => {
    await i18next.changeLanguage(newLocale);
    setLocale(newLocale);
  };

  return { locale, changeLocale };
};
