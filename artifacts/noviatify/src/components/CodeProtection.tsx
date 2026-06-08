import { useEffect } from "react";

/**
 * Best-effort deterrents against casual "view source / inspect" attempts.
 *
 * IMPORTANT: this cannot truly hide front-end code — anything the browser
 * renders is ultimately readable. It only blocks the common shortcuts
 * (right-click, F12, Ctrl/Cmd+Shift+I/J/C, Ctrl/Cmd+U) to stop casual snooping.
 *
 * Only runs on the production build so it never interferes with development,
 * the dev preview, or the admin in-place editing workflow.
 */
export default function CodeProtection() {
  useEffect(() => {
    if (!import.meta.env.PROD) return;

    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      // F12 — open DevTools
      if (key === "f12") {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+Shift+I / J / C — DevTools / console / element picker
      if (ctrlOrCmd && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+U — view source
      if (ctrlOrCmd && key === "u") {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
