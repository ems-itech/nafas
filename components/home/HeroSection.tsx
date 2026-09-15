import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { imageSource, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

export default function HeroSection({ locale, section }: { locale: Locale; section?: SectionOf<"heroSection"> }) {
  return (
    <section id="home" className={styles.hero}>
      <Image src={imageSource(section?.backgroundImage, "/images/figma-nafas/hero.jpg", 2000)} alt={text(section?.backgroundImage?.alt, locale, "Woman enjoying a relaxing spa treatment")} fill priority sizes="100vw" className={styles.coverImage} />
      {section?.overlay !== false && <div className={styles.heroShade} />}
      <div className={styles.heroContent}>
        <div>
          <h1>{text(section?.title, locale, "Elevated Beauty.\nComplete Care.").split("\n").map((line, index) => <span key={`${line}-${index}`}>{index > 0 && <br />}{line}</span>)}</h1>
          <p>{text(section?.subtitle, locale, "Explore our best-selling products loved for their quality and effectiveness!")}</p>
          <div className={styles.heroActions}>
            <a className={styles.lightButton} href={section?.secondaryCta?.href || "#about"}>{text(section?.secondaryCta?.text, locale, "View More")}</a>
            <a className={styles.primaryButton} href={section?.cta?.href || "#services"}>{text(section?.cta?.text, locale, "View Services")} <Icon src="/images/figma-nafas/icon-arrow.svg" /></a>
          </div>
        </div>
        <div className={styles.pagination}><span className={styles.activeDot} /><span /><span /></div>
      </div>
    </section>
  );
}
