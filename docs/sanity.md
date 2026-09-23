# Sanity CMS (Embedded Studio) — Nafas Web

This project embeds **Sanity Studio** inside the Next.js app at **`/studio`** and uses Sanity as the source of truth for editable content.

## Local development

### 1) Add environment variables
Create `.env.local` in the repo root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="pjzjdp04"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-03-01"
```

### 2) Start the app

```bash
make up
```

### 3) Open Studio
Visit `http://localhost:3000/studio`.

You should see:
- **Structure** tool (content editor UI)
- **Vision** tool (GROQ query playground)

## Content modeling (current schemas)
Schemas live in `sanity/schemaTypes/`.

### `siteSettings`
Global fields used across the site:
- Site title
- Header (brand, nav, CTA label)
- Footer (tagline, social, copyright)
- Contact (phone, address, hours, map)
- Default SEO per locale (`en` / `ar`)

### `servicesPage`
- Bilingual page heading and introduction
- Bilingual table, currency, and duration labels
- Ordered service categories and stable section links
- Service cards with standard, package, two-column, or matrix pricing
- Services-page SEO per locale (`en` / `ar`)

## Authoring workflow
1) Fill **Site Settings** (singleton `_id = siteSettings`) with header/footer/contact + SEO.
2) Fill **Homepage** (singleton `_id = homepage`) with the sections.
3) Fill **Services Page**, or run the migration command below to copy the current menu into Sanity.
4) Publish changes.

The current homepage design reads every content section from this document: Hero, About, Services (including the ticker), Gallery, Homepage price preview, Packages, and Appointment/contact. Images and text can be edited in Studio. Site Settings controls the logo, navigation, phone, address, hours, and copyright. The `/en/services` and `/ar/services` routes read the Services Page singleton. Fields without published values keep the bundled design defaults.

## Migrate the current service menu

Add `SANITY_AUTH_TOKEN` with dataset write access to `.env.local`, then run:

```bash
npm run sanity:sync-services
```

Docker users can run `make sanity-sync-services`. This creates or replaces the singleton document with the complete current English and Arabic service menu. After that, edit and publish future changes from `/studio`.

The Next.js app reads **published** content by default.

## How the website reads content
Sanity client utilities are in:
- `sanity/env.ts` (env vars)
- `sanity/client.ts` (client creation)
- `sanity/queries.ts` (GROQ queries)
- `sanity/fetch.ts` (fetch helper)

If Sanity env vars are missing, the client is `null` and the app should fall back to static content (useful for onboarding/CI).

## Production (Vercel) setup

### 1) Add env vars in Vercel
In Vercel Project Settings → Environment Variables, add the same keys:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

### 2) Studio in production
The embedded Studio route is `https://<your-domain>/studio`.

**Best practice:** restrict access in production (choose one):
- Vercel protection / password protection
- Reverse-proxy auth
- Sanity Studio login + allowlist (recommended in addition to route protection)

### 3) Caching / freshness
For marketing content, prefer CDN reads (`useCdn: true`) and revalidate when you add structured caching or webhooks.

## Troubleshooting

### Studio shows a blank page or 500
- Ensure `.env.local` has correct Sanity values.
- If dependencies changed, run:

```bash
make nuke
```

### `npm audit` reports vulnerabilities after adding Studio
Some vulnerabilities can come from transitive dependencies in Studio tooling.
This repo uses an `overrides` entry in `package.json` to keep `js-yaml` on a safe version.
