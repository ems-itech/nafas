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

The seed omits images (gallery/background/about) intentionally.
Upload assets in Studio and set:
- Hero → `backgroundImage`
- About → `image`
- Gallery → `images[]`

For SEO, you can optionally set:
- Site Settings → Default SEO → `ogImage` (per language)

