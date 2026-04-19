import { defineField, defineType } from "sanity";

export const appointmentSection = defineType({
  name: "appointmentSection",
  title: "Appointment",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedText" }),
    defineField({
      name: "formEnabled",
      title: "Form enabled",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare({ title }) {
      return { title: title || "Appointment" };
    },
  },
});

