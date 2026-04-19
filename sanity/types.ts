import type { PortableTextBlock } from "@portabletext/types";

export type LocalizedString = { en?: string; ar?: string };
export type LocalizedText = { en?: string; ar?: string };
export type LocalizedBlockContent = { en?: PortableTextBlock[]; ar?: PortableTextBlock[] };

export type SiteSettings = {
  title?: string;
  siteUrl?: string;
  activeTheme?: "default" | "warm" | string;
  favicon?: SanityImage;
  siteIcon?: SanityImage;
  header?: {
    brand?: LocalizedString;
    nav?: Array<{ label?: LocalizedString; href?: string }>;
    ctaLabel?: LocalizedString;
  };
  contact?: {
    phone?: string;
    address?: LocalizedText;
    hours?: LocalizedText;
    mapUrl?: string;
  };
  footer?: {
    tagline?: LocalizedText;
    social?: Array<{ label?: string; url?: string }>;
  };
  seo?: {
    en?: { title?: string; description?: string; noIndex?: boolean; ogImage?: SanityImage };
    ar?: { title?: string; description?: string; noIndex?: boolean; ogImage?: SanityImage };
  };
};

export type SanityImage = {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width?: number; height?: number; aspectRatio?: number };
    };
  };
  alt?: LocalizedString;
};

export type HomepageHeroSection = {
  _type: "heroSection";
  title?: LocalizedString;
  subtitle?: LocalizedText;
  backgroundImage?: SanityImage;
  overlay?: boolean;
  cta?: { text?: LocalizedString; href?: string };
};

export type HomepageAboutSection = {
  _type: "aboutSection";
  title?: LocalizedString;
  description?: LocalizedBlockContent;
  image?: SanityImage;
};

export type HomepageServicesSection = {
  _type: "servicesSection";
  title?: LocalizedString;
  services?: Array<{
    name?: LocalizedString;
    image?: SanityImage;
    icon?: string;
    description?: LocalizedText;
  }>;
};

export type HomepageGallerySection = {
  _type: "gallerySection";
  title?: LocalizedString;
  images?: SanityImage[];
};

export type HomepagePackagesSection = {
  _type: "packagesSection";
  title?: LocalizedString;
  packages?: Array<{
    name?: LocalizedString;
    image?: SanityImage;
    description?: LocalizedText;
    price?: string;
    priceUnit?: LocalizedString;
    items?: LocalizedString[];
  }>;
};

export type HomepageAppointmentSection = {
  _type: "appointmentSection";
  title?: LocalizedString;
  description?: LocalizedText;
  formEnabled?: boolean;
};

export type HomepageSection =
  | HomepageHeroSection
  | HomepageAboutSection
  | HomepageServicesSection
  | HomepageGallerySection
  | HomepagePackagesSection
  | HomepageAppointmentSection;

export type Homepage = {
  _id: string;
  title?: string;
  sections?: HomepageSection[];
};

