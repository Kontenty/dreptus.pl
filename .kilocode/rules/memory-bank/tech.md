# Technical Stack & Dependencies

## Core Framework
- **Next.js**: 16.2.1 with App Router and server components
- **React**: 19.2.3 with concurrent features
- **TypeScript**: 5.6.3 with strict type checking
- **Node.js**: Runtime environment (version as per deployment)

## Styling & UI
- **Tailwind CSS**: 4.1.17 for utility-first styling
- **HeroUI**: 2.8.5 for component library
- **Framer Motion**: 12.23.24 for animations
- **AOS**: 3.0.0-beta.6 for scroll animations
- **@vis.gl/react-google-maps**: 1.8.0 for React Google Maps integration
- **maplibre-gl**: 5.22.0 for map rendering

## State Management & Forms
- **React Hook Form**: 7.65.0 for form handling
- **Valibot**: 1.1.0 for schema validation
- **React Hooks**: Built-in state management

## Database & ORM
- **Prisma**: 6.17.1 with MariaDB adapter
- **MySQL**: Primary database
- **Prisma Client**: 6.17.1 for database access

## Authentication & Security
- **NextAuth.js**: 5.0.0-beta.29 for authentication
- **@auth/prisma-adapter**: 2.11.0 for database integration
- **@next-auth/prisma-adapter**: 1.0.7 for session management

## Maps & Location
- **Google Maps JavaScript API**: For interactive maps
- **@googlemaps/js-api-loader**: 1.16.2 for API loading
- **@googlemaps/markerclusterer**: 2.6.2 for marker clustering
- **@vis.gl/react-google-maps**: 1.8.0 for modern React Google Maps integration
- **@turf/distance**: 7.3.4 for geospatial calculations
- **maplibre-gl**: 5.22.0 for alternative map rendering

## Email & Notifications
- **Nodemailer**: 7.0.9 for email sending
- **@types/nodemailer**: 7.0.2 for TypeScript support

## Development Tools
- **Biome**: 2.2.6 for linting and formatting
- **Lefthook**: 2.0.0 for git hooks
- **TurboPack**: Build system with Next.js
- **PostCSS**: 8.5.6 for CSS processing
- **Autoprefixer**: 10.4.21 for vendor prefixes

## Image Handling
- **Sharp**: 0.33.5 for image optimization
- **Next.js Image**: Built-in image optimization
- **Plaiceholder**: 2.5.0 for placeholder generation
- **@plaiceholder/next**: 2.5.0 for Next.js integration

## Utilities
- **SWR**: 2.2.0 for data fetching
- **React Slick**: 0.30.2 for carousel components
- **Class Variance Authority**: 0.7.0 for conditional styling
- **Classnames**: 2.3.2 for conditional CSS classes
- **@next/env**: 16.2.1 for environment configuration
- **@next/third-parties**: 16.0.10 for third-party integrations
- **next-axiom**: 1.5.1 for logging and monitoring

## Development Dependencies
- **@types/aos**: 3.0.4 for AOS TypeScript definitions
- **@types/google.maps**: 3.53.4 for Google Maps types
- **@types/node**: 22.19.15 for Node.js types
- **@types/react**: 19.2.2 for React types
- **@types/react-dom**: 19.2.2 for React DOM types
- **@types/react-slick**: 0.23.10 for React Slick types
- **Node HTML Parser**: 6.1.5 for HTML parsing
- **@clerk/localizations**: 4.3.0 for Clerk authentication localizations
- **@clerk/nextjs**: 7.0.8 for Clerk Next.js integration

## Environment Configuration
Required environment variables:
- `DATABASE_CON_URL` - MySQL database connection
- `DATABASE_CON_URL_SHADOW` - Shadow database for Prisma
- `GITHUB_ID` - GitHub OAuth client ID
- `GITHUB_SECRET` - GitHub OAuth client secret
- `MAIL_HOST` - SMTP server host
- `MAIL_PORT` - SMTP server port (default: 587)
- `MAIL_USER` - SMTP username
- `MAIL_PASS` - SMTP password
- `MAIL_TO` - Email recipient address
- `MAIL_FROM` - Email sender address
- `GOOGLE_MAPS_API_KEY` - Google Maps API key
- `AUTH_DEBUG` - Enable authentication debugging

## Build & Deployment
- **Package Manager**: pnpm with workspace support
- **Build Command**: `next build` with TurboPack
- **Deployment Platform**: Vercel
- **CDN**: Vercel Edge Network
- **Environment Variables**: Managed via Vercel dashboard

## Performance Features
- **Server-Side Rendering**: Next.js App Router
- **Static Generation**: 24-hour revalidation for content pages
- **Image Optimization**: Next.js Image component with Sharp
- **Code Splitting**: Automatic with Next.js
- **Tree Shaking**: Optimized bundle sizes
- **Caching**: Database query optimization with Prisma

## Development Workflow
1. **Development**: `pnpm dev` with TurboPack
2. **Linting**: `biome check` for code quality
3. **Formatting**: `biome format --write` for consistency
4. **Type Checking**: TypeScript compiler
5. **Building**: Production-optimized build process
6. **Testing**: Manual testing via development server

## Database Migrations
- **Migration System**: Prisma migrations
- **Schema Versioning**: Version-controlled schema changes
- **Migration Path**: `prisma/migrations/`
- **Schema File**: `prisma/schema.prisma`

## Security Considerations
- **Environment Variable Validation**: Valibot schema validation
- **Authentication**: NextAuth with multiple providers
- **Session Management**: Secure session handling
- **Admin Access**: Role-based authorization
- **Input Validation**: Comprehensive form validation
- **SQL Injection**: Protected via Prisma ORM

## Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **JavaScript**: ES2020+ features
- **CSS**: Modern CSS features with autoprefixer