export type SectionKind = "intro" | "module" | "toolkit" | "practice";

export interface Section {
  id: string;
  kind: SectionKind;
  num?: number;
  label: string;
  format?: string;
}

export const sections: Section[] = [
  { id: "overview", kind: "intro", label: "Overview" },
  { id: "m1", kind: "module", num: 1, label: "Why are we doing this?", format: "Discussion + mini exercise" },
  { id: "m2", kind: "module", num: 2, label: "The First-Visit Test", format: "Group activity" },
  { id: "m3", kind: "module", num: 3, label: "The 7-Step Framework", format: "Teaching + demonstration" },
  { id: "m4", kind: "module", num: 4, label: "CRM → Conversation Intelligence", format: "Interactive workshop" },
  { id: "m5", kind: "module", num: 5, label: "One Level Deeper", format: "Group exercise" },
  { id: "m6", kind: "module", num: 6, label: "Policies, Formats & Recommendations", format: "Good vs bad practice" },
  { id: "m7", kind: "module", num: 7, label: "The Terrible Induction", format: "Fun group exercise" },
  { id: "m8", kind: "module", num: 8, label: "Client Persona Role-Plays", format: "Pair practice" },
  { id: "m9", kind: "module", num: 9, label: "Curveball Challenge", format: "Advanced role-play" },
  { id: "m10", kind: "module", num: 10, label: "The Client Memory Test", format: "Team recap" },
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
  "Conduct the complete induction naturally and confidently.",
  "Explain policies without sounding robotic.",
  "Explain class formats according to what is relevant to the client.",
  "Ask better discovery questions.",
  "Personalise recommendations without making assumptions.",
  "Conduct a concise studio orientation.",
  "Close with a meaningful next step.",
  "Record useful information back into the CRM.",
  "Handle different client personalities and interruptions confidently.",
];
