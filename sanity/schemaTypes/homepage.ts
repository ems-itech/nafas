import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "aboutSection" },
        { type: "servicesSection" },
        { type: "gallerySection" },
        { type: "packagesSection" },
        { type: "appointmentSection" },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});

