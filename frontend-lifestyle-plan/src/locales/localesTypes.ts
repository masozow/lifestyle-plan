//Before creating a new locale file, add it to this object,
//so it'll have strict type checking
export const availableLocales = {
  en: "English",
  es: "Español",
} as const;

export type LocaleCode = keyof typeof availableLocales;
export type LocaleName = typeof availableLocales[LocaleCode];