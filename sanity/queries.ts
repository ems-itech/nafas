import groq from "groq";

export const siteSettingsQuery = groq`
*[_type == "siteSettings" && _id == "siteSettings"][0]{
  title,
  siteUrl,
  activeTheme,
  favicon{asset->{_id, url}},
  siteIcon{asset->{_id, url}},

  header{
    brand{
      alt{en, ar},
      asset->{_id, url, metadata{lqip, dimensions}}
    },
    nav[]{
      label{en, ar},
      href
    },
    ctaLabel{en, ar}
  },

  contact{
    phone,
    address{en, ar},
    hours{en, ar},
    mapUrl
  },

  footer{
    copyright{en, ar},
    tagline{en, ar},
    instagramUrl,
    facebookUrl,
    social[]{
      label,
      url
    }
  },

  seo{
    en{
      title,
      description,
      keywords,
      noIndex,
      ogImage{asset->{_id, url, metadata{lqip, dimensions}}}
    },
    ar{
      title,
      description,
      keywords,
      noIndex,
      ogImage{asset->{_id, url, metadata{lqip, dimensions}}}
    }
  }
}
`;

export const homepageQuery = groq`
*[_type == "homepage"][0]{
  _id,
  title,

  sections[]{
    _type,

    // hero
    slides[]{
      _key,
      title{en, ar},
      subtitle{en, ar},
      image{
        ...,
        alt{en, ar},
        asset->{_id, url, metadata{lqip, dimensions}}
      }
    },
    title{en, ar},
    subtitle{en, ar},
    overlay,
    cta{
      text{en, ar},
      href
    },
    secondaryCta{ text{en, ar}, href },
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
    benefits[]{en, ar},
    // Legacy About collage images remain readable for older documents.

    // services
    services[]{
      name{en, ar},
      image{
        ...,
        alt{en, ar},
        asset->{_id, url, metadata{lqip, dimensions}}
      },
      icon,
      description{en, ar},
      price
    },
    ticker[]{en, ar},

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
      duration{en, ar},
      featured,
      priceUnit{en, ar},
      items[]{en, ar}
    },

    // price preview and appointment
    formEnabled,
    email,
    categories[]{en, ar}
  }
}
`;
