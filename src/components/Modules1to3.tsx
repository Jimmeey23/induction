import { useState } from "react";
import { ArrowRight, StickyNote, Footprints, MessageCircleQuestion } from "lucide-react";
import type { Section } from "../data";
import { cn } from "../utils/cn";
import { ModuleHeader, BigQuestion, Reveal, WordWall, Statement, Card, Eyebrow, Display, Quote, Bullets, DoDont, Block, Lede, Chip } from "./ui";

/* ================================================================== */
/* MODULE 1                                                            */
/* ================================================================== */

const unknowns = [
  "Where do I go?",
  "Where do I keep my things?",
  "What class should I take?",
  "What happens if I'm late?",
  "When should I arrive?",
  "How do cancellations work?",
  "What does Barre actually mean?",
  "Which class is right for me?",
  "What equipment do I need?",
  "Who do I ask if I need help?",
];

export function Module1({ section }: { section: Section }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="Why are we doing this?" subtitle="Before any framework, a question." />

      <Block>
        <BigQuestion kicker="Discussion · Question 1">
          Think about somebody walking into Physique 57 for their first class. What are all the things they <span className="not-italic font-semibold text-coral-400">DON'T</span> know that we know?
        </BigQuestion>
        <Reveal label="Show what a first-timer doesn't know">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unknowns.map((u, i) => (
              <div
                key={u}
                style={{ animationDelay: `${i * 50}ms` }}
                className="animate-fade-up flex items-start gap-3 rounded-2xl rounded-bl-sm border border-cream-300 bg-white px-5 py-4 shadow-soft"
              >
                <MessageCircleQuestion className="mt-0.5 h-5 w-5 shrink-0 text-coral-500" />
                <span className="font-display text-lg md:text-xl tracking-tight">{u}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Block>

      <Block>
        <BigQuestion kicker="Discussion · Question 2">How does it feel being the only person in the room who doesn't know these things?</BigQuestion>
        <Reveal label="Show how it feels">
          <WordWall tone="coral" words={["Awkward.", "Intimidating.", "Confusing.", "Nervous.", "Lost."]} />
        </Reveal>
      </Block>

      <Statement kicker="The point" size="xl">
        That's the problem the induction solves.
      </Statement>

      <Block>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="space-y-3">
            <Eyebrow tone="coral">Why now</Eyebrow>
            <Display size="md">Not another task at the front desk.</Display>
          </div>
          <Quote size="lg">
            This process isn't being introduced because we need another task at the front desk. We're doing it because we've realised there's a small but incredibly important gap between someone{" "}
            <strong className="not-italic font-semibold">buying Physique 57</strong> and actually <strong className="not-italic font-semibold">knowing how to be a Physique 57 client</strong>.
          </Quote>
        </div>
      </Block>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <Card tone="cream" className="flex flex-col justify-between">
          <Eyebrow>Done</Eyebrow>
          <p className="mt-6 font-display text-3xl md:text-4xl font-light tracking-tight">The sale has happened.</p>
        </Card>
        <div className="hidden md:flex items-center justify-center text-coral-500">
          <ArrowRight className="h-8 w-8" />
        </div>
        <Card tone="dark" className="flex flex-col justify-between">
          <Eyebrow tone="light">Now</Eyebrow>
          <p className="mt-6 font-display text-3xl md:text-4xl font-light tracking-tight">
            Client Servicing <span className="italic text-coral-400">takes over.</span>
          </p>
        </Card>
      </div>
    </div>
  );
}

/* ================================================================== */
/* MODULE 2                                                            */
/* ================================================================== */

export function Module2({ section }: { section: Section }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="The First-Visit Test" subtitle="What should a client feel after their first induction with us?" />

      <Block>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card tone="dark" className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral-500/25 blur-3xl" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral-500 text-white">
                  <StickyNote className="h-5 w-5" />
                </span>
                <Eyebrow tone="light">Group activity · You'll need a Post-it or piece of paper</Eyebrow>
              </div>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-tight tracking-tight text-balance">
                Imagine you've just completed a new client's first induction. You get to decide <span className="italic text-coral-400">five things</span> you want them to walk away thinking or feeling.
              </p>
              <p className="text-cream-300 text-lg">Write them down, then compare your answers with the group.</p>
            </div>
          </Card>
          <div className="flex flex-col justify-between gap-4">
            <Card tone="cream" className="flex-1">
              <Eyebrow>Then</Eyebrow>
              <p className="mt-3 text-ink-700 leading-relaxed">We'll gather every answer in the room and look for the pattern.</p>
            </Card>
          </div>
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Where this lands</Eyebrow>
          <Display size="md">
            The client should be able to say, <span className="italic">“I feel…”</span>
          </Display>
        </div>
        <Reveal label="Show the six feelings">
          <WordWall tone="dark" words={["Welcomed.", "Known.", "Comfortable.", "Informed.", "Confident.", "Excited to return."]} />
        </Reveal>
      </Block>

      <Block>
        <Eyebrow tone="coral">Training principle № 1</Eyebrow>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-ink-900/10 bg-cream-200/60 p-8 md:p-10">
            <Eyebrow className="mb-6">We are not measuring a successful induction by</Eyebrow>
            <p className="font-display text-4xl md:text-5xl font-light tracking-tight line-through decoration-coral-500 decoration-4 text-ink-400">
              how much the associate <span className="font-semibold">SAID.</span>
            </p>
          </div>
          <div className="grain relative overflow-hidden rounded-3xl bg-ink-950 p-8 md:p-10 text-cream-50">
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-coral-500/30 blur-3xl" />
            <div className="relative">
              <Eyebrow tone="light" className="mb-6">
                We're measuring it by
              </Eyebrow>
              <p className="font-display text-4xl md:text-5xl font-light tracking-tight">
                what the client <span className="font-semibold text-coral-400">UNDERSTOOD.</span>
              </p>
            </div>
          </div>
        </div>
        <p className="text-ink-500 text-sm">This distinction runs through the entire session.</p>
      </Block>
    </div>
  );
}

