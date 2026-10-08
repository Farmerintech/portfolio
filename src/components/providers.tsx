"use client";

import { MotionConfig } from "framer-motion";

import SmoothScroll from "./motion/smooth-scroll";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

/**
 * Client-side providers.
 *
 * `MotionConfig reducedMotion="user"` makes every framer-motion animation on
 * the site honour prefers-reduced-motion automatically — transform and opacity
 * animations are skipped rather than merely shortened.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster />
      </TooltipProvider>
    </MotionConfig>
  );
}
