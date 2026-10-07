import { useState } from "react";
import { Shuffle, Zap, Ban, RotateCcw } from "lucide-react";
import type { Section } from "../data";
import { QuestionInferenceGuide, type QuestionInference } from "./QuestionInferenceGuide";
import { ModuleHeader, Statement, Card, Eyebrow, Display, Quote, Block, Lede, Chip, DoDont } from "./ui";

/* ================================================================== */
/* MODULE 5                                                            */
/* ================================================================== */

interface DeeperPrompt extends QuestionInference { say: string }

const rapidDeck: DeeperPrompt[] = [
  { say: "I want to tone.", evidence: "Member stated: I want to tone.", inference: "Tone may mean strength, definition or confidence to this member; the meaning is still unknown.", ask: "What does feeling toned mean to you?", follow: "What change would you most like to notice in everyday life?" },
  { say: "I don't like cardio.", evidence: "Member stated: I don’t like cardio.", inference: "The barrier could relate to intensity, format or a previous experience. It does not establish a medical limitation.", ask: "What is it about cardio that you don’t enjoy?", follow: "What kinds of practice have felt good for you instead?" },
  { say: "Evenings are easier.", evidence: "Member stated: Evenings are easier.", inference: "Evening availability may help consistency, but specific days and competing commitments remain unknown.", ask: "Which evenings fit most comfortably into your week?", follow: "What could make those times difficult to keep?" },
  { say: "I want to lose weight.", evidence: "Member stated: I want to lose weight.", inference: "A weight goal is stated. Broader motivations or desired changes should be explored without assuming dissatisfaction or promising an outcome.", ask: "What would achieving that goal mean to you?", follow: "What other changes, if any, would you like to notice along the way?" },
  { say: "I used to work out.", evidence: "Member stated: I used to work out.", inference: "There is previous practice experience, but its type, recency and the reason for stopping are unknown.", ask: "What kind of practice did you do, and what did you enjoy about it?", follow: "What would help you return to a routine now?" },
  { say: "I just want to get back into a routine.", evidence: "Member stated: I want to get back into a routine.", inference: "Consistency may be a priority. The member’s barriers and realistic frequency are not yet known.", ask: "What would a manageable routine look like for you right now?", follow: "What has made keeping a routine difficult in the past?" },
  { say: "I've heard Barre is really hard.", evidence: "Member stated: I’ve heard Barre is really hard.", inference: "The member may want clarity about what to expect. This statement alone does not establish fear or readiness.", ask: "What have you heard about Barre, and what would you like to understand better?", follow: "What would help you feel prepared for your first Studio Session?" },
  { say: "I only have 45 minutes in the mornings.", evidence: "Member stated: I only have 45 minutes in the mornings.", inference: "Time is a stated constraint; clarify whether it includes travel and changing before suggesting an option.", ask: "What needs to fit into those 45 minutes?", follow: "Which mornings are realistic for you, including getting to and from the Studio Space?" },
  { say: "I want to get leaner.", evidence: "Member stated: I want to get leaner.", inference: "Leaner is an undefined goal; explore the member’s meaning without assuming a weight target.", ask: "What does getting leaner mean to you personally?", follow: "How would you like to recognise progress?" },
  { say: "My friend told me I should try this.", evidence: "Member stated: My friend told me I should try this.", inference: "A friend prompted the visit, but the member’s own motivation and interests are still unknown.", ask: "What made you decide to give the Method a try for yourself?", follow: "What would make this worthwhile for you?" },
  { say: "I get bored easily.", evidence: "Member stated: I get bored easily.", inference: "Variety may matter, but the member could also value challenge, music or visible progress. Ask before choosing a format.", ask: "What keeps a Studio Session engaging for you?", follow: "What has made you lose interest in past routines?" },
  { say: "I have a holiday in six weeks.", evidence: "Member stated: I have a holiday in six weeks.", inference: "There is a near-term event, but no specific transformation goal has been stated.", ask: "What would you like to feel or be able to do by your holiday?", follow: "What kind of routine feels realistic over the next six weeks?" },
  { say: "I've never done a group class before.", evidence: "Member stated: I’ve never done a group session before.", inference: "The group format is new. This does not establish their overall practice experience or comfort level.", ask: "What would you like to know about practising in a group?", follow: "What would help you feel comfortable in your first session?" },
  { say: "I want to build strength.", evidence: "Member stated: I want to build strength.", inference: "Strength is a stated goal; the member’s baseline and personally meaningful outcomes still need context.", ask: "What would being stronger help you do?", follow: "What strength practice, if any, are you doing at the moment?" },
  { say: "I'm not very flexible.", evidence: "Member stated: I’m not very flexible.", inference: "The member describes a limitation, but may be asking about participation, comfort or progress. Do not treat it as a diagnosis.", ask: "How does that affect what you would like to do in a session?", follow: "What would you like your Instructor to help you understand before you begin?" },
];

