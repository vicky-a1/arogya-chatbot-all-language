# Multi-stage build for production optimization
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with optimizations
ENV NODE_OPTIONS="--max-old-space-size=512"
RUN apk update && apk upgrade --no-cache && \
    npm ci --only=production --no-optional --no-audit --prefer-offline && \
    npm cache clean --force

# Production stage
FROM node:20-alpine AS production

# Set environment
ENV NODE_ENV=production
ENV PORT=10000
ENV NODE_OPTIONS="--max-old-space-size=512"

# Install system dependencies
RUN apk update && apk upgrade --no-cache && \
    apk add --no-cache curl dumb-init && \
    rm -rf /var/cache/apk/*

# Create app directory
WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY package.json ./
COPY server.js ./
COPY public ./public
COPY validate.js ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S arogya -u 1001 -G nodejs && \
    mkdir -p /app/logs && \
    chown -R arogya:nodejs /app

# Switch to non-root user
USER arogya

# Expose port
EXPOSE 10000

# Health check with improved configuration
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:10000/api/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "--max-old-space-size=512", "server.js"]
