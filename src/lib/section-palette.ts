/**
 * The section colour timeline — the single place to reorder or re-point the
 * ground behind each part of the page.
 *
 * Only *structure* lives here: which sections exist, in what scroll order, which
 * palette tone each one wears, and which seam shape sits above it. The colours
 * themselves are CSS custom properties in globals.css (see `[data-tone=…]`), so
 * the palette stays swappable in one place as a CSS variable set while the
 * animation config stays in one file — as asked.
 *
 * `components/motion/section-transition.tsx` walks this array and tweens each
 * section's `--section-bg` / `--section-fg` from the previous entry's values, so
 * adding an entry here is all that is needed to bring a new section into the
 * crossfade.
 */

/**
 * The palette tones: the four colours a ground can be, as defined in
 * globals.css. Sections pick from these below; the Experience cards wear them
 * too (see `tone` on each entry in lib/data.ts) so that three cards on one pink
 * ground can be three different colours. Any element can carry a tone — put
 * `data-tone` and `tone-surface` on it and every surface token inside re-derives
 * from that pair instead of from the section's.
 */
export type ToneName = "green" | "cream" | "pink" | "vanilla";

/** Seam shapes. Alternated so two neighbouring seams never look the same. */
export type SeamShape = "wave" | "drip";

export type SectionTone = {
  /** Must match the section's DOM id — `<Section>` looks itself up by this. */
  id: string;
  tone: ToneName;
  /** The shape drawn at this section's top edge, in this section's colour. */
  seam: SeamShape;
};

/**
 * In scroll order. This array *is* the crossfade timeline, so keep it in the
 * order the sections actually appear on the page.
 *
 * Dark grounds (green) open and close the page; the middle runs through the
 * three light grounds. Neighbours always differ in lightness, which is what
 * makes the transition legible as you scroll.
 */
export const sectionTones: SectionTone[] = [
  { id: "home", tone: "green", seam: "wave" },
  { id: "stack", tone: "cream", seam: "drip" },
  { id: "experience", tone: "pink", seam: "wave" },
  { id: "projects", tone: "vanilla", seam: "drip" },
  { id: "about", tone: "cream", seam: "wave" },
  { id: "contact", tone: "green", seam: "drip" },
  { id: "footer", tone: "green", seam: "wave" },
];

/** Tone for a section id, falling back to the opening ground. */
export function toneFor(id: string): SectionTone {
  return sectionTones.find((t) => t.id === id) ?? sectionTones[0];
}

/**
 * The entry immediately before `id` in scroll order — the colour the transition
 * tween starts from. `null` for the first section, which has nothing above it and
 * so gets no seam.
 */
export function toneBefore(id: string): SectionTone | null {
  const i = sectionTones.findIndex((t) => t.id === id);
  return i > 0 ? sectionTones[i - 1] : null;
}
