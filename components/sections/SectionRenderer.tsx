"use client";

import type { Locale } from "@/lib/i18n/locales";
import type { HomepageSection, HomepageServicesSection } from "@/sanity/types";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GallerySection from "@/components/sections/GallerySection";
import PackagesSection from "@/components/sections/PackagesSection";
import AppointmentSection from "@/components/sections/AppointmentSection";

type Props = {
  locale: Locale;
  sections: HomepageSection[];
};

function collectServiceOptions(sections: HomepageSection[], locale: Locale) {
  const services = sections.find((s): s is HomepageServicesSection => s._type === "servicesSection");
  const opts =
    services?.services
      ?.map((x) => (locale === "ar" ? x.name?.ar || x.name?.en : x.name?.en || x.name?.ar))
      ?.filter((v): v is string => Boolean(v && v.trim())) ?? [];
  return Array.from(new Set(opts));
}

export default function SectionRenderer({ locale, sections }: Props) {
  const serviceOptions = collectServiceOptions(sections, locale);

  return (
    <>
      {sections.map((section, idx) => {
        const key = `${section._type}-${idx}`;
        switch (section._type) {
          case "heroSection":
            return <HeroSection key={key} locale={locale} section={section} />;
          case "aboutSection":
            return <AboutSection key={key} locale={locale} section={section} />;
          case "servicesSection":
            return <ServicesSection key={key} locale={locale} section={section} />;
          case "gallerySection":
            return <GallerySection key={key} locale={locale} section={section} />;
          case "packagesSection":
            return <PackagesSection key={key} locale={locale} section={section} />;
          case "appointmentSection":
            return (
              <AppointmentSection
                key={key}
                locale={locale}
                section={section}
                serviceOptions={serviceOptions}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

