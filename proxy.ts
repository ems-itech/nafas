import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const supportedLocales = ["en", "ar"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Do not locale-prefix static files
  if (
    pathname.startsWith("/images/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/studio")
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1] || "";
  const hasLocale = supportedLocales.includes(firstSegment as SupportedLocale);

  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|robots\\.txt|sitemap\\.xml).*)"],
};

