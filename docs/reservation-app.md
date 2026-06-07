# Reservation Admin App

Staff-only reservation management at **app.nafas.beauty** (local: **http://app.localhost:3000**).

## Features (v1)

- Staff login (email + password)
- Dashboard overview
- **Customers** — name, phone, email, notes
- **Services** — name, duration, optional price
- **Reservations** — CRUD, status workflow, conflict checks
- **Calendar** — week/day view of reservations
- **Availability** — weekly business hours
- **Notifications** — email to staff on reservation events

## Routes

| Path | Description |
|------|-------------|
| `/login` | Staff sign-in |
| `/dashboard` | Overview stats |
| `/customers` | Customer list and management |
| `/services` | Service catalog |
| `/reservations` | Reservation list |
| `/reservations/new` | Create reservation |
| `/reservations/[id]` | Edit reservation |
| `/calendar` | Calendar view |
| `/availability` | Weekly hours editor |

## Auth

- Credentials stored in `staff_users` (bcrypt password hash)
- Session cookie (`nafas_session`) — HttpOnly, Secure in production
- Unauthenticated requests to admin pages redirect to `/login`

### Default seed admin (local only)

After `make seed-admin`:

- Email: `admin@nafas.beauty`
- Password: `changeme123`

**Change this password immediately** after first login in any shared environment.

## Local setup

1. Start Postgres and web: `make up`
2. Run migrations: `make migrate`
3. Seed admin + sample data: `make seed-admin`
4. Open http://app.localhost:3000/login

Ensure `/etc/hosts` contains:

```
127.0.0.1 app.localhost
```

## Status workflow

```
pending → confirmed → completed
                   ↘ cancelled
```

Creating or updating a reservation validates:

- Service exists and is active
- Time slot falls within weekly availability
- No overlapping reservations for the same time window

## API

Admin JSON API lives under `/api/admin/*`. Prefer Server Actions in pages for mutations; API routes support programmatic access and form posts where needed.
