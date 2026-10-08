"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";

import ScrambleText from "./motion/scramble-text";
import TextReveal from "./motion/text-reveal";
import TiltCard from "./motion/tilt-card";
import { Button } from "./ui/button";
import { site } from "@/lib/data";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HEADLINE_1 = "Software Developer";
const HEADLINE_2 = "building practical digital products.";

function WhatsAppIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.1-4.7a8.5 8.5 0 1 1 16.4-3.8Z" />
      <path d="M8.8 8.3c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2.1 1.9.3.1.5.1.7-.1l.7-.8c.2-.2.4-.3.7-.2l1.5.7c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.5-.5.5-1.2.7-2 .6-1-.1-2.3-.7-3.5-1.8-1.3-1.2-2.1-2.6-2.3-3.7-.2-.8.1-1.5.5-2.1Z" />
    </svg>
  );
}

const SOCIALS = [
  { Icon: Github, href: site.github, label: "GitHub" },
  { Icon: Linkedin, href: site.linkedin, label: "LinkedIn" },
  { Icon: Mail, href: `mailto:${site.email}`, label: "Email" },
  {
    Icon: WhatsAppIcon,
    href: `https://wa.me/${site.phone.replace(/\D/g, "")}`,
    label: "WhatsApp",
  },
] as const;

/** Tech chips that orbit the code card. Positions are hand-placed, not random. */
const CHIPS = [
  { label: "React", className: "-left-6 top-10", rot: "-8deg", dur: "6.5s", delay: "0s" },
  { label: "Next.js", className: "-right-4 top-1/2", rot: "7deg", dur: "7.5s", delay: "1.2s" },
  { label: "TypeScript", className: "-left-2 bottom-12", rot: "5deg", dur: "5.8s", delay: "0.6s" },
  { label: "Node.js", className: "right-6 -bottom-4", rot: "-6deg", dur: "8s", delay: "1.8s" },
];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: EASE_OUT_EXPO },
});

export default function Hero() {
  return (
    <section
      id="home"
      data-tone="green"
      className="tone-surface section-ground relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------------------------------------------------------------- */}
        <div>
          <motion.div {...up(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Available for remote opportunities
            </span>
          </motion.div>

          <motion.p
            {...up(0.1)}
            className="mt-7 font-mono text-sm text-muted-foreground"
          >
            <ScrambleText text={site.name} duration={1.3} delay={0.35} />
          </motion.p>

          <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight">
            {/* One clean sentence for assistive tech… */}
            <span className="sr-only">
              {HEADLINE_1} {HEADLINE_2}
            </span>
            {/* …and the animated split-word version for everyone else. */}
            <span aria-hidden="true" className="block">
              <TextReveal
                as="span"
                text={HEADLINE_1}
                className="block"
                split="word"
                delay={0.15}
                once
              />
              {/* Pink is the one palette colour that stays legible on the green
                  ground (6.7:1), so it carries the accent the gradient used to. */}
              <TextReveal
                as="span"
                text={HEADLINE_2}
                className="text-pink block"
                split="word"
                delay={0.4}
                once
              />
            </span>
          </h1>

          <motion.p
            {...up(0.5)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I build responsive web and mobile applications with React, Next.js,
            React Native, TypeScript and Node.js — turning real-world problems
            into usable products. My background in Agricultural Economics shapes
            my work in agritech.
          </motion.p>

          <motion.div
            {...up(0.62)}
            className="mt-9 flex flex-col items-start gap-3"
          >
            <div className="flex flex-nowrap items-center gap-2 sm:gap-3">
              <Button
                asChild
                variant="brand"
                size="icon"
                className="hover:translate-y-0 sm:h-12 sm:w-auto sm:px-6"
              >
                <Link href="/#projects" aria-label="View My Work">
                  <span className="sr-only sm:not-sr-only">View My Work</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="sm:h-12 sm:w-auto sm:px-6"
              >
                <Link href="/#contact" aria-label="Hire Me">
                  <Send className="size-4" />
                  <span className="sr-only sm:not-sr-only">Hire Me</span>
                </Link>
              </Button>
            </div>
            <span className="flex gap-0.5 sm:gap-1">
              {SOCIALS.map(({ Icon, href, label }) => (
                <Button
                  key={label}
                  asChild
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-foreground sm:size-10"
                >
                  <a
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    <Icon className="size-5" />
                  </a>
                </Button>
              ))}
            </span>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.9, ease: EASE_OUT_EXPO }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Soft bloom behind the card, in the palette's pink */}
          <div
            aria-hidden="true"
            className="bg-pink absolute inset-0 -z-10 scale-90 rounded-full opacity-20 blur-3xl"
          />

          <TiltCard max={11} className="group">
            <div className="glass relative rotate-[-2deg] rounded-2xl border border-border p-1 shadow-lift">
              <div className="overflow-hidden rounded-[calc(var(--radius)+4px)] bg-card/80">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <i className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <i className="size-2.5 rounded-full bg-[#febc2e]" />
                  <i className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    yakub.ts
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 sm:text-[13.5px]">
                  <code>
                    <span className="text-muted-foreground">const</span> yakub
                    {" = {"}
                    {"\n"}
                    {"  "}role:{" "}
                    <span className="text-pink">
                      &quot;Software Developer&quot;
                    </span>
                    ,{"\n"}
                    {"  "}stack: [<span className="text-pink">
                      &quot;React&quot;
                    </span>
                    , <span className="text-pink">&quot;Next.js&quot;</span>,
                    {"\n"}
                    {"    "}
                    <span className="text-pink">
                      &quot;React Native&quot;
                    </span>
                    ,{" "}
                    <span className="text-pink">
                      &quot;TypeScript&quot;
                    </span>
                    ,{"\n"}
                    {"    "}
                    <span className="text-pink">&quot;Node.js&quot;</span>
                    ],{"\n"}
                    {"  "}based:{" "}
                    <span className="text-pink">&quot;Nigeria&quot;</span>,
                    {"\n"}
                    {"  "}openTo: [{" "}
                    <span className="text-pink">
                      &quot;remote roles&quot;
                    </span>
                    ,{"\n"}
                    {"    "}
                    <span className="text-pink">
                      &quot;contracts&quot;
                    </span>
                    ],{"\n"}
                    {"}"};
                  </code>
                </pre>
              </div>
            </div>
          </TiltCard>

          {/* Floating tech chips */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {CHIPS.map((chip) => (
              <span
                key={chip.label}
                className={cn(
                  "animate-float absolute block rounded-full border border-border/70 bg-card/85 px-3 py-1.5 font-mono text-xs font-medium shadow-soft backdrop-blur",
                  chip.className
                )}
                style={
                  {
                    "--float-rot": chip.rot,
                    "--float-duration": chip.dur,
                    animationDelay: chip.delay,
                  } as React.CSSProperties
                }
              >
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
