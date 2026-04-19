"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import { urlForImage } from "@/sanity/image";
import type { HomepageHeroSection } from "@/sanity/types";

type Props = {
  locale: Locale;
  section: HomepageHeroSection;
};

function splitLines(value: string) {
  return value.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function HeroSection({ locale, section }: Props) {
  const title = getLocalizedValue(section.title, locale) || "";
  const subtitle = getLocalizedValue(section.subtitle, locale) || "";
  const ctaText = getLocalizedValue(section.cta?.text, locale);
  const ctaHref = section.cta?.href;

  const img = section.backgroundImage;
  const imgUrl = img ? urlForImage(img)?.width(2400).quality(80).url() : null;
  const imgAlt = getLocalizedValue(img?.alt, locale) || "Hero image";
  const overlay = section.overlay !== false;

  const lines = splitLines(title);

  return (
    <section className="relative min-h-svh flex items-end overflow-hidden">
      {imgUrl && (
        <div className="absolute inset-0">
          <Image
            src={imgUrl}
            alt={imgAlt}
            fill
            priority
            className="object-cover image-crisp"
            sizes="100vw"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/10" />
          )}
        </div>
      )}

      <div className="relative z-10 container-narrow pb-24 sm:pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 max-w-3xl"
        >
          {lines.length > 0 ? (
            lines.map((l, i) => (
              <span key={i}>
                {l}
                {i < lines.length - 1 ? <br /> : null}
              </span>
            ))
          ) : (
            <span />
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="font-sans text-lg sm:text-xl text-primary-foreground/80 max-w-md mb-10 font-light"
          >
            {subtitle}
          </motion.p>
        )}

        {ctaHref && ctaText && (
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            href={ctaHref}
            className="inline-block font-ui bg-primary text-primary-foreground px-10 py-4 rounded-full hover:bg-accent transition-colors duration-200"
          >
            {ctaText}
          </motion.a>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="font-ui text-primary-foreground/60 text-xs">
          {locale === "ar" ? "اكتشف المزيد" : "Discover More"}
        </span>
        <ChevronDown className="text-primary-foreground/60 animate-bounce" size={20} />
      </motion.div>
    </section>
  );
}

