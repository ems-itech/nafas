"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Messages } from "@/lib/i18n/messages";

type Props = {
  t: Messages;
};

export default function AboutSection({ t }: Props) {
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
              {t.about.title1}
              <br />
              {t.about.title2}
            </h2>
            <p
              className="font-sans text-muted-foreground max-w-lg mb-5 font-light"
              style={{
                fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)",
              }}
            >
              {t.about.p1}
            </p>
            <p
              className="font-sans text-muted-foreground max-w-lg font-light"
              style={{
                fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)",
              }}
            >
              {t.about.p2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative rounded-2xl image-crisp w-full h-72 overflow-hidden">
              <Image
                src="/images/oils-texture.jpg"
                alt="Natural beauty oils and botanical ingredients"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 250px, 45vw"
              />
            </div>
            <div className="relative rounded-2xl image-crisp w-full h-72 mt-10 overflow-hidden">
              <Image
                src="/images/treatment-hands.jpg"
                alt="Warm terracotta spa interior with arched alcoves"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 250px, 45vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

