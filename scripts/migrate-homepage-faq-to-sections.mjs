import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");
const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  NEXT_PUBLIC_SANITY_API_VERSION: apiVersion = "2026-03-01",
  SANITY_AUTH_TOKEN: token,
} = process.env;

if (!projectId || !dataset) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET are required");
}

if (apply && !token) {
  throw new Error("SANITY_AUTH_TOKEN is required when using --apply");
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });
const documents = await client.fetch(
  `*[_id in ["homepage", "drafts.homepage"] && defined(faq)]{_id, _rev, faq, sections}`,
);

if (documents.length === 0) {
  console.log("No homepage documents with a legacy FAQ field were found.");
  process.exit(0);
}

for (const document of documents) {
  if (document.sections?.some((section) => section._type === "faqSection")) {
    console.log(`${document._id}: skipped because Sections already contains an FAQ.`);
    continue;
  }

  const sections = [...(document.sections ?? [])];
  const appointmentIndex = sections.findIndex((section) => section._type === "appointmentSection");
  const insertAt = appointmentIndex === -1 ? sections.length : appointmentIndex;
  sections.splice(insertAt, 0, {
    ...document.faq,
    _type: "faqSection",
    _key: document.faq?._key || "homepage-faq",
  });

  if (!apply) {
    console.log(`${document._id}: would move FAQ into Sections at position ${insertAt + 1}.`);
    continue;
  }

  await client
    .patch(document._id)
    .ifRevisionId(document._rev)
    .set({ sections })
    .unset(["faq"])
    .commit();
  console.log(`${document._id}: moved FAQ into Sections.`);
}

if (!apply) {
  console.log("Dry run only. Pass --apply with SANITY_AUTH_TOKEN to write the migration.");
}
