export const SESSION_COOKIE = "nafas_session";
export const SESSION_TTL_DAYS = 14;

export function getAppUrl() {
  return process.env.APP_URL || "http://app.localhost:3000";
}

export function getMarketingUrl() {
  return process.env.MARKETING_URL || "http://localhost:3000";
}

export function isAppHost(hostname: string) {
  const host = hostname.split(":")[0]?.toLowerCase() ?? "";
  return host === "app.localhost" || host.startsWith("app.");
}

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

export function isAdminPath(pathname: string) {
  if (pathname.startsWith("/api/admin")) return true;
  return ADMIN_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export const MARKETING_ONLY_PREFIXES = ["/en", "/ar", "/studio"] as const;

export function isMarketingOnlyPath(pathname: string) {
  return MARKETING_ONLY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
