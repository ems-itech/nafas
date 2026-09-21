"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/sanity/types";
import { imageSource, navItems, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

export default function HomeHeader({
  locale,
  settings,
  phoneHref,
  homeHref = "#home",
  navigationBasePath = "",
  activeMobileLink = 0,
  localeHrefOverride,
  showInfoBar = true,
}: {
  locale: Locale;
  settings?: SiteSettings | null;
  phoneHref: string;
  homeHref?: string;
  navigationBasePath?: string;
  activeMobileLink?: number;
  localeHrefOverride?: string;
  showInfoBar?: boolean;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLocale = locale === "en" ? "ar" : "en";
  const localeHref = localeHrefOverride || pathname.replace(/^\/(en|ar)/, `/${otherLocale}`);
  const phone = settings?.contact?.phone?.trim() || "+962790077730";
  const address = text(settings?.contact?.address, locale, "Abdoun, Amman, Jordan");
  const hours = text(settings?.contact?.hours, locale, "Sat–Thu · 10:00 – 20:00");
  const logo = imageSource(settings?.header?.brand, "/images/figma-nafas/logo.svg", 200);
  const navigationItems = navItems(settings, locale).map((item) =>
    item.href === "#services" || item.label.trim().toLowerCase() === "services" || item.label.trim() === "الخدمات"
      ? {
          ...item,
          label: locale === "ar" ? "الأسئلة الشائعة" : "FAQ",
          href: "#faq",
        }
      : item,
  );

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 761px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  return (
    <>
      {showInfoBar ? (
        <div className={styles.infoBar}>
          <div className={styles.infoInner}>
            <span><Icon src="/images/figma-nafas/icon-map-pin.svg" /> <b>Location:</b> {address}</span>
            <a href={phoneHref}><Icon src="/images/figma-nafas/icon-phone-top.svg" /> <b>Phone:</b> {phone}</a>
            <span><Icon src="/images/figma-nafas/icon-clock.svg" /> <b>Hours:</b> {hours}</span>
          </div>
        </div>
      ) : null}
      <header className={styles.header}>
        <nav className={styles.navbar} aria-label="Main navigation">
          <div className={styles.navInner}>
            <div className={styles.navLeft}>
              <a href={homeHref} aria-label="Nafas home"><Image src={logo} alt={text(settings?.header?.brand?.alt, locale, "Nafas")} width={90} height={32} /></a>
              <div className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
                {navigationItems.map((item) => <a key={`${item.href}-${item.label}`} href={item.href.startsWith("#") ? `${navigationBasePath}${item.href}` : item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
              </div>
            </div>
            <div className={styles.navActions}>
              <Link className={styles.localeLink} href={localeHref} lang={otherLocale} onClick={() => setMenuOpen(false)} aria-label={`Switch to ${otherLocale === "ar" ? "Arabic" : "English"}`}>{otherLocale === "ar" ? "عربي" : "English"}</Link>
              <Link className={styles.primaryButton} href={`/${locale}/services`}>{locale === "ar" ? "الخدمات" : "Services"} <Icon src="/images/figma-nafas/icon-stars.svg" /></Link>
            </div>
            <button className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ""}`} onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (locale === "ar" ? "إغلاق القائمة" : "Close menu") : (locale === "ar" ? "فتح القائمة" : "Open menu")}><span /><span /><span /></button>
          </div>
        </nav>
      </header>
      {menuOpen ? (
        <div id="mobile-navigation" className={styles.mobileMenuPanel} role="dialog" aria-modal="true" aria-label={locale === "ar" ? "القائمة" : "Mobile menu"}>
          <nav className={styles.mobileMenuLinks} aria-label={locale === "ar" ? "روابط القائمة" : "Mobile navigation"}>
            {navigationItems.map((item, index) => (
              <a key={`${item.href}-${item.label}`} href={item.href.startsWith("#") ? `${navigationBasePath}${item.href}` : item.href} onClick={() => setMenuOpen(false)} className={index === activeMobileLink ? styles.mobileMenuActive : ""}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{item.label}</b>
                {index === activeMobileLink ? <i aria-hidden="true" /> : null}
              </a>
            ))}
          </nav>
          <div className={styles.mobileMenuBottom}>
            <Link className={styles.mobileMenuCta} href={`/${locale}/services`} onClick={() => setMenuOpen(false)}>
              {locale === "ar" ? "عرض الخدمات" : "View Services"}
            </Link>
            <div className={styles.mobileMenuContact}>
              <p>{locale === "ar" ? "التواصل والموقع" : "Contact & Location"}</p>
              <span><MapPin aria-hidden="true" />{address}</span>
              <a href={phoneHref}><Phone aria-hidden="true" /><span dir="ltr">{phone}</span></a>
              <a href="mailto:hello@nafas.jo"><Mail aria-hidden="true" />hello@nafas.jo</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
