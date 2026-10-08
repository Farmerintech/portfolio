import type { SeamShape } from "@/lib/section-palette";
import { cn } from "@/lib/utils";

/**
 * The edge where one section's ground meets the next.
 *
 * An SVG filled with *this* section's colour, parked at its top edge and pulled
 * up over the section above with `-translate-y-full` — so the incoming colour
 * reads as flowing up into place rather than arriving as a straight line. The
 * transparent upper part of the box lets the previous section's colour show
 * through, which is what forms the shape.
 *
 * The fill is `currentColor` against `.seam-fill`, which globals.css binds to
 * `--section-bg`. That means the shape follows the ground for free: when the
 * scroll transition tweens that variable, the seam animates in lockstep with no
 * extra wiring, and it re-colours correctly on a theme swap too.
 *
 * `preserveAspectRatio="none"` lets one path stretch to any viewport width, so
 * the crests widen on a large screen instead of multiplying in number.
 */

/** Two crests and two troughs, mean line at y=40. */
const WAVE =
  "M0 72 V40 C 120 12, 240 12, 360 40 S 600 68, 720 40 S 960 12, 1080 40 S 1320 68, 1440 40 V72 Z";

/**
 * Lobes of uneven width and depth hanging from a flat edge, so it reads as
 * something dripping rather than as a regular scallop.
 */
const DRIP =
  "M0 72 V28 C 30 74, 90 74, 120 28 H 300 C 324 68, 372 68, 396 28 H 600 C 632 78, 712 78, 744 28 H 960 C 978 62, 1026 62, 1044 28 H 1240 C 1268 72, 1332 72, 1360 28 H 1440 V72 Z";

export default function SectionSeam({
  shape,
  className,
}: {
  shape: SeamShape;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      className={cn(
        "seam-fill print-hide pointer-events-none absolute inset-x-0 top-0 h-12 w-full -translate-y-full sm:h-16 md:h-[72px]",
        className
      )}
    >
      <path fill="currentColor" d={shape === "wave" ? WAVE : DRIP} />
    </svg>
  );
}
