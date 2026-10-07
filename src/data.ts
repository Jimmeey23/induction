export type SectionKind = "intro" | "module" | "toolkit" | "practice";

export interface Section {
  id: string;
  kind: SectionKind;
  num?: number;
  label: string;
  time?: string;
  minutes?: number;
  startMin?: number;
  format?: string;
}

export const sections: Section[] = [
  { id: "overview", kind: "intro", label: "Overview" },
  { id: "m1", kind: "module", num: 1, label: "Why are we doing this?", time: "0:00–0:10", minutes: 10, startMin: 0, format: "Discussion + mini exercise" },
  { id: "m2", kind: "module", num: 2, label: "The 7-Minute Test", time: "0:10–0:20", minutes: 10, startMin: 10, format: "Group activity" },
  { id: "m3", kind: "module", num: 3, label: "The First 7", time: "0:20–0:35", minutes: 15, startMin: 20, format: "Teaching + demonstration" },
  { id: "m4", kind: "module", num: 4, label: "CRM → Conversation Intelligence", time: "0:35–0:55", minutes: 20, startMin: 35, format: "Interactive workshop" },
  { id: "m5", kind: "module", num: 5, label: "One Level Deeper", time: "0:55–1:05", minutes: 10, startMin: 55, format: "Rapid-fire exercise" },
  { id: "m6", kind: "module", num: 6, label: "Policies, Formats & Recommendations", time: "1:05–1:15", minutes: 10, startMin: 65, format: "Good vs bad practice" },
  { id: "m7", kind: "module", num: 7, label: "The Terrible Induction", time: "1:15–1:25", minutes: 10, startMin: 75, format: "Fun group exercise" },
  { id: "m8", kind: "module", num: 8, label: "Client Persona Role-Plays", time: "1:25–1:45", minutes: 20, startMin: 85, format: "Pair practice" },
  { id: "m9", kind: "module", num: 9, label: "Curveball Challenge", time: "1:45–1:55", minutes: 10, startMin: 105, format: "Advanced role-play" },
  { id: "m10", kind: "module", num: 10, label: "The Client Memory Test", time: "1:55–2:00", minutes: 5, startMin: 115, format: "Team recap" },
  { id: "studio", kind: "practice", label: "Role-Play Studio", format: "Live practice · real member records" },
  { id: "members", kind: "practice", label: "Member Profiles", format: "CRM → questions" },
  { id: "loop", kind: "toolkit", label: "The CRM Loop" },
  { id: "cheat", kind: "toolkit", label: "Induction Cheat Sheet" },
  { id: "never", kind: "toolkit", label: "What We Never Do" },
  { id: "close", kind: "toolkit", label: "Closing Message" },
];

export const runOfShow = sections.filter((s) => s.kind === "module");

export const outcomes = [
  "Understand why the induction matters.",
  "Prepare for a new client using CRM information.",
  "Turn CRM data into intelligent conversation starters.",
  "Conduct the complete induction naturally within 5–7 minutes.",
  "Explain policies without sounding robotic.",
  "Explain class formats according to what is relevant to the client.",
  "Ask better discovery questions.",
  "Personalise recommendations without making assumptions.",
  "Conduct a concise studio orientation.",
  "Close with a meaningful next step.",
  "Record useful information back into the CRM.",
  "Handle different client personalities and interruptions confidently.",
];

export const SESSION_MINUTES = 120;
