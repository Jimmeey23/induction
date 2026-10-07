import { useEffect, useState } from "react";
import { Play, Square, Lock, Unlock, Check, Undo2, AlertCircle, HelpCircle, Minus, Plus, Siren, Footprints, MessageCircleQuestion, Ban, Flag, Bell, Ear } from "lucide-react";
import { firstSeven, crimeList, fiveCs, type Rating } from "../../lib/scenarios";
import { cn } from "../../utils/cn";
import { Eyebrow } from "../ui";
import { MemberCard } from "./MemberCard";
import { type Action, type Role, type Session } from "./session";

const ratings: Rating[] = ["STRONG", "DEVELOPING", "RETRY"];

export function StudioLive({ session, dispatch, onEnd }: { session: Session; dispatch: (a: Action) => void; onEnd: () => void }) {
  const [role, setRole] = useState<Role>("associate");
  const [unlocked, setUnlocked] = useState(false);
  const s = session;
  const started = s.started;

  useEffect(() => {
    if (role !== "client") setUnlocked(false);
  }, [role]);

  const pending = s.fired.filter((f) => !f.delivered && f.kind !== "event").length;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="sticky top-[57px] z-30 -mx-5 border-y border-ink-900/10 bg-cream-100/90 px-5 py-3 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <div className="truncate font-display text-lg font-medium tracking-tight">
                {s.scenario.member.name}
                {role !== "associate" && <span className="text-ink-400"> · {s.scenario.persona.name}</span>}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">{s.scenario.difficulty} practice</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!started ? (
              <button type="button" onClick={() => dispatch({ type: "start" })} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-coral-600">
                <Play className="h-4 w-4" /> Start induction
              </button>
            ) : (
              <button type="button" onClick={onEnd} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-cream-50 hover:bg-ink-700">
                <Square className="h-3.5 w-3.5" /> End round → debrief
              </button>
            )}
          </div>
        </div>

        {/* Role tabs */}
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-cream-200 p-1">
          {(
            [
              ["associate", s.names.associate || "Associate"],
              ["client", s.names.client || "Client"],
              ["observer", s.names.observer || "Observer"],
            ] as [Role, string][]
          ).map(([r, label]) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn("relative rounded-full py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors", role === r ? "bg-ink-900 text-cream-50 shadow-soft" : "text-ink-600 hover:bg-cream-300")}
            >
              {r === "client" && <Lock className="mr-1.5 inline h-3 w-3" />}
              {label}
              {r === "client" && pending > 0 && role !== "client" && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral-500 text-[10px] text-white animate-pulse-soft">{pending}</span>}
            </button>
          ))}
        </div>
      </div>

      {role === "associate" && <AssociateView s={s} dispatch={dispatch} />}
      {role === "client" && (unlocked ? <ClientView s={s} dispatch={dispatch} /> : <LockScreen name={s.names.client} onUnlock={() => setUnlocked(true)} />)}
      {role === "observer" && <ObserverView s={s} dispatch={dispatch} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lock                                                                */
/* ------------------------------------------------------------------ */

function LockScreen({ name, onUnlock }: { name: string; onUnlock: () => void }) {
  return (
    <div className="grain relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-16 text-center text-cream-50">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral-500/25 blur-3xl" />
      <div className="relative mx-auto max-w-md space-y-6">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
          <Lock className="h-6 w-6" />
        </span>
        <h3 className="font-display text-3xl font-light">Client eyes only</h3>
        <p className="text-cream-300">This screen holds the secret persona and the hidden truths. {name ? `Pass the device to ${name}` : "Pass the device to the client"} and make sure the associate can't see it.</p>
        <button type="button" onClick={onUnlock} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-bold text-white hover:bg-coral-400">
          <Unlock className="h-4 w-4" /> I'm the client — reveal my brief
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Associate                                                           */
/* ------------------------------------------------------------------ */

function AssociateView({ s, dispatch }: { s: Session; dispatch: (a: Action) => void }) {
  const current = s.stepLog[s.stepLog.length - 1] ?? 0;
  const started = s.started;

  const startStep = (n: number) => {
    if (!started) dispatch({ type: "start" });
    dispatch({ type: "step", step: n });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-4">
        <Eyebrow tone="coral">What you can see</Eyebrow>
        <MemberCard member={s.scenario.member} />
        <div className="flex flex-wrap gap-2">
          {[
            ["Don't read the CRM aloud", Ban],
            ["One level deeper", MessageCircleQuestion],
            ["Walk, don't point", Footprints],
            ["Close with a next step", Flag],
          ].map(([t, I]) => {
            const Icon = I as typeof Ban;
            return (
              <span key={t as string} className="inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
                <Icon className="h-3.5 w-3.5 text-coral-500" /> {t as string}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Eyebrow tone="coral">The seven-step induction · tap each step as you begin it</Eyebrow>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">{new Set(s.stepLog).size}/7 covered</span>
        </div>
        <ol className="space-y-2">
          {firstSeven.map((st) => {
            const active = current === st.n && !s.ended;
            const done = s.stepLog.includes(st.n) && !active;
            return (
              <li key={st.n}>
                <button
                  type="button"
                  onClick={() => startStep(st.n)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                    active ? "border-coral-500 bg-coral-500 text-white shadow-lift" : done ? "border-ink-900 bg-ink-900 text-cream-50" : "border-cream-200 bg-white shadow-soft hover:border-ink-900/30"
                  )}
                >
                  <span className={cn("inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg", active ? "bg-white text-coral-600" : done ? "bg-white/10" : "bg-ink-900 text-cream-50")}>{done ? <Check className="h-5 w-5" /> : st.n}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-medium uppercase tracking-tight">{st.name}</span>
                    <span className={cn("block text-sm", active ? "text-white/85" : done ? "text-cream-300" : "text-ink-500")}>{st.mantra}</span>
                  </span>
                  <span className={cn("text-right text-[10px] font-bold uppercase tracking-wider", active ? "text-white/80" : done ? "text-cream-400" : "text-ink-400")}>
                    {active ? "Current" : done ? "Done" : "To do"}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={!started}
            onClick={() => dispatch({ type: "check" })}
            className="flex items-center gap-3 rounded-2xl border border-sage-500 bg-sage-200/40 p-4 text-left transition-colors hover:bg-sage-200/70 disabled:opacity-50"
          >
            <HelpCircle className="h-6 w-6 shrink-0 text-sage-700" />
            <span>
              <span className="block text-sm font-bold text-sage-700">“I don't want to give you the wrong information. Let me check that for you.”</span>
              <span className="block text-xs text-ink-500">Tap when you say it · {s.checks} so far</span>
            </span>
          </button>
          <div className="rounded-2xl border border-cream-300 bg-cream-200/60 p-4 text-sm text-ink-700">
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">Remember</span>
            Health notes stay private. If a question is medical, the answer is the trainer — warmly.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Client (secret)                                                     */
/* ------------------------------------------------------------------ */

const feelLabels = ["Lost", "Unsure", "Okay", "Comfortable", "Confident"];

function ClientView({ s, dispatch }: { s: Session; dispatch: (a: Action) => void }) {
  const p = s.scenario.persona;
  const m = s.scenario.member;
  const last = s.feelLog[s.feelLog.length - 1] ?? 35;
  const [feel, setFeel] = useState(last);
  const pending = s.fired.filter((f) => !f.delivered && f.kind !== "event");
  const delivered = s.fired.filter((f) => f.delivered && f.kind !== "event");
  const label = feelLabels[Math.min(4, Math.floor(feel / 20.01))];

  return (
    <div className="space-y-6">
      {/* Say now */}
      {pending.map((f) => (
        <div key={f.id} className="animate-fade-up grain relative overflow-hidden rounded-3xl bg-coral-500 p-6 text-white shadow-lift md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                <Bell className="h-3.5 w-3.5" /> Say this now
              </div>
              <p className="mt-2 font-display text-2xl md:text-3xl font-light italic leading-tight">“{f.text}”</p>
            </div>
            <button type="button" onClick={() => dispatch({ type: "delivered", id: f.id })} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-coral-600 hover:bg-cream-50">
              Said it
            </button>
          </div>
        </div>
      ))}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Persona */}
        <div className="space-y-4">
          <div className="grain relative overflow-hidden rounded-3xl bg-ink-950 p-6 text-cream-50 md:p-7">
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-coral-500/25 blur-3xl" />
            <div className="relative space-y-5">
              <div>
                <Eyebrow tone="light">You are {m.firstName} · playing</Eyebrow>
                <h3 className="mt-1 font-display text-3xl font-medium tracking-tight">{p.name}</h3>
                <p className="text-cream-400">{p.tagline}</p>
              </div>
              <p className="leading-relaxed text-cream-200">{p.brief}</p>
              {p.opening && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-400">Your opening line · use it early</div>
                  <p className="mt-1 font-display text-xl italic font-light">“{p.opening}”</p>
                </div>
              )}
              <ul className="space-y-2 text-sm text-cream-200">
                {p.cues.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" /> {c}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-coral-400/40 bg-coral-500/10 p-4 text-sm">
                <span className="font-bold">Golden rule:</span> if they don't ask, don't volunteer it.
              </div>
            </div>
          </div>

          {/* Feel meter */}
          <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <Eyebrow>How do you feel right now?</Eyebrow>
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold", feel < 40 ? "bg-coral-500/10 text-coral-700" : feel < 60 ? "bg-gold-200 text-ink-800" : "bg-sage-200 text-sage-700")}>{label}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={feel}
              onChange={(e) => setFeel(Number(e.target.value))}
              onMouseUp={() => dispatch({ type: "feel", v: feel })}
              onTouchEnd={() => dispatch({ type: "feel", v: feel })}
              onKeyUp={() => dispatch({ type: "feel", v: feel })}
              className="mt-4 w-full accent-coral-500"
            />
            <div className="mt-1 flex justify-between text-[10px] font-bold uppercase tracking-wider text-ink-400">
              {feelLabels.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-500">Move it honestly as the induction happens. The debrief shows the curve.</p>
          </div>
        </div>

        {/* Truths */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Eyebrow tone="coral">Hidden truths · reveal only when earned</Eyebrow>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">
              {Object.keys(s.revealed).length}/{s.scenario.truths.length} revealed
            </span>
          </div>
          {s.scenario.truths.map((t) => {
            const on = s.revealed[t.id] !== undefined;
            const gave = s.volunteered[t.id];
            return (
              <div key={t.id} className={cn("rounded-3xl border p-5 transition-all", on ? "border-sage-500 bg-sage-200/30" : "border-cream-200 bg-white shadow-soft")}>
                <div className="flex items-start justify-between gap-3">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", on ? "bg-sage-700 text-white" : "bg-cream-200 text-ink-700")}>{t.tag}</span>
                </div>
                <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">Only if the associate…</div>
                <p className="mt-0.5 text-sm font-semibold text-ink-800">{t.trigger}</p>
                <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">…then you say</div>
                <p className="mt-0.5 font-display text-lg italic font-light leading-snug">“{t.reveal}”</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {on ? (
                    <button type="button" onClick={() => dispatch({ type: "unreveal", id: t.id })} className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 px-4 py-2 text-xs font-bold hover:border-ink-900/40">
                      <Undo2 className="h-3.5 w-3.5" /> Undo
                    </button>
                  ) : (
                    <button type="button" onClick={() => dispatch({ type: "reveal", id: t.id })} className="inline-flex items-center gap-1.5 rounded-full bg-sage-700 px-4 py-2 text-xs font-bold text-white hover:bg-sage-500">
                      <Check className="h-3.5 w-3.5" /> They earned it — revealed
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "volunteer", id: t.id, on: !gave })}
                    className={cn("inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors", gave ? "bg-coral-500 text-white" : "border border-ink-900/15 text-ink-600 hover:border-ink-900/40")}
                  >
                    <AlertCircle className="h-3.5 w-3.5" /> {gave ? "I gave it away unasked" : "Oops — I volunteered it"}
                  </button>
                </div>
              </div>
            );
          })}

          {delivered.length > 0 && (
            <div className="rounded-2xl border border-cream-300 bg-cream-200/60 p-4 text-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">Lines you've delivered</div>
              <ul className="mt-2 space-y-1 text-ink-700">
                {delivered.map((f) => (
                  <li key={f.id} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-sage-700" /> “{f.text}”
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Observer                                                            */
/* ------------------------------------------------------------------ */

function ObserverView({ s, dispatch }: { s: Session; dispatch: (a: Action) => void }) {
  const available = s.scenario.interruptions.filter((l) => !s.fired.some((f) => f.id === l.id));
  const pendingEvents = s.fired.filter((f) => f.kind === "event" && f.handled === null);

  return (
    <div className="space-y-6">
      {pendingEvents.map((f) => (
        <div key={f.id} className="animate-fade-up flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-gold-500 bg-gold-200/50 p-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-700">
              <Siren className="h-3.5 w-3.5" /> Make this happen now
            </div>
            <p className="mt-1 font-display text-2xl font-light">{f.text}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => dispatch({ type: "handled", id: f.id, handled: true })} className="rounded-full bg-sage-700 px-4 py-2 text-xs font-bold text-white">
              Handled well
            </button>
            <button type="button" onClick={() => dispatch({ type: "handled", id: f.id, handled: false })} className="rounded-full bg-coral-500 px-4 py-2 text-xs font-bold text-white">
              Struggled
            </button>
          </div>
        </div>
      ))}

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          {/* Question tally */}
          <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
            <Eyebrow tone="coral">Question tally</Eyebrow>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["Open", true, s.openQ, "“What made you…?”"],
                ["Closed", false, s.closedQ, "“Have you done…?”"],
              ].map(([label, open, n, ex]) => (
                <div key={label as string} className={cn("rounded-2xl p-4", open ? "bg-sage-200/40" : "bg-coral-500/5")}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-600">{label as string}</span>
                    <span className="text-[10px] text-ink-400">{ex as string}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-display text-4xl">{n as number}</span>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => dispatch({ type: "question", open: open as boolean, delta: -1 })} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-soft hover:bg-cream-100">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => dispatch({ type: "question", open: open as boolean, delta: 1 })} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-cream-50 hover:bg-ink-700">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manual interruptions */}
          <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
            <Eyebrow tone="coral">Choose an interruption</Eyebrow>
            <p className="mt-1 text-xs text-ink-500">Trigger one when it feels natural to challenge the conversation.</p>
            <ul className="mt-3 space-y-2">
              {available.length === 0 && <li className="text-sm text-ink-500">No interruptions remain.</li>}
              {available.map((line) => (
                <li key={line.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cream-100 px-4 py-3 text-sm">
                  <span className="min-w-0">{line.kind === "event" ? line.text : `“${line.text}”`}</span>
                  <button
                    type="button"
                    disabled={!s.started}
                    onClick={() => dispatch({ type: "fire", line })}
                    className="shrink-0 rounded-full bg-ink-900 px-4 py-2 text-xs font-bold text-cream-50 hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Trigger now
                  </button>
                </li>
              ))}
            </ul>
            {s.fired.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-cream-200 pt-4">
                {s.fired.map((f) => (
                  <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-cream-100 px-4 py-3 text-sm">
                    <span className="min-w-0">{f.kind === "event" ? f.text : `“${f.text}”`}</span>
                    <span className="flex gap-1">
                      {[true, false].map((handled) => (
                        <button
                          key={String(handled)}
                          type="button"
                          onClick={() => dispatch({ type: "handled", id: f.id, handled: f.handled === handled ? null : handled })}
                          className={cn("rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors", f.handled === handled ? (handled ? "bg-sage-700 text-white" : "bg-coral-500 text-white") : "bg-white text-ink-600 shadow-soft hover:bg-cream-200")}
                        >
                          {handled ? "Handled" : "Struggled"}
                        </button>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* 5 Cs */}
          <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
            <Eyebrow tone="coral">The 5 Cs</Eyebrow>
            <ul className="mt-3 divide-y divide-cream-200">
              {fiveCs.map((f) => (
                <li key={f.c} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span>
                    <span className="block font-display text-xl font-medium uppercase tracking-tight">{f.c}</span>
                    <span className="block text-xs text-ink-500">{f.q}</span>
                  </span>
                  <span className="flex gap-1">
                    {ratings.map((r) => {
                      const on = s.fiveCs[f.c] === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => dispatch({ type: "fiveC", c: f.c, rating: on ? null : r })}
                          className={cn(
                            "rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.1em] transition-colors",
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
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Crimes */}
          <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <Eyebrow tone="coral">Spot the crime</Eyebrow>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">{Object.values(s.crimes).reduce((a, b) => a + b, 0)} total</span>
            </div>
            <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {crimeList.map((c) => {
                const n = s.crimes[c] ?? 0;
                return (
                  <div key={c} className={cn("flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm transition-colors", n > 0 ? "border-coral-500 bg-coral-500/5" : "border-cream-200")}>
                    <button type="button" onClick={() => dispatch({ type: "crime", crime: c, delta: 1 })} className="min-w-0 flex-1 text-left font-medium leading-tight">
                      {c}
                    </button>
                    <span className="flex items-center gap-1">
                      {n > 0 && (
                        <button type="button" onClick={() => dispatch({ type: "crime", crime: c, delta: -1 })} className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cream-200 hover:bg-cream-300">
                          <Minus className="h-3 w-3" />
                        </button>
                      )}
                      <span className={cn("inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 font-mono text-[11px] font-bold", n > 0 ? "bg-coral-500 text-white" : "bg-cream-200 text-ink-500")}>{n}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <Ear className="h-4 w-4 text-ink-400" />
              <Eyebrow>Observer notes</Eyebrow>
            </div>
            <textarea
              value={s.observerNotes}
              onChange={(e) => dispatch({ type: "notes", text: e.target.value })}
              rows={4}
              placeholder="Specific moments — a great question, a missed cue, a policy that sounded like a threat…"
              className="mt-3 w-full resize-none rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-ink-900 placeholder:text-ink-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
