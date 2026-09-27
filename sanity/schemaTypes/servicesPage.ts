import { defineField, defineType } from "sanity";

const localizedSeoFields = [
  defineField({ name: "title", title: "Meta title", type: "string" }),
  defineField({ name: "description", title: "Meta description", type: "text", rows: 3 }),
  defineField({ name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] }),
  defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean" }),
];

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "content", title: "Page content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      initialValue: "Services Page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introTitle",
      title: "Page heading",
      type: "localizedString",
      group: "content",
    }),
    defineField({
      name: "introDescription",
      title: "Page introduction",
      type: "localizedText",
      group: "content",
    }),
    defineField({
      name: "labels",
      title: "Table and price labels",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "service", title: "Service", type: "localizedString" }),
        defineField({ name: "price", title: "Price", type: "localizedString" }),
        defineField({ name: "refill", title: "Refill", type: "localizedString" }),
        defineField({ name: "currency", title: "Currency", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Service categories",
      description: "Drag categories and cards to control their order on the page.",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          name: "serviceCategory",
          title: "Service category",
          type: "object",
          fields: [
            defineField({
              name: "anchorId",
              title: "Section ID",
              description: "A stable URL-safe value, for example hair-scalp. Avoid changing it after publishing.",
              type: "string",
              validation: (Rule) =>
                Rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
                  name: "URL-safe section ID",
                  invert: false,
                }),
            }),
            defineField({
              name: "mark",
              title: "Decorative mark",
              type: "string",
              description: "A short symbol such as ✦, ◇, or ✧.",
              validation: (Rule) => Rule.max(3),
            }),
            defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
            defineField({ name: "title", title: "Category title", type: "localizedString" }),
            defineField({
              name: "sections",
              title: "Service cards",
              type: "array",
              validation: (Rule) => Rule.required().min(1),
              of: [
                {
                  name: "serviceMenuSection",
                  title: "Service card",
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Card title", type: "localizedString" }),
                    defineField({
                      name: "durationBadge",
                      title: "Duration badge",
                      description: "Optional. Enter the complete badge text, for example “20 minutes” and “20 دقيقة”. Leave both empty to hide it.",
                      type: "localizedString",
                    }),
                    defineField({
                      name: "display",
                      title: "Price layout",
                      type: "string",
                      initialValue: "standard",
                      options: {
                        layout: "radio",
                        list: [
                          { title: "Standard list", value: "standard" },
                          { title: "Package list", value: "packages" },
                          { title: "Two price columns", value: "twoColumn" },
                          { title: "Price matrix", value: "matrix" },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "priceLabels",
                      title: "Two-column headings",
                      type: "object",
                      hidden: ({ parent }) => parent?.display !== "twoColumn",
                      fields: [
                        defineField({ name: "primary", title: "First price", type: "localizedString" }),
                        defineField({ name: "secondary", title: "Second price", type: "localizedString" }),
                      ],
                    }),
                    defineField({
                      name: "priceColumns",
                      title: "Matrix columns",
                      type: "array",
                      hidden: ({ parent }) => parent?.display !== "matrix",
                      of: [{ type: "localizedString" }],
                    }),
                    defineField({
                      name: "rows",
                      title: "Services and prices",
                      type: "array",
                      validation: (Rule) => Rule.required().min(1),
                      of: [
                        {
                          name: "servicePriceRow",
                          title: "Service and price",
                          type: "object",
                          fields: [
                            defineField({ name: "name", title: "Service name", type: "localizedString" }),
                            defineField({ name: "price", title: "Price", type: "number", validation: (Rule) => Rule.min(0) }),
                            defineField({ name: "refill", title: "Second / refill price", type: "number", validation: (Rule) => Rule.min(0) }),
                            defineField({
                              name: "matrixPrices",
                              title: "Matrix prices",
                              description: "Keep these in the same order as the matrix columns. Leave Price empty for a dash.",
                              type: "array",
                              of: [
                                {
                                  name: "matrixPrice",
                                  title: "Matrix price",
                                  type: "object",
                                  fields: [
                                    defineField({ name: "price", title: "Price", type: "number", validation: (Rule) => Rule.min(0) }),
                                  ],
                                  preview: {
                                    select: { price: "price" },
                                    prepare: ({ price }) => ({ title: price == null ? "—" : String(price) }),
                                  },
                                },
                              ],
                            }),
                          ],
                          preview: {
                            select: { title: "name.en", subtitle: "name.ar" },
                            prepare: ({ title, subtitle }) => ({ title: title || "Untitled service", subtitle }),
                          },
                        },
                      ],
                    }),
                  ],
                  preview: {
                    select: { title: "title.en", subtitle: "title.ar" },
                    prepare: ({ title, subtitle }) => ({ title: title || "Untitled card", subtitle }),
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title.en", subtitle: "title.ar", mark: "mark" },
            prepare: ({ title, subtitle, mark }) => ({
              title: `${mark || "✦"} ${title || "Untitled category"}`,
              subtitle,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "Services page SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "en", title: "English", type: "object", fields: localizedSeoFields }),
        defineField({ name: "ar", title: "Arabic", type: "object", fields: localizedSeoFields }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});
