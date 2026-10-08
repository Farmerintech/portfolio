"use client";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import Magnetic from "./motion/magnetic";
import Reveal from "./motion/reveal";
import Section from "./section";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const FIELD =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-[3px] focus:ring-ring/25";

/**
 * wa.me takes the number as bare digits — no `+`, no spaces. Those are all legal
 * in `site.phone` and all of them break the link, so this is derived from it
 * rather than typed out a second time, and the two can't drift apart.
 */
const WHATSAPP = `https://wa.me/${site.phone.replace(/\D/g, "")}`;

type Contact = {
  Icon: LucideIcon;
  /** The link's visible text. */
  label: string;
  href: string;
  /**
   * Names the service for screen readers, for rows whose visible text doesn't.
   * The email address is self-describing and LinkedIn and GitHub say what they
   * are, so only the number needs it — a phone number beside a speech bubble
   * doesn't announce which app it opens.
   */
  spoken?: string;
};

const CONTACTS: Contact[] = [
  { Icon: Mail, label: site.email, href: `mailto:${site.email}` },
  {
    /* Lucide dropped the brand marks, so there is no WhatsApp glyph in the set;
       a speech bubble is the closest it has to "message me here". */
    Icon: MessageCircle,
    label: site.phone,
    href: WHATSAPP,
    spoken: "WhatsApp",
  },
  { Icon: Linkedin, label: "LinkedIn", href: site.linkedin },
  { Icon: Github, label: "GitHub", href: site.github },
];

/**
 * Declared at module scope, not inside Contact: a component defined during
 * render is a brand-new type on every pass, so React remounts its subtree
 * each time. It also avoids shadowing the global `Error`.
 */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive">
      {message}
    </p>
  );
}

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const next: Errors = {};
    if (values.name.length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email))
      next.email = "Please enter a valid email address.";
    if (values.message.length < 10)
      next.message = "Please write at least 10 characters.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSending(true);

    // INTEGRATION POINT: replace this mailto fallback with your email service
    // (Resend, Formspree, an API route, etc.). Until then it opens the
    // visitor's mail client with the message prefilled.
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Portfolio enquiry from " + values.name
    )}&body=${encodeURIComponent(
      values.message + "\n\nFrom: " + values.name + " (" + values.email + ")"
    )}`;

    toast.success("Opening your email app…", {
      description:
        "A hosted email service hasn't been connected yet, so this opens your mail client.",
    });
    setSending(false);
  };

  return (
    <Section
      id="contact"
      eyebrow="05 / Contact"
      title="Have a project in mind, or looking for a developer?"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="space-y-6">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Available for remote opportunities
          </p>

          <p className="text-lg leading-relaxed text-muted-foreground">
            Remote roles, contracts and freelance work in web, mobile and
            full-stack development.
          </p>

          <ul className="space-y-3">
            {CONTACTS.map(({ Icon, label, href, spoken }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[15px] transition-colors hover:text-primary"
                >
                  <span className="flex size-9 items-center justify-center rounded-full border border-border bg-card">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="break-all">
                    {spoken && <span className="sr-only">{spoken} </span>}
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="gap-0 p-7 md:p-8">
            <form onSubmit={submit} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby="error-name"
                  placeholder="Your name"
                  className={cn(FIELD, errors.name && "border-destructive")}
                />
                <FieldError id="error-name" message={errors.name} />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby="error-email"
                  placeholder="you@example.com"
                  className={cn(FIELD, errors.email && "border-destructive")}
                />
                <FieldError id="error-email" message={errors.email} />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby="error-message"
                  placeholder="Tell me about the project or role…"
                  className={cn(FIELD, "resize-y", errors.message && "border-destructive")}
                />
                <FieldError id="error-message" message={errors.message} />
              </div>

              <Magnetic strength={0.18} className="w-full">
                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  disabled={sending}
                  className="w-full"
                >
                  <Send className="size-4" />
                  Send message
                </Button>
              </Magnetic>
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
