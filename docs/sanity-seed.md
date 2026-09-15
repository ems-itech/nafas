# Seeding homepage content

This repo uses an embedded Sanity Studio at `/studio`.

## Import seed content (NDJSON)

1) Ensure Sanity env vars are set (see `docs/sanity.md`).

2) Add a Sanity token to `.env.local`:

- `SANITY_AUTH_TOKEN` (API token with dataset write access)

3) Install deps (once, inside Docker):

```bash
make deps
```

4) Import the seed (inside Docker). Recommended:

```bash
make sanity-seed-homepage-replace
make sanity-seed-site-settings-replace
```

5) Open Studio at `http://localhost:3000/studio` and publish the `Homepage` and `Site Settings` documents.

## Images

The seed now includes all current homepage text, service names, prices, and package cards. It does not contain Sanity image assets. To make the page images editable, upload them in Studio and set:
- Hero → `backgroundImage`
- About → `image` (one image displayed in the About section; no local fallback)
- Services → `services[].image`
- Gallery → `images[]` (four images)
- Packages → `packages[].image`

Most sections keep bundled images when their Sanity image fields are empty. The About section shows no image until one is uploaded and published in Sanity. Importing with `--replace` overwrites the published homepage and site settings documents, so edit or back up existing content before using that command.

To publish the current homepage seed and upload all its images together, set `SANITY_AUTH_TOKEN` in `.env.local` and run `node --env-file=.env.local scripts/sync-homepage-to-sanity.mjs` to preview the target. Add `--apply` to upload and replace the Homepage document after reviewing the seed. Site Settings stays as it is.

For SEO, you can optionally set:
- Site Settings → Default SEO → `ogImage` (per language)
