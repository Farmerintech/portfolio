"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { sectionTones } from "@/lib/section-palette";

/**
 * Crossfades one section's ground into the next as it scrolls into view — the
 * only file on the site that knows GSAP exists.
 *
 * How it works, in order:
 *   1. Read each section's authored colours back out of the stylesheet.
 *   2. Seed every section below the fold with the colour of the section above
 *      it, so each one has something to tween *from*.
 *   3. Give each section one ScrollTrigger that tweens its own
 *      `--section-bg` / `--section-fg` from the previous section's pair to its
 *      own. Because every surface token is derived from those two values in
 *      globals.css, the cards, borders, muted text and the seam graphic all
 *      re-colour as part of the same tween — no per-element animation.
 *
 * The header is driven by the same triggers, so it always matches the section
 * passing underneath it.
 *
 * Reduced motion: nothing is created at all. Each section simply keeps its
 * authored colour, which makes the swap between sections instant — the correct
 * fallback, and it means no scroll listeners are installed.
 *
 * Note on Lenis: Lenis performs *real* window scrolling rather than a transform
 * fake, so ScrollTrigger's own scroll listener tracks it without a bridge. The
 * `gsap.ticker` + `lenis.raf` bridge would be needed only if a scrub were added,
 * or if the grounds are ever seen lagging the scroll.
 */

/** Seconds for a ground to crossfade into the next. */
const DURATION = 0.7;
const EASE = "power2.inOut";

/** Where in the viewport an arriving section starts its crossfade. */
const START = "top 85%";

/**
 * Any valid CSS colour to the `rgb()` form GSAP interpolates most predictably.
 *
 * Done through the engine rather than by parsing: the value is assigned to a
 * real `color` and read back, so it does not matter whether the browser
 * serialised the registered custom property as hex, `rgb()` or `oklch()`.
 */
function normalise(value: string): string {
  const probe = document.createElement("span");
  probe.style.display = "none";
  probe.style.color = value.trim() || "inherit";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved;
}

type Colours = { bg: string; fg: string };

export default function SectionTransition() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const targets = sectionTones.flatMap((tone) => {
      const el = document.getElementById(tone.id);
      return el ? [{ tone, el }] : [];
    });
    if (targets.length === 0) return;

    const nav = document.querySelector<HTMLElement>("[data-nav-shell]");

    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;

    const apply = (el: HTMLElement, c: Colours) => {
      el.style.setProperty("--section-bg", c.bg);
      el.style.setProperty("--section-fg", c.fg);
    };

    const setup = () => {
      ctx?.revert();

      ctx = gsap.context(() => {
        // 1. Authored colours. Anything a previous run left inline is cleared
        //    first, or we would read back our own tween output instead of the
        //    stylesheet's value.
        for (const { el } of targets) {
          el.style.removeProperty("--section-bg");
          el.style.removeProperty("--section-fg");
        }
        const finals: Colours[] = targets.map(({ el }) => {
          const cs = getComputedStyle(el);
          return {
            bg: normalise(cs.getPropertyValue("--section-bg")),
            fg: normalise(cs.getPropertyValue("--section-fg")),
          };
        });

        // Reduced motion stops here: the inline values are already gone, so
        // every section shows its own authored colour and swaps instantly.
        if (reduced.matches) return;

        // 2. Seed. Each section starts wearing the colour it is arriving over.
        targets.forEach(({ el }, i) => {
          if (i > 0) apply(el, finals[i - 1]);
        });
        if (nav) apply(nav, finals[0]);

        // 3. One trigger per transition.
        targets.forEach(({ el }, i) => {
          const from = finals[i === 0 ? 0 : i - 1];
          const to = finals[i];

          // A deep link or a restored scroll position can land past a section's
          // start. Landing it on its final colour keeps that first frame
          // correct instead of leaving it wearing the section above.
          if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            apply(el, to);
            if (nav && i > 0) apply(nav, to);
            return;
          }

          ScrollTrigger.create({
            trigger: el,
            start: START,
            once: true,
            onEnter: () => {
              const ground = { ...from };
              gsap.to(ground, {
                ...to,
                duration: DURATION,
                ease: EASE,
                onUpdate: () => apply(el, ground),
              });

              if (nav) {
                const shell = { ...from };
                gsap.to(shell, {
                  ...to,
                  duration: DURATION,
                  ease: EASE,
                  onUpdate: () => apply(nav, shell),
                });
              }
            },
          });
        });
      });
    };

    setup();

    // The authored colours change with the theme, so the whole thing is rebuilt
    // when `data-theme` flips — otherwise the inline values a tween left behind
    // would hold the old theme's colours on screen.
    const observer = new MutationObserver(setup);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
      ctx?.revert();
      // Leave the sections owned by the stylesheet again, so a route change or a
      // remount cannot start from a stale inline colour.
      for (const { el } of targets) {
        el.style.removeProperty("--section-bg");
        el.style.removeProperty("--section-fg");
      }
      nav?.style.removeProperty("--section-bg");
      nav?.style.removeProperty("--section-fg");
    };
  }, []);

  return null;
}
