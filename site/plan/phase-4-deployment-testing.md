# Phase 4: Deployment & Testing

## Overview
Deploy the captive portal to Docker container, test UniFi integration, and validate the complete authentication flow.

## Steps

- [ ] Create production Docker image
- [ ] Configure environment variables for production
- [ ] Set up volume mounts for SQLite database persistence
- [ ] Test container startup and health checks
- [ ] Configure UniFi external portal settings
- [ ] Test captive portal authentication flow end-to-end
- [ ] Validate email capture and storage
- [ ] Test welcome page redirect functionality
- [ ] Verify mobile device compatibility
- [ ] Performance testing and optimization
- [ ] Set up logging and monitoring
- [ ] Create backup strategy for SQLite database
- [ ] Document deployment procedures

## Status

Current phase status: Not Started

Last updated: April 18, 2026

## Known Issues / Bugs

No issues encountered yet.

## Docker Configuration

### Production Dockerfile
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source files
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm run build

# Final production image
FROM node:20-alpine

WORKDIR /app

# Install better-sqlite3 dependencies
RUN apk add --no-cache sqlite

# Copy built files
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Create data directory for SQLite
RUN mkdir -p /app/data

VOLUME ["/app/data"]

EXPOSE 3000

CMD ["node", "backend/dist/index.js"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  captive-portal:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
      - UNIFI_URL=https://unifi-controller:8443
      - UNIFI_USER=${UNIFI_USER}
      - UNIFI_PASSWORD=${UNIFI_PASSWORD}
      - UNIFI_SITE=${UNIFI_SITE:-default}
      - GUEST_PASSWORD=${GUEST_PASSWORD}
      - PORTAL_NAME=${PORTAL_NAME:-Guest Portal}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## UniFi Configuration

### External Portal Settings
1. **Portal URL**: `http://your-server:3000/`
2. **HTTPS Redirect**: Use reverse proxy (nginx/caddy) for production
3. **Authentication**: External (our portal handles auth)
4. **Redirect URL**: After auth, redirect to welcome page
5. **Session Timeout**: Configure desired duration

### Network Requirements
- Ensure captive portal server is accessible from guest network
- Firewall rules to allow guest network to reach portal server
- DNS resolution for portal hostname

## Testing Checklist

### Functional Testing
- [ ] Email validation accepts valid emails and rejects invalid ones
- [ ] Terms checkbox must be checked before submission
- [ ] Password validation works with configured guest password
- [ ] Authentication redirects to welcome page on success
- [ ] Error messages display correctly on failure
- [ ] Mobile device compatibility (iOS, Android)
- [ ] Desktop browser testing (Chrome, Firefox, Safari)
- [ ] Offline functionality (portal loads without internet)
- [ ] Database persistence after container restart

### Integration Testing
- [ ] UniFi controller authentication works
- [ ] Guest authorization via UniFi API succeeds
- [ ] Email data is correctly stored in SQLite
- [ ] Welcome page displays correctly
- [ ] Redirect to internet works after authorization

### Performance Testing
- [ ] Initial page load time < 2 seconds
- [ ] API response time < 500ms
- [ ] Database query performance acceptable
- [ ] Memory usage within limits
- [ ] Concurrent user testing

### Security Testing
- [ ] Input validation prevents injection attacks
- [ ] Rate limiting prevents abuse
- [ ] Environment variables are not exposed
- [ ] HTTPS works correctly (if configured)
- [ ] CSRF protection enabled

## Deployment Strategy

### Self-Hosted Deployment
1. **Hardware Requirements**:
   - Minimum 1GB RAM, 1 CPU core
   - 10GB storage (for backups)
   - Network connection to UniFi controller

2. **Deployment Steps**:
   - Clone repository
   - Configure environment variables
   - Build Docker image
   - Run container with Docker Compose
   - Configure UniFi external portal
   - Test authentication flow

### VPS Deployment
1. **VPS Requirements**:
   - Linux OS (Ubuntu/Debian recommended)
   - Docker and Docker Compose installed
   - Public IP or domain name
   - SSL certificate for HTTPS

2. **Additional Steps**:
   - Configure firewall rules
   - Set up reverse proxy (nginx/caddy)
   - Configure SSL/TLS certificates
   - Set up domain DNS records
   - Implement automated backups

## Backup Strategy

### SQLite Backup
- **Frequency**: Daily automated backups
- **Method**: Copy database file to backup location
- **Retention**: Keep 30 days of backups
- **Compression**: Compress old backups
- **Offsite**: Consider cloud storage for critical backups

### Backup Script Example
```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
DB_PATH="/app/data/guest_portal.db"
BACKUP_DIR="/app/backups"

mkdir -p $BACKUP_DIR
cp $DB_PATH $BACKUP_DIR/guest_portal_$DATE.db

# Compress backups older than 7 days
find $BACKUP_DIR -name "guest_portal_*.db" -mtime +7 -exec gzip {} \;

# Remove backups older than 30 days
find $BACKUP_DIR -name "guest_portal_*.db.gz" -mtime +30 -delete
```

## Monitoring & Maintenance

### Health Checks
- Container health check via Docker
- Database accessibility check
- UniFi controller connectivity
- API endpoint monitoring

### Logging
- Application logs (stdout/stderr)
- Access logs (portal visits)
- Error logs (authentication failures)
- Database operation logs

### Maintenance Tasks
- Regular dependency updates
- Security patches
- Database cleanup (old records)
- Log rotation
- Backup verification

## Rollback Plan

### Issues Triggering Rollback
- Authentication failures
- Database corruption
- Performance degradation
- Security vulnerabilities

### Rollback Steps
1. Stop current container
2. Restore previous working version
3. Restore database from backup
4. Restart services
5. Verify functionality
6. Monitor for issues
