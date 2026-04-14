import { defineField, defineType } from "sanity";

export const galleryType = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",

  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
        },
      ],
    }),

   
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        }),
      ],
       validation: (Rule) =>
    Rule.required()
      .min(1)
      .max(6)
      .error("You must upload between 1 and 6 images only"),
    }),
  ],
});