"use client";

import { Fragment, useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Masked reveal for headings.
 *
 * Every word gets its own `overflow-hidden` box, and the words that share a
 * rendered line are given the same delay — so a line rises as one block under a
 * single mask edge, which is what reads as a line-by-line reveal.
 *
 * Grouping by measurement rather than by splitting the string means the breaks
 * follow whatever the browser actually does with the real font at the real
 * width. The measurement runs in a layout effect (before paint) and again once
 * `document.fonts.ready` settles and whenever the box is resized, so the cascade
 * never lags the wrapping.
 *
 * Accessibility: the split words are hidden from assistive tech and the original
 * string is exposed once via aria-label on the heading itself, so screen readers
 * get one clean sentence instead of disjointed fragments.
 */
export default function TextReveal({
  text,
  className,
  delay = 0,
  stagger,
  split = "line",
  as: Tag = "h2",
  once = true,
}: {
  text: string;
  className?: string;
  /** Delay before the first line starts, in seconds. */
  delay?: number;
  /** Seconds between consecutive lines (or words, when `split="word"`). */
  stagger?: number;
  /**
   * What the stagger counts. `line` (default) cascades one rendered line at a
   * time; `word` cascades every word individually, which suits a short headline
   * where a per-line cascade would flatten into a single beat.
   */
  split?: "line" | "word";
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  once?: boolean;
}) {
  const words = text.split(" ");
  const step = stagger ?? (split === "line" ? 0.09 : 0.055);

  const listRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  /** Measured line index per word; null until the first measurement lands. */
  const [lineOf, setLineOf] = useState<number[] | null>(null);

  const measure = useCallback(() => {
    const lines = new Map<number, number>();
    const next: number[] = [];

    for (const el of wordRefs.current) {
      if (!el) {
        next.push(0);
        continue;
      }
      const top = el.offsetTop;
      if (!lines.has(top)) lines.set(top, lines.size);
      next.push(lines.get(top)!);
    }

    // Re-render only when the grouping actually changed: a ResizeObserver that
    // set state on every callback would churn on its own re-renders.
    setLineOf((prev) =>
      prev && prev.length === next.length && prev.every((v, i) => v === next[i])
        ? prev
        : next
    );
  }, []);

  useLayoutEffect(() => {
    if (split === "word") {
      setLineOf(null);
      return;
    }

    measure();

    // The fallback face lays out differently from the webfont, so the first
    // grouping is provisional until the real fonts land.
    document.fonts?.ready.then(measure).catch(() => {});

    const box = listRef.current;
    if (!box) return;
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    return () => observer.disconnect();
  }, [measure, split, text]);

  const line: Variants = {
    hidden: { y: "115%", opacity: 0 },
    show: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.72, ease: EASE_OUT_EXPO, delay: i * step },
    }),
  };

  return (
    <Tag className={cn(className)} aria-label={text}>
      <motion.span
        ref={listRef}
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-70px" }}
        variants={{ hidden: {}, show: { transition: { delayChildren: delay } } }}
      >
        {words.map((w, i) => (
          /* The space between words is a sibling text node, not a character
             inside the word box. Each box is an `inline-block`, and CSS drops
             trailing whitespace at the end of a line inside one — so a space
             rendered in there is simply not there, and every heading on the site
             came out with its words run together. As a text node between two
             inline-blocks it renders normally, and it still collapses away
             correctly when a line breaks at that point. */
          <Fragment key={`${w}-${i}`}>
            <span
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              /* overflow-hidden does the masking; the padding keeps descenders
                 (g, y, p) from being clipped by it. */
              className="inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <motion.span
                className="inline-block"
                /* Before the first measurement every word resolves to line 0, so
                   the whole heading rises as one — then the cascade settles in the
                   same frame, before paint. */
                custom={lineOf ? (lineOf[i] ?? 0) : 0}
                variants={line}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
