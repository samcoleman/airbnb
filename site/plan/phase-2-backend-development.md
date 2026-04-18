# Phase 2: Backend Development

## Overview
Build Fastify backend with oRPC, SQLite, and UniFi integration.

## Steps

- [ ] Initialize Fastify server with TypeScript
- [ ] Set up oRPC router and handler
- [ ] Configure SQLite database connection
- [ ] Create database schema for captured emails
- [ ] Implement oRPC procedures:
  - [ ] `authenticatePortal` - Validate guest password and authorize with UniFi
  - [ ] `captureEmail` - Store visitor email and consent timestamp
  - [ ] `getPortalConfig` - Return portal settings
  - [ ] `checkStatus` - Verify authentication status
- [ ] Implement UniFi controller API integration
- [ ] Add input validation with Zod schemas
- [ ] Implement error handling and logging
- [ ] Add CORS and security middleware
- [ ] Set up compression plugin
- [ ] Create database migration scripts

## Status
Current phase status: Not Started
Last updated: April 18, 2026

## oRPC Procedures Specification

### `authenticatePortal`
Input: `{ email, password, termsAccepted, mac?, ap?, ssid?, token? }`
Output: `{ success, redirectUrl, sessionExpires, token? }`

### `captureEmail`
Input: `{ email, termsAccepted, timestamp, ip?, userAgent? }`
Output: `{ success, id }`

### `getPortalConfig`
Output: `{ portalName, requiresTerms, termsText, welcomeMessage, ssid }`

## Database Schema

### Table: `guest_emails`
```sql
CREATE TABLE guest_emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  terms_accepted BOOLEAN NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_guest_emails_email ON guest_emails(email);
CREATE INDEX idx_guest_emails_created_at ON guest_emails(created_at);
```

### Database Configuration
- Database File: `./data/guest_portal.db`
- Driver: `better-sqlite3`
- WAL Mode: Enabled
- Backup: Simple file copy

## UniFi Integration

### Endpoints
- Base URL: `https://unifi-controller:8443`
- Authentication: `POST /api/auth`
- Authorize Guest: `POST /api/s/{site}/cmd/stamgr`

### Environment Variables
```env
UNIFI_URL=https://unifi-controller:8443
UNIFI_USER=admin
UNIFI_PASSWORD=password
UNIFI_SITE=default
GUEST_PASSWORD=shared-guest-password
```

## Security

- Rate limiting on authentication attempts
- Input sanitization for emails
- HTTPS required for UniFi API
- CORS configuration for external portal
- Environment variable validation
