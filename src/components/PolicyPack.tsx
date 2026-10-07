import type { Section } from "../data";
import { ModuleHeader, Block, Card, Eyebrow, Display, Lede, Statement, Chip } from "./ui";

/**
 * The facts a member actually asks about during an induction — drawn from the
 * Brand & Operations Manual (3rd edition, October 2026). Quote these as written;
 * anything not here goes to the Team Leader rather than a guess.
 */

const firstVisit: [string, string][] = [
  ["Arrive early", "Fifteen minutes before a first Studio Session. New powerCycle riders: ten minutes, non-negotiable — waiver, shoe size, bike fit and console baseline."],
  ["Grip socks", "Mandatory for every class. Available at the boutique — offer them before the session, not after."],
  ["Waiver", "Signed before entering any class. No waiver, no class. The desk verifies every NEW tag."],
  ["First experience", "Mumbai: a complimentary Barre 57 introductory experience. Bengaluru: first class at 50% off — no free trials. Strength Lab and powerCycle: Newcomers 2-for-1 only, never free. Pop-ups: no trials at all."],
];

const doors: [string, string, string][] = [
  ["Barre & Strength Lab", "Doors lock at +10 minutes", "No override, by anyone, under any circumstance."],
  ["powerCycle", "Doors lock at +5 minutes", "The warm-up begins at exactly +5. Late riders are moved to another class within 24 hours."],
  ["Virtual sessions", "15-minute cutoff", "Same discipline online as in the room."],
];

const booking: [string, string][] = [
  ["Cancellation — classes", "At least 12 hours before start, both cities, Strength Lab included. Late cancels and no-shows forfeit the credit."],
  ["Cancellation — privates & virtual", "24 hours, in writing. Late cancels are charged in full. The policy is stated at the sale, not at the dispute."],
  ["Late-cancel penalty (Unlimited)", "Two late cancels a week are tolerated. The third suspends pre-booking for seven days and cancels future bookings — walk-ins still welcome."],
  ["Waitlist", "Filled in strict order. A notified member confirms within the stated window or the place passes on."],
];

const money: [string, string][] = [
  ["Freeze", "Requested in writing to the city email at least 48 hours before the freeze starts. Team Leader approves; validity extends one-for-one; no fee. Grounds: travel, illness, personal commitments. Retrospective freezes are not granted."],
  ["Freeze entitlements", "8 & 12-class packs: 1 × up to 30 days. 1-month: 1 ×. 3-month: 3 ×. 6-month: 6 ×. Annual: 12 × — each up to 30 days."],
  ["Rollover", "Once per member, one week, on management approval. Goodwill, never promised at the point of sale."],
  ["Transfer & sharing", "Memberships and packs are non-transferable and non-sharable. Guests come in through guest passes and introductory products only."],
  ["Refunds", "Strictly non-refundable — every product. Timely cancellations return credit to the account. Cash or card refunds only with written Finance and COO approval."],
  ["Prices", "Quote only from the live rate card. If a member quotes a different figure, never match it on the spot — confirm and come back, escalating to the Team Leader."],
];

const ladder: [string, string][] = [
  ["Barre 57 first", "Everyone starts here. No exceptions."],
  ["Four before extensions", "Four Barre 57 classes before Cardio Barre, Cardio Barre Plus, Amped Up, Back Body Blaze or Mat 57."],
  ["Strength Lab entry", "The four-Barre base, plus screening and waiver, plus the beginners onboarding walkthrough — experienced lifters complete it too. FIT accelerates readiness; it is not the ticket."],
  ["Recovery alongside", "Stacked onto intensity days — complimentary when stacked. It is what makes four sessions a week sustainable."],
];

const labLaw = [
  "Waiver signed before entry; new Lab members arrive ten minutes early, every time.",
  "No pay-later bookings — Lab places are secured by payment.",
  "Re-rack every weight, every block, every class.",
  "Late entry only to +10; doors lock with no override.",
  "Cancel 12 hours ahead — 24 hours for Lab privates.",
  "No free trials on the Lab concept.",
];

const whereWhat: [string, string][] = [
  ["Kemps Corner (flagship)", "Everything: Barre 57 and all extensions, themed classes, FIT, HIIT, Recovery, powerCycle, Strength Lab, privates, full boutique."],
  ["Supreme HQ, Bandra", "Barre and extensions, FIT, HIIT, Recovery, powerCycle, privates — and Strength Lab from 1 October 2026."],
  ["Kenkere House, Bengaluru", "Barre and extensions, FIT, HIIT, Back Body Blaze, Mat 57, Recovery (30 minutes), privates. No powerCycle, no Strength Lab — offer FIT, HIIT and BBB as the strength path."],
  ["Pop-ups", "Copper + Cloves, Indiranagar (Mat 57) and Plash Pilates, Sadashivanagar (Barre 57). Selected formats, no trials."],
];

