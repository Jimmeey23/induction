import { ArrowRight, Clock, Users, Sparkles, Check } from "lucide-react";
import { outcomes, runOfShow } from "../data";
import { Eyebrow, Display, Card, Chip } from "./ui";

export function Overview({ go }: { go: (id: string) => void }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero */}
      <section className="grain relative overflow-hidden rounded-[2rem] bg-ink-950 text-cream-50 px-7 py-14 md:px-14 md:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-coral-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative max-w-4xl space-y-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-semibold tracking-[0.3em] uppercase">Physique 57</span>
            <span className="h-px w-8 bg-coral-500" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-cream-400">India · Team Training</span>
          </div>
          <div className="space-y-5">
            <Display as="h1" size="xl" className="font-light">
              New Client <span className="italic">Induction</span> Training
            </Display>
            <p className="font-display text-2xl md:text-3xl font-light text-cream-300 tracking-tight">
              From First Visit <span className="text-coral-400">→</span> First Connection
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Chip tone="light" className="py-2 px-4 text-sm">
              <Clock className="h-4 w-4 text-coral-400" /> 2 hours
            </Chip>
            <Chip tone="light" className="py-2 px-4 text-sm">
              <Users className="h-4 w-4 text-coral-400" /> Sales & Client Servicing Associates
            </Chip>
            <Chip tone="light" className="py-2 px-4 text-sm">
              <Sparkles className="h-4 w-4 text-coral-400" /> 10 modules
            </Chip>
          </div>

          {/* Style bar */}
          <div className="max-w-xl space-y-2 pt-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-cream-400">
              <span>Training style</span>
              <span>30 / 70</span>
            </div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[30%] bg-cream-300" />
              <div className="h-full w-[70%] bg-coral-500" />
            </div>
            <div className="flex justify-between text-sm text-cream-300">
              <span>
                <span className="font-bold text-cream-50">30%</span> learning
              </span>
              <span>
                <span className="font-bold text-cream-50">70%</span> discussion, demonstration & practice
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => go("m1")}
              className="group inline-flex items-center gap-3 rounded-full bg-coral-500 px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-coral-400 hover:gap-4"
            >
              Begin the session
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <Eyebrow tone="coral">Training outcome</Eyebrow>
          <Display size="md">By the end of this session, every associate will be able to…</Display>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((o, i) => (
            <div
              key={o}
              className="group flex items-start gap-4 rounded-2xl border border-cream-200 bg-white p-5 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className="relative mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900 text-cream-50">
                <span className="font-display text-sm group-hover:opacity-0 transition-opacity">{String(i + 1).padStart(2, "0")}</span>
                <Check className="absolute h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 text-coral-400" strokeWidth={3} />
              </span>
              <p className="text-[15px] leading-snug text-ink-800">{o}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Run of show */}
      <section className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <Eyebrow tone="coral">The 2-hour run of show</Eyebrow>
            <Display size="md">Ten modules. One conversation.</Display>
          </div>
          <p className="text-sm text-ink-500">Select any module to open it.</p>
        </div>

        <Card tone="light" className="p-0 md:p-0 overflow-hidden">
          <div className="hidden md:grid grid-cols-[120px_1fr_260px] gap-4 border-b border-cream-200 bg-cream-100/70 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-500">
            <span>Time</span>
            <span>Module</span>
            <span>Format</span>
          </div>
          <ul className="divide-y divide-cream-200">
            {runOfShow.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  className="group grid w-full grid-cols-1 gap-2 px-6 py-4 text-left transition-colors hover:bg-cream-100 md:grid-cols-[120px_1fr_260px] md:items-center md:gap-4"
                >
                  <span className="font-mono text-sm font-bold tabular-nums text-ink-900">{s.time}</span>
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 font-display text-xs text-cream-50 group-hover:bg-coral-500 transition-colors">
                      {s.num}
                    </span>
                    <span className="font-display text-lg md:text-xl font-medium tracking-tight">{s.label}</span>
                  </span>
                  <span className="flex items-center justify-between">
                    <span className="text-sm text-ink-500">{s.format}</span>
                    <ArrowRight className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-1 group-hover:text-coral-500" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Practice tools */}
        <div className="grid gap-3 md:grid-cols-2">
          <button type="button" onClick={() => go("studio")} className="group grain relative overflow-hidden rounded-3xl bg-coral-500 p-6 text-left text-white shadow-lift transition-colors hover:bg-coral-600">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
            <div className="relative">
              <Eyebrow tone="light" className="text-white/80">
                Practice · Modules 8 & 9
              </Eyebrow>
              <div className="mt-2 font-display text-2xl md:text-3xl font-light tracking-tight">Role-Play Studio</div>
              <p className="mt-1 text-sm text-white/85">Real member records, secret personas, hidden truths, timed curveballs and an automatic debrief.</p>
            </div>
          </button>
          <button type="button" onClick={() => go("members")} className="group rounded-3xl border border-cream-200 bg-white p-6 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-ink-900/30">
            <Eyebrow tone="coral">Practice · Module 4</Eyebrow>
            <div className="mt-2 font-display text-2xl md:text-3xl font-light tracking-tight">Member Profiles</div>
            <p className="mt-1 text-sm text-ink-600">Put a real CRM record on screen. What do you know? What would you ask?</p>
          </button>
        </div>

        {/* Timeline bar */}
        <div className="space-y-2">
          <div className="flex h-4 w-full overflow-hidden rounded-full bg-cream-200">
            {runOfShow.map((s, i) => (
              <button
                key={s.id}
                type="button"
                title={`${s.time} · ${s.label}`}
                onClick={() => go(s.id)}
                style={{ width: `${((s.minutes ?? 0) / 120) * 100}%` }}
                className={`h-full border-r border-cream-100 transition-opacity hover:opacity-80 ${i % 2 === 0 ? "bg-ink-900" : "bg-coral-500"}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">
            <span>0:00</span>
            <span>0:30</span>
            <span>1:00</span>
            <span>1:30</span>
            <span>2:00</span>
          </div>
        </div>
      </section>
    </div>
  );
}
