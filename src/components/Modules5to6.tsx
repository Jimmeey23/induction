import { useState } from "react";
import { Shuffle, Zap, Ban, RotateCcw } from "lucide-react";
import type { Section } from "../data";
import { cn } from "../utils/cn";
import { ModuleHeader, Statement, Card, Eyebrow, Display, Quote, Block, Lede, Chip, DoDont } from "./ui";

/* ================================================================== */
/* MODULE 5                                                            */
/* ================================================================== */

const deeper = [
  { say: "I want to tone.", ask: "When you say tone, is there anything in particular you're hoping to work on?" },
  { say: "I don't like cardio.", ask: "What is it about cardio you don't enjoy — the type of exercise or that very high-intensity feeling?" },
  { say: "Evenings are easier.", ask: "Is that generally throughout the week or only on particular days?" },
  { say: "I want to lose weight.", ask: "Apart from the number on the scale, is there anything you'd really like to feel different — strength, energy, stamina, confidence?" },
  { say: "I used to work out.", ask: "What were you doing, and what did you actually enjoy?" },
];

const rapidDeck = [
  ...deeper.map((d) => d.say),
  "I just want to get back into a routine.",
  "I've heard Barre is really hard.",
  "I only have 45 minutes in the mornings.",
  "I want to get leaner.",
  "My friend told me I should try this.",
  "I get bored easily.",
  "I have a holiday in six weeks.",
  "I've never done a group class before.",
  "I want to build strength.",
  "I'm not very flexible.",
];

function FlipCard({ say, ask, index }: { say: string; ask: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className={cn(
        "group relative flex min-h-[200px] flex-col justify-between rounded-3xl border p-6 text-left transition-all",
        open ? "border-ink-900 bg-ink-900 text-cream-50 shadow-lift" : "border-cream-200 bg-white shadow-soft hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", open ? "text-coral-400" : "text-ink-500")}>{open ? "Ask one level deeper" : `Client says · ${index + 1}`}</span>
        <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider", open ? "bg-white/10" : "bg-cream-200 text-ink-600")}>{open ? "Tap to flip back" : "Tap to reveal"}</span>
      </div>
      {open ? (
        <p className="animate-fade-in mt-4 font-display text-xl md:text-2xl italic font-light leading-snug">“{ask}”</p>
      ) : (
        <p className="mt-4 font-display text-2xl md:text-3xl font-medium tracking-tight">“{say}”</p>
      )}
    </button>
  );
}

