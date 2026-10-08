"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar across the top showing read progress.
 * Springs the raw scroll progress so it never snaps, and is dropped in print.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-brand-gradient print-hide fixed inset-x-0 top-0 z-[80] h-[3px] origin-left"
    />
  );
}
