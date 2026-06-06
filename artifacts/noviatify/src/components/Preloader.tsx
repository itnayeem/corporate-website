import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteLogo from "@/components/SiteLogo";

const SESSION_KEY = "noviatify_intro_shown";

/**
 * Full-screen animated brand reveal shown once per browser session on first load.
 * Purely visual: it overlays the app, plays, then unmounts. No content is changed.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip the intro inside the admin area and on repeat visits this session.
    const isAdmin = window.location.pathname.includes("/owner");
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (isAdmin || seen) return;

    setShow(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setShow(false), 1700);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#060d2b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            document.body.style.overflow = "";
          }}
        >
          <div
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]"
            aria-hidden
          />
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SiteLogo className="h-12 w-auto" />
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.1,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
