import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useGetContent } from "@workspace/api-client-react";
import { defaultContent, type SiteContent } from "./defaultContent";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Recursively merges an override object over a base object. Objects are merged
 * key by key; arrays and primitives from the override replace the base wholesale.
 */
export function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : (override as T);
  }
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(override)) {
    const baseVal = (base as Record<string, unknown>)[key];
    const overrideVal = override[key];
    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result as T;
}

const ContentContext = createContext<SiteContent>(defaultContent);

export function ContentProvider({ children }: { children: ReactNode }) {
  const { data } = useGetContent();
  const merged = useMemo<SiteContent>(() => {
    const override = data?.data;
    return override ? deepMerge(defaultContent, override) : defaultContent;
  }, [data]);

  return <ContentContext.Provider value={merged}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  return useContext(ContentContext);
}
