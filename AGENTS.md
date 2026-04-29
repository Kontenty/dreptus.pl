# Agent Notes

## Fast facts
- Single-package Next.js app (App Router) using `pnpm` (`pnpm-lock.yaml` present).
- Runtime stack includes Next 16, React 19, Prisma + MySQL, Clerk auth, HeroUI v3, Tailwind v4, Biome.
- There is no test script in `package.json`; do not assume Jest/Vitest/Playwright is wired.

## Commands that matter
- Install: `pnpm install` (runs `prisma generate` and `lefthook install` via `postinstall`).
- Dev: `pnpm dev` (uses Turbopack).
- Lint: `pnpm lint` (`biome check`).
- Format: `pnpm format`.
- Typecheck: `pnpm typecheck`.
- Build: `pnpm build` (runs `prebuild` first, which executes `scripts/test-db-connection.mjs`).

## Build/CI gotchas
- `pnpm build` requires a live DB connection and valid `DATABASE_CON_URL` because prebuild runs the DB probe script.
- CI installs with `pnpm install --ignore-scripts`, then explicitly runs `pnpm prisma generate && pnpm build`; mirror this if you skip lifecycle scripts.
- CI validation is lint + build (not tests).

## Repo workflow quirks
- Pre-commit hook (`lefthook`) runs `biome check --write` on staged JS/TS/JSON files and re-stages fixes.
- If formatting/lint changes appear after commit attempts, check staged diffs again before finalizing.

## Code map (high value only)
- App entry/layout: `app/layout.tsx` (global providers, Clerk localization, header/footer shell).
- Route protection is in `proxy.ts`; `/admin(.*)` is protected via Clerk middleware.
- Main data access is raw SQL + Prisma in `lib/db.ts`; cached wrappers for trip data are in `lib/db-cached.ts`.
- Prisma schema is large and includes WordPress tables; primary app entities are `TripParticipant` and `Participant` in `prisma/schema.prisma`.
- On-demand cache invalidation endpoint: `app/api/revalidate/route.ts` (expects `secret` query param matching `REVALIDATE_TOKEN`).

## Env assumptions you will hit quickly
- Required mail envs are validated at runtime in `lib/config.ts`: `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_TO`, `MAIL_FROM`.
- Prisma datasource envs: `DATABASE_CON_URL` and `DATABASE_CON_URL_SHADOW`.

## Practical verification order
- Preferred local check for most edits: `pnpm lint && pnpm typecheck`.
- Run `pnpm build` only when DB/env is available (it will fail fast otherwise by design).
