export const SESSION_COOKIE = "nafas_session";
export const SESSION_TTL_DAYS = 14;

export const ADMIN_PATH_PREFIXES = [
  "/login",
  "/dashboard",
  "/customers",
  "/services",
  "/reservations",
  "/calendar",
  "/availability",
  "/settings",
] as const;

export const MARKETING_ONLY_PREFIXES = ["/en", "/ar", "/studio"] as const;

function parseHostname(hostHeader: string) {
  const value = hostHeader.trim().toLowerCase();
  if (!value) return "";
  if (value.startsWith("[")) {
    const match = value.match(/^\[([^\]]+)\]/);
    return match?.[1] ?? value;
  }
  return value.split(":")[0] ?? value;
}

/** Preview / *.vercel.app — no subdomain split; both apps on one URL. */
export function usesSingleOriginRouting(hostHeader: string) {
  if (process.env.VERCEL_ENV === "preview") return true;
  return parseHostname(hostHeader).endsWith(".vercel.app");
}

export function isAppHost(hostHeader: string) {
  if (usesSingleOriginRouting(hostHeader)) return false;
  const hostname = parseHostname(hostHeader);
  return hostname === "app.localhost" || hostname.startsWith("app.");
}

export function isAdminPath(pathname: string) {
  if (pathname.startsWith("/api/admin")) return true;
  return ADMIN_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isMarketingOnlyPath(pathname: string) {
  return MARKETING_ONLY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
