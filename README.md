# Yakub Olaide — portfolio

`npm install` then `npm run dev`. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before deploying.

Next.js 15 · React 19 · Tailwind CSS v4 · shadcn/ui · framer-motion · Lenis

---

## Content — the one file you edit

Everything on the site comes from **`src/lib/data.ts`** (`site`, `nav`, `stack`, `experience`, `projects`, `filters`).

Experience entries still carry a statically imported `screenshot` in
`src/lib/data.ts` (`src/assets/dutycalc.png`, `citadel.png`, `rafiqHQ.png`), but
nothing renders it — the Experience cards are text-only. The field is kept so the
choice is a one-line revert; note that because it sits on the object literal, the
three PNGs are still bundled. Delete the field and the imports together if they
are not coming back.

Search the project for `[TODO` to find every placeholder that still needs real content:

- **DutyCalc** — what it does, live URL, App Store / Play Store link
- **RafiHQ** — dates, what it is, your contribution, website URL
- **Adkhar, Pickup, Campus Errand, Play with Kwara Youth** — descriptions
- Repo links for **Purple** (`social-media-app`), **Adkhar** (`adkhar`, `adkharweb`) and **Play with Kwara Youth** (`pwky`) are best guesses — confirm them

Any string still containing `[TODO` is automatically rendered with an amber tint and a small `TODO` chip, so unfinished copy is visible on the page and can never ship unnoticed. Nothing is hidden or invented for you.

---

## Architecture

```
src/app/
  layout.tsx        theme script, fonts, metadata, JSON-LD, ambient layers
  template.tsx      per-navigation page transition (CSS wipe)
  globals.css       design tokens, theme mapping, utilities, print rules
  page.tsx          composes the six sections
  resume/page.tsx   print-optimised resume

src/components/
  ui/               shadcn/ui primitives (button, card, badge, tabs, tooltip,
                    dialog, sheet, sonner)
  motion/           reusable animation primitives (see below)
  section.tsx       section shell: eyebrow, heading reveal, ground + seam
  section-seam.tsx  the wave/drip edge where one ground meets the next
  *.tsx             the six site sections + nav, footer, theme-toggle

src/lib/
  data.ts           all content
  motion.ts         shared easings, springs and variants
  section-palette.ts  the ordered list of sections -> tone + seam (see below)
  utils.ts          cn(), hashString(), isPlaceholder()
```

### Animation primitives (`src/components/motion/`)

Sections compose these rather than rolling their own scroll hooks:

| Primitive | Purpose |
|---|---|
| `smooth-scroll` | Lenis wrapper, not mounted at all under reduced motion |
| `reveal` | Scroll reveal; `Reveal` / `RevealGroup` / `RevealItem` |
| `text-reveal` | Masked word-by-word heading reveal |
| `scramble-text` | Hero name decode effect |
| `magnetic` | Pointer-attracted wrapper for CTAs |
| `tilt-card` | 3D tilt + moving glare (fine pointers only) |
| `marquee` | Infinite strip (CSS transform, pauses on hover) |
| `counter` | Count-up on scroll into view |
| `section-transition` | Crossfades each section's ground — the only GSAP on the site |
| `grain` / `scroll-progress` | Ambient layers |
| `parallax` | Scroll-linked depth |

`gradient-mesh` and `spotlight` are **retired** and no longer mounted: both built
their wash from the old `--glow-*` ramp, which the flat palette removed, so they
are inert until recoloured from `--section-fg`. The files are kept only as a
starting point — see `layout.tsx` for where they used to sit.

`src/components/project-cover.tsx` generates a project's artwork as
deterministic SVG from its name — same project, same colours. It is the fallback
for a project with no screenshot yet, so cards can ship before their cover art
exists and never render a broken image.

`src/components/project-carousel.tsx` is the Projects row: a real scroll container
with `snap-x snap-mandatory`, showing one card per view on a phone, two from `sm`
and three from `lg` (the widths are `.project-slide` in `globals.css`). The arrows
step exactly one card, measured from the DOM rather than assumed. On a phone only,
and only while the row is on screen, it advances itself every 4s and wraps;
touching it pauses. Nothing is armed at all under `prefers-reduced-motion`, which
also makes the arrow steps instant.

---

## Theming

Dark mode is bound to a **`data-theme` attribute on `<html>`**, not shadcn's
usual `.dark` class. A blocking inline script in `layout.tsx` sets it before
first paint, which is what prevents a flash of the wrong theme on load.

Because shadcn assumes a class, `globals.css` teaches Tailwind about the
attribute instead:

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

