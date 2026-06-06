---
name: Noviatify admin auth & password change
description: How admin login/password works, and two non-obvious traps when editing api-server code.
---

# Admin auth

Single-owner admin. Login exchanges a password for an HMAC session token (signed with `SESSION_SECRET`, 12h TTL), stored in localStorage and sent as Bearer; `requireAdmin` verifies it.

## Password storage decision
- Admin password lives as a scrypt hash in the `admin_settings` key/value table (key `password_hash`), set via authed `PUT /api/admin/password` (requires the current password).
- `checkPassword` is **async**: it prefers the stored hash and **falls back to the `ADMIN_PASSWORD` env only when no hash is stored** (bootstrap before the owner ever changes it).
- **Why:** lets the owner change their password without touching env/secrets, while still booting from the env on a fresh DB. Don't remove the env fallback — it's the first-login path.
- Changing the password does NOT invalidate existing tokens (token is HMAC over an expiry, not tied to the password). Acceptable for single owner.

## Trap 1: api-server typecheck is NOT run by its workflow
- The `dev` script builds with esbuild (`build.mjs`) then `node` — esbuild does **no type checking**. So `tsc` errors are latent and the server can run fine while typecheck fails.
- After editing anything under `artifacts/api-server/src`, run `pnpm --filter @workspace/api-server run typecheck` explicitly. The architect/CI will catch what the workflow won't.

## Trap 2: `const SECRET` narrowing doesn't reach nested functions
- `const SECRET = process.env.SESSION_SECRET; if (!SECRET) throw;` narrows to `string` in module scope but **not inside `createToken`/`verifyToken` closures**, so `crypto.createHmac("sha256", SECRET)` errors TS2345 (`string | undefined`).
- Fix: guard on `process.env.SESSION_SECRET` then assign `const SECRET: string = process.env.SESSION_SECRET;` (explicit annotation), and use that.

## Frontend 401 handling for password change
- `requireAdmin` returns `{error:"Unauthorized"}` on a bad/expired token; a valid session with the wrong current password returns a different `{error}` message. Both are HTTP 401.
- In `ChangePasswordCard`, branch on `ApiError.data.error === "Unauthorized"` → clear token + redirect to `/admin`; otherwise show "current password is incorrect". Don't treat every 401 as wrong-password.
