# TrendWear: Docker deployment (three-tier)

```
Browser ──:80──► web (nginx)  ──► backend (Node/Express) ──► mongo (MongoDB 7)
                  frontend_net        frontend_net + data_net    data_net (internal)
                                                              └─► redis (Redis 7)
```

| Tier | Service | Image | Network(s) | Host-exposed | Persistent data |
|------|---------|-------|-----------|--------------|-----------------|
| 1 Web | `web` | nginx-unprivileged (static SPA + `/api` proxy) | `frontend_net` | `:80` | none |
| 2 App | `backend` | node:22-alpine (multi-stage, non-root, tini) | `frontend_net`, `data_net` | no | none |
| 3 Data | `mongo` | mongo:7 | `data_net` | no | volumes `trendwear_mongo_data`, `trendwear_mongo_config` |
| 3 Data | `redis` | redis:7-alpine (AOF on) | `data_net` | no | volume `trendwear_redis_data` |

## 1. Configure

```bash
cp .env.example .env
# Replace every change-me value and the placeholder third-party keys.
# Generate JWT secrets with:  openssl rand -hex 64
```

## 2. Run

```bash
docker compose up -d --build
docker compose ps                  # all services should become healthy
curl -s localhost/api/health       # {"status":"ok","db":"connected"}
```

Open http://localhost (or `WEB_PORT`).

## 3. Operate

```bash
docker compose logs -f backend
docker compose exec mongo mongosh -u "$MONGO_ROOT_USERNAME" -p --authenticationDatabase admin
docker compose restart backend
docker compose down                # keeps data
docker compose down -v             # DELETES data volumes
```

Back up Mongo with `docker compose exec mongo mongodump --archive --gzip -u ... -p ...`
and copy the archive out. Back up the volume itself if you need a full snapshot.

## Design decisions

- **Multi-stage builds.** The backend builds production `node_modules` in `prod-deps` (no devDependencies) and copies only those into the slim runtime stage. The frontend builds with Vite in a `build` stage and ships only `dist/` on nginx.
- **Non-root, read-only, least privilege.** Both app containers run as non-root with `read_only`, `cap_drop: ALL`, and `no-new-privileges`. Tmpfs covers the few writable paths.
- **Network segmentation.** `data_net` is `internal: true`, so Mongo and Redis cannot reach the internet. Only `backend` bridges both networks. Only `web` is published to the host.
- **Startup ordering by health, not sleep.** `web` waits for `backend` to be healthy. `backend` waits for `mongo` and `redis`. The backend health endpoint returns 503 until MongoDB is connected.
- **Redis TLS is opt-in.** The bundled Redis speaks plain TCP. Set `REDIS_TLS=true` in compose when you point `REDIS_URL` at a managed Redis that requires TLS.
- **Cookies.** The backend sets `secure` cookies when `NODE_ENV=production`. Browsers accept those on `http://localhost`. For any other hostname, put an HTTPS terminator in front (Caddy, Traefik, or a cloud load balancer) and set `CLIENT_URL` to the `https://` URL.

## Production checklist

- [ ] Real secrets in `.env`, with `.env` never committed
- [ ] HTTPS terminator in front of `web` (cookies require it off-localhost)
- [ ] `CLIENT_URL` set to the public HTTPS origin
- [ ] Stripe live keys and the Stripe webhook/redirect URLs updated
- [ ] Scheduled Mongo and Redis backups
- [ ] Image tag pinned (`IMAGE_TAG`) and base images pinned to digests in CI
