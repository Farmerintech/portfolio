"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Cursor-following radial glow.
 *
 * Desktop-only: on a coarse pointer there is no cursor to follow, so the layer
 * is not rendered at all. It never replaces or hides the native cursor, is
 * aria-hidden, and ignores pointer events completely.
 */
export default function Spotlight() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 110, damping: 24, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 110, damping: 24, mass: 0.7 });

  // Derived unconditionally at the top level — hooks may not be called
  // conditionally, even though the layer is only *rendered* when enabled.
  const background = useTransform(
    [sx, sy],
    ([cx, cy]: number[]) =>
      `radial-gradient(620px circle at ${cx}px ${cy}px, var(--glow-1), transparent 68%)`
  );

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="print-hide pointer-events-none fixed inset-0 -z-10"
      style={{ background }}
    />
  );
}
