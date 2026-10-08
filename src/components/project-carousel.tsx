"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./ui/button";

/**
 * The Projects row: one card per view on a phone, two from sm, three from lg —
 * the widths are `.project-slide` in globals.css.
 *
 * It is a real scroll container rather than a transform-based carousel, so touch,
 * trackpad, keyboard and the arrows all drive the same thing and there is no
 * second position to keep in sync. `snap-x snap-mandatory` on the track makes
 * every gesture land on a card edge.
 *
 * Motion, in two parts:
 *  - The arrows step exactly one card. The distance is measured off the DOM
 *    (the gap between the first two slides) rather than assumed, so the step
 *    stays right at every breakpoint and after a resize.
 *  - **On a phone only**, the row advances itself and wraps at the end. Autoplay
 *    is a phone affordance: with a single card visible there is nothing on screen
 *    to suggest more exist. A finger on the row pauses it, and lifting resumes.
 *    It never starts under `prefers-reduced-motion`, which also makes the arrow
 *    steps instant rather than smooth.
 */
const STEP_MS = 4000;

/** Matches the one-card breakpoint of `.project-slide` in globals.css. */
const ONE_CARD = "(max-width: 639.98px)";

const REDUCE = "(prefers-reduced-motion: reduce)";

export default function ProjectCarousel({
  label,
  children,
}: {
  /** Names the row for assistive tech, e.g. "Web projects". */
  label: string;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [held, setHeld] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: true });

  /** One slide plus the gap: how far a single step travels. */
  const stride = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const [first, second] = Array.from(track.children) as HTMLElement[];
    if (!first) return 0;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }, []);

  /** Which way the row can still move, so the arrows can disable themselves. */
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setEdges({ start: track.scrollLeft <= 1, end: track.scrollLeft >= max - 1 });
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      trackRef.current?.scrollBy({
        left: direction * stride(),
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [reduced, stride]
  );

  // A resize re-lays the slides out, which changes both the stride and whether
  // the row still overflows at all — so the arrows are re-checked on both.
  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced || held) return;

    // Asked directly as well as through the hook: `useReducedMotion` can report
    // `null` before it has read the query, and a `null` here would let the timer
    // arm anyway. The hook stays in the deps so a mid-session change still stops
    // it. Autoplay is the one thing on the site that moves without being asked.
    if (window.matchMedia(REDUCE).matches) return;

    const oneCard = window.matchMedia(ONE_CARD);
    let onScreen = false;
    let timer: number | undefined;

    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };

    const advance = () => {
      if (track.scrollWidth - track.clientWidth <= 0) return;
      // Wrap instead of stopping at the end: parked at the last card the row
      // looks finished, and on a phone that reads as nothing left to see.
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: stride(), behavior: "smooth" });
      }
    };

    const arm = () => {
      stop();
      if (!oneCard.matches || !onScreen) return;
      timer = window.setInterval(advance, STEP_MS);
    };

    // Only while the row is actually being looked at, so a timer is not running
    // for a section that is still two screens down (or has been scrolled past).
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        arm();
      },
      { threshold: 0.4 }
    );
    observer.observe(track);
    oneCard.addEventListener("change", arm);
    arm();

    return () => {
      stop();
      observer.disconnect();
      oneCard.removeEventListener("change", arm);
    };
  }, [held, reduced, stride]);

  return (
    <div
      role="group"
      aria-label={label}
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerCancel={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
    >
      <div className="mb-4 flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous projects"
          disabled={edges.start}
          onClick={() => step(-1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next projects"
          disabled={edges.end}
          onClick={() => step(1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div
        ref={trackRef}
        onScroll={sync}
        /* `py-4` with the matching negative margin: a scroll container cannot have
           `overflow-y: visible` — a scrollable x-axis forces y to `auto` — so the
           track clips vertically, and the tilt and hover shadow on each card need
           room inside that clip. The negative margin cancels the padding again so
           the section's vertical rhythm is unchanged. */
        className="scrollbar-none -my-4 flex snap-x snap-mandatory gap-5 overflow-x-auto py-4"
      >
        {children}
      </div>
    </div>
  );
}
