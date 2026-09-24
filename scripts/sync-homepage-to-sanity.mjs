import { createReadStream, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@sanity/client";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const homepage = JSON.parse(readFileSync(join(root, "sanity/seed/homepage.ndjson"), "utf8"));
const imagePaths = [
  "hero.jpg",
  "service-head-spa.jpg", "service-lymphatic.jpg", "service-hydrafacial.jpg",
  "service-dermapen.jpg", "service-lash.jpg",
  "gallery-1.png", "gallery-2.png", "gallery-3.png", "gallery-4.png",
  "package.jpg",
];

if (!process.argv.includes("--apply")) {
  console.log(`Dry run: replace ${homepage._id}, upload ${imagePaths.length} images. Pass --apply to publish.`);
  process.exit(0);
}

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset, SANITY_AUTH_TOKEN: token } = process.env;
if (!projectId || !dataset || !token) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_AUTH_TOKEN are required");
}

const client = createClient({ projectId, dataset, token, apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01", useCdn: false });
const existingHomepage = await client.getDocument(homepage._id);
const existingAboutImage = existingHomepage?.sections?.find((section) => section._type === "aboutSection")?.image;
const assets = new Map();
for (const filename of imagePaths) {
  const asset = await client.assets.upload("image", createReadStream(join(root, "public/images/figma-nafas", filename)), { filename });
  assets.set(filename, asset._id);
  console.log(`Uploaded ${filename}`);
}

function image(filename, key, alt) {
  return { _type: "image", _key: key, asset: { _type: "reference", _ref: assets.get(filename) }, alt: { en: alt } };
}

for (const section of homepage.sections) {
  switch (section._type) {
    case "heroSection":
      section.backgroundImage = image("hero.jpg", "hero-image", "Woman enjoying a relaxing spa treatment");
      break;
    case "aboutSection":
      if (existingAboutImage) section.image = existingAboutImage;
      delete section.images;
      break;
    case "servicesSection": {
      const files = ["service-head-spa.jpg", "service-lymphatic.jpg", "service-hydrafacial.jpg", "service-dermapen.jpg", "service-lash.jpg"];
      section.services.forEach((service, index) => { service.image = image(files[index], `service-image-${index}`, service.name.en); });
      break;
    }
    case "gallerySection":
      section.images = [
        image("gallery-1.png", "gallery-image-1", "Terracotta spa arches"),
        image("gallery-2.png", "gallery-image-2", "Warm spa interior"),
        image("gallery-3.png", "gallery-image-3", "Spa treatment room"),
        image("gallery-4.png", "gallery-image-4", "Head spa treatment"),
      ];
      break;
    case "packagesSection":
      section.packages.forEach((item, index) => { item.image = image("package.jpg", `package-image-${index}`, item.name.en); });
      break;
  }
}

await client.createOrReplace(homepage);
console.log(`Published ${homepage._id} to ${projectId}/${dataset}`);
