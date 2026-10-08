"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Scroll-linked depth. Translates its children as the element travels through
 * the viewport. Uses a ref-scoped useScroll (not the global page scroll) so
 * multiple instances on one page don't fight over the same progress value.
 */
export default function Parallax({
  children,
  className,
  /** Peak travel in px at each end of the range. Negative = moves up. */
  distance = 70,
  spring = true,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  spring?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 110, damping: 30, mass: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ y: spring ? y : raw }}
    >
      {children}
    </motion.div>
  );
}
