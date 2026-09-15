import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { serviceCards, text } from "./content";
import SectionHeading from "./SectionHeading";
import styles from "../FigmaHomePage.module.css";

export default function SignatureServicesSection({ locale, section }: { locale: Locale; section?: SectionOf<"servicesSection"> }) {
  const cards = serviceCards(section, locale);
  return (
    <section id="services" className={styles.signatureSection}>
      <Image src="/images/figma-nafas/floral-left.png" alt="" width={175} height={213} className={styles.signatureFloralLeft} />
      <Image src="/images/figma-nafas/floral-right.png" alt="" width={223} height={242} className={styles.signatureFloralRight} />
      <div className={styles.signaturePanel}>
        <SectionHeading title={text(section?.title, locale, "Signature Services")} description={text(section?.description, locale, "Each ritual is designed to restore balance, renew your skin, and give your body permission to rest.")} />
        <div className={styles.signatureGrid}>
          {cards.map((card) => <article key={card.name}><div><Image src={card.image} alt={card.name} fill sizes="170px" className={styles.coverImage} /></div><h3>{card.name}</h3></article>)}
        </div>
        <Link className={styles.primaryButton} href={section?.cta?.href || `/${locale}/services`}>{text(section?.cta?.text, locale, "View All Services & Prices")}</Link>
      </div>
    </section>
  );
}
