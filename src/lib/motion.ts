import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary. Every animation on the site pulls from here so the
 * whole page moves with one personality: fast out, soft settle, slight
 * overshoot on interactive elements ("playful"), never bouncy on text.
 */

/* Typed as mutable 4-tuples rather than `as const`: framer-motion's
   BezierDefinition is [number, number, number, number], which a readonly tuple
   is not assignable to. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 210,
  damping: 26,
  mass: 0.9,
};

/** Playful overshoot — for buttons, chips, anything the user directly touches. */
export const springPop: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 18,
  mass: 0.6,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/** Parent that staggers its children in sequence. */
export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

/**
 * Default viewport config for scroll reveals. `once` keeps things calm on the
 * way back up; a negative margin triggers slightly before the element is
 * fully on screen so the motion reads as "arriving" rather than "popping".
 */
export const viewportOnce = { once: true, margin: "-80px" } as const;
