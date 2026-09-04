## Why

The admin badge management system needs completion to fully support degree editing and participant assignment workflows. While the `BadgeScorerManager` component exists with basic CRUD operations, there are gaps in the implementation that prevent admins from effectively managing badge degrees and assigning participants to specific badge degrees as specified in the existing `badge-management` and `scorer-assignment` specs.

## What Changes

- Complete the degree editing workflow to ensure all degree properties (name, description, sort order) can be properly modified
- Ensure participant-to-badge assignment works correctly with degree selection
- Add validation for degree operations (e.g., prevent deletion of degrees with existing scorers)
- Improve error handling and user feedback for badge degree operations
- Ensure the UI properly reflects all degree-related actions

## Capabilities

### New Capabilities
- None - all capabilities already exist in specs

### Modified Capabilities
- `badge-management`: Requirements for degree management need verification and completion
- `scorer-assignment`: Requirements for participant-to-degree assignment need verification and completion

## Impact

- `app/admin/badges/BadgeScorerManager.tsx`: Main component that needs review and potential fixes
- `lib/actions/add-badge-degree.ts`, `lib/actions/edit-badge-degree.ts`, `lib/actions/delete-badge-degree.ts`: Server actions for degree CRUD
- `lib/actions/add-badge-scorer.ts`, `lib/actions/edit-badge-scorer.ts`, `lib/actions/remove-badge-scorer.ts`: Server actions for scorer assignment
- `components/admin/ParticipantSearch.tsx`: Shared component for participant search in scorer assignment
- Prisma schema: Badge, BadgeDegree, BadgeScorer models (no changes expected)
