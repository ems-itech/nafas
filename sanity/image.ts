import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

if (!sanityClient) {
  throw new Error("Sanity client is not configured");
}

const builder = imageUrlBuilder(sanityClient);

type Source = Parameters<typeof builder.image>[0];

export const urlFor = (source: Source) => builder.image(source);