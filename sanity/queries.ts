import groq from "groq";

export const siteSettingsQuery = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  title,
  siteUrl,
  activeTheme,
  favicon{asset->{_id, url}},
  siteIcon{asset->{_id, url}},
  header{
    brand{en, ar},
    nav[]{ label{en, ar}, href },
    ctaLabel{en, ar}
  },
  contact{
    phone,
    address{en, ar},
    hours{en, ar},
    mapUrl
  },
  footer{
    tagline{en, ar},
    social[]{ label, url }
  },
  seo{
    en{
      title,
      description,
      noIndex,
      ogImage{asset->{_id, url, metadata{lqip, dimensions}}}
    },
    ar{
      title,
      description,
      noIndex,
      ogImage{asset->{_id, url, metadata{lqip, dimensions}}}
    }
  }
}`;

export const homepageQuery = groq`*[_type == "homepage"][0]{
  _id,
  title,
  sections[]{
    _type,
    // hero
    title{en, ar},
    subtitle{en, ar},
    overlay,
    cta{ text{en, ar}, href },
    backgroundImage{
      ...,
      alt{en, ar},
      asset->{_id, url, metadata{lqip, dimensions}}
    },
    // about
    description{en, ar},
    image{
      ...,
      alt{en, ar},
      asset->{_id, url, metadata{lqip, dimensions}}
    },
    // services
    services[]{
      name{en, ar},
      image{
        ...,
        alt{en, ar},
        asset->{_id, url, metadata{lqip, dimensions}}
      },
      icon,
      description{en, ar}
    },
    // gallery
    images[]{
      ...,
      alt{en, ar},
      asset->{_id, url, metadata{lqip, dimensions}}
    },
    // packages
    packages[]{
      name{en, ar},
      image{
        ...,
        alt{en, ar},
        asset->{_id, url, metadata{lqip, dimensions}}
      },
      description{en, ar},
      price,
      priceUnit{en, ar},
      items[]{en, ar}
    },
    // appointment
    formEnabled
  }
}`;

