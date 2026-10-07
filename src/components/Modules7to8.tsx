import { useState } from "react";
import { Siren, Eye, EyeOff, Lock, RotateCcw, Users, UserRound, Drama } from "lucide-react";
import type { Section } from "../data";
import { cn } from "../utils/cn";
import { ModuleHeader, Card, Eyebrow, Display, Block, Lede, Chip, Reveal, Statement } from "./ui";

/* ================================================================== */
/* MODULE 7                                                            */
/* ================================================================== */

const crimes = [
  "Doesn't introduce themselves.",
  "Doesn't use the client's name.",
  "Talks incredibly quickly.",
  "Reads CRM information aloud.",
  "Asks no questions.",
  "Explains every class.",
  "Uses jargon.",
  "Lists seven policies consecutively.",
  "Points towards the changing room.",
  "Interrupts the client.",
  "Recommends something without understanding their goal.",
  "Says “Anything else?”",
  "Finishes abruptly.",
];

export function Module7({ section }: { section: Section }) {
  const [spotted, setSpotted] = useState<boolean[]>(() => crimes.map(() => false));
  const count = spotted.filter(Boolean).length;

  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="The Terrible Induction" subtitle="The comedy break. One client. One associate. Everyone else has a single job." />

      <Block>
        <div className="grid gap-4 md:grid-cols-3">
          <Card tone="cream">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft">
                <UserRound className="h-5 w-5" />
              </span>
              <Eyebrow>Role 1</Eyebrow>
            </div>
            <div className="mt-4 font-display text-2xl font-medium">The Client</div>
            <p className="mt-2 text-sm text-ink-600">A brand-new member on their first visit. React naturally.</p>
          </Card>
          <Card tone="cream">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft">
                <Drama className="h-5 w-5" />
              </span>
              <Eyebrow>Role 2</Eyebrow>
            </div>
            <div className="mt-4 font-display text-2xl font-medium">The Associate</div>
            <p className="mt-2 text-sm text-ink-600">Mission: commit as many of the crimes below as possible in one induction.</p>
          </Card>
          <Card tone="dark" className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral-500/30 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral-500">
                  <Siren className="h-5 w-5" />
                </span>
                <Eyebrow tone="light">Everyone else</Eyebrow>
              </div>
              <div className="mt-4 font-display text-2xl font-medium uppercase">Spot the crime</div>
              <p className="mt-2 text-sm text-cream-300">Every time you see poor servicing — call it out.</p>
            </div>
          </Card>
        </div>
      </Block>

      <Block>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <Eyebrow tone="coral">The crime sheet</Eyebrow>
            <Display size="md">Thirteen ways to ruin an induction.</Display>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-ink-900 px-5 py-2 font-mono text-sm font-bold text-cream-50 tabular-nums">
              {count} / {crimes.length} spotted
            </div>
            {count > 0 && (
              <button type="button" onClick={() => setSpotted(crimes.map(() => false))} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 hover:text-ink-900">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            )}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {crimes.map((c, i) => {
            const on = spotted[i];
            return (
              <button
                key={c}
                type="button"
                onClick={() => setSpotted((s) => s.map((v, j) => (j === i ? !v : v)))}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                  on ? "border-coral-500 bg-coral-500 text-white shadow-lift" : "border-cream-200 bg-white shadow-soft hover:border-ink-900/30"
                )}
              >
                <span className={cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm", on ? "bg-white text-coral-600" : "bg-ink-900 text-cream-50")}>
                  {on ? "✓" : String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("font-medium leading-snug", on && "line-through decoration-white/60")}>{c}</span>
              </button>
            );
          })}
        </div>
      </Block>

      <Block>
        <Eyebrow tone="coral">After the performance</Eyebrow>
        <div className="grid gap-4 md:grid-cols-2">
          <Card tone="light" className="space-y-5">
            <p className="font-display text-2xl md:text-3xl italic font-light">“Technically, did this associate conduct an induction?”</p>
            <Reveal label="Answer" tone="light">
              <p className="font-display text-4xl font-medium">Probably yes.</p>
            </Reveal>
          </Card>
          <Card tone="light" className="space-y-5">
            <p className="font-display text-2xl md:text-3xl italic font-light">“Was it a good induction?”</p>
            <Reveal label="Answer" tone="light">
              <p className="font-display text-4xl font-medium text-coral-600">Clearly no.</p>
            </Reveal>
          </Card>
        </div>
        <Statement size="md" kicker="The distinction">
          Doing the induction and doing it well are two different things.
        </Statement>
      </Block>
    </div>
  );
}

/* ================================================================== */
/* MODULE 8                                                            */
/* ================================================================== */

interface Persona {
  n: number;
  name: string;
  crm: [string, string][];
  secret: React.ReactNode;
  objective: string;
}

