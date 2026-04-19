"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import { urlForImage } from "@/sanity/image";
import type { HomepageGallerySection } from "@/sanity/types";

type Props = {
  locale: Locale;
  section: HomepageGallerySection;
};

export default function GallerySection({ locale, section }: Props) {
  const title = getLocalizedValue(section.title, locale) || "";
  const images = section.images ?? [];

  if (!images.length) return null;

  return (
    <section id="gallery" className="section-spacing bg-secondary">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-5">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => {
            const url = urlForImage(img)?.width(1200).quality(80).url();
            if (!url) return null;
            const alt = getLocalizedValue(img.alt, locale) || "Gallery image";
            return (
              <motion.div
                key={`${url}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                className="relative rounded-2xl image-crisp w-full aspect-[4/5] overflow-hidden"
              >
                <Image src={url} alt={alt} fill className="object-cover" sizes="(min-width: 768px) 320px, 48vw" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

