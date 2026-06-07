---
name: tsc --build stale tsbuildinfo
description: Why composite lib declarations can be missing after a clean install, causing TS6305 in artifacts.
---

The `lib/*` packages are composite and emit `.d.ts` into `lib/*/dist` via `tsc --build` (run by `npm run typecheck:libs`). The build output is gitignored, but each lib's `tsconfig.tsbuildinfo` may persist on disk.

**Symptom:** after a fresh `npm install` (or after wiping/relocating node_modules), `lib/*/dist` is absent but `tsc --build` reports success and emits nothing. Leaf artifacts then fail with `TS6305: Output file '.../lib/<x>/dist/index.d.ts' has not been built from source file ...`, plus cascading implicit-`any` (TS7006) errors because the lib types resolve to `any`.

**Why:** the stale `tsconfig.tsbuildinfo` tells `tsc --build` the project is up-to-date, so it skips emit even though `dist` doesn't exist.

**How to apply:** run a one-time `npx tsc --build --force` (forces emit and recreates `dist`). Afterwards normal `npm run typecheck` / `typecheck:libs` works again.
