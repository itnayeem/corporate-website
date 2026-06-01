/**
 * Dot-path helpers for reading/writing into the nested content document.
 * Path segments are object keys or numeric array indices, e.g.
 * "home.hero.titlePrefix" or "home.services.items.0.full".
 */

export function getByPath(obj: unknown, path: string): unknown {
  if (!path) return obj;
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

/** Immutable set: clones along the path and writes `value` at the leaf. */
export function setByPath<T>(obj: T, path: string, value: unknown): T {
  const parts = path.split(".");
  if (parts.length === 0) return obj;
  const clone: Record<string, unknown> | unknown[] = Array.isArray(obj)
    ? [...(obj as unknown[])]
    : { ...(obj as Record<string, unknown>) };
  let cur: Record<string, unknown> | unknown[] = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const child = (cur as Record<string, unknown>)[key];
    const nextChild = Array.isArray(child)
      ? [...child]
      : { ...((child as Record<string, unknown>) ?? {}) };
    (cur as Record<string, unknown>)[key] = nextChild;
    cur = nextChild;
  }
  (cur as Record<string, unknown>)[parts[parts.length - 1]] = value;
  return clone as T;
}
