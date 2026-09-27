import Image from "next/image";
import {
  Clock3,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/sanity/types";
import { imageSource, navItems, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

const labels = {
  en: {
    visit: "Visit Us",
    contact: "Contact",
    location: "Location",
    hours: "Hours",
    phone: "Phone",
    call: "Call Now",
    menu: "View Menu",
  },
  ar: {
    visit: "زورونا",
    contact: "تواصل معنا",
    location: "الموقع",
    hours: "ساعات العمل",
    phone: "الهاتف",
    call: "اتصل الآن",
    menu: "قائمة الخدمات",
  },
} as const;

function socialIcon(label = "", url = ""): LucideIcon {
  const value = `${label} ${url}`.toLowerCase();

  if (value.includes("instagram")) return Instagram;
  if (value.includes("facebook") || value.includes("fb.com")) return Facebook;
  if (value.includes("linkedin")) return Linkedin;
  if (value.includes("youtube")) return Youtube;
  if (value.includes("twitter") || value.includes("x.com")) return Twitter;
  if (value.includes("whatsapp") || value.includes("wa.me")) return MessageCircle;
  return ExternalLink;
}

export default function HomeFooter({
  locale,
  settings,
  phoneHref,
  homeHref = "#home",
  menuHref = "#services",
  navigationBasePath = "",
}: {
  locale: Locale;
  settings?: SiteSettings | null;
  phoneHref: string;
  homeHref?: string;
  menuHref?: string;
  navigationBasePath?: string;
}) {
  const copy = labels[locale];
  const logo = imageSource(
    settings?.header?.brand,
    "/images/figma-nafas/logo-light.svg",
    224,
  );
  const address = text(
    settings?.contact?.address,
    locale,
    locale === "ar" ? "عمّان، الأردن" : "Amman, Jordan",
  );
  const hours = text(
    settings?.contact?.hours,
    locale,
    locale === "ar" ? "يومياً: 10:00 - 20:00" : "Daily: 10:00 - 20:00",
  );
  const phone = settings?.contact?.phone?.trim() || "+962 79 123 4567";
  const copyright =
    locale === "ar"
      ? '© 2026 منتجع نفس الصحي   عمّان، الأردن. جميع الحقوق محفوظة.'
      : text(
          settings?.footer?.copyright,
          locale,
          "© 2026 Nafas Spa, Amman, Jordan. All rights reserved.",
        );
  const socialByLabel = new Map<string, { label: string; url: string }>();

  settings?.footer?.social?.forEach((item) => {
    if (item.label && item.url) {
      socialByLabel.set(item.label.toLowerCase(), {
        label: item.label,
        url: item.url,
      });
    }
  });

  if (settings?.footer?.instagramUrl) {
    socialByLabel.set("instagram", {
      label: "Instagram",
      url: settings.footer.instagramUrl,
    });
  }

  if (settings?.footer?.facebookUrl) {
    socialByLabel.set("facebook", {
      label: "Facebook",
      url: settings.footer.facebookUrl,
    });
  }

  const social = Array.from(socialByLabel.values());

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <a
            href={homeHref}
            aria-label={locale === "ar" ? "الصفحة الرئيسية" : "Nafas home"}
          >
            <Image
              src={logo}
              alt={text(settings?.header?.brand?.alt, locale, "Nafas")}
              width={190}
              height={68}
            />
          </a>
          <nav
            aria-label={
              locale === "ar" ? "روابط التذييل" : "Footer navigation"
            }
          >
            {navItems(settings, locale).map((item) => (
              <a key={`${item.href}-${item.label}`} href={item.href.startsWith("#") ? `${navigationBasePath}${item.href}` : item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.footerVisit}>
          <h3>{copy.visit}</h3>
          <div className={styles.footerDetails}>
            <a
              href={settings?.contact?.mapUrl || undefined}
              target={settings?.contact?.mapUrl ? "_blank" : undefined}
              rel={settings?.contact?.mapUrl ? "noreferrer" : undefined}
            >
              <MapPin aria-hidden="true" />
              <span>
                <b>{copy.location}:</b> {address}
              </span>
            </a>
            <p>
              <Clock3 aria-hidden="true" />
              <span>
                <b>{copy.hours}:</b> {hours}
              </span>
            </p>
            <a href={phoneHref}>
              <Phone aria-hidden="true" />
              <span>
                <b>{copy.phone}:</b> <span dir="ltr">{phone}</span>
              </span>
            </a>
          </div>
        </div>

        <div className={styles.footerContact}>
          <h3>{copy.contact}</h3>
          <div className={styles.footerButtons}>
            <a className={styles.lightButton} href={phoneHref}>
              <Icon src="/images/figma-nafas/icon-phone.svg" />
              {copy.call}
            </a>
            <a className={styles.lightButton} href={menuHref}>
              {copy.menu}
            </a>
          </div>
          {social.length > 0 ? (
            <div
              className={styles.socialLinks}
              aria-label={
                locale === "ar" ? "وسائل التواصل الاجتماعي" : "Social media"
              }
            >
              {social.map((item) => {
                const SocialIcon = socialIcon(item.label, item.url);
                return (
                  <a
                    key={`${item.label}-${item.url}`}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <SocialIcon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <p className={styles.copyright}>
        {copyright}
      </p>
      <div className={styles.mobileFooter}>
        <a
          className={styles.mobileFooterLogo}
          href={homeHref}
          aria-label={locale === "ar" ? "الصفحة الرئيسية" : "Nafas home"}
        >
          <Image
            src={logo}
            alt={text(settings?.header?.brand?.alt, locale, "Nafas")}
            width={190}
            height={68}
          />
        </a>
        <p className={styles.mobileFooterTagline}>
          {text(
            settings?.footer?.tagline,
            locale,
            locale === "ar"
              ? "عناية متكاملة في أجواء من الهدوء. عبدون، عمّان."
              : "Clinical care wrapped in absolute sensory calm. Abdoun, Amman.",
          )}
        </p>
        <div className={styles.mobileFooterBottom}>
          <small>
            {copyright}
          </small>
          {social.length > 0 ? (
            <div className={styles.mobileFooterSocial} aria-label={locale === "ar" ? "وسائل التواصل الاجتماعي" : "Social media"}>
              {social.map((item) => {
                const SocialIcon = socialIcon(item.label, item.url);
                return (
                  <a key={`${item.label}-${item.url}`} href={item.url} target="_blank" rel="noreferrer" aria-label={item.label}>
                    <SocialIcon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
