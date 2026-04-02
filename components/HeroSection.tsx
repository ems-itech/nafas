"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import type { Messages } from "@/lib/i18n/messages";

type Props = {
  t: Messages;
  phoneHref?: string;
};

export default function HeroSection({
  t,
  phoneHref = "tel:+962791234567",
}: Props) {
  return (
    <section className="relative min-h-svh flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-salon.jpg"
          alt="Nafas Beauty Lounge — spa interior"
          fill
          priority
          className="object-cover image-crisp"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/10" />
      </div>

      <div className="relative z-10 container-narrow pb-24 sm:pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 max-w-3xl"
        >
          {t.hero.headline1}
          <br />
          {t.hero.headline2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="font-sans text-lg sm:text-xl text-primary-foreground/80 max-w-md mb-10 font-light"
        >
          {t.hero.sub}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          href={phoneHref}
          className="inline-block font-ui bg-primary text-primary-foreground px-10 py-4 rounded-full hover:bg-accent transition-colors duration-200"
        >
          {t.hero.cta}
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="font-ui text-primary-foreground/60 text-xs">
          {t.hero.discover}
        </span>
        <ChevronDown className="text-primary-foreground/60 animate-bounce" size={20} />
      </motion.div>
    </section>
  );
}

