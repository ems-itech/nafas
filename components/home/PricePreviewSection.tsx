import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { pricedServices, text } from "./content";
import SectionHeading from "./SectionHeading";
import styles from "../FigmaHomePage.module.css";

const defaultCategories = ["Chemical Peels", "Brow Lamination", "Hair Coloring", "Aromatherapy", "Nail Art", "Scalp Treatments", "Body Wraps", "Gel Extensions"];

export default function PricePreviewSection({ locale, section }: { locale: Locale; section?: SectionOf<"priceSection"> }) {
  const rows = section?.services?.length
    ? section.services.map((item) => [text(item.name, locale), text(item.description, locale), item.price || ""] as const).filter((item) => item[0])
    : pricedServices;
  const categories = section?.categories?.length ? section.categories.map((item) => text(item, locale)).filter(Boolean) : defaultCategories;

  return (
    <section id="prices" className={styles.priceSection}>
      <SectionHeading title={text(section?.title, locale, "Arches, warm light, and softness underfoot")} description={text(section?.description, locale, "Explore our treatments and prices.")} />
      <div className={styles.categories}>{categories.map((category, index) => <span className={index === 0 ? styles.categoryActive : ""} key={category}>{category}</span>)}</div>
      <div className={styles.priceGrid}>{rows.map(([name, description, price]) => <article key={name}><div><h3>{name}</h3><p>{description}</p></div><strong>{price}</strong></article>)}</div>
      <Link className={styles.primaryButton} href={section?.cta?.href || `/${locale}/services`}>{text(section?.cta?.text, locale, "View All Services & Prices")}</Link>
    </section>
  );
}
