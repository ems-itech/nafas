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
  duration?: string;
  price?: string;
  title?: LocalizedString;
  description?: LocalizedString;
};

