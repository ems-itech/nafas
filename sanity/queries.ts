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
  faq{
    _type,
    eyebrow{en, ar},
    title{en, ar},
    description{en, ar},
    questions[]{_key, question{en, ar}, answer{en, ar}},
    contactPrompt{en, ar},
    cta{text{en, ar}, href}
  },

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
      description{en, ar}
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
      _key,
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
      items[]{_key, en, ar}
    },

    // appointment
    formEnabled,
    email
  }
}
`;

export const servicesPageQuery = groq`
*[_type == "servicesPage" && _id == "servicesPage"][0]{
  _id,
  title,
  introTitle{en, ar},
  introDescription{en, ar},
  labels{
    service{en, ar},
    price{en, ar},
    refill{en, ar},
    currency{en, ar}
  },
  categories[]{
    _key,
    anchorId,
    mark,
    eyebrow{en, ar},
    title{en, ar},
    sections[]{
      _key,
      title{en, ar},
      durationBadge{en, ar},
      display,
      priceLabels{
        primary{en, ar},
        secondary{en, ar}
      },
      priceColumns[]{_key, en, ar},
      rows[]{
        _key,
        name{en, ar},
        price,
        refill,
        matrixPrices[]{_key, price}
      }
    }
  },
  seo{
    en{title, description, keywords, noIndex},
    ar{title, description, keywords, noIndex}
  }
}
`;
