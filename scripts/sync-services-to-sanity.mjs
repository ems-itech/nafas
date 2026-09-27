import { createClient } from "@sanity/client";
import {
  defaultServiceCategories,
  getMenuCards,
} from "../lib/data/services-menu.ts";

const enCards = getMenuCards("en");
const arCards = getMenuCards("ar");

function localized(en, ar) {
  return { en, ar };
}

function key(prefix, ...parts) {
  return `${prefix}-${parts.join("-")}`;
}

function sectionDisplay(section) {
  if (section.priceColumns) return "matrix";
  if (section.priceLabels) return "twoColumn";
  if (section.rows.some((row) => /sessions|single session|جلس/i.test(row.name))) return "packages";
  return "standard";
}

const categories = defaultServiceCategories.map(({ id, mark, cardIndex }, categoryIndex) => {
  const enCard = enCards[cardIndex];
  const arCard = arCards[cardIndex];

  return {
    _key: key("category", categoryIndex),
    _type: "serviceCategory",
    anchorId: id,
    mark,
    eyebrow: localized(enCard.eyebrow, arCard.eyebrow),
    title: localized(enCard.title, arCard.title),
    sections: enCard.sections.map((enSection, sectionIndex) => {
      const arSection = arCard.sections[sectionIndex];
      const display = sectionDisplay(enSection);

      return {
        _key: key("section", categoryIndex, sectionIndex),
        _type: "serviceMenuSection",
        title: localized(enSection.title, arSection.title),
        ...(enSection.title.match(/(\d+)/)?.[1]
          ? {
              durationBadge: localized(
                `${enSection.title.match(/(\d+)/)[1]} minutes`,
                `${enSection.title.match(/(\d+)/)[1]} دقيقة`,
              ),
            }
          : {}),
        display,
        ...(enSection.priceLabels
          ? {
              priceLabels: {
                primary: localized(enSection.priceLabels[0], arSection.priceLabels[0]),
                secondary: localized(enSection.priceLabels[1], arSection.priceLabels[1]),
              },
            }
          : {}),
        ...(enSection.priceColumns
          ? {
              priceColumns: enSection.priceColumns.map((column, columnIndex) => ({
                _key: key("column", categoryIndex, sectionIndex, columnIndex),
                _type: "localizedString",
                ...localized(column, arSection.priceColumns[columnIndex]),
              })),
            }
          : {}),
        rows: enSection.rows.map((enRow, rowIndex) => {
          const arRow = arSection.rows[rowIndex];
          return {
            _key: key("row", categoryIndex, sectionIndex, rowIndex),
            _type: "servicePriceRow",
            name: localized(enRow.name, arRow.name),
            ...(enRow.price == null ? {} : { price: enRow.price }),
            ...(enRow.refill == null ? {} : { refill: enRow.refill }),
            ...(enRow.prices
              ? {
                  matrixPrices: enRow.prices.map((price, priceIndex) => ({
                    _key: key("matrix-price", categoryIndex, sectionIndex, rowIndex, priceIndex),
                    _type: "matrixPrice",
                    ...(price == null ? {} : { price }),
                  })),
                }
              : {}),
          };
        }),
      };
    }),
  };
});

const servicesPage = {
  _id: "servicesPage",
  _type: "servicesPage",
  title: "Services Page",
  introTitle: localized("Our Services", "خدماتنا"),
  introDescription: localized(
    "Every treatment is clinical in its precision and quiet in its delivery. All prices in Jordanian Dinar.",
    "نقدّم كل علاج بدقة واحترافية في أجواء هادئة. جميع الأسعار بالدينار الأردني.",
  ),
  labels: {
    service: localized("Service", "الخدمة"),
    price: localized("Price", "السعر"),
    refill: localized("Refill", "التعبئة"),
    currency: localized("JOD", "د.أ"),
  },
  categories,
  seo: {
    en: {
      title: "Service Menu | Nafas Beauty Lounge",
      description: "Explore the Nafas Beauty Lounge services and price menu.",
    },
    ar: {
      title: "قائمة الخدمات | نفَس بيوتي لاونج",
      description: "اكتشفي خدمات نفَس بيوتي لاونج وقائمة الأسعار.",
    },
  },
};

if (!process.argv.includes("--apply")) {
  console.log(
    `Dry run: replace ${servicesPage._id} with ${categories.length} categories and ${categories.reduce((total, category) => total + category.sections.length, 0)} service cards. Pass --apply to publish.`,
  );
  process.exit(0);
}

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  NEXT_PUBLIC_SANITY_API_VERSION: apiVersion = "2026-03-01",
  SANITY_AUTH_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_AUTH_TOKEN are required",
  );
}

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false });
await client.createOrReplace(servicesPage);
console.log(`Published ${servicesPage._id} to ${projectId}/${dataset}`);
