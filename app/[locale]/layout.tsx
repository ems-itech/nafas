import type { Metadata } from "next";
import { isLocale, normalizeLocale, type Locale } from "@/lib/i18n/locales";
import { sanityFetch } from "@/sanity/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { urlFor } from "@/sanity/image";

export async function generateMetadata({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params);

  const locale: Locale = isLocale(resolved.locale)
    ? resolved.locale
    : normalizeLocale(resolved.locale);

  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery);

  const seo = locale === "ar" ? settings?.seo?.ar : settings?.seo?.en;

  return {
    title: settings?.title || "Nafas Beauty Lounge",
    description:
      seo?.description ||
      "Nafas Beauty Lounge — A space to breathe.",

    icons: {
      icon: settings?.favicon
        ? urlFor(settings.favicon).url()
        : "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string } | Promise<{ locale: string }>;
}>) {
  const resolved = await Promise.resolve(params);
  const { locale } = resolved;

  const safeLocale: Locale = isLocale(locale)
    ? locale
    : normalizeLocale(locale);

  const dir = safeLocale === "ar" ? "rtl" : "ltr";

  return (
    <div lang={safeLocale} dir={dir} className="min-h-full flex flex-col">
      {children}
    </div>
  );
}