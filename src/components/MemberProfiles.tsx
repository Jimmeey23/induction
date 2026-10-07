import { useMemo, useState } from "react";
import { Search, Shuffle, ArrowRight, Sparkles, Play } from "lucide-react";
import type { Section } from "../data";
import { useMembers } from "../lib/useMembers";
import { buildTruths, suggestPersona } from "../lib/scenarios";
import { cn } from "../utils/cn";
import { ModuleHeader, Eyebrow, Display, Countdown, Chip, Reveal } from "./ui";
import { MemberCard, MemberTile, DataSourcePanel } from "./studio/MemberCard";

const tagLetter: Record<string, string> = { Goal: "G", Context: "C", Preference: "P", Consideration: "C", Behaviour: "B", Persona: "?" };

export function MemberProfiles({ section, go }: { section: Section; go: (id: string) => void }) {
  const { members, usingSamples } = useMembers();
  const [query, setQuery] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => [m.name, m.goal, m.membership, m.location, m.tags.join(" "), m.experience, m.source, m.medical].filter(Boolean).join(" ").toLowerCase().includes(q));
  }, [members, query]);

  const member = members.find((m) => m.id === id) ?? null;
  const asks = useMemo(() => (member ? buildTruths(member, suggestPersona(member)) : []), [member]);

  const known = member
    ? [
        member.goal && `Goal: ${member.goal}`,
        member.experience && `Experience: ${member.experience}`,
        member.preferredTime && `Prefers ${member.preferredTime}`,
        member.medical && "Has a health note",
        member.source && `Came via ${member.source}`,
        `${member.visits} visit${member.visits === 1 ? "" : "s"}`,
        member.noShows > 0 && `${member.noShows} no-show`,
        member.upcoming > 0 && `${member.upcoming} upcoming bookings`,
        member.membership && member.membership,
      ].filter(Boolean) as string[]
    : [];

  const pick = (mid: string) => {
    setId(mid);
    setStage(0);
  };

  return (
    <div className="space-y-12">
      <ModuleHeader section={section} title={<>Member <span className="italic font-light">Profiles</span></>} subtitle="Put a real record on screen. Sixty seconds to read it. Then the only question that matters: what would you ask because you know these things?" />

      <DataSourcePanel />
      {usingSamples && <p className="-mt-8 text-xs text-ink-500">Sample profiles are shown until the connected sheet contains member rows — the exercise works identically with live data.</p>}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Browser */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search members…" className="w-full rounded-full border border-cream-300 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-ink-900" />
            </div>
            <button type="button" onClick={() => pick(members[Math.floor(Math.random() * members.length)].id)} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-cream-50 hover:bg-ink-700">
              <Shuffle className="h-4 w-4" /> Random
            </button>
          </div>
          <div className="grid max-h-[640px] gap-2 overflow-y-auto pr-1 scrollbar-thin">
            {filtered.map((m) => (
              <MemberTile key={m.id} member={m} active={m.id === id} onClick={() => pick(m.id)} />
            ))}
            {filtered.length === 0 && <p className="text-sm text-ink-500">No members match “{query}”.</p>}
          </div>
        </div>

        {/* Exercise */}
        <div className="space-y-4">
          {member ? (
            <>
              <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
                <MemberCard member={member} highlight={stage >= 1} />
                <div className="flex flex-col gap-3">
                  <Countdown key={member.id} seconds={60} label="Read the profile · 60s" />
                  <div className={cn("flex-1 rounded-3xl p-5 transition-colors", stage === 2 ? "grain relative overflow-hidden bg-ink-950 text-cream-50" : "border border-cream-300 bg-cream-200/70")}>
                    {stage === 2 && <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral-500/30 blur-2xl" />}
                    <div className="relative space-y-4">
                      {stage < 2 ? (
                        <>
                          <Eyebrow tone="coral">First question</Eyebrow>
                          <p className="font-display text-2xl font-light italic">“What do you know?”</p>
                          {stage === 1 && (
                            <div className="animate-fade-up flex flex-wrap gap-1.5">
                              {known.map((k) => (
                                <Chip key={k} tone="dark" className="text-[11px]">
                                  {k}
                                </Chip>
                              ))}
                            </div>
                          )}
                          {stage === 0 ? (
                            <button type="button" onClick={() => setStage(1)} className="rounded-full bg-ink-900 px-4 py-2 text-xs font-bold text-cream-50 hover:bg-ink-700">
                              Show what's on the surface
                            </button>
                          ) : (
                            <button type="button" onClick={() => setStage(2)} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-4 py-2 text-xs font-bold text-white hover:bg-coral-600">
                              Now change the question <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <Eyebrow tone="light">The breakthrough question</Eyebrow>
                          <p className="font-display text-2xl md:text-3xl font-light italic leading-tight">
                            “What would you <span className="not-italic font-semibold text-coral-400">ASK</span> because you know these things?”
                          </p>
                          <button type="button" onClick={() => setStage(0)} className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-400 hover:text-cream-50">
                            ↺ Reset
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {stage === 2 && (
                <div className="animate-fade-up space-y-3">
                  <Reveal label={`Compare with ${asks.length} questions this record invites`} hideLabel="Hide the questions" tone="coral">
                    <div className="grid gap-2.5 md:grid-cols-2">
                      {asks.map((t) => (
                        <div key={t.id} className="flex items-start gap-3 rounded-2xl border border-cream-200 bg-white p-4 shadow-soft">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900 font-display text-sm text-cream-50">{tagLetter[t.tag]}</span>
                          <span>
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-500">{t.tag === "Persona" ? "One level deeper" : t.tag}</span>
                            <span className="block text-sm font-medium leading-snug">{t.trigger}.</span>
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-ink-500">Not every field deserves a conversation. Which two or three of these would you actually open with?</p>
                  </Reveal>
                  <button type="button" onClick={() => go("studio")} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-cream-50 hover:bg-ink-700">
                    <Play className="h-4 w-4" /> Role-play this member in the Studio
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-ink-900/20 bg-cream-200/40 p-8 text-center">
              <Sparkles className="h-6 w-6 text-coral-500" />
              <Display size="sm" className="mt-3 font-light">
                Pick a member to put their profile on screen.
              </Display>
              <p className="mt-2 max-w-sm text-sm text-ink-500">Great for Module 4 — read for sixty seconds, say what you know, then say what you'd ask.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
