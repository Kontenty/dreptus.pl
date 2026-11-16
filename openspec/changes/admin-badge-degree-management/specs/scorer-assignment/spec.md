## MODIFIED Requirements

### Requirement: Admin can assign a badge to a participant
The system SHALL allow an authenticated admin to assign a badge with a specific degree to a participant, creating a BadgeScorer record. The system SHALL validate that the participant does not already hold this badge.

#### Scenario: Successful scorer assignment
- **WHEN** admin selects participant "Jan Kowalski", badge "Z Dreptusiem po Polsce", degree "Zielony", and date "2025-01-15"
- **THEN** a BadgeScorer record is created linking the participant to the badge with the specified degree and date

#### Scenario: Duplicate assignment rejection
- **WHEN** admin attempts to assign a badge to a participant who already has that badge
- **THEN** the system returns a validation error indicating the participant already holds this badge

#### Scenario: Assignment without degree
- **WHEN** admin assigns a badge to a participant without selecting a degree
- **THEN** the BadgeScorer record is created with degree_id as null

#### Scenario: Participant search validation
- **WHEN** admin attempts to save a scorer assignment without selecting a participant
- **THEN** the system returns a validation error indicating participant is required

### Requirement: Admin can change a scorer's degree
The system SHALL allow an authenticated admin to update the degree and date for an existing scorer assignment.

#### Scenario: Upgrade degree
- **WHEN** admin changes participant "Jan Kowalski"'s degree for "Z Dreptusiem po Polsce" from "Zielony" to "Zolty"
- **THEN** the BadgeScorer record is updated with the new degree

#### Scenario: Change date
- **WHEN** admin changes the date for participant "Jan Kowalski"'s badge assignment from "2025-01-15" to "2025-02-01"
- **THEN** the BadgeScorer record is updated with the new date

### Requirement: Admin can remove a scorer
The system SHALL allow an authenticated admin to remove a scorer assignment.

#### Scenario: Successful scorer removal
- **WHEN** admin confirms removal of participant "Jan Kowalski" from badge "Z Dreptusiem po Polsce"
- **THEN** the BadgeScorer record is deleted from the database

#### Scenario: Remove confirmation
- **WHEN** admin clicks remove on a scorer
- **THEN** a confirmation modal is displayed before the removal executes

### Requirement: Admin can view scorers for a badge
The system SHALL display all scorer assignments for a selected badge, showing participant name, origin, degree, and date awarded.

#### Scenario: Scorers list display
- **WHEN** admin selects badge "Z Dreptusiem po Polsce"
- **THEN** a table shows all scorers with columns: participant name, origin, degree name, date awarded, and actions (edit, remove)

#### Scenario: Empty scorers list
- **WHEN** admin selects a badge with no scorers assigned
- **THEN** the system displays a message indicating no scorers are assigned to this badge

### Requirement: Participant search in scorer assignment
The system SHALL provide a searchable input for finding participants by name, with auto-fill of origin on selection. The component SHALL be shared with trip participant management.

#### Scenario: Search existing participant
- **WHEN** admin types "Jan" in the participant search field
- **THEN** a dropdown shows all participants whose name contains "Jan"

#### Scenario: Select participant auto-fills origin
- **WHEN** admin selects "Jan Kowalski" from the dropdown
- **THEN** the origin field is auto-filled with the participant's origin value

#### Scenario: Clear participant selection
- **WHEN** admin clears the participant search field
- **THEN** the participant selection is reset and the origin field is cleared
