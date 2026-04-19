"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import Card from "@/components/ui/Card";
import { urlForImage } from "@/sanity/image";
import type { HomepageServicesSection } from "@/sanity/types";

type Props = {
  locale: Locale;
  section: HomepageServicesSection;
};

export default function ServicesSection({ locale, section }: Props) {
  const title = getLocalizedValue(section.title, locale) || "";
  const items =
    section.services?.filter((s) => (getLocalizedValue(s.name, locale) || "").trim().length > 0) ??
    [];

  return (
    <section id="services" className="section-spacing">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-5">{title}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, i) => {
            const name = getLocalizedValue(service.name, locale) || "";
            const desc = getLocalizedValue(service.description, locale);
            const img = service.image;
            const imgUrl = img ? urlForImage(img)?.width(900).quality(80).url() : null;
            const imgAlt = getLocalizedValue(img?.alt, locale) || name || "Service image";
            return (
              <motion.div
                key={`${name}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: i * 0.08,
                }}
                className="hover:-translate-y-1 transition-transform duration-300"
              >
                <Card className="group h-full">
                  {imgUrl ? (
                    <div className="relative w-full aspect-[16/10] image-crisp">
                      <Image
                        src={imgUrl}
                        alt={imgAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 340px, (min-width: 640px) 44vw, 92vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-7">
                    <h3 className="text-2xl text-foreground mb-2">{name}</h3>
                    {desc ? (
                      <p className="font-sans text-muted-foreground text-sm leading-relaxed font-light">
                        {desc}
                      </p>
                    ) : null}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

