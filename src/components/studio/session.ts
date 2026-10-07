import type { Scenario, Rating } from "../../lib/scenarios";

export type Role = "associate" | "client" | "observer";

export interface FiredLine {
  id: string;
  at: number;
  text: string;
  kind: "persona" | "client" | "event";
  delivered: boolean;
  handled: boolean | null;
}

export interface Session {
  scenario: Scenario;
  names: { associate: string; client: string; observer: string };
  startedAt: number | null;
  endedAt: number | null;
  stepLog: { step: number; at: number }[];
  revealed: Record<string, number>;
  volunteered: Record<string, boolean>;
  feelLog: { at: number; v: number }[];
  fired: FiredLine[];
  checks: number[];
  closedQ: number;
  openQ: number;
  crimes: Record<string, number>;
  fiveCs: Record<string, Rating | null>;
  observerNotes: string;
  memoryClient: string[];
  memoryAssociate: string[];
  crmDraft: string;
  recorded: boolean;
}

export type Action =
  | { type: "start" }
  | { type: "end" }
  | { type: "step"; step: number; at: number }
  | { type: "reveal"; id: string; at: number }
  | { type: "unreveal"; id: string }
  | { type: "volunteer"; id: string; on: boolean }
  | { type: "feel"; v: number; at: number }
  | { type: "fire"; line: { id: string; at: number; text: string; kind: FiredLine["kind"] } }
  | { type: "delivered"; id: string }
  | { type: "handled"; id: string; handled: boolean | null }
  | { type: "check"; at: number }
  | { type: "question"; open: boolean; delta: 1 | -1 }
  | { type: "crime"; crime: string; delta: 1 | -1 }
  | { type: "fiveC"; c: string; rating: Rating | null }
  | { type: "notes"; text: string }
  | { type: "memory"; who: "client" | "associate"; items: string[] }
  | { type: "crmDraft"; text: string }
  | { type: "recorded"; on: boolean };

export function newSession(scenario: Scenario, names: Session["names"]): Session {
  return {
    scenario,
    names,
    startedAt: null,
    endedAt: null,
    stepLog: [],
    revealed: {},
    volunteered: {},
    feelLog: [{ at: 0, v: 35 }],
    fired: [],
    checks: [],
    closedQ: 0,
    openQ: 0,
    crimes: {},
    fiveCs: {},
    observerNotes: "",
    memoryClient: [],
    memoryAssociate: [],
    crmDraft: "",
    recorded: false,
  };
}

export function reducer(s: Session, a: Action): Session {
  switch (a.type) {
    case "start":
      return s.startedAt ? s : { ...s, startedAt: Date.now() };
    case "end":
      return s.endedAt ? s : { ...s, endedAt: Date.now() };
    case "step": {
      const last = s.stepLog[s.stepLog.length - 1];
      if (last && last.step === a.step) return s;
      return { ...s, stepLog: [...s.stepLog, { step: a.step, at: a.at }] };
    }
    case "reveal":
      return { ...s, revealed: { ...s.revealed, [a.id]: a.at } };
    case "unreveal": {
      const r = { ...s.revealed };
      delete r[a.id];
      return { ...s, revealed: r };
    }
    case "volunteer":
      return { ...s, volunteered: { ...s.volunteered, [a.id]: a.on } };
    case "feel":
      return { ...s, feelLog: [...s.feelLog, { at: a.at, v: a.v }] };
    case "fire":
      return s.fired.some((f) => f.id === a.line.id) ? s : { ...s, fired: [...s.fired, { ...a.line, delivered: a.line.kind === "event", handled: null }] };
    case "delivered":
      return { ...s, fired: s.fired.map((f) => (f.id === a.id ? { ...f, delivered: true } : f)) };
    case "handled":
      return { ...s, fired: s.fired.map((f) => (f.id === a.id ? { ...f, handled: a.handled } : f)) };
    case "check":
      return { ...s, checks: [...s.checks, a.at] };
    case "question":
      return a.open ? { ...s, openQ: Math.max(0, s.openQ + a.delta) } : { ...s, closedQ: Math.max(0, s.closedQ + a.delta) };
    case "crime": {
      const n = Math.max(0, (s.crimes[a.crime] ?? 0) + a.delta);
      const c = { ...s.crimes };
      if (n === 0) delete c[a.crime];
      else c[a.crime] = n;
      return { ...s, crimes: c };
    }
    case "fiveC":
      return { ...s, fiveCs: { ...s.fiveCs, [a.c]: a.rating } };
    case "notes":
      return { ...s, observerNotes: a.text };
    case "memory":
      return a.who === "client" ? { ...s, memoryClient: a.items } : { ...s, memoryAssociate: a.items };
    case "crmDraft":
      return { ...s, crmDraft: a.text };
    case "recorded":
      return { ...s, recorded: a.on };
    default:
      return s;
  }
}

export function elapsedSecs(s: Session, now: number) {
  if (!s.startedAt) return 0;
  return Math.max(0, Math.floor(((s.endedAt ?? now) - s.startedAt) / 1000));
}

export function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const r = sec % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/** Time spent in each step (seconds), computed from the step log. */
export function stepDurations(s: Session, totalElapsed: number): Record<number, number> {
  const out: Record<number, number> = {};
  s.stepLog.forEach((e, i) => {
    const next = s.stepLog[i + 1];
    const end = next ? next.at : totalElapsed;
    out[e.step] = (out[e.step] ?? 0) + Math.max(0, end - e.at);
  });
  return out;
}

export interface RoundSummary {
  id: string;
  associate: string;
  client: string;
  member: string;
  persona: string;
  difficulty: string;
  secs: number;
  stepsCovered: number;
  truthsFound: number;
  truthsTotal: number;
  curveballsHandled: number;
  curveballsTotal: number;
  crimes: number;
  feelStart: number;
  feelEnd: number;
  fiveCs: Record<string, Rating | null>;
  at: number;
}

export function summarize(s: Session, now: number): RoundSummary {
  const secs = elapsedSecs(s, now);
  const steps = new Set(s.stepLog.map((e) => e.step));
  const feel = s.feelLog;
  return {
    id: s.scenario.id,
    associate: s.names.associate || "Associate",
    client: s.names.client || "Client",
    member: s.scenario.member.name,
    persona: s.scenario.persona.name,
    difficulty: s.scenario.difficulty,
    secs,
    stepsCovered: steps.size,
    truthsFound: Object.keys(s.revealed).length,
    truthsTotal: s.scenario.truths.length,
    curveballsHandled: s.fired.filter((f) => f.handled === true).length,
    curveballsTotal: s.fired.length,
    crimes: Object.values(s.crimes).reduce((a, b) => a + b, 0),
    feelStart: feel[0]?.v ?? 35,
    feelEnd: feel[feel.length - 1]?.v ?? 35,
    fiveCs: s.fiveCs,
    at: Date.now(),
  };
}
