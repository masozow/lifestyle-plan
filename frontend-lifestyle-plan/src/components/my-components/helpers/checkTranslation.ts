import { format } from "@formkit/tempo";
import type { LocaleCode } from "@/locales/localesTypes";
import type { TFunction, i18n as I18nInstance } from "i18next";

/**
 * Props used to check for a translated string (visualizers namespace) and
 * fall back to a transformed version when the key is missing.
 */
interface CheckTranslationProps {
  /** Translation function from `useTranslation()`. */
  t: TFunction;

  /** i18next instance, used to check if a key exists. */
  i18n: I18nInstance;

  /** Locale used when formatting ISO date strings (`YYYY-MM-DD`). Defaults to `"en"`. */
  locale?: LocaleCode;

  /**
   * Optional character replacement applied before capitalization/date formatting.
   * Useful for turning slugs into readable labels (e.g., replace `-` with space).
   */
  replaceCharacterWith?: {
    /** Character to find. */
    character: string;
    /** Replacement string. */
    replaceWith: string;
  };
}

/**
 * Resolve a display string for arbitrary data:
 *
 * 1. Try to translate `visualizers.${dataToTranslate}`.
 * 2. If missing, optionally replace characters (e.g. `-` → space).
 * 3. Capitalize the first letter.
 * 4. If the original string matches `YYYY-MM-DD`, format it as a long date using the given locale.
 *
 * @param {string} dataToTranslate - Raw value to translate or transform.
 * @param {CheckTranslationProps} options - Translation and formatting options.
 * @param {TFunction} options.t
 * @param {import("i18next").i18n} options.i18n
 * @param {LocaleCode} [options.locale="en"]
 * @param {{character: string, replaceWith: string}} [options.replaceCharacterWith]
 * @returns {string} Display-safe, translated (or transformed) string.
 */
export const checkTranslation = (
  dataToTranslate: string,
  { t, i18n, locale = "en", replaceCharacterWith }: CheckTranslationProps
): string => {
  const translationKey = `visualizers.${dataToTranslate}`;
  const hasTranslation = i18n.exists(translationKey);

  if (hasTranslation) {
    return t(translationKey);
  }

  let transformed = replaceCharacterWith
    ? dataToTranslate.replace(
        replaceCharacterWith.character,
        replaceCharacterWith.replaceWith
      )
    : dataToTranslate;

  transformed = transformed.charAt(0).toUpperCase() + transformed.slice(1);

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(dataToTranslate)) {
    try {
      return format(dataToTranslate, { date: "long" }, locale);
    } catch {
      return transformed;
    }
  }

  return transformed;
};
