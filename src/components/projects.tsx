"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Smartphone, SquareArrowOutUpRight } from "lucide-react";

import ProjectCover from "./project-cover";
import Reveal, { RevealGroup, RevealItem } from "./motion/reveal";
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
import { cn } from "@/lib/utils";

type ProjectLink = { href: string; label: string; Icon: typeof Github };

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

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <TiltCard max={7} className="group h-full">
      <Card className="ring-gradient h-full gap-0 overflow-hidden pt-0 transition-shadow duration-300 hover:shadow-lift">
        {/* Generated cover — no image assets, deterministic per project name */}
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
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
          <TabsList aria-label="Filter projects" className="mb-10 flex-wrap">
            {filters.map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="relative">
                {filter === key && (
                  <motion.span
                    layoutId="filter-pill"
                    className="bg-brand-gradient absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Reveal>

        {filters.map(([key]) => {
          const list = shown(key);
          return (
            <TabsContent key={key} value={key}>
              {list.length === 0 ? (
                <p className="py-16 text-center text-muted-foreground">
                  Nothing here yet.
                </p>
              ) : (
                <RevealGroup
                  className={cn(
                    "grid gap-5",
                    "sm:grid-cols-2 lg:grid-cols-3"
                  )}
                  stagger={0.06}
                >
                  {list.map((p) => (
                    <RevealItem key={p.name} as="article">
                      <ProjectCard p={p} onOpen={() => setSelected(p)} />
                    </RevealItem>
                  ))}
                </RevealGroup>
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
                <div className="relative aspect-[16/7]">
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
