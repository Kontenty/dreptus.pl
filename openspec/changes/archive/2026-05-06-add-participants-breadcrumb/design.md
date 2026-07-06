## Context

The trip participants page at `/participants/[tripId]` currently lacks any navigation back to the main participants list. Users viewing this page have no way to return without using the browser back button.

Current implementation:
- Page renders `ParticipantsOnTrip` component with trip participant data
- Displays trip title and participant list
- Uses HeroUI v3 components (confirmed via codebase)

## Goals / Non-Goals

**Goals:**
- Add breadcrumb navigation to trip participants page
- Show path: "Uczestnicy" (link to `/participants`) > (current trip title)
- Enable users to click "Uczestnicy" to return to participants list

**Non-Goals:**
- Create a reusable breadcrumb component library
- Add breadcrumbs to other pages
- Support nested breadcrumbs beyond 2 levels

## Decisions

**Decision: Use HeroUI Breadcrumbs component**

Given this app uses HeroUI v3 (confirmed via grep on `@heroui/react`), use the existing HeroUI `Breadcrumbs` and `BreadcrumbItem` components rather than building custom HTML breadcrumbs.

**Decision: Inline component vs separate file**

For simplicity and since this is a single-page change, the breadcrumb will be implemented inline in the page component rather than as a separate component file.

## Risks / Trade-offs

- **Risk**: HeroUI version compatibility → Verify HeroUI version in package.json before implementation
- **Risk**: Styling consistency → Use HeroUI default styling to match existing UI

## Migration Plan

1. Modify `app/participants/[tripId]/page.tsx` to add breadcrumb
2. Verify with lint and typecheck
3. Test the navigation link works

## Open Questions

- (none)