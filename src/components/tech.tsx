import {
  Database,
  Monitor,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import Marquee from "./motion/marquee";
import { RevealGroup, RevealItem } from "./motion/reveal";
import Section from "./section";
import TiltCard from "./motion/tilt-card";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { stack } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  monitor: Monitor,
  phone: Smartphone,
  server: Server,
  db: Database,
  tool: Wrench,
};

/** Flattened tech list for the marquee, each tagged with its category. */
const MARQUEE_ITEMS = stack.flatMap((group) =>
  group.items.map((item) => ({ item, group: group.group }))
);

export default function Tech() {
  return (
    <Section
      id="stack"
      eyebrow="01 / Stack"
      title="Frontend, mobile and backend, in one developer."
    >
      {/* Scrolling strip — pauses on hover so items can actually be read */}
      <div className="mb-12 space-y-3">
        <Marquee duration={42}>
          {MARQUEE_ITEMS.map(({ item, group }) => (
            <Tooltip key={`${group}-${item}`}>
              <TooltipTrigger asChild>
                <span className="cursor-default rounded-full border border-border/70 bg-card/60 px-4 py-2 font-mono text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-foreground">
                  {item}
                </span>
              </TooltipTrigger>
              <TooltipContent>{group}</TooltipContent>
            </Tooltip>
          ))}
        </Marquee>
        <Marquee duration={52} reverse>
          {[...MARQUEE_ITEMS].reverse().map(({ item, group }) => (
            <Tooltip key={`rev-${group}-${item}`}>
              <TooltipTrigger asChild>
                <span className="cursor-default rounded-full border border-border/70 bg-card/60 px-4 py-2 font-mono text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-foreground">
                  {item}
                </span>
              </TooltipTrigger>
              <TooltipContent>{group}</TooltipContent>
            </Tooltip>
          ))}
        </Marquee>
      </div>

      <RevealGroup
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.07}
      >
        {stack.map((group) => {
          const Icon = ICONS[group.icon] ?? Monitor;
          return (
            <RevealItem key={group.group}>
              <TiltCard max={7} className="group h-full">
                <Card className="h-full gap-0 overflow-hidden p-6 transition-shadow duration-300 hover:shadow-lift">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-soft">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-semibold">
                      {group.group}
                    </h3>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-border bg-muted/60 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/30"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TiltCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
