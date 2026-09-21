import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesMenu from "@/components/ServicesMenu";
import { isLocale } from "@/lib/i18n/locales";
import { sanityFetch } from "@/sanity/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const isArabic = locale === "ar";
  return {
    title: isArabic ? "قائمة الخدمات | نفَس بيوتي لاونج" : "Service Menu | Nafas Beauty Lounge",
    description: isArabic
      ? "اكتشفي خدمات نفَس بيوتي لاونج وقائمة الأسعار."
      : "Explore the Nafas Beauty Lounge services and price menu.",
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: "/en/services", ar: "/ar/services" },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery);
  return <ServicesMenu locale={locale} settings={settings} />;
}