const personas: Persona[] = [
  {
    n: 1,
    name: "The Nervous Beginner",
    crm: [
      ["Goal", "Get fitter"],
      ["Experience", "None"],
      ["Visits", "0"],
    ],
    secret: (
      <>
        You're intimidated by everyone looking fitter than you. At some point, say: <em>“I'm probably going to be terrible at this.”</em>
      </>
    ),
    objective: "Build confidence without making unrealistic promises.",
  },
  {
    n: 2,
    name: "The Gym Regular",
    crm: [
      ["Goal", "Build strength"],
      ["Experience", "Gym 4× / week"],
    ],
    secret: (
      <>
        Say: <em>“I already lift. I don't really understand why I'd need Barre.”</em>
      </>
    ),
    objective: "Understand the client's existing training and explain differences without becoming defensive.",
  },
  {
    n: 3,
    name: "The Wedding Client",
    crm: [
      ["Profile", "Brooke (basic)"],
      ["Goal", "Get fit for July 2026 wedding"],
      ["Health notes", "Asthma. Tries to limit intense cardio."],
      ["Visits", "0"],
    ],
    secret: (
      <>
        If asked properly, reveal: <em>“I really want stronger arms and core and I want to feel confident in my clothes.”</em> If the associate doesn't ask — <strong>don't volunteer it.</strong>
      </>
    ),
    objective: "Discover what the CRM can't tell you. The detail only surfaces if you ask — this is the value of discovery.",
  },
  {
    n: 4,
    name: "The Busy Executive",
    crm: [
      ["Goal", "Stay fit"],
      ["Preferred time", "Early mornings"],
    ],
    secret: (
      <>
        Interrupt the conversation: <em>“Sorry, I have another commitment coming up.”</em>
      </>
    ),
    objective: "Prioritise the Must Knows and shorten gracefully.",
  },
  {
    n: 5,
    name: "The Silent Client",
    crm: [
      ["Goal", "General fitness"],
      ["Experience", "—"],
    ],
    secret: (
      <>
        Answer only with: <em>“Yeah.” “Fine.” “Okay.” “Not really.”</em>
      </>
    ),
    objective: "Ask open-ended questions without interrogating.",
  },
  {
    n: 6,
    name: "The Overenthusiastic Client",
    crm: [
      ["Goal", "General fitness"],
      ["Visits", "0"],
    ],
    secret: (
      <>
        Say: <em>“I'm going to come every single day. Which classes should I double up?”</em>
      </>
    ),
    objective: "Don't make medical or training prescriptions beyond your role. Help them understand formats and encourage an appropriate conversation with trainers where necessary.",
  },
];

