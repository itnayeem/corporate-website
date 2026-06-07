# Noviatify

A dark-themed, animated multi-page marketing website for Noviatify (a business formation service), with a password-protected admin CMS that lets the owner edit all site text without touching code.

## Run & Operate

- `npm run dev --workspace=@workspace/api-server` — run the API server
- `npm run dev --workspace=@workspace/noviatify` — run the website (Vite)
- `npm run typecheck` — full typecheck across all packages (builds libs first, then typechecks every workspace)
- `npm run typecheck --workspace=@workspace/noviatify` — typecheck just the website (use this, not `build`, to verify)
- `npm run codegen --workspace=@workspace/api-spec` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `npm run push --workspace=@workspace/db` — push DB schema changes (dev/prod DB)
- `npm run build:standalone` — build for a single-Node-process host (e.g. Hostinger): builds the frontend, builds the API server, and copies the frontend into `artifacts/api-server/dist/public`. In production (`NODE_ENV=production`) the API server then serves that static site + SPA fallback alongside `/api`, so the whole app runs from `artifacts/api-server/dist/index.mjs`. Requires `DATABASE_URL` (external Postgres), `SESSION_SECRET`, `ADMIN_PASSWORD`, `PORT`, and `NODE_ENV=production`.
- `npm run build:hostinger` — produces a self-contained `./deploy/` folder for Hostinger **shared hosting** (CloudLinux Node.js Selector / Passenger), where node/npm are NOT on the SSH path and the host cannot build. The folder has zero npm dependencies (everything is bundled into `index.mjs`), a CJS Passenger shim `app.js` (set as the hPanel "Application startup file"; sets NODE_ENV/PORT/STATIC_DIR defaults then dynamic-imports the ESM bundle), pino sidecar files, `public/`, a minimal `package.json`, and `README.txt` with hPanel steps. **`deploy/` is committed to git** (not ignored) so it deploys via GitHub: push the repo, then in hPanel connect the repo via Git and point the Node.js app's "Application root" at the repo's `deploy/` folder. Re-run this and commit whenever code changes — the host does not build. Set env vars in the hPanel Node.js app: `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_PASSWORD`.
- Required env: `DATABASE_URL` (Postgres), `ADMIN_PASSWORD` (admin login), `SESSION_SECRET` (token signing — server fails fast if unset)

## Stack

- npm workspaces (root `package.json` `workspaces` field), Node.js 24, TypeScript 5.9
- Web: React + Vite (artifacts/noviatify), Tailwind (dark mode via `dark` class on root), Framer Motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Where things live

- DB schema: `lib/db/src/schema/siteContent.ts` (`site_content` singleton row: id, data jsonb, updatedAt)
- API contract (source of truth): `lib/api-spec` OpenAPI → generates hooks in `lib/api-client-react`
- API auth + routes: `artifacts/api-server/src/lib/auth.ts`, `artifacts/api-server/src/routes/`
- Frontend content model: `artifacts/noviatify/src/content/` — `ContentContext.tsx` (provider + `useContent` + deepMerge), `defaultContent.ts` (composes all slices), `defaults/*.ts` (per-area editable text)
- Admin UI: `artifacts/noviatify/src/pages/admin/{Login,Pages}.tsx`, in-place editing via `src/components/admin/` (Editable, EditToolbar, CropModal), `src/lib/adminAuth.ts`

## Architecture decisions

