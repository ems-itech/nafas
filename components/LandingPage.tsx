"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import type { Locale } from "@/lib/i18n/locales";
import { getMessages } from "@/lib/i18n/getMessages";
import type { Homepage, SiteSettings } from "@/sanity/types";
import SectionRenderer from "./sections/SectionRenderer";

type Props = {
  locale: Locale;
  settings?: SiteSettings | null;
  homepage?: Homepage | null;
  phoneHref?: string;
};

export default function LandingPage({ locale, settings, homepage, phoneHref }: Props) {
  const t = getMessages(locale);
  return (
    <>
      <Navbar locale={locale} t={t} settings={settings} phoneHref={phoneHref} />
      <main>
        {homepage?.sections?.length ? (
          <SectionRenderer locale={locale} sections={homepage.sections} />
        ) : null}
      </main>
      <Footer locale={locale} t={t} settings={settings} phoneHref={phoneHref} />
    </>
  );
}

