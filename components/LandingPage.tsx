"use client";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import ContactSection from "./ContactSection";
import type { Locale } from "@/lib/i18n/locales";
import { getMessages } from "@/lib/i18n/getMessages";

import type {
  Service,
  SiteSettings,
  About,
  Hero,
} from "@/sanity/types";

type Props = {
  locale: Locale;
  settings?: SiteSettings | null;
  services?: Service[] | null;
  about?: About | null;
  hero?: Hero | null; 
  phoneHref?: string;
};

export default function LandingPage({
  locale,
  settings,
  services,
  about,
  hero,
  phoneHref,
}: Props) {
  const t = getMessages(locale);

  return (
    <>
      <Navbar locale={locale} t={t} phoneHref={phoneHref} />

      <main>
        
        <HeroSection
          hero={hero}
          locale={locale}
          phoneHref={phoneHref}
        />

        <ServicesSection
          locale={locale}
          t={t}
          services={services || undefined}
        />

        <AboutSection
          t={t}
          about={about}
          locale={locale}
        />
      </main>
      
      <ContactSection />
      <Footer t={t} settings={settings} phoneHref={phoneHref} />
    </>
  );
}