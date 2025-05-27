import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // 👈 importante
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

import zodEs from "zod-i18n-map/locales/es/zod.json";
import zodEn from "zod-i18n-map/locales/en/zod.json";

const uiEn = {
  welcome: "Welcome",
  login: "Login",
  logout: "Logout",
};

const uiEs = {
  welcome: "Bienvenido",
  login: "Iniciar sesión",
  logout: "Cerrar sesión",
};

i18n
  .use(LanguageDetector) // 👈 habilita detección automática
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: uiEn,
        zod: zodEn,
      },
      es: {
        translation: uiEs,
        zod: zodEs,
      },
    },
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
  });

z.setErrorMap(zodI18nMap);

export default i18n;
