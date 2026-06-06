---
name: Local upload storage
description: How branding image uploads are stored locally (no third-party file service) and the two non-obvious traps it introduces.
---

# Local upload storage (no third-party file service)

Branding image uploads (logo/favicon) are stored on the API server's local
filesystem under `artifacts/api-server/public/uploads/` (overridable via
`UPLOADS_DIR`), replacing Replit Object Storage / GCS. The Postgres DB only
stores the `/objects/<uuid>.<ext>` URL inside the content JSONB.

Flow (kept contract-compatible so the OpenAPI two-step survived the swap):
- POST `/storage/uploads/request-url` (admin) mints `<uuid>.<ext>` and returns a
  same-origin `uploadURL` (`/api/storage/uploads/<file>`) + `objectPath`.
- PUT `/storage/uploads/:filename` (admin, `express.raw`) writes the bytes.
- GET `/storage/objects/:filename` serves them.

## Trap 1: raw-fetch PUT must carry the Bearer token manually
The client uploads bytes with native `fetch(res.uploadURL, { method: "PUT" })`,
NOT a generated hook. `setAuthTokenGetter` only patches the generated
`customFetch`, so native `fetch` gets no token. Because the PUT route is now
first-party and admin-gated (the old GCS presigned PUT needed no auth), the
client must attach `Authorization: Bearer <getAdminToken()>` by hand.

**Why:** missing this returns 401 only at PUT time — request-url succeeds, so the
failure looks like "upload failed" rather than an auth problem.

## Trap 2: local files are ephemeral on scaled deploys
Files on local disk are not shared across instances and don't survive redeploys
(autoscale). The DB still references `/objects/...`, so images 404 after a deploy.
SiteLogo has an `onError` fallback to the bundled logo to avoid broken images.

**How to apply:** if uploaded branding must persist in production, deploy on a
single persistent instance (reserved VM with a disk), not autoscale.
