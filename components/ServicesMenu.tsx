import {
  defaultServiceCategories,
  getMenuCards,
  type MenuCard,
  type MenuRow,
  type MenuSection,
} from "@/lib/data/services-menu";
import { getLocalizedValue } from "@/lib/i18n/getLocalizedValue";
import type { Locale } from "@/lib/i18n/locales";
import type { ServicesPage, SiteSettings } from "@/sanity/types";
import ServicesCategoryNav from "@/components/ServicesCategoryNav";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import homeStyles from "./FigmaHomePage.module.css";
import styles from "./ServicesMenu.module.css";

const pageCopy = {
  en: {
    title: "Our Services",
    description: "Every treatment is clinical in its precision and quiet in its delivery. All prices in Jordanian Dinar.",
    service: "Service",
    price: "Price",
    refill: "Refill",
    currency: "JOD",
  },
  ar: {
    title: "خدماتنا",
    description: "نقدّم كل علاج بدقة واحترافية في أجواء هادئة. جميع الأسعار بالدينار الأردني.",
    service: "الخدمة",
    price: "السعر",
    refill: "التعبئة",
    currency: "د.أ",
  },
} as const;

type ServiceMenuCopy = {
  title: string;
  description: string;
  service: string;
  price: string;
  refill: string;
  currency: string;
};

type ServiceCategory = MenuCard & { id: string; mark: string };

function localized(value: { en?: string; ar?: string } | null | undefined, locale: Locale, fallback: string) {
  return getLocalizedValue(value, locale) ?? fallback;
}

function resolveCopy(locale: Locale, page?: ServicesPage | null): ServiceMenuCopy {
  const fallback = pageCopy[locale];
  return {
    title: localized(page?.introTitle, locale, fallback.title),
    description: localized(page?.introDescription, locale, fallback.description),
    service: localized(page?.labels?.service, locale, fallback.service),
    price: localized(page?.labels?.price, locale, fallback.price),
    refill: localized(page?.labels?.refill, locale, fallback.refill),
    currency: localized(page?.labels?.currency, locale, fallback.currency),
  };
}

function fallbackCategories(locale: Locale): ServiceCategory[] {
  const cards = getMenuCards(locale);
  return defaultServiceCategories.map(({ id, mark, cardIndex }) => {
    const card = cards[cardIndex];
    return {
      id,
      mark,
      ...card,
      sections: card.sections.map((section) => {
        const duration = section.title.match(/(\d+)/)?.[1];
        return {
          ...section,
          durationBadge: duration
            ? `${duration} ${locale === "ar" ? "دقيقة" : "minutes"}`
            : undefined,
        };
      }),
    };
  });
}

function resolveCategories(locale: Locale, copy: ServiceMenuCopy, page?: ServicesPage | null): ServiceCategory[] {
  if (!page?.categories?.length) return fallbackCategories(locale);

  return page.categories.map((category, categoryIndex) => ({
    id: category.anchorId?.trim() || `service-category-${categoryIndex + 1}`,
    mark: category.mark?.trim() || "✦",
    eyebrow: localized(category.eyebrow, locale, ""),
    title: localized(category.title, locale, locale === "ar" ? "فئة خدمات" : "Service category"),
    sections: (category.sections ?? []).map((section) => ({
      title: localized(section.title, locale, locale === "ar" ? "الخدمات" : "Services"),
      durationBadge: localized(section.durationBadge, locale, ""),
      display: section.display,
      priceLabels:
        section.display === "twoColumn"
          ? [
              localized(section.priceLabels?.primary, locale, copy.price),
              localized(section.priceLabels?.secondary, locale, copy.refill),
            ]
          : undefined,
      priceColumns:
        section.display === "matrix"
          ? (section.priceColumns ?? []).map((column) => localized(column, locale, "—"))
          : undefined,
      rows: (section.rows ?? []).map((row) => ({
        name: localized(row.name, locale, locale === "ar" ? "خدمة" : "Service"),
        price: row.price,
        refill: row.refill,
        prices: row.matrixPrices?.map((value) => value.price ?? null),
      })),
    })),
  }));
}

function formatPrice(price: number, currency: string) {
  return `${price} ${currency}`;
}

function PriceRow({ row, copy, packageStyle = false, refill = false }: { row: MenuRow; copy: ServiceMenuCopy; packageStyle?: boolean; refill?: boolean }) {
  return (
    <div className={`${styles.priceRow} ${packageStyle ? styles.packageRow : ""}`}>
      <span className={styles.rowName}>{!packageStyle && <span className={styles.rowDot} aria-hidden="true">◦</span>}{row.name}</span>
      <span className={styles.price}>{row.price === undefined ? "—" : formatPrice(row.price, copy.currency)}</span>
      {refill && <span className={styles.price}>{row.refill === undefined ? "—" : formatPrice(row.refill, copy.currency)}</span>}
    </div>
  );
}

