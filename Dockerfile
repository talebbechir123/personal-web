# ── Stage 1: build React ──────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install client deps and build
COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client/ ./client/
RUN cd client && npm run build
# Output lands in server/public via vite.config.ts outDir

# ── Stage 2: production server ───────────────────────────────────────────────
FROM node:20-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

COPY server/ ./server/
# Copy built assets from builder stage
COPY --from=builder /app/server/public ./server/public

EXPOSE 3000

CMD ["node", "server/index.js"]
