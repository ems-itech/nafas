import type { Locale } from "./locales";

export type LocalizedField<T> = { en?: T; ar?: T } | undefined | null;

export function getLocalizedValue<T>(
  field: LocalizedField<T>,
  locale: Locale,
  fallbackLocale: Locale = "en",
): T | undefined {
  if (!field) return undefined;
  const primary = locale === "ar" ? field.ar : field.en;
  if (primary != null) return primary;
  const fallback = fallbackLocale === "ar" ? field.ar : field.en;
  return fallback ?? undefined;
}

