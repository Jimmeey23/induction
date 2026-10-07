import { useState } from "react";
import { ArrowRight, ShieldAlert, User, Target, Compass, Heart, Stethoscope, Activity, Footprints, Cake, Users } from "lucide-react";
import type { Section } from "../data";
import { QuestionInferenceGuide, type QuestionInference } from "./QuestionInferenceGuide";
import { cn } from "../utils/cn";
import { ModuleHeader, Statement, Card, Eyebrow, Display, Quote, Block, Lede, Chip } from "./ui";

const crmFields = [
  { k: "Client", v: "Brooke", hot: false },
  { k: "Status", v: "New client · 0 visits", hot: true },
  { k: "Gender", v: "Female", hot: true },
  { k: "Fitness goal", v: "Get fit for July 2026 wedding", hot: true },
  { k: "Health notes", v: "Asthma. Tries to limit intense cardio.", hot: true, sensitive: true },
  { k: "Birthday", v: "14 October", hot: false },
  { k: "Shoe size", v: "38", hot: false },
  { k: "Formats attended", v: "—", hot: false },
];

const brookeGuidance: QuestionInference[] = [
  { evidence: "Goal on file: Get fit for July 2026 wedding.", inference: "An occasion may have motivated the goal, but the outcome Brooke values is not established by the record.", ask: "What would meaningful progress look like for you personally?", follow: "What would that change in how you feel or what you can do?" },
  { evidence: "The recorded goal includes a July 2026 wedding date.", inference: "A dated goal can become stale. Confirm whether the occasion and timeline are still relevant before using them in a recommendation.", ask: "How has your goal changed since this was added to your profile?", follow: "What are you working towards now, and is there a timeline that matters to you?" },
  { evidence: "Newcomer to the Method · 0 recorded visits · no formats attended.", inference: "Brooke may benefit from orientation and format guidance. Zero visits does not establish her fitness level or whether she feels nervous.", ask: "What would you like to know before your first Studio Session?", follow: "What kinds of practice have you enjoyed before?" },
  { evidence: "Sensitive health note on file; recorded preference to limit intense cardio.", inference: "A private Instructor conversation may be helpful. The note does not establish which session or intensity is appropriate.", ask: "Is there anything you would like to discuss privately with your Instructor before the session?", follow: "Would you prefer to speak with them directly?" },
  { evidence: "No Signature Experience preferences are confirmed in the record.", inference: "There is not enough information to choose a format for Brooke. Explore her interests before explaining relevant options.", ask: "What makes a Studio Session enjoyable and worthwhile for you?", follow: "What would you prefer more or less of in your practice?" },
];

const rule = [
  { k: "See", q: "What does the CRM tell me?" },
  { k: "Infer", q: "What might be worth exploring?", not: "Not: what assumption can I make?" },
  { k: "Ask", q: "What question would give me useful context?" },
  { k: "Listen", q: "What is the client actually telling me?" },
  { k: "Connect", q: "What part of Physique 57 becomes relevant?" },
  { k: "Act", q: "Recommend, assist, follow up or record useful information." },
];

const scan = [
  { l: "G", name: "Goal", q: "Why are they here?", items: ["Wedding?", "Strength?", "General fitness?", "Return to exercise?", "Body composition?", "Stamina?"], Icon: Target },
  { l: "C", name: "Context", q: "What's going on around the goal?", items: ["Wedding date", "Travel", "Work routine", "Previous exercise", "Life event"], Icon: Compass },
  { l: "P", name: "Preferences", q: "What might help us understand what they'll enjoy?", items: ["Strength vs cardio", "Formats tried", "Timing preference", "Workout history"], Icon: Heart },
  { l: "C", name: "Considerations", q: "Anything relevant we should appropriately know before guiding them?", items: ["Medical disclosure", "Pregnancy / postnatal information", "Injury information"], Icon: Stethoscope },
  { l: "B", name: "Behaviour", q: "What have they actually done?", items: ["Bookings", "Visits", "No-shows", "Formats attended", "Frequency", "Package usage"], Icon: Activity },
];

