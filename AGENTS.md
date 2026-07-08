# Agent Notes

## Commands
- Use `pnpm`; this is a single-package Next.js 16 app, not a monorepo.
- `pnpm install` runs `prisma generate` and `lefthook install` via `postinstall`.
- If dependencies were installed with `--ignore-scripts`, run `pnpm prisma generate` before typecheck/build; Prisma client output is `lib/generated/prisma`.
- Local verification that matches CI's first stage: `pnpm lint && pnpm typecheck`.
- There is no `test` script; do not assume a test runner exists.
- `pnpm build` is meaningful only with real env wired: CI provides mail envs plus `DATABASE_CON_URL`/`DATABASE_CON_URL_SHADOW`.

## Stack & Versions
| Layer | Package | Version |
|---|---|---|
| Runtime | Node.js | >=22.22.0 |
| Framework | Next.js (app router) | ^16.2.1 |
| React | react / react-dom | 19.2.3 |
| Language | TypeScript | ^5.6.3 |
| UI lib | @heroui/react + @heroui/styles | ^3.0.0 |
| CSS | Tailwind CSS v4 + @tailwindcss/postcss | ^4.1.17 |
| Linter/formatter | Biome | ^2.2.6 |
| ORM | Prisma (MariaDB adapter) | ^7.8.0 |
| Auth | Clerk (@clerk/nextjs) | ^7.0.8 |
| Maps | MapLibre GL | ^5.22.0 |
| Forms | react-hook-form + @hookform/resolvers + Valibot | ^7.65.0 / ^1.1.0 |
| Carousel | react-slick + slick-carousel | ^0.30.2 |
| Data fetching | SWR | ^2.2.0 |
| Email | Nodemailer | ^7.0.9 |
| Animations | AOS (Animate On Scroll) | ^3.0.0-beta.6 |
| Monitoring | next-axiom + @vercel/speed-insights | ^1.5.1 / ^2.0.0 |
| Images | next/image + sharp + plaiceholder | ^0.33.5 / ^2.5.0 |
| Git hooks | Lefthook | ^2.1.6 |
| Misc | class-variance-authority, classnames, @heroicons/react, @turf/distance | - |

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

## Reusable Components

### Layout & UI Primitives
- **`components/ui/Main.tsx`** — Centered page container with configurable spacing (`L` / `S`). Use as the top-level layout wrapper inside pages.
- **`components/ui/DatePicker.tsx`** — HeroUI `DatePicker` wrapper that normalizes `DateValue | Date | string | null` inputs. Works with react-hook-form via `RHFInput` when `type="date"`.

### Forms
- **`components/RHFInput.tsx`** — Generic react-hook-form controlled input that renders either a HeroUI `Input` or `DatePicker` based on `type`. Accepts `RHFField` config (`name`, `label`, `type?`, `required?`).
- **`components/report/TripReportForm.tsx`** — Full trip report form using Valibot schema validation (`reportSchema`), react-hook-form, and the `sendReport` server action. Reference for how forms, validation, and server actions are wired together.

### Data Display
- **`components/PaginatedTable.tsx`** — Generic paginated table built on HeroUI `Table` + `Pagination`. Accepts typed columns, row renderer, optional `onRowClick`, and loading/empty states. Reuse for any tabular admin data.
- **`components/badge/BadgeTabs.tsx`** — Tabbed view of badge scorers using HeroUI `Tabs` + `Table`. Also shows the pattern for mapping Elementor page content into React.
- **`components/TripListFilter.tsx`** — Responsive filter drawer (mobile: HeroUI `Drawer`, desktop: sidebar). Categories are hardcoded; locations come from props.

### Maps
- **`components/map/MapView.tsx`** — MapLibre GL map showing trip routes. Supports `mode="multiple"` (trip list) or `mode="single"` (trip detail) with `onTripClick` callback. Uses custom layers, popups with portal rendering, and Polish-language labels (`components/map/config/mapConfig.ts`).
- **`components/wrappers/TripsMapWrapper.tsx`** — Dynamic-import wrapper for `MapView` (SSR disabled). Resolves a `Promise<TripFormMap[]>` via `React.use()`. Use this pattern to lazy-load heavy client components.

### Carousels
- **`components/carousel/DreptusCarousel.tsx`** — Static hero carousel using `react-slick`. Hardcoded images from `public/image/carousel/`. Accepts optional `width` prop.
- **`components/carousel/HeroCarousel.tsx`** — Alternative carousel component.
- **`components/SlickArrow.tsx`** — Custom arrow renderer for react-slick.

### Skeletons & Error Boundaries
- **`components/skeletons/`** — `TripsMapSkeleton`, `TripsListSkeleton`, `TripsFilterSkeleton`. Used as loading fallbacks for dynamic imports.
- **`components/error-boundaries/TripsErrorBoundary.tsx`** — Class-based error boundary accepting a `section` prop (`"map"` | `"filter"` | `"list"`). Renders a fallback per section. Use as the pattern for wrapping error-prone sections.

### Wrappers (Promise→Client)
- **`components/wrappers/TripsListWrapper.tsx`** — Unwraps a `Promise<TripFormMap[]>` via `React.use()` and renders `TripsList`.
- **`components/wrappers/TripsMapWrapper.tsx`** — Same pattern, but dynamically imports `MapView` with skeleton loading.

### Other
- **`components/ParticipantsOnTrip.tsx`** — Public participant list for a trip.
- **`components/admin/`** — Admin-only components: `AddParticipantOnTrip`, `EditParticipantOnTrip`, `ParticipantSearch`, `ParticipantsOnTrip`.
- **`components/hr.tsx`** — Simple horizontal rule divider.

## Key Types (`types/index.ts`)
- `Post`, `PostResponse`, `TripListResponse`, `TripDetails`, `TripFormMap` — WordPress post shapes mapped to app needs.
- `Location`, `BadgeScorerWithDetails`, `ElementorData` — Domain types for locations, badges, and Elementor page content.
- Prisma types are re-exported from `@/lib/generated/prisma/client` (`Badge`, `BadgeDegree`, `BadgeScorer`, `TripParticipant`).

## Caching Pattern
- `lib/db-cached.ts` wraps `lib/db.ts` functions in `unstable_cache` with tag `"trips"` and 24-hour revalidation.
- On-demand invalidation is triggered via `app/api/revalidate/route.ts?secret=<REVALIDATE_TOKEN>`.
- Client components consume cached data through Promise wrappers (`React.use()`) passed from server components.

