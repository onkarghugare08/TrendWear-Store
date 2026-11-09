# =============================================================================
# TrendWear Web (Tier 1 - presentation / edge)
# Multi-stage: build (Node + Vite) -> runtime (unprivileged nginx serving dist/)
# nginx serves the SPA and reverse-proxies /api to the backend tier.
# =============================================================================

ARG NODE_VERSION=22-alpine
ARG NGINX_VERSION=1.27-alpine

# -----------------------------------------------------------------------------
# Stage 1: build - install from lockfile and produce static assets in /app/dist
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: runtime - nginx-unprivileged runs as a non-root user on port 8080
# -----------------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runtime

# Our server block replaces the image's default site
COPY --chown=nginx:nginx nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
