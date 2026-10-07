import type { Member } from "./members";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TruthTag = "Goal" | "Context" | "Preference" | "Consideration" | "Behaviour" | "Persona";

export interface Truth {
  id: string;
  tag: TruthTag;
  trigger: string; // what the associate must do to earn it
  reveal: string; // what the client says
  crm: string; // how it should be recorded afterwards
}

export interface ScheduledLine {
  id: string;
  at: number; // seconds into the induction
  text: string;
  kind: "persona" | "client" | "event";
}

export type Difficulty = "calm" | "realistic" | "chaos";

export interface Persona {
  id: string;
  name: string;
  tagline: string;
  brief: string;
  cues: string[];
  opening?: string;
  objective: string;
  watchFor: string[];
  difficulty: 1 | 2 | 3;
  match: (m: Member) => number;
  keyTruth: (m: Member) => Truth;
  pressure: (m: Member) => ScheduledLine[];
}

export interface Scenario {
  id: string;
  member: Member;
  persona: Persona;
  truths: Truth[];
  schedule: ScheduledLine[];
  difficulty: Difficulty;
  targetSecs: number;
  createdAt: number;
}

const has = (v: string | undefined, re: RegExp) => !!v && re.test(v);

/* ------------------------------------------------------------------ */
/* Personas                                                            */
/* ------------------------------------------------------------------ */

