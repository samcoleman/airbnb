# Phase 1: Project Setup & Architecture

## Overview
Set up the project structure, development environment, and core architecture for the SolidJS + Fastify + oRPC captive portal with UniFi integration.

## Steps

- [ ] Initialize project structure with TypeScript configuration
- [ ] Set up Docker development environment
- [ ] Create base file structure (frontend/backend separation)
- [ ] Configure development tooling (linting, formatting, testing)
- [ ] Set up oRPC client/server architecture
- [ ] Configure environment variable management
- [ ] Create base Docker configuration
- [ ] Set up development scripts and tooling
- [ ] Configure Git workflow and ignore patterns

## Status

Current phase status: Not Started

Last updated: April 18, 2026

## Known Issues / Bugs

No issues encountered yet.

## Architecture Decisions

### Tech Stack Confirmed
- **Frontend**: SolidJS + TypeScript + Vite
- **Backend**: Fastify + TypeScript + oRPC
- **Type Safety**: oRPC for end-to-end type safety
- **Database**: SQLite with Drizzle ORM (for storing captured emails)
- **Containerization**: Docker + Docker Compose
- **Validation**: Zod schemas

### Project Structure
```
site/
├── backend/          # Fastify + oRPC backend
│   ├── src/
│   │   ├── routes/   # oRPC router procedures
│   │   ├── services/ # Business logic (UniFi integration)
│   │   ├── db/       # Database setup and migrations
│   │   └── types/    # Shared TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── frontend/         # SolidJS frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/      # oRPC client setup
│   │   └── styles/
│   ├── package.json
│   └── tsconfig.json
├── plan/             # Planning and documentation
├── docker-compose.yml
└── Dockerfile
```

## UniFi External Portal Flow

1. Device connects to guest network
2. DHCP assigns IP, DNS redirects to UniFi controller
3. UniFi redirects to external portal URL
4. Our SolidJS portal loads (email capture + terms + password)
5. Form submits to Fastify backend via oRPC
6. Backend validates with UniFi controller API
7. On success, redirect to welcome page
8. UniFi authorizes client for internet access
