import type { Locale } from "@/lib/i18n/locales";
import type { Homepage, SiteSettings } from "@/sanity/types";
import { getSection } from "./home/content";
import HomeHeader from "./home/HomeHeader";
import HeroSection from "./home/HeroSection";
import ServiceTicker from "./home/ServiceTicker";
import AboutSection from "./home/AboutSection";
import SignatureServicesSection from "./home/SignatureServicesSection";
import HomeGallerySection from "./home/HomeGallerySection";
import HomePackagesSection from "./home/HomePackagesSection";
import HomeFaqSection from "./home/HomeFaqSection";
import HomeAppointmentSection from "./home/HomeAppointmentSection";
import HomeFooter from "./home/HomeFooter";
import styles from "./FigmaHomePage.module.css";

type Props = {
  locale: Locale;
  settings?: SiteSettings | null;
  homepage?: Homepage | null;
  phoneHref?: string;
};

export default function FigmaHomePage({ locale, settings, homepage, phoneHref = "tel:+962790077730" }: Props) {
  const hero = getSection(homepage, "heroSection");
  const about = getSection(homepage, "aboutSection");
  const services = getSection(homepage, "servicesSection");
  const gallery = getSection(homepage, "gallerySection");
  const packages = getSection(homepage, "packagesSection");
  const appointment = getSection(homepage, "appointmentSection");
  const phone = settings?.contact?.phone?.trim() || "+962790077730";

  return (
    <div className={styles.page}>
      <HomeHeader locale={locale} settings={settings} phoneHref={phoneHref} />
      <main>
        <HeroSection locale={locale} section={hero} phone={phone} phoneHref={phoneHref} />
        <ServiceTicker locale={locale} section={services} />
        <AboutSection locale={locale} section={about} phone={phone} phoneHref={phoneHref} />
        <SignatureServicesSection locale={locale} section={services} />
        <HomeGallerySection locale={locale} section={gallery} />
        <HomePackagesSection locale={locale} section={packages} phoneHref={phoneHref} />
        <HomeFaqSection locale={locale} section={homepage?.faq} />
        <HomeAppointmentSection locale={locale} section={appointment} services={services} settings={settings} />
      </main>
      <HomeFooter locale={locale} settings={settings} phoneHref={phoneHref} />
    </div>
  );
}
