"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import { urlForImage } from "@/sanity/image";
import type { HomepageAboutSection } from "@/sanity/types";

type Props = {
  locale: Locale;
  section: HomepageAboutSection;
};

function splitLines(value: string) {
  return value.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function AboutSection({ locale, section }: Props) {
  const title = getLocalizedValue(section.title, locale) || "";
  const description = getLocalizedValue(section.description, locale) as
    | PortableTextBlock[]
    | undefined;

  const lines = splitLines(title);
  const img = section.image;
  const imgUrl = img ? urlForImage(img)?.width(1200).quality(80).url() : null;
  const imgAlt = getLocalizedValue(img?.alt, locale) || "About image";

  return (
    <section id="about" className="section-spacing bg-secondary">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-8">
              {lines.length > 0
                ? lines.map((l, i) => (
                    <span key={i}>
                      {l}
                      {i < lines.length - 1 ? <br /> : null}
                    </span>
                  ))
                : null}
            </h2>

            {description?.length ? (
              <div
                className="font-sans text-muted-foreground max-w-lg font-light space-y-5"
                style={{
                  fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)",
                }}
              >
                <PortableText value={description} />
              </div>
            ) : null}
          </motion.div>

          {imgUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="relative rounded-2xl image-crisp w-full h-[26rem] overflow-hidden"
            >
              <Image
                src={imgUrl}
                alt={imgAlt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 520px, 92vw"
              />
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

