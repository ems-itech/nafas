import { defineField, defineType } from "sanity";

export const packageType = defineType({
  name: "package",
  title: "Packages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ar", title: "Arabic", type: "text" },
      ],
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ar", title: "Arabic", type: "text" },
      ],
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
