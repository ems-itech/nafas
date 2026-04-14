"use client";

import Card from "./Card";
import { urlFor } from "@/sanity/image";
import type { Package } from "@/sanity/types";
import type { Locale } from "@/lib/i18n/locales";

type Props = {
  packages: Package[];
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

export default function CardsSection({ packages, locale }: Props) {
  return (
    <section className="py-20 secondary">
      <div className="container-narrow">
        {/* TITLE */}
        <h2 className="text-4xl mb-10">
          {locale === "ar" ? "باقاتنا" : "Our Packages"}
        </h2>

        {/* CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {packages?.map((pkg) => (
            <Card
              key={pkg._id}
              title={pickLocalized(locale, pkg.title)}
              description={pickLocalized(locale, pkg.description)}
              price={pickLocalized(locale, pkg.price)}
              image={
                pkg.image
                  ? urlFor(pkg.image).url()
                  : "/images/fallback.jpg"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}