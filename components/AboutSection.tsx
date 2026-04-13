"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Messages } from "@/lib/i18n/messages";
import type { About } from "@/sanity/types";
import type { Locale } from "@/lib/i18n/locales";
import { urlFor } from "@/sanity/image";

type Props = {
  t: Messages;
  about?: About | null;
  locale: Locale;
};

function pickLocalized(
  locale: Locale,
  field?: { en?: string; ar?: string },
  fallback = "",
) {
  if (!field) return fallback;

  return locale === "ar"
    ? field.ar || field.en || fallback
    : field.en || field.ar || fallback;
}

export default function AboutSection({ t, about, locale }: Props) {
  return (
    <section id="about" className="section-spacing bg-secondary">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-4xl text-foreground mb-8">
              {pickLocalized(locale, about?.title, t.about.title1)}
              <br />
            </h2>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-lg mb-5 font-light">
              {pickLocalized(locale, about?.p1, t.about.p1)}
            </p>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-lg mb-5 font-light">
              {pickLocalized(locale, about?.p2, t.about.p2)}
            </p>
          </motion.div>

          {/* IMAGES */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {/* IMAGE 1 (SANITY) */}
            <div className="relative w-full h-72 overflow-hidden rounded-2xl">
              <Image
                src={
                  about?.image1
                    ? urlFor(about.image1).url()
                    : "/images/oils-texture.jpg"
                }
                alt="About image 1"
                fill
                className="object-cover"
              />
            </div>

            {/* IMAGE 2 (SANITY) */}
            <div className="relative w-full h-72 mt-10 overflow-hidden rounded-2xl">
              <Image
                src={
                  about?.image2
                    ? urlFor(about.image2).url()
                    : "/images/treatment-hands.jpg"
                }
                alt="About image 2"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}