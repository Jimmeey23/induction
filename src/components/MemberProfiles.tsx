import { useEffect, useMemo, useState } from "react";
import { Shuffle, ArrowRight, Lightbulb, MessageCircle, Check, ChevronDown } from "lucide-react";
import type { Section } from "../data";
import { useMembers } from "../lib/useMembers";
import type { Member } from "../lib/members";
import { buildTruths, suggestPersona } from "../lib/scenarios";
import { cn } from "../utils/cn";
import { ModuleHeader, Eyebrow } from "./ui";
import { MemberCard, DataSourcePanel } from "./studio/MemberCard";

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

function ProfileRound({ member, onNext, canNext }: { member: Member; onNext: () => void; canNext: boolean }) {
  const [questions, setQuestions] = useState(["", "", ""]);
  const [inference, setInference] = useState("");
  const [evidence, setEvidence] = useState("");
  const [verify, setVerify] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [checks, setChecks] = useState<string[]>([]);
  const asks = useMemo(() => buildTruths(member, suggestPersona(member)), [member]);
  const ready = questions[0].trim() && questions[1].trim() && inference.trim() && evidence.trim() && verify.trim();
  const edit = () => { setReviewed(false); setChecks([]); };
  const inputClass = "mt-2 w-full rounded-xl border border-cream-300 bg-cream-50 px-3.5 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-500 focus:border-coral-600";
  const reviewChecks = ["My questions invite an explanation, rather than yes/no answers.", "Each question connects to a detail in this profile.", "My inference is tentative and supported by recorded evidence.", "I can check my inference without leading the member.", "I will capture the member’s own words and agree a next step."];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-2xl border border-cream-300 bg-white p-4 sm:grid-cols-3">
        {["Read the random profile", "Questions & inferences", "Review & next member"].map((label, index) => <div key={label} className="flex items-center gap-3"><span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold", index < 2 || reviewed ? "bg-ink-900 text-white" : "bg-cream-200 text-ink-500")}>{reviewed && index < 2 ? <Check className="h-4 w-4" /> : `0${index + 1}`}</span><span className="text-xs font-semibold text-ink-600">{label}</span></div>)}
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-3"><Eyebrow tone="coral">Your randomly selected member</Eyebrow><span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold">{member.sample ? "Sample profile" : "Connected record"}</span></div>
          <MemberCard member={member} title="Community member · Profile" className="profile-record" />
          <p className="px-1 text-xs leading-relaxed text-ink-500">The record is a starting point. Missing details and attendance patterns do not establish a member’s motivation or feelings.</p>
        </div>
        <div className="min-w-0 space-y-5">
          <form onSubmit={(event) => { event.preventDefault(); if (ready) setReviewed(true); }} className="rounded-3xl border border-cream-300 bg-white p-5 shadow-soft md:p-6">
            <Eyebrow tone="coral">Your conversation plan</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-medium">What would you ask — and why?</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">Study the profile, then write the questions you would actually ask this community member. Explain your inference and how you would check it.</p>
            <fieldset className="mt-6 space-y-4">
              <legend className="text-xs font-bold uppercase tracking-wider text-ink-500">01 · Your best questions</legend>
              {questions.map((question, index) => <label key={index} className="block text-sm font-semibold">Question {index + 1}{index === 2 ? " · Optional follow-up" : " · Required"}<input required={index < 2} value={question} onChange={(event) => { edit(); setQuestions((previous) => previous.map((value, i) => i === index ? event.target.value : value)); }} placeholder={index === 0 ? "Your opening question…" : index === 1 ? "Go deeper on a relevant profile detail…" : "A follow-up you would ask after listening…"} className={inputClass} /></label>)}
            </fieldset>
            <fieldset className="mt-6 space-y-4">
              <legend className="text-xs font-bold uppercase tracking-wider text-ink-500">02 · Your inference</legend>
              <label className="block text-sm font-semibold">What might this information suggest? · Required<textarea required rows={3} value={inference} onChange={(event) => { edit(); setInference(event.target.value); }} placeholder="One possibility is… This is an inference, not a confirmed member statement." className={inputClass} /></label>
              <label className="block text-sm font-semibold">Which recorded facts support it? · Required<textarea required rows={2} value={evidence} onChange={(event) => { edit(); setEvidence(event.target.value); }} placeholder="Point to specific information in the profile. If it is sparse, explain what remains unknown." className={inputClass} /></label>
              <label className="block text-sm font-semibold">What would you ask to check your inference? · Required<textarea required rows={2} value={verify} onChange={(event) => { edit(); setVerify(event.target.value); }} placeholder="An open, neutral question that lets the member explain or correct your interpretation…" className={inputClass} /></label>
            </fieldset>
            <details className="mt-5 rounded-xl bg-cream-100 p-4"><summary className="cursor-pointer text-sm font-semibold">Need a hint?</summary><p className="mt-2 text-sm leading-relaxed text-ink-600">Notice one fact. Consider more than one possible explanation. Ask one open question, listen, then follow the member’s words. A missed booking could have several causes; the record alone cannot tell you which applies.</p></details>
            <button type="submit" disabled={!ready || reviewed} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral-600 px-5 py-3 text-sm font-bold text-white hover:bg-coral-700 disabled:cursor-not-allowed disabled:opacity-50">{reviewed ? <><Check className="h-4 w-4" /> Response ready for review</> : <>Review my questions & inference <ArrowRight className="h-4 w-4" /></>}</button>
            <p className="mt-2 text-xs text-ink-500">Practice notes stay in this round. They are not saved to the member’s CRM record.</p>
          </form>
          {reviewed && <section aria-label="Response review" className="space-y-5" aria-live="polite">
            <div className="rounded-3xl border border-sage-200 bg-white p-5 md:p-6"><Eyebrow tone="coral">Reflect on your response</Eyebrow><h2 className="mt-2 font-display text-2xl font-medium">Would these questions open a conversation?</h2><p className="mt-2 text-sm text-ink-600">Use this checklist yourself or discuss it with a facilitator. These tips do not automatically score your answer.</p><div className="mt-4 space-y-3">{reviewChecks.map((item) => <label key={item} className="flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" checked={checks.includes(item)} onChange={(event) => setChecks((previous) => event.target.checked ? [...previous, item] : previous.filter((value) => value !== item))} className="mt-1 h-4 w-4 shrink-0 accent-coral-600" />{item}</label>)}</div></div>
            <div className="rounded-3xl border border-cream-300 bg-white p-5 md:p-6"><Eyebrow>Compare conversation approaches</Eyebrow><p className="mt-2 text-sm text-ink-600">Possible approaches for this profile. These are practice suggestions, not facts about the member.</p><div className="mt-4 grid gap-3">{asks.map((item) => <div key={item.id} className="rounded-xl bg-cream-100 p-4"><span className="text-[10px] font-bold uppercase tracking-wider text-coral-700">{item.tag === "Persona" ? "Explore without assuming" : item.tag} · {tagLetter[item.tag]}</span><p className="mt-1 text-sm leading-relaxed">{item.trigger}</p></div>)}</div></div>
            <QuestionCoach member={member} />
            <div className="flex flex-wrap gap-3"><button type="button" onClick={onNext} disabled={!canNext} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-bold text-white hover:bg-ink-700 disabled:opacity-50"><Shuffle className="h-4 w-4" /> Next random member</button></div>
            <p className="text-xs text-ink-500">The next round clears these practice notes.{!canNext && " Add another member record to practise with a different profile."}</p>
          </section>}
        </div>
      </div>
    </div>
  );
}

export function MemberProfiles({ section }: { section: Section; go?: (id: string) => void }) {
  const { members, usingSamples, status } = useMembers();
  const [id, setId] = useState<string | null>(null);
  // Select only after the source settles so sample data does not replace a live exercise mid-round.
  useEffect(() => {
    if (status === "loading") return;
    setId((previous) => members.some((member) => member.id === previous) ? previous : members[Math.floor(Math.random() * members.length)]?.id ?? null);
  }, [members, status]);
  const member = members.find((item) => item.id === id) ?? null;
  const next = () => {
    if (members.length < 2) return;
    const current = members.findIndex((item) => item.id === id);
    const offset = 1 + Math.floor(Math.random() * (members.length - 1));
    setId(members[(Math.max(0, current) + offset) % members.length].id);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <div className="member-profiles space-y-6">
      <ModuleHeader section={section} title={<>Member <span className="italic font-light">Studio</span></>} subtitle="A random profile. Your best questions. Your evidence-based inference. Practise discovering the person behind the record." />
      <DataSourcePanel />
      {usingSamples && status !== "loading" && <p className="text-xs text-ink-500">This round uses a labelled sample profile because live member records are unavailable.</p>}
      {status === "loading" ? <div role="status" className="rounded-3xl border border-cream-300 bg-white p-8 text-sm text-ink-600">Connecting to the member source and selecting a random profile…</div> : member ? <ProfileRound key={member.id} member={member} onNext={next} canNext={members.length > 1} /> : <p role="status">No member profiles are available. Connect or paste member records above to begin.</p>}
    </div>
  );
}
