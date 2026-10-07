import { useMemo, useState } from "react";
import { Search, Shuffle, ArrowRight, Sparkles, Play, Lightbulb, MessageCircle, Check, ChevronDown } from "lucide-react";
import type { Section } from "../data";
import { useMembers } from "../lib/useMembers";
import type { Member } from "../lib/members";
import { buildTruths, suggestPersona } from "../lib/scenarios";
import { cn } from "../utils/cn";
import { ModuleHeader, Eyebrow, Display, Chip, Reveal } from "./ui";
import { MemberCard, MemberTile, DataSourcePanel } from "./studio/MemberCard";

const tagLetter: Record<string, string> = { Goal: "G", Context: "C", Preference: "P", Consideration: "C", Behaviour: "B", Persona: "?" };

const questionLessons = [
  { title: "Discover motivation", cue: "A goal is a starting point, not the whole story.", avoid: "You want to lose weight, right?", ask: "What would meaningful progress look like for you?", follow: "What would that change in your everyday life?", tip: "Use the member’s words in your next question. Let them define transformation." },
  { title: "Understand barriers", cue: "Attendance tells you what happened, not why.", avoid: "Why do you keep missing sessions?", ask: "What has made getting to your Studio Sessions difficult?", follow: "What support would make your next visit easier?", tip: "Keep your tone curious. Explore the obstacle before offering a solution." },
  { title: "Explore preferences", cue: "A preference can reflect convenience, confidence or comfort.", avoid: "You prefer mornings, so shall I book you in?", ask: "What makes a Studio Session fit well into your week?", follow: "Which days feel realistic for you right now?", tip: "Confirm that the record is still current. Offer choices after you understand the need." },
  { title: "Build confidence", cue: "Make room for concerns without assuming someone is nervous.", avoid: "You’re nervous about your first session, aren’t you?", ask: "What would you like to know before your next Studio Session?", follow: "What would help you feel more comfortable getting started?", tip: "Ask one question, then pause. A short answer is an invitation to slow down." },
  { title: "Handle sensitive topics", cue: "Ask permission and offer a private conversation.", avoid: "I see your health condition on the record. Tell me about it.", ask: "Is there anything you’d like to discuss privately with your Instructor before the session?", follow: "Would you prefer to speak with them directly?", tip: "Respect a declined answer. Connect the member with an Instructor; do not diagnose or promise a session is safe." },
];

