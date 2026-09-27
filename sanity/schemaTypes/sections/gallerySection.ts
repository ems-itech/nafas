import { defineField, defineType } from "sanity";

export const gallerySection = defineType({
  name: "gallerySection",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "description", title: "Intro", type: "localizedText" }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "localizedString" }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare({ title }) {
      return { title: title || "Gallery" };
    },
  },
});