export function Module4({ section, go }: { section: Section; go?: (id: string) => void }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader section={section} title={<>CRM <span className="text-coral-500">→</span> Conversation Intelligence</>} subtitle="Turning what's on the screen into what's worth asking." />

      <Statement kicker="What this module is about" size="lg">
        The biggest difference between <span className="text-cream-400">average</span> client servicing and <span className="text-coral-400">excellent</span> client servicing.
      </Statement>

      {/* Brooke profile exercise */}
      <Block>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* CRM card */}
          <div className="overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-cream-200 bg-cream-100 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-coral-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-sage-500" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-500">CRM · Client profile</span>
            </div>
            <div className="p-6 md:p-7">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-cream-50">
                  <User className="h-7 w-7" />
                </span>
                <div>
                  <div className="font-display text-3xl font-medium tracking-tight">Brooke</div>
                  <div className="text-sm text-ink-500">Joined this week · First visit today</div>
                </div>
              </div>
              <dl className="mt-6 divide-y divide-cream-200">
                {crmFields.map((f) => (
                  <div
                    key={f.k}
                    className={cn(
                      "grid grid-cols-[130px_1fr] gap-3 py-3 transition-colors rounded-lg",
                      stage >= 1 && f.hot && "bg-coral-500/5 -mx-3 px-3",
                      stage >= 1 && !f.hot && "opacity-50"
                    )}
                  >
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500 pt-0.5">{f.k}</dt>
                    <dd className="text-[15px] font-medium text-ink-900 flex items-center gap-2">
                      {f.v}
                      {f.sensitive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gold-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-700">
                          <ShieldAlert className="h-3 w-3" /> Sensitive
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Exercise panel */}
          <div className="flex flex-col gap-4">
            <div className={cn("flex-1 rounded-3xl p-7 md:p-8 transition-colors", stage === 2 ? "grain relative overflow-hidden bg-ink-950 text-cream-50" : "bg-cream-200/70 border border-cream-300")}>
              {stage === 2 && <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral-500/30 blur-3xl" />}
              <div className="relative space-y-6">
                {stage < 2 ? (
                  <>
                    <Eyebrow tone="coral">First question</Eyebrow>
                    <p className="font-display text-3xl md:text-4xl font-light italic tracking-tight">“What do you know?”</p>
                    {stage === 1 && (
                      <div className="animate-fade-up flex flex-wrap gap-2">
                        {["Wedding", "Asthma", "Doesn't like intense cardio", "New client", "Female", "etc."].map((t) => (
                          <Chip key={t} tone="dark" className="text-sm px-3.5 py-1.5">
                            {t}
                          </Chip>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {stage === 0 && (
                        <button type="button" onClick={() => setStage(1)} className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-cream-50 hover:bg-ink-700 transition-colors">
                          Show what we usually hear
                        </button>
                      )}
                      {stage === 1 && (
                        <button type="button" onClick={() => setStage(2)} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-coral-600 transition-colors">
                          Now change the question <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Eyebrow tone="light">The breakthrough question</Eyebrow>
                    <p className="font-display text-3xl md:text-4xl lg:text-5xl font-light italic tracking-tight leading-[1.05] animate-fade-up">
                      “What would you <span className="not-italic font-semibold text-coral-400">ASK</span> because you know these things?”
                    </p>
                    <p className="text-cream-300">Knowing is the start. Asking is the skill.</p>
                    <button type="button" onClick={() => setStage(0)} className="text-xs font-bold uppercase tracking-[0.18em] text-cream-400 hover:text-cream-50 transition-colors">
                      ↺ Reset
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <QuestionInferenceGuide label="Brooke · Ideal questions & tentative inferences" items={brookeGuidance} />
        {go && (
          <button type="button" onClick={() => go("members")} className="group flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-900/10 bg-white px-6 py-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-ink-900/30">
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-coral-600">Go further</span>
              <span className="block font-display text-xl font-medium tracking-tight">Run the same exercise on real member records from the CRM sheet</span>
            </span>
            <ArrowRight className="h-5 w-5 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-coral-500" />
          </button>
        )}
      </Block>

      {/* The CRM rule */}
      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">The CRM rule</Eyebrow>
          <Display size="md">Six verbs. Keep them visible.</Display>
        </div>
        <div className="grain relative overflow-hidden rounded-3xl bg-ink-950 p-6 md:p-10 text-cream-50">
          <div className="pointer-events-none absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-coral-500/25 blur-3xl" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-tight">
              {rule.map((r, i) => (
                <span key={r.k} className="flex items-center gap-3">
                  <span className="uppercase">{r.k}</span>
                  {i < rule.length - 1 && <span className="text-coral-500">→</span>}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rule.map((r, i) => (
                <div key={r.k} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-coral-500 font-display text-sm text-white">{i + 1}</span>
                    <span className="font-display text-xl uppercase tracking-tight">{r.k}</span>
                  </div>
                  <p className="mt-3 text-cream-200">{r.q}</p>
                  {r.not && <p className="mt-2 text-sm font-semibold text-coral-300">{r.not}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Block>

      {/* Brooke example 1 */}
      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Brooke · Field one</Eyebrow>
          <Display size="md">
            Fitness goal: <span className="italic font-light">Get fit for July 2026 wedding.</span>
          </Display>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Quote tone="bad" who="Average associate">
            I see you're getting married in July!
          </Quote>
          <Quote tone="good" who="Better associate">
            Congratulations! When you say you want to get fit for the wedding, what would you personally love to feel or achieve by then?
          </Quote>
        </div>
        <Quote tone="client" who="Brooke" size="lg">
          I want to feel stronger and I'd really like to work on my arms and core.
        </Quote>
        <Card tone="dark" className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow tone="light">Now you've discovered</Eyebrow>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-display text-2xl md:text-3xl tracking-tight">
              {["Wedding", "confidence", "strength", "arms / core"].map((w, i) => (
                <span key={w} className="flex items-center gap-3">
                  <span className={i === 3 ? "text-coral-400 font-semibold" : ""}>{w}</span>
                  {i < 3 && <ArrowRight className="h-5 w-5 text-coral-500" />}
                </span>
              ))}
            </div>
          </div>
          <p className="font-display text-xl md:text-2xl italic font-light text-cream-300 md:max-w-xs md:text-right">
            <span className="not-italic font-semibold text-cream-50">That</span> is usable CRM intelligence.
          </p>
        </Card>
      </Block>

      {/* Brooke example 2 */}
      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Brooke · Field two</Eyebrow>
          <Display size="md">
            Health notes: <span className="italic font-light">Asthma. Tries to limit intense cardio.</span>
          </Display>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Quote tone="bad" who="Poor conversation">
            So you can't do cardio?
          </Quote>
          <Quote tone="good" who="Better">
            I noticed you mentioned that you generally prefer limiting very intense cardio. What kinds of workouts have felt best for you in the past?
          </Quote>
        </div>
        <Quote tone="client" who="Brooke" size="lg">
          Strength is completely fine. I just hate feeling breathless throughout a workout.
        </Quote>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card tone="cream">
            <Eyebrow>Now we know much more</Eyebrow>
            <p className="mt-3 text-ink-800 leading-relaxed">
              The associate can explain <strong>Strength Lab, Barre, FIT and PowerCycle</strong> with context rather than assumptions.
            </p>
          </Card>
          <div className="rounded-2xl border-2 border-gold-500/60 bg-gold-200/40 p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-700">
              <ShieldAlert className="h-4 w-4 text-gold-500" /> Handle with care
            </div>
            <p className="mt-3 text-ink-800 leading-relaxed">
              Health disclosures are handled <strong>discreetly</strong>. We never diagnose, prescribe exercise intensity, or tell someone a class is medically safe for them.
            </p>
          </div>
        </div>
      </Block>

      {/* Five things */}
      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">The five things to look for in the CRM</Eyebrow>
          <Display size="md">Don't scan thirty fields at random. Scan for five.</Display>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {scan.map((s) => (
            <div key={s.name} className="group flex flex-col rounded-3xl border border-cream-200 bg-white p-6 shadow-soft transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-light text-coral-500">{s.l}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-ink-700 group-hover:bg-ink-900 group-hover:text-cream-50 transition-colors">
                  <s.Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-3 font-display text-2xl font-medium uppercase tracking-tight">{s.name}</div>
              <p className="mt-1 text-sm font-semibold text-ink-700">{s.q}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-600 border-t border-cream-200 pt-4">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-ink-400" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      {/* Not every field */}
      <Block>
        <Statement kicker="Remember" size="lg">
          Not every CRM field deserves a conversation.
        </Statement>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { Icon: Footprints, k: "Shoe size", v: "Operationally useful. Not a conversation." },
            { Icon: Users, k: "Gender", v: "Usually isn't a conversation." },
            { Icon: Cake, k: "Birthday", v: "Might be useful later." },
          ].map(({ Icon, k, v }) => (
            <div key={k} className="flex items-start gap-4 rounded-2xl border border-cream-300 bg-cream-200/60 p-5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">{k}</div>
                <div className="text-sm text-ink-600">{v}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <Lede>
            Personalisation isn't proving to the client that you've read their profile.
          </Lede>
          <p className="font-display text-3xl md:text-4xl font-light tracking-tight">
            It's knowing <span className="font-semibold text-coral-600">which information matters right now.</span>
          </p>
        </div>
      </Block>
    </div>
  );
}
