import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

export const sanityClient = sanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