const deeper = rapidDeck.slice(0, 5);

export function Module5({ section }: { section: Section }) {
  const [current, setCurrent] = useState<DeeperPrompt | null>(null);
  const [drawn, setDrawn] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  const draw = () => {
    const remaining = rapidDeck.filter((item) => !drawn.includes(item.say));
    const pool = remaining.length ? remaining : rapidDeck;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(next);
    setDrawn(remaining.length ? [...drawn, next.say] : [next.say]);
    setRound((r) => r + 1);
  };

  const reset = () => {
    setCurrent(null);
    setDrawn([]);
    setRound(0);
  };

  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="One Level Deeper" subtitle="Fast. Energetic. Before you recommend anything, ask one more useful question." />

      <Statement kicker="The temptation" size="lg">
        Your biggest temptation in sales and servicing is to <span className="text-coral-400">solve too quickly.</span>
      </Statement>

      <Block>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto] md:items-center">
          <Quote tone="client" who="Client">
            I want to tone.
          </Quote>
          <span className="hidden md:block font-display text-3xl text-ink-300">→</span>
          <Quote tone="bad" who="Associate, immediately">
            Take Barre!
          </Quote>
          <div className="flex items-center justify-center rounded-2xl bg-coral-500 px-8 py-5 text-white">
            <span className="font-display text-4xl font-semibold tracking-tight">No.</span>
          </div>
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">The move</Eyebrow>
          <Display size="lg">ONE LEVEL DEEPER.</Display>
          <Lede>Discuss each statement, then expand its ideal question, tentative inference and follow-up.</Lede>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deeper.map((item) => (
            <QuestionInferenceGuide key={item.say} label={`“${item.say}” · Ideal question & inference`} items={[item]} />
          ))}
          <div className="flex min-h-[200px] flex-col justify-between rounded-3xl border border-dashed border-ink-900/20 bg-cream-200/40 p-6">
            <Eyebrow>Pattern</Eyebrow>
            <p className="font-display text-xl md:text-2xl font-light leading-snug text-ink-700">
              Every follow-up opens the conversation. <span className="italic">None of them recommends.</span>
            </p>
          </div>
        </div>
      </Block>

      {/* Rapid fire */}
      <Block>
        <div className="grain relative overflow-hidden rounded-3xl bg-ink-950 p-6 md:p-10 text-cream-50">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-coral-500/30 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral-500">
                  <Zap className="h-5 w-5" />
                </span>
                <Eyebrow tone="light">Group exercise · Around the room</Eyebrow>
              </div>
              <Display size="md" className="font-light">
                One better question.
              </Display>
              <ul className="space-y-3 text-cream-200">
                <li className="flex items-start gap-3">
                  <span className="mt-1 font-display text-coral-400">1</span> A statement appears on screen.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 font-display text-coral-400">2</span> Take a moment to produce a useful follow-up question.
                </li>
                <li className="flex items-start gap-3">
                  <Ban className="mt-1 h-4 w-4 text-coral-400" /> <strong className="text-cream-50">No recommendation allowed.</strong>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={draw} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-coral-400">
                  <Shuffle className="h-4 w-4" /> {current ? "Next statement" : "Draw a statement"}
                </button>
                {round > 0 && (
                  <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-cream-50 transition-colors hover:bg-white/10">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                )}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-cream-400">
                Round {round} · {drawn.length}/{rapidDeck.length} drawn
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex min-h-[260px] flex-1 items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                {current ? (
                  <p key={current.say} className="animate-fade-up font-display text-3xl md:text-4xl lg:text-5xl font-light italic leading-tight tracking-tight">
                    “{current.say}”
                  </p>
                ) : (
                  <p className="font-display text-2xl font-light text-cream-400">Draw a statement to begin.</p>
                )}
              </div>
              {current && <QuestionInferenceGuide key={round} label="This statement · Ideal question & inference" items={[current]} />}
            </div>
          </div>
        </div>
      </Block>
    </div>
  );
}

/* ================================================================== */
/* MODULE 6                                                            */
/* ================================================================== */

const formats = [
  { name: "Barre 57", desc: "Controlled, precise, full-body muscular endurance. Where everyone starts." },
  { name: "Strength Lab", desc: "Heavier resistance, progressive strength development, more recovery between sets." },
  { name: "FIT", desc: "Functional strength + conditioning through timed intervals." },
  { name: "powerCycle", desc: "Cardio-led rhythm cycling with coached intensity, watts and kilometres tracked." },
];

