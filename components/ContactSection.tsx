"use client";

import { useState } from "react";
import type { Contact } from "@/sanity/types";
import type { Locale } from "@/lib/i18n/locales";
// import type { Messages } from "@/lib/i18n/messages";

type Props = {
  contact?: Contact | null;
  locale: Locale;
};

function pickLocalized(
  locale: Locale,
  field?: { en?: string; ar?: string },
  fallback = ""
) {
  if (!field) return fallback;

  return locale === "ar"
    ? field.ar || field.en || fallback
    : field.en || field.ar || fallback;
}

function ContactSection({ contact, locale }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    setLoading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 container-narrow ">

      {/* TITLE */}
      <h2 className="text-4xl text-foreground mb-8">
        {pickLocalized(locale, contact?.title)}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">

        <input
          name="name"
          placeholder={pickLocalized(locale, contact?.namePlaceholder)}
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder={pickLocalized(locale, contact?.emailPlaceholder)}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="message"
          placeholder={pickLocalized(locale, contact?.messagePlaceholder)}
          className="w-full p-3 border rounded h-32"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? pickLocalized(locale, contact?.buttonText)
            : pickLocalized(locale, contact?.buttonText)}
        </button>

        {success && (
          <p className="text-green-600">
            {pickLocalized(locale, contact?.successMessage)}
          </p>
        )}

        {error && (
          <p className="text-red-600">
            {pickLocalized(locale, contact?.errorMessage)}
          </p>
        )}
      </form>
    </section>
  );
}

export default ContactSection;