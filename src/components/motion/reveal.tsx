"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * The workhorse scroll reveal. Replaces the previous opacity+y-only version
 * with direction, blur and optional scale, so sections can be composed
 * without inventing new one-off animations.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  blur = true,
  scale = false,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
  as?: "div" | "li" | "section" | "article" | "span";
}) {
  const { x, y } = offset[direction];
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      scale: scale ? 0.96 : 1,
      filter: blur ? "blur(8px)" : "blur(0px)",
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration, delay, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent that staggers direct <RevealItem> children. Use when a grid should
 * cascade rather than every card animating at once.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-70px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
