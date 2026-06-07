import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getAppUrl,
  getMarketingUrl,
  isAdminPath,
  isAppHost,
  isMarketingOnlyPath,
} from "@/lib/config/hosts";

export function proxy(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const { pathname } = req.nextUrl;
  const onAppHost = isAppHost(hostname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (onAppHost) {
    if (isMarketingOnlyPath(pathname)) {
      return NextResponse.redirect(new URL(getMarketingUrl()));
    }
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (isAdminPath(pathname)) {
    const target = new URL(pathname, getAppUrl());
    target.search = req.nextUrl.search;
    return NextResponse.redirect(target);
  }

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
