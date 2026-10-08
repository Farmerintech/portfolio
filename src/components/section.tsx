import Reveal from "./motion/reveal";
import SectionSeam from "./section-seam";
import TextReveal from "./motion/text-reveal";
import { toneBefore, toneFor } from "@/lib/section-palette";
import { cn } from "@/lib/utils";

/**
 * Section shell: an eyebrow pill, a line-by-line masked heading reveal, and a
 * consistent rhythm. Every section on the page goes through this so spacing and
 * heading treatment can't drift.
 *
 * The section also owns its ground. `data-tone` picks the palette pair out of
 * globals.css and `tone-surface` derives every surface token from it, so the
 * cards, borders and muted text inside are all mixed from this section's own two
 * colours. The tone and the seam shape both come from the same ordered array in
 * lib/section-palette.ts — nothing is hard-coded here.
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
  const tone = toneFor(id);
  /* The seam belongs to the section arriving, and there is nothing to arrive
     over at the top of the page — so the opening section gets none. */
  const previous = toneBefore(id);

  return (
    <section
      id={id}
      data-tone={tone.tone}
      className={cn(
        "tone-surface section-ground relative scroll-mt-24 py-24 md:py-32",
        className
      )}
    >
      {previous && <SectionSeam shape={tone.seam} />}

      <div className="mx-auto max-w-6xl px-6">
        <Reveal blur={false}>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span aria-hidden="true" className="bg-primary size-1.5 rounded-full" />
            {eyebrow}
          </span>
        </Reveal>

        <TextReveal
          text={title}
          className="text-display mt-6 max-w-3xl font-display font-semibold tracking-tight"
        />

        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
