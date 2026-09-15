import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { imageSource, text } from "./content";
import SectionHeading from "./SectionHeading";
import styles from "../FigmaHomePage.module.css";

export default function HomeGallerySection({ locale, section }: { locale: Locale; section?: SectionOf<"gallerySection"> }) {
  const images = section?.images || [];
  return (
    <section id="gallery" className={styles.gallerySection}>
      <SectionHeading title={text(section?.title, locale, "Arches, warm light, and softness underfoot")} description={text(section?.description, locale, "A space designed to feel less like a clinic and more like the calmest room in someone's home.")} />
      <div className={styles.galleryGrid}>
        <div className={styles.galleryTall}><Image src={imageSource(images[0], "/images/figma-nafas/gallery-1.png")} alt={text(images[0]?.alt, locale, "Terracotta spa arches")} fill sizes="347px" className={styles.coverImage} /><Image src="/images/figma-nafas/icon-gallery.svg" alt="" width={112} height={64} className={styles.galleryMark} /></div>
        <div><Image src={imageSource(images[1], "/images/figma-nafas/gallery-2.png")} alt={text(images[1]?.alt, locale, "Warm spa interior")} fill sizes="347px" className={styles.coverImage} /></div>
        <div><Image src={imageSource(images[2], "/images/figma-nafas/gallery-3.png")} alt={text(images[2]?.alt, locale, "Spa treatment room")} fill sizes="347px" className={styles.coverImage} /></div>
        <div className={styles.galleryWide}><Image src={imageSource(images[3], "/images/figma-nafas/gallery-4.png")} alt={text(images[3]?.alt, locale, "Head spa treatment")} fill sizes="718px" className={styles.coverImage} /></div>
      </div>
      <a className={styles.primaryButton} href={section?.cta?.href || "#gallery"}>{text(section?.cta?.text, locale, "View Gallery")}</a>
    </section>
  );
}
