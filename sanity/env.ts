export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

export function sanityConfigured() {
  return Boolean(projectId && dataset);
}

