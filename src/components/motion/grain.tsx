import { cn } from "@/lib/utils";

/**
 * Film-grain overlay. Sits above the page but never intercepts input, and is
 * removed entirely when printing. The noise itself is a tiled feTurbulence SVG
 * defined by the .grain::after rule in globals.css.
 */
export default function Grain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grain print-hide pointer-events-none fixed inset-0 z-[70]",
        className
      )}
    />
  );
}
