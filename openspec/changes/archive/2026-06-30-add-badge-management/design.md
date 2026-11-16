## Context

The dreptus.pl app has 3 badges ("Z Dreptusiem po Polsce", "Z Dreptusiem po Dolinie Bugu", "Z Dreptusiem Traktem Krolewskim") with public pages at `/badges/[slug]`. Currently:

- Badge slugs and WordPress page IDs are hardcoded in `app/badges/[badge_name]/page.tsx`
- Scorers lists ("Lista zdobywcow") are raw HTML from WordPress posts, rendered via `dangerouslySetInnerHTML`
- Homepage badge statistics are hardcoded numbers in JSX
- No database model for badges exists — all badge data lives in WordPress or is hardcoded
- The admin panel (`/admin`) only manages trip participants via CRUD server actions + SWR
- PRD Phase 3 planned badge/scorer management as future work

The participant system is mature: `Participant` model (name, origin, unique on name+origin) and `TripParticipant` join table with full CRUD server actions, valibot validation, SWR data fetching, and HeroUI modals.

## Goals / Non-Goals

**Goals:**
- Database-backed Badge, BadgeDegree, and BadgeScorer models
- Admin CRUD page at `/admin/badges` for badges, degrees, and scorer assignments
- Public badge pages render scorers from DB instead of WordPress HTML
- Homepage badge stats become dynamic (cached DB queries)
- Shared participant search component across trip and badge admin UIs
- Follow existing patterns: server actions, valibot, SWR, HeroUI, `unstable_cache`

**Non-Goals:**
- Automatic badge degree validation from trip data (future enhancement)
- Badge-trip association modeling (trip rules are too varied: "all trips", "A-prefixed", "custom selection")
- Role-based access control for admin (Clerk middleware already gates `/admin`)
- Migration of existing scorers data from WordPress HTML to DB (manual re-entry by admin)
- Changes to the "Regulamin" (rules) tab — stays as WordPress Elementor content

## Decisions

### D1: Three separate models (Badge, BadgeDegree, BadgeScorer) vs. flat structure

**Choice:** Three models with foreign key relations.

**Rationale:** Badges have multiple degrees (one-to-many), and participants are assigned to a badge+degree combination (many-to-many via join table). The `@@unique([participant_id, badge_id])` constraint on BadgeScorer ensures one current degree per participant per badge. This matches the agreed "store current degree only" approach.

**Alternative considered:** Flat BadgeScorer with degree as an enum field. Rejected because degrees are badge-specific (each badge defines its own degrees with descriptions), and new badges may be added over time.

### D2: Manual degree assignment vs. automatic validation

**Choice:** Manual assignment. Degrees have a `description` field for requirements text, but the admin assigns degrees by judgment.

**Rationale:** Badge-to-trip mapping rules are varied and complex (all trips, A-prefixed trips, custom selection). Encoding these rules in the data model would be over-engineering. The admin verifies requirements externally and assigns degrees manually.

**Alternative considered:** Automatic progress tracking linking trips to badges. Deferred to a future enhancement.

### D3: Admin UI as flat page vs. nested routes

**Choice:** Single flat page at `/admin/badges` with inline sections.

**Rationale:** Consistent with existing `/admin` pattern (single page with add section + manage section). The badge page has badge list, degree management, and scorer management as expandable/inline sections rather than separate routes.

**Alternative considered:** Nested routes (`/admin/badges/[id]`, `/admin/badges/[id]/scorers`). More URL-addressable but adds routing complexity for a single-admin tool.

### D4: Shared participant search component

**Choice:** Extract ComboBox from `AddParticipantOnTrip` into `components/admin/ParticipantSearch.tsx`.

**Rationale:** Both trip participant management and badge scorer assignment need the same participant search UX (ComboBox with name filtering, origin auto-fill). Extracting avoids duplication and ensures consistent behavior.

### D5: Caching strategy

**Choice:** `unstable_cache` wrappers in `lib/db-cached.ts` with tag `badges` and 24h revalidation. Server actions call `revalidatePath` to bust cache on mutations.

**Rationale:** Follows the existing pattern for trip data (`getCachedTrips`, etc.). Badge data changes infrequently (admin-only mutations), so 24h cache is appropriate. On-demand revalidation via `revalidatePath` ensures public pages update immediately after admin changes.

### D6: Remove WordPress scorer webhook

**Choice:** Remove `type=scorer` handler from `app/api/revalidate/route.ts`.

**Rationale:** Scorers are now DB-driven. The webhook that revalidated badge pages when WordPress HTML changed is no longer needed. Badge page revalidation happens through server action `revalidatePath` calls instead.

## Risks / Trade-offs

**[Risk] No automatic degree validation** → Mitigation: Admin is the single operator, manually verifies requirements. Can add automation later without schema changes.

**[Risk] Deleting a badge with scorers** → Mitigation: `onDelete: Cascade` on BadgeDegree scorers relation. Delete confirmation modal warns admin. Alternative: block deletion until scorers are removed (can be added as validation in the delete action).

**[Risk] Participant name+origin uniqueness edge cases** → Mitigation: Reuses existing `Participant` model and its deduplication logic from `addParticipant` server action.

**[Risk] Cache staleness after admin mutations** → Mitigation: All server actions call `revalidatePath` on affected public routes, matching the existing trip participant pattern.

## Migration Plan

1. Run `prisma migrate dev` to create the 3 new tables
2. Run seed script to insert 3 badges + degrees for "Z Dreptusiem po Polsce"
3. Admin manually adds scorers through the new `/admin/badges` UI
4. Deploy — public badge pages switch from WordPress HTML to DB queries
5. WordPress scorer content can be archived/removed after verification

**Rollback:** Revert code changes; badge pages fall back to hardcoded dictionary + WordPress HTML (the current state). DB tables can be dropped without affecting other functionality.

## Open Questions

- None — all design decisions were resolved during the interview.
