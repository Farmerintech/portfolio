import Link from "next/link";

import SectionSeam from "./section-seam";
import { nav, site } from "@/lib/data";
import { toneBefore, toneFor } from "@/lib/section-palette";

export default function Footer() {
  const year = new Date().getFullYear();

  /* The footer is not a <Section> — it has no eyebrow or heading — but it still
     owns a ground, so it reads its tone out of the same ordered array instead of
     hard-coding one. SectionTransition finds it by this id and crossfades it in
     like every other section, which is why the id has to match the entry there. */
  const tone = toneFor("footer");
  const previous = toneBefore("footer");

  return (
    <footer
      id="footer"
      data-tone={tone.tone}
      className="tone-surface section-ground no-print relative border-t border-border"
    >
      {previous && <SectionSeam shape={tone.seam} />}

      <div
        aria-hidden="true"
        className="bg-primary absolute inset-x-0 top-0 h-px opacity-60"
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-bold">
              yakub<span className="text-primary">.dev</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Building practical web and mobile products.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm"
          >
            {nav.map(([title, href]) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {title}
              </Link>
            ))}
            <Link
              href="/resume"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Resume
            </Link>
          </nav>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {year} {site.name}. Built with Next.js and TypeScript.
        </p>
      </div>
    </footer>
  );
}
