import { useState } from "react";
import { Shuffle, RotateCcw, MessageSquare, Zap, Plus, X, Brain, Ear } from "lucide-react";
import type { Section } from "../data";
import { cn } from "../utils/cn";
import { ModuleHeader, Card, Eyebrow, Display, Quote, Block, Lede, Statement, BigQuestion, Chip } from "./ui";

/* ================================================================== */
/* MODULE 9                                                            */
/* ================================================================== */

interface Curveball {
  text: string;
  kind: "says" | "event";
}

const curveballs: Curveball[] = [
  { text: "My class starts in three minutes.", kind: "says" },
  { text: "I've already been told all this.", kind: "says" },
  { text: "Which class burns the most calories?", kind: "says" },
  { text: "Can I cancel 30 minutes before?", kind: "says" },
  { text: "Nobody told me that when I bought the package.", kind: "says" },
  { text: "My friend said she'd get me into class even if I'm late.", kind: "says" },
  { text: "I hate cycling.", kind: "says" },
  { text: "Which trainer is the best?", kind: "says" },
  { text: "Can I lose 5 kg before my wedding?", kind: "says" },
  { text: "I have an injury. Which class is safe for me?", kind: "says" },
  { text: "I don't understand the difference between FIT and Strength Lab.", kind: "says" },
  { text: "Can you just WhatsApp all this to me?", kind: "says" },
  { text: "Reception phone rings.", kind: "event" },
  { text: "Another member interrupts.", kind: "event" },
  { text: "Client starts scrolling Instagram.", kind: "event" },
  { text: "Trainer calls the client into class.", kind: "event" },
];

