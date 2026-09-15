import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/sanity/types";
import { imageSource, navItems, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

export default function HomeFooter({ locale, settings, phoneHref }: { locale: Locale; settings?: SiteSettings | null; phoneHref: string }) {
  const logo = imageSource(settings?.header?.brand, "/images/figma-nafas/logo.svg", 200);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}><div><Image src={settings?.header?.brand?.asset ? logo : "/images/figma-nafas/logo-light.svg"} alt="Nafas" width={90} height={32} /><nav>{navItems(settings, locale).map((item) => <a key={`${item.href}-${item.label}`} href={item.href}>{item.label}</a>)}</nav></div><div><h3>Contact</h3><div><a className={styles.lightButton} href={phoneHref}><Icon src="/images/figma-nafas/icon-phone.svg" />Call Now</a><Link className={styles.lightButton} href={`/${locale}`}>View Menu</Link></div></div></div>
      <p className={styles.copyright}>{text(settings?.footer?.copyright, locale, "© 2026 Nafas. All rights reserved.")}</p>
    </footer>
  );
}
