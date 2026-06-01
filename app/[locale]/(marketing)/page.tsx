import LandingPage from "@/components/LandingPage";
import { normalizeLocale } from "@/lib/i18n/locales";
import { sanityFetch } from "@/sanity/fetch";
import { homepageQuery, siteSettingsQuery } from "@/sanity/queries";
import type { Homepage, SiteSettings } from "@/sanity/types";

export const revalidate = 60;

export default async function LocaleHome({
  params,
}: Readonly<{ params: { locale: string } | Promise<{ locale: string }> }>) {
  const resolved = await Promise.resolve(params);
  const locale = normalizeLocale(resolved.locale);

  const [settings, homepage] = await Promise.all([
    sanityFetch<SiteSettings>(siteSettingsQuery),
    sanityFetch<Homepage>(homepageQuery),
  ]);

  const phone = settings?.contact?.phone?.trim();
  const phoneHref = phone?.trim()
    ? `tel:${phone.replace(/\s+/g, "")}`
    : undefined;

  return (
    <LandingPage
      locale={locale}
      settings={settings}
      homepage={homepage}
      phoneHref={phoneHref}
    />
  );
}

