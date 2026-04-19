"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import Card from "@/components/ui/Card";
import { urlForImage } from "@/sanity/image";
import type { HomepagePackagesSection } from "@/sanity/types";

type Props = {
  locale: Locale;
  section: HomepagePackagesSection;
};

export default function PackagesSection({ locale, section }: Props) {
  const title = getLocalizedValue(section.title, locale) || "";
  const packages = section.packages ?? [];

  if (!packages.length) return null;

  return (
    <section id="packages" className="section-spacing">
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

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => {
            const name = getLocalizedValue(pkg.name, locale) || "";
            const desc = getLocalizedValue(pkg.description, locale);
            const unit = getLocalizedValue(pkg.priceUnit, locale);
            const priceLine = pkg.price
              ? unit
                ? `${pkg.price} / ${unit}`
                : pkg.price
              : null;

            const img = pkg.image;
            const imgUrl = img ? urlForImage(img)?.width(1000).quality(80).url() : null;
            const imgAlt = getLocalizedValue(img?.alt, locale) || name || "Package image";

            const items =
              pkg.items
                ?.map((it) => (getLocalizedValue(it, locale) || "").trim())
                ?.filter(Boolean) ?? [];
            return (
              <motion.div
                key={`${name}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="hover:-translate-y-1 transition-transform duration-300"
              >
                <Card className="h-full">
                  {imgUrl ? (
                    <div className="relative w-full aspect-[16/10] image-crisp">
                      <Image
                        src={imgUrl}
                        alt={imgAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 340px, (min-width: 768px) 30vw, 92vw"
                      />
                    </div>
                  ) : null}

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl text-foreground">{name}</h3>
                      {priceLine ? (
                        <p className="font-ui text-primary whitespace-nowrap">{priceLine}</p>
                      ) : null}
                    </div>
                    {desc ? (
                      <p className="mt-4 font-sans text-muted-foreground text-sm leading-relaxed font-light">
                        {desc}
                      </p>
                    ) : null}
                    {items.length ? (
                      <ul className="mt-5 space-y-2">
                        {items.map((it, idx) => (
                          <li key={`${it}-${idx}`} className="font-sans text-muted-foreground text-sm font-light">
                            <span className="text-primary/70">• </span>
                            {it}
                          </li>
                        ))}
                      </ul>
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

