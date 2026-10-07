import { useEffect, useState } from "react";
import { Check, X, Plus, RotateCcw, Shuffle, Brain, Ear, Database, AlertCircle, HelpCircle } from "lucide-react";
import { firstSeven, fiveCs } from "../../lib/scenarios";
import { cn } from "../../utils/cn";
import { Eyebrow, Display, Statement } from "../ui";
import { fmt, stepDurations, type Action, type Session } from "./session";

function ListBuilder({ title, icon, placeholder, items, onChange, dark }: { title: string; icon: React.ReactNode; placeholder: string; items: string[]; onChange: (i: string[]) => void; dark?: boolean }) {
  const [v, setV] = useState("");
  const add = () => {
    const t = v.trim();
    if (!t) return;
    onChange([...items, t]);
    setV("");
  };
  return (
    <div className={cn("flex flex-col rounded-3xl border", dark ? "border-ink-900 bg-ink-900 text-cream-50" : "border-cream-200 bg-white shadow-soft")}>
      <div className={cn("flex items-center justify-between border-b px-5 py-3.5", dark ? "border-white/10" : "border-cream-200")}>
        <div className="flex items-center gap-2 font-display text-lg">
          <span className={cn("inline-flex h-8 w-8 items-center justify-center rounded-full", dark ? "bg-coral-500" : "bg-cream-200")}>{icon}</span>
          {title}
        </div>
        <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-sm font-bold", dark ? "bg-white/10" : "bg-cream-200")}>{items.length}</span>
      </div>
      <ul className="flex-1 space-y-1.5 p-4">
        {items.length === 0 && <li className={cn("text-sm", dark ? "text-cream-400" : "text-ink-400")}>Nothing yet.</li>}
        {items.map((it, i) => (
          <li key={i} className={cn("group flex items-start justify-between gap-2 rounded-xl px-3 py-2 text-sm", dark ? "bg-white/5" : "bg-cream-100")}>
            {it}
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="opacity-0 transition-opacity group-hover:opacity-100">
              <X className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
      <div className={cn("flex gap-2 border-t p-3", dark ? "border-white/10" : "border-cream-200")}>
        <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder={placeholder} className={cn("flex-1 rounded-full border px-4 py-2 text-sm outline-none", dark ? "border-white/15 bg-white/5 placeholder:text-cream-400" : "border-cream-300 bg-cream-50 placeholder:text-ink-400")} />
        <button type="button" onClick={add} className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full", dark ? "bg-coral-500 text-white" : "bg-ink-900 text-cream-50")}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Sparkline({ points, total }: { points: { at: number; v: number }[]; total: number }) {
  const W = 320;
  const H = 80;
  const span = Math.max(total, points[points.length - 1]?.at ?? 1, 1);
  const pts = [...points, { at: span, v: points[points.length - 1]?.v ?? 35 }];
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(p.at / span) * W},${H - (p.v / 100) * H}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-20 w-full">
      <line x1="0" y1={H * 0.5} x2={W} y2={H * 0.5} className="stroke-cream-300" strokeDasharray="3 3" />
      <path d={d} fill="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className="stroke-coral-500" />
      {pts.map((p, i) => (
        <circle key={i} cx={(p.at / span) * W} cy={H - (p.v / 100) * H} r="3.5" className="fill-ink-900" />
      ))}
    </svg>
  );
}

export function StudioDebrief({ session, dispatch, elapsed, onAgain, onNew }: { session: Session; dispatch: (a: Action) => void; elapsed: number; onAgain: () => void; onNew: () => void }) {
  const s = session;
  const m = s.scenario.member;
  const durations = stepDurations(s, elapsed);
  const covered = new Set(s.stepLog.map((e) => e.step));
  const found = s.scenario.truths.filter((t) => s.revealed[t.id] !== undefined);
  const missed = s.scenario.truths.filter((t) => s.revealed[t.id] === undefined);
  const gaveAway = s.scenario.truths.filter((t) => s.volunteered[t.id]);
  const crimesTotal = Object.values(s.crimes).reduce((a, b) => a + b, 0);
  const within = elapsed >= 300 && elapsed <= 420;
  const feelStart = s.feelLog[0]?.v ?? 35;
  const feelEnd = s.feelLog[s.feelLog.length - 1]?.v ?? 35;

  useEffect(() => {
    if (s.crmDraft) return;
    const lines = [
      `Goal: ${m.goal || "—"}`,
      ...found.map((t) => `${t.tag === "Goal" ? "Goal detail" : t.tag === "Persona" ? "Servicing note" : t.tag}: ${t.crm}`),
      `First induction: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · by ${s.names.associate || "associate"}`,
      `Follow-up opportunity: check experience after 3–4 visits`,
    ];
    dispatch({ type: "crmDraft", text: lines.join("\n") });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-12">
      {/* Headline */}
      <div className="grain relative overflow-hidden rounded-3xl bg-ink-950 p-7 text-cream-50 md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-coral-500/25 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-3">
            <Eyebrow tone="light">Debrief</Eyebrow>
            <Display size="md" className="font-light">
              {s.names.associate || "The associate"} × {m.firstName} <span className="text-cream-400">as</span> {s.scenario.persona.name}
            </Display>
            <p className="text-cream-300">The client's objective was: <span className="text-cream-50">{s.scenario.persona.objective}</span></p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {[
              ["Time", fmt(elapsed), within ? "in the 5–7 window" : elapsed < 300 ? "under 5 min" : "over 7 min", within],
              ["Steps", `${covered.size}/7`, covered.size === 7 ? "complete" : `${7 - covered.size} missed`, covered.size === 7],
              ["Discovered", `${found.length}/${s.scenario.truths.length}`, found.length >= Math.ceil(s.scenario.truths.length / 2) ? "good curiosity" : "ask deeper", found.length >= Math.ceil(s.scenario.truths.length / 2)],
              ["Client felt", `${feelStart}→${feelEnd}`, feelEnd > feelStart ? "more confident" : "no lift", feelEnd > feelStart],
            ].map(([k, v, note, ok]) => (
              <div key={k as string} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-400">{k as string}</div>
                <div className="mt-1 font-display text-3xl">{v as string}</div>
                <div className={cn("mt-1 text-[11px] font-semibold", ok ? "text-sage-200" : "text-coral-300")}>{note as string}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Truths */}
      <section className="space-y-4">
        <Eyebrow tone="coral">What the conversation uncovered — and what it didn't</Eyebrow>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-sage-700">Discovered · {found.length}</div>
            {found.length === 0 && <p className="rounded-2xl border border-dashed border-ink-900/15 p-4 text-sm text-ink-500">Nothing beneath the CRM surfaced. Everything the associate knows, the next associate already knew.</p>}
            {found.map((t) => (
              <div key={t.id} className="rounded-2xl border border-sage-500 bg-sage-200/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sage-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{t.tag}</span>
                  <span className="font-mono text-[11px] text-sage-700">{fmt(s.revealed[t.id])}</span>
                </div>
                <p className="mt-2 font-display text-lg italic font-light leading-snug">“{t.reveal}”</p>
                {s.volunteered[t.id] && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-coral-700">
                    <AlertCircle className="h-3.5 w-3.5" /> Client volunteered this — not earned by a question.
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-coral-700">Missed · {missed.length}</div>
            {missed.length === 0 && <p className="rounded-2xl border border-sage-500 bg-sage-200/30 p-4 text-sm font-semibold text-sage-700">Every hidden truth was earned. That's a genuinely curious induction.</p>}
            {missed.map((t) => (
              <div key={t.id} className="rounded-2xl border border-coral-500/40 bg-coral-500/5 p-4">
                <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-700">{t.tag}</span>
                <div className="mt-2 flex items-start gap-2 text-sm">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-coral-600" />
                  <span>
                    <span className="font-bold">The question that would have unlocked it: </span>
                    {t.trigger}.
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-600">
                  They would have said: <span className="italic">“{t.reveal}”</span>
                </p>
              </div>
            ))}
            {gaveAway.length > 0 && <p className="text-xs text-ink-500">{gaveAway.length} truth{gaveAway.length > 1 ? "s were" : " was"} given away unasked — worth a word to the client, too.</p>}
          </div>
        </div>
      </section>

      {/* Steps + feel + curveballs */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
          <Eyebrow tone="coral">Time per step</Eyebrow>
          <ul className="mt-4 space-y-2.5">
            {firstSeven.map((st) => {
              const secs = durations[st.n];
              const w = secs ? Math.min(100, (secs / 150) * 100) : 0;
              const long = secs !== undefined && secs > st.target * 1.6;
              return (
                <li key={st.n} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className={cn("font-semibold", secs === undefined && "text-ink-400 line-through")}>
                      {st.n}. {st.name}
                    </span>
                    <span className={cn("font-mono text-[11px]", long ? "text-coral-600" : "text-ink-500")}>{secs !== undefined ? fmt(secs) : "skipped"}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-cream-200">
                    <div className={cn("h-full rounded-full", long ? "bg-coral-500" : "bg-ink-900")} style={{ width: `${w}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
          <Eyebrow tone="coral">How the client felt</Eyebrow>
          <div className="mt-4">
            <Sparkline points={s.feelLog} total={elapsed} />
          </div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-ink-400">
            <span>Start</span>
            <span>End · {fmt(elapsed)}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["Open Qs", s.openQ],
              ["Closed Qs", s.closedQ],
              ["Checked", s.checks.length],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-2xl bg-cream-100 p-3">
                <div className="font-display text-2xl">{v as number}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-500">{k as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
          <Eyebrow tone="coral">Curveballs & crimes</Eyebrow>
          <ul className="mt-4 space-y-2">
            {s.fired.length === 0 && <li className="text-sm text-ink-500">No curveballs this round.</li>}
            {s.fired.map((f) => (
              <li key={f.id} className="flex items-start gap-2 text-sm">
                {f.handled === true ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-700" /> : f.handled === false ? <X className="mt-0.5 h-4 w-4 shrink-0 text-coral-600" /> : <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cream-300" />}
                <span className={cn(f.handled === false && "text-coral-700")}>{f.kind === "event" ? f.text : `“${f.text}”`}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-cream-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Crimes spotted</span>
              <span className={cn("font-mono font-bold", crimesTotal > 0 ? "text-coral-600" : "text-sage-700")}>{crimesTotal}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {Object.entries(s.crimes).map(([c, n]) => (
                <span key={c} className="rounded-full bg-coral-500/10 px-2.5 py-1 text-[11px] font-semibold text-coral-700">
                  {c} {n > 1 && `×${n}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5Cs */}
      <section className="rounded-3xl border border-cream-200 bg-white p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Eyebrow tone="coral">The 5 Cs · observer's read</Eyebrow>
          {s.observerNotes && <span className="text-xs text-ink-500">Notes below</span>}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">
          {fiveCs.map((f) => {
            const r = s.fiveCs[f.c];
            return (
              <div key={f.c} className={cn("rounded-2xl p-4 text-center", r === "STRONG" ? "bg-sage-700 text-white" : r === "DEVELOPING" ? "bg-gold-500 text-ink-900" : r === "RETRY" ? "bg-coral-500 text-white" : "bg-cream-100 text-ink-500")}>
                <div className="font-display text-xl font-medium uppercase tracking-tight">{f.c}</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] opacity-80">{r ?? "not rated"}</div>
              </div>
            );
          })}
        </div>
        {s.observerNotes && <p className="mt-4 whitespace-pre-wrap rounded-2xl bg-cream-100 p-4 text-sm text-ink-700">{s.observerNotes}</p>}
      </section>

      {/* Memory test */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Eyebrow tone="coral">The memory test</Eyebrow>
          <Display size="sm">Ask the client: “What do you remember?”</Display>
          <p className="text-sm text-ink-500">Capture what the client remembers first — then what the associate thinks they covered. The gap is the lesson.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <ListBuilder dark title="Client remembers" icon={<Brain className="h-4 w-4" />} placeholder="Add something the client remembered…" items={s.memoryClient} onChange={(items) => dispatch({ type: "memory", who: "client", items })} />
          <ListBuilder title="Associate covered" icon={<Ear className="h-4 w-4" />} placeholder="Add something the associate covered…" items={s.memoryAssociate} onChange={(items) => dispatch({ type: "memory", who: "associate", items })} />
        </div>
        {s.memoryClient.length > 0 && s.memoryAssociate.length > 0 && (
          <p className="text-sm text-ink-600">
            Retention: <span className="font-display text-xl">{Math.round((s.memoryClient.length / Math.max(1, s.memoryAssociate.length)) * 100)}%</span> of what was said came back.
          </p>
        )}
      </section>

      {/* CRM loop */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-ink-400" />
          <Eyebrow tone="coral">Close the loop · update {m.firstName}'s record</Eyebrow>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-3xl border border-cream-300 bg-cream-200/60 p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">Before</div>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Fitness goal</dt>
                <dd className="font-medium">{m.goal || "—"}</dd>
              </div>
              {m.notes && (
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Notes</dt>
                  <dd className="font-medium">{m.notes}</dd>
                </div>
              )}
            </dl>
            <p className="mt-5 text-xs text-ink-500">Pre-filled from what was actually discovered. Edit it so the next associate doesn't start from zero. Health details stay subject to privacy rules.</p>
          </div>
          <div className={cn("rounded-3xl border p-5 transition-colors", s.recorded ? "border-sage-500 bg-sage-200/30" : "border-ink-900 bg-ink-900 text-cream-50")}>
            <div className={cn("text-[10px] font-bold uppercase tracking-[0.18em]", s.recorded ? "text-sage-700" : "text-cream-400")}>After · servicing intelligence</div>
            <textarea
              value={s.crmDraft}
              onChange={(e) => dispatch({ type: "crmDraft", text: e.target.value })}
              rows={8}
              className={cn("mt-3 w-full resize-y rounded-2xl border p-4 font-mono text-[12px] leading-relaxed outline-none", s.recorded ? "border-sage-500 bg-white text-ink-900" : "border-white/15 bg-white/5 text-cream-50 focus:border-coral-400")}
            />
            <button type="button" onClick={() => dispatch({ type: "recorded", on: !s.recorded })} className={cn("mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold", s.recorded ? "bg-sage-700 text-white" : "bg-coral-500 text-white hover:bg-coral-400")}>
              <Check className="h-4 w-4" /> {s.recorded ? "Recorded — continuing conversation, not a filing cabinet" : "Mark as recorded in CRM"}
            </button>
          </div>
        </div>
      </section>

      <Statement size="md" kicker="Before the next round">
        Our job isn't to get through the induction. <span className="text-coral-400">Our job is to make the induction get through to the client.</span>
      </Statement>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onAgain} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-cream-50 hover:bg-ink-700">
          <RotateCcw className="h-4 w-4" /> Same member · new persona · swap roles
        </button>
        <button type="button" onClick={onNew} className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-6 py-3 text-sm font-bold hover:border-ink-900/40">
          <Shuffle className="h-4 w-4" /> New scenario
        </button>
      </div>
    </div>
  );
}
