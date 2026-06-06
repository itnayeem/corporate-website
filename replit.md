# Noviatify

A dark-themed, animated multi-page marketing website for Noviatify (a business formation service), with a password-protected admin CMS that lets the owner edit all site text without touching code.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/noviatify run dev` — run the website (Vite)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/noviatify run typecheck` — typecheck just the website (use this, not `build`, to verify)
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev/prod DB)
- `pnpm run build:standalone` — build for a single-Node-process host (e.g. Hostinger): builds the frontend, builds the API server, and copies the frontend into `artifacts/api-server/dist/public`. In production (`NODE_ENV=production`) the API server then serves that static site + SPA fallback alongside `/api`, so the whole app runs from `artifacts/api-server/dist/index.mjs`. Requires `DATABASE_URL` (external Postgres), `SESSION_SECRET`, `ADMIN_PASSWORD`, `PORT`, and `NODE_ENV=production`.
- Required env: `DATABASE_URL` (Postgres), `ADMIN_PASSWORD` (admin login), `SESSION_SECRET` (token signing — server fails fast if unset)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
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
- Pages derive visual metadata (icons/colors) from fixed local arrays indexed by content position, accessed with modulo so admin-added array items can never crash a page.
- Dark theme is enforced globally via the `dark` class added in `main.tsx`.
- Branding image uploads (logo/favicon) are stored on the API server's local filesystem (`artifacts/api-server/public/uploads/`, overridable via `UPLOADS_DIR`) — no third-party file service. Flow: admin POSTs metadata to `/storage/uploads/request-url` (mints `<uuid>.<ext>`, returns a same-origin `uploadURL` + `objectPath`), client PUTs raw bytes to `/storage/uploads/:filename` (admin-gated, `express.raw`), and `/storage/objects/:filename` serves them. The DB only stores the `/objects/...` URL in the content JSONB.

## Product

- Public site: Home, How It Works, Services, About, plus generic content pages — all dark-themed and animated.
- Admin CMS at `/owner` (login) → `/owner/pages` (dashboard): owner logs in with the admin password, then edits site text in place (click any text on the public site) and manages branding; changes persist to the DB and render on the public site.

## User preferences

- Dark theme across the entire site.
- Admin CMS must let the owner edit ALL text across ALL pages, gated by a single simple password (one admin).

## Gotchas

- `SESSION_SECRET` and `ADMIN_PASSWORD` must be set or auth breaks (server throws at startup if `SESSION_SECRET` is missing). Restart the api-server workflow after changing secrets.
- After editing a lib's source (e.g. api-client-react), run `pnpm run typecheck:libs`. Verify the website with `pnpm --filter @workspace/noviatify run typecheck`, not `build` (build needs workflow-provided `PORT`/`BASE_PATH`).
- When adding new editable text to a page, add it to the matching `src/content/defaults/*.ts` slice and read it via `useContent()` — don't hardcode strings in the page.
- The branding upload PUT is a first-party admin-gated route, so the client must send the admin Bearer token on the raw `fetch` PUT. The global `setAuthTokenGetter` only patches the generated `customFetch`, NOT native `fetch`, so the token is attached manually in `Pages.tsx`.
- Uploaded images live on the local filesystem. On ephemeral/multi-instance deploys (e.g. autoscale) these files are not shared and don't survive redeploys, while the DB still references `/objects/...`. SiteLogo has an `onError` fallback to the bundled logo; deploy on a single persistent instance (reserved VM with disk) if uploaded branding must persist.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
