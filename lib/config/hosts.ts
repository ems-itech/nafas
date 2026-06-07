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

/** Preview / *.vercel.app — one URL serves both apps for testing. */
export function usesSingleOriginRouting(hostHeader: string) {
  if (process.env.VERCEL_ENV === "preview") return true;
  return parseHostname(hostHeader).endsWith(".vercel.app");
}

export function isAppHost(hostHeader: string) {
  if (usesSingleOriginRouting(hostHeader)) return false;
  const hostname = parseHostname(hostHeader);
  if (hostname === "app.localhost") return true;
  if (hostname.startsWith("app.")) return true;
  if (hostname.startsWith("www.app.")) return true;
  return false;
}

/** Marketing app — blocked on production admin hosts. */
export function canServeMarketing(hostHeader: string) {
  if (usesSingleOriginRouting(hostHeader)) return true;
  return !isAppHost(hostHeader);
}

/** Admin app — blocked on production marketing hosts. */
export function canServeAdmin(hostHeader: string) {
  if (usesSingleOriginRouting(hostHeader)) return true;
  return isAppHost(hostHeader);
}

export function isAdminPath(pathname: string) {
  if (pathname.startsWith("/api/admin")) return true;
  return ADMIN_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isMarketingPath(pathname: string) {
  if (isMarketingOnlyPath(pathname)) return true;
  if (pathname.startsWith("/api/appointment")) return true;
  return false;
}

export function isMarketingOnlyPath(pathname: string) {
  return MARKETING_ONLY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