/* ================================================================== */
/* MODULE 3                                                            */
/* ================================================================== */

interface StepDef {
  n: number;
  name: string;
  mantra: string;
  icon: string;
}

const stepDefs: StepDef[] = [
  { n: 1, name: "Welcome", mantra: "Make me comfortable.", icon: "①" },
  { n: 2, name: "Discover", mantra: "Understand me before explaining things to me.", icon: "②" },
  { n: 3, name: "Decode", mantra: "Help me understand Physique 57.", icon: "③" },
  { n: 4, name: "Navigate", mantra: "Teach me how to be a client.", icon: "④" },
  { n: 5, name: "Tour", mantra: "Remove physical uncertainty.", icon: "⑤" },
  { n: 6, name: "Personalise", mantra: "Connect what you've learned to what we offer.", icon: "⑥" },
  { n: 7, name: "Close", mantra: "Give me a next step.", icon: "⑦" },
];

function Step({ def, children, active, onClick }: { def: StepDef; children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <article
      id={`step-${def.n}`}
      className={cn(
        "grid gap-6 rounded-3xl border bg-white p-6 md:p-8 lg:grid-cols-[280px_1fr] transition-shadow",
        active ? "border-coral-500 shadow-lift" : "border-cream-200 shadow-soft"
      )}
      onMouseEnter={onClick}
    >
      <div className="space-y-4 lg:border-r lg:border-cream-200 lg:pr-6">
        <div className="flex items-center gap-3">
          <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-full font-display text-xl", active ? "bg-coral-500 text-white" : "bg-ink-900 text-cream-50")}>
            {def.n}
          </span>
          <div>
            <div className="font-display text-2xl md:text-3xl font-medium uppercase tracking-tight">{def.name}</div>
          </div>
        </div>
        <p className="font-display text-xl md:text-2xl italic font-light text-ink-700 leading-snug">{def.mantra}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </article>
  );
}

