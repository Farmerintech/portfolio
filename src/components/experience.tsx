"use client";

import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

import Reveal from "./motion/reveal";
import Section from "./section";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { SmartText } from "./placeholder";
import { experience, type Experience as Job } from "@/lib/data";

/**
 * Where each card pins, measured from the top of the viewport.
 *
 * The first clears the fixed header — 64px tall once the page is scrolled, which
 * it always is by the time this section is on screen — with room to spare. Every
 * card after it steps down by `STACK_STEP`, so a settled deck shows a band of
 * each card underneath the one on top. That band is the whole point of the
 * pattern: without it, a card sliding over another reads as a glitch rather than
 * as a deck.
 *
 * The step is wider than it looks like it needs to be because the cards are
 * `rounded-2xl` — a 34px corner — so a band narrower than that shows nothing but
 * the curve.
 */
const STACK_TOP = 112;
const STACK_STEP = 28;

/**
 * Text-only card. It wears whatever ground its entry scopes with `data-tone` —
 * no colour is named in here at all.
 *
 * Two classes do the work, and they are the same two the Projects cards use.
 * `section-ground` paints the ground itself and beats the Card's own `bg-card`,
 * because it is unlayered and an unlayered rule wins over anything in Tailwind's
 * `@layer utilities` (see README) — so the card is the tone flat out, the true
 * palette colour rather than a lift of it. `tone-surface` then re-derives every
 * surface token inside (muted ink, borders, the badge ground, the link colour)
 * from that same pair, so a card on the green ground inks cream and a card on
 * cream inks green without a single conditional class below. It is the trick the
 * sections use, one level down.
 *
 * The card used to carry a screenshot strip across the top, which put the three
 * sites' unrelated brand palettes (DutyCalc's teal, Citadel-i's orange, rafiqHQ's
 * green) on a page whose own colours are only the five palette tones, and pushed
 * the card past a laptop viewport. The strip is gone; the colour a card gets now
 * is the page's own, chosen deliberately rather than borrowed from the client's
 * logo.
 */
function ExperienceCard({ job }: { job: Job }) {
  return (
    <Card className="tone-surface section-ground group transition-shadow duration-300 hover:shadow-lift">
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-xl font-semibold">{job.company}</h3>
          <SmartText
            as="span"
            text={job.dates}
            className="font-mono text-sm text-muted-foreground"
          />
        </div>

        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {job.role}
        </p>

        <SmartText text={job.summary} className="mt-4 text-muted-foreground" />

        <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed">
          {job.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40"
              />
              <SmartText as="span" text={point} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <ul className="flex flex-wrap gap-1.5">
            {job.tech.map((tech) => (
              <li key={tech}>
                <Badge variant="subtle" className="font-mono">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>

          {(job.url || job.app) && (
            <div className="ml-auto flex flex-wrap items-center gap-4">
              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2"
                >
                  Visit site
                  <ArrowUpRight className="size-4" />
                </a>
              )}
              {job.app && (
                <a
                  href={job.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2"
                >
                  Get the app
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * The three jobs, dealt out as a deck.
 *
 * Every entry is `position: sticky` (see `.stack-item` in globals.css) and they
 * are all siblings, so each one's containing block is the whole list — which is
 * what lets a pin survive past its own row and stay held while the next card
 * climbs over it. That climb is the entire effect, and it needs no JavaScript:
 * the cards are in flow one after another, later ones paint over earlier ones by
 * DOM order, and the only thing making the pile up is that none of them scrolls
 * away when it reaches the top. Each card therefore holds for roughly its own
 * height of scrolling — about a screenful, near enough to the ~50vh-per-card
 * this was tuned to.
 *
 * `STACK_TOP + i * STACK_STEP` is what turns that pile into a *deck*: every card
 * stops a little lower than the one before, so the top edge of everything
 * underneath stays visible.
 *
 * Reads as a plain column on phones and under reduced motion — see the media
 * queries in globals.css for why.
 */
export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 / Experience"
      title="Where I've built and shipped."
    >
      {/* The tone scope is the `<li>`, so `--section-bg` inside a card is *that
          card's* colour and the card re-derives its whole ink set from it. */}
      <ol>
        {experience.map((job, i) => (
          <li
            key={job.company}
            data-tone={job.tone}
            className="stack-item"
            /* A custom property rather than `top` directly: `top` on a
               non-sticky box would still offset it, and below `md` — and again
               under reduced motion — these cards are not sticky. The property is
               inert until the media query reads it. */
            style={
              {
                "--stack-top": `${STACK_TOP + i * STACK_STEP}px`,
              } as CSSProperties
            }
          >
            {/* Reveal sits *inside* the sticky box, never around it: it leaves a
                residual `filter: blur(0px)` behind, and a filter — like a
                transform — makes its element a containing block, which would
                quietly stop the sticky child from ever pinning. `blur={false}`
                also keeps the filter off the big pinned surfaces. */}
            <Reveal blur={false}>
              <ExperienceCard job={job} />
            </Reveal>
          </li>
        ))}

        {/* Trailing room, and it has to be in here: the entries' containing block
            is this list, so the last card can only pin for as long as the list
            continues below it. Without this it would slide off the moment it
            arrived instead of settling over the card beneath it.

            An empty `<li>` because an `<ol>` may not hold anything else. Hidden
            wherever the deck isn't running — a phone, or reduced motion — where
            it would just be a dead stretch of ground at the end of the section. */}
        <li aria-hidden="true" className="hidden h-[30vh] md:motion-safe:block" />
      </ol>
    </Section>
  );
}
