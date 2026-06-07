---
name: Replit npm install quirks
description: Hard-won lessons about running `npm install` and clearing node_modules inside the Replit container.
---

## Foreground installs orphan-survive; backgrounded ones get killed
- A plain **foreground** `npm install` keeps running as an orphan even after the agent's shell command hits its timeout (the wrapper returns -1/124/137 but `npm` keeps going). Launch it, then poll for `package-lock.json` and for the process to exit (`pgrep -f "npm install"`), and read npm's own debug log under `~/.npm/_logs/` for the real status.
- **Backgrounded** installs (`nohup ... &`, `setsid ... &`) often get killed almost immediately (debug log stops right after config load). Do NOT rely on them for the heavy install. Light, fast detached commands are fine.
- **Why:** the tool wrapper SIGKILLs its own process group on timeout, but a foreground child that survives the wrapper exit becomes an orphan that keeps running; backgrounded children spawned via the wrapper get reaped early.

## Clearing node_modules: rename within the same filesystem, never mv to /tmp
- `/tmp` is a **different filesystem** from `/home/runner/workspace`, so `mv node_modules /tmp/...` does a full recursive **copy** (slow, times out / SIGKILLed).
- To clear node_modules instantly, rename within the workspace: `mv node_modules nm_trash` (O(1) rename), then `rm -rf nm_trash` (foreground; it orphan-survives like installs do). `rm -rf` of a huge tree directly also gets killed mid-run, but the orphan keeps deleting — poll and re-check.
- A mixed pnpm/npm `node_modules` makes `npm install` fail with `ENOTEMPTY` on rename (e.g. drizzle-kit). Always start from a clean (renamed-away) node_modules.

## Package proxy 502 on un-rewritten tarball URLs
- The proxy is `http://package-firewall.replit.local`. Packuments/tarballs are served under a **`/npm/` path prefix** (e.g. `/npm/<pkg>` and `/npm/<pkg>/-/<file>.tgz`).
- Some packuments advertise a `dist.tarball` pointing at the raw upstream `https://registry.npmjs.org/...`. The firewall host-swaps that to `http://package-firewall.replit.local/<pkg>/-/...` **without** the `/npm/` prefix → persistent **HTTP 502** for that one package (observed with `npm-run-path@6.0.0`), while the same tarball at `/npm/<pkg>/-/...` returns 200.
- **Workaround:** download the working `/npm/...` tarball with curl, then `npm cache add /path/to/file.tgz` to seed npm's content-addressable cache (keyed by integrity). Re-run the install — npm resolves it from cache and skips the broken network fetch. Handle additional offending packages the same way if the install fails on another one.
- **How to apply:** when `npm install` hangs/fails with E502 on one tarball, check the packument's `dist.tarball` (`curl http://package-firewall.replit.local/npm/<pkg> | grep tarball`). If it's a `registry.npmjs.org` URL, seed the cache from the `/npm/` path.
