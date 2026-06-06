---
name: Noviatify branding & object storage
description: How admin-editable branding (logo/favicon/name/slogan) and the object-storage upload/serve routes are wired and why serving is public.
---

# Branding via object storage

Admins edit logo, favicon, site name, and slogan from the admin dashboard. These
live in the CMS content tree under `site.brand` (`name`, `slogan`, `logoUrl`,
`faviconUrl`) and persist through the normal whole-tree content PUT — same pattern
as all other editable text.

## Asset URL convention
- Uploaded assets are stored as object paths like `/objects/<id>`.
- The frontend resolves `/objects/..` → `/api/storage/objects/..` and falls back
  to the bundled logo/favicon when the URL is empty. Keep that resolver as the one
  place that maps stored paths to servable URLs.

## Public serving is intentional — do not "lock it down" blindly
**Decision:** `GET /api/storage/objects/*` is intentionally public (no auth/ACL).
**Why:** the only writer is the admin-gated upload endpoint, and every uploaded
object is a public branding image meant for all visitors. The ACL framework was
copied from the template but left commented for this reason.
**How to apply:** if private/per-user uploads are ever added, you MUST gate this
route with auth + ACL before storing anything non-public there. The upload
endpoint also restricts `contentType` to `image/*` as defense-in-depth.

## Favicon sync gotcha
`BrandHead` must reset the `<link rel="icon">` back to the bundled default when
`faviconUrl` is cleared — an early-return on empty leaves a stale favicon in the
tab. Always handle both set-and-clear branches in the effect.

## Template typecheck quirk
`objectStorage.ts` `signObjectURL` does `await response.json()` which is typed
`unknown` under strict TS — cast the destructure (`as { signed_url: string }`).
The api-server `dev` build uses esbuild (no tsc), so this only surfaces via
`pnpm --filter @workspace/api-server run typecheck`; always run it after server edits.
