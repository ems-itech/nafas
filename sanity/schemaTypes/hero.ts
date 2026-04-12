import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",

  fields: [
    defineField({
      name: "headline1",
      title: "Headline Line 1",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
    }),

    defineField({
      name: "headline2",
      title: "Headline Line 2",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
    }),

    defineField({
      name: "sub1",
      title: "Subtitle1",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English" },
        { name: "ar", type: "text", title: "Arabic" },
      ],
    }),

    defineField({
      name: "sub2",
      title: "Subtitle2",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English" },
        { name: "ar", type: "text", title: "Arabic" },
      ],
    }),

    defineField({
      name: "ctaText",
      title: "Button Text",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
    }),

    defineField({
      name: "ctaPhone",
      title: "Phone Number",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
