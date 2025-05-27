import { useState } from "react";
import i18next from "@/lib/i18n"; // usa la instancia ya configurada
import { availableLocales, type LocaleCode } from "@/locales/localesTypes";

export const useLocale = () => {
  const initial = i18next.resolvedLanguage || i18next.language;
  const defaultLocale: LocaleCode =
    initial in availableLocales ? (initial as LocaleCode) : "en";

  const [locale, setLocale] = useState<LocaleCode>(defaultLocale);

  const changeLocale = async (newLocale: LocaleCode) => {
    if (!(newLocale in availableLocales)) return;
    await i18next.changeLanguage(newLocale);
    setLocale(newLocale);
  };

  return {
    locale,
    changeLocale,
    currentLocaleName: availableLocales[locale],
  };
};
