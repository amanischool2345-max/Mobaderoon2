# Mubadiroon (مبادرون) - Student Initiative Platform

## Overview

Mubadiroon is an Arabic-language student initiative platform designed for Princess Alia Secondary School. The platform enables students to propose creative ideas, participate in discussions, and document their initiatives. It features a full-stack architecture with React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and UI animations
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a pages-based structure with shared components. Arabic RTL (right-to-left) layout is implemented throughout with Cairo and Tajawal fonts for proper Arabic typography.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with local strategy, session-based auth using express-session
- **Password Security**: Scrypt hashing with timing-safe comparison
- **API Design**: RESTful endpoints defined in shared route definitions with Zod schemas

### Data Storage
- **Database**: PostgreSQL via node-postgres (pg) driver
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

### Key Design Patterns
- **Shared Types**: TypeScript types and Zod schemas are shared between frontend and backend via `/shared` directory
- **API Contract**: Route definitions with input/output schemas in `/shared/routes.ts` ensure type safety across the stack
- **Storage Abstraction**: `IStorage` interface in `/server/storage.ts` abstracts database operations

### Build System
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: esbuild bundles server code, Vite builds client to `/dist/public`
- **Database Migrations**: Drizzle Kit with `db:push` command

## External Dependencies

### Database
- **PostgreSQL**: Required, connection via `DATABASE_URL` environment variable
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `SESSION_SECRET`: Session encryption key (defaults to "r3pl1t" in development)

### Third-Party Services
- **Google Fonts**: Cairo and Tajawal Arabic fonts loaded via CDN
- No external APIs currently integrated, though build config suggests future support for OpenAI, Stripe, and Google Generative AI

### UI Component Library
- **shadcn/ui**: Pre-configured with "new-york" style, neutral base colors, CSS variables enabled
- **Radix UI**: Underlying primitives for accessible components