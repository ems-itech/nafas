# Database — PostgreSQL

## Local (Docker)

Postgres runs as a `postgres` service in `docker-compose.yml`.

Default connection (inside web container):

```
DATABASE_URL=postgresql://nafas:nafas@postgres:5432/nafas
```

From the host machine (e.g. GUI client):

```
postgresql://nafas:nafas@localhost:5432/nafas
```

### Commands

```bash
make db-up      # Start postgres only
make migrate    # Apply Drizzle migrations
make seed-admin # Seed admin user + sample services
```

## Production (Vercel Postgres)

1. In Vercel Dashboard → Project → Storage → Create **Postgres**
2. Link storage to the project
3. Vercel sets `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, etc.
4. Map env vars in project settings:
   - `DATABASE_URL` = pooled URL (`POSTGRES_URL`)
   - `DATABASE_URL_UNPOOLED` = direct URL for migrations (`POSTGRES_URL_NON_POOLING`)

### Production migrations

Vercel runs migrations automatically on each deploy (`vercel.json` → `db:migrate` → `build`). Uses `DATABASE_URL_UNPOOLED` when available.

Manual override:

```bash
DATABASE_URL="$DATABASE_URL_UNPOOLED" make migrate
```

## Schema

| Table | Purpose |
|-------|---------|
| `staff_users` | Admin accounts |
| `sessions` | Server-side sessions |
| `customers` | Client records |
| `services` | Bookable services |
| `reservations` | Appointments |
| `availability_rules` | Weekly open hours (day_of_week 0–6) |
| `availability_exceptions` | Date-specific overrides |
| `notification_logs` | Email notification audit trail |

Schema source: `lib/db/schema/*.ts`  
Migrations: `lib/db/migrations/`

## ORM

[Drizzle ORM](https://orm.drizzle.team/) with `drizzle-kit` for migrations.

Config: `drizzle.config.ts`
