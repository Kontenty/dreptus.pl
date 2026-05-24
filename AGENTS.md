# Agent Notes

## Commands
- Use `pnpm`; this is a single-package Next.js 16 app, not a monorepo.
- `pnpm install` runs `prisma generate` and `lefthook install` via `postinstall`.
- If dependencies were installed with `--ignore-scripts`, run `pnpm prisma generate` before typecheck/build; Prisma client output is `lib/generated/prisma`.
- Local verification that matches CI's first stage: `pnpm lint && pnpm typecheck`.
- There is no `test` script; do not assume a test runner exists.
- `pnpm build` is meaningful only with real env wired: CI provides mail envs plus `DATABASE_CON_URL`/`DATABASE_CON_URL_SHADOW`.

## Workflow quirks
- Pre-commit runs `biome check --write` on staged `js/ts/json` files and re-stages fixes. Recheck diffs after any commit attempt.
- `opencode.json` enables the local `@heroui/react-mcp` server; use it instead of guessing HeroUI v3 APIs.

## Architecture
- App shell lives in `app/layout.tsx`; it wraps Clerk (`plPL`), the shared header/footer, AOS, and a minimal HeroUI `Toast.Provider` in `components/Providers.tsx`.
- `proxy.ts` is the auth gate; only `/admin(.*)` is protected by Clerk middleware.
- Data access is centralized in `lib/db.ts` and mixes Prisma with raw SQL against WordPress tables. `prisma/schema.prisma` is mostly a WP schema plus app tables `Participant` and `TripParticipant`.
- Cached trip list helpers are in `lib/db-cached.ts` using `unstable_cache` with tag `trips`; `/trips` uses those wrappers, while pages like `/`, `/form`, and `/admin` call `lib/db.ts` directly.
- Prisma does not use the default datasource URL flow at runtime: `lib/prisma.ts` builds a `PrismaMariaDb` adapter from `DATABASE_CON_URL`.
- The report form submits through the server action `lib/actions/sendReport.ts`, which loads and validates `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_TO`, and `MAIL_FROM` via `lib/config.ts`.
- `app/api/revalidate/route.ts` is the on-demand cache invalidation endpoint. It requires `?secret=` matching `REVALIDATE_TOKEN`; on `dreptus.vercel.app` preview hosts it forwards the revalidation request to production instead of revalidating locally.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **dreptus.pl** (732 symbols, 1027 relationships, 16 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/dreptus.pl/context` | Codebase overview, check index freshness |
| `gitnexus://repo/dreptus.pl/clusters` | All functional areas |
| `gitnexus://repo/dreptus.pl/processes` | All execution flows |
| `gitnexus://repo/dreptus.pl/process/{name}` | Step-by-step execution trace |

<!-- gitnexus:end -->