export function Module5({ section }: { section: Section }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [drawn, setDrawn] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  const draw = () => {
    const remaining = rapidDeck.filter((s) => !drawn.includes(s));
    const pool = remaining.length ? remaining : rapidDeck;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(next);
    setDrawn(remaining.length ? [...drawn, next] : [next]);
    setRound((r) => r + 1);
  };

  const reset = () => {
    setCurrent(null);
    setDrawn([]);
    setRound(0);
  };

  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="One Level Deeper" subtitle="Fast. Energetic. Before you recommend anything, ask one more useful question." />

      <Statement kicker="The temptation" size="lg">
        Your biggest temptation in sales and servicing is to <span className="text-coral-400">solve too quickly.</span>
      </Statement>

      <Block>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto] md:items-center">
          <Quote tone="client" who="Client">
            I want to tone.
          </Quote>
          <span className="hidden md:block font-display text-3xl text-ink-300">→</span>
          <Quote tone="bad" who="Associate, immediately">
            Take Barre!
          </Quote>
          <div className="flex items-center justify-center rounded-2xl bg-coral-500 px-8 py-5 text-white">
            <span className="font-display text-4xl font-semibold tracking-tight">No.</span>
          </div>
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">The move</Eyebrow>
          <Display size="lg">ONE LEVEL DEEPER.</Display>
          <Lede>Tap each statement to see a follow-up question that earns the recommendation.</Lede>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deeper.map((d, i) => (
            <FlipCard key={d.say} say={d.say} ask={d.ask} index={i} />
          ))}
          <div className="flex min-h-[200px] flex-col justify-between rounded-3xl border border-dashed border-ink-900/20 bg-cream-200/40 p-6">
            <Eyebrow>Pattern</Eyebrow>
            <p className="font-display text-xl md:text-2xl font-light leading-snug text-ink-700">
              Every follow-up opens the conversation. <span className="italic">None of them recommends.</span>
            </p>
          </div>
        </div>
      </Block>

      {/* Rapid fire */}
      <Block>
        <div className="grain relative overflow-hidden rounded-3xl bg-ink-950 p-6 md:p-10 text-cream-50">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-coral-500/30 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral-500">
                  <Zap className="h-5 w-5" />
                </span>
                <Eyebrow tone="light">Group exercise · Around the room</Eyebrow>
              </div>
              <Display size="md" className="font-light">
                One better question.
              </Display>
              <ul className="space-y-3 text-cream-200">
                <li className="flex items-start gap-3">
                  <span className="mt-1 font-display text-coral-400">1</span> A statement appears on screen.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 font-display text-coral-400">2</span> Take a moment to produce a useful follow-up question.
                </li>
                <li className="flex items-start gap-3">
                  <Ban className="mt-1 h-4 w-4 text-coral-400" /> <strong className="text-cream-50">No recommendation allowed.</strong>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={draw} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-coral-400">
                  <Shuffle className="h-4 w-4" /> {current ? "Next statement" : "Draw a statement"}
                </button>
                {round > 0 && (
                  <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-cream-50 transition-colors hover:bg-white/10">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                )}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-cream-400">
                Round {round} · {drawn.length}/{rapidDeck.length} drawn
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex min-h-[260px] flex-1 items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                {current ? (
                  <p key={current} className="animate-fade-up font-display text-3xl md:text-4xl lg:text-5xl font-light italic leading-tight tracking-tight">
                    “{current}”
                  </p>
                ) : (
                  <p className="font-display text-2xl font-light text-cream-400">Draw a statement to begin.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Block>
    </div>
  );
}

/* ================================================================== */
/* MODULE 6                                                            */
/* ================================================================== */

const formats = [
  { name: "Barre", desc: "Controlled, precise, full-body muscular endurance." },
  { name: "Strength Lab", desc: "Heavier resistance, progressive strength development, more recovery between sets." },
  { name: "FIT", desc: "Functional strength + conditioning through timed intervals." },
  { name: "PowerCycle", desc: "Cardio-led cycling with coached intensity." },
];

function Transformation({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <div className="space-y-2">
        <span className="font-display text-6xl font-light text-coral-500">{String(n).padStart(2, "0")}</span>
        <div className="font-display text-3xl font-medium uppercase tracking-tight">{title}</div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function Module6({ section }: { section: Section }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="Explain without information-dumping" subtitle="Three transformations: how we talk about policies, class formats and recommendations." />

      <Transformation n={1} title="Policies">
        <DoDont dont="Our policy states…" doIt="One important thing to remember when you're booking…" />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink-600 mr-1">Policies should sound</span>
          <Chip tone="sage">Clear</Chip>
          <Chip tone="sage">Confident</Chip>
          <span className="text-sm font-semibold text-ink-600 mx-1">— not</span>
          <Chip tone="coral" className="line-through">
            Apologetic
          </Chip>
          <Chip tone="coral" className="line-through">
            Threatening
          </Chip>
        </div>
      </Transformation>

      <Transformation n={2} title="Class formats">
        <div className="grid gap-3 md:grid-cols-2">
          <Card tone="cream">
            <Eyebrow tone="coral">Don't</Eyebrow>
            <p className="mt-2 font-display text-xl font-light">Explain every feature.</p>
          </Card>
          <Card tone="dark">
            <Eyebrow tone="light">Do</Eyebrow>
            <p className="mt-2 font-display text-xl font-light">
              Explain the <span className="font-semibold text-coral-400">difference the client can understand.</span>
            </p>
          </Card>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {formats.map((f) => (
            <div key={f.name} className="rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
              <div className="font-display text-2xl font-medium tracking-tight">{f.name}</div>
              <div className="my-3 h-px w-10 bg-coral-500" />
              <p className="text-[15px] leading-snug text-ink-700">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] md:items-center">
          <Quote tone="good" who="Then" size="lg">
            Based on everything you've told me, which of those sounds most interesting to you?
          </Quote>
          <p className="font-display text-2xl md:text-3xl font-light tracking-tight">
            Now <span className="font-semibold text-coral-600">they're participating.</span>
          </p>
        </div>
      </Transformation>

      <Transformation n={3} title="Recommendations">
        <div className="grid gap-4 md:grid-cols-3">
          <Quote tone="bad" who="Avoid">
            You should definitely…
          </Quote>
          <Quote tone="good" who="Prefer">
            Based on what you've told me…
          </Quote>
          <Quote tone="good" who="Or">
            I think you may enjoy…
          </Quote>
        </div>
        <Statement size="md" kicker="Why">
          The client retains agency.
        </Statement>
      </Transformation>
    </div>
  );
}
