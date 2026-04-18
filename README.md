# 37 Kings Road Airbnb Captive Portal

UniFi captive portal for Airbnb guest network using SolidJS, Fastify, and oRPC.

## Tech Stack

- **Frontend**: SolidJS + TypeScript + Vite
- **Backend**: Fastify + TypeScript + oRPC  
- **Database**: SQLite + Drizzle ORM
- **Type Safety**: oRPC for end-to-end type safety
- **Containerization**: Docker + Docker Compose

## Project Structure

```
site/
├── backend/          # Fastify + oRPC backend
│   ├── src/
│   │   ├── routes/   # oRPC router procedures
│   │   ├── services/ # Business logic (UniFi integration)
│   │   ├── db/       # Database setup and migrations
│   │   ├── types/    # Shared TypeScript types
│   │   └── utils/    # Utility functions
│   └── package.json
├── frontend/         # SolidJS frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── lib/        # oRPC client setup
│   │   ├── styles/     # CSS modules
│   │   └── utils/      # Utility functions
│   └── package.json
├── plan/             # Planning and documentation
├── data/             # SQLite database (gitignored)
└── docker-compose.yml
```

## Development

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0
- Docker (optional)

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp site/backend/.env.example site/backend/.env
   # Edit site/backend/.env with your configuration
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Scripts

- `npm run dev` - Start both frontend and backend in development
- `npm run build` - Build both frontend and backend
- `npm run start` - Start production backend server
- `npm run test` - Run tests
- `npm run lint` - Run linting
- `npm run typecheck` - Run TypeScript type checking
- `npm run docker:build` - Build Docker image
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers

## Docker Deployment

1. Build and start containers:
   ```bash
   npm run docker:build
   npm run docker:up
   ```

2. View logs:
   ```bash
   npm run docker:logs
   ```

3. Stop containers:
   ```bash
   npm run docker:down
   ```

## UniFi Integration

The portal integrates with UniFi's external captive portal:

1. Configure UniFi controller to redirect to this portal
2. Portal handles email capture, terms acceptance, and guest password
3. On successful authentication, backend authorizes guest via UniFi API
4. User is redirected to welcome page and granted internet access

## Planning

Development phases and detailed planning can be found in `/site/plan/`:

- Phase 1: Project Setup & Architecture
- Phase 2: Backend Development  
- Phase 3: Frontend Development
- Phase 4: Deployment & Testing

## License

MIT

## Support

For issues and questions, please refer to the planning documentation or create an issue in the repository.
