import { defineField, defineType } from "sanity";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "serviceItem",
          title: "Service",
          fields: [
            defineField({ name: "name", title: "Name", type: "localizedString" }),
            defineField({
              name: "image",
              title: "Image (optional)",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "localizedString" })],
            }),
            defineField({ name: "icon", title: "Icon (optional)", type: "string" }),
            defineField({ name: "description", title: "Description (optional)", type: "localizedText" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare({ title }) {
      return { title: title || "Services" };
    },
  },
});

