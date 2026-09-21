import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { imageSource, text } from "./content";
import styles from "../FigmaHomePage.module.css";

type Package = NonNullable<SectionOf<"packagesSection">["packages"]>[number];

function PackageCard({ item, locale, phoneHref, featured = false }: { item: Package; locale: Locale; phoneHref: string; featured?: boolean }) {
  const items = item.items?.map((included) => text(included, locale)).filter(Boolean) ?? [];
  const description = text(item.description, locale);
  return (
    <article className={styles.packageCard}>
      <div className={styles.packageImage}>
        <Image src={imageSource(item.image, "/images/figma-nafas/package.jpg")} alt={text(item.image?.alt, locale, text(item.name, locale))} fill sizes="(min-width: 900px) 400px, (min-width: 600px) 50vw, 100vw" className={styles.coverImage} />
        {featured && <span className={styles.packageBadge}>{locale === "ar" ? "الأكثر طلباً" : "Most Wanted"}</span>}
      </div>
      <div className={styles.packageBody}>
        <div className={styles.packageTitle}><div><h3>{text(item.name, locale)}</h3>{text(item.priceUnit, locale) && <span>{text(item.priceUnit, locale)}</span>}</div><div>{text(item.duration, locale) && <small><Image src="/images/figma-nafas/package-clock.svg" alt="" width={16} height={16} />{text(item.duration, locale)}</small>}{item.price && <span className={styles.packagePriceDivider} />}{item.price && <strong>{item.price}</strong>}</div></div>
        {description && <p>{description}</p>}
        {items.length > 0 && <div className={styles.packageItems}>{items.map((included, index) => <span key={`${included}-${index}`}><b><Image src="/images/figma-nafas/package-service.png" alt="" width={19} height={19} /></b>{included}</span>)}</div>}
        <a href={phoneHref}><Image src="/images/figma-nafas/package-phone.svg" alt="" width={20} height={20} />{locale === "ar" ? "اتصلي الآن" : "Call Now"}</a>
      </div>
    </article>
  );
}

export default function HomePackagesSection({ locale, section, phoneHref }: { locale: Locale; section?: SectionOf<"packagesSection">; phoneHref: string }) {
  const cards = section?.packages?.slice(0, 3) ?? [];
  if (cards.length === 0) return null;
  const description = text(section?.description, locale);

  return (
    <section id="packages" className={styles.packagesSection}>
      <div className={styles.packageHeading}>
        <h2>{text(section?.title, locale, locale === "ar" ? "باقاتنا" : "Our Packages")}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className={styles.packageGrid}>
        {cards.map((item, index) => <PackageCard key={item._key || index} item={item} locale={locale} phoneHref={phoneHref} featured={item.featured === true} />)}
      </div>
    </section>
  );
}
