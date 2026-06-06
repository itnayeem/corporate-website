import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient progress bar pinned to the top of the viewport that fills as the
 * user scrolls the page. Purely decorative — adds motion without altering content.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left bg-gradient-to-r from-primary via-blue-400 to-primary"
    />
  );
}
