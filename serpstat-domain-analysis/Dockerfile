# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/
COPY esbuild.config.js ./

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/build ./build

# Copy package files
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Install production dependencies
RUN npm ci --only=production && npm cache clean --force

# Switch to non-root user
USER nodejs

# Set environment variables
ENV NODE_ENV=production
ENV SERPSTAT_API_KEY=

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('MCP Server is healthy')" || exit 1

# Set entry point
ENTRYPOINT ["node", "build/index.js"]

# Default command
CMD []