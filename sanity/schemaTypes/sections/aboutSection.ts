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
      title: "About image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "localizedString" })],
    }),
    defineField({ name: "benefits", title: "Benefits", type: "array", of: [{ type: "localizedString" }] }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
  ],
  preview: {
    select: { title: "title.en", media: "image" },
    prepare({ title, media }) {
      return { title: title || "About", media };
    },
  },
});
