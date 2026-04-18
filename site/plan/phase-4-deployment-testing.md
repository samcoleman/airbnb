# Phase 4: Deployment & Testing

## Overview
Deploy captive portal to Docker, test UniFi integration, validate authentication flow.

## Steps

- [ ] Create production Docker image
- [ ] Configure environment variables for production
- [ ] Set up volume mounts for SQLite persistence
- [ ] Test container startup and health checks
- [ ] Configure UniFi external portal settings
- [ ] Test captive portal authentication flow end-to-end
- [ ] Validate email capture and storage
- [ ] Test welcome page redirect functionality
- [ ] Verify mobile device compatibility
- [ ] Performance testing and optimization
- [ ] Set up logging and monitoring
- [ ] Create backup strategy for SQLite
- [ ] Document deployment procedures

## Status
Current phase status: Not Started
Last updated: April 18, 2026

## Docker Configuration

### Docker Compose
```yaml
services:
  captive-portal:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./site/data:/app/site/data
    environment:
      - NODE_ENV=production
      - UNIFI_URL=${UNIFI_URL}
      - UNIFI_USER=${UNIFI_USER}
      - UNIFI_PASSWORD=${UNIFI_PASSWORD}
      - UNIFI_SITE=${UNIFI_SITE:-default}
      - GUEST_PASSWORD=${GUEST_PASSWORD}
      - PORTAL_NAME=${PORTAL_NAME:-Guest Portal}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## UniFi Configuration

### External Portal Settings
1. Portal URL: `http://your-server:3000/`
2. HTTPS Redirect: Use reverse proxy (nginx/caddy) for production
3. Authentication: External (our portal handles auth)
4. Redirect URL: After auth, redirect to welcome page

### Network Requirements
- Captive portal server accessible from guest network
- Firewall rules allow guest network to reach portal server
- DNS resolution for portal hostname

## Testing Checklist

### Functional Testing
- [ ] Email validation accepts valid emails, rejects invalid
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
- [ ] Email data correctly stored in SQLite
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
- [ ] Environment variables not exposed
- [ ] HTTPS works correctly (if configured)
- [ ] CSRF protection enabled

## Deployment Strategy

### Self-Hosted Deployment
1. **Hardware**: 1GB RAM, 1 CPU core, 10GB storage, network to UniFi controller
2. **Steps**: Clone repo, configure env vars, build Docker image, run container, configure UniFi, test flow

### VPS Deployment
1. **Requirements**: Linux OS, Docker & Compose, public IP/domain, SSL cert
2. **Additional**: Configure firewall, set up reverse proxy, configure SSL, set up DNS, automated backups

## Backup Strategy

### SQLite Backup
- **Frequency**: Daily automated
- **Method**: Copy database file to backup location
- **Retention**: Keep 30 days of backups
- **Compression**: Compress old backups
- **Offsite**: Consider cloud storage for critical backups

### Backup Script
```bash
#!/bin/bash
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