export const personas: Persona[] = [
  {
    id: "nervous",
    name: "The Nervous Beginner",
    tagline: "Intimidated by everyone looking fitter.",
    brief: "You almost didn't come in. You're convinced everyone here is fitter than you and that you'll be watched. You apologise a lot and give short answers until you feel safe.",
    cues: ["Avoid eye contact at first", "Apologise for 'silly' questions", "Relax noticeably once the associate uses your name and slows down"],
    opening: "I'm probably going to be terrible at this.",
    objective: "Build confidence without making unrealistic promises.",
    watchFor: ["Did they slow down?", "Did they promise results, or promise support?", "Did the tour remove physical uncertainty?"],
    difficulty: 1,
    match: (m) => (m.visits === 0 ? 2 : 0) + (has(m.experience, /none|no |never|beginner|first/i) ? 4 : 0) + (has(m.tags.join(" "), /beginner|new/i) ? 1 : 0),
    keyTruth: () => ({
      id: "k-nervous",
      tag: "Persona",
      trigger: `Reassures you without over-promising — e.g. tells you what the first class will actually feel like and that modifications are normal`,
      reveal: `I tried a gym once and quit in two weeks because nobody explained anything. I don't want that to happen again, honestly.`,
      crm: `First-visit confidence is low; prior gym experience ended badly because nothing was explained. Introduce to the trainer before class.`,
    }),
    pressure: () => [{ id: "p-nervous", at: 150, text: "Is everyone in the class going to be… really fit?", kind: "persona" }],
  },
  {
    id: "gym",
    name: "The Gym Regular",
    tagline: "Already lifts. Doesn't see the point of Barre.",
    brief: "You're confident and a little sceptical. You train seriously and you've decided this is probably 'light'. You respect people who know their stuff and switch off at vague claims.",
    cues: ["Arms crossed, polite but testing", "Use gym vocabulary (sets, progressive overload)", "Warm up if the associate asks about YOUR training before pitching"],
    opening: "I already lift. I don't really understand why I'd need Barre.",
    objective: "Understand the client's existing training and explain differences without becoming defensive.",
    watchFor: ["Did they get defensive or curious?", "Did they explain a difference the client could understand?", "Did they involve the client in choosing a format?"],
    difficulty: 2,
    match: (m) => (has(m.experience, /gym|lift|weights|crossfit|strength/i) ? 6 : 0) + (has(m.goal, /strength|muscle/i) ? 2 : 0),
    keyTruth: (m) => ({
      id: "k-gym",
      tag: "Persona",
      trigger: `Asks what you currently train, how often, and what you're not getting from it`,
      reveal: `I've plateaued for months. My lifts aren't moving and my lower back complains after heavy days. I'm here for something that makes the lifting better — not to replace it.`,
      crm: `Experienced lifter (${m.experience || "gym regular"}); plateaued, lower back fatigue after heavy sessions. Interested in formats that complement lifting.`,
    }),
    pressure: () => [{ id: "p-gym", at: 180, text: "So how heavy do you actually go in Strength Lab?", kind: "persona" }],
  },
  {
    id: "occasion",
    name: "The Occasion Client",
    tagline: "A date on the calendar. The real goal is underneath it.",
    brief: "You have a deadline — a wedding, a holiday, an event — and you lead with it. But the date isn't really the goal: how you want to FEEL is. You only say that if you're asked properly.",
    cues: ["Mention the date early and often", "Deflect with 'just want to be fit for it' if asked lazily", "Light up if asked what you'd love to feel by then"],
    objective: "Discover what the CRM can't tell you. The real goal only surfaces if you ask — this is the value of discovery.",
    watchFor: ["Did they go one level deeper than the date?", "Did they promise an outcome?", "Did the recommendation come from the conversation or the CRM field?"],
    difficulty: 2,
    match: (m) => (has(m.goal, /wedding|holiday|trip|event|reunion|shoot|birthday|marathon|\b(\d+)\s*(weeks|days)\b|before/i) ? 7 : 0),
    keyTruth: (m) => ({
      id: "k-occasion",
      tag: "Persona",
      trigger: `Asks what you'd personally love to feel or achieve by the date — not just 'get fit for it'`,
      reveal: `I really want stronger arms and core, and I want to feel confident in my clothes. The date is the pressure, not the point.`,
      crm: `Goal detail: wants to feel stronger (arms/core) and confident in clothes; ${m.goal ? `date-driven (${m.goal})` : "date-driven"}.`,
    }),
    pressure: () => [{ id: "p-occasion", at: 200, text: "Realistically — how much can I change before then?", kind: "persona" }],
  },
  {
    id: "exec",
    name: "The Busy Executive",
    tagline: "Has five minutes. Maybe.",
    brief: "You're courteous but your phone is face-up on the counter. You want the essentials, fast, and you respect someone who prioritises. You'll cut the induction short.",
    cues: ["Check the time twice in the first minute", "Answer briefly, decisively", "Appreciate being given a clear 'here's what you must know'"],
    objective: "Prioritise the Must Knows and shorten gracefully.",
    watchFor: ["Did they re-prioritise or keep reciting?", "Which essentials made the cut?", "Did they still close with a next step?"],
    difficulty: 2,
    match: (m) => (has(m.preferredTime, /early|morning|6|7am/i) ? 3 : 0) + (has(m.tags.join(" ") + " " + (m.notes || ""), /exec|travel|assistant|corporate|busy/i) ? 5 : 0),
    keyTruth: (m) => ({
      id: "k-exec",
      tag: "Persona",
      trigger: `Asks which days you're actually in the city and how far ahead you can plan`,
      reveal: `I'm away two weeks a month. If I can't book the week I'm back, I won't come. I'd love someone to just tell me the three things I must know.`,
      crm: `Travels ~2 weeks/month; needs booking flow explained for the weeks in town. ${m.preferredTime ? `Prefers ${m.preferredTime}.` : ""} Keep touchpoints short.`,
    }),
    pressure: () => [{ id: "p-exec", at: 120, text: "Sorry, I have a call in five minutes.", kind: "persona" }],
  },
  {
    id: "silent",
    name: "The Silent Client",
    tagline: "Yeah. Fine. Okay. Not really.",
    brief: "You're not rude — you're reserved. Closed questions get one-word answers. You open up only to genuinely open questions asked without pressure.",
    cues: ["One-word answers to anything that can be answered yes/no", "Pause before answering", "Give a full sentence ONLY when the question is open and unhurried"],
    objective: "Ask open-ended questions without interrogating.",
    watchFor: ["Closed vs open questions — keep a tally", "Did silence make them talk more?", "Did they still discover one real thing?"],
    difficulty: 3,
    match: (m) => (m.completeness < 0.4 ? 6 : 0) + (m.visits === 0 ? 1 : 0),
    keyTruth: () => ({
      id: "k-silent",
      tag: "Persona",
      trigger: `Asks one open question and actually waits — e.g. "What would make this feel worth it for you?"`,
      reveal: `…My sister signed me up. I didn't choose this. But I do want to feel less tired all the time.`,
      crm: `Signed up by a family member; personal motivation is energy/fatigue rather than aesthetics. Open questions work; closed ones don't.`,
    }),
    pressure: () => [{ id: "p-silent", at: 160, text: "(Look at your phone. Answer the next question with 'not really'.)", kind: "persona" }],
  },
  {
    id: "enthusiast",
    name: "The Overenthusiastic Client",
    tagline: "Coming every single day. Which classes should I double up?",
    brief: "You're excited, fast-talking and want a programme NOW. You'll push the associate to prescribe. You take any hesitation as 'not knowing'.",
    cues: ["Interrupt with questions", "Ask for specific class combinations", "Try to get them to say 'you should do X then Y'"],
    opening: "I'm going to come every single day. Which classes should I double up?",
    objective: "Don't make medical or training prescriptions beyond your role. Help them understand formats and encourage an appropriate conversation with trainers where necessary.",
    watchFor: ["Did they prescribe?", "Did they explain formats or sell them?", "Did they route the programming question to a trainer gracefully?"],
    difficulty: 2,
    match: (m) => (m.upcoming >= 4 ? 6 : 0) + (has(m.goal, /transform|30 days|fast|asap/i) ? 3 : 0) + (has(m.membership, /unlimited/i) ? 1 : 0),
    keyTruth: () => ({
      id: "k-enth",
      tag: "Persona",
      trigger: `Asks what happened the last time you started something with this much energy`,
      reveal: `I burn out. Every time. Three weeks of everything, then nothing. I probably need someone to slow me down — but don't tell me that.`,
      crm: `High initial intent; history of burnout after 2–3 weeks. Suggest trainer conversation on pacing; follow up at week 2.`,
    }),
    pressure: () => [{ id: "p-enth", at: 140, text: "Can I do Barre and PowerCycle back-to-back tomorrow?", kind: "persona" }],
  },
  {
    id: "cautious",
    name: "The Cautious Returner",
    tagline: "An injury or health note on file. Wants to be safe — and private.",
    brief: "You've got a reason to be careful and you hate it being made a 'thing' at a reception desk. You want to know who to tell and that someone competent will adapt the class.",
    cues: ["Lower your voice if health comes up", "Ask 'is that class safe for me?' — you want a confident, honest boundary", "Relax when they offer to connect you with the trainer"],
    objective: "Handle considerations discreetly. Never diagnose or declare a class 'safe'. Connect the client to the trainer.",
    watchFor: ["Did they say the medical note out loud?", "Did they play doctor?", "Did they route to the trainer with warmth, not alarm?"],
    difficulty: 3,
    match: (m) => (m.medical ? 7 : 0) + (has(m.goal, /rebuild|return|mobility|rehab/i) ? 2 : 0),
    keyTruth: (m) => ({
      id: "k-cautious",
      tag: "Persona",
      trigger: `Asks — quietly — whether there's anything you'd like the trainer to know before class, rather than reading the note aloud`,
      reveal: `Yes. ${m.medical ? "What's on file is right, but" : "There's a note on my file, and"} I'd rather tell the trainer myself, quietly, before class. Please don't announce it.`,
      crm: `Prefers to brief trainers personally before class; flag "introduce to trainer 5 min early". Do not discuss health notes at the desk.`,
    }),
    pressure: () => [{ id: "p-cautious", at: 170, text: "I have an injury. Which class is safe for me?", kind: "persona" }],
  },
  {
    id: "sceptic",
    name: "The Sceptic",
    tagline: "Already been told all this. Nobody mentioned the cancellation rule.",
    brief: "You bought the package and feel slightly oversold. You test the associate on policies and push back on anything that sounds like a rule you weren't told at purchase.",
    cues: ["Say 'nobody told me that' at least once", "Ask for the policy to be justified, not recited", "Soften when it's explained as help, not enforcement"],
    opening: "I've already been told all this.",
    objective: "Explain policies clearly and confidently — not apologetically, not as a threat — and keep the relationship intact.",
    watchFor: ["Did the policy sound like help or a warning?", "Did they get defensive?", "Did they check instead of inventing when unsure?"],
    difficulty: 3,
    match: (m) => (m.noShows + m.lateCancels > 0 ? 5 : 0) + (has(m.notes, /desk|bought|purchase/i) ? 2 : 0),
    keyTruth: (m) => ({
      id: "k-sceptic",
      tag: "Persona",
      trigger: `Asks what was explained at purchase and what you'd like clarified — instead of restarting the script`,
      reveal: `Honestly, I was rushed through the signup. ${m.noShows ? "I missed a class because I didn't know how to cancel on the app." : "I don't know how the waitlist works and I didn't want to ask."}`,
      crm: `Felt rushed at signup; needs booking/cancellation/waitlist shown on the app, not described. ${m.noShows ? "No-show was a process gap, not disinterest." : ""}`,
    }),
    pressure: () => [{ id: "p-sceptic", at: 150, text: "Nobody told me that when I bought the package.", kind: "persona" }],
  },
];

