import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import { urlForImage } from "@/sanity/image";
import type { Homepage, HomepageSection, LocalizedString, LocalizedText, SanityImage } from "@/sanity/types";

export type SectionOf<Type extends HomepageSection["_type"]> = Extract<HomepageSection, { _type: Type }>;

export function getSection<Type extends HomepageSection["_type"]>(homepage: Homepage | null | undefined, type: Type): SectionOf<Type> | undefined {
  return homepage?.sections?.find((section) => section._type === type) as SectionOf<Type> | undefined;
}

export function text(value: LocalizedString | LocalizedText | undefined, locale: Locale, fallback = "") {
  return getLocalizedValue(value, locale)?.trim() || fallback;
}

export function imageSource(image: SanityImage | undefined, fallback: string, width = 1200) {
  return (image?.asset?._id ? urlForImage(image)?.width(width).quality(85).url() : image?.asset?.url) || fallback;
}

export const serviceNames = ["Head Spa Ritual", "Lymphatic Drainage", "HydraFacial", "Dermapen", "Scalp Treatment", "Lash Lift", "Manicure", "Pedicure"];

export const signatureServices = [
  { name: "Head Spa Ritual", image: "/images/figma-nafas/service-head-spa.jpg" },
  { name: "Lymphatic Drainage", image: "/images/figma-nafas/service-lymphatic.jpg" },
  { name: "HydraFacial", image: "/images/figma-nafas/service-hydrafacial.jpg" },
  { name: "Dermapen Microneedling", image: "/images/figma-nafas/service-dermapen.jpg" },
  { name: "Lash Lift & Extensions", image: "/images/figma-nafas/service-lash.jpg" },
];

export const defaultNavItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function serviceCards(section: SectionOf<"servicesSection"> | undefined, locale: Locale) {
  return section?.services?.length
    ? section.services.map((item, index) => ({ name: text(item.name, locale), image: imageSource(item.image, signatureServices[index % signatureServices.length].image, 500) })).filter((item) => item.name)
    : signatureServices;
}

export function navItems(settings: { header?: { nav?: Array<{ label?: LocalizedString; href?: string }> } } | null | undefined, locale: Locale) {
  const items = settings?.header?.nav?.filter((item) => item.href && text(item.label, locale)) || [];
  return items.length ? items.map((item) => ({ label: text(item.label, locale), href: item.href! })) : defaultNavItems;
}
