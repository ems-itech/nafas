export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(input: string): input is Locale {
  return (locales as readonly string[]).includes(input);
}

export function normalizeLocale(input: string | undefined): Locale {
  return input === "ar" ? "ar" : "en";
}

