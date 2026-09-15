import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedBlockContent",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "localizedString" })],
    }),
    defineField({ name: "benefits", title: "Benefits", type: "array", of: [{ type: "localizedString" }] }),
    defineField({ name: "images", title: "Collage images (up to three)", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt text", type: "localizedString" })] }], validation: (Rule) => Rule.max(3) }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
  ],
  preview: {
    select: { title: "title.en", media: "image" },
    prepare({ title, media }) {
      return { title: title || "About", media };
    },
  },
});
