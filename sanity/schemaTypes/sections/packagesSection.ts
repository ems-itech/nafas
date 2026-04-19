import { defineField, defineType } from "sanity";

export const packagesSection = defineType({
  name: "packagesSection",
  title: "Packages",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "packages",
      title: "Packages",
      type: "array",
      of: [
        {
          type: "object",
          name: "packageItem",
          title: "Package",
          fields: [
            defineField({ name: "name", title: "Name", type: "localizedString" }),
            defineField({
              name: "image",
              title: "Image (optional)",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "localizedString" })],
            }),
            defineField({
              name: "description",
              title: "Description (optional)",
              type: "localizedText",
            }),
            defineField({ name: "price", title: "Price (optional)", type: "string" }),
            defineField({
              name: "priceUnit",
              title: "Price unit (optional)",
              description: 'Examples: "session", "visit", "package"',
              type: "localizedString",
            }),
            defineField({
              name: "items",
              title: "Included services (optional)",
              type: "array",
              of: [{ type: "localizedString" }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare({ title }) {
      return { title: title || "Packages" };
    },
  },
});

