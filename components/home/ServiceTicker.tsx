import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { serviceNames, text } from "./content";
import styles from "../FigmaHomePage.module.css";

export default function ServiceTicker({ locale, section }: { locale: Locale; section?: SectionOf<"servicesSection"> }) {
  const names = section?.ticker?.length
    ? section.ticker.map((item) => text(item, locale)).filter(Boolean)
    : section?.services?.length
      ? section.services.map((item) => text(item.name, locale)).filter(Boolean)
      : serviceNames;

  return <div className={styles.ticker} aria-label="Our services"><div>{[...names, ...names].map((name, index) => <span key={`${name}-${index}`}>{name}<i /></span>)}</div></div>;
}
