import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (Line 1)",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ar", title: "Arabic", type: "string" },
      ],
    }),
  
    defineField({
      name: "p1",
      title: "Paragraph 1",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ar", title: "Arabic", type: "text" },
      ],
    }),
    defineField({
      name: "p2",
      title: "Paragraph 2",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ar", title: "Arabic", type: "text" },
      ],
    }),
    defineField({
      name: "image1",
      title: "Image 1",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "image2",
      title: "Image 2",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});