# Yakub Olaide — portfolio

`npm install` then `npm run dev`. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before deploying.

Next.js 15 · React 19 · Tailwind CSS v4 · shadcn/ui · framer-motion · Lenis

---

## Content — the one file you edit

Everything on the site comes from **`src/lib/data.ts`** (`site`, `nav`, `stack`, `experience`, `projects`, `filters`).

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
  *.tsx             the six site sections + nav, footer, theme-toggle

src/lib/
  data.ts           all content
  motion.ts         shared easings, springs and variants
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
| `gradient-mesh` / `grain` / `spotlight` / `scroll-progress` | Ambient layers |
| `parallax` | Scroll-linked depth |

`src/components/project-cover.tsx` generates each project's artwork as
deterministic SVG from its name — there are no image assets, and the same
project always gets the same colours.

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
everywhere. The gradient's three stops are `--brand-1/2/3`.

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
