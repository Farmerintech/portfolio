"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

const word: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.72, ease: EASE_OUT_EXPO },
  },
};

/**
 * Word-by-word masked reveal for headings.
 *
 * Accessibility: the split words are hidden from assistive tech and the
 * original string is exposed once via aria-label on the heading itself, so
 * screen readers get one clean sentence instead of disjointed fragments.
 */
export default function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  as: Tag = "h2",
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  once?: boolean;
}) {
  const words = text.split(" ");

  return (
    <Tag className={cn(className)} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-70px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            /* overflow-hidden does the masking; the padding keeps descenders
               (g, y, p) from being clipped by it. */
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span className="inline-block" variants={word}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
