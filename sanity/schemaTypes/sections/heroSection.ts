import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "slides",
      title: "Slides",
      description: "Add up to three rotating hero slides. The buttons below are shared by every slide.",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [
        defineField({
          name: "heroSlide",
          title: "Hero slide",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "localizedString",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "subtitle", title: "Subtitle", type: "localizedText" }),
            defineField({
              name: "image",
              title: "Background image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
              fields: [
                defineField({ name: "alt", title: "Alt text", type: "localizedString" }),
              ],
            }),
          ],
          preview: {
            select: { title: "title.en", subtitle: "subtitle.en", media: "image" },
          },
        }),
      ],
    }),
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
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "cta" }),
  ],
  preview: {
    select: { title: "title.en", media: "backgroundImage" },
    prepare({ title, media }) {
      return { title: title || "Hero", media };
    },
  },
});
