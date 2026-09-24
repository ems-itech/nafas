import { defineField, defineType } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  title: "Frequently Asked Questions",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "description", title: "Introduction", type: "localizedText" }),
    defineField({
      name: "questions",
      title: "Questions",
      type: "array",
      of: [{
        type: "object",
        name: "faqItem",
        fields: [
          defineField({ name: "question", title: "Question", type: "localizedString", validation: (Rule) => Rule.required() }),
          defineField({ name: "answer", title: "Answer", type: "localizedText", validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: "question.en" } },
      }],
    }),
    defineField({ name: "contactPrompt", title: "Contact prompt", type: "localizedString" }),
    defineField({ name: "cta", title: "Contact button", type: "cta" }),
  ],
  preview: { select: { title: "title.en" }, prepare({ title }) { return { title: title || "Frequently Asked Questions" }; } },
});
