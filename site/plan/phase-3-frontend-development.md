# Phase 3: Frontend Development

## Overview
Build SolidJS frontend with oRPC client for captive portal.

## Steps

- [ ] Initialize SolidJS project with Vite and TypeScript
- [ ] Set up oRPC client configuration
- [ ] Create base layout and styling system
- [ ] Implement captive portal page:
  - [ ] Email capture form
  - [ ] Terms and conditions checkbox
  - [ ] Shared guest password input
  - [ ] Form validation and error handling
  - [ ] Loading states and UX feedback
- [ ] Implement welcome page:
  - [ ] Welcome message
  - [ ] Network information display
  - [ ] House rules summary
  - [ ] Redirect to internet button
- [ ] Add responsive design for mobile devices
- [ ] Implement error handling and user feedback
- [ ] Add loading animations and transitions
- [ ] Optimize for captive portal constraints
- [ ] Test cross-browser compatibility

## Status
Current phase status: Not Started
Last updated: April 18, 2026

## Page Structure

### Captive Portal Page (`/`)
- `PortalForm` - Main authentication form
- `EmailInput` - Email capture with validation
- `TermsCheckbox` - Terms and conditions
- `PasswordInput` - Shared password input
- `SubmitButton` - Authentication button
- `ErrorDisplay` - Error message display

### Welcome Page (`/welcome`)
- `WelcomeHeader` - Welcome message
- `NetworkInfo` - Connected network details
- `HouseRules` - Summary of house rules
- `RedirectButton` - Button to proceed to internet
- `SessionInfo` - Session expiration

## Form Validation Rules

### Email Input
- Valid email format, required, max 255 characters

### Terms Checkbox
- Must be checked to proceed

### Password Input
- Must match configured guest password, required

## Captive Portal Considerations

### Network Constraints
- Offline-First: Core functionality works without internet
- Fast Loading: Target < 2s initial load
- Small Bundle: Minimize JavaScript bundle
- Graceful Degradation: Handle network interruptions

### User Experience
- Clear instructions, immediate feedback, mobile-first
- WCAG 2.1 AA compliance

### Technical Optimizations
- Tree-shaking, lazy loading, aggressive caching
- Service worker for offline capability

## Styling Approach

- CSS modules or styled-components
- Responsive design with CSS Grid/Flexbox
- Mobile-first approach
- System fonts for performance
- Clear visual hierarchy and contrast ratios

## Error Handling

### Client-Side Errors
- Form validation, network timeouts, oRPC errors, user input errors

### Display Strategy
- Clear, actionable error messages
- Non-disruptive notifications
- Retry mechanisms where appropriate
