export type ThemeId = "default" | "warm";

/**
 * Sanity is the "source of truth" for which theme is active, but the frontend
 * must be resilient to missing/invalid values (and to Sanity being unavailable).
 *
 * This normalizer guarantees we always land on a supported theme id.
 */
export function resolveThemeId(value: unknown): ThemeId {
  return value === "warm" ? "warm" : "default";
}

