## MODIFIED Requirements

### Requirement: Badge page displays rules and scorers tabs
The public badge page at `/badges/[slug]` SHALL display two tabs: "Regulamin" (rules from WordPress Elementor content) and "Lista zdobywcow" (scorers list from the database).

#### Scenario: Rules tab renders WordPress content
- **WHEN** user navigates to `/badges/z-dreptusiem-po-polsce` and views the "Regulamin" tab
- **THEN** the Elementor content from the associated WordPress rules page is rendered

#### Scenario: Scorers tab renders DB-driven table
- **WHEN** user navigates to `/badges/z-dreptusiem-po-polsce` and views the "Lista zdobywcow" tab
- **THEN** a table of scorers is displayed, grouped by degree, showing participant name and origin for each scorer

#### Scenario: Scorers sorted by degree then name
- **WHEN** the scorers list is rendered
- **THEN** scorers are grouped by degree (alphabetical order) and within each degree sorted by participant name alphabetically

#### Scenario: Badge not found
- **WHEN** user navigates to `/badges/nonexistent-slug`
- **THEN** a 404 page is displayed

### Requirement: Badge page resolves badge by database lookup
The badge page SHALL look up the badge by slug from the `Badge` database table instead of using a hardcoded dictionary. The `rules_page_id` from the Badge record SHALL be used to fetch WordPress rules content.

#### Scenario: Badge found in database
- **WHEN** user visits `/badges/z-dreptusiem-po-polsce`
- **THEN** the system queries the Badge table by slug, retrieves the `rules_page_id`, fetches rules from WordPress, and fetches scorers from the database

#### Scenario: Badge slug not in database
- **WHEN** user visits `/badges/unknown-badge`
- **THEN** the system returns a 404 response
