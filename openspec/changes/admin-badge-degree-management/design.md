## Context

The admin badge management system at `/admin/badges` currently has a `BadgeScorerManager` component that provides CRUD operations for badges, degrees, and scorers. However, based on the user's feedback and existing specs (`badge-management` and `scorer-assignment`), there are gaps in the implementation that need to be addressed.

The current implementation includes:
- Badge CRUD operations (create, edit, delete)
- Degree CRUD operations (create, edit, delete) for a selected badge
- Scorer assignment (add, edit, remove) with participant search
- UI components using HeroUI v3

The system uses Next.js App Router with server actions for database operations, Prisma with MariaDB adapter, and Clerk for admin authentication.

## Goals / Non-Goals

**Goals:**
- Ensure degree editing workflow is complete and functional
- Verify participant-to-badge assignment with degree selection works correctly
- Add proper validation for degree operations (e.g., prevent deletion of degrees with existing scorers)
- Improve error handling and user feedback
- Ensure UI properly reflects all degree-related actions

**Non-Goals:**
- Adding new features beyond what's specified in existing specs
- Changing the data model or schema
- Implementing bulk operations or advanced filtering
- Changing authentication or authorization logic

## Decisions

### Decision 1: Review and fix existing implementation
**Rationale**: The existing `BadgeScorerManager` component already has the structure for degree management and scorer assignment. Rather than rebuilding, we should review and fix any issues in the current implementation.

**Alternatives considered**:
- Complete rebuild: Too risky and time-consuming without clear evidence of fundamental issues
- Incremental enhancement: More pragmatic given the existing working structure

### Decision 2: Focus on validation and error handling
**Rationale**: The specs require proper validation (e.g., preventing deletion of degrees with scorers). The current implementation may lack these validations or have incomplete error handling.

**Alternatives considered**:
- Skip validation: Would violate spec requirements and lead to data integrity issues
- Add comprehensive validation: Aligns with specs and improves user experience

### Decision 3: Maintain existing UI patterns
**Rationale**: The current UI uses HeroUI v3 components consistently. Any fixes should maintain this pattern for consistency.

**Alternatives considered**:
- Switch to different UI components: Would create inconsistency and require more changes
- Keep existing patterns: Maintains consistency and reduces risk

## Risks / Trade-offs

[Risk] Existing implementation may have deeper architectural issues → Mitigation: Start with thorough code review before making changes

[Risk] Server actions may have edge cases not covered in current implementation → Mitigation: Test each action with various scenarios including error cases

[Risk] Changes might affect existing working functionality → Mitigation: Test the complete workflow after each change, focusing on both happy path and error scenarios

[Risk] Missing validation logic in server actions → Mitigation: Review each action file against spec requirements and add missing validations
