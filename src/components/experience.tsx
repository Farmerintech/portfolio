"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Reveal from "./motion/reveal";
import Section from "./section";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { SmartText } from "./placeholder";
import { experience } from "@/lib/data";

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);

  // The vertical rule fills as the list scrolls past — a single scroll-linked
  // value driving one transform, rather than per-item animation.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section
      id="experience"
      eyebrow="02 / Experience"
      title="Where I've built and shipped."
    >
      <ol ref={listRef} className="relative space-y-8 pl-8 sm:pl-10">
        {/* Track + progress fill */}
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-2 h-full w-px bg-border"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="bg-brand-gradient absolute left-[3px] top-2 h-full w-px origin-top"
        />

        {experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 0.06} className="relative list-none">
            <span
              aria-hidden="true"
              className="bg-brand-gradient absolute -left-[34px] top-7 size-2.5 rounded-full ring-4 ring-background sm:-left-[42px]"
            />

            <Card className="gap-0 p-6 transition-shadow duration-300 hover:shadow-lift md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-semibold">
                  {job.company}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {job.role}
                  </span>
                </h3>
                <SmartText
                  as="span"
                  text={job.dates}
                  className="font-mono text-sm text-muted-foreground"
                />
              </div>

              <SmartText
                text={job.summary}
                className="mt-3 text-muted-foreground"
              />

              <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="bg-brand-gradient mt-2.5 size-1.5 shrink-0 rounded-full"
                    />
                    <SmartText as="span" text={point} />
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {job.tech.map((t) => (
                  <Badge key={t} variant="subtle" className="font-mono">
                    {t}
                  </Badge>
                ))}
                {(job.url || job.app) && (
                  <div className="ml-auto flex flex-wrap items-center gap-4">
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2"
                      >
                        Visit site
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                    {job.app && (
                      <a
                        href={job.app}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2"
                      >
                        Get the app
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
