import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localizedText" }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "overlay",
      title: "Overlay",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
  ],
  preview: {
    select: { title: "title.en", media: "backgroundImage" },
    prepare({ title, media }) {
      return { title: title || "Hero", media };
    },
  },
});

