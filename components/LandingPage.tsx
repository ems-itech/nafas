import type { Locale } from "@/lib/i18n/locales";
import type { Homepage, SiteSettings } from "@/sanity/types";
import FigmaHomePage from "./FigmaHomePage";

type Props = {
  locale: Locale;
  settings?: SiteSettings | null;
  homepage?: Homepage | null;
  phoneHref?: string;
};

export default function LandingPage({ locale, settings, homepage, phoneHref }: Props) {
  return <FigmaHomePage locale={locale} settings={settings} homepage={homepage} phoneHref={phoneHref} />;
}