function QuestionCoach({ member }: { member: Member | null }) {
  const [lesson, setLesson] = useState(0);
  const current = questionLessons[lesson];
  const hint = member?.medical
    ? "A sensitive note is on file. Offer a private Instructor conversation without reading the note aloud."
    : member && (member.noShows > 0 || member.lateCancels > 0)
      ? "Missed bookings are on the record. Ask what got in the way before discussing the booking process."
      : member?.goal
        ? "A goal is on the record. Ask what it means to this member today; avoid assuming the reason behind it."
        : "Start with what brought the member to the Method. A sparse record is a reason to listen, not fill in the gaps.";
  return (
    <section className="overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-soft" aria-label="Question coach">
      <div className="flex items-start gap-3 border-b border-cream-200 p-5 md:p-6">
        <span className="rounded-xl bg-coral-500/10 p-2.5 text-coral-700"><Lightbulb className="h-5 w-5" /></span>
        <div><Eyebrow tone="coral">The art of asking</Eyebrow><h2 className="mt-1 font-display text-2xl font-medium">Be curious. Make it personal.</h2><p className="mt-1 text-sm text-ink-500">One open question → one thoughtful follow-up → confirm what you heard.</p></div>
      </div>
      <div className="p-5 md:p-6">
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Choose a questioning skill">
          {questionLessons.map((item, index) => <button key={item.title} type="button" aria-pressed={lesson === index} onClick={() => setLesson(index)} className={cn("shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-600", lesson === index ? "border-ink-900 bg-ink-900 text-white" : "border-cream-300 text-ink-600 hover:bg-cream-100")}>{item.title}</button>)}
        </div>
        <p className="mb-4 text-sm text-ink-600">{current.cue}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-cream-100 p-4"><Eyebrow>Rethink this opener</Eyebrow><p className="mt-2 text-sm text-ink-500">“{current.avoid}”</p></div>
          <div className="rounded-2xl border border-sage-200 bg-sage-200/30 p-4"><div className="flex items-center gap-2 text-xs font-bold text-sage-700"><MessageCircle className="h-4 w-4" /> Try asking</div><p className="mt-2 text-base font-medium leading-relaxed">“{current.ask}”</p><p className="mt-3 text-xs font-bold uppercase tracking-wider text-sage-700">Then go deeper</p><p className="mt-1 text-sm">“{current.follow}”</p></div>
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink-600"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-coral-700" />{current.tip}</p>
        <div className="mt-5 border-t border-cream-200 pt-4"><Eyebrow tone="coral">{member ? "Hint for this profile" : "Before you begin"}</Eyebrow><p className="mt-2 text-sm leading-relaxed">{hint}</p></div>
        <details className="group mt-5 rounded-2xl border border-cream-200">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-coral-600">Listen, confirm & capture<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary>
          <div className="space-y-3 px-4 pb-4 text-sm leading-relaxed text-ink-600">
            <p><strong className="text-ink-900">Listen:</strong> Let the answer finish. Ask “Could you tell me a little more about that?” instead of guessing.</p>
            <p><strong className="text-ink-900">Confirm:</strong> “Have I understood correctly that…?” Then ask “What would you like us to do next?”</p>
            <p><strong className="text-ink-900">Capture:</strong> Record “Community member reported…” and their exact words. Separate your objective observations from their stated concern.</p>
            <div className="rounded-xl bg-cream-100 p-3"><span className="text-xs font-bold uppercase tracking-wider text-ink-500">Illustrative CRM note</span><p className="mt-1">Community member reported: “Evening meetings make it difficult to attend.” Member requested morning options and a WhatsApp follow-up. Studio Associate to share availability before the next visit.</p></div>
            <p>Confirm the action owner, follow-up timing and the member’s preferred contact channel. Log only what was actually shared.</p>
          </div>
        </details>
      </div>
    </section>
  );
}

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
    <div className="member-profiles space-y-6">
      <ModuleHeader section={section} title={<>Member <span className="italic font-light">Profiles</span></>} subtitle="Put a real record on screen. Read it closely, then ask: what would you ask because you know these things?" />

      <DataSourcePanel />
      {usingSamples && <p className="text-xs text-ink-500">Sample profiles are shown until the connected sheet contains member rows — the exercise works identically with live data.</p>}

      <div className="grid gap-3 rounded-2xl border border-cream-300 bg-white p-4 sm:grid-cols-3">
        {["Read the profile", "Separate facts from assumptions", "Ask with intention"].map((label, index) => <div key={label} className="flex items-center gap-3"><span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold", member && stage >= index ? "bg-ink-900 text-white" : "bg-cream-200 text-ink-500")}>{member && stage > index ? <Check className="h-4 w-4" /> : `0${index + 1}`}</span><span className="text-xs font-semibold text-ink-600">{label}</span></div>)}
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        {/* Browser */}
        <div className="rounded-3xl border border-cream-300 bg-cream-50 p-4 lg:sticky lg:top-6">
          <div className="mb-4 flex items-center justify-between"><Eyebrow>Studio community</Eyebrow><span className="rounded-full bg-cream-200 px-2.5 py-1 text-xs font-semibold" aria-live="polite">{filtered.length} profiles</span></div>
          <div className="mb-3 flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search community member profiles" placeholder="Name, goal, Studio…" className="w-full rounded-full border border-cream-300 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-ink-900" />
            </div>
            <button type="button" disabled={filtered.length === 0} onClick={() => { const next = filtered[Math.floor(Math.random() * filtered.length)]; if (next) pick(next.id); }} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-cream-50 hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Select a random matching profile">
              <Shuffle className="h-4 w-4" />
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
        <div className="min-w-0 space-y-5">
          {member ? (
            <>
              <div className="grid items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_280px]">
                <MemberCard key={member.id} member={member} highlight={stage >= 1} title="Community member · Profile" className="profile-record" />
                <div className="flex flex-col gap-3">
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
                              Review recorded facts
                            </button>
                          ) : (
                            <button type="button" onClick={() => setStage(2)} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-4 py-2 text-xs font-bold text-white hover:bg-coral-600">
                              Build your questions <ArrowRight className="h-3.5 w-3.5" />
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
                  <Reveal label={`Explore ${asks.length} conversation cues`} hideLabel="Hide the questions" tone="coral">
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
                    <p className="mt-3 text-xs text-ink-500">These are practice cues, not verified member statements. Choose two or three relevant openings and let the member explain in their own words.</p>
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
              <p className="mt-2 max-w-sm text-sm text-ink-500">Select a profile on the left, or use shuffle. Notice the facts, then practise a curious opening question.</p>
            </div>
          )}
          <QuestionCoach key={member?.id ?? "no-member"} member={member} />
        </div>
      </div>
    </div>
  );
}
