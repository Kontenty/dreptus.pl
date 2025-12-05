# System Architecture

## Overview
Dreptuś is a modern full-stack web application built on Next.js 15 with a hybrid WordPress/MySQL backend for content management and custom React components for the user interface.

## Technology Stack

### Frontend
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: HeroUI component library
- **State Management**: React hooks with server components
- **Animations**: AOS (Animate On Scroll)
- **Form Handling**: React Hook Form with Valibot validation

### Backend
- **Runtime**: Node.js (via Next.js API routes)
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Email**: Nodemailer
- **Maps**: Google Maps JavaScript API

### Infrastructure
- **Hosting**: Vercel
- **Build System**: TurboPack
- **Linting**: Biome
- **Package Manager**: pnpm

## Project Structure

### Application Pages (`/app`)
- `/page.tsx` - Homepage with statistics and hero section
- `/trips/` - Trip listing and filtering interface
- `/trips/[tripName]/` - Individual trip detail pages
- `/participants/` - Participant listing and management
- `/participants/[tripId]/` - Trip-specific participant management
- `/badges/` - Badge system and achievement tracking
- `/form/` - Report submission form
- `/admin/` - Administrative interface
- `/auth/` - Authentication pages (signin, verify-request)

### Components (`/components`)
#### Core Components
- `Header.tsx` - Main navigation with responsive menu
- `Footer.tsx` - Site footer with links and social media
- `Hero.tsx` - Homepage hero section with carousel
- `ModalGallery.tsx` - Image gallery modal component

#### Trip Management
- `TripsList.tsx` - Trip listing with pagination
- `TripListFilter.tsx` - Location-based filtering
- `TripDetail.tsx` - Individual trip information display
- `TripsMap.tsx` - Google Maps integration for trip visualization

#### Authentication
- `auth/LogInButton.tsx` - Login interface component
- `auth/LogOutButton.tsx` - Logout functionality

#### Admin
- `admin/AddParticipantOnTrip.tsx` - Participant management
- `admin/EditParticipantOnTrip.tsx` - Participant editing
- `admin/ParticipantsOnTrip.tsx` - Admin participant listing

#### Maps (`/components/map/`)
- `Map.tsx` - Base map component
- `TripsMap.tsx` - Trip-specific map with markers
- `Marker.tsx` - Individual trip markers
- `MarkerCluster.tsx` - Clustered markers for better performance
- `InfoWindowF.tsx` - Map popup information

### Database Layer (`/lib`)
- `db.ts` - Database query functions and operations
- `prisma.ts` - Prisma client configuration
- `auth.ts` - NextAuth.js configuration
- `config.ts` - Environment configuration with validation

### Actions (`/lib/actions/`)
- `add-participant.ts` - Add participant to trip functionality
- `get-participants.ts` - Participant data retrieval
- `get-trip-participants.ts` - Trip-specific participant queries
- `sendReport.ts` - Report submission handling

## Database Schema

### WordPress Tables (Content Management)
- `wp_posts` - Trip listings and content posts
- `wp_postmeta` - Trip metadata (coordinates, images, PDF links)
- `wp_terms` & `wp_term_taxonomy` - Location and category classification
- `wp_users` - User accounts

### Custom Application Tables
- `Participant` - User participants in trips
- `TripParticipant` - Many-to-many relationship tracking trips and participants
- NextAuth tables for authentication (Account, Session, User, etc.)

### Key Relationships
- `TripParticipant` links `Participant` to `wp_posts` (trips)
- `wp_posts` linked to location categories via WordPress taxonomy system
- Trip metadata stored in `wp_postmeta` with custom field keys

## Data Flow Architecture

### Trip Discovery Flow
1. User visits `/trips` page
2. Server component fetches trips from WordPress database via Prisma
3. Trips are filtered and processed based on location parameters
4. Google Maps component displays trips with interactive markers
5. Trip list displays with filtering and pagination

### Authentication Flow
1. User attempts admin access
2. NextAuth checks GitHub OAuth or email credentials
3. Admin validation performed against WordPress user database
4. Session established with admin role if authorized
5. Admin interface becomes accessible

### Report Submission Flow
1. User completes trip and visits `/form`
2. Form validation via React Hook Form and Valibot
3. Report data processed via server action
4. TripParticipant record created/updated in database
5. Email notification sent via Nodemailer

### Badge Achievement Flow
1. Participant submits report for completed trip
2. System calculates badge eligibility based on trip count
3. Achievement status tracked and displayed
4. Badge progression updated in user interface

## Component Relationships

### Page Components
- `app/page.tsx` → `Hero.tsx`, `DreptusCarousel.tsx`, `Main.tsx`
- `app/trips/page.tsx` → `TripsMap.tsx`, `TripsList.tsx`, `TripListFilter.tsx`
- `app/admin/page.tsx` → `ParticipantsOnTrip.tsx`

### Map System
- `TripsMap.tsx` is the main map container
- `MarkerCluster.tsx` manages performance for many trip markers
- `Marker.tsx` renders individual trip locations
- `InfoWindowF.tsx` displays trip information on marker click

### Admin System
- Admin pages use custom action handlers for CRUD operations
- Participant management integrated with trip tracking
- Real-time updates via server actions

## External Integrations

### Google Maps
- Maps JavaScript API for trip visualization
- Marker clustering for performance with large datasets
- Location filtering based on geocoordinates

### WordPress Backend
- Direct database access via Prisma ORM
- Content managed through WordPress interface
- Custom fields for trip metadata

### Email System
- Nodemailer for authentication emails
- Report submission notifications
- Environment-based email configuration

## Performance Considerations
- Server-side rendering with Next.js App Router
- Image optimization with Next.js Image component
- Component-level code splitting
- Database query optimization with raw SQL where needed
- Google Maps marker clustering for performance

## Security Measures
- NextAuth for secure authentication
- Environment variable validation with Valibot
- Admin-only access validation
- Session-based authorization
- Input validation on all forms