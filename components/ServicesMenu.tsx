import { getMenuCards, type MenuRow, type MenuSection } from "@/lib/data/services-menu";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteSettings } from "@/sanity/types";
import ServicesCategoryNav from "@/components/ServicesCategoryNav";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import homeStyles from "./FigmaHomePage.module.css";
import styles from "./ServicesMenu.module.css";

const categories = [
  { id: "hair-scalp", mark: "✦", cardIndex: 0 },
  { id: "skin-facials", mark: "◇", cardIndex: 5 },
  { id: "microneedling", mark: "✧", cardIndex: 10 },
  { id: "massage", mark: "✦", cardIndex: 3 },
  { id: "wood-g9", mark: "◇", cardIndex: 6 },
  { id: "wood-therapy", mark: "✧", cardIndex: 7 },
  { id: "g9-vibration", mark: "✦", cardIndex: 8 },
  { id: "lashes-brows", mark: "◇", cardIndex: 2 },
  { id: "manicure", mark: "✧", cardIndex: 4 },
  { id: "pedicure", mark: "✦", cardIndex: 1 },
  { id: "waxing-threading", mark: "◌", cardIndex: 9 },
] as const;

const pageCopy = {
  en: {
    title: "Our Services",
    description: "Every treatment is clinical in its precision and quiet in its delivery. All prices in Jordanian Dinar.",
    service: "Service",
    price: "Price",
    refill: "Refill",
    currency: "JOD",
    minutes: "minutes",
  },
  ar: {
    title: "خدماتنا",
    description: "نقدّم كل علاج بدقة واحترافية في أجواء هادئة. جميع الأسعار بالدينار الأردني.",
    service: "الخدمة",
    price: "السعر",
    refill: "التعبئة",
    currency: "د.أ",
    minutes: "دقيقة",
  },
} as const;

function formatPrice(price: number, locale: Locale) {
  return `${price} ${pageCopy[locale].currency}`;
}

function PriceRow({ row, locale, packageStyle = false, refill = false }: { row: MenuRow; locale: Locale; packageStyle?: boolean; refill?: boolean }) {
  return (
    <div className={`${styles.priceRow} ${packageStyle ? styles.packageRow : ""}`}>
      <span className={styles.rowName}>{!packageStyle && <span className={styles.rowDot} aria-hidden="true">◦</span>}{row.name}</span>
      <span className={styles.price}>{row.price === undefined ? "—" : formatPrice(row.price, locale)}</span>
      {refill && <span className={styles.price}>{row.refill === undefined ? "—" : formatPrice(row.refill, locale)}</span>}
    </div>
  );
}

function Matrix({ section, locale }: { section: MenuSection; locale: Locale }) {
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
          <thead><tr><th scope="col">{pageCopy[locale].service}</th>{section.priceColumns?.map((label) => <th scope="col" key={label}>{label}</th>)}</tr></thead>
          <tbody>{section.rows.map((row) => <tr key={row.name}><th scope="row">{row.name}</th>{section.priceColumns?.map((label, index) => <td key={label}>{row.prices?.[index] == null ? "—" : formatPrice(row.prices[index], locale)}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className={styles.mobileMatrix}>
        {mobileRows.map((row) => (
          <div className={styles.priceRow} key={row.name}>
            <span className={styles.rowName}><span className={styles.rowDot} aria-hidden="true">◦</span>{row.name}</span>
            <span className={styles.price}>{formatPrice(row.price, locale)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function LabeledPrices({ section, locale }: { section: MenuSection; locale: Locale }) {
  const [primaryLabel, secondaryLabel] = section.priceLabels ?? [pageCopy[locale].price, pageCopy[locale].refill];
  const mobileRows = section.rows.flatMap((row) => [
    ...(row.price === undefined ? [] : [{ name: `${row.name} – ${primaryLabel}`, price: row.price }]),
    ...(row.refill === undefined ? [] : [{ name: `${row.name} – ${secondaryLabel}`, price: row.refill }]),
  ]);

  return (
    <>
      <div className={`${styles.rows} ${styles.refillRows} ${styles.desktopLabeledRows}`}>
        {section.rows.map((row) => <PriceRow key={row.name} row={row} locale={locale} refill />)}
      </div>
      <div className={styles.mobileMatrix}>
        {mobileRows.map((row) => (
          <div className={styles.priceRow} key={row.name}>
            <span className={styles.rowName}><span className={styles.rowDot} aria-hidden="true">◦</span>{row.name}</span>
            <span className={styles.price}>{formatPrice(row.price, locale)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ServiceCard({ section, locale }: { section: MenuSection; locale: Locale }) {
  const isPackage = !section.priceColumns && !section.priceLabels && section.rows.some((row) => /sessions|single session|جلس/i.test(row.name));
  const duration = section.title.match(/(\d+)/)?.[1];
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{section.title}</h3>
        {duration && <span className={styles.duration}>{duration} {pageCopy[locale].minutes}</span>}
        {section.priceLabels && <span className={styles.columnLabels}><span>{section.priceLabels[0]}</span><span>{section.priceLabels[1]}</span></span>}
      </div>
      {section.priceColumns ? <Matrix section={section} locale={locale} /> : section.priceLabels ? <LabeledPrices section={section} locale={locale} /> : (
        <div className={`${styles.rows} ${isPackage ? styles.packageRows : ""} ${section.priceLabels ? styles.refillRows : ""}`}>
          {section.rows.map((row) => <PriceRow key={row.name} row={row} locale={locale} packageStyle={isPackage} refill={Boolean(section.priceLabels)} />)}
        </div>
      )}
    </article>
  );
}

export default function ServicesMenu({ locale, settings }: { locale: Locale; settings?: SiteSettings | null }) {
  const phone = settings?.contact?.phone?.trim() || "+962790077730";
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const menuCards = getMenuCards(locale);
  const copy = pageCopy[locale];
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <div className={styles.page}>
      <div className={styles.siteHeader}>
        <div className={homeStyles.page}>
          <HomeHeader locale={locale} settings={settings} phoneHref={phoneHref} homeHref={`/${locale}`} navigationBasePath={`/${locale}`} activeMobileLink={1} localeHrefOverride={`/${otherLocale}/services`} showInfoBar={false} />
        </div>
      </div>
      <main>
      <ServicesCategoryNav locale={locale} categories={categories.map(({ id, cardIndex }) => ({ id, title: menuCards[cardIndex].title }))} />
      <div className={styles.intro}>
        <div className={styles.introRow}><h1>{copy.title}</h1><p>{copy.description}</p></div>
        <div className={styles.introRule} />
      </div>
      <div className={styles.content}>
        {categories.map((category, index) => (
          <section className={styles.category} id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
            <div className={styles.categoryHeading}><div><span className={styles.categoryNumber}>{category.mark} {String(index + 1).padStart(2, "0")}</span><p className={styles.categoryEyebrow}>{menuCards[category.cardIndex].eyebrow}</p><h2 id={`${category.id}-title`}>{menuCards[category.cardIndex].title}</h2></div><span className={styles.categoryRule} /></div>
            <div className={styles.cards}>
              {menuCards[category.cardIndex].sections.map((section) => <ServiceCard key={section.title} section={section} locale={locale} />)}
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