- Content is one JSONB document. The frontend ships `defaultContent` as the baseline; the saved override is deep-merged over it (objects merge recursively; arrays/primitives replace). Editing any text means PUTting the whole merged tree.
- Admin auth is intentionally simple (single owner): password checked with `timingSafeEqual` against `ADMIN_PASSWORD`; success returns an HMAC token (signed with `SESSION_SECRET`, 12h TTL) stored in localStorage as `noviatify_admin_token` and sent as a Bearer token.
- Security: ALL content/branding writes are enforced server-side with `requireAdmin` (bearer token) — the admin gating is NOT frontend-only. Write routes: `PUT /content`, `PUT /admin/password`, `POST /storage/uploads/request-url`, `PUT /storage/uploads/:filename`. Public reads: `GET /content`, `GET /storage/objects/:filename`, `GET /healthz`, plus `POST /admin/login`. `POST /admin/login` is brute-force-protected by an in-memory rate limiter (`src/lib/rateLimit.ts`): 10 FAILED attempts / 15 min / IP (successful logins don't consume quota), concurrency-safe (counts in-flight `pending` + settled hits so parallel floods can't bypass the cap). A generous catch-all `apiLimiter` (240 req/min/IP) guards all of `/api`. The limiter keys on `req.ip`, so `app.set("trust proxy", N)` is required (default 1 hop, override with `TRUST_PROXY_HOPS` if the host adds CDN/proxy hops). The limiter is per-process/in-memory — correct only for single-instance deploys (counters reset on restart, not shared across instances). Also: `x-powered-by` disabled and baseline security headers (`X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `X-DNS-Prefetch-Control`) set globally. NOTE: real-world security still depends on a strong `ADMIN_PASSWORD` and `SESSION_SECRET`.
- Pages derive visual metadata (icons/colors) from fixed local arrays indexed by content position, accessed with modulo so admin-added array items can never crash a page.
- Dark theme is enforced globally via the `dark` class added in `main.tsx`.
- Branding image uploads (logo/favicon) are stored on the API server's local filesystem (`artifacts/api-server/public/uploads/`, overridable via `UPLOADS_DIR`) — no third-party file service. Flow: admin POSTs metadata to `/storage/uploads/request-url` (mints `<uuid>.<ext>`, returns a same-origin `uploadURL` + `objectPath`), client PUTs raw bytes to `/storage/uploads/:filename` (admin-gated, `express.raw`), and `/storage/objects/:filename` serves them. The DB only stores the `/objects/...` URL in the content JSONB.

## Package management (npm workspaces)

- This project uses **npm workspaces** (migrated from pnpm). Workspaces are declared in the root `package.json` `workspaces` array (`artifacts/*`, `lib/*`, `lib/integrations/*`, `scripts`). The lockfile is `package-lock.json`.
- `.npmrc` sets `legacy-peer-deps=true` (needed for peer-dep resolution across the workspace).
- Root `package.json` `overrides` pins `esbuild` and aliases `@esbuild-kit/esm-loader` → `tsx`.
- Run scripts in a single package with `npm run <script> --workspace=@workspace/<name>` (or `-w`). Run across all with `npm run <script> --workspaces --if-present`.
- After changing dependencies, run `npm install` (regenerates `package-lock.json`). Installs can be slow in this environment — see Gotchas.

## Product

- Public site: Home, How It Works, Services, About, plus generic content pages — all dark-themed and animated.
- Admin CMS at `/owner` (login) → `/owner/pages` (dashboard): owner logs in with the admin password, then edits site text in place (click any text on the public site) and manages branding; changes persist to the DB and render on the public site.

## User preferences

- Dark theme across the entire site.
- Admin CMS must let the owner edit ALL text across ALL pages, gated by a single simple password (one admin).

## Gotchas

- `SESSION_SECRET` and `ADMIN_PASSWORD` must be set or auth breaks (server throws at startup if `SESSION_SECRET` is missing). Restart the api-server workflow after changing secrets.
- After editing a lib's source (e.g. api-client-react), run `npm run typecheck:libs`. Verify the website with `npm run typecheck --workspace=@workspace/noviatify`, not `build` (build needs workflow-provided `PORT`/`BASE_PATH`).
- The libs emit declarations to `lib/*/dist` via `tsc --build`. After a fresh `npm install` (or if `dist` is missing), a stale `tsconfig.tsbuildinfo` can make `tsc --build` skip emit, causing TS6305 "output file has not been built" errors in the artifacts. Fix with a one-time `npx tsc --build --force`.
- When adding new editable text to a page, add it to the matching `src/content/defaults/*.ts` slice and read it via `useContent()` — don't hardcode strings in the page.
- The branding upload PUT is a first-party admin-gated route, so the client must send the admin Bearer token on the raw `fetch` PUT. The global `setAuthTokenGetter` only patches the generated `customFetch`, NOT native `fetch`, so the token is attached manually in `Pages.tsx`.
- Uploaded images live on the local filesystem. On ephemeral/multi-instance deploys (e.g. autoscale) these files are not shared and don't survive redeploys, while the DB still references `/objects/...`. SiteLogo has an `onError` fallback to the bundled logo; deploy on a single persistent instance (reserved VM with disk) if uploaded branding must persist.
- `npm install` in this Replit environment is finicky: backgrounded installs get killed early, but a foreground `npm install` keeps running as an orphan even after the shell command times out — launch it and poll for `package-lock.json` / completion. The Replit package proxy can also 502 on specific tarballs whose packument advertises an un-rewritten `registry.npmjs.org` URL; see `.agents/memory/`.

## Pointers

- See the `pnpm-workspace` skill for general workspace structure and TypeScript project-reference setup (the concepts apply to this npm-workspaces project too).
