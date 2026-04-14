"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/locales";

type GalleryItem = {
  src: string;
  alt: string;
};

type Props = {
  items: GalleryItem[];
  subtitle?: { en?: string; ar?: string };
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

export default function GallerySection({
  items,
  subtitle,
  locale,
}: Props) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-16 px-4 md:px-10 bg-gray-50">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {locale === "ar" ? "معرض الأعمال" : "Our Gallery"}
        </h2>

        {subtitle && (
          <p className="text-gray-500 mt-2">
            {pickLocalized(locale, subtitle)}
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 max-w-6xl mx-auto">
        {items?.map((item, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid"
            onClick={() => setSelected(item)}
          >
            <Image
              src={item.src}
              alt={item.alt || "Gallery image"}
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full">
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1200}
              height={800}
              className="rounded-xl w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}