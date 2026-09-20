"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/sanity/types";
import { imageSource, navItems, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

export default function HomeHeader({ locale, settings, phoneHref }: { locale: Locale; settings?: SiteSettings | null; phoneHref: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLocale = locale === "en" ? "ar" : "en";
  const localeHref = pathname.replace(/^\/(en|ar)/, `/${otherLocale}`);
  const phone = settings?.contact?.phone?.trim() || "+962790077730";
  const address = text(settings?.contact?.address, locale, "Abdoun, Amman, Jordan");
  const hours = text(settings?.contact?.hours, locale, "Sat–Thu · 10:00 – 20:00");
  const logo = imageSource(settings?.header?.brand, "/images/figma-nafas/logo.svg", 200);

  return (
    <>
      <div className={styles.infoBar}>
        <div className={styles.infoInner}>
          <span><Icon src="/images/figma-nafas/icon-map-pin.svg" /> <b>Location:</b> {address}</span>
          <a href={phoneHref}><Icon src="/images/figma-nafas/icon-phone-top.svg" /> <b>Phone:</b> {phone}</a>
          <span><Icon src="/images/figma-nafas/icon-clock.svg" /> <b>Hours:</b> {hours}</span>
        </div>
      </div>
      <header className={styles.header}>
        <nav className={styles.navbar} aria-label="Main navigation">
          <div className={styles.navInner}>
            <div className={styles.navLeft}>
              <a href="#home" aria-label="Nafas home"><Image src={logo} alt={text(settings?.header?.brand?.alt, locale, "Nafas")} width={90} height={32} /></a>
              <div className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
                {navItems(settings, locale).map((item) => <a key={`${item.href}-${item.label}`} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
              </div>
            </div>
            <div className={styles.navActions}>
              <Link className={styles.localeLink} href={localeHref} onClick={() => setMenuOpen(false)} aria-label={`Switch to ${otherLocale === "ar" ? "Arabic" : "English"}`}>{otherLocale === "ar" ? "عربي" : "English"}</Link>
              <a className={styles.primaryButton} href="#services">{text(settings?.header?.ctaLabel, locale, "Services")} <Icon src="/images/figma-nafas/icon-stars.svg" /></a>
            </div>
            <button className={styles.menuButton} onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /><span /></button>
          </div>
        </nav>
      </header>
    </>
  );
}
