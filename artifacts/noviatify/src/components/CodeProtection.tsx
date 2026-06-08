import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

const MESSAGE = "Inspect, View Source and Developer Tools are disabled.";

/**
 * Best-effort deterrents against casual "view source / inspect" attempts,
 * applied globally on every page.
 *
 * Blocks: right-click context menu, F12, Ctrl/Cmd+Shift+I, Ctrl/Cmd+Shift+J,
 * Ctrl/Cmd+Shift+C, and Ctrl/Cmd+U — and shows a custom on-screen message when
 * a blocked action is attempted.
 *
 * IMPORTANT: this cannot truly hide front-end code — anything the browser
 * renders is ultimately readable. It only deters casual snooping.
 */
export default function CodeProtection() {
  const [show, setShow] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const flash = () => {
      setShow(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setShow(false), 2600);
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      flash();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      const isF12 = key === "f12";
      const isDevtoolsCombo =
        ctrlOrCmd && e.shiftKey && (key === "i" || key === "j" || key === "c");
      const isViewSource = ctrlOrCmd && key === "u";

      if (isF12 || isDevtoolsCombo || isViewSource) {
        e.preventDefault();
        flash();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          role="alert"
          className="fixed bottom-6 left-1/2 z-[2147483647] -translate-x-1/2 pointer-events-none"
        >
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0b1638]/95 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/50 backdrop-blur">
            <ShieldAlert className="h-4 w-4 flex-shrink-0 text-amber-400" />
            <span>{MESSAGE}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