const formatMenu: [string, string, string][] = [
  ["Barre 57", "57 min · all levels", "The signature full-body hour — arms, thighs, seat, core — each group taken to fatigue, then stretched."],
  ["Cardio Barre / Plus", "57 min · intermediate+", "The same sculpting arc with the heart rate turned up. Plus runs longer peaks and shorter recoveries."],
  ["Amped Up", "57 min · advanced", "The hardest barre in the building. Maximum overload, minimal mercy."],
  ["Back, Body, Blaze", "57 min · intermediate", "Biased to the back of the body — the posture prescription for desk damage."],
  ["Mat 57", "57 min · all levels", "Pilates-style sculpting on the floor. Deep core, knee-friendly, no barre needed."],
  ["FIT", "50–55 min · intermediate", "Strength-based intervals on functional patterns — squat, hinge, push, pull, carry, rotate."],
  ["HIIT", "45 min · intermediate+", "The engine room. Maximum burn in minimum time; the format that protects a busy week."],
  ["Strength Lab", "57 + 3 min · screened", "True hypertrophy work at 60–80% of a one-rep max, in quarterly templates, coached in detail."],
  ["powerCycle", "30 / 45 min · tiered", "Rhythm cycling on Stages SC3 power-meter bikes, with watts and kilometres tracked."],
  ["Recovery", "30–45 min · all levels", "Guided restoration — assisted stretching, symmetry, breath. Complimentary when stacked."],
];

const wordSwap: [string, string][] = [
  ["buy", "invest"],
  ["cost / price", "investment / rates"],
  ["cheap", "great value"],
  ["deal / discount", "preferred rate"],
  ["trial class", "introductory experience"],
  ["sign up / sign here", "join the community / confirm"],
  ["contract", "membership agreement"],
  ["monthly payments", "monthly investment"],
  ["if you join…", "when you join…"],
  ["selling", "guiding"],
];

const neverSay = [
  "“Spinning” or “Spin class” — a third-party trademark. Say indoor cycling, rhythm cycling, or powerCycle.",
  "“Ballet class” or “dance workout” — it is barre-based fitness; no dance experience is used or needed.",
  "“Low-intensity” or “easy” — it is low-impact. The muscular fatigue is absolute.",
  "Guaranteed kilograms or inches for an individual. Studies are cited; outcomes are never promised.",
  "“Policy says no” or “we can’t” — lead with what we can do.",
  "Internal jargon — retention, conversion, lead — in front of a member.",
];

const claims: [string, string][] = [
  ["The result claim", "“Over 80% of our members see visible results in as few as 8 classes,” across 7,000+ member journeys. Word it exactly like that."],
  ["The frequency standard", "Four sessions a week to see real change. One a week maintains, two to three progress slowly, four transform."],
  ["The study", "“In an Adelphi University lab study, clients training four times a week lost up to 13 inches in a month.” Never promise inches to an individual."],
  ["The honest caveat", "Results vary with attendance, nutrition, sleep and starting point. Say it in every results conversation."],
];

const medical = [
  "Disclosures are captured at the waiver and consultation, then tagged — injuries, pre- and post-natal status, goals.",
  "Physician clearance on file for pregnancy, postpartum, post-surgical, and cardiac or respiratory conditions.",
  "The desk briefs the Instructor verbally before every session containing a flagged member. Tags are read, never assumed remembered.",
  "Modifications are offered proactively to the whole room, so a flagged member is never singled out.",
  "We never diagnose, interpret scans, or promise rehabilitation. “That sounds worth showing your physiotherapist — here’s how we’ll train around it until then.”",
  "Health information is seen by the assigned Instructor and Team Leader only. Never in a group thread.",
];

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid gap-1 border-b border-cream-200 py-4 last:border-0 md:grid-cols-[200px_1fr] md:gap-6">
      <div className="font-display text-lg font-medium tracking-tight">{k}</div>
      <p className="text-[15px] leading-relaxed text-ink-700">{v}</p>
    </div>
  );
}

