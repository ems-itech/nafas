import { defineField, defineType } from "sanity";
import type { SanityDocument } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "ar", title: "Arabic", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: SanityDocument) =>
          (doc as { title?: { en?: string } })?.title?.en ?? "",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "text", rows: 3 }),
        defineField({ name: "ar", title: "Arabic", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "text", rows: 3 }),
        defineField({ name: "ar", title: "Arabic", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "text", rows: 3 }),
        defineField({ name: "ar", title: "Arabic", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      description: "Lower shows first.",
    }),
  ],
});

