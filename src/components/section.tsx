import Reveal from "./motion/reveal";
import TextReveal from "./motion/text-reveal";
import { cn } from "@/lib/utils";

/**
 * Section shell: an eyebrow pill, a masked word-by-word heading reveal, and a
 * consistent rhythm. Every section on the page goes through this so spacing and
 * heading treatment can't drift.
 */
export default function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 md:py-32", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal blur={false}>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span
              aria-hidden="true"
              className="bg-brand-gradient size-1.5 rounded-full"
            />
            {eyebrow}
          </span>
        </Reveal>

        <TextReveal
          text={title}
          className="mt-6 max-w-3xl font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-[1.06] tracking-tight"
        />

        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
