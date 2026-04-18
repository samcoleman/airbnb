# Phase 1: Project Setup & Architecture

## Overview
Set up project structure, dev environment, and core architecture.

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

Current phase status: Complete

Last updated: April 18, 2026

## Architecture Decisions

### Tech Stack
- Frontend: SolidJS + TypeScript + Vite
- Backend: Fastify + TypeScript + oRPC
- Type Safety: oRPC for end-to-end type safety
- Database: SQLite with Drizzle ORM
- Container: Docker + Docker Compose

### Project Structure
```
site/
├── backend/      # Fastify + oRPC backend
│   ├── src/
│   │   ├── routes/   # oRPC procedures
│   │   ├── services/ # UniFi integration
│   │   ├── db/       # Database setup
│   │   └── types/    # Shared types
├── frontend/     # SolidJS frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── lib/      # oRPC client
└── plan/         # Planning docs
```

## UniFi External Portal Flow

1. Device connects → DHCP assigns IP → DNS redirects to UniFi
2. UniFi redirects to external portal URL
3. SolidJS portal loads (email + terms + password)
4. Form submits to Fastify via oRPC
5. Backend validates with UniFi API
6. On success, redirect to welcome page
7. UniFi authorizes client for internet access
