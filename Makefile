.PHONY: help up down restart rebuild logs sh ps clean nuke lint build deps sanity-seed-homepage sanity-seed-homepage-replace sanity-seed-site-settings sanity-seed-site-settings-replace

help:
	@echo ""
	@echo "Nafas Web (Docker-first) commands"
	@echo ""
	@echo "  make up        Start dev server (http://localhost:3000)"
	@echo "  make down      Stop containers"
	@echo "  make restart   Restart web container"
	@echo "  make rebuild   Rebuild image and start"
	@echo "  make logs      Tail dev logs"
	@echo "  make sh        Shell into the web container"
	@echo "  make ps        Show running containers"
	@echo "  make deps      npm install (in container)"
	@echo "  make lint      Run eslint (in container)"
	@echo "  make build     Run production build (in container)"
	@echo "  make sanity-seed-homepage         Import Sanity seed (no replace)"
	@echo "  make sanity-seed-homepage-replace Import Sanity seed (danger: --replace)"
	@echo "  make sanity-seed-site-settings         Import Site Settings seed (no replace)"
	@echo "  make sanity-seed-site-settings-replace Import Site Settings seed (danger: --replace)"
	@echo "  make clean     Remove .next + local node_modules (host)"
	@echo "  make nuke      Stop + remove volumes (fresh install)"
	@echo ""

up:
	docker compose up --build

down:
	docker compose down

restart:
	docker compose restart web

rebuild:
	docker compose down
	docker compose up --build -d
	docker compose logs --no-color --tail=50 web

logs:
	docker compose logs --no-color -f web

sh:
	docker compose exec web sh

ps:
	docker compose ps

deps:
	docker compose run --rm web sh -lc 'rm -rf node_modules && npm install'

lint:
	docker compose run --rm web npm run lint

build:
	docker compose run --rm -e NODE_ENV=production web npm run build

sanity-seed-homepage:
	docker compose run --rm web sh -lc 'npx sanity dataset import sanity/seed/homepage.ndjson --dataset "$$NEXT_PUBLIC_SANITY_DATASET" --project-id "$$NEXT_PUBLIC_SANITY_PROJECT_ID" --token "$$SANITY_AUTH_TOKEN"'

sanity-seed-homepage-replace:
	docker compose run --rm web sh -lc 'npx sanity dataset import sanity/seed/homepage.ndjson --dataset "$$NEXT_PUBLIC_SANITY_DATASET" --project-id "$$NEXT_PUBLIC_SANITY_PROJECT_ID" --token "$$SANITY_AUTH_TOKEN" --replace'

sanity-seed-site-settings:
	docker compose run --rm web sh -lc 'npx sanity dataset import sanity/seed/siteSettings.ndjson --dataset "$$NEXT_PUBLIC_SANITY_DATASET" --project-id "$$NEXT_PUBLIC_SANITY_PROJECT_ID" --token "$$SANITY_AUTH_TOKEN"'

sanity-seed-site-settings-replace:
	docker compose run --rm web sh -lc 'npx sanity dataset import sanity/seed/siteSettings.ndjson --dataset "$$NEXT_PUBLIC_SANITY_DATASET" --project-id "$$NEXT_PUBLIC_SANITY_PROJECT_ID" --token "$$SANITY_AUTH_TOKEN" --replace'

clean:
	rm -rf .next node_modules

nuke:
	docker compose down
	docker volume rm nafas_web_next_cache 2>/dev/null || true
	docker compose up --build

