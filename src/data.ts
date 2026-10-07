export type SectionKind = "intro" | "module" | "toolkit" | "practice";

export interface Section {
  id: string;
  kind: SectionKind;
  num?: number;
  label: string;
  format?: string;
  /** What happens in this chapter — one or two plain sentences. */
  summary?: string;
  /** What the chapter tells us — the point the trainer wants left behind. */
  takeaway?: string;
}

export const sections: Section[] = [
  { id: "overview", kind: "intro", label: "Overview", summary: "Sets up the day: who the training is for, the twelve outcomes we are aiming at, the ten-module run of show, and the two live practice tools.", takeaway: "This is one conversation broken into ten parts — not ten unrelated lessons." },
  { id: "m1", kind: "module", num: 1, label: "Why are we doing this?", format: "Discussion + mini exercise", summary: "Opens with two discussion questions about what a first-time client does not know and how that feels, then names the gap the induction exists to close.", takeaway: "Buying Physique 57 and knowing how to be a Physique 57 client are two different things. The induction is what carries a member across that gap." },
  { id: "m2", kind: "module", num: 2, label: "The First-Visit Test", format: "Group activity", summary: "Each associate writes five things a client should walk away thinking or feeling, then the room compares answers and finds the pattern.", takeaway: "The induction is measured by how the member feels afterwards — welcomed, known, comfortable, informed, confident, excited to return — not by how much we covered." },
  { id: "m3", kind: "module", num: 3, label: "The 7-Step Framework", format: "Teaching + demonstration", summary: "Teaches and demonstrates the seven steps of the induction conversation, in order, with what each step is for.", takeaway: "A repeatable structure is what makes the conversation feel natural rather than improvised — the steps carry the memory so the associate can stay present." },
  { id: "m4", kind: "module", num: 4, label: "CRM → Conversation Intelligence", format: "Interactive workshop", summary: "Puts a real CRM record on screen and works, as a group, from what the record says to what it implies and what to ask next.", takeaway: "The CRM is not a filing cabinet. Every field is a conversation starter, and preparation is what makes a member feel recognised." },
  { id: "m5", kind: "module", num: 5, label: "One Level Deeper", format: "Group exercise", summary: "Takes surface-level discovery answers and practises the follow-up question that goes one level deeper.", takeaway: "The first answer is rarely the real one. The second question is where the useful information lives." },
  { id: "m6", kind: "module", num: 6, label: "Policies, Formats & Recommendations", format: "Good vs bad practice", summary: "Walks through policies, class formats and recommendations, comparing a robotic delivery against a human one.", takeaway: "Policies are easier to accept when they are explained as care rather than recited as rules — and a format only lands when tied to what this member wants." },
  { id: "m7", kind: "module", num: 7, label: "The Terrible Induction", format: "Fun group exercise", summary: "The room deliberately builds the worst induction imaginable, then inverts every item into a standard.", takeaway: "Naming the failures out loud is faster than listing the rules — everyone already knows what bad feels like." },
  { id: "m8", kind: "module", num: 8, label: "Client Persona Role-Plays", format: "Pair practice", summary: "Associates pair up and run full inductions against assigned client personas, with an observer taking notes.", takeaway: "The framework only becomes yours once you have said it out loud to a person who does not behave like the script." },
  { id: "m9", kind: "module", num: 9, label: "Curveball Challenge", format: "Advanced role-play", summary: "Role-play again, but with interruptions, objections and awkward moments dropped in without warning.", takeaway: "Composure is a skill, not a personality trait. The recovery matters more to the member than the stumble." },
  { id: "m10", kind: "module", num: 10, label: "The Client Memory Test", format: "Team recap", summary: "A team recap: how much can we remember about the members we just met, and what should have reached the CRM.", takeaway: "An induction that is not recorded only happened once. Memory becomes service when it is written down." },
  { id: "studio", kind: "practice", label: "Role-Play Studio", format: "Live practice · real member records", summary: "Live practice with real member records, secret personas, hidden truths, observer-triggered interruptions and a guided debrief.", takeaway: "Shows how much of the induction holds up under real conditions, and where each associate is strongest." },
  { id: "members", kind: "practice", label: "Member Profiles", format: "CRM → questions", summary: "Real CRM records on screen, one at a time, to practise the read: what do we already know, and what would we ask?", takeaway: "Preparation takes two minutes and changes the first thirty seconds of the conversation." },
  { id: "loop", kind: "toolkit", label: "The CRM Loop", summary: "The cycle from CRM record → prepared questions → induction conversation → notes back into the CRM.", takeaway: "The loop is what makes the second visit better than the first, for any associate on shift." },
  { id: "policy", kind: "toolkit", label: "Policies & Facts Pack", summary: "The standing rules a member actually asks about — first visit, doors, cancellation, freeze, refunds, the level ladder, what runs where, the format menu, approved claims, health disclosures and house language.", takeaway: "Warmth and accuracy are the same job. Know the line, state it once with the reason attached, and escalate anything that is not on the page rather than guessing." },
  { id: "cheat", kind: "toolkit", label: "Induction Cheat Sheet", summary: "A one-page reference of the seven steps, the key questions and the phrases that work.", takeaway: "What to glance at ninety seconds before the member walks in." },
  { id: "never", kind: "toolkit", label: "What We Never Do", summary: "The short list of things we never do in an induction, and the reason behind each.", takeaway: "A few avoidable moves undo an otherwise good conversation — these are the non-negotiables." },
  { id: "close", kind: "toolkit", label: "Closing Message", summary: "Closes the session: the single commitment each associate makes for their next induction.", takeaway: "Training only counts if one thing changes on the floor tomorrow." },
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
