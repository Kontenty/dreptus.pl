## Why

Users viewing a specific trip's participants page have no way to navigate back to the main participants list. This creates a poor UX - users feel "lost" when browsing individual trip participant lists with no clear path to return.

## What Changes

- Add breadcrumb navigation component to the trip participants page
- Breadcrumb shows: "Uczestnicy" (link to participants list) > trip title (current page)
- Clicking "Uczestnicy" returns users to the main `/participants` list page

## Capabilities

### New Capabilities
- `participants-breadcrumb`: Breadcrumb navigation on trip participant pages showing current location and link back to participants list

### Modified Capabilities
- (none)

## Impact

- Modified: `app/participants/[tripId]/page.tsx`
- New component: breadcrumb navigation
- Link to `/participants` route