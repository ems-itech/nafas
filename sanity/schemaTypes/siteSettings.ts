import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "text",
      
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Meta title", type: "string" }),
            defineField({
              name: "description",
              title: "Meta description",
              type: "text",
              rows: 3,
            }),
          ],
        }),
        defineField({
          name: "ar",
          title: "Arabic",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Meta title", type: "string" }),
            defineField({
              name: "description",
              title: "Meta description",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
  ],
});

