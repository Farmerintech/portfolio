"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Send } from "lucide-react";

import Magnetic from "./motion/magnetic";
import ScrambleText from "./motion/scramble-text";
import TextReveal from "./motion/text-reveal";
import TiltCard from "./motion/tilt-card";
import { Button } from "./ui/button";
import { site } from "@/lib/data";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HEADLINE_1 = "Software Developer";
const HEADLINE_2 = "building practical digital products.";

const SOCIALS = [
  { Icon: Github, href: site.github, label: "GitHub" },
  { Icon: Linkedin, href: site.linkedin, label: "LinkedIn" },
  { Icon: Mail, href: `mailto:${site.email}`, label: "Email" },
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
      className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
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
                delay={0.15}
                once
              />
              <TextReveal
                as="span"
                text={HEADLINE_2}
                className="text-brand-gradient block"
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
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button asChild variant="brand" size="lg">
                <Link href="/#projects">
                  View My Work
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.24}>
              <Button asChild variant="outline" size="lg">
                <Link href="/#contact">
                  <Send className="size-4" />
                  Hire Me
                </Link>
              </Button>
            </Magnetic>

            <span className="ml-1 flex gap-1">
              {SOCIALS.map(({ Icon, href, label }) => (
                <Button
                  key={label}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:text-foreground"
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
          {/* Soft gradient orb behind the card */}
          <div
            aria-hidden="true"
            className="bg-brand-gradient absolute inset-0 -z-10 scale-90 rounded-full opacity-15 blur-3xl"
          />

          <TiltCard max={11} className="group">
            <div className="ring-gradient glass relative rotate-[-2deg] rounded-2xl p-1 shadow-lift">
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
                    <span className="text-brand-gradient">
                      &quot;Software Developer&quot;
                    </span>
                    ,{"\n"}
                    {"  "}stack: [<span className="text-primary">
                      &quot;React&quot;
                    </span>
                    , <span className="text-primary">&quot;Next.js&quot;</span>,
                    {"\n"}
                    {"    "}
                    <span className="text-primary">
                      &quot;React Native&quot;
                    </span>
                    ,{" "}
                    <span className="text-primary">
                      &quot;TypeScript&quot;
                    </span>
                    ,{"\n"}
                    {"    "}
                    <span className="text-primary">&quot;Node.js&quot;</span>
                    ],{"\n"}
                    {"  "}based:{" "}
                    <span className="text-primary">&quot;Nigeria&quot;</span>,
                    {"\n"}
                    {"  "}openTo: [{" "}
                    <span className="text-primary">
                      &quot;remote roles&quot;
                    </span>
                    ,{"\n"}
                    {"    "}
                    <span className="text-primary">
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