export function suggestPersona(m: Member): Persona {
  const scored = personas.map((p) => ({ p, s: p.match(m) }));
  scored.sort((a, b) => b.s - a.s);
  return scored[0].s > 0 ? scored[0].p : personas[Math.floor(Math.random() * personas.length)];
}

export function personaScores(m: Member) {
  return personas.map((p) => ({ persona: p, score: p.match(m) })).sort((a, b) => b.score - a.score);
}

/* ------------------------------------------------------------------ */
/* Hidden truths from CRM fields                                       */
/* ------------------------------------------------------------------ */

interface Template {
  match: RegExp;
  trigger: string;
  reveal: string;
  crm: string;
}

const goalTemplates: Template[] = [
  { match: /wedding|marriage|shaadi|engagement/i, trigger: "Asks what 'fit for the wedding' would actually feel like for you", reveal: "I want to feel strong and confident in my clothes — mostly arms and core. I don't want to be exhausted at my own wedding.", crm: "Goal detail: strength (arms/core) + confidence; energy matters more than the scale." },
  { match: /weight|fat|lose|kg|slim|belly/i, trigger: "Asks what — apart from the number on the scale — you'd like to feel different", reveal: "Honestly, energy. I'm done by 4pm every day. Weight is what I say; energy is what I want.", crm: "Goal detail: energy/stamina through the day; weight is secondary framing." },
  { match: /tone|toned|lean|sculpt/i, trigger: "Asks what 'tone' means to you — and where", reveal: "Arms and the back of my legs. I don't want to feel bulky — I want to feel tight and strong.", crm: "Goal detail: 'tone' = arms + posterior chain; wants strong-not-bulky." },
  { match: /strength|strong|muscle/i, trigger: "Asks what strength is for — in your day, not in the gym", reveal: "I want to carry my own suitcase up the stairs and not think about it. And my posture is terrible from the laptop.", crm: "Goal detail: functional strength + posture (desk-based)." },
  { match: /stamina|endurance|run|marathon|cardio/i, trigger: "Asks what stamina is for — an event, a sport, daily life", reveal: "I'm doing a 10K in the autumn and I fade after 4 km. I need legs and lungs, not more running.", crm: "Goal detail: 10K in autumn; wants leg strength + conditioning to support running." },
  { match: /return|rebuild|back|restart|again|routine|mobility/i, trigger: "Asks what you were doing before and what you actually enjoyed about it", reveal: "I miss feeling capable. It's not about looking like before — I want to trust my body again.", crm: "Goal detail: rebuild confidence in body; progressive, not aggressive." },
  { match: /transform|30 days|fast|quick/i, trigger: "Asks what 'transform' would mean on day 31", reveal: "I want to not quit. That's the transformation. I always quit.", crm: "Goal detail: consistency is the real goal; at-risk for burnout." },
  { match: /postnatal|postpartum|baby|pregnan/i, trigger: "Asks, gently, what would feel good right now rather than what you 'should' do", reveal: "I want to feel like my body is mine again. Core and back — carrying a baby all day is brutal.", crm: "Goal detail: core/back strength; wants to feel ownership of body again." },
  { match: /fit|fitter|fitness|health|general/i, trigger: "Asks what made you decide to start now", reveal: "My doctor mentioned a number I didn't like. I don't want to talk about that at the desk — I just want to start.", crm: "Goal detail: health-driven start (keep private); wants momentum, not a lecture." },
];