**Do not run `npx shadcn@latest init`** — it rewrites `globals.css` and
reintroduces `.dark`, which would break the no-flash script. To add more
shadcn components, add them into `src/components/ui/`.

Token names follow shadcn's convention, with one deliberate difference: the
brand colour lives on **`--primary`**, not `--accent`. In shadcn, `--accent` is
a subtle hover surface, and conflating the two produces wrong hover states
everywhere. Buttons that are straight calls to action use **`--cta`** (the
terracotta), which leaves `--primary` free to be the ink that inverts section by
section.

---

## Section colours

Every section paints its own ground, and the ground crossfades into the next as
you scroll. Three files are involved, and only these three:

| File | Owns |
|---|---|
| `src/lib/section-palette.ts` | the ordered list — which section, which tone, which seam |
| `src/app/globals.css` | the colours — the five literals and the `[data-tone=…]` pairs |
| `src/components/motion/section-transition.tsx` | the crossfade (the only GSAP on the site) |

So: to re-point a section, edit its entry in `sectionTones`. To recolour a tone,
edit the `[data-tone=…]` rule **and** its `:root[data-theme="dark"]`
counterpart — miss the second and the dark theme keeps the old colour.

The mechanism is that each section declares `--section-bg` / `--section-fg` from
its tone, and **every surface token inside it is derived from that pair**
(`.tone-surface` in `globals.css`). `bg-card`, `border-border`, `text-foreground`
and `text-muted-foreground` inside a green section are therefore lifted greens
rather than white slabs, and no component carries a per-section colour class.
`SectionTransition` tweens that one pair, which is why the cards, borders, the
seam graphic and the fixed header all re-colour as part of a single tween.

Under `prefers-reduced-motion` the transition creates nothing at all — no
ScrollTrigger, no listeners. Each section keeps its authored colour, so the swap
between sections is simply instant.

Hero and `Footer` are not `<Section>`s, but they read their tone from the same
array (`data-tone` + `section-ground`) so they stay in the crossfade.

Three things to know when adding a section:

- **The id has to match.** `<Section id="…">` looks the tone up by that id, and
  `SectionTransition` finds the element by it. A section missing from
  `sectionTones` falls back to the opening ground and gets no crossfade.
- **Alternate the seam shape.** Neighbouring `seam` values are deliberately
  different, so two consecutive edges never look alike.
- **The fixed header needs `data-nav-shell`.** It rides the same tone pair via
  `.nav-shell`, so it can never be painted against a ground it clashes with.

**Project cards** wear a tone the same way a section does — `data-tone` plus
`tone-surface`, from the three in `CARD_TONES` in `projects.tsx`, painted by
`section-ground`. Vanilla is left out because it is the section's own ground. The
tone is assigned by the project's index in the full `projects` list, not its
place in the filtered row, so filtering never recolours a card. The tone goes on
the `TiltCard` wrapper rather than the `Card`: the card's glare layer is a
sibling of the `Card` and has to inherit the card's own ink to be visible.

---

## Known gotchas

- **No `scroll-behavior: smooth` in CSS.** Lenis owns smooth scrolling; having
  both causes double-eased, stuttering scroll. Anchor links work via Lenis's
  `anchors` option and are still written as `/#section`.
- **`html` has no `overflow-x`.** On the root element it changes how the scroll
  container is established and interacts unpredictably with Lenis. Horizontal
  overflow is contained by `overflow-hidden` wrappers instead.
- **Rules in `globals.css` that target `*` must be inside `@layer base`.**
  Tailwind v4 puts utilities in `@layer utilities`, and an unlayered rule beats
  a layered one, so a bare `* { border-color: … }` would override every
  `border-*` utility.
- **Print:** the page-transition wipe and every ambient layer are excluded from
  `@media print`. The wipe in particular relies on `animation-fill-mode:
  forwards`, which the print stylesheet's `animation: none` reset would cancel —
  leaving a full-page gradient over the printout.

---

## Reduced motion

The site respects `prefers-reduced-motion: reduce` throughout: Lenis is not
mounted, `MotionConfig reducedMotion="user"` disables transform animations,
ambient CSS loops stop, and the CSS-animated page transition completes
instantly to its end state so nothing can get stuck invisible or stuck
covering the page.

---

## Resume PDF

The `/resume` page carries print styles. "Download PDF" opens the print dialog —
choose "Save as PDF". Output is always light and A4 regardless of the on-screen
theme.

## Contact form

Opens the visitor's email app; **no hosting service is connected yet**. Connect
a real service (Resend, Formspree, an API route) at the `INTEGRATION POINT`
comment in `src/components/contact.tsx`.
