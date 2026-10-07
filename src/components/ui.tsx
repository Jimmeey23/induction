import React, { useState } from "react";
import { cn } from "../utils/cn";
import { useIsPrinting } from "./printContext";
import { Eye, EyeOff, Check, X } from "lucide-react";
import type { Section } from "../data";

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "coral" | "light";
}) {
  return (
    <div
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.22em]",
        tone === "muted" && "text-ink-500",
        tone === "coral" && "text-coral-600",
        tone === "light" && "text-cream-400",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Display({
  children,
  className,
  as: Tag = "h2",
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <Tag
      className={cn(
        "font-display font-medium leading-[1.02] tracking-[-0.02em] text-balance",
        size === "sm" && "text-2xl md:text-3xl",
        size === "md" && "text-3xl md:text-4xl",
        size === "lg" && "text-4xl md:text-5xl lg:text-6xl",
        size === "xl" && "text-5xl md:text-6xl lg:text-7xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-lg md:text-xl leading-relaxed text-ink-600 text-pretty", className)}>{children}</p>;
}

export function SectionTitle({
  kicker,
  title,
  className,
  light,
}: {
  kicker?: string;
  title: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {kicker && <Eyebrow tone={light ? "light" : "coral"}>{kicker}</Eyebrow>}
      <Display size="md" className={light ? "text-cream-50" : "text-ink-900"}>
        {title}
      </Display>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Containers                                                          */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark" | "coral" | "outline" | "cream";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8",
        tone === "light" && "bg-white shadow-soft border border-cream-200",
        tone === "cream" && "bg-cream-200/60 border border-cream-300",
        tone === "dark" && "bg-ink-900 text-cream-50 shadow-lift",
        tone === "coral" && "bg-coral-500 text-white shadow-lift",
        tone === "outline" && "border border-ink-900/15",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Statement({
  children,
  kicker,
  className,
  size = "lg",
  tone = "dark",
}: {
  children: React.ReactNode;
  kicker?: string;
  className?: string;
  size?: "md" | "lg" | "xl";
  tone?: "dark" | "coral" | "cream";
}) {
  return (
    <div
      className={cn(
        "grain relative overflow-hidden rounded-3xl px-7 py-10 md:px-12 md:py-14",
        tone === "dark" && "bg-ink-950 text-cream-50",
        tone === "coral" && "bg-coral-500 text-white",
        tone === "cream" && "bg-cream-200 text-ink-900 border border-cream-300",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl",
          tone === "dark" && "bg-coral-500/25",
          tone === "coral" && "bg-white/20",
          tone === "cream" && "bg-coral-300/30"
        )}
      />
      <div className="relative space-y-4">
        {kicker && <Eyebrow tone={tone === "cream" ? "coral" : "light"}>{kicker}</Eyebrow>}
        <Display as="p" size={size} className="font-light">
          {children}
        </Display>
      </div>
    </div>
  );
}

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "coral" | "dark" | "sage" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tone === "neutral" && "bg-cream-200 text-ink-700",
        tone === "coral" && "bg-coral-500/10 text-coral-700",
        tone === "dark" && "bg-ink-900 text-cream-50",
        tone === "sage" && "bg-sage-200 text-sage-700",
        tone === "light" && "bg-white/10 text-cream-100",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 h-px bg-ink-900/10", className)} />;
}

/* ------------------------------------------------------------------ */
/* Quotes                                                              */
/* ------------------------------------------------------------------ */

export function Quote({
  children,
  who,
  tone = "neutral",
  className,
  size = "md",
}: {
  children: React.ReactNode;
  who?: string;
  tone?: "neutral" | "good" | "bad" | "client" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <figure
      className={cn(
        "relative rounded-2xl border-l-4 pl-5 pr-5 py-4 md:pl-6",
        tone === "neutral" && "bg-white border-ink-900 shadow-soft",
        tone === "good" && "bg-sage-200/40 border-sage-500",
        tone === "bad" && "bg-coral-500/5 border-coral-500",
        tone === "client" && "bg-cream-200/70 border-cream-400",
        tone === "light" && "bg-white/5 border-coral-400 text-cream-50",
        className
      )}
    >
      {who && (
        <figcaption
          className={cn(
            "mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]",
            tone === "good" && "text-sage-700",
            tone === "bad" && "text-coral-700",
            tone === "client" && "text-ink-500",
            tone === "neutral" && "text-ink-500",
            tone === "light" && "text-cream-400"
          )}
        >
          {tone === "good" && <Check className="h-3.5 w-3.5" />}
          {tone === "bad" && <X className="h-3.5 w-3.5" />}
          {who}
        </figcaption>
      )}
      <blockquote
        className={cn(
          "font-display italic font-light leading-snug text-pretty",
          size === "sm" && "text-base md:text-lg",
          size === "md" && "text-lg md:text-xl",
          size === "lg" && "text-xl md:text-2xl lg:text-3xl",
          tone === "light" ? "text-cream-50" : "text-ink-900"
        )}
      >
        “{children}”
      </blockquote>
    </figure>
  );
}

export function BigQuestion({
  children,
  kicker = "Question",
  className,
}: {
  children: React.ReactNode;
  kicker?: string;
  className?: string;
}) {
  return (
    <div className={cn("grain relative overflow-hidden rounded-3xl bg-ink-950 text-cream-50 px-7 py-10 md:px-12 md:py-14", className)}>
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-coral-500/25 blur-3xl" />
      <div className="relative">
        <Eyebrow tone="light" className="mb-5">
          {kicker}
        </Eyebrow>
        <p className="font-display font-light italic text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-[-0.01em] text-balance">
          “{children}”
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Do / Don't                                                          */
/* ------------------------------------------------------------------ */

export function DoDont({
  dont,
  doIt,
  dontLabel = "Don't say",
  doLabel = "Say",
  className,
}: {
  dont: React.ReactNode;
  doIt: React.ReactNode;
  dontLabel?: string;
  doLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      <Quote tone="bad" who={dontLabel}>
        {dont}
      </Quote>
      <Quote tone="good" who={doLabel}>
        {doIt}
      </Quote>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal                                                              */
/* ------------------------------------------------------------------ */

export function Reveal({
  label,
  children,
  className,
  hideLabel = "Hide",
  tone = "dark",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  hideLabel?: string;
  tone?: "dark" | "light" | "coral";
}) {
  const [open, setOpen] = useState(false);
  const printing = useIsPrinting();
  const shown = open || printing;
  return (
    <div className={cn("space-y-4", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "no-print group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-bold tracking-wide transition-all",
          tone === "dark" && "bg-ink-900 text-cream-50 hover:bg-ink-700",
          tone === "light" && "bg-white text-ink-900 border border-ink-900/15 hover:border-ink-900/40",
          tone === "coral" && "bg-coral-500 text-white hover:bg-coral-600"
        )}
      >
        {open ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        {open ? hideLabel : label}
      </button>
      {shown && <div className={printing ? undefined : "animate-fade-up"}>{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lists                                                               */
/* ------------------------------------------------------------------ */

export function WordWall({
  words,
  className,
  tone = "dark",
}: {
  words: string[];
  className?: string;
  tone?: "dark" | "light" | "coral";
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {words.map((w, i) => (
        <span
          key={w}
          style={{ animationDelay: `${i * 60}ms` }}
          className={cn(
            "animate-fade-up rounded-2xl px-5 py-3 font-display text-xl md:text-2xl font-medium tracking-tight",
            tone === "dark" && "bg-ink-900 text-cream-50",
            tone === "light" && "bg-white text-ink-900 border border-cream-300 shadow-soft",
            tone === "coral" && "bg-coral-500 text-white"
          )}
        >
          {w}
        </span>
      ))}
    </div>
  );
}

export function Bullets({
  items,
  className,
  columns = 1,
  icon = "dot",
}: {
  items: React.ReactNode[];
  className?: string;
  columns?: 1 | 2 | 3;
  icon?: "dot" | "check" | "x" | "arrow";
}) {
  return (
    <ul className={cn("grid gap-2.5", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-snug md:text-base">
          {icon === "dot" && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />}
          {icon === "check" && (
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-200 text-sage-700">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          )}
          {icon === "x" && (
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral-500/10 text-coral-600">
              <X className="h-3 w-3" strokeWidth={3} />
            </span>
          )}
          {icon === "arrow" && <span className="mt-0.5 font-display text-coral-500">→</span>}
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function NumberBadge({ n, className, light }: { n: number | string; className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-medium",
        light ? "bg-cream-50 text-ink-900" : "bg-ink-900 text-cream-50",
        className
      )}
    >
      {n}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Module header                                                       */
/* ------------------------------------------------------------------ */

export function ModuleHeader({
  section,
  title,
  subtitle,
  children,
}: {
  section: Section;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative border-b border-ink-900/10 pb-8 md:pb-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {section.num !== undefined && <Chip tone="dark">Module {String(section.num).padStart(2, "0")}</Chip>}
            {section.kind === "toolkit" && <Chip tone="dark">Toolkit · After the session</Chip>}
            {section.kind === "practice" && <Chip tone="dark">Practice</Chip>}
            {section.format && <Chip tone="coral">{section.format}</Chip>}
          </div>
          <Display as="h1" size="lg">
            {title}
          </Display>
          {subtitle && <Lede>{subtitle}</Lede>}
        </div>
      </div>
      {(section.summary || section.takeaway) && (
        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {section.summary && (
            <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500">In this chapter</div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{section.summary}</p>
            </div>
          )}
          {section.takeaway && (
            <div className="rounded-2xl border border-coral-500/25 bg-coral-500/[0.07] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-coral-700">What it tells us</div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-800">{section.takeaway}</p>
            </div>
          )}
        </div>
      )}
      {children}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Section wrapper                                                     */
/* ------------------------------------------------------------------ */

export function Block({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("space-y-6 md:space-y-8", className)}>
      {children}
    </section>
  );
}
