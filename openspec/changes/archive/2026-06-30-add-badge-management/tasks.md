## 1. Data Model

- [x] 1.1 Add `Badge`, `BadgeDegree`, and `BadgeScorer` models to `prisma/schema.prisma`
- [x] 1.2 Add `badge_scorers` relation to existing `Participant` model
- [x] 1.3 Run `prisma migrate dev` to create the 3 new tables
- [x] 1.4 Create `prisma/seed.ts` with 3 badges (slugs + `rules_page_id`) and 3 degrees for "Z Dreptusiem po Polsce"
- [x] 1.5 Add badge-related TypeScript types to `types/index.ts`

## 2. Server Actions — Badge & Degree CRUD

- [x] 2.1 Create `lib/actions/get-badges.ts` — fetch all badges with degrees
- [x] 2.2 Create `lib/actions/add-badge.ts` — create badge with valibot validation, slug uniqueness check
- [x] 2.3 Create `lib/actions/edit-badge.ts` — update badge fields
- [x] 2.4 Create `lib/actions/delete-badge.ts` — delete badge with cascade
- [x] 2.5 Create `lib/actions/add-badge-degree.ts` — add degree to badge
- [x] 2.6 Create `lib/actions/edit-badge-degree.ts` — update degree
- [x] 2.7 Create `lib/actions/delete-badge-degree.ts` — delete degree, block if scorers exist

## 3. Server Actions — Scorer CRUD

- [x] 3.1 Create `lib/actions/get-badge-scorers.ts` — fetch scorers for a badge with participant + degree
- [x] 3.2 Create `lib/actions/add-badge-scorer.ts` — assign participant to badge+degree, revalidate `/badges/[slug]` and `/`
- [x] 3.3 Create `lib/actions/edit-badge-scorer.ts` — update degree or date, revalidate paths
- [x] 3.4 Create `lib/actions/remove-badge-scorer.ts` — remove scorer, revalidate paths

## 4. Cached Data Access

- [x] 4.1 Add `getCachedBadgeScorers(badgeSlug)` to `lib/db-cached.ts` (tag: `badges`, 24h)
- [x] 4.2 Add `getCachedBadgeScorerCounts()` to `lib/db-cached.ts` (tag: `badges`, 24h) for homepage stats

## 5. Shared Component

- [x] 5.1 Create `components/admin/ParticipantSearch.tsx` — extract shared ComboBox from `AddParticipantOnTrip`
- [x] 5.2 Refactor `components/admin/AddParticipantOnTrip.tsx` to use shared `ParticipantSearch`

## 6. Admin UI

- [x] 6.1 Create `app/admin/badges/page.tsx` — server component fetching badges, passing to client component
- [x] 6.2 Create `app/admin/badges/BadgeScorerManager.tsx` — client component with badge list, degree management, scorer management
- [x] 6.3 Implement badge CRUD UI (add/edit/delete modals) in `BadgeScorerManager`
- [x] 6.4 Implement degree CRUD UI (inline add/edit/delete) in `BadgeScorerManager`
- [x] 6.5 Implement scorer assignment UI (add/edit/remove with ParticipantSearch + degree selector + date picker) in `BadgeScorerManager`

## 7. Public Pages

- [x] 7.1 Refactor `app/badges/[badge_name]/page.tsx` — query Badge by slug from DB, fetch scorers from DB, keep rules from WordPress via `rules_page_id`
- [x] 7.2 Refactor `components/badge/BadgeTabs.tsx` — scorers tab renders DB-driven table grouped by degree instead of raw HTML
- [x] 7.3 Refactor `app/page.tsx` — replace hardcoded badge stats with `getCachedBadgeScorerCounts()` query

## 8. Cleanup

- [x] 8.1 Remove `type=scorer` handler from `app/api/revalidate/route.ts`
- [x] 8.2 Remove hardcoded badge dictionary from `app/badges/[badge_name]/page.tsx`
- [x] 8.3 Remove `scorersContent` prop from `BadgeTabs` interface
- [x] 8.4 Run `pnpm lint && pnpm typecheck` to verify
