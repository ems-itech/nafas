import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";

let builder: ReturnType<typeof createImageUrlBuilder> | null = null;

function getBuilder() {
  if (!sanityClient) return null;
  if (!builder) builder = createImageUrlBuilder(sanityClient);
  return builder;
}

export function urlForImage(source?: unknown) {
  const b = getBuilder();
  if (!b || !source) return null;
  return b.image(source);
}

