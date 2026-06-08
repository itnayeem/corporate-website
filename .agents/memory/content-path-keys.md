---
name: Content path keys must not contain dots
description: How the noviatify CMS resolves Editable paths, and why route-style keys like "/terms" are safe but dotted keys would break.
---

# Content path keys must not contain dots

The noviatify inline CMS addresses content with dot-paths (e.g. `site.legalPages./terms.title`). `paths.ts` `getByPath`/`setByPath` and `Editable` split the path on `.` only.

**Rule:** any object key used inside a content path must NOT contain a `.`. Slash-prefixed route keys like `"/privacy"` / `"/terms"` are fine — they survive the split as one segment.

**Why:** a key containing `.` would be split into multiple segments and silently read/write the wrong (or a non-existent) node, breaking inline edit + save with no error.

**How to apply:** when adding new editable content sections keyed by route or id, use slash/hyphen keys, never dotted keys. Legal pages live in `site.legalPages` + `LegalPage.tsx` (a clean legal-document layout), kept separate from `site.genericPages` + `GenericPage.tsx` (the marketing template) on purpose.
