import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";

import favicon from "@/favicon.jpg";
import BackToTop from "@/components/back-to-top";
import Footer from "@/components/footer";
import Grain from "@/components/motion/grain";
import ScrollProgress from "@/components/motion/scroll-progress";
import Nav from "@/components/nav";
import Providers from "@/components/providers";
import { site } from "@/lib/data";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
/* Rounded geometric display face — carries the "playful" half of the identity
   in headings while Geist keeps body copy neutral and readable. */
const display = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const title = `${site.name} | ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [
    "Software Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Node.js",
    "Nigeria",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  /* The photo lives in src/, which Next does not scan, so it is imported and
     referenced explicitly here. NOTE: src/app/icon.svg still exists and Next
     emits file-based icons alongside these — delete it, or the browser may
     keep showing the old mark instead of the photo. */
  icons: {
    icon: [{ url: favicon.src, type: "image/jpeg" }],
    apple: [{ url: favicon.src }],
  },
  openGraph: {
    type: "website",
    title,
    description: site.description,
    url: site.url,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  /* Tracks the ground the page opens on, so the browser chrome doesn't sit in a
     colour the site no longer uses. */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#043a2c" },
    { media: "(prefers-color-scheme: dark)", color: "#032b21" },
  ],
};

/**
 * Blocking, pre-paint theme resolution. Kept exactly as it was: it sets
 * `data-theme` on <html> before first paint, which is what prevents a flash of
 * the wrong theme on load. All dark-mode CSS is bound to this attribute rather
 * than shadcn's usual `.dark` class.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.url,
  email: site.email,
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>

        {/* Ambient/decoration layers. All are aria-hidden, inert to pointers,
            sit behind content, and are stripped in print.

            The gradient mesh and cursor spotlight have been removed: they were
            both built from the retired `--glow-*` ramp, and since every section
            now paints its own opaque ground they could only ever have shown
            through the hero. ScrollProgress and Grain stay — both are drawn in
            the current section's own ink, so they read on any ground. */}
        <ScrollProgress />
        <Grain />

        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
