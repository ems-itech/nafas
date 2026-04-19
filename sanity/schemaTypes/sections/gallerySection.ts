import { defineField, defineType } from "sanity";

export const gallerySection = defineType({
  name: "gallerySection",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
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
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare({ title }) {
      return { title: title || "Gallery" };
    },
  },
});

