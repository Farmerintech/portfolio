"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";

/**
 * Theme switch.
 *
 * The icon shown is decided entirely by CSS via the `dark:` variant, which is
 * bound to the `data-theme` attribute on <html> (see the @custom-variant rule
 * in globals.css). That makes it hydration-safe and flash-free — no React
 * state needs to know the theme just to draw the right icon.
 */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    // Adds the colour-transition class only for the duration of the swap, so
    // we never pay a global transition cost during normal scrolling.
    root.classList.add("theme-anim");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode / storage disabled — theme just won't persist */
    }
    window.setTimeout(() => root.classList.remove("theme-anim"), 380);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="relative rounded-sm border border-border"
    >
      <Sun
        aria-hidden="true"
        className="size-4 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-4 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}
