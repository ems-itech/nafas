import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Text", type: "localizedString" }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ["http", "https", "tel", "mailto"] }),
    }),
  ],
});

