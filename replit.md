# Noviatify

A dark-themed, animated multi-page marketing website for Noviatify (a business formation service), with a password-protected admin CMS that lets the owner edit all site text without touching code.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/noviatify run dev` — run the website (Vite)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/noviatify run typecheck` — typecheck just the website (use this, not `build`, to verify)
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
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
- Admin UI: `artifacts/noviatify/src/pages/admin/{Login,Editor}.tsx`, `src/components/admin/ContentEditor.tsx`, `src/lib/adminAuth.ts`

## Architecture decisions

- Content is one JSONB document. The frontend ships `defaultContent` as the baseline; the saved override is deep-merged over it (objects merge recursively; arrays/primitives replace). Editing any text means PUTting the whole merged tree.
- Admin auth is intentionally simple (single owner): password checked with `timingSafeEqual` against `ADMIN_PASSWORD`; success returns an HMAC token (signed with `SESSION_SECRET`, 12h TTL) stored in localStorage as `noviatify_admin_token` and sent as a Bearer token.
- Pages derive visual metadata (icons/colors) from fixed local arrays indexed by content position, accessed with modulo so admin-added array items can never crash a page.
- Dark theme is enforced globally via the `dark` class added in `main.tsx`.

## Product

- Public site: Home, How It Works, Services, About, plus generic content pages — all dark-themed and animated.
- Admin CMS at `/admin` (login) → `/admin/editor`: owner logs in with the admin password and edits every piece of site text through a recursive editor; changes persist to the DB and render on the public site.

## User preferences

- Dark theme across the entire site.
- Admin CMS must let the owner edit ALL text across ALL pages, gated by a single simple password (one admin).

## Gotchas

- `SESSION_SECRET` and `ADMIN_PASSWORD` must be set or auth breaks (server throws at startup if `SESSION_SECRET` is missing). Restart the api-server workflow after changing secrets.
- After editing a lib's source (e.g. api-client-react), run `pnpm run typecheck:libs`. Verify the website with `pnpm --filter @workspace/noviatify run typecheck`, not `build` (build needs workflow-provided `PORT`/`BASE_PATH`).
- When adding new editable text to a page, add it to the matching `src/content/defaults/*.ts` slice and read it via `useContent()` — don't hardcode strings in the page.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
