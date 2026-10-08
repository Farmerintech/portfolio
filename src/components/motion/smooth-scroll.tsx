"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

/**
 * Inertial smooth scrolling.
 *
 * Two things worth knowing:
 *  1. Lenis performs *real* scrolling (it drives window.scrollTo), not a
 *     transform fake — so framer-motion's useScroll/whileInView stay in sync
 *     with no extra wiring.
 *  2. For reduced-motion users we don't mount Lenis at all rather than
 *     configuring it to be "less smooth" — native scrolling is the correct
 *     fallback. Initial state is `false` so the server and first client render
 *     agree; the effect corrects it immediately after.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // Keeps the existing `/#projects` nav links working through Lenis.
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