const medicalTemplates: Template[] = [
  { match: /asthma|breath/i, trigger: "Asks — without making it clinical — what kinds of workouts have felt best for you", reveal: "Strength is completely fine. I just hate feeling breathless the whole way through.", crm: "Prefers strength-led formats; dislikes prolonged breathlessness. Trainer to know." },
  { match: /knee|acl|meniscus|ankle|hip/i, trigger: "Asks whether there's anything you'd like the trainer to know, and what you'd rather avoid", reveal: "Deep lunges and jumping. My physio has cleared everything else — I'd love the trainer to know before class, not during.", crm: "Avoids deep lunges/jumping (physio-cleared otherwise). Brief trainer before class." },
  { match: /back|spine|disc|slip/i, trigger: "Asks what movement feels good versus what you avoid", reveal: "Sitting is worse than moving. I've been told to strengthen core and glutes — I just need someone to watch my form.", crm: "Back: prioritise core/glute strength; wants form attention. Trainer to know." },
  { match: /shoulder|rotator|neck/i, trigger: "Asks what you'd like the trainer to adapt", reveal: "Overhead work is iffy. Everything else is fine. Please don't make it a whole conversation.", crm: "Overhead work to be modified. Keep discreet." },
  { match: /postnatal|postpartum|c-section|caesar/i, trigger: "Asks, discreetly, what pace feels right and whether you'd like the trainer to know", reveal: "I'm cleared, but I'd like to go slow on core work for a while. I'd rather tell the trainer myself.", crm: "Postnatal: gradual core progression; client briefs trainer directly." },
  { match: /pressure|bp|hypertens|diabet|thyroid|pcos|heart/i, trigger: "Doesn't bring it up unprompted; asks only what pace suits you and whether the trainer should know anything", reveal: "I'd like to build up slowly and be told when to rest. Please don't make a thing of it at the desk.", crm: "Prefers gradual build; trainer to be briefed quietly. Do not discuss at reception." },
  { match: /./, trigger: "Asks whether there's anything you'd like the trainer to know before class", reveal: "Yes — but I'd prefer to tell the trainer quietly, not at the desk.", crm: "Client will brief trainer personally; arrange 5 minutes before first class." },
];

