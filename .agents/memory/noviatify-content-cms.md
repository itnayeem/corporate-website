---
name: Noviatify content CMS architecture
description: How the password-gated CMS and content model work for the Noviatify site, and the constraints to respect when editing pages.
---

# Noviatify content CMS

Single JSONB content document. Frontend ships `defaultContent` (composed from `src/content/defaults/*.ts` slices) as the baseline; the DB override is deep-merged over it.

**deepMerge rule:** objects merge recursively; arrays and primitives REPLACE. Saving any edit PUTs the entire merged tree, not a diff.

**Admin auth (single owner, intentionally simple):**
- Password compared with `timingSafeEqual` against `ADMIN_PASSWORD`.
- Success returns an HMAC token signed with `SESSION_SECRET` (12h TTL), stored in localStorage `noviatify_admin_token`, sent as Bearer.
- Server throws at startup if `SESSION_SECRET` is unset (no insecure fallback). Restart api-server after changing secrets.

**Why these constraints matter when editing pages:**
- Pages map visual metadata (icons/colors) from fixed local arrays indexed by content position. The CMS lets the owner add/remove array items, so ALWAYS index these metadata arrays with modulo (`arr[i % arr.length]`) — a bare `arr[i]` will crash the page when the owner adds an item.
- Any new user-visible text must live in a `src/content/defaults/*.ts` slice and be read via `useContent()`. Hardcoded strings in a page are invisible to the CMS and violate the "edit all text" requirement.
