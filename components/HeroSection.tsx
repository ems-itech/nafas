"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { Hero } from "@/sanity/types";

type Props = {
  hero: Hero;
  locale: "en" | "ar";
  phoneHref?: string;
};

export default function HeroSection({
  hero,
  locale,
  phoneHref = "tel:+962791234567",
}: Props) {
  const lang = locale;

  return (
    <section className="relative min-h-svh flex items-center overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src={
            hero?.image ? urlFor(hero.image).url() : "/images/hero-salon.jpg"
          }
          alt="Hero Image"
          fill
          priority
          className="object-cover image-crisp"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/10" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container-narrow pb-24 sm:pb-32">
        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-3 leading-[0.95] tracking-tight font-normal"
        >
          {/* LINE 1 */}
          <span className="block whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
            {hero?.headline1?.[lang]}
          </span>

          {/* LINE 2 */}
          <span className="block whitespace-nowrap text-4xl sm:text-2xl md:text-3xl lg:text-3xl opacity-90 font-medium max-w-full overflow-hidden text-ellipsis mt-4">
            {hero?.headline2?.[lang]}
          </span>
        </motion.h1>

        {/* PARAGRAPH */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="font-sans text-lg sm:text-xl text-primary-foreground/80 max-w-md mb-6 font-light"
        >
          {hero?.sub1?.[lang]}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="font-sans text-lg sm:text-xl text-primary-foreground/80 max-w-md mb-6 font-light"
        >
          {hero?.sub2?.[lang]}
        </motion.p>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          href={`tel:${hero?.ctaPhone || "962791234567"}`}
          className="inline-block font-ui bg-rose-900 text-white px-10 py-4 rounded-full hover:bg-white hover:text-rose-900 transition-colors duration-200"
        >
          {hero?.ctaText?.[lang]}
        </motion.a>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#services" className="flex flex-col items-center gap-1 group">
          <span className="font-ui text-primary-foreground/60 text-xs group-hover:text-primary-foreground transition-colors">
            Discover
          </span>

          <ChevronDown
            className="text-primary-foreground/60 group-hover:text-primary-foreground animate-bounce transition-colors"
            size={20}
          />
        </a>
      </motion.div>
    </section>
  );
}