function timeTruth(m: Member): Truth | null {
  if (!m.preferredTime) return null;
  const morning = /morning|6|7|8am|early/i.test(m.preferredTime);
  const evening = /evening|night|7pm|8pm|after/i.test(m.preferredTime);
  return {
    id: "t-time",
    tag: "Preference",
    trigger: "Asks whether that's every day or only particular days",
    reveal: morning
      ? "Weekdays before 8 — I'm at my desk by 9. On weekends I'd actually prefer late morning."
      : evening
      ? "Monday to Thursday after 7. Fridays are impossible and weekends I'd rather come in the morning."
      : "It changes week to week. If you could show me how to see the schedule myself, that would help more than a fixed slot.",
    crm: morning ? "Schedule: weekday mornings before 8am; weekends late morning." : evening ? "Schedule: Mon–Thu evenings after 7pm; weekend mornings." : "Schedule varies weekly; wants to self-serve the schedule in the app.",
  };
}

function experienceTruth(m: Member): Truth | null {
  const e = m.experience;
  if (!e) return null;
  if (/none|no |never|beginner|first/i.test(e))
    return { id: "t-exp", tag: "Context", trigger: "Asks what you've enjoyed moving-wise — not what workouts you've done", reveal: "I liked swimming as a kid. I've never been in a group class. I'm scared of being watched.", crm: "No group class experience; anxious about being watched. Position near the back/trainer on first visit." };
  if (/gym|lift|weights|crossfit/i.test(e))
    return { id: "t-exp", tag: "Preference", trigger: "Asks what you lift and what you actually enjoy", reveal: "Deadlifts and pull-ups. I hate anything that feels like a dance class — which is my fear here, honestly.", crm: "Enjoys heavy compound lifts; worried formats feel 'dance-like'. Explain Strength Lab/FIT first." };
  if (/yoga|pilates|dance|kathak|ballet|bharat/i.test(e))
    return { id: "t-exp", tag: "Preference", trigger: "Asks what you loved about it and what you miss", reveal: "The control. Slow and precise is my happy place — loud and fast puts me off.", crm: "Movement background; prefers controlled/precise formats over high-intensity." };
  if (/run|walk|football|cricket|sport|tennis|swim/i.test(e))
    return { id: "t-exp", tag: "Preference", trigger: "Asks what you enjoy about your sport and what it's missing", reveal: "I love being outdoors and competing. What I'm missing is strength — I get injured every season.", crm: "Sport-active; wants strength to prevent injury. Competitive — give progress markers." };
  if (/home|youtube|app|on and off/i.test(e))
    return { id: "t-exp", tag: "Context", trigger: "Asks what made home workouts stop working", reveal: "Nobody's watching, so I stop. I need a room with people and a time I've paid for.", crm: "Accountability-driven; consistency is the issue. Encourage fixed weekly bookings." };
  return { id: "t-exp", tag: "Context", trigger: "Asks what you've done before and what you actually enjoyed", reveal: `I've done bits of ${e.toLowerCase()}. What I enjoyed was feeling like I was getting better at something.`, crm: `Background: ${e}. Motivated by visible progression.` };
}