export function Module9({ section, go }: { section: Section; go?: (id: string) => void }) {
  const [current, setCurrent] = useState<Curveball | null>(null);
  const [drawn, setDrawn] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  const draw = () => {
    const remaining = curveballs.filter((c) => !drawn.includes(c.text));
    const pool = remaining.length ? remaining : curveballs;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(next);
    setDrawn(remaining.length ? [...drawn, next.text] : [next.text]);
    setRound((r) => r + 1);
  };

  const reset = () => {
    setCurrent(null);
    setDrawn([]);
    setRound(0);
  };

  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="Curveball Challenge" subtitle="One person starts an induction while an observer introduces unexpected client questions and studio interruptions." />

      <Block>
        <div className="grain relative overflow-hidden rounded-3xl bg-ink-950 p-6 md:p-10 text-cream-50">
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-coral-500/30 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            <div className="space-y-6">
              <Eyebrow tone="light">The deck</Eyebrow>
              <Display size="md" className="font-light">
                Keep going. Whatever lands.
              </Display>
              <p className="text-cream-300 leading-relaxed">The associate keeps the induction moving while absorbing each curveball — a client line or a studio interruption.</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={draw} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-coral-400">
                  <Shuffle className="h-4 w-4" /> {current ? "Next curveball" : "Draw a curveball"}
                </button>
                {round > 0 && (
                  <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition-colors hover:bg-white/10">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                )}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-cream-400">
                {drawn.length}/{curveballs.length} thrown
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div
                className={cn(
                  "flex min-h-[260px] flex-1 flex-col items-center justify-center rounded-3xl border p-8 text-center transition-colors",
                  current?.kind === "event" ? "border-gold-500/50 bg-gold-500/10" : "border-white/10 bg-white/5"
                )}
              >
                {current ? (
                  <div key={round} className="animate-fade-up space-y-4">
                    <Chip tone="light" className="px-3.5 py-1.5">
                      {current.kind === "says" ? <MessageSquare className="h-3.5 w-3.5 text-coral-400" /> : <Zap className="h-3.5 w-3.5 text-gold-500" />}
                      {current.kind === "says" ? "Client says" : "Situation"}
                    </Chip>
                    <p className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight">
                      {current.kind === "says" ? `“${current.text}”` : current.text}
                    </p>
                  </div>
                ) : (
                  <p className="font-display text-2xl font-light text-cream-400">Draw a curveball when the induction is underway.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Block>

      <Block>
        <Eyebrow tone="coral">All sixteen curveballs</Eyebrow>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {curveballs.map((c) => {
            const used = drawn.includes(c.text);
            return (
              <div
                key={c.text}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4 text-sm transition-all",
                  used ? "border-cream-300 bg-cream-200/60 text-ink-400" : "border-cream-200 bg-white shadow-soft",
                  current?.text === c.text && "border-coral-500 ring-2 ring-coral-500/30"
                )}
              >
                {c.kind === "says" ? <MessageSquare className={cn("mt-0.5 h-4 w-4 shrink-0", used ? "text-ink-300" : "text-coral-500")} /> : <Zap className={cn("mt-0.5 h-4 w-4 shrink-0", used ? "text-ink-300" : "text-gold-500")} />}
                <span className={cn("font-medium leading-snug", used && "line-through")}>{c.kind === "says" ? `“${c.text}”` : c.text}</span>
              </div>
            );
          })}
        </div>
      </Block>

      <Block>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card tone="cream" className="flex flex-col justify-between">
            <Eyebrow>The challenge isn't</Eyebrow>
            <p className="mt-4 font-display text-3xl font-light tracking-tight text-ink-500">knowing every answer.</p>
          </Card>
          <Statement size="md" kicker="It's">
            Can you remain <span className="text-coral-400">composed, warm and useful?</span>
          </Statement>
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">One of the most important sentences you can say</Eyebrow>
        </div>
        <Quote tone="good" who="Get comfortable saying" size="lg">
          I don't want to give you the wrong information. Let me check that for you.
        </Quote>
        <Lede>That's infinitely better than confidently inventing an answer.</Lede>
        {go && (
          <button type="button" onClick={() => go("studio")} className="group flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-900/10 bg-white px-6 py-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-ink-900/30">
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-coral-600">Make it real</span>
              <span className="block font-display text-xl font-medium tracking-tight">Run a full induction on a real member in the Studio — set pressure to “Chaos”</span>
            </span>
            <Zap className="h-5 w-5 text-gold-500 transition-transform group-hover:scale-110" />
          </button>
        )}
      </Block>
    </div>
  );
}

/* ================================================================== */
/* MODULE 10                                                           */
/* ================================================================== */

function ListBuilder({ title, icon, placeholder, tone }: { title: string; icon: React.ReactNode; placeholder: string; tone: "dark" | "light" }) {
  const [items, setItems] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const add = () => {
    const v = value.trim();
    if (!v) return;
    setItems((s) => [...s, v]);
    setValue("");
  };
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col rounded-3xl border", dark ? "border-ink-900 bg-ink-900 text-cream-50 shadow-lift" : "border-cream-200 bg-white shadow-soft")}>
      <div className={cn("flex items-center justify-between border-b px-6 py-4", dark ? "border-white/10" : "border-cream-200")}>
        <div className="flex items-center gap-3">
          <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full", dark ? "bg-coral-500 text-white" : "bg-cream-200 text-ink-700")}>{icon}</span>
          <div className="font-display text-xl font-medium">{title}</div>
        </div>
        <span className={cn("rounded-full px-3 py-1 font-mono text-sm font-bold tabular-nums", dark ? "bg-white/10" : "bg-cream-200")}>{items.length}</span>
      </div>
      <div className="flex-1 p-6">
        {items.length === 0 ? (
          <p className={cn("text-sm", dark ? "text-cream-400" : "text-ink-400")}>Nothing added yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((it, i) => (
              <li key={i} className={cn("group flex items-start justify-between gap-3 rounded-xl px-4 py-2.5", dark ? "bg-white/5" : "bg-cream-100")}>
                <span className="leading-snug">{it}</span>
                <button type="button" onClick={() => setItems((s) => s.filter((_, j) => j !== i))} className={cn("opacity-0 group-hover:opacity-100 transition-opacity", dark ? "text-cream-400 hover:text-white" : "text-ink-400 hover:text-ink-900")} aria-label="Remove">
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={cn("flex items-center gap-2 border-t p-4", dark ? "border-white/10" : "border-cream-200")}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={placeholder}
          className={cn(
            "flex-1 rounded-full border px-4 py-2.5 text-sm outline-none transition-colors",
            dark ? "border-white/15 bg-white/5 placeholder:text-cream-400 focus:border-coral-400" : "border-cream-300 bg-cream-50 placeholder:text-ink-400 focus:border-ink-900"
          )}
        />
        <button type="button" onClick={add} className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors", dark ? "bg-coral-500 text-white hover:bg-coral-400" : "bg-ink-900 text-cream-50 hover:bg-ink-700")} aria-label="Add">
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Module10({ section }: { section: Section }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="The Client Memory Test" subtitle="The strongest exercise of the session. One final induction — judged by the only person whose opinion counts." />

      <Block>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["01", "One final associate performs a full induction."],
            ["02", "When it ends, we don't ask the associate how it went."],
            ["03", "We ask the client one question."],
          ].map(([n, t]) => (
            <Card key={n} tone="light" className="flex items-start gap-4">
              <span className="font-display text-3xl font-light text-coral-500">{n}</span>
              <p className="font-display text-xl font-light leading-snug">{t}</p>
            </Card>
          ))}
        </div>
        <BigQuestion kicker="To the client">What do you remember?</BigQuestion>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Compare</Eyebrow>
          <Display size="md">Everything they remember vs. everything that was said.</Display>
          <Lede>Capture both lists live. The difference will be obvious.</Lede>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <ListBuilder title="What the client remembers" icon={<Brain className="h-4 w-4" />} placeholder="Add something the client remembered…" tone="dark" />
          <ListBuilder title="What the associate said" icon={<Ear className="h-4 w-4" />} placeholder="Add something the associate covered…" tone="light" />
        </div>
      </Block>

      <Statement kicker="Finish with this" size="lg">
        Our job isn't to get through the induction. <span className="text-coral-400">Our job is to make the induction get through to the client.</span>
      </Statement>
    </div>
  );
}
