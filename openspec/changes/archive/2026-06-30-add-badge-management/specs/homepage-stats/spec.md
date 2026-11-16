## MODIFIED Requirements

### Requirement: Homepage displays dynamic badge statistics
The homepage SHALL display badge achiever statistics computed from the database, replacing the current hardcoded numbers.

#### Scenario: Badge stats rendered from DB
- **WHEN** user visits the homepage
- **THEN** badge statistics are displayed showing total scorer count per badge and per-degree breakdown for badges that have degrees

#### Scenario: Stats cached for performance
- **WHEN** badge stats are requested on the homepage
- **THEN** the data is served from cache (tag: `badges`, 24h revalidation) and revalidated when an admin modifies scorers
