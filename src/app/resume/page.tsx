import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PrintButton from "@/components/print-button";
import { Button } from "@/components/ui/button";
import { experience, projects, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.title}.`,
};

const SKILLS = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "REST APIs",
  "Git/GitHub",
  "Responsive Design",
];

const ADDITIONAL = [
  "Agricultural Research & Data Analysis (SPSS, Excel, Stata)",
  "Farm Management & Agribusiness Development",
  "Climate-Smart Agriculture & Extension Services",
  "Teaching & Public Speaking",
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-8 border-b border-border pb-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </h2>
  );
}

export default function Resume() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 print:p-0">
      {/* Deliberately plain navigation — this page is built to be printed, so
          it gets none of the site's ambient animation. */}
      <div className="no-print mb-6 flex items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Back to portfolio
          </Link>
        </Button>
        <PrintButton />
      </div>

      <article className="resume bg-card text-card-foreground rounded-2xl border border-border p-6 shadow-soft sm:p-10">
        <header>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {site.name}
          </h1>
          <p className="mt-1 text-primary">{site.title}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {site.email} · {site.phone} ·{" "}
            <a href={site.linkedin} className="underline-offset-2 hover:underline">
              LinkedIn: Yakub Shakirudeen Olaide
            </a>{" "}
            ·{" "}
            <a href={site.github} className="underline-offset-2 hover:underline">
              GitHub: FarmerInTech
            </a>
          </p>
        </header>

        <Heading>Professional summary</Heading>
        <p className="text-[15px] leading-relaxed">
          Highly motivated Software Developer with a strong foundation in
          frontend, backend and mobile development, combined with an academic
          background in Agricultural Economics. Passionate about using
          technology to solve real-world problems and improve digital
          experiences.
        </p>

        <Heading>Technical skills</Heading>
        <p className="text-[15px] leading-relaxed">{SKILLS.join(" · ")}</p>

        <Heading>Experience</Heading>
        {experience.map((job) => (
          <section key={job.company} className="mb-5">
            <div className="flex flex-wrap justify-between gap-x-4">
              <h3 className="font-semibold">
                {job.company}{" "}
                <span className="font-normal text-muted-foreground">
                  · {job.role}
                </span>
              </h3>
              <p className="font-mono text-sm text-muted-foreground">
                {job.dates}
              </p>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[14.5px] leading-relaxed">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        ))}

        <Heading>Projects</Heading>
        <ul className="space-y-2 text-[14.5px] leading-relaxed">
          {projects.map((project) => (
            <li key={project.name}>
              <strong>{project.name}</strong>: {project.desc}
              {project.tech.length > 0 && (
                <span className="text-muted-foreground">
                  {" "}
                  ({project.tech.join(", ")})
                </span>
              )}
            </li>
          ))}
        </ul>

        <Heading>Education</Heading>
        <p className="text-[15px]">
          <strong>University of Ilorin, Ilorin, Nigeria</strong>
          <br />
          Bachelor of Agriculture (B.Agric), Agricultural Economics · CGPA
          4.79/5.00
        </p>

        <Heading>Volunteer &amp; other</Heading>
        <ul className="list-disc space-y-1 pl-5 text-[14.5px]">
          <li>
            Education Committee Volunteer &amp; Mentor, Idigba Development
            Association (Oct 2018 – Present)
          </li>
          <li>Member, Google Developer Groups (GDG) Campus Hub</li>
        </ul>

        <Heading>Additional skills</Heading>
        <ul className="list-disc space-y-1 pl-5 text-[14.5px]">
          {ADDITIONAL.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
