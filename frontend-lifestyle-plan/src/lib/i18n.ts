import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; 
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

import zodEs from "zod-i18n-map/locales/es/zod.json";
import zodEn from "zod-i18n-map/locales/en/zod.json";
import enTranslation from "@/locales/enTranslation.json";
import esTranslation from "@/locales/esTranslation.json";

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: enTranslation,
        zod: zodEn,
      },
      es: {
        translation: esTranslation,
        zod: zodEs,
      },
    },
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    saveMissing: true, 
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`❗Missing translation: [${lng}] ${ns}:${key}`);
    },
  });

z.setErrorMap(zodI18nMap);

export default i18n;
