import { type ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Wraps page content with a smooth enter transition used between route changes.
 * Animates opacity and a small vertical offset only — no layout or content change.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
