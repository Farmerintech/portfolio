"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";

import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Section ids derived from the nav config, e.g. "/#projects" -> "projects". */
const SECTION_IDS = nav.map(([, href]) => href.split("#")[1]);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(SECTION_IDS[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: whichever section occupies the middle band of the viewport wins.
  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      /* `data-nav-shell` is the hook SectionTransition looks the header up by, and
         `tone-surface` is what makes every token inside it derive from the section
         passing underneath. The header is fixed above all six grounds, so without
         both of these it would wear one colour over all of them and clash with the
         light ones. The scrolled style is `.nav-shell`, which mixes the same tone
         pair into the translucent bar. */
      data-nav-shell
      className={cn(
        "tone-surface text-foreground no-print fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "nav-shell border-b py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/#home"
          className="font-mono text-sm font-bold tracking-tight"
        >
          farmerintech
          <span className="text-primary">.dev</span>
        </Link>

        {/* Desktop: bare links. The current section is marked by ink and a rule,
            not by a pill on a pill — the header bar is already a background, so a
            second one inside it was two surfaces fighting for the same job.

            Active is full-strength `foreground` against the muted inactive links,
            which is the whole colour change: `text-primary` would be invisible
            here, because `--primary` and `--foreground` both resolve to the
            section's ink. */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map(([title, href]) => {
            const id = href.split("#")[1];
            const isActive = active === id;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {title}
                {isActive && (
                  /* `layoutId` slides the rule between items as the section under
                     the header changes, instead of cutting from one to the next. */
                  <motion.span
                    layoutId="nav-active-rule"
                    className="bg-foreground absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden px-5 sm:inline-flex"
          >
            <Link href="/resume">Resume</Link>
          </Button>
          <ThemeToggle />
          <Button
            asChild
            variant="brand"
            size="sm"
            className="hidden px-5 md:inline-flex"
          >
            <Link href="/#contact">
              <Sparkles className="size-3.5" />
              Hire Me
            </Link>
          </Button>

          {/* Mobile: sheet drawer */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-sm border border-border lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-mono">
                  yakub<span className="text-primary">.dev</span>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {[...nav, ["Resume", "/resume"] as const].map(([title, href]) => (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className="rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t border-border p-6">
                <Button asChild variant="brand" className="w-full">
                  <Link href="/#contact" onClick={() => setOpen(false)}>
                    <Sparkles className="size-4" />
                    Hire Me
                  </Link>
                </Button>
                <p className="mt-4 font-mono text-xs text-muted-foreground">
                  {site.email}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
