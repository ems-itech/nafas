import LandingPage from "@/components/LandingPage";
import { normalizeLocale } from "@/lib/i18n/locales";
import { sanityFetch } from "@/sanity/fetch";
import {
  servicesQuery,
  siteSettingsQuery,
  aboutQuery,
  heroQuery,
} from "@/sanity/queries";

import type {
  Service,
  SiteSettings,
  About,
  Hero,
} from "@/sanity/types";

export const revalidate = 60;

export default async function LocaleHome({
  params,
}: Readonly<{ params: { locale: string } | Promise<{ locale: string }> }>) {
  const resolved = await Promise.resolve(params);
  const locale = normalizeLocale(resolved.locale);

  const [settings, services, about, hero] = await Promise.all([
    sanityFetch<SiteSettings>(siteSettingsQuery),
    sanityFetch<Service[]>(servicesQuery),
    sanityFetch<About>(aboutQuery),
    sanityFetch<Hero>(heroQuery),
  ]);

  return (
    <LandingPage
      locale={locale}
      settings={settings}
      services={services}
      about={about}
      hero={hero}
    />
  );
}