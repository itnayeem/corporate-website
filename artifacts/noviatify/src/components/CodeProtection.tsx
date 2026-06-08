import { useEffect } from "react";

/**
 * Best-effort deterrents against casual "view source / inspect" attempts,
 * applied globally on every page — silently (no on-screen message).
 *
 * Blocks: right-click context menu, F12, Ctrl/Cmd+Shift+I, Ctrl/Cmd+Shift+J,
 * Ctrl/Cmd+Shift+C, and Ctrl/Cmd+U.
 *
 * IMPORTANT: this cannot truly hide front-end code — anything the browser
 * renders is ultimately readable. It only deters casual snooping.
 */
export default function CodeProtection() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      const isF12 = key === "f12";
      const isDevtoolsCombo =
        ctrlOrCmd && e.shiftKey && (key === "i" || key === "j" || key === "c");
      const isViewSource = ctrlOrCmd && key === "u";

      if (isF12 || isDevtoolsCombo || isViewSource) {
        e.preventDefault();
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
