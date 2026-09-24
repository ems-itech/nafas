import type { PortableTextBlock } from "@portabletext/types";

/* ---------------------------
   Localized Types
---------------------------- */
export type LocalizedString = { en?: string; ar?: string };
export type LocalizedText = { en?: string; ar?: string };
export type LocalizedBlockContent = {
  en?: PortableTextBlock[];
  ar?: PortableTextBlock[];
};

/* ---------------------------
   Shared Types
---------------------------- */
export type SanityImage = {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  };
  alt?: LocalizedString;
};

/* ---------------------------
   Site Settings
---------------------------- */
export type SiteSettings = {
  title?: string;
  siteUrl?: string;
  activeTheme?: "default" | "warm" | "rustic" | string;
  favicon?: SanityImage;
  siteIcon?: SanityImage;

  header?: {
    brand?: SanityImage;
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
    copyright?: LocalizedString;
    tagline?: LocalizedText;
    instagramUrl?: string;
    facebookUrl?: string;
    social?: Array<{ label?: string; url?: string }>;
  };

  seo?: {
    en?: {
      title?: string;
      description?: string;
      keywords?: string[];
      noIndex?: boolean;
      ogImage?: SanityImage;
    };
    ar?: {
      title?: string;
      description?: string;
      keywords?: string[];
      noIndex?: boolean;
      ogImage?: SanityImage;
    };
  };
};

/* ---------------------------
   Homepage Sections
---------------------------- */
export type HomepageHeroSection = {
  _type: "heroSection";
  slides?: Array<{
    _key?: string;
    title?: LocalizedString;
    subtitle?: LocalizedText;
    image?: SanityImage;
  }>;
  title?: LocalizedString;
  subtitle?: LocalizedText;
  backgroundImage?: SanityImage;
  overlay?: boolean;
  cta?: { text?: LocalizedString; href?: string };
  secondaryCta?: { text?: LocalizedString; href?: string };
};

export type HomepageAboutSection = {
  _type: "aboutSection";
  title?: LocalizedString;
  description?: LocalizedBlockContent;
  image?: SanityImage;
  images?: SanityImage[];
  benefits?: LocalizedString[];
  cta?: { text?: LocalizedString; href?: string };
};

export type HomepageServicesSection = {
  _type: "servicesSection";
  title?: LocalizedString;
  description?: LocalizedText;
  ticker?: LocalizedString[];
  cta?: { text?: LocalizedString; href?: string };
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
  description?: LocalizedText;
  cta?: { text?: LocalizedString; href?: string };
  images?: SanityImage[];
};

export type HomepagePackagesSection = {
  _type: "packagesSection";
  title?: LocalizedString;
  description?: LocalizedText;
  packages?: Array<{
    _key?: string;
    name?: LocalizedString;
    image?: SanityImage;
    description?: LocalizedText;
    price?: string;
    duration?: LocalizedString;
    featured?: boolean;
    priceUnit?: LocalizedString;
    items?: Array<LocalizedString & { _key?: string }>;
  }>;
};

export type HomepageAppointmentSection = {
  _type: "appointmentSection";
  title?: LocalizedString;
  description?: LocalizedText;
  email?: string;
  formEnabled?: boolean;
};

export type HomepageFaqSection = {
  _type: "faqSection";
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedText;
  questions?: Array<{ _key?: string; question?: LocalizedString; answer?: LocalizedText }>;
  contactPrompt?: LocalizedString;
  cta?: { text?: LocalizedString; href?: string };
};

/* ---------------------------
   Appointment Form Input
---------------------------- */
export type AppointmentInput = {
  name: string;
  phone: string;
  services: string[];
  date: string;
  message?: string;
};

/* ---------------------------
   Union Type
---------------------------- */
export type HomepageSection =
  | HomepageHeroSection
  | HomepageAboutSection
  | HomepageServicesSection
  | HomepageGallerySection
  | HomepagePackagesSection
  | HomepageAppointmentSection;

/* ---------------------------
   Homepage
---------------------------- */
export type Homepage = {
  _id: string;
  title?: string;
  faq?: HomepageFaqSection;
  sections?: HomepageSection[];
};

/* ---------------------------
   Services Page
---------------------------- */
export type ServicesPageSeo = {
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export type ServicesPage = {
  _id: string;
  title?: string;
  introTitle?: LocalizedString;
  introDescription?: LocalizedText;
  labels?: {
    service?: LocalizedString;
    price?: LocalizedString;
    refill?: LocalizedString;
    currency?: LocalizedString;
  };
  categories?: Array<{
    _key?: string;
    anchorId?: string;
    mark?: string;
    eyebrow?: LocalizedString;
    title?: LocalizedString;
    sections?: Array<{
      _key?: string;
      title?: LocalizedString;
      durationBadge?: LocalizedString;
      display?: "standard" | "packages" | "twoColumn" | "matrix";
      priceLabels?: {
        primary?: LocalizedString;
        secondary?: LocalizedString;
      };
      priceColumns?: Array<LocalizedString & { _key?: string }>;
      rows?: Array<{
        _key?: string;
        name?: LocalizedString;
        price?: number;
        refill?: number;
        matrixPrices?: Array<{ _key?: string; price?: number }>;
      }>;
    }>;
  }>;
  seo?: { en?: ServicesPageSeo; ar?: ServicesPageSeo };
};
