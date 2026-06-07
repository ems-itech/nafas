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

## Host routing

Two separate apps, same repo. **No cross-host redirects.** Wrong host → 404.

| Host | App | Blocked |
|------|-----|---------|
| `nafas.beauty`, `localhost:3000` | marketing (`/en`, `/ar`, `/studio`) | admin paths |
| `app.nafas.beauty`, `app.localhost:3000`, `www.app.*` | admin (`/login`, `/dashboard`, …) | `/en`, `/ar`, `/studio` |
| Preview `*.vercel.app` | both (testing only) | — |

Enforced in `proxy.ts` + layout guards (`canServeMarketing` / `canServeAdmin` in `lib/config/hosts.ts`).

## Token discipline
- Read only files you will change or that define patterns you must match.
- No drive-by refactors on marketing code.
- Minimal diffs; reuse existing utils (`cn`, Zod, Resend patterns).
- Do not edit the plan file in `.cursor/plans/`.
- Docs: update `docs/progress.md` when phases complete.

## Env
Copy `.env.example` → `.env.local`. Required for admin: `DATABASE_URL`, `SESSION_SECRET`.
