# =============================================================================
# TrendWear API (Tier 2 - application)
# Multi-stage: prod-deps -> runtime (production)
# =============================================================================

ARG NODE_VERSION=22-alpine

# -----------------------------------------------------------------------------
# Stage 1: prod-deps - production-only node_modules from the lockfile
#          (reproducible; devDependencies such as nodemon are excluded)
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts

# -----------------------------------------------------------------------------
# Stage 3: runtime - minimal, non-root, signal-aware production image
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS runtime

ENV NODE_ENV=production \
    PORT=5000

RUN mkdir -p /app \
 && chown node:node /app

WORKDIR /app

COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node

EXPOSE 5000

# Probe the app's own health endpoint (returns 503 until MongoDB is connected).
HEALTHCHECK --interval=15s --timeout=3s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 5000) + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]
