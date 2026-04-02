## Nafas Beauty Lounge — Web

Next.js (App Router) marketing site with bilingual routing (`/en`, `/ar`) and a Docker-first development workflow.

## Development (Docker-only)

### Prerequisites
- Docker Desktop (or Docker Engine) with `docker compose`
- (Optional) `make` installed (macOS: Xcode Command Line Tools)

### Quickstart
Run the dev server:

```bash
make up
```

Then open `http://localhost:3000` (it redirects to `/en`).

### Common commands
- **Start**: `make up`
- **Stop**: `make down`
- **Logs**: `make logs`
- **Shell**: `make sh`
- **Lint**: `make lint`

### “Fresh install” (when deps or caching get weird)
This wipes Docker volumes used for `node_modules` and `.next` caching, then rebuilds.

```bash
make nuke
```

## Development without Make
Everything in the `Makefile` is just Docker Compose.

```bash
docker compose up --build
```

## Notes for new engineers
- **No local Node required**: dependencies are installed inside the container.
- **Hot reload**: source code is bind-mounted into the container; edits on the host refresh the app.
- **Locale routing**:
  - `/en` = English (LTR)
  - `/ar` = Arabic (RTL)
- **Static assets**: put images in `public/` (e.g. `public/images/...`).

## CMS (Sanity)
- Embedded Studio: `http://localhost:3000/studio`
- Setup guide: see `docs/sanity.md`
- Production deploy + domain: see `docs/vercel-production.md`

## Troubleshooting
### `npm ci` fails during Docker build
The lock file is out of sync with `package.json`. Update it (still Docker-only):

```bash
docker run --rm -v "$PWD":/app -w /app node:20-alpine sh -lc "npm install"
```

Then rebuild:

```bash
make rebuild
```

## Sanity (CMS) setup
This repo is wired to read content from Sanity when env vars are present.

Create `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="..."
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-03-01"
```