function PersonaCard({ p }: { p: Persona }) {
  const [secret, setSecret] = useState(false);
  const [objective, setObjective] = useState(false);
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-cream-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 font-display text-cream-50">{p.n}</span>
          <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">{p.name}</h3>
        </div>
      </div>

      <div className="space-y-5 p-6 flex-1">
        <div>
          <Eyebrow className="mb-2">CRM · Visible to the associate</Eyebrow>
          <dl className="rounded-2xl border border-cream-200 bg-cream-100/70 divide-y divide-cream-200">
            {p.crm.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-2 px-4 py-2 text-sm">
                <dt className="font-bold uppercase tracking-wider text-[10px] text-ink-500 pt-1">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={cn("rounded-2xl p-4 transition-colors", secret ? "bg-ink-900 text-cream-50" : "bg-cream-200/70 border border-dashed border-ink-900/20")}>
          <div className="flex items-center justify-between gap-3">
            <div className={cn("flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]", secret ? "text-coral-400" : "text-ink-500")}>
              <Lock className="h-3.5 w-3.5" /> Secret brief · Client only
            </div>
            <button
              type="button"
              onClick={() => setSecret((s) => !s)}
              className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-colors", secret ? "bg-white/10 hover:bg-white/20" : "bg-ink-900 text-cream-50 hover:bg-ink-700")}
            >
              {secret ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {secret ? "Hide" : "Reveal"}
            </button>
          </div>
          {secret ? (
            <p className="animate-fade-in mt-3 leading-relaxed">{p.secret}</p>
          ) : (
            <p className="mt-3 text-sm text-ink-500">Associate — look away before this is revealed.</p>
          )}
        </div>
      </div>

      <div className="border-t border-cream-200 bg-cream-100/50 px-6 py-4">
        <button type="button" onClick={() => setObjective((o) => !o)} className="flex w-full items-center justify-between text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-500">Debrief · Associate objective</span>
          <span className="text-xs font-bold text-coral-600">{objective ? "Hide" : "Show"}</span>
        </button>
        {objective && <p className="animate-fade-in mt-2 font-display text-lg leading-snug">{p.objective}</p>}
      </div>
    </article>
  );
}

const fiveCs = [
  { c: "Connect", q: "Did I feel welcomed?" },
  { c: "Curious", q: "Did they discover something useful?" },
  { c: "Clear", q: "Could I understand them?" },
  { c: "Complete", q: "Were the important induction elements covered?" },
  { c: "Continue", q: "Did I leave knowing what happens next?" },
];

type Rating = "STRONG" | "DEVELOPING" | "RETRY";
const ratings: Rating[] = ["STRONG", "DEVELOPING", "RETRY"];

function Scorecard() {
  const [scores, setScores] = useState<(Rating | null)[]>(() => fiveCs.map(() => null));
  return (
    <div className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-200 bg-cream-100/70 px-6 py-4">
        <div>
          <div className="font-display text-xl font-medium">Observer card · The 5 Cs</div>
          <div className="text-xs text-ink-500">Nobody scores personality. No numerical scores needed initially.</div>
        </div>
        <button type="button" onClick={() => setScores(fiveCs.map(() => null))} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 hover:text-ink-900">
          <RotateCcw className="h-3.5 w-3.5" /> Clear
        </button>
      </div>
      <ul className="divide-y divide-cream-200">
        {fiveCs.map((f, i) => (
          <li key={f.c} className="grid gap-3 px-6 py-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="font-display text-2xl font-medium uppercase tracking-tight">{f.c}</div>
              <div className="text-sm text-ink-600">{f.q}</div>
            </div>
            <div className="flex gap-1.5">
              {ratings.map((r) => {
                const on = scores[i] === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setScores((s) => s.map((v, j) => (j === i ? (v === r ? null : r) : v)))}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-[11px] font-bold tracking-[0.12em] transition-colors",
                      !on && "border-ink-900/15 text-ink-600 hover:border-ink-900/40",
                      on && r === "STRONG" && "border-sage-700 bg-sage-700 text-white",
                      on && r === "DEVELOPING" && "border-gold-500 bg-gold-500 text-ink-900",
                      on && r === "RETRY" && "border-coral-500 bg-coral-500 text-white"
                    )}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Module8({ section, go }: { section: Section; go?: (id: string) => void }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="Client Persona Role-Plays" subtitle="You've earned the proper role-play. In pairs: one Associate, one Client." />

      {go && (
        <button
          type="button"
          onClick={() => go("studio")}
          className="group grain relative flex w-full flex-wrap items-center justify-between gap-5 overflow-hidden rounded-3xl bg-coral-500 p-6 text-left text-white shadow-lift transition-colors hover:bg-coral-600 md:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="relative space-y-2">
            <Eyebrow tone="light" className="text-white/80">
              Run it for real
            </Eyebrow>
            <div className="font-display text-3xl md:text-4xl font-light tracking-tight">Open the Role-Play Studio</div>
            <p className="max-w-xl text-white/85">Real member records from the CRM sheet, a secret persona auto-matched to the data, hidden truths that only surface when the right question is asked, observer-triggered curveballs — and a guided debrief.</p>
          </div>
          <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-coral-600 transition-transform group-hover:translate-x-1">
            <Users className="h-6 w-6" />
          </span>
        </button>
      )}

      <Block>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card tone="dark" className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral-500/25 blur-3xl" />
            <div className="relative grid gap-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Users className="h-5 w-5" />
                  </span>
                  <Eyebrow tone="light">The Client</Eyebrow>
                </div>
                <p className="mt-4 text-cream-200 leading-relaxed">
                  Gets a <strong className="text-cream-50">secret persona</strong>. Play it honestly — and don't give away what you weren't asked.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral-500">
                    <UserRound className="h-5 w-5" />
                  </span>
                  <Eyebrow tone="light">The Associate</Eyebrow>
                </div>
                <p className="mt-4 text-cream-200 leading-relaxed">
                  Sees <strong className="text-cream-50">only the CRM profile</strong>. Follow the seven-step framework. Discover the rest.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Six personas</Eyebrow>
          <Display size="md">Same framework. Very different people.</Display>
          <Lede>Associates: read only the CRM. Clients: reveal your brief privately.</Lede>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {personas.map((p) => (
            <PersonaCard key={p.n} p={p} />
          ))}
        </div>
      </Block>

      <Block>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <Eyebrow tone="coral">Role-play observation</Eyebrow>
            <Display size="md">Observers look for five things.</Display>
          </div>
          <div className="flex gap-2">
            <Chip tone="sage">Strong</Chip>
            <Chip className="bg-gold-200 text-ink-800">Developing</Chip>
            <Chip tone="coral">Retry</Chip>
          </div>
        </div>
        <Scorecard />
      </Block>
    </div>
  );
}
