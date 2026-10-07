import { useCallback, useReducer, useRef, useState } from "react";
import { Users, UserRound, Eye, Sparkles } from "lucide-react";
import type { Section } from "../../data";
import { buildScenario, personas, suggestPersona } from "../../lib/scenarios";
import { ModuleHeader, Eyebrow } from "../ui";
import { MemberProfiles } from "../MemberProfiles";
import { StudioSetup, type SetupConfig } from "./StudioSetup";
import { StudioLive } from "./StudioLive";
import { StudioDebrief } from "./StudioDebrief";
import { newSession, reducer, summarize, type Action, type RoundSummary, type Session } from "./session";

type Phase = "setup" | "live" | "debrief";

function useSessionReducer() {
  const [session, dispatchRaw] = useReducer((s: Session | null, a: Action | { type: "load"; session: Session }) => {
    if (a.type === "load") return a.session;
    return s ? reducer(s, a) : s;
  }, null);
  const dispatch = useCallback((a: Action) => dispatchRaw(a), []);
  const load = useCallback((s: Session) => dispatchRaw({ type: "load", session: s }), []);
  return { session, dispatch, load };
}

export function RolePlayStudio({ section }: { section: Section }) {
  const [mode, setMode] = useState<"member" | "group">("member");
  return <div className="space-y-6">
    <div className="flex flex-wrap gap-2" role="group" aria-label="Studio practice mode">
      <button type="button" aria-pressed={mode === "member"} onClick={() => setMode("member")} className={`rounded-full border px-5 py-2.5 text-sm font-semibold ${mode === "member" ? "border-ink-900 bg-ink-900 text-white" : "border-cream-300 bg-white"}`}>Member Studio</button>
      <button type="button" aria-pressed={mode === "group"} onClick={() => setMode("group")} className={`rounded-full border px-5 py-2.5 text-sm font-semibold ${mode === "group" ? "border-ink-900 bg-ink-900 text-white" : "border-cream-300 bg-white"}`}>Group role-play</button>
    </div>
    {mode === "member" ? <MemberProfiles section={section} /> : <GroupRolePlayStudio section={section} />}
  </div>;
}

function GroupRolePlayStudio({ section }: { section: Section }) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [history, setHistory] = useState<RoundSummary[]>([]);
  const [lastConfig, setLastConfig] = useState<SetupConfig | null>(null);
  const { session, dispatch, load } = useSessionReducer();
  const topRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const start = (c: SetupConfig) => {
    setLastConfig(c);
    load(newSession(buildScenario(c.member, c.persona, c.difficulty), c.names));
    setPhase("live");
    scrollTop();
  };

  const end = () => {
    if (!session) return;
    dispatch({ type: "end" });
    setPhase("debrief");
    scrollTop();
  };

  const finishRound = () => {
    if (session) setHistory((h) => [summarize(session), ...h]);
  };

  const again = () => {
    if (!session || !lastConfig) return;
    finishRound();
    const others = personas.filter((p) => p.id !== session.scenario.persona.id);
    const suggested = suggestPersona(lastConfig.member);
    const nextPersona = others.includes(suggested) && Math.random() < 0.5 ? suggested : others[Math.floor(Math.random() * others.length)];
    const names = { associate: lastConfig.names.client, client: lastConfig.names.observer || lastConfig.names.associate, observer: lastConfig.names.observer ? lastConfig.names.associate : "" };
    const c: SetupConfig = { ...lastConfig, persona: nextPersona, names };
    start(c);
  };

  const fresh = () => {
    finishRound();
    setPhase("setup");
    scrollTop();
  };

  return (
    <div ref={topRef} className="space-y-10 scroll-mt-24">
      <ModuleHeader section={section} title={<>Role-Play <span className="italic font-light">Studio</span></>} subtitle="Real member records. A secret persona. Hidden truths that only surface if the associate asks the right question. One device, three screens.">
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            [UserRound, "Associate", "Sees only the CRM profile. Follows the seven-step induction and taps each step as they go."],
            [Users, "Client", "Sees the secret persona, the hidden truths and pressure lines. Reveals only what's earned."],
            [Eye, "Observer", "Counts open vs closed questions, spots crimes, rates the 5 Cs, triggers interruptions."],
          ].map(([I, t, d]) => {
            const Icon = I as typeof Users;
            return (
              <div key={t as string} className="flex items-start gap-3 rounded-2xl border border-cream-200 bg-white p-4 shadow-soft">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 text-cream-50">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-bold">{t as string}</span>
                  <span className="block text-xs text-ink-500">{d as string}</span>
                </span>
              </div>
            );
          })}
        </div>
      </ModuleHeader>

      {/* Phase indicator */}
      <div className="flex items-center gap-2">
        {(["setup", "live", "debrief"] as Phase[]).map((p, i) => (
          <div key={p} className="flex items-center gap-2">
            <span className={`inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[11px] font-bold uppercase tracking-[0.16em] ${phase === p ? "bg-coral-500 text-white" : "bg-cream-200 text-ink-500"}`}>
              {i + 1} · {p === "setup" ? "Build" : p === "live" ? "Play" : "Debrief"}
            </span>
            {i < 2 && <span className="h-px w-6 bg-ink-900/15" />}
          </div>
        ))}
        {history.length > 0 && (
          <span className="ml-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">
            <Sparkles className="h-3.5 w-3.5 text-coral-500" /> {history.length} round{history.length > 1 ? "s" : ""} completed
          </span>
        )}
      </div>

      {phase === "setup" && <StudioSetup onStart={start} history={history} />}
      {phase === "live" && session && <StudioLive session={session} dispatch={dispatch} onEnd={end} />}
      {phase === "debrief" && session && <StudioDebrief session={session} dispatch={dispatch} onAgain={again} onNew={fresh} />}

      {phase !== "setup" && (
        <div className="rounded-2xl border border-dashed border-ink-900/15 p-4 text-xs text-ink-500">
          <Eyebrow className="mb-1">Tip</Eyebrow>
          Associate and client should each take the device only for their own screen. The observer keeps it the rest of the time.
        </div>
      )}
    </div>
  );
}
