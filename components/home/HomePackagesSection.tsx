import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { imageSource, packageItems, text } from "./content";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import styles from "../FigmaHomePage.module.css";

type Package = NonNullable<SectionOf<"packagesSection">["packages"]>[number];

function PackageCard({ item, locale, phoneHref, featured = false }: { item?: Package; locale: Locale; phoneHref: string; featured?: boolean }) {
  const items = item?.items?.length ? item.items.map((included) => text(included, locale)).filter(Boolean) : packageItems;
  return (
    <article className={`${styles.packageCard} ${featured ? styles.packageFeatured : ""}`}>
      <div className={styles.packageImage}><Image src={imageSource(item?.image, "/images/figma-nafas/package.jpg")} alt={text(item?.image?.alt, locale, "Relax and rejuvenate spa package")} fill sizes={featured ? "560px" : "350px"} className={styles.coverImage} /></div>
      <div className={styles.packageBody}>
        <div className={styles.packageTitle}><div><h3>{text(item?.name, locale, "Relax & Rejuvenate")}</h3><span>{text(item?.priceUnit, locale, "Signature Spa Package")}</span></div><div><small>{text(item?.duration, locale, "◷ 120 Min")}</small><strong>{item?.price || "85 JD"}</strong></div></div>
        <p>{text(item?.description, locale, "Unwind with a soothing head-spa ritual, HydraFacial, and lymphatic drainage. Perfect for total relaxation and renewal.")}</p>
        <div className={styles.packageItems}>{items.map((included) => <span key={included}><b><Image src="/images/figma-nafas/package-service.png" alt="" fill sizes="32px" /></b>{included}</span>)}</div>
        <a href={phoneHref}><Icon src="/images/figma-nafas/icon-phone.svg" />Call Now</a>
      </div>
    </article>
  );
}

export default function HomePackagesSection({ locale, section, phoneHref }: { locale: Locale; section?: SectionOf<"packagesSection">; phoneHref: string }) {
  const cards = section?.packages?.length ? section.packages.map((item, index) => ({ ...item, featured: item.featured ?? index < 2 })) : undefined;
  return (
    <section id="packages" className={styles.packagesSection}>
      <SectionHeading title={text(section?.title, locale, "Arches, warm light, and softness underfoot")} description={text(section?.description, locale, "Choose the care that fits your day.")} />
      <div className={styles.featuredPackages}>{cards ? cards.filter((item) => item.featured).map((item, index) => <PackageCard key={`${text(item.name, locale)}-${index}`} item={item} locale={locale} phoneHref={phoneHref} featured />) : [0, 1].map((item) => <PackageCard key={item} locale={locale} phoneHref={phoneHref} featured />)}</div>
      <div className={styles.packageGrid}>{cards ? cards.filter((item) => !item.featured).map((item, index) => <PackageCard key={`${text(item.name, locale)}-${index}`} item={item} locale={locale} phoneHref={phoneHref} />) : [0, 1, 2].map((item) => <PackageCard key={item} locale={locale} phoneHref={phoneHref} />)}</div>
    </section>
  );
}
