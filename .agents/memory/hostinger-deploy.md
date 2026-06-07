---
name: Hostinger / external pnpm build-script approval
description: Why esbuild build scripts get ignored on external hosts and where to allowlist them
---

# pnpm build-script approval on external hosts (Hostinger)

pnpm 10 does NOT run dependency build scripts (e.g. esbuild's) unless the package
is allowlisted. If a host's pnpm install fails with `ERR_PNPM_IGNORED_BUILDS:
Ignored build scripts: esbuild@...`, the allowlist isn't being read.

**Rule:** mirror `onlyBuiltDependencies` in BOTH `pnpm-workspace.yaml` AND the root
`package.json` `pnpm` field.

**Why:** Replit's local pnpm reads `onlyBuiltDependencies` from
`pnpm-workspace.yaml`, but some external hosts (Hostinger) read it only from the
root `package.json` `pnpm` field. Having it only in the workspace yaml builds fine
locally yet fails the host install. Keep both lists in sync.

**How to apply:** when deploying this repo to a non-Replit Node host and the install
errors on ignored builds, confirm the root `package.json` has
`pnpm.onlyBuiltDependencies` listing every native dep that needs a build script
(currently `@swc/core`, `esbuild`, `msw`, `unrs-resolver`).

**Also:** root `package.json` pins `packageManager: pnpm@<version>` so hosts using
corepack run the same pnpm that honors these allowlists. If the host STILL reports
the ignored-builds error after the allowlist is in place, the host is almost always
building a STALE commit — it pulls from the user's git remote (e.g. GitHub), not
from Replit checkpoints, so the fix must be pushed to that remote / a fresh deploy
triggered from the latest commit.

# Shared hosting (Passenger / CloudLinux Node.js Selector)

Shared hosting can't run the pnpm monorepo build and runs Node via Passenger, not a
raw `node` process. `pnpm run build:hostinger` (root `build-hostinger.mjs`) solves
this: it runs `build:standalone` then assembles a self-contained `./deploy` folder
to zip and upload to the hPanel Node.js app root.

**Why it works:** esbuild already bundles ALL npm deps into a single
`dist/index.mjs`, so the upload needs NO node_modules. `deploy/app.js` is a
CommonJS Passenger startup shim that defaults `NODE_ENV=production` + `PORT`
(Passenger ignores the actual port via its listen() hijack) then `import()`s the
ESM bundle. `deploy/package.json` is minimal with no deps. Static frontend + SPA
fallback are served by the same process (prod block in app.ts); DB is external
Postgres (Neon), no MySQL involved.

**How to apply:** rebuild with `pnpm run build:hostinger`, upload `deploy/` contents,
set startup file `app.js`, Node 20+/24, and env vars DATABASE_URL/SESSION_SECRET/
ADMIN_PASSWORD in hPanel. `deploy/` is gitignored.
