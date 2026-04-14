"use client";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import CardsSection from "./CardsSection";
import Footer from "./Footer";
import ContactSection from "./ContactSection";
import GallerySection from "@/components/GallerySection";

import type { Locale } from "@/lib/i18n/locales";
import type {
  Contact,
  Service,
  SiteSettings,
  About,
  Hero,
  Package,
  Gallery,
} from "@/sanity/types";

import { getMessages } from "@/lib/i18n/getMessages";

type Props = {
  locale: Locale;
  settings?: SiteSettings | null;
  services?: Service[] | null;
  about?: About | null;
  hero: Hero | null;
  contact?: Contact | null;
  packages?: Package[] | null;
  gallery?: Gallery | null;
  phoneHref?: string;
};

export default function LandingPage({
  locale,
  settings,
  services,
  about,
  hero,
  contact,
  packages,
  gallery,
  phoneHref,
}: Props) {
  const t = getMessages(locale);

  return (
    <>
      <Navbar locale={locale} t={t} phoneHref={phoneHref} />

      <main>
        <HeroSection
          hero={hero || null}
          locale={locale}
          phoneHref={phoneHref}
        />

        <ServicesSection
          locale={locale}
          t={t}
          services={services || undefined}
        />

        <AboutSection t={t} about={about} locale={locale} />

        <GallerySection
          locale={locale}
          subtitle={gallery?.subtitle}
          items={
            gallery?.images?.map((img) => ({
              src: img.asset?.url || "",
              alt: img.alt || "Gallery image",
            })) || []
          }
        />

        <CardsSection packages={packages || []} locale={locale} />
      </main>

      <ContactSection contact={contact} locale={locale} />

      <Footer t={t} settings={settings} phoneHref={phoneHref} locale={locale} />
    </>
  );
}
