import type { Image } from "sanity";

export type LocalizedString = { en?: string; ar?: string };

export type SiteSettings = {
  title?: string;
  phone?: string;
  address?: string;
  hours?: string;
  seo?: {
    en?: { title?: string; description?: string };
    ar?: { title?: string; description?: string };
  };
};

export type Service = {
  _id: string;
  slug?: { current?: string };
  duration?: LocalizedString;
  price?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedString;
};

export type About = {
  _id: string;
  title?: LocalizedString;
  p1?: LocalizedString;
  p2?: LocalizedString;
  image1?: Image;
  image2?: Image;
};

export type Hero = {
  headline1?: LocalizedString;
  headline2?: LocalizedString;
  sub1?: LocalizedString;
  sub2?: LocalizedString;
  ctaText?: LocalizedString;
  ctaPhone?: string;
  image?: Image;
};
