# Phase 2: Backend Development

## Overview
Build the Fastify backend with oRPC integration, including authentication, database setup, and UniFi controller integration.

## Steps

- [ ] Initialize Fastify server with TypeScript
- [ ] Set up oRPC router and handler
- [ ] Configure database connection (SQLite)
- [ ] Create database schema for captured emails
- [ ] Implement oRPC procedures:
  - [ ] `authenticatePortal` - Validate guest password and authorize with UniFi
  - [ ] `captureEmail` - Store visitor email and consent timestamp
  - [ ] `getPortalConfig` - Return portal settings (name, terms, etc.)
  - [ ] `checkStatus` - Verify current authentication status
- [ ] Implement UniFi controller API integration
- [ ] Add input validation with Zod schemas
- [ ] Implement error handling and logging
- [ ] Add CORS and security middleware
- [ ] Set up compression plugin for performance
- [ ] Create database migration scripts

## Status

Current phase status: Not Started

Last updated: April 18, 2026

## Known Issues / Bugs

No issues encountered yet.

## oRPC Procedures Specification

### Procedure: `authenticatePortal`
**Input:**
```typescript
{
  email: string
  password: string
  termsAccepted: boolean
  mac?: string      // From UniFi redirect
  ap?: string       // Access point identifier
  ssid?: string     // Network SSID
  token?: string    // UniFi auth token
}
```

**Output:**
```typescript
{
  success: boolean
  redirectUrl: string  // Welcome page URL
  sessionExpires: Date
  token?: string
}
```

### Procedure: `captureEmail`
**Input:**
```typescript
{
  email: string
  termsAccepted: boolean
  timestamp: Date
  ip?: string
  userAgent?: string
}
```

**Output:**
```typescript
{
  success: boolean
  id: string
}
```

### Procedure: `getPortalConfig`
**Output:**
```typescript
{
  portalName: string
  requiresTerms: boolean
  termsText: string
  welcomeMessage: string
  ssid: string
}
```

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
- **Database File**: `./data/guest_portal.db`
- **Driver**: `better-sqlite3` for synchronous operations
- **WAL Mode**: Enabled for better concurrency
- **Backup Strategy**: Simple file copy for backups

## UniFi Integration Notes

### UniFi Controller Endpoints
- **Base URL**: `https://unifi-controller:8443`
- **Authentication**: `POST /api/auth`
- **Authorize Guest**: `POST /api/s/{site}/cmd/stamgr`
- **Get Sessions**: `GET /api/s/{site}/stat/guest`

### Configuration Required
```env
UNIFI_URL=https://unifi-controller:8443
UNIFI_USER=admin
UNIFI_PASSWORD=password
UNIFI_SITE=default
GUEST_PASSWORD=shared-guest-password
```

## Security Considerations

- Rate limiting on authentication attempts
- Input sanitization for email addresses
- HTTPS required for UniFi API communication
- CORS configuration for external portal access
- Environment variable validation on startup
