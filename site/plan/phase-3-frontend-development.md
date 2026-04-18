# Phase 3: Frontend Development

## Overview
Build the SolidJS frontend with oRPC client integration, including the captive portal forms, welcome page, and responsive design.

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
- [ ] Optimize for captive portal constraints (offline-first, fast loading)
- [ ] Test cross-browser compatibility

## Status

Current phase status: Not Started

Last updated: April 18, 2026

## Known Issues / Bugs

No issues encountered yet.

## Page Structure

### Captive Portal Page (`/`)
**Components:**
- `PortalForm` - Main authentication form
- `EmailInput` - Email capture with validation
- `TermsCheckbox` - Terms and conditions with scrollable text
- `PasswordInput` - Shared password input
- `SubmitButton` - Authentication button with loading state
- `ErrorDisplay` - Error message display

### Welcome Page (`/welcome`)
**Components:**
- `WelcomeHeader` - Welcome message and branding
- `NetworkInfo` - Connected network details
- `HouseRules` - Summary of house rules
- `RedirectButton` - Button to proceed to internet
- `SessionInfo` - Session expiration and details

## Form Validation Rules

### Email Input
- Valid email format
- Required field
- Maximum length 255 characters

### Terms Checkbox
- Must be checked to proceed
- Terms text must be displayed and readable

### Password Input
- Must match configured guest password
- Required field
- Password masking with show/hide option

## Captive Portal Considerations

### Network Constraints
- **Offline-First**: Core functionality must work without internet
- **Fast Loading**: Target < 2s initial load
- **Small Bundle**: Minimize JavaScript bundle size
- **Graceful Degradation**: Handle network interruptions

### User Experience
- **Clear Instructions**: Simple language, no technical terms
- **Immediate Feedback**: Loading states, error messages
- **Mobile First**: Optimized for phone screens
- **Accessibility**: WCAG 2.1 AA compliance

### Technical Optimizations
- Tree-shaking for minimal bundle
- Lazy loading of non-critical components
- Aggressive caching strategies
- Service worker for offline capability

## Styling Approach

### CSS Framework
- Use CSS modules or styled-components for component isolation
- Responsive design with CSS Grid/Flexbox
- Mobile-first approach
- Dark mode support (optional)

### Color Scheme
- Primary: Professional blue/teal
- Success: Green for positive actions
- Error: Red for validation errors
- Neutral: Gray backgrounds and text

### Typography
- System fonts for performance
- Readable font sizes (16px base)
- Clear visual hierarchy
- Good contrast ratios

## Error Handling

### Client-Side Errors
- Form validation errors
- Network timeout handling
- oRPC client errors
- User input errors

### Display Strategy
- Clear, actionable error messages
- Non-disruptive notifications
- Retry mechanisms where appropriate
- Logging for debugging
