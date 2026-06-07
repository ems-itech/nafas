# Agent rules (read first)

## Next.js
NOT standard Next.js. Breaking changes vs training data. Before coding, read `node_modules/next/dist/docs/` for the API you touch. Obey deprecation notices.

## Dev workflow
Docker-only. No host Node/npm.
- `make up` — dev server
- `make sh` — shell in web container
- `docker compose run --rm web npm …` — one-off commands
- `make lint` / `make build` / `make migrate` / `make seed-admin`

## Repo layout
- **Marketing** — `app/[locale]/*`, Sanity CMS, warm theme. Do not add shadcn here.
- **Admin** — `app/(admin)/*`, Postgres, shadcn under `components/ui/shadcn/`, scoped CSS `app/(admin)/admin.css`.
- **Layers** — routes/actions → `lib/services/*` → `lib/repositories/*` → Drizzle. Keep handlers thin.

## Hosts
- Marketing: `localhost:3000` / `nafas.beauty`
- Admin: `app.localhost:3000` / `app.nafas.beauty`
- Host routing: `proxy.ts` (Next 16 — not `middleware.ts`)

## Token discipline
- Read only files you will change or that define patterns you must match.
- No drive-by refactors on marketing code.
- Minimal diffs; reuse existing utils (`cn`, Zod, Resend patterns).
- Do not edit the plan file in `.cursor/plans/`.
- Docs: update `docs/progress.md` when phases complete.

## Env
Copy `.env.example` → `.env.local`. Required for admin: `DATABASE_URL`, `SESSION_SECRET`, `APP_URL`, `MARKETING_URL`.
