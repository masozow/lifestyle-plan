import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import i18next from "i18next";
import es from "zod-i18n-map/locales/es/zod.json";
import en from "zod-i18n-map/locales/en/zod.json";

i18next.init({
  lng: "es",
  fallbackLng: "en",
  resources: {
    es: { zod: es },
    en: { zod: en },
  },
});

z.setErrorMap(zodI18nMap);