export function Module3({ section }: { section: Section }) {
  const [active, setActive] = useState(1);

  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="The 7-Step Framework" subtitle="One framework to remember — not a giant SOP. Deliver the complete induction naturally, at the client's pace." />

      {/* Framework map */}
      <Block>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <Eyebrow tone="coral">A flexible conversation framework</Eyebrow>
            <Display size="md">Seven moves. One conversation.</Display>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex w-full gap-1 overflow-hidden rounded-2xl">
            {stepDefs.map((s) => (
              <button
                key={s.n}
                type="button"
                onClick={() => {
                  setActive(s.n);
                  document.getElementById(`step-${s.n}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={cn(
                  "group relative flex flex-1 flex-col items-start justify-center px-3 py-4 text-left transition-colors",
                  active === s.n ? "bg-coral-500 text-white" : "bg-ink-900 text-cream-50 hover:bg-ink-700"
                )}
              >
                <span className="font-display text-base md:text-lg leading-none">{s.n}</span>
                <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.18em] opacity-80 md:block truncate w-full">{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Block>

      {/* Steps */}
      <Block>
        <Step def={stepDefs[0]} active={active === 1} onClick={() => setActive(1)}>
          <Bullets items={["Use their name.", "Introduce yourself.", "Explain that you'll guide them through the essentials."]} />
          <Quote who="Example" tone="good">
            Hi Brooke! Welcome. I'm Rhea. Since this is your first visit after joining us, I'll show you around and take you through the important things that'll make your experience here really easy.
          </Quote>
        </Step>

        <Step def={stepDefs[1]} active={active === 2} onClick={() => setActive(2)}>
          <div className="flex flex-wrap gap-2">
            <Chip>You already have CRM information.</Chip>
            <Chip tone="coral">Don't repeat it.</Chip>
            <Chip tone="dark">Use it to ask better questions.</Chip>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "What made you decide to start now?",
              "What are you hoping to get out of your workouts?",
              "Have you done Barre or strength training before?",
              "What kind of workouts have you enjoyed previously?",
            ].map((q) => (
              <Quote key={q} tone="client" size="sm">
                {q}
              </Quote>
            ))}
          </div>
        </Step>

        <Step def={stepDefs[2]} active={active === 3} onClick={() => setActive(3)}>
          <p className="text-ink-700">Explain the class formats that are relevant to this client — then the others, briefly.</p>
          <DoDont dontLabel="Not" doLabel="Instead" dont="We have Barre, FIT, Strength Lab, PowerCycle…" doIt="Based on what you've told me, let me explain the formats I think you'll find most relevant." />
        </Step>

        <Step def={stepDefs[3]} active={active === 4} onClick={() => setActive(4)}>
          <Eyebrow>Cover the essentials</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {["Booking", "Schedule", "Waitlists", "Cancellation", "Late cancellation / no-show", "Arrival time", "Late-entry policy"].map((e) => (
              <span key={e} className="rounded-xl border border-cream-300 bg-cream-100 px-4 py-2 text-sm font-semibold">
                {e}
              </span>
            ))}
          </div>
          <div className="rounded-2xl bg-ink-900 p-5 text-cream-50">
            <p className="font-display text-xl md:text-2xl font-light">
              <span className="text-coral-400">Don't recite an employee handbook.</span> Tell them what they genuinely need to know.
            </p>
          </div>
        </Step>

        <Step def={stepDefs[4]} active={active === 5} onClick={() => setActive(5)}>
          <Eyebrow>Show</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {["Studio", "Changing facilities", "Washrooms", "Belongings / storage", "Water", "Equipment or format-specific requirements"].map((e) => (
              <span key={e} className="rounded-xl border border-cream-300 bg-cream-100 px-4 py-2 text-sm font-semibold">
                {e}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-coral-500 p-5 text-white">
            <Footprints className="h-8 w-8 shrink-0" />
            <p className="font-display text-xl md:text-2xl font-light">
              <span className="font-semibold">Walk.</span> Don't point vaguely from reception.
            </p>
          </div>
        </Step>

        <Step def={stepDefs[5]} active={active === 6} onClick={() => setActive(6)}>
          <Quote tone="good" who="Say">
            Based on what you've told me, I think you'll enjoy…
          </Quote>
          <p className="text-ink-700 leading-relaxed">
            But don't prescribe something merely because a CRM field exists. Make recommendations from the <strong>conversation</strong>.
          </p>
        </Step>

        <Step def={stepDefs[6]} active={active === 7} onClick={() => setActive(7)}>
          <DoDont dontLabel="Avoid ending with" doLabel="Instead" dont="That's it. Any questions?" doIt="Before I let you go, what are you still unsure about?" />
          <Quote tone="good" who="And">
            For your next couple of visits, I'd suggest exploring X and Y. Tell us what you enjoy and we'll help you from there.
          </Quote>
        </Step>
      </Block>

      {/* Demonstration */}
      <Block>
        <Card tone="dark" className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral-500/25 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="space-y-3">
              <Eyebrow tone="light">Live demonstration</Eyebrow>
              <Display size="md" className="font-light">
                Watch a full seven-step induction.
              </Display>
              <Lede className="text-cream-300">While you watch, keep a tally.</Lede>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Spot", "Which of the seven did you see?"],
                ["Time", "Roughly how long did each take?"],
                ["Understand", "What did the client actually take away?"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-display text-xl text-coral-400">{k}</div>
                  <div className="mt-1 text-sm text-cream-300">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Block>
    </div>
  );
}
