/**
 * Per-navigation entry transition.
 *
 * The App Router swaps server components on navigation, which means
 * AnimatePresence exit animations don't fire reliably — so this is an
 * entry-only transition driven by pure CSS (see .animate-page-wipe /
 * .animate-page-in in globals.css).
 *
 * CSS rather than framer-motion on purpose: the global reduced-motion rule
 * collapses these to 0.01ms, and both keyframes fill forwards/to their end
 * state, so there is no state in which the wipe stays stuck over the page or
 * the content stays invisible.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="bg-brand-gradient animate-page-wipe print-hide pointer-events-none fixed inset-0 z-[90]"
      />
      <div className="animate-page-in">{children}</div>
    </>
  );
}
