"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <motion.a
      href="/#home"
      aria-label="Back to top"
      initial={{ opacity: 0, scale: 0.75, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      className="no-print group fixed right-6 bottom-6 z-40 inline-flex size-12 items-center justify-center rounded-full bg-cta text-cta-foreground shadow-lift transition-colors hover:bg-cta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta"
    >
      <ArrowUp
        aria-hidden="true"
        className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}