function Matrix({ section, copy }: { section: MenuSection; copy: ServiceMenuCopy }) {
  const mobileRows = section.rows.flatMap((row) =>
    (section.priceColumns ?? []).flatMap((label, index) => {
      const price = row.prices?.[index];
      if (price == null) return [];

      return [{
        name: `${row.name} – ${label === "Nick" ? "Neck" : label}`,
        price,
      }];
    }),
  );

  return (
    <>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead><tr><th scope="col">{copy.service}</th>{section.priceColumns?.map((label, index) => <th scope="col" key={`${label}-${index}`}>{label}</th>)}</tr></thead>
          <tbody>{section.rows.map((row, rowIndex) => <tr key={`${row.name}-${rowIndex}`}><th scope="row">{row.name}</th>{section.priceColumns?.map((label, index) => <td key={`${label}-${index}`}>{row.prices?.[index] == null ? "—" : formatPrice(row.prices[index], copy.currency)}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className={styles.mobileMatrix}>
        {mobileRows.map((row) => (
          <div className={styles.priceRow} key={row.name}>
            <span className={styles.rowName}><span className={styles.rowDot} aria-hidden="true">◦</span>{row.name}</span>
            <span className={styles.price}>{formatPrice(row.price, copy.currency)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function LabeledPrices({ section, copy }: { section: MenuSection; copy: ServiceMenuCopy }) {
  const [primaryLabel, secondaryLabel] = section.priceLabels ?? [copy.price, copy.refill];
  const mobileRows = section.rows.flatMap((row) => [
    ...(row.price === undefined ? [] : [{ name: `${row.name} – ${primaryLabel}`, price: row.price }]),
    ...(row.refill === undefined ? [] : [{ name: `${row.name} – ${secondaryLabel}`, price: row.refill }]),
  ]);

  return (
    <>
      <div className={`${styles.rows} ${styles.refillRows} ${styles.desktopLabeledRows}`}>
        {section.rows.map((row, index) => <PriceRow key={`${row.name}-${index}`} row={row} copy={copy} refill />)}
      </div>
      <div className={styles.mobileMatrix}>
        {mobileRows.map((row) => (
          <div className={styles.priceRow} key={row.name}>
            <span className={styles.rowName}><span className={styles.rowDot} aria-hidden="true">◦</span>{row.name}</span>
            <span className={styles.price}>{formatPrice(row.price, copy.currency)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ServiceCard({ section, copy }: { section: MenuSection; copy: ServiceMenuCopy }) {
  const isPackage = section.display === "packages" || (!section.display && !section.priceColumns && !section.priceLabels && section.rows.some((row) => /sessions|single session|جلس/i.test(row.name)));
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{section.title}</h3>
        {section.durationBadge && <span className={styles.duration}>{section.durationBadge}</span>}
        {section.priceLabels && <span className={styles.columnLabels}><span>{section.priceLabels[0]}</span><span>{section.priceLabels[1]}</span></span>}
      </div>
      {section.priceColumns ? <Matrix section={section} copy={copy} /> : section.priceLabels ? <LabeledPrices section={section} copy={copy} /> : (
        <div className={`${styles.rows} ${isPackage ? styles.packageRows : ""} ${section.priceLabels ? styles.refillRows : ""}`}>
          {section.rows.map((row, index) => <PriceRow key={`${row.name}-${index}`} row={row} copy={copy} packageStyle={isPackage} refill={Boolean(section.priceLabels)} />)}
        </div>
      )}
    </article>
  );
}

export default function ServicesMenu({ locale, settings, page }: { locale: Locale; settings?: SiteSettings | null; page?: ServicesPage | null }) {
  const phone = settings?.contact?.phone?.trim() || "+962790077730";
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const copy = resolveCopy(locale, page);
  const categories = resolveCategories(locale, copy, page);
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <div className={styles.page}>
      <div className={styles.siteHeader}>
        <div className={homeStyles.page}>
          <HomeHeader locale={locale} settings={settings} phoneHref={phoneHref} homeHref={`/${locale}`} navigationBasePath={`/${locale}`} activeMobileLink={1} localeHrefOverride={`/${otherLocale}/services`} showInfoBar={false} />
        </div>
      </div>
      <main>
      <div className={styles.intro}>
        <div className={styles.introRow}><h1>{copy.title}</h1><p>{copy.description}</p></div>
        <div className={styles.introRule} />
      </div>
      <ServicesCategoryNav locale={locale} categories={categories.map(({ id, title }) => ({ id, title }))} />
      <div className={styles.content}>
        {categories.map((category, index) => (
          <section
            className={`${styles.category} ${locale === "ar" ? styles.enlargedArabicCategory : ""}`}
            id={category.id}
            key={category.id}
            aria-labelledby={`${category.id}-title`}
          >
            <div className={styles.categoryHeading}><div><span className={styles.categoryNumber}>{category.mark} {String(index + 1).padStart(2, "0")}</span><p className={styles.categoryEyebrow}>{category.eyebrow}</p><h2 id={`${category.id}-title`}>{category.title}</h2></div><span className={styles.categoryRule} /></div>
            <div className={styles.cards}>
              {category.sections.map((section, sectionIndex) => <ServiceCard key={`${section.title}-${sectionIndex}`} section={section} copy={copy} />)}
            </div>
          </section>
        ))}
      </div>
      </main>
      <div className={homeStyles.page}>
        <HomeFooter locale={locale} settings={settings} phoneHref={phoneHref} homeHref={`/${locale}`} menuHref="#hair-scalp" navigationBasePath={`/${locale}`} />
      </div>
    </div>
  );
}
