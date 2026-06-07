# Progress Tracker — Reservation Admin SPA

**Last updated:** 2026-06-07  
**Current phase:** Phase 7 — Complete  
**Overall:** 100%

## Phase checklist

### Phase 1 — Foundation
- [x] Documentation scaffold (architecture, reservation-app, database, progress)
- [x] Postgres in Docker Compose
- [x] Drizzle ORM + initial schema + migrations
- [x] Host-based proxy routing
- [x] shadcn admin shell (sidebar, layout)

### Phase 2 — Auth
- [x] Staff login / logout
- [x] Session cookie + DB sessions
- [x] Protected admin layout

### Phase 3 — Services + Customers
- [x] Services CRUD
- [x] Customers CRUD

### Phase 4 — Reservations
- [x] Reservation list, create, edit, cancel
- [x] Status workflow + conflict validation

### Phase 5 — Calendar
- [x] Week/day calendar view

### Phase 6 — Availability
- [x] Weekly hours editor
- [x] Validation in reservation service

### Phase 7 — Notifications + Deploy docs
- [x] Resend notifications on reservation events
- [x] notification_logs table
- [x] Vercel Postgres + app subdomain runbook

## Decision log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-07 | Staff-only admin (no public booking v1) | Faster MVP; landing email form stays |
| 2026-06-07 | Single repo, subdomain split | Docker-first; one Vercel deploy |
| 2026-06-07 | Drizzle ORM | Lightweight, type-safe, Vercel Postgres fit |
| 2026-06-07 | Custom sessions (not NextAuth) | Minimal deps for single staff role |
| 2026-06-07 | English-only admin v1 | Admin-focused; marketing stays bilingual |
| 2026-06-07 | shadcn scoped under `.admin-app` | Avoid marketing theme collision |

## Deployment checklist

- [ ] Vercel Postgres storage created and linked
- [ ] `DATABASE_URL` + `DATABASE_URL_UNPOOLED` + `SESSION_SECRET` set in Vercel Production
- [ ] Deploy triggered (migrations run automatically via vercel.json)
- [ ] Admin user seeded manually (`make seed-admin`); default password changed
- [ ] `app.nafas.beauty` DNS CNAME → `cname.vercel-dns.com`
- [ ] `APP_URL` + `MARKETING_URL` env vars set
- [ ] `ADMIN_NOTIFICATION_EMAIL` + `RESEND_API_KEY` set
- [ ] Smoke test: login, create reservation, calendar, notification

## Blockers / open questions

_None._
