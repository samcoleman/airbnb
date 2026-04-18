FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy root package files
COPY package*.json ./
RUN npm ci

# Copy workspace packages
COPY site/backend/package.json ./site/backend/
COPY site/frontend/package.json ./site/frontend/

# Install workspace dependencies
RUN npm ci --workspace=site/backend --workspace=site/frontend

# Copy source files
COPY site/ ./site/

# Build frontend
WORKDIR /app/site/frontend
RUN npm run build

# Build backend
WORKDIR /app/site/backend
RUN npm run build

# Production stage
FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache sqlite

WORKDIR /app

# Copy built files
COPY --from=builder /app/site/backend ./site/backend
COPY --from=builder /app/site/frontend/dist ./site/frontend/dist
COPY --from=builder /app/site/backend/node_modules ./site/backend/node_modules

# Create data directory for SQLite
RUN mkdir -p /app/site/data

VOLUME ["/app/site/data"]

EXPOSE 3000

WORKDIR /app/site/backend

CMD ["node", "dist/index.js"]
