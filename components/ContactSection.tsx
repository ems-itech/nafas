"use client";

import { useState } from "react";

export default function ContactSection() {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

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
    <section className="py-20 container-narrow">
      <h2 className="text-3xl font-bold mb-8">Contact Us</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          name="name"
          placeholder="Your Name"
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full p-3 border rounded h-32"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-green-600">Message sent successfully ✅</p>
        )}

        {error && (
          <p className="text-red-600">Something went wrong ❌</p>
        )}
      </form>
    </section>
  );
}