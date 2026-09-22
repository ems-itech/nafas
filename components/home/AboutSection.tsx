import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { Locale } from "@/lib/i18n/locales";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import type { SectionOf } from "./content";
import { imageSource, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

const ABOUT_BENEFITS: Record<Locale, string[]> = {
  en: [
    "Scalp, skin, and circulation treated as one system, not four separate appointments.",
    "Sessions run 45-120 minutes with no overlap, so your time is genuinely yours.",
    "HydraFacial, Dermapen, and peels matched to your skin type after consultation.",
    "Manual lymphatic drainage and aromatherapy for recovery, puffiness, and sleep.",
  ],
  ar: [
    "العناية بفروة الرأس والبشرة والدورة الدموية كمنظومة واحدة، لا كمواعيد منفصلة.",
    "جلسات من ٤٥ إلى ١٢٠ دقيقة دون تداخل، ليكون وقتك لك بالكامل.",
    "نختار الهيدرافيشل والديرمابن والتقشير حسب نوع بشرتك بعد الاستشارة.",
    "التصريف اللمفاوي اليدوي والعلاج العطري للتعافي وتقليل الانتفاخ وتحسين النوم.",
  ],
};

export default function AboutSection({ locale, section, phone, phoneHref }: { locale: Locale; section?: SectionOf<"aboutSection">; phone: string; phoneHref: string }) {
  const imageUrl = section?.image?.asset ? imageSource(section.image, "") : "";
  const description = getLocalizedValue(section?.description, locale);

  return (
    <section id="about" className={`${styles.aboutSection} ${!imageUrl ? styles.aboutNoImage : ""}`}>
      <div className={styles.aboutText}>
        <h2>{locale === "en" ? <>Amman&apos;s calm corner for skin, scalp, and<br className={styles.aboutHeadingBreak} /> body</> : text(section?.title, locale, "متجذّرون في العناية، ومسترشدون بالهدوء.")}</h2>
        {description?.length ? <div className={styles.aboutDescription}><PortableText value={description} /></div> : <p>Experience exceptional spa and beauty services delivered by skilled professionals dedicated to your comfort and well-being. We combine advanced techniques with premium products to provide treatments that rejuvenate your skin, relax your body, and restore your natural glow. From personalized skincare to soothing body therapies, every service is thoughtfully designed to ensure a truly refreshing and luxurious experience.</p>}
        <div className={styles.benefits}>
          {ABOUT_BENEFITS[locale].map((item) => <span key={item}><Image src="/images/figma-nafas/icon-check-heart.svg" alt="" width={24} height={24} />{item}</span>)}
        </div>
        <div className={styles.aboutActions}>
          <a className={styles.outlineButton} href={section?.cta?.href || "#services"}>{text(section?.cta?.text, locale, "View Services")}</a>
          <a className={styles.phoneButton} href={phoneHref} dir="ltr"><b><Icon src="/images/figma-nafas/icon-phone.svg" /></b>{phone}</a>
        </div>
      </div>
      {imageUrl && <div className={styles.aboutCollage}>
        <div className={styles.aboutSingleImage}><Image src={imageUrl} alt={text(section?.image?.alt, locale, "Relaxing spa treatment")} fill sizes="(min-width: 1051px) 558px, 92vw" className={styles.coverImage} /></div>
      </div>}
    </section>
  );
}
