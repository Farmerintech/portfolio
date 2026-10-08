"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#";

/**
 * Decoding/scramble effect for the hero name.
 *
 * Hydration: the initial state is the *final* string, so the server and the
 * first client render always agree. The scramble only starts in an effect.
 *
 * Accessibility: the scrambled glyphs are aria-hidden and the real text is
 * exposed via aria-label, so a screen reader never hears noise mid-animation.
 */
export default function ScrambleText({
  text,
  className,
  duration = 1.1,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: "span" | "h1" | "p";
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    // Deterministic PRNG — avoids Math.random() churn and keeps frames stable.
    let seed = 0x2f6e2b1;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    const startAt = performance.now() + delay * 1000;
    const totalMs = Math.max(220, duration * 1000);

    const tick = (now: number) => {
      if (now < startAt) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(1, (now - startAt) / totalMs);
      // Slight lead so the tail resolves before the last frame, then snap.
      const revealed = Math.floor(progress * text.length * 1.2);

      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealed) return ch;
            return GLYPHS[Math.floor(rand() * GLYPHS.length)];
          })
          .join("")
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [text, duration, delay]);

  return (
    <Tag className={cn(className)} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
