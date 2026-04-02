# Production Deployment (Vercel) + GoDaddy Domain

This guide shows how to deploy this repo to Vercel and connect a domain purchased from GoDaddy.

## What you need (before you start)

- A GitHub/GitLab/Bitbucket repo for this project (Vercel deploys from Git).
- A Vercel account with access to create a Project.
- Access to your GoDaddy DNS management (Domain Control Center).
- The **production environment variables** for this app (do **not** commit them).

## Quick glossary (for juniors)

- **Apex domain**: the root domain, like `example.com` (no subdomain).
- **Subdomain**: like `www.example.com`.
- **A record**: points a hostname to an IPv4 address.
- **CNAME**: points a hostname to another hostname.
- **DNS propagation**: DNS changes can take time (often minutes, sometimes up to 24–48 hours).

## Part 1 — Deploy to Vercel (recommended: Git integration)

### 1) Push the repo to your Git provider

Vercel’s easiest production flow is: connect the repo → Vercel builds on every push → `main` (or your chosen prod branch) becomes production.

### 2) Import the project in Vercel

- In Vercel Dashboard, choose **Add New… → Project**
- Select your Git provider and choose this repository
- Vercel should detect **Next.js** automatically

### 3) Configure environment variables (Production)

In Vercel, go to **Project → Settings → Environment Variables** and add your values.

This repo’s README already mentions Sanity variables. Typical examples:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Notes:
- Add env vars at least for **Production**. If you want preview deployments to work, also add them for **Preview**.
- Anything prefixed with `NEXT_PUBLIC_` is exposed to the browser; do not store secrets in those.

### 4) Build settings (usually leave defaults)

Vercel normally auto-configures:
- **Install Command** from your lockfile (e.g. `package-lock.json` → `npm install`)
- **Build Command** for Next.js (e.g. `next build`)

Only override build settings if your deployment fails or you have a monorepo/root directory setup.

### 5) Deploy

Click **Deploy**.

After it finishes:
- You’ll get a `*.vercel.app` URL for the production deployment
- Every PR (or branch, depending on your settings) gets a Preview Deployment URL

## Part 2 — Connect your GoDaddy domain to Vercel

There are two common approaches:

- **Option A (recommended)**: keep DNS on GoDaddy, just point records to Vercel
- **Option B**: move DNS to Vercel by changing nameservers (not always desirable if you have email or other services configured)

This guide uses **Option A**.

### 1) Add the domain in Vercel

In Vercel Dashboard:
- **Project → Settings → Domains → Add**
- Add your apex domain, e.g. `example.com`
- (Optional but recommended) also add `www.example.com`

Vercel will show you the required DNS records and whether verification has completed.

### 2) Update DNS in GoDaddy (Option A)

In GoDaddy:
- Open **My Products → Domains**
- Click your domain → **DNS** → **Manage DNS**

Then set these records (typical Vercel configuration):

#### Apex domain (`example.com`)

- **Type**: `A`
- **Name/Host**: `@`
- **Value**: `76.76.21.21`
- **TTL**: default is fine (or 600s / 1 hour while migrating)

Important:
- Keep **only one** apex `A` record pointing to `76.76.21.21` to avoid conflicts.
- Remove other conflicting `A` records for `@` (but do not delete records unrelated to the website, like email MX records).

#### `www` subdomain (`www.example.com`)

- **Type**: `CNAME`
- **Name/Host**: `www`
- **Value/Points to**: `cname.vercel-dns.com`
- **TTL**: default

If you have other subdomains, Vercel will tell you which record to add.

### 3) Wait for verification + propagation

Back in Vercel, the domain will move from “Invalid Configuration” to verified once DNS propagates.

DNS propagation can take **up to 24–48 hours** in some cases.

## Part 3 — Production checks (do this before announcing “live”)

### 1) Confirm the correct deployment is “Production”

In Vercel:
- **Deployments** tab: confirm the latest deployment is marked **Production** (usually the `main` branch).

### 2) Check both domains

- `https://example.com`
- `https://www.example.com`

Decide what should be canonical:
- If you want apex as canonical, redirect `www → apex` (or vice versa).
Vercel supports configuring redirects, but the simplest approach is to set the desired domain as the primary domain in Vercel’s Domains settings.

### 3) Check the Sanity content renders

If pages are empty or you see runtime errors:
- Re-check environment variables in Vercel
- Ensure they’re added to the correct environment(s): Production/Preview

### 4) Check locale routing

This app uses locale routing (`/en`, `/ar`). Verify:
- `https://example.com/en`
- `https://example.com/ar`

## Troubleshooting (common issues)

### Domain shows “Invalid Configuration” in Vercel

- Confirm GoDaddy record values exactly match Vercel’s instructions.
- Remove conflicting records for the same host (`@` or `www`).
- Wait for propagation.

### HTTPS not working yet

Vercel issues certificates after DNS verification. It can take a short time after records are correct.

### Preview deployments fail but production works

You likely added env vars only for Production.
- Add required env vars to **Preview** too (Project → Settings → Environment Variables).

### Local Docker build fails with `NODE_ENV` warning or weird build errors

This repo’s `docker-compose.yml` sets `NODE_ENV=development` for the dev container. When you run a production build inside Docker, override it:

```bash
make build
# or:
docker compose run --rm -e NODE_ENV=production web npm run build
```

## References (latest docs used)

- Vercel: “Working with DNS” — `https://vercel.com/docs/projects/domains/working-with-dns`
- Vercel: “Vercel for GitHub” — `https://vercel.com/docs/concepts/deployments/git/vercel-for-github`
- Vercel: “Build Settings” — `https://vercel.com/docs/deployments/deploy-button/build-settings`

