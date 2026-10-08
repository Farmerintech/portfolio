"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee.
 *
 * Implemented as a CSS transform animation rather than a motion loop: it runs
 * on the compositor, costs nothing per frame in JS, and is neutralised by the
 * reduced-motion block in globals.css.
 *
 * The track holds the children twice and translates -50%, which is what makes
 * the loop seamless.
 */
export default function Marquee({
  children,
  className,
  duration = 38,
  reverse = false,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full pass. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        // Feather the edges so items don't hard-clip at the viewport.
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "animate-marquee flex w-max shrink-0 items-center gap-3",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center gap-3" aria-hidden="false">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-3" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