/** The policies members ask about most — said as care, not as rules. */
const policyLines: { rule: string; dont: string; doIt: string; why: string }[] = [
  {
    rule: "The doors",
    dont: "Our policy is that doors lock ten minutes after the start time.",
    doIt: "One thing worth knowing: we close the doors ten minutes in — five for powerCycle — so give yourself a little buffer and you'll never be caught out.",
    why: "A late entry means a missed set-up and a disrupted room. Said at the induction, it is never a surprise later.",
  },
  {
    rule: "Cancellation",
    dont: "If you cancel late you lose the class, that's the policy.",
    doIt: "Just so you have it: cancel up to twelve hours before and the credit comes straight back to you — twenty-four hours for a private session.",
    why: "Places are limited, and the window is what lets somebody on the waitlist take the spot.",
  },
  {
    rule: "Grip socks",
    dont: "You have to buy grip socks, they're compulsory.",
    doIt: "You'll need grip socks for the session — we have them at the boutique, so let's sort you a pair before you go in.",
    why: "A barre floor is unforgiving in bare feet or ordinary socks. It is a safety item, offered before the class rather than after.",
  },
  {
    rule: "Freeze & pauses",
    dont: "Freezes have to be approved, I can't promise anything.",
    doIt: "If travel or illness comes up, email the studio at least forty-eight hours ahead and we'll pause your membership — your validity extends by exactly the days you miss.",
    why: "Members worry about wasting what they bought. Naming the pause at the start removes the fear before it forms.",
  },
  {
    rule: "The level ladder",
    dont: "You're not allowed into Amped Up yet.",
    doIt: "Amped Up is phenomenal, and you'll enjoy it far more with four Barre 57 classes behind you. Let's book those, and I'll hold you a spot in week three.",
    why: "The order protects the member. Skipping it is the commonest reason somebody stops coming in month one.",
  },
];

function Transformation({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <div className="space-y-2">
        <span className="font-display text-6xl font-light text-coral-500">{String(n).padStart(2, "0")}</span>
        <div className="font-display text-3xl font-medium uppercase tracking-tight">{title}</div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function Module6({ section }: { section: Section }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title="Explain without information-dumping" subtitle="Three transformations: how we talk about policies, class formats and recommendations." />

      <Transformation n={1} title="Policies">
        <DoDont dont="Our policy states…" doIt="One important thing to remember when you're booking…" />
        <div className="space-y-3">
          {policyLines.map((p) => (
            <Card key={p.rule} tone="light" className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-display text-xl font-medium tracking-tight">{p.rule}</p>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400">Same rule, two deliveries</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-coral-500/25 bg-coral-500/[0.06] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral-700">Robotic</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">“{p.dont}”</p>
                </div>
                <div className="rounded-2xl border border-sage-500/30 bg-sage-200/30 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-sage-700">Human</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-800">“{p.doIt}”</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-ink-500">
                <span className="font-bold uppercase tracking-[0.14em] text-[10px] text-ink-400">The reason · </span>
                {p.why}
              </p>
            </Card>
          ))}
        </div>
        <p className="text-[15px] leading-relaxed text-ink-600">
          Every one of these is in the <span className="font-semibold">Policies &amp; Facts Pack</span> in the toolkit,
          along with refunds, transfers, what runs at which studio, and the claims we are allowed to make.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink-600 mr-1">Policies should sound</span>
          <Chip tone="sage">Clear</Chip>
          <Chip tone="sage">Confident</Chip>
          <span className="text-sm font-semibold text-ink-600 mx-1">— not</span>
          <Chip tone="coral" className="line-through">
            Apologetic
          </Chip>
          <Chip tone="coral" className="line-through">
            Threatening
          </Chip>
        </div>
      </Transformation>

      <Transformation n={2} title="Class formats">
        <div className="grid gap-3 md:grid-cols-2">
          <Card tone="cream">
            <Eyebrow tone="coral">Don't</Eyebrow>
            <p className="mt-2 font-display text-xl font-light">Explain every feature.</p>
          </Card>
          <Card tone="dark">
            <Eyebrow tone="light">Do</Eyebrow>
            <p className="mt-2 font-display text-xl font-light">
              Explain the <span className="font-semibold text-coral-400">difference the client can understand.</span>
            </p>
          </Card>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {formats.map((f) => (
            <div key={f.name} className="rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
              <div className="font-display text-2xl font-medium tracking-tight">{f.name}</div>
              <div className="my-3 h-px w-10 bg-coral-500" />
              <p className="text-[15px] leading-snug text-ink-700">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] md:items-center">
          <Quote tone="good" who="Then" size="lg">
            Based on everything you've told me, which of those sounds most interesting to you?
          </Quote>
          <p className="font-display text-2xl md:text-3xl font-light tracking-tight">
            Now <span className="font-semibold text-coral-600">they're participating.</span>
          </p>
        </div>
      </Transformation>

      <Transformation n={3} title="Recommendations">
        <div className="grid gap-4 md:grid-cols-3">
          <Quote tone="bad" who="Avoid">
            You should definitely…
          </Quote>
          <Quote tone="good" who="Prefer">
            Based on what you've told me…
          </Quote>
          <Quote tone="good" who="Or">
            I think you may enjoy…
          </Quote>
        </div>
        <Statement size="md" kicker="Why">
          The client retains agency.
        </Statement>
      </Transformation>
    </div>
  );
}
