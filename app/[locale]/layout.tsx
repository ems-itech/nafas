import type { Metadata } from "next";
import { isLocale, normalizeLocale, type Locale } from "@/lib/i18n/locales";
import { sanityFetch } from "@/sanity/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";

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
  const baseUrlString =
    settings?.siteUrl?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  const metadataBase =
    baseUrlString && baseUrlString.length
      ? new URL(baseUrlString.startsWith("http") ? baseUrlString : `https://${baseUrlString}`)
      : undefined;

  const canonicalPath = `/${locale}`;
  const title = seo?.title || "Nafas Beauty Lounge";
  const description = seo?.description || "Nafas Beauty Lounge — A space to breathe.";
  const ogImageUrl = seo?.ogImage?.asset?.url;
  const faviconUrl =
    urlForImage(settings?.favicon)?.width(32).height(32).fit("crop").url() ||
    settings?.favicon?.asset?.url;
  const siteIconUrl =
    urlForImage(settings?.siteIcon)?.width(180).height(180).fit("crop").url() ||
    settings?.siteIcon?.asset?.url;

  return {
    metadataBase,
    title,
    description,
    alternates: metadataBase
      ? {
          canonical: canonicalPath,
          languages: {
            en: "/en",
            ar: "/ar",
          },
        }
      : undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      url: canonicalPath,
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    icons:
      faviconUrl || siteIconUrl
        ? {
            icon: faviconUrl ? [{ url: faviconUrl, sizes: "32x32" }] : undefined,
            shortcut: faviconUrl ? [{ url: faviconUrl, sizes: "32x32" }] : undefined,
            apple: siteIconUrl ? [{ url: siteIconUrl, sizes: "180x180" }] : undefined,
          }
        : undefined,
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
  const safeLocale: Locale = isLocale(locale) ? locale : normalizeLocale(locale);
  const dir = safeLocale === "ar" ? "rtl" : "ltr";

  return (
    <div lang={safeLocale} dir={dir} className="min-h-full flex flex-col">
      {children}
    </div>
  );
}

