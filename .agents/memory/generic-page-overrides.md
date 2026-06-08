---
name: Generic page per-page content overrides
description: How GenericPage renders topic-distinct bodies while keeping a shared fallback and correct admin edit paths.
---

# Generic page per-page overrides

`GenericPage.tsx` renders the many "generic" marketing routes (`/services/*`,
`/about/*`, `/order-status`, `/research`, `/start`, `/login`). The hero is always
per-page (`site.genericPages.<key>.{title,subtitle,description,cta}`). The body
sections (whyTitle/whySubtitle, features, steps, testimonials, faqs,
ctaTitle/ctaSubtitle) are resolved through a `resolve(key)` helper:

- If the page's `genericPages[key]` entry defines that field, use it and target
  edits at `site.genericPages.<pageKey>.<field>`.
- Otherwise fall back to `site.genericShared.<field>` and edit there.

**Why:** Originally every generic page shared the entire body from
`genericShared`, so all of them looked identical below the hero. Per-page
overrides make each page topic-specific (e.g. registered-agent page explains
changing/getting an agent) without forcing every page to redefine everything.

**How to apply:**
- To make a generic page distinct, add the body fields to its `genericPages`
  entry in `content/defaults/site.ts`. Omit any field to inherit the shared one.
- The Editable `path` is computed from where the data actually lives, so in-place
  admin editing always writes to the field being shown.
- Persisted content is JSON (no `undefined`), so the `!== undefined` override
  check is reliable; arrays always exist via the shared fallback.
- `/pricing` route renders the dedicated `Pricing` component, not `GenericPage` —
  its `genericPages["/pricing"]` entry is unused.
