#!/bin/sh
set -e

echo "Starting 37 Kings Guest Portal..."

# Create data directory if it doesn't exist
mkdir -p /app/data

# Set proper permissions for data directory
chown -R nextjs:nodejs /app/data

echo "Data directory ready: /app/data"
echo "Starting Next.js server..."

# Start the application
exec node server.js
