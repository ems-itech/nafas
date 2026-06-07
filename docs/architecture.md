# Architecture — Nafas Web + Reservation Admin

## Overview

Single Next.js 16 application serving two products on different hostnames:

| Host | Purpose |
|------|---------|
| `nafas.beauty` (and `www`) | Bilingual marketing site — Sanity CMS, warm theme |
| `app.nafas.beauty` | Staff reservation admin — PostgreSQL, shadcn UI |

Local development:

| Host | Purpose |
|------|---------|
| `localhost:3000` | Marketing |
| `app.localhost:3000` | Admin (add `127.0.0.1 app.localhost` to `/etc/hosts`) |

## Route groups

```
app/
  [locale]/           # Marketing (unchanged)
  (admin)/            # Staff app (English-only)
  api/
    appointment/      # Marketing email form
    admin/            # Admin API (auth, CRUD)
proxy.ts              # Host-based routing (Next 16)
```

## Layered backend (SOLID)

```
lib/
  domain/             # Pure types and enums
  db/schema/          # Drizzle table definitions
  repositories/       # Data access (interfaces + Drizzle impl)
  services/           # Business logic
  auth/               # Sessions, password hashing, guards
  validators/         # Zod schemas at boundaries
```

**Flow:** Route handler / Server Action → Service → Repository → PostgreSQL

Services depend on repository interfaces, not Drizzle directly. Route handlers stay thin.

## Data stores

| Store | Used by | Content |
|-------|---------|---------|
| Sanity CMS | Marketing | Homepage sections, site settings |
| PostgreSQL | Admin app | Staff, customers, services, reservations, availability |
| Resend | Both | Marketing appointment emails; admin reservation notifications |

## Environment variables

See [database.md](./database.md) and [vercel-production.md](./vercel-production.md).

Required for admin:

- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — 32+ byte secret for session signing
- `APP_URL` — Admin base URL (e.g. `https://app.nafas.beauty`)
- `MARKETING_URL` — Marketing base URL (e.g. `https://nafas.beauty`)
- `RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL` — Reservation notifications

## UI isolation

Marketing uses custom feminine theme in `app/globals.css`. Admin uses scoped shadcn tokens in `app/(admin)/admin.css` under `.admin-app` to avoid style collisions.

## Deployment

One Vercel project, two domains. Postgres via Vercel Postgres (Neon). Migrations run with `make migrate` (local) or documented production runbook.
