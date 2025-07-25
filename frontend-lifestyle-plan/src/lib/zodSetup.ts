import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

export function applyZodI18n() {
  z.setErrorMap(zodI18nMap);
}
