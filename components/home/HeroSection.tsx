"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { imageSource, text } from "./content";
import Icon from "./Icon";
import styles from "../FigmaHomePage.module.css";

export default function HeroSection({ locale, section, phone, phoneHref }: { locale: Locale; section?: SectionOf<"heroSection">; phone: string; phoneHref: string }) {
  const configuredSlides = section?.slides?.filter((slide) => slide.image) || [];
  const slides = configuredSlides.length
    ? configuredSlides.map((slide, index) => ({
        id: slide._key || String(index),
        title: text(slide.title, locale, "Elevated Beauty.\nComplete Care."),
        subtitle: text(slide.subtitle, locale, "Explore our best-selling products loved for their quality and effectiveness!"),
        image: imageSource(slide.image, "/images/figma-nafas/hero.jpg", 2000),
        alt: text(slide.image?.alt, locale, "Nafas Beauty Lounge"),
      }))
    : [{
        id: "legacy",
        title: text(section?.title, locale, "Elevated Beauty.\nComplete Care."),
        subtitle: text(section?.subtitle, locale, "Explore our best-selling products loved for their quality and effectiveness!"),
        image: imageSource(section?.backgroundImage, "/images/figma-nafas/hero.jpg", 2000),
        alt: text(section?.backgroundImage?.alt, locale, "Woman enjoying a relaxing spa treatment"),
      }];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [activeSlide, slides.length]);

  const currentSlide = slides[activeSlide] || slides[0];
  const displayPhone = phone.replace(/^(\+962)(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4");

  return (
    <section id="home" className={styles.hero}>
      <Image key={currentSlide.id} src={currentSlide.image} alt={currentSlide.alt} fill priority sizes="100vw" className={`${styles.coverImage} ${styles.heroSlideImage}`} />
      {section?.overlay !== false && <div className={styles.heroShade} />}
      <div className={styles.heroContent}>
        <div key={currentSlide.id} className={styles.heroSlideContent}>
          <h1>{currentSlide.title.split("\n").map((line, index) => <span key={`${line}-${index}`}>{index > 0 && <br />}{line}</span>)}</h1>
          <p>{currentSlide.subtitle}</p>
          <div className={styles.heroActions}>
            <a className={`${styles.lightButton} ${styles.heroPhoneButton}`} href={phoneHref} dir="ltr">
              <span className={styles.heroPhoneIcon}><Icon src="/images/figma-nafas/icon-phone.svg" /></span>
              <span>{displayPhone}</span>
            </a>
            <a className={`${styles.primaryButton} ${styles.heroServicesButton}`} href={section?.cta?.href || "#services"}>
              {locale === "ar" ? "عرض الخدمات" : "View Services"}
              <Icon src="/images/figma-nafas/icon-arrow.svg" />
            </a>
          </div>
        </div>
        {slides.length > 1 && (
          <div className={styles.pagination} role="group" aria-label="Choose hero slide">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={index === activeSlide ? styles.activeDot : undefined}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1} of ${slides.length}`}
                aria-current={index === activeSlide ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
