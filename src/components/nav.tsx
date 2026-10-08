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
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/70 py-2 backdrop-blur-xl"
          : "border-b border-transparent py-4"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/#home"
          className="font-mono text-sm font-bold tracking-tight"
        >
          farmerintech
          <span className="text-brand-gradient">.dev</span>
        </Link>

        {/* Desktop: a pill bar with a sliding active indicator */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/50 p-1 backdrop-blur lg:flex"
        >
          {nav.map(([title, href]) => {
            const id = href.split("#")[1];
            const isActive = active === id;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="bg-brand-gradient absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/resume">Resume</Link>
          </Button>
          <ThemeToggle />
          <Button asChild variant="brand" size="sm" className="hidden md:inline-flex">
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
                className="rounded-full border border-border lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-mono">
                  yakub<span className="text-brand-gradient">.dev</span>
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
