"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Magnetic hover: the child drifts toward the pointer, then springs home.
 *
 * Guardrails:
 *  - Only active for fine pointers (never on touch, where there is no hover).
 *  - Reduced-motion users get no transform at all.
 *  - Keyboard focus is untouched: the element still receives focus normally and
 *    the transform always returns to zero on leave/blur, so the focus ring
 *    never ends up displaced.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.32,
  radius = 90,
}: {
  children: React.ReactNode;
  className?: string;
  /** 0–1; how far the child follows the pointer. */
  strength?: number;
  /** Extra slop around the element that still triggers the pull, in px. */
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const x = useSpring(0, { stiffness: 240, damping: 16, mass: 0.5 });
  const y = useSpring(0, { stiffness: 240, damping: 16, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const withinX = Math.abs(dx) < rect.width / 2 + radius;
      const withinY = Math.abs(dy) < rect.height / 2 + radius;

      if (withinX && withinY) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, radius, strength, x, y]);

  if (!enabled) {
    return <div className={cn("inline-flex", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
