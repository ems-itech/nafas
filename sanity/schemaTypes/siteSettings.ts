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
      name: "siteUrl",
      title: "Site URL",
      description: "Used for canonical URLs and metadata. Example: https://nafas.example",
      type: "url",
    }),
    defineField({
      name: "activeTheme",
      title: "Active theme",
      description:
        "Controls the global color theme used by the frontend. If unset, the default theme is used.",
      type: "string",
      options: {
        list: [
          { title: "Default (current)", value: "default" },
          { title: "Warm Cream (new)", value: "warm" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      description:
        "Browser tab icon. If unset, the frontend will keep its existing behavior / assets.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "siteIcon",
      title: "Site icon",
      description:
        "App/launcher icon (e.g. Apple touch icon). If unset, the frontend will keep its existing behavior / assets.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        defineField({
          name: "brand",
          title: "Brand",
          type: "localizedString",
        }),
        defineField({
          name: "nav",
          title: "Navigation",
          type: "array",
          of: [
            {
              type: "object",
              name: "navItem",
              fields: [
                defineField({ name: "label", title: "Label", type: "localizedString" }),
                defineField({
                  name: "href",
                  title: "Href",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: "label.en", subtitle: "href" },
              },
            },
          ],
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA label",
          type: "localizedString",
        }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "address", title: "Address", type: "localizedText" }),
        defineField({ name: "hours", title: "Hours", type: "localizedText" }),
        defineField({ name: "mapUrl", title: "Map URL", type: "url" }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "tagline", title: "Tagline", type: "localizedText" }),
        defineField({
          name: "social",
          title: "Social links",
          type: "array",
          of: [
            {
              type: "object",
              name: "socialLink",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({
                  name: "url",
                  title: "URL",
                  type: "url",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: "label", subtitle: "url" } },
            },
          ],
        }),
      ],
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
            defineField({
              name: "ogImage",
              title: "Open Graph image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "noIndex", title: "No index", type: "boolean" }),
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
            defineField({
              name: "ogImage",
              title: "Open Graph image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "noIndex", title: "No index", type: "boolean" }),
          ],
        }),
      ],
    }),
  ],
});

