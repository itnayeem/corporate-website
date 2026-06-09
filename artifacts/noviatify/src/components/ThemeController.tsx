import { useEffect } from "react";
import { useContent } from "@/content/ContentContext";

/**
 * Applies the site-wide theme chosen by the owner.
 *
 * The theme is stored in the content document (`site.theme`). When it is
 * "light" we remove the `dark` class from <html>; otherwise we keep/add it.
 * `main.tsx` adds `dark` up front so the default first paint is dark with no
 * flash; this only flips to light once the saved content says so.
 */
export default function ThemeController() {
  const theme = useContent().site.theme;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  return null;
}
