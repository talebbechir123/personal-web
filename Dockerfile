FROM node:20-alpine AS builder

WORKDIR /app


COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client/ ./client/
RUN cd client && npm run build



FROM node:20-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

COPY server/ ./server/

COPY --from=builder /app/server/public ./server/public

EXPOSE 3000

CMD ["node", "server/index.js"]
