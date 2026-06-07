import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  canServeAdmin,
  canServeMarketing,
  isAdminPath,
  isAppHost,
  isMarketingPath,
  usesSingleOriginRouting,
} from "@/lib/config/hosts";

function blockWith404() {
  return new NextResponse(null, { status: 404 });
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
    if (isMarketingPath(pathname)) return blockWith404();
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (isAdminPath(pathname)) return NextResponse.next();
    return NextResponse.next();
  }

  if (!canServeAdmin(hostHeader) && isAdminPath(pathname)) return blockWith404();
  if (singleOrigin && isAdminPath(pathname)) return NextResponse.next();

  if (!canServeMarketing(hostHeader) && isMarketingPath(pathname)) return blockWith404();
  if (pathname.startsWith("/api/appointment")) return NextResponse.next();
  if (isMarketingPath(pathname)) return NextResponse.next();

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