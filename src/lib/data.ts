// Anything starting with "[TODO" is a placeholder: replace it before deploying. See README.
//
// Project screenshots live in src/assets and are imported statically, so Next
// optimises them and knows their intrinsic dimensions. A project without a
// `cover` falls back to the generated SVG in components/project-cover.tsx.
import type { StaticImageData } from "next/image";

import adkharCover from "@/assets/adkhar.png";
import agrocastCover from "@/assets/agrocast.png";
import agropriceCover from "@/assets/agroprice.png";
import pwkyCover from "@/assets/pwky.png";
import quebecCover from "@/assets/quebec.png";
import sihaCover from "@/assets/siha.png";
import srilCover from "@/assets/srill.png";

export const site = {
  name: "Yakub Shakirudeen Olaide", title: "Software Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",
  email: "yakubshakirudeenolaide2018@gmail.com", phone: "+234 902 537 6468",
  github: "https://github.com/FarmerInTech", linkedin: "https://www.linkedin.com/in/yakub-shakirudeen-olaide/",
  description: "Software Developer building practical web and mobile applications with React, Next.js, React Native, TypeScript and Node.js.",
};
export const nav = [["Home", "/#home"], ["Experience", "/#experience"], ["Projects", "/#projects"], ["About", "/#about"], ["Contact", "/#contact"]] as const;
// Typed rather than `as const`: an `as const` here would make each group's
// `items` its own readonly tuple, so `group.items` becomes a union of five
// different tuple types and `.map()` over it fails to compile (TS2349).
export type StackGroup = { group: string; icon: string; items: string[] };
export const stack: StackGroup[] = [
  { group: "Frontend", icon: "monitor", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { group: "Mobile", icon: "phone", items: ["React Native", "Expo"] },
  { group: "Backend", icon: "server", items: ["Node.js", "Express.js", "REST APIs"] },
  { group: "Databases", icon: "db", items: ["PostgreSQL", "MongoDB"] },
  { group: "Tools", icon: "tool", items: ["Git", "GitHub"] },
];
export type Experience = {
  company: string; role: string; dates: string; url: string | null;
  /** Optional store link (Play Store / App Store), rendered beside `url`. */
  app?: string;
  summary: string; points: string[]; tech: string[];
};
export const experience: Experience[] = [
  { company: "DutyCalc", role: "CTO / Software Developer", dates: "April 2026 – Present", url: "https://dutycalc.ng", app: "https://play.google.com/store/apps/details?id=ng.dutycalc.app",
    summary: "An all-in-one platform for Nigerian customs duty calculations, manifest verification and professional clearing documentation.",
    points: ["Lead frontend and mobile development with React Native / Expo and TypeScript.", "Coordinate technical implementation across the development team and translate requirements into working product.", "Built the product clearing agents and importers use to price jobs accurately: customs duty calculation, manifest verification and clearance documentation in one place."], tech: ["React Native", "Expo", "TypeScript"] },
  { company: "Citadel-i", role: "Software Developer (Contract)", dates: "March 2025 – August 2025", url: "https://citadel-i.com.ng/",
    summary: "An e-learning platform for students.",
    points: ["Designed and developed citadel-i.com.ng with course access, learning materials and progress tracking.", "Built responsive student dashboards and an admin dashboard for managing users, courses and content.", "Developed and maintained a centralized REST API serving multiple frontends.", "Contributed to system architecture, scalability, clean code structure and performance optimization."], tech: ["REST API"] },
  { company: "RafiHQ", role: "Web and Mobile App Developer", dates: "August 2026 – Present · Remote", url: "https://www.rafiqhq.com/",
    summary: "A cooperative platform that gives societies dedicated member accounts, non-interest financing, bulk group buying power and direct access to institutional bank capital — with every transaction recorded and every officer action logged.",
    points: ["Lead web and mobile development across the platform.", "Built the mobile app, taking it from requirements through to release.", "Optimised the web app for performance and everyday use by cooperative officers and members."], tech: ["React Native", "Expo", "TypeScript"] },
];
export type Project = { name: string; kind: string; desc: string; tech: string[]; tags: string[]; github?: string; web?: string; app?: string; live?: string;
  /** Static import from src/assets. Falls back to generated SVG art when absent. */
  cover?: StaticImageData | string };
const gh = (r: string) => `https://github.com/Farmerintech/${r}`;
export const projects: Project[] = [
  { name: "Purple", kind: "Social media platform", desc: "Full-stack social platform with posts, comments, chat and a follow system, secured with authentication and authorization over a REST API.", tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"], tags: ["web", "fullstack", "backend"], github: gh("social-media-app") /* TODO: confirm repo; add live URL */ },
  { name: "Adkhar", kind: "Web and mobile app", desc: "A calm Islamic companion for daily adhkar, Quran reading, prayer times, Hijri dates and reminders — a cleaner worship routine. Available as a web app and a mobile app.", tech: ["TypeScript"], tags: ["web", "mobile"], cover: adkharCover, github: gh("adkhar"), app: "https://adkhar-apk.vercel.app/" /* TODO: confirm repo; add live web URL. The old `web: gh("adkharweb")` was dropped — it was labelled "Web" but pointed at GitHub */ },
  { name: "AgroPrice", kind: "Agricultural market data", desc: "Pipeline built on World Food Programme market-price data and HDX APIs, tracking monthly prices of rice, maize, beans and garri across Nigerian states.", tech: ["HDX API", "WFP data"], tags: ["web", "backend", "agritech"], cover: agropriceCover, live: "https://agroprice-ng.vercel.app/" /* TODO: add GitHub repo */ },
  { name: "AgroCast", kind: "Climate-smart agriculture", desc: "Offline-first app giving smallholder farmers weather, rainfall, soil and agronomic information in low-connectivity areas.", tech: ["TypeScript"], tags: ["mobile", "agritech"], cover: agrocastCover, github: gh("agrocast"), app: "https://agrocast-apk.vercel.app/" },
  { name: "Pickup", kind: "Project", desc: "[TODO: problem it solves and key features]", tech: [], tags: ["web"] /* TODO: tech, GitHub, live URL */ },
  { name: "Campus Errand", kind: "Campus logistics app", desc: "A campus errand marketplace: a student posts the errand or package they need moved, and another student on campus picks it up. Sign up to post errands, or as a rider to earn from pickups and deliveries.", tech: [], tags: ["web"] /* TODO: tech, GitHub, live URL */ },
  { name: "Play with Kwara Youth", kind: "Community technology initiative", desc: "A community initiative around sport for young people in Kwara — I built and shipped the web app.", tech: [], tags: ["web"], cover: pwkyCover, live: "https://pwky-sports.vercel.app/" /* TODO: confirm the pwky GitHub repo */ },
  { name: "Quebec", kind: "Hackathon project", desc: "A hackathon submission tackling KYC: a business confirms a single fact about a customer — their age, their name, that their identity is verified — without ever seeing the record behind it. Enrol in three fields, share one reference, get a signed yes or no.", tech: [], tags: ["web"], cover: quebecCover, live: "https://quebec-wag.vercel.app/" /* TODO: tech, GitHub */ },
  { name: "Siha", kind: "Healthcare platform · Client work", desc: "Healthcare cover that works with the way you earn — health insurance, savings, crowdfunding, donations and provider facilitation brought together in one platform.", tech: [], tags: ["web", "client"], cover: sihaCover, live: "https://siha-ng.vercel.app/" /* TODO: tech, GitHub */ },
  { name: "SRIL Integrated Services", kind: "Corporate website · Client work", desc: "Corporate website for SRIL Integrated Services, a solution-driven company delivering professional services across key sectors — building, connecting and delivering value.", tech: [], tags: ["web", "client"], cover: srilCover, live: "https://srill.vercel.app/" /* TODO: tech, GitHub */ },
];
export const filters = [["all", "All"], ["web", "Web"], ["mobile", "Mobile"], ["fullstack", "Full Stack"], ["backend", "Backend"], ["agritech", "Agritech"], ["client", "Client Work"]] as const;
