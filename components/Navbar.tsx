"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/locales";
import type { Messages } from "@/lib/i18n/messages";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import type { SiteSettings } from "@/sanity/types";

type Props = {
  locale: Locale;
  t: Messages;
  settings?: SiteSettings | null;
  phoneHref?: string;
};

function switchLocale(pathname: string, nextLocale: "en" | "ar") {
  const parts = pathname.split("/");
  if (parts.length >= 2) parts[1] = nextLocale;
  return parts.join("/") || `/${nextLocale}`;
}

export default function Navbar({
  locale,
  t,
  settings,
  phoneHref = "tel:+962791234567",
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const safeLocale = locale === "ar" ? "ar" : "en";
  const otherLocale = safeLocale === "en" ? "ar" : "en";

  const navLinks =
    settings?.header?.nav
      ?.map((item) => {
        const label = getLocalizedValue(item.label, locale);
        const href = item.href?.trim();
        if (!label || !href) return null;
        return { label, href };
      })
      .filter((v): v is { label: string; href: string } => Boolean(v)) ?? [
      { label: t.nav.services, href: "#services" },
      { label: t.nav.about, href: "#about" },
      { label: t.nav.contact, href: "#contact" },
    ];

  /* ---------------------------
     BRAND FIX (IMAGE VERSION)
  ---------------------------- */
  const brandImage = settings?.header?.brand?.asset?.url;
  const brandAlt =
    getLocalizedValue(settings?.header?.brand?.alt, locale) || "Brand";

  const brandFallback = "Nafas";

  const ctaLabel =
    getLocalizedValue(settings?.header?.ctaLabel, locale) || t.nav.callNow;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const surface = isScrolled
    ? "bg-background/85 supports-[backdrop-filter]:bg-background/70 backdrop-blur-xl border-b border-border/60"
    : "bg-transparent";

  const fg = isScrolled ? "text-foreground" : "text-primary-foreground";
  const fgMuted = isScrolled
    ? "text-foreground/70 hover:text-foreground"
    : "text-primary-foreground/80 hover:text-primary-foreground";

  const ctaClass = isScrolled
    ? "bg-primary text-primary-foreground border border-primary/20 hover:bg-accent"
    : "bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/25";

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-colors", surface)}>
      <nav className="container-narrow flex items-center justify-between h-20 sm:h-24">

        {/* ---------------- BRAND (IMAGE SAFE) ---------------- */}
        <a
          href="#hero"
          className={cn("transition-colors drop-shadow-sm", fg)}
        >
          {brandImage ? (
            <img
              src={brandImage}
              alt={brandAlt}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="font-serif text-2xl sm:text-3xl font-light tracking-tight">
              {brandFallback}
            </span>
          )}
        </a>

        {/* ---------------- DESKTOP NAV ---------------- */}
        <div className="hidden sm:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn("font-ui transition-colors duration-200", fgMuted)}
            >
              {link.label}
            </a>
          ))}

          <Link
            href={switchLocale(pathname, otherLocale)}
            className={cn("font-ui transition-colors duration-200", fgMuted)}
          >
            {otherLocale.toUpperCase()}
          </Link>

          <a
            href={phoneHref}
            className={cn(
              "font-ui px-7 py-2.5 rounded-full transition-all duration-200",
              ctaClass
            )}
          >
            {ctaLabel}
          </a>
        </div>

        {/* ---------------- MOBILE BUTTON ---------------- */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn("sm:hidden", fg)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ---------------- MOBILE MENU ---------------- */}
      {mobileOpen && (
        <div className="sm:hidden bg-foreground/90 backdrop-blur-xl px-5 pb-8 pt-4 space-y-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-ui text-primary-foreground/80 hover:text-primary-foreground"
            >
              {link.label}
            </a>
          ))}

          <Link
            href={switchLocale(pathname, otherLocale)}
            onClick={() => setMobileOpen(false)}
            className="block font-ui text-primary-foreground/70 hover:text-primary-foreground"
          >
            {otherLocale.toUpperCase()}
          </Link>

          <a
            href={phoneHref}
            onClick={() => setMobileOpen(false)}
            className="block text-center font-ui bg-primary text-primary-foreground px-6 py-3 rounded-full"
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}