function sourceTruth(m: Member): Truth | null {
  const s = m.source;
  if (!s) return null;
  const friend = s.match(/\(([^)]+)\)/)?.[1];
  if (/referral|friend|wife|husband|partner|member/i.test(s))
    return { id: "t-source", tag: "Context", trigger: "Asks who referred you and what they told you to expect", reveal: `${friend ? friend.split(" ")[0] : "My friend"} said the trainers are brilliant — and that she'd get me into class even if I'm a bit late.`, crm: `Referred by ${friend || "a member"}; may have been told late entry is flexible — explain late-entry policy warmly.` };
  if (/instagram|reel|social|facebook/i.test(s))
    return { id: "t-source", tag: "Context", trigger: "Asks what made you finally come in", reveal: "I've watched the reels for months. I almost didn't come in today — the room looks intimidating online.", crm: "Long consideration period via Instagram; intimidated by the 'look' of classes. Reassure on first class." };
  if (/doctor|physio|medical/i.test(s))
    return { id: "t-source", tag: "Context", trigger: "Asks what you were told to look for in a class", reveal: "Strength, controlled, with people who correct form. Nothing with jumping.", crm: "Medically-advised strength training; wants form correction, no jumping." };
  if (/corporate|office|work/i.test(s))
    return { id: "t-source", tag: "Context", trigger: "Asks how the corporate plan works for you day to day", reveal: "My company pays, so I feel I should use it — but I don't know when I realistically can.", crm: "Corporate member; motivation is partly obligation — help build a realistic weekly slot." };
  if (/walk/i.test(s))
    return { id: "t-source", tag: "Context", trigger: "Asks what brought you through the door today", reveal: "I live round the corner and I've walked past a hundred times. Today I just did it.", crm: "Local walk-in; proximity is the hook. Suggest consistent weekday slot." };
  return null;
}

