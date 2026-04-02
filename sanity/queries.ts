import groq from "groq";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
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
  duration,
  price,
  title{en, ar},
  description{en, ar}
}`;

