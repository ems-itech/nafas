import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import type { SectionOf } from "./content";
import { imageSource, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

export default function AboutSection({ locale, section, phone, phoneHref }: { locale: Locale; section?: SectionOf<"aboutSection">; phone: string; phoneHref: string }) {
  const images = section?.images?.length ? section.images : section?.image ? [section.image] : [];
  const description = getLocalizedValue(section?.description, locale);
  const benefits = section?.benefits?.length
    ? section.benefits.map((item) => text(item, locale)).filter(Boolean)
    : ["Holistic Wellness Care", "Deep Relaxation Experience", "Radiant Skin Renewal", "Natural Healing Therapies"];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutText}>
        <h2>{text(section?.title, locale, "Professional Best Spa And Beauty Service")}</h2>
        {description?.length ? <div className={styles.aboutDescription}><PortableText value={description} /></div> : <p>Experience exceptional spa and beauty services delivered by skilled professionals dedicated to your comfort and well-being. We combine advanced techniques with premium products to provide treatments that rejuvenate your skin, relax your body, and restore your natural glow. From personalized skincare to soothing body therapies, every service is thoughtfully designed to ensure a truly refreshing and luxurious experience.</p>}
        <div className={styles.benefits}>
          {benefits.map((item) => <span key={item}><Image src="/images/figma-nafas/icon-check-heart.svg" alt="" width={24} height={24} />{item}</span>)}
        </div>
        <div className={styles.aboutActions}>
          <a className={styles.outlineButton} href={section?.cta?.href || "#services"}>{text(section?.cta?.text, locale, "View Services")}</a>
          <a className={styles.phoneButton} href={phoneHref}><b><Icon src="/images/figma-nafas/icon-phone.svg" /></b>{phone}</a>
        </div>
      </div>
      <div className={styles.aboutCollage}>
        <div className={styles.aboutTopLeft}><Image src={imageSource(images[0], "/images/figma-nafas/about-1.jpg")} alt={text(images[0]?.alt, locale, "Relaxing facial treatment")} fill sizes="264px" className={styles.coverImage} /></div>
        <div className={styles.aboutTopRight}><Image src={imageSource(images[1], "/images/figma-nafas/about-2.jpg")} alt={text(images[1]?.alt, locale, "Spa treatment preparation")} fill sizes="264px" className={styles.coverImage} /></div>
        <div className={styles.aboutBottom}><Image src={imageSource(images[2], "/images/figma-nafas/about-3.jpg")} alt={text(images[2]?.alt, locale, "Relaxing back massage")} fill sizes="558px" className={styles.coverImage} /></div>
      </div>
    </section>
  );
}
