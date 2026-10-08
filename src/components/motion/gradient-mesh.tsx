import { cn } from "@/lib/utils";

const BLOBS = [
  {
    className: "-top-[18rem] -left-[14rem] h-[42rem] w-[42rem]",
    color: "var(--glow-1)",
    duration: "26s",
  },
  {
    className: "top-[10%] -right-[18rem] h-[38rem] w-[38rem]",
    color: "var(--glow-2)",
    duration: "32s",
  },
  {
    className: "bottom-[-14rem] left-[18%] h-[34rem] w-[34rem]",
    color: "var(--glow-3)",
    duration: "29s",
  },
];

/**
 * Ambient drifting gradient blobs. Purely decorative: aria-hidden, behind all
 * content, stripped in print, and frozen by prefers-reduced-motion.
 * Animation is transform-only (see .animate-blob) so it stays off the main
 * thread's layout path.
 */
export default function GradientMesh({
  className,
  fixed = true,
}: {
  className?: string;
  fixed?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "print-hide pointer-events-none overflow-hidden",
        fixed ? "fixed inset-0 -z-10" : "absolute inset-0 -z-10",
        className
      )}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className={cn("animate-blob absolute rounded-full blur-[110px]", b.className)}
          style={
            {
              background: b.color,
              "--blob-duration": b.duration,
              animationDelay: `${i * -6}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
