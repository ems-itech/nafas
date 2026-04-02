"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/locales";
import type { Messages } from "@/lib/i18n/messages";
import type { Service } from "@/sanity/types";

type Props = {
  locale: Locale;
  t: Messages;
  services?: Service[];
};

function pickLocalized(locale: Locale, value?: { en?: string; ar?: string }) {
  return locale === "ar" ? value?.ar || value?.en || "" : value?.en || value?.ar || "";
}

export default function ServicesSection({ t, locale, services }: Props) {
  const items = (services || []).filter((s) => pickLocalized(locale, s.title).trim().length > 0);

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
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-5">
            {t.services.title}
          </h2>
          <p className="font-sans text-muted-foreground max-w-lg mx-auto font-light">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.08,
              }}
              className="group bg-card p-7 rounded-2xl border border-border hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-2xl text-foreground mb-2">
                {pickLocalized(locale, service.title)}
              </h3>
              {(service.duration || service.price) && (
                <p className="font-ui text-primary mb-4">
                  {service.duration}
                  {service.duration && service.price ? " — " : ""}
                  {service.price}
                </p>
              )}
              {pickLocalized(locale, service.description) && (
                <p className="font-sans text-muted-foreground text-sm leading-relaxed font-light">
                  {pickLocalized(locale, service.description)}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

