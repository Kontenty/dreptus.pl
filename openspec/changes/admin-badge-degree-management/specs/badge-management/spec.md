## MODIFIED Requirements

### Requirement: Admin can manage badge degrees
The system SHALL allow an authenticated admin to create, edit, and delete degrees for a badge. Each degree has a name, optional description, and sort order. The system SHALL validate that degrees cannot be deleted if they have existing scorer assignments.

#### Scenario: Add a degree to a badge
- **WHEN** admin adds a degree named "Zielony" with description "Minimum 5 tras" and sort order 1 to badge "Z Dreptusiem po Polsce"
- **THEN** the degree is created and appears in the degrees list for that badge

#### Scenario: Edit a degree
- **WHEN** admin updates the description of degree "Zielony" from "Minimum 5 tras" to "Minimum 10 tras"
- **THEN** the degree record is updated with the new description

#### Scenario: Edit degree sort order
- **WHEN** admin changes the sort order of degree "Zielony" from 1 to 2
- **THEN** the degree's sort order is updated and the degrees list reflects the new ordering

#### Scenario: Delete a degree with no scorers
- **WHEN** admin deletes a degree that has no scorer assignments
- **THEN** the degree is removed from the database

#### Scenario: Delete a degree with scorers
- **WHEN** admin attempts to delete a degree that has scorer assignments
- **THEN** the system blocks the deletion and returns an error indicating scorers must be removed first

#### Scenario: Degree validation
- **WHEN** admin attempts to add a degree without a name
- **THEN** the system returns a validation error indicating name is required
