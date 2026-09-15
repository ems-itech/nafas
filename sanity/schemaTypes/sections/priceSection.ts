import { defineField, defineType } from "sanity";

export const priceSection = defineType({
  name: "priceSection",
  title: "Homepage price preview",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "description", title: "Intro", type: "localizedText" }),
    defineField({ name: "categories", title: "Category labels", type: "array", of: [{ type: "localizedString" }] }),
    defineField({
      name: "services",
      title: "Price preview rows",
      type: "array",
      of: [{
        type: "object",
        name: "pricePreviewItem",
        fields: [
          defineField({ name: "name", title: "Name", type: "localizedString" }),
          defineField({ name: "description", title: "Description", type: "localizedText" }),
          defineField({ name: "price", title: "Display price", type: "string" }),
        ],
        preview: { select: { title: "name.en", subtitle: "price" } },
      }],
    }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
  ],
  preview: { select: { title: "title.en" }, prepare({ title }) { return { title: title || "Price preview" }; } },
});
