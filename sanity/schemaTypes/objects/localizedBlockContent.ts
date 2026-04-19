import { defineField, defineType } from "sanity";

export const localizedBlockContent = defineType({
  name: "localizedBlockContent",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ar",
      title: "Arabic",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

