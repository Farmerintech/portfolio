import Counter from "./motion/counter";
import Parallax from "./motion/parallax";
import Reveal from "./motion/reveal";
import Section from "./section";
import { Card } from "./ui/card";
import { experience, projects, stack } from "@/lib/data";

/** Counts derived from the existing content — nothing invented. */
const UNIQUE_TECH = new Set(stack.flatMap((g) => g.items)).size;

const STATS = [
  { value: projects.length, label: "Projects", suffix: "" },
  { value: UNIQUE_TECH, label: "Technologies", suffix: "" },
  { value: experience.length, label: "Teams", suffix: "" },
] as const;

const OPEN_TO = [
  "Remote frontend development roles",
  "React / Next.js opportunities",
  "React Native / mobile development",
  "Full-stack development",
  "Freelance and contract projects",
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="04 / About"
      title="A developer who likes useful things."
    >
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-6">
          <Reveal>
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <Card key={s.label} className="gap-0 p-5 text-center">
                  <p className="font-display text-3xl font-semibold sm:text-4xl">
                    <span className="text-brand-gradient">
                      <Counter to={s.value} suffix={s.suffix} />
                    </span>
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </Card>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a Software Developer with a strong foundation in frontend,
              mobile and backend development. I enjoy building practical products
              that solve real-world problems.
            </p>
            <p>
              My academic background is in Agricultural Economics at the
              University of Ilorin, which has influenced some of my work in
              agriculture, climate and food systems, such as AgroPrice and
              AgroCast.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <Parallax distance={44}>
            <Card className="ring-gradient relative h-full overflow-hidden gap-0 p-7">
              <div
                aria-hidden="true"
                className="bg-brand-gradient absolute -right-16 -top-16 size-40 rounded-full opacity-15 blur-2xl"
              />
              <p className="font-mono text-sm uppercase tracking-widest text-primary">
                Open to
              </p>
              <ul className="mt-4 space-y-3 text-[15px]">
                {OPEN_TO.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="bg-brand-gradient mt-2 size-1.5 shrink-0 rounded-full"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Parallax>
        </Reveal>
      </div>
    </Section>
  );
}
