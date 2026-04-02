import { sanityClient } from "./client";

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
) {
  if (!sanityClient) return null;
  return params
    ? sanityClient.fetch<T>(query, params as Record<string, unknown>)
    : sanityClient.fetch<T>(query);
}

