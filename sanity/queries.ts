import groq from "groq";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  favicon,
  phone,
  address,
  hours,
  seo{
    en{title, description},
    ar{title, description}
  }
}`;

export const servicesQuery = groq`*[_type == "service" && defined(slug.current)]|order(orderRank asc, _createdAt desc){
  _id,
  slug,
  duration{en, ar},
  price{en, ar},
  title{en, ar},
  description{en, ar}
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  _id,
  title{en, ar},
  p1{en, ar},
  p2{en, ar},
  image1,
  image2
}`;

export const heroQuery = groq`*[_type == "hero"][0]{
  headline1,
  headline2,
  sub1,
  sub2,
  ctaText,
  ctaPhone,
  image
}`;