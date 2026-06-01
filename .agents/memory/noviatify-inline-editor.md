---
name: Noviatify inline visual editor
description: How the WordPress/Elementor-style in-place text editor works on the public site, and the constraints that keep it consistent.
---

# Inline visual editor (edit-in-place)

Admins log in, browse the live public pages, and click any text to edit it in place; a floating toolbar saves the whole tree. This sits ON TOP of the existing content CMS (one JSONB doc deep-merged over `defaultContent`).

## Rules / constraints
- **Every editable bit of text on a page must be rendered through `<Editable path="<absolute slice path>" />`** (e.g. `home.entities.items.${i}.name`). The path is the dot-path into the content document, including array indices.
- **Do not mix `useContent()` (merged) reads with `Editable` (draft) reads for the same visible string.** During an edit session `getValue()` returns the draft, but `useContent()` returns the last-fetched merged snapshot — so a merged read won't reflect uncommitted edits. If a string appears in two places (e.g. a card heading and a CTA button), render BOTH via `Editable` so they stay in sync live.
- Pages still use `useContent()` for non-text data (hrefs, icon/color metadata arrays, `.map` iteration). Only the visible text goes through `Editable`.

## Key mechanics (the non-obvious parts)
- **Draft model:** on `enterEdit` the provider takes a `structuredClone` of the merged content into `draft`. `getValue` reads draft while editing, merged otherwise. `setValue` writes immutably via `setByPath`.
- **Save reconciliation:** `save()` PUTs `{data:{data:draft}}` via `useUpdateContent`, then sets `draft = deepMerge(defaultContent, response.data)` from the authoritative PUT response and bumps `rev`. **Why:** without re-syncing from the server response the edit view can drift from what's persisted and a later save can overwrite newer state.
- **`rev` counter forces remount** of every `Editable` (key is `path:rev`). Bumped on enter, discard, and save — needed because the fields are *uncontrolled* contentEditable (they read initial value once, commit on blur).
- **Link/button nav suppression:** `Editable` uses capture-phase `preventDefault + stopPropagation` on click/mousedown so wrapping wouter `<Link>`/`<button>` don't navigate while editing. This is sufficient for wouter Link.
- **Auth reactivity:** `adminAuth.ts` `setAdminToken`/`clearAdminToken` dispatch a `"noviatify-auth"` window event; the provider listens (plus `storage`) to flip `isAdmin` without a reload. Don't double-dispatch after calling `clearAdminToken()` — it already fires the event. A 401 on save clears the token and exits edit mode.

## Backend is unchanged
The login + authed GET/PUT persistence is the same proven backend as the base CMS; inline editing is a pure frontend layer over it.
