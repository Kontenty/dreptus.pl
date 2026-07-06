## Why

Badge scorers lists on the public site are currently rendered from raw HTML stored in WordPress posts. Admins have no structured way to manage badges, their degrees, or assign scorers — they edit WordPress HTML directly. This is error-prone, not queryable, and prevents dynamic features like homepage stats. A database-backed system enables proper admin CRUD, consistent data, and public pages driven by real data.

## What Changes

- New `Badge`, `BadgeDegree`, and `BadgeScorer` Prisma models backed by MariaDB tables
- Admin CRUD page at `/admin/badges` for managing badges, degrees, and assigning scorers to participants
- Shared participant search component extracted from existing trip participant management
- Public badge pages (`/badges/[slug]`) query scorers from DB instead of rendering WordPress HTML
- Homepage badge statistics become dynamic (queried from DB, cached)
- Cached data access wrappers following existing `unstable_cache` pattern
- Removal of WordPress `scorer` webhook handler from revalidation API

## Capabilities

### New Capabilities

- `badge-management`: Admin CRUD for badges and their degrees (create, edit, delete badges and badge degrees)
- `scorer-assignment`: Admin workflow for assigning participants to badges with a degree and date; public scorers list generated from DB data

### Modified Capabilities

- `badge-public-pages`: Public badge pages refactored to render scorers from DB instead of WordPress HTML; rules content stays in WordPress
- `homepage-stats`: Homepage badge statistics replaced with dynamic DB-driven counts

## Impact

- **Database**: 3 new tables (`badge`, `badge_degree`, `badge_scorer`), 1 new relation on `Participant`
- **New files**: ~10 server actions, 1 shared component, 2 admin page components, 1 seed script
- **Modified files**: `prisma/schema.prisma`, `lib/db-cached.ts`, `app/badges/[badge_name]/page.tsx`, `components/badge/BadgeTabs.tsx`, `app/page.tsx`, `app/api/revalidate/route.ts`, `components/admin/AddParticipantOnTrip.tsx`, `types/index.ts`
- **Dependencies**: No new dependencies; uses existing Prisma, HeroUI, SWR, valibot stack
- **Breaking**: Removal of `type=scorer` webhook from revalidation API (WordPress side may need updating)
