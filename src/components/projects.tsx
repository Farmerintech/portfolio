"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Smartphone, SquareArrowOutUpRight } from "lucide-react";

import ProjectCarousel from "./project-carousel";
import ProjectCover from "./project-cover";
import Reveal from "./motion/reveal";
import Section from "./section";
import TiltCard from "./motion/tilt-card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { SmartText } from "./placeholder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { filters, projects, type Project } from "@/lib/data";

type ProjectLink = { href: string; label: string; Icon: typeof Github };

/**
 * Aspect ratio for a project's cover box.
 *
 * Screenshots in src/assets are NOT all the same shape — exports range from 16:9
 * down to about 3:2. A fixed 16:9 box with `object-cover` crops the taller ones,
 * cutting content off the top and bottom, so the box is derived from each image's
 * own intrinsic size instead. The generated SVG art is always drawn at 16:9 and
 * keeps that ratio.
 */
function coverAspect(project: Project): string {
  const cover = project.cover;
  if (cover && typeof cover !== "string") {
    return `${cover.width} / ${cover.height}`;
  }
  return "16 / 9";
}

/**
 * Cover art for a project: a real screenshot when `project.cover` points at one,
 * otherwise the deterministic generated SVG. Keeping the fallback means a project
 * can ship before its screenshot exists and never render a broken image.
 *
 * `fill` requires a positioned parent — every call site supplies one.
 */
function Cover({ project, sizes }: { project: Project; sizes: string }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
      />
    );
  }
  return <ProjectCover name={project.name} />;
}

function linksFor(p: Project): ProjectLink[] {
  const out: ProjectLink[] = [];
  if (p.github) out.push({ href: p.github, label: "GitHub", Icon: Github });
  if (p.web) out.push({ href: p.web, label: "Web", Icon: SquareArrowOutUpRight });
  if (p.live) out.push({ href: p.live, label: "Live", Icon: ArrowUpRight });
  if (p.app) out.push({ href: p.app, label: "App", Icon: Smartphone });
  return out;
}

/**
 * The three grounds a project card may wear.
 *
 * Vanilla is deliberately absent: it is the Projects section's own ground, and a
 * card painted in it would dissolve into the page instead of reading as an
 * object on it. Deep forest green leads, then the palette's remaining two.
 */
const CARD_TONES = ["green", "cream", "pink"] as const;

/**
 * A project's card colour, fixed by its position in the full `projects` list
 * rather than its position in the filtered row — so applying a filter never
 * recolours a card, it only removes some.
 *
 * Indexed rather than hashed on purpose: cycling guarantees the three colours
 * actually alternate. A hash clumps, and the one outcome that would look like a
 * mistake is two cards side by side in the same ground.
 */
function cardTone(name: string) {
  const i = projects.findIndex((p) => p.name === name);
  return CARD_TONES[(i < 0 ? 0 : i) % CARD_TONES.length];
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    /* The tone sits on the wrapper rather than on the Card itself, because
       TiltCard's glare layer is a *sibling* of the Card: it has to inherit the
       card's own ink to be visible at all, and a glare drawn in the section's
       ink would be invisible over a green card. */
    <div data-tone={cardTone(p.name)} className="tone-surface h-full">
      <TiltCard max={7} className="group h-full">
        {/* `section-ground` paints the tone the wrapper declared and beats the
            Card's own `bg-card` — it is unlayered, and an unlayered rule wins
            over anything in Tailwind's `@layer utilities` (see README). */}
        <Card className="section-ground h-full gap-0 overflow-hidden pt-0 transition-shadow duration-300 hover:shadow-lift">
          {/* Real screenshot when one exists, otherwise generated cover art */}
          <div
            className="relative overflow-hidden border-b border-border"
            style={{ aspectRatio: coverAspect(p) }}
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]">
              <Cover
                project={p}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
            <span className="absolute bottom-3 left-4 font-mono text-xs font-medium text-white/90">
              {p.kind}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-xl font-semibold">{p.name}</h3>

            <SmartText
              text={p.desc}
              className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted-foreground"
            />

            {p.tech.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <li key={t}>
                    <Badge variant="subtle" className="font-mono">
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpen}
                className="-ml-2 text-primary hover:bg-accent"
              >
                Details
                <ArrowUpRight className="size-3.5" />
              </Button>

              <div className="ml-auto flex items-center gap-3">
                {linksFor(p).map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} on ${label}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </TiltCard>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>(filters[0][0]);
  const [selected, setSelected] = useState<Project | null>(null);

  const shown = (key: string) =>
    projects.filter((p) => key === "all" || p.tags.includes(key));

  const selectedLinks = selected ? linksFor(selected) : [];

  return (
    <Section
      id="projects"
      eyebrow="03 / Projects"
      title="Things I've built."
    >
      <Tabs value={filter} onValueChange={setFilter}>
        <Reveal blur={false}>
          <TabsList
            aria-label="Filter projects"
            className="scrollbar-none mb-10 w-full flex-nowrap justify-start overflow-x-auto overscroll-x-contain rounded-lg p-1.5 sm:w-fit sm:gap-1 sm:overflow-visible sm:rounded-md sm:p-1"
          >
            {filters.map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="relative shrink-0">
                {filter === key && (
                  <motion.span
                    layoutId="filter-pill"
                    className="bg-primary absolute inset-0 -z-10 rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {label}{" "}
                <span className="font-mono text-xs opacity-70">
                  ({shown(key).length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Reveal>

        {filters.map(([key, label]) => {
          const list = shown(key);
          return (
            <TabsContent key={key} value={key}>
              {list.length === 0 ? (
                <p className="py-16 text-center text-muted-foreground">
                  Nothing here yet.
                </p>
              ) : (
                /* One Reveal for the whole row, not one per card: with a
                   horizontal track, cards waiting off to the right would sit at
                   opacity 0 until they were scrolled into view — so stepping
                   through the row would fade each one in after the fact. The row
                   arrives as a unit instead. `blur={false}` because a filter
                   animating over three cover images re-rasterises them every
                   frame. */
                <Reveal blur={false}>
                  <ProjectCarousel label={`${label} projects`}>
                    {list.map((p) => (
                      <div key={p.name} className="project-slide">
                        <ProjectCard p={p} onOpen={() => setSelected(p)} />
                      </div>
                    ))}
                  </ProjectCarousel>
                </Reveal>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <div className="-mx-6 -mt-6 overflow-hidden rounded-t-2xl border-b border-border">
                <div
                  className="relative"
                  style={{ aspectRatio: coverAspect(selected) }}
                >
                  <Cover
                    project={selected}
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
              </div>

              <DialogHeader>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  {selected.kind}
                </p>
                <DialogTitle className="text-2xl">{selected.name}</DialogTitle>
                <DialogDescription asChild>
                  <div>
                    <SmartText
                      text={selected.desc}
                      className="text-[15px] leading-relaxed"
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>

              {selected.tech.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {selected.tech.map((t) => (
                    <li key={t}>
                      <Badge variant="subtle" className="font-mono">
                        {t}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}

              {selectedLinks.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedLinks.map(({ href, label, Icon }) => (
                    <Button key={label} asChild variant="outline" size="sm">
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <Icon className="size-4" />
                        {label}
                      </a>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="pt-2 text-sm text-muted-foreground">
                  No public links for this project yet.
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
