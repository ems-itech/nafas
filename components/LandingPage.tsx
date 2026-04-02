"use client";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import type { Locale } from "@/lib/i18n/locales";
import { getMessages } from "@/lib/i18n/getMessages";
import type { Service, SiteSettings } from "@/sanity/types";

type Props = {
  locale: Locale;
  settings?: SiteSettings | null;
  services?: Service[] | null;
  phoneHref?: string;
};

export default function LandingPage({ locale, settings, services, phoneHref }: Props) {
  const t = getMessages(locale);
  return (
    <>
      <Navbar locale={locale} t={t} phoneHref={phoneHref} />
      <main>
        <HeroSection t={t} phoneHref={phoneHref} />
        <ServicesSection locale={locale} t={t} services={services || undefined} />
        <AboutSection t={t} />
      </main>
      <Footer t={t} settings={settings} phoneHref={phoneHref} />
    </>
  );
}

