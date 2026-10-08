"use client";

import { MotionConfig } from "framer-motion";

import SectionTransition from "./motion/section-transition";
import SmoothScroll from "./motion/smooth-scroll";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

/**
 * Client-side providers.
 *
 * `MotionConfig reducedMotion="user"` makes every framer-motion animation on
 * the site honour prefers-reduced-motion automatically — transform and opacity
 * animations are skipped rather than merely shortened. It does *not* cover GSAP,
 * which is why SectionTransition carries its own matchMedia guard.
 *
 * SectionTransition sits inside the Lenis tree and after the page content, so it
 * wires up against a committed DOM.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <SmoothScroll>
          {children}
          <SectionTransition />
        </SmoothScroll>
        <Toaster />
      </TooltipProvider>
    </MotionConfig>
  );
}
