"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * 3D pointer tilt with a moving glare highlight.
 *
 * Deliberately does NOT use framer-motion's `layout` prop — combining layout
 * projection with a per-frame transform on every card in a filtering grid is
 * the classic source of jank. The grid animates its container; cards tilt
 * independently.
 */
export default function TiltCard({
  children,
  className,
  max = 9,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Peak rotation in degrees at the card's edge. */
  max?: number;
  glare?: boolean;
}) {
  const [enabled, setEnabled] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const sx = useSpring(px, { stiffness: 200, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 200, damping: 22, mass: 0.6 });

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  // Hooks must run unconditionally, so the glare gradient is derived here at
  // the top level and only *rendered* conditionally below.
  const glareX = useTransform(sx, [0, 1], [0, 100]);
  const glareY = useTransform(sy, [0, 1], [0, 100]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]: number[]) =>
      `radial-gradient(420px circle at ${gx}% ${gy}%, color-mix(in oklch, var(--section-fg) 24%, transparent), transparent 62%)`
  );

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={enabled ? { rotateX, rotateY, perspective: 1000 } : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300",
            enabled ? "opacity-0 group-hover:opacity-100" : "hidden"
          )}
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