function behaviourTruth(m: Member): Truth | null {
  if (m.noShows > 0 || m.lateCancels > 0)
    return { id: "t-beh", tag: "Behaviour", trigger: "Asks about the missed booking without making it awkward — e.g. 'what got in the way?'", reveal: "A meeting ran over and I didn't know how to cancel in the app. Then I felt embarrassed, so I late-cancelled the next one too.", crm: "No-show/late-cancel was a process gap (didn't know how to cancel in app). Walked through cancellation flow — follow up before next booking." };
  if (m.upcoming >= 4)
    return { id: "t-beh", tag: "Behaviour", trigger: "Notices the bookings and asks how you chose them", reveal: `I just booked whatever was available. I don't know what any of them are. Is ${m.upcoming} a lot?`, crm: `Booked ${m.upcoming} classes without knowing formats; needs format guidance + pacing conversation with trainer.` };
  if (m.visits > 0)
    return { id: "t-beh", tag: "Behaviour", trigger: "Asks how the first class felt — specifically, not 'was it good?'", reveal: "I got lost finding the changing room and nobody noticed. The class was fine. I didn't say anything.", crm: `${m.visits} prior visit${m.visits > 1 ? "s" : ""}; first-visit orientation gap (changing rooms). Do the walk-through properly.` };
  return null;
}

export function buildTruths(m: Member, persona: Persona): Truth[] {
  const truths: Truth[] = [];
  const g = m.goal ? goalTemplates.find((t) => t.match.test(m.goal!)) : undefined;
  const overlapsPersona = (persona.id === "occasion" && g === goalTemplates[0]) || (persona.id === "enthusiast" && g?.match.source.includes("transform")) || (persona.id === "gym" && g?.match.source.includes("strength"));
  if (g && !overlapsPersona) truths.push({ id: "t-goal", tag: "Goal", trigger: g.trigger, reveal: g.reveal, crm: g.crm });
  const key = persona.keyTruth(m);
  if (!truths.some((t) => t.reveal === key.reveal)) truths.push(key);
  if (m.medical) {
    const t = medicalTemplates.find((x) => x.match.test(m.medical!))!;
    if (persona.id !== "cautious") truths.push({ id: "t-med", tag: "Consideration", trigger: t.trigger, reveal: t.reveal, crm: t.crm });
  }
  const rest = [experienceTruth(m), timeTruth(m), sourceTruth(m), behaviourTruth(m)].filter((x): x is Truth => !!x);
  // shuffle lightly so repeated runs differ
  rest.sort(() => Math.random() - 0.5);
  for (const t of rest) {
    if (truths.length >= 6) break;
    truths.push(t);
  }
  if (truths.length < 3) {
    truths.push({ id: "t-why", tag: "Goal", trigger: "Asks what made you decide to start now", reveal: "I turned a corner recently and I'm tired of saying 'next month'. That's it, really.", crm: "Motivation: recent decision point; wants momentum." });
  }
  return truths;
}

/* ------------------------------------------------------------------ */
/* Curveballs & schedule                                               */
/* ------------------------------------------------------------------ */

