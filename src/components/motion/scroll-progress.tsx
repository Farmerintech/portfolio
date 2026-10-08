"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin bar across the top showing read progress.
 * Springs the raw scroll progress so it never snaps, and is dropped in print.
 *
 * Painted in the CTA red rather than the section ink: this bar sits above the
 * header, outside any section's tone scope, and has to stay visible over all
 * four grounds. Red is the one palette colour that is never a ground, so it is
 * the only one that can never disappear into the page.
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
      className="bg-cta print-hide fixed inset-x-0 top-0 z-[80] h-[3px] origin-left"
    />
  );
}