export function PolicyPack({ section }: { section: Section }) {
  return (
    <div className="space-y-14 md:space-y-20">
      <ModuleHeader
        section={section}
        title="Policies & facts worth knowing"
        subtitle="The questions members actually ask in an induction — answered the way the manual answers them."
      />

      <Block>
        <Lede className="max-w-3xl">
          You are not expected to recite this. You are expected to know where the line is, so the conversation stays warm
          and accurate at the same time. Anything not on this page goes to your Team Leader rather than a guess —
          a wrong number said confidently becomes the member’s truth.
        </Lede>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">First visit</Eyebrow>
          <Display size="md">What a newcomer needs before they walk in.</Display>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {firstVisit.map(([k, v]) => (
            <Card key={k} tone="light" className="space-y-2">
              <p className="font-display text-xl font-medium tracking-tight">{k}</p>
              <p className="text-[15px] leading-relaxed text-ink-600">{v}</p>
            </Card>
          ))}
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">The doors</Eyebrow>
          <Display size="md">The rule that is never bent — and why.</Display>
          <Lede>
            A late entry costs the member a safe set-up and costs the room its focus. Said once, warmly, at the induction,
            it is never a surprise later.
          </Lede>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {doors.map(([k, rule, note]) => (
            <Card key={k} tone="dark" className="space-y-2">
              <Eyebrow tone="light">{k}</Eyebrow>
              <p className="font-display text-2xl font-light tracking-tight text-coral-400">{rule}</p>
              <p className="text-sm leading-relaxed text-cream-300">{note}</p>
            </Card>
          ))}
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Booking & cancellation</Eyebrow>
          <Display size="md">Stated as care, not as a threat.</Display>
        </div>
        <Card tone="light" className="py-2">
          {booking.map(([k, v]) => <Row key={k} k={k} v={v} />)}
        </Card>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Freeze, rollover & money</Eyebrow>
          <Display size="md">What we can do, and who decides.</Display>
        </div>
        <Card tone="light" className="py-2">
          {money.map(([k, v]) => <Row key={k} k={k} v={v} />)}
        </Card>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">The level ladder</Eyebrow>
          <Display size="md">The order exists to protect the member.</Display>
          <Lede>
            Short-circuiting the ladder is the commonest cause of first-month dropout. Intervene with warmth and
            a booking, never a refusal: “You’ll love Amped Up more with four Barre classes behind you — let’s book those,
            and I’ll hold you a spot in week three.”
          </Lede>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {ladder.map(([k, v], i) => (
            <Card key={k} tone="cream" className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 font-display text-sm text-cream-50">{i + 1}</span>
                <p className="font-display text-xl font-medium tracking-tight">{k}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-700">{v}</p>
            </Card>
          ))}
        </div>
        <Card tone="light" className="space-y-3">
          <Eyebrow tone="coral">Strength Lab — the six rules</Eyebrow>
          <ul className="grid gap-2 md:grid-cols-2">
            {labLaw.map((l) => (
              <li key={l} className="flex items-start gap-3 text-[15px] leading-snug text-ink-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">What runs where</Eyebrow>
          <Display size="md">Never promise a format a studio does not run.</Display>
        </div>
        <Card tone="light" className="py-2">
          {whereWhat.map(([k, v]) => <Row key={k} k={k} v={v} />)}
        </Card>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">The format menu</Eyebrow>
          <Display size="md">Ten ways to answer “which one is right for me?”</Display>
          <Lede>Describe the difference the member can feel — not every feature of every class.</Lede>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {formatMenu.map(([name, meta, desc]) => (
            <div key={name} className="rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
              <div className="font-display text-2xl font-medium tracking-tight">{name}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-coral-700">{meta}</div>
              <div className="my-3 h-px w-10 bg-coral-500" />
              <p className="text-[15px] leading-snug text-ink-700">{desc}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">What we claim</Eyebrow>
          <Display size="md">Confident about the method. Honest about the member.</Display>
        </div>
        <Card tone="light" className="py-2">
          {claims.map(([k, v]) => <Row key={k} k={k} v={v} />)}
        </Card>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">Health & special populations</Eyebrow>
          <Display size="md">Suitable is not the same as casual.</Display>
        </div>
        <Card tone="dark" className="space-y-3">
          <ul className="space-y-3">
            {medical.map((m) => (
              <li key={m} className="flex items-start gap-3 text-[15px] leading-relaxed text-cream-200">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Block>

      <Block>
        <div className="space-y-3">
          <Eyebrow tone="coral">The words</Eyebrow>
          <Display size="md">The same facts, in the house language.</Display>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
          <Card tone="light" className="space-y-3">
            <Eyebrow>Swap these</Eyebrow>
            <ul className="divide-y divide-cream-200">
              {wordSwap.map(([no, yes]) => (
                <li key={no} className="flex items-center justify-between gap-4 py-2.5">
                  <span className="text-[15px] text-ink-400 line-through">{no}</span>
                  <span className="font-display text-lg font-medium tracking-tight text-coral-700">{yes}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card tone="cream" className="space-y-3">
            <Eyebrow tone="coral">Never say</Eyebrow>
            <ul className="space-y-3">
              {neverSay.map((n) => (
                <li key={n} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip tone="sage">Clear</Chip>
          <Chip tone="sage">Confident</Chip>
          <Chip tone="sage">Reason attached</Chip>
          <Chip tone="coral">Never apologetic</Chip>
          <Chip tone="coral">Never threatening</Chip>
        </div>
      </Block>

      <Statement kicker="The rule behind every line on this page" size="lg">
        State it once, warmly, with the reason attached — then move to what we <span className="italic">can</span> do.
      </Statement>
    </div>
  );
}
