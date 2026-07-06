## ADDED Requirements

### Requirement: Admin can create a badge
The system SHALL allow an authenticated admin to create a new badge with a name, slug, optional description, and optional WordPress rules page ID.

#### Scenario: Successful badge creation
- **WHEN** admin submits the badge creation form with name "Nowa Odznaka", slug "nowa-odznaka", and description "Testowa odznaka"
- **THEN** a new Badge record is created in the database and appears in the badge list

#### Scenario: Duplicate slug rejection
- **WHEN** admin attempts to create a badge with a slug that already exists
- **THEN** the system returns a validation error indicating the slug is taken

### Requirement: Admin can edit a badge
The system SHALL allow an authenticated admin to update a badge's name, slug, description, and rules page ID.

#### Scenario: Successful badge edit
- **WHEN** admin changes a badge's name from "Z Dreptusiem po Polsce" to "Z Dreptusiem po Polsce v2"
- **THEN** the badge record is updated and the change is reflected in the badge list

### Requirement: Admin can delete a badge
The system SHALL allow an authenticated admin to delete a badge, which cascade-deletes all associated degrees and scorer assignments.

#### Scenario: Successful badge deletion
- **WHEN** admin confirms deletion of a badge that has degrees and scorers assigned
- **THEN** the badge, its degrees, and all scorer records for that badge are removed from the database

#### Scenario: Delete confirmation
- **WHEN** admin clicks delete on a badge
- **THEN** a confirmation modal is displayed before the deletion executes

### Requirement: Admin can manage badge degrees
The system SHALL allow an authenticated admin to create, edit, and delete degrees for a badge. Each degree has a name and optional description.

#### Scenario: Add a degree to a badge
- **WHEN** admin adds a degree named "Zielony" with description "Minimum 5 tras" to badge "Z Dreptusiem po Polsce"
- **THEN** the degree is created and appears in the degrees list for that badge

#### Scenario: Edit a degree
- **WHEN** admin updates the description of degree "Zielony"
- **THEN** the degree record is updated with the new description

#### Scenario: Delete a degree with no scorers
- **WHEN** admin deletes a degree that has no scorer assignments
- **THEN** the degree is removed from the database

#### Scenario: Delete a degree with scorers
- **WHEN** admin attempts to delete a degree that has scorer assignments
- **THEN** the system blocks the deletion and returns an error indicating scorers must be removed first

### Requirement: Admin can view all badges
The system SHALL display a list of all badges with their names, slugs, and degree counts on the admin badges page.

#### Scenario: Badge list display
- **WHEN** admin navigates to `/admin/badges`
- **THEN** all badges are displayed in a table with columns for name, slug, and actions (edit, delete)
