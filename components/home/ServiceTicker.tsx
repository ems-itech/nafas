import type { Locale } from "@/lib/i18n/locales";
import type { SectionOf } from "./content";
import { serviceNames, text } from "./content";
import styles from "../FigmaHomePage.module.css";

export default function ServiceTicker({ locale, section }: { locale: Locale; section?: SectionOf<"servicesSection"> }) {
  const localizedName = (value: Parameters<typeof text>[0]) =>
    text(value, locale, text(value, "en"));
  const tickerNames = section?.ticker
    ?.map(localizedName)
    .filter(Boolean) || [];
  const serviceItemNames = section?.services
    ?.map((item) => localizedName(item.name))
    .filter(Boolean) || [];
  const names = tickerNames.length
    ? tickerNames
    : serviceItemNames.length
      ? serviceItemNames
      : serviceNames;
  const ariaLabel = locale === "ar" ? "خدماتنا" : "Our services";

  return (
    <div className={`${styles.ticker} ${locale === "ar" ? styles.tickerRtl : ""}`} aria-label={ariaLabel} dir="ltr">
      <div className={styles.tickerTrack}>
        {[false, true].map((duplicate) => (
          <div
            key={String(duplicate)}
            className={styles.tickerGroup}
            dir={locale === "ar" ? "rtl" : "ltr"}
            aria-hidden={duplicate || undefined}
          >
            {names.map((name, index) => (
              <span key={`${name}-${index}`}>
                {name}
                <i aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
