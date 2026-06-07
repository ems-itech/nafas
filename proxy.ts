import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  isAdminPath,
  isAppHost,
  isMarketingOnlyPath,
  usesSingleOriginRouting,
} from "@/lib/config/hosts";

function notFound(req: NextRequest) {
  return NextResponse.rewrite(new URL("/not-found", req.url));
}

export function proxy(req: NextRequest) {
  const hostHeader = req.headers.get("host") ?? "";
  const { pathname } = req.nextUrl;
  const onAppHost = isAppHost(hostHeader);
  const singleOrigin = usesSingleOriginRouting(hostHeader);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (onAppHost) {
    if (isMarketingOnlyPath(pathname)) return notFound(req);
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!singleOrigin && isAdminPath(pathname)) return notFound(req);
  if (isAdminPath(pathname)) return NextResponse.next();

  if (pathname.startsWith("/api/appointment")) return NextResponse.next();
  if (isMarketingOnlyPath(pathname)) return NextResponse.next();
  if (pathname === "/not-found") return NextResponse.next();

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", req.url));
  }

  const supportedLocales = ["en", "ar"];
  const firstSegment = pathname.split("/")[1] || "";
  if (!supportedLocales.includes(firstSegment) && !pathname.startsWith("/api")) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml).*)"],
};
