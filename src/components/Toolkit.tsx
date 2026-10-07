import { useState } from "react";
import { ArrowRight, Printer, ShieldAlert, Plus, X, Database, MessagesSquare, PenLine, Home } from "lucide-react";
import type { Section } from "../data";
import { cn } from "../utils/cn";
import { ModuleHeader, Card, Eyebrow, Display, Block, Lede, Statement, Chip } from "./ui";

/* ================================================================== */
/* CRM LOOP                                                            */
/* ================================================================== */

const after: [string, string][] = [
  ["Goal", "Wedding – July 2026"],
  ["Goal detail", "Wants to feel stronger; focus on arms/core"],
  ["Preference", "Enjoys strength-based workouts"],
  ["Cardio preference", "Doesn't enjoy prolonged high-intensity cardio"],
  ["Interested formats", "Barre + Strength Lab"],
  ["Preferred schedule", "Morning"],
  ["First class feedback", "[actual feedback]"],
  ["Follow-up opportunity", "Check experience after 3–4 visits"],
];

export function CrmLoop({ section }: { section: Section }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title={<>After the induction — <span className="italic font-light">the CRM Loop</span></>} subtitle="One final operational behaviour. The conversation doesn't end when the client walks into class." />

      <Block>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              k: "Before",
              Icon: Database,
              h: "CRM informs the conversation.",
              body: (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
                  {["Goal", "Context", "Preferences", "Considerations", "Behaviour"].map((w, i) => (
                    <span key={w} className="flex items-center gap-2">
                      {w}
                      {i < 4 && <ArrowRight className="h-3.5 w-3.5 text-coral-500" />}
                    </span>
                  ))}
                </div>
              ),
            },
            { k: "During", Icon: MessagesSquare, h: "Conversation enriches our understanding.", body: <p className="text-sm text-ink-600">Discover what the CRM couldn't tell us.</p> },
            { k: "After", Icon: PenLine, h: "Update useful information.", body: <p className="text-sm text-ink-600">The next associate shouldn't have to start from zero.</p> },
          ].map((s, i) => (
            <div key={s.k} className={cn("relative rounded-3xl p-7 md:p-8", i === 2 ? "bg-ink-900 text-cream-50 shadow-lift" : "bg-white border border-cream-200 shadow-soft")}>
              <div className="flex items-center justify-between">
                <Eyebrow tone={i === 2 ? "light" : "coral"}>{s.k}</Eyebrow>
                <s.Icon className={cn("h-5 w-5", i === 2 ? "text-coral-400" : "text-ink-400")} />
              </div>
              <div className="mt-4 font-display text-2xl md:text-3xl font-medium tracking-tight leading-tight">{s.h}</div>
              <div className={cn("mt-4", i === 2 && "[&_p]:text-cream-300")}>{s.body}</div>
            </div>
          ))}
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Brooke's record, before and after</Eyebrow>
          <Display size="md">From a single field to servicing intelligence.</Display>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1.4fr] lg:items-stretch">
          <div className="rounded-3xl border border-cream-300 bg-cream-200/60 p-6">
            <Eyebrow className="mb-4">Before</Eyebrow>
            <div className="rounded-2xl bg-white p-4 shadow-soft">
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Fitness goal</div>
              <div className="mt-1 font-medium">Wedding July 2026</div>
            </div>
            <p className="mt-6 text-sm text-ink-500">True. Thin. Useful to nobody at the desk tomorrow.</p>
          </div>
          <div className="hidden lg:flex items-center text-coral-500">
            <ArrowRight className="h-8 w-8" />
          </div>
          <div className="rounded-3xl bg-ink-900 p-6 text-cream-50 shadow-lift">
            <Eyebrow tone="light" className="mb-4">
              After
            </Eyebrow>
            <dl className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
              {after.map(([k, v], i) => (
                <div key={k} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-up grid grid-cols-[150px_1fr] gap-3 px-4 py-2.5 text-sm">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-cream-400 pt-1">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-gold-500/50 bg-gold-200/40 p-5 text-sm text-ink-800">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
          Subject to our CRM and privacy rules — particularly for health information.
        </div>
      </Block>

      <Statement kicker="The shift" size="lg">
        The CRM becomes a <span className="text-coral-400">continuing conversation</span>, not a filing cabinet.
      </Statement>
    </div>
  );
}

/* ================================================================== */
/* CHEAT SHEET                                                         */
/* ================================================================== */

export function CheatSheet({ section }: { section: Section }) {
  return (
    <div className="space-y-10 md:space-y-14">
      <div className="no-print">
        <ModuleHeader section={section} title="The Induction Cheat Sheet" subtitle="One page. Everything from today, in the order you'll use it.">
          <div className="mt-6">
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-cream-50 hover:bg-ink-700 transition-colors">
              <Printer className="h-4 w-4" /> Print this page
            </button>
          </div>
        </ModuleHeader>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-cream-300 bg-white shadow-lift">
        <div className="flex items-center justify-between border-b border-cream-200 px-7 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-semibold tracking-[0.3em] uppercase">Physique 57</span>
            <span className="h-px w-6 bg-coral-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-500">Induction cheat sheet</span>
          </div>
          <span className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.22em] text-ink-400">First visit → First connection</span>
        </div>

        <div className="grid divide-y divide-cream-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {/* Before */}
          <div className="p-7 md:p-10 space-y-6">
            <div>
              <Eyebrow tone="coral">Before the client arrives</Eyebrow>
              <div className="mt-2 font-display text-3xl font-medium uppercase tracking-tight">Scan</div>
            </div>
            <ul className="space-y-2">
              {[
                ["G", "Goal"],
                ["C", "Context"],
                ["P", "Preferences"],
                ["C", "Considerations"],
                ["B", "Behaviour"],
              ].map(([l, w], i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-display text-lg text-cream-50">{l}</span>
                  <span className="font-display text-xl">{w}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-cream-200/70 p-5">
              <Eyebrow className="mb-2">Then think</Eyebrow>
              <p className="font-display text-xl italic font-light">“What are the 2–3 things I'd genuinely like to know more about?”</p>
            </div>
          </div>

          {/* During */}
          <div className="p-7 md:p-10 space-y-6">
            <div>
              <Eyebrow tone="coral">During the induction</Eyebrow>
              <div className="mt-2 font-display text-3xl font-medium uppercase tracking-tight">The 7-Step Framework</div>
            </div>
            <ol className="grid gap-2 sm:grid-cols-2">
              {[
                ["Welcome", "Make me comfortable."],
                ["Discover", "Understand me."],
                ["Decode", "Help me understand our formats."],
                ["Navigate", "Teach me the essentials."],
                ["Tour", "Show me around."],
                ["Personalise", "Connect Physique 57 to me."],
                ["Close", "Give me a next step."],
              ].map(([k, v], i) => (
                <li key={k} className="flex items-start gap-3 rounded-xl border border-cream-200 px-4 py-3">
                  <span className="font-display text-lg text-coral-500">{i + 1}</span>
                  <div>
                    <div className="font-bold uppercase tracking-wider text-xs">{k}</div>
                    <div className="text-sm text-ink-600">{v}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Conversation */}
          <div className="p-7 md:p-10 space-y-6 lg:border-t lg:border-cream-200">
            <div>
              <Eyebrow tone="coral">During the conversation</Eyebrow>
              <div className="mt-2 font-display text-3xl font-medium uppercase tracking-tight">Remember</div>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-ink-900 p-5 text-cream-50">
                <div className="font-display text-2xl uppercase tracking-tight">One level deeper</div>
                <p className="mt-1 text-sm text-cream-300">Before recommending, ask one more useful question.</p>
              </div>
              <div className="rounded-2xl bg-coral-500 p-5 text-white">
                <div className="font-display text-2xl uppercase tracking-tight">Don't assume from data. Explore it.</div>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="p-7 md:p-10 space-y-6 lg:border-t lg:border-cream-200">
            <div>
              <Eyebrow tone="coral">After the induction</Eyebrow>
              <div className="mt-2 font-display text-3xl font-medium uppercase tracking-tight">Ask yourself</div>
            </div>
            <p className="font-display text-2xl italic font-light leading-snug">“What did I learn that would help another team member serve this client better tomorrow?”</p>
            <p className="font-display text-2xl">
              Record <span className="font-semibold text-coral-600">that</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* NEVER DO                                                            */
/* ================================================================== */

const nevers = [
  "Read CRM notes back to the client.",
  "Mention sensitive information unnecessarily.",
  "Assume someone's goals from age, gender or appearance.",
  "Diagnose or provide medical advice.",
  "Recommend before understanding.",
  "Recite every policy.",
  "Explain every class identically to every client.",
  "Monologue through the induction without checking in.",
  "Treat the studio tour like pointing out emergency exits.",
  "End without a next step.",
  "Pretend to know an answer when we don't.",
  "Match a price a member quotes at us — confirm it first, and escalate if it differs.",
  "Promise kilograms or inches to an individual.",
  "Say “Spinning” — it is another company's trademark. We say powerCycle, indoor or rhythm cycling.",
  "Call it a ballet or dance class — it is barre-based fitness, and no dance experience is needed.",
  "Offer a format a studio does not run, or a trial a city does not offer.",
  "Open the door after the lock — ten minutes for barre and the Lab, five for powerCycle.",
  "Repeat a member's health disclosure to anyone beyond their Instructor and the Team Leader.",
];

export function NeverDo({ section }: { section: Section }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="What we never do" subtitle="Explicit, so there's no ambiguity." />

      <Block>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {nevers.map((n, i) => (
            <div key={n} className="flex items-start gap-4 rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-500/10 text-coral-600">
                <X className="h-4 w-4" strokeWidth={3} />
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">{String(i + 1).padStart(2, "0")}</div>
                <p className="mt-0.5 font-medium leading-snug">{n}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block>
        <Eyebrow tone="coral">And perhaps most importantly</Eyebrow>
        <Statement tone="coral" size="xl">
          Don't make personalisation creepy.
        </Statement>
        <div className="grid gap-4 md:grid-cols-2">
          <Card tone="dark" className="space-y-3">
            <Eyebrow tone="light">The client should think</Eyebrow>
            <p className="font-display text-3xl md:text-4xl font-light italic">“They understand me.”</p>
          </Card>
          <Card tone="cream" className="space-y-3">
            <Eyebrow>Not</Eyebrow>
            <p className="font-display text-3xl md:text-4xl font-light italic text-ink-400 line-through decoration-coral-500 decoration-4">“Wow. They've read my entire file.”</p>
          </Card>
        </div>
      </Block>
    </div>
  );
}

/* ================================================================== */
/* CLOSING                                                             */
/* ================================================================== */

export function Closing({ section, go }: { section: Section; go: (id: string) => void }) {
  const [commitments, setCommitments] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const add = () => {
    const v = value.trim();
    if (!v) return;
    setCommitments((c) => [...c, v]);
    setValue("");
  };

  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="Closing message" subtitle="One session, one idea." />

      <Block>
        <div className="grain relative overflow-hidden rounded-[2rem] bg-ink-950 px-7 py-12 md:px-14 md:py-16 text-cream-50">
          <div className="pointer-events-none absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-coral-500/25 blur-3xl" />
          <div className="relative max-w-4xl space-y-7 font-display text-2xl md:text-3xl lg:text-[2.1rem] font-light leading-snug tracking-tight text-pretty">
            <p>
              From today, let's not think of this as a checklist that we have to <span className="italic text-cream-400">complete.</span>
            </p>
            <p>
              Think of it as the <span className="text-coral-400">first proper client-servicing conversation</span> we're having with someone after they've chosen to become a Physique 57 client.
            </p>
            <p>The CRM gives us a head start — but it doesn't give us the person. That's what the conversation is for.</p>
            <p>
              Be curious. Ask better questions. Listen properly. Don't overwhelm them. Make the information relevant. Make sure the client feels more confident walking into Physique 57 than they did before the conversation.
            </p>
            <p className="font-medium">That's a successful induction.</p>
          </div>
        </div>
      </Block>

      <Block>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-3">
            <Eyebrow tone="coral">Commitments</Eyebrow>
            <Display size="md">Before you leave: one commitment.</Display>
            <Lede>What's one thing you'll do differently in your very next induction?</Lede>
          </div>
          <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && add()}
                placeholder="e.g. Ask one level deeper before I recommend anything."
                className="flex-1 rounded-full border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm outline-none focus:border-ink-900 transition-colors placeholder:text-ink-400"
              />
              <button type="button" onClick={add} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral-500 text-white hover:bg-coral-600 transition-colors" aria-label="Add commitment">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {commitments.length > 0 ? (
              <ul className="space-y-2">
                {commitments.map((c, i) => (
                  <li key={i} className="group flex items-start justify-between gap-3 rounded-xl bg-cream-100 px-4 py-3">
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 font-display text-xs text-cream-50">{i + 1}</span>
                      <span className="font-medium leading-snug">{c}</span>
                    </span>
                    <button type="button" onClick={() => setCommitments((s) => s.filter((_, j) => j !== i))} className="text-ink-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-ink-900" aria-label="Remove">
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-400">The team's commitments will appear here.</p>
            )}
          </div>
        </div>
      </Block>

      <Block>
        <Eyebrow tone="coral">The principle we leave on screen</Eyebrow>
        <div className="grain relative overflow-hidden rounded-[2rem] bg-ink-950 px-7 py-16 md:px-14 md:py-24 text-cream-50 text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-5xl space-y-6">
            <p className="font-display text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight leading-[1.05] text-cream-400">
              Don't show clients how much we <span className="text-cream-50">know</span> about them.
            </p>
            <div className="mx-auto h-px w-24 bg-coral-500" />
            <p className="font-display text-3xl md:text-5xl lg:text-6xl font-medium uppercase tracking-tight leading-[1.05]">
              Show them how well we <span className="text-coral-400">understand</span> them.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <Chip>End of session · Thank you</Chip>
          <button type="button" onClick={() => go("overview")} className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-5 py-2.5 text-sm font-bold hover:border-ink-900/40 transition-colors">
            <Home className="h-4 w-4" /> Back to overview
          </button>
        </div>
      </Block>
    </div>
  );
}
