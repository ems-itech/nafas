import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesMenu from "@/components/ServicesMenu";
import { isLocale } from "@/lib/i18n/locales";
import { sanityFetch } from "@/sanity/fetch";
import { servicesPageQuery, siteSettingsQuery } from "@/sanity/queries";
import type { ServicesPage, SiteSettings } from "@/sanity/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const isArabic = locale === "ar";
  const page = await sanityFetch<ServicesPage>(servicesPageQuery);
  const seo = page?.seo?.[locale];
  const fallbackTitle = isArabic ? "قائمة الخدمات | نفَس بيوتي لاونج" : "Service Menu | Nafas Beauty Lounge";
  const fallbackDescription = isArabic
    ? "اكتشفي خدمات نفَس بيوتي لاونج وقائمة الأسعار."
    : "Explore the Nafas Beauty Lounge services and price menu.";
  const title = seo?.title?.trim() || fallbackTitle;
  const description = seo?.description?.trim() || fallbackDescription;

  return {
    title,
    description,
    keywords: seo?.keywords?.length ? seo.keywords : undefined,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: "/en/services", ar: "/ar/services" },
    },
    robots: seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AR" : "en_US",
      url: `/${locale}/services`,
      title,
      description,
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [settings, page] = await Promise.all([
    sanityFetch<SiteSettings>(siteSettingsQuery),
    sanityFetch<ServicesPage>(servicesPageQuery),
  ]);
  return <ServicesMenu locale={locale} settings={settings} page={page} />;
}
