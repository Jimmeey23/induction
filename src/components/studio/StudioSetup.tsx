import { useMemo, useState } from "react";
import { Shuffle, Search, Sparkles, Play, Wand2, History, Lock } from "lucide-react";
import type { Member } from "../../lib/members";
import { useMembers } from "../../lib/useMembers";
import { personas, personaScores, suggestPersona, type Difficulty, type Persona } from "../../lib/scenarios";
import { cn } from "../../utils/cn";
import { Eyebrow, Display, Chip } from "../ui";
import { MemberCard, MemberTile, DataSourcePanel } from "./MemberCard";
import type { RoundSummary } from "./session";

export interface SetupConfig {
  member: Member;
  persona: Persona;
  difficulty: Difficulty;
  names: { associate: string; client: string; observer: string };
}

const difficulties: { id: Difficulty; name: string; desc: string }[] = [
  { id: "calm", name: "Calm", desc: "No interruptions. Pure First 7 practice." },
  { id: "realistic", name: "Realistic", desc: "The persona's pressure line + two manual interruptions." },
  { id: "chaos", name: "Chaos", desc: "Several interruptions, triggered by the observer." },
];

export function StudioSetup({ onStart, history }: { onStart: (c: SetupConfig) => void; history: RoundSummary[] }) {
  const { members, usingSamples } = useMembers();
  const [query, setQuery] = useState("");
  const [memberId, setMemberId] = useState<string | null>(null);
  const [personaId, setPersonaId] = useState<string | "auto">("auto");
  const [difficulty, setDifficulty] = useState<Difficulty>("realistic");
  const [names, setNames] = useState({ associate: "", client: "", observer: "" });
  const [peek, setPeek] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => [m.name, m.goal, m.membership, m.location, m.tags.join(" "), m.experience, m.source].filter(Boolean).join(" ").toLowerCase().includes(q));
  }, [members, query]);

  const member = members.find((m) => m.id === memberId) ?? null;
  const suggested = member ? suggestPersona(member) : null;
  const persona = personaId === "auto" ? suggested : personas.find((p) => p.id === personaId) ?? null;
  const scores = member ? personaScores(member) : [];

  const surprise = () => {
    const m = members[Math.floor(Math.random() * members.length)];
    setMemberId(m.id);
    setPersonaId("auto");
  };

  return (
    <div className="space-y-10">
      <DataSourcePanel />

      {/* Step 1: member */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <Eyebrow tone="coral">Step 1 · The client</Eyebrow>
            <Display size="sm">Choose a real member record.</Display>
            <p className="text-sm text-ink-500">
              {usingSamples ? "Showing sample profiles until the live sheet has member rows." : "Loaded from the live member sheet."} The associate will only see what's in the CRM.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, goal, studio…" className="w-56 rounded-full border border-cream-300 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-ink-900" />
            </div>
            <button type="button" onClick={surprise} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-cream-50 hover:bg-ink-700">
              <Shuffle className="h-4 w-4" /> Surprise me
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid max-h-[520px] gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2 scrollbar-thin">
            {filtered.map((m) => (
              <MemberTile key={m.id} member={m} active={m.id === memberId} onClick={() => setMemberId(m.id)} />
            ))}
            {filtered.length === 0 && <p className="text-sm text-ink-500">No members match “{query}”.</p>}
          </div>
          <div>
            {member ? (
              <MemberCard member={member} compact highlight />
            ) : (
              <div className="flex h-full min-h-[280px] items-center justify-center rounded-3xl border border-dashed border-ink-900/20 bg-cream-200/40 p-8 text-center">
                <p className="font-display text-xl font-light text-ink-500">Select a member to preview their CRM profile.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Step 2: persona */}
      <section className={cn("space-y-5 transition-opacity", !member && "pointer-events-none opacity-40")}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <Eyebrow tone="coral">Step 2 · The secret persona</Eyebrow>
            <Display size="sm">How will this client actually behave?</Display>
            <p className="text-sm text-ink-500">The persona is hidden from the associate. Auto-match reads the CRM record and picks the most plausible one.</p>
          </div>
          <button type="button" onClick={() => setPeek((p) => !p)} className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-4 py-2 text-xs font-bold hover:border-ink-900/40">
            <Lock className="h-3.5 w-3.5" /> {peek ? "Hide persona names (associate in room)" : "Show persona names"}
          </button>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          <button
            type="button"
            onClick={() => setPersonaId("auto")}
            className={cn(
              "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
              personaId === "auto" ? "border-coral-500 bg-coral-500 text-white shadow-lift" : "border-cream-200 bg-white shadow-soft hover:border-ink-900/30"
            )}
          >
            <Wand2 className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              <span className="block font-semibold">Auto-match from CRM</span>
              <span className={cn("block text-xs", personaId === "auto" ? "text-white/80" : "text-ink-500")}>
                {member && suggested ? (peek ? `Suggests: ${suggested.name}` : "A persona has been matched — hidden") : "Pick a member first"}
              </span>
            </span>
          </button>
          {personas.map((p) => {
            const score = scores.find((x) => x.persona.id === p.id)?.score ?? 0;
            const on = personaId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPersonaId(p.id)}
                className={cn("flex items-start gap-3 rounded-2xl border p-4 text-left transition-all", on ? "border-ink-900 bg-ink-900 text-cream-50 shadow-lift" : "border-cream-200 bg-white shadow-soft hover:border-ink-900/30")}
              >
                <span className={cn("mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold", on ? "bg-coral-500 text-white" : "bg-cream-200 text-ink-700")}>{p.difficulty}</span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="block font-semibold">{peek || on ? p.name : "Persona " + (personas.indexOf(p) + 1)}</span>
                    {score > 4 && <Sparkles className={cn("h-3.5 w-3.5", on ? "text-coral-400" : "text-coral-500")} />}
                  </span>
                  <span className={cn("block text-xs", on ? "text-cream-300" : "text-ink-500")}>{peek || on ? p.tagline : "Hidden until selected"}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 3: settings */}
      <section className={cn("grid gap-6 lg:grid-cols-[1fr_1fr] transition-opacity", !member && "pointer-events-none opacity-40")}>
        <div className="space-y-4">
          <Eyebrow tone="coral">Step 3 · Pressure</Eyebrow>
          <div className="grid gap-2">
            {difficulties.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id)}
                className={cn("flex items-center justify-between rounded-2xl border px-5 py-3.5 text-left transition-all", difficulty === d.id ? "border-ink-900 bg-ink-900 text-cream-50" : "border-cream-200 bg-white hover:border-ink-900/30")}
              >
                <span>
                  <span className="block font-semibold">{d.name}</span>
                  <span className={cn("block text-xs", difficulty === d.id ? "text-cream-300" : "text-ink-500")}>{d.desc}</span>
                </span>
                {difficulty === d.id && <span className="h-2.5 w-2.5 rounded-full bg-coral-500" />}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Eyebrow tone="coral">Step 4 · Who's playing</Eyebrow>
          <div className="grid gap-2">
            {(["associate", "client", "observer"] as const).map((r) => (
              <label key={r} className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-white px-5 py-3">
                <span className="w-24 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-500">{r}</span>
                <input value={names[r]} onChange={(e) => setNames((n) => ({ ...n, [r]: e.target.value }))} placeholder={r === "observer" ? "Optional" : "Name"} className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-300" />
              </label>
            ))}
          </div>
          <button
            type="button"
            disabled={!member || !persona}
            onClick={() => member && persona && onStart({ member, persona, difficulty, names })}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-coral-500 px-7 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-coral-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Play className="h-4 w-4" /> Build scenario & open role screens
          </button>
        </div>
      </section>

      {history.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-ink-400" />
            <Eyebrow>Rounds so far this session</Eyebrow>
          </div>
          <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white">
            <div className="hidden grid-cols-[1.2fr_1.2fr_1fr_90px_90px_90px] gap-3 border-b border-cream-200 bg-cream-100/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500 md:grid">
              <span>Associate</span>
              <span>Member · Persona</span>
              <span>Mode</span>
              <span>Steps</span>
              <span>Truths</span>
              <span>Crimes</span>
            </div>
            <ul className="divide-y divide-cream-200">
              {history.map((h) => (
                <li key={h.id} className="grid grid-cols-2 gap-2 px-5 py-3 text-sm md:grid-cols-[1.2fr_1.2fr_1fr_90px_90px_90px] md:items-center md:gap-3">
                  <span className="font-semibold">{h.associate}</span>
                  <span className="truncate text-ink-600">
                    {h.member} · {h.persona}
                  </span>
                  <span>
                    <Chip>{h.difficulty}</Chip>
                  </span>
                  <span className="font-mono tabular-nums">{h.stepsCovered}/7</span>
                  <span className="font-mono tabular-nums">
                    {h.truthsFound}/{h.truthsTotal}
                  </span>
                  <span className="font-mono tabular-nums">{h.crimes}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