export const curveballDeck: { text: string; kind: "client" | "event" }[] = [
  { text: "My class starts in three minutes.", kind: "client" },
  { text: "I've already been told all this.", kind: "client" },
  { text: "Which class burns the most calories?", kind: "client" },
  { text: "Can I cancel 30 minutes before?", kind: "client" },
  { text: "Nobody told me that when I bought the package.", kind: "client" },
  { text: "My friend said she'd get me into class even if I'm late.", kind: "client" },
  { text: "I hate cycling.", kind: "client" },
  { text: "Which trainer is the best?", kind: "client" },
  { text: "Can I lose 5 kg before my wedding?", kind: "client" },
  { text: "I have an injury. Which class is safe for me?", kind: "client" },
  { text: "I don't understand the difference between FIT and Strength Lab.", kind: "client" },
  { text: "Can you just WhatsApp all this to me?", kind: "client" },
  { text: "Reception phone rings.", kind: "event" },
  { text: "Another member interrupts with a question.", kind: "event" },
  { text: "Client starts scrolling Instagram.", kind: "event" },
  { text: "Trainer calls the client into class.", kind: "event" },
];

function pick<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (copy.length && out.length < n) out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  return out;
}

export function buildSchedule(persona: Persona, member: Member, difficulty: Difficulty, targetSecs: number): ScheduledLine[] {
  const lines: ScheduledLine[] = difficulty === "calm" ? [] : persona.pressure(member);
  const count = difficulty === "calm" ? 0 : difficulty === "realistic" ? 2 : Math.max(4, Math.floor(targetSecs / 55));
  const picks = pick(
    curveballDeck.filter((c) => !lines.some((l) => l.text === c.text)),
    count
  );
  const window = targetSecs - 60;
  picks.forEach((c, i) => {
    const at = difficulty === "chaos" ? 60 + i * 55 + Math.floor(Math.random() * 15) : 75 + Math.floor(((i + 0.5) * window) / count + (Math.random() * 30 - 15));
    lines.push({ id: `c-${i}-${Date.now()}`, at: Math.max(45, Math.min(targetSecs + 30, at)), text: c.text, kind: c.kind });
  });
  return lines.sort((a, b) => a.at - b.at);
}

export function buildScenario(member: Member, persona: Persona, difficulty: Difficulty, targetMins: number): Scenario {
  const targetSecs = targetMins * 60;
  return {
    id: `${member.id}-${persona.id}-${Date.now()}`,
    member,
    persona,
    truths: buildTruths(member, persona),
    schedule: buildSchedule(persona, member, difficulty, targetSecs),
    difficulty,
    targetSecs,
    createdAt: Date.now(),
  };
}

export const firstSeven = [
  { n: 1, name: "Welcome", mantra: "Make me comfortable.", target: 45 },
  { n: 2, name: "Discover", mantra: "Understand me.", target: 90 },
  { n: 3, name: "Decode", mantra: "Help me understand our formats.", target: 90 },
  { n: 4, name: "Navigate", mantra: "Teach me the essentials.", target: 90 },
  { n: 5, name: "Tour", mantra: "Show me around.", target: 60 },
  { n: 6, name: "Personalise", mantra: "Connect Physique 57 to me.", target: 60 },
  { n: 7, name: "Close", mantra: "Give me a next step.", target: 30 },
];

export const crimeList = [
  "Didn't introduce themselves",
  "Didn't use the client's name",
  "Talked incredibly quickly",
  "Read CRM information aloud",
  "Asked no questions",
  "Explained every class",
  "Used jargon",
  "Listed policies back-to-back",
  "Pointed instead of walking",
  "Interrupted the client",
  "Recommended before understanding",
  "Said “Anything else?”",
  "Finished abruptly",
  "Mentioned sensitive info unnecessarily",
  "Invented an answer instead of checking",
];

export const fiveCs = [
  { c: "Connect", q: "Did I feel welcomed?" },
  { c: "Curious", q: "Did they discover something useful?" },
  { c: "Clear", q: "Could I understand them?" },
  { c: "Complete", q: "Were the important induction elements covered?" },
  { c: "Continue", q: "Did I leave knowing what happens next?" },
];

export type Rating = "STRONG" | "DEVELOPING" | "RETRY";
