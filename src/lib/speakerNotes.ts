/* ------------------------------------------------------------------ */
/* Speaker notes                                                       */
/* Shown on screen (toggle in the header, or press "N") and included   */
/* in the PDF export so the trainer can present from paper.            */
/* ------------------------------------------------------------------ */

export interface SpeakerNote {
  /** What this part of the session is for, in one line. */
  purpose: string;
  /** How to spend the minutes. */
  timing?: string[];
  /** Lines the trainer can say more or less verbatim. */
  say?: string[];
  /** How to run the activity / what to do on screen. */
  run?: string[];
  /** Things that commonly go wrong, and the fix. */
  watch?: string[];
  /** The sentence that hands over to the next section. */
  transition?: string;
}

export const speakerNotes: Record<string, SpeakerNote> = {
  overview: {
    purpose: "Set the contract for the two hours before anyone feels lectured at.",
    timing: ["2 min, before the clock starts. Do not teach anything here."],
    say: [
      "Today is not a policy briefing. It's two hours on one skill: the first seven minutes with a new client.",
      "You'll be on your feet, in pairs, role-playing with real member records. Nothing here is theory.",
      "By the end you'll each leave with one thing you'll do differently in your very next induction.",
    ],
    run: [
      "Read the outcomes list out loud quickly — don't dwell, it's a map not a lesson.",
      "Point at the run of show so the room can see there's a break in the rhythm every ten minutes.",
      "Start the session clock in the header when you move to Module 1.",
    ],
    watch: ["If people arrive with laptops open, ask them to close them — this session is spoken, not read."],
    transition: "Before we talk about how to do an induction, let's agree on why it exists at all.",
  },

  m1: {
    purpose: "Make the room feel the client's confusion so the induction stops being a form-filling task.",
    timing: ["3 min on Question 1", "3 min on Question 2", "4 min on the reframe and the 'sale has happened' point"],
    say: [
      "Think about somebody walking into Physique 57 for their first class. What are all the things they DON'T know that we know?",
      "Keep going — the list is longer than you think.",
      "Now: how does it feel being the only person in the room who doesn't know these things?",
    ],
    run: [
      "Take answers from the floor first. Only reveal the panel once the room has run dry — the reveal should confirm them, not beat them to it.",
      "Write their words on the board if you have one; they'll recognise their own language later.",
      "Land the point slowly: that discomfort is the problem the induction solves.",
    ],
    watch: [
      "Somebody will answer operationally ('they don't know the cancellation window'). Push for the feeling underneath it.",
      "Don't let this become a complaint session about the front desk. Keep it on the client.",
    ],
    transition: "So if that's the problem — what does 'solved' actually look like? Seven minutes from now, what should they feel?",
  },

  m2: {
    purpose: "Replace 'did I cover everything?' with 'how does the client feel?' as the measure of a good induction.",
    timing: ["2 min silent writing (use the on-screen timer)", "4 min gathering answers", "4 min on the principle"],
    say: [
      "Post-it or paper. Two minutes, on your own, no talking: what should a client feel after seven minutes with us?",
      "One word or one line each. Don't write what you'd say — write what they'd feel.",
    ],
    run: [
      "Start the 2-minute countdown on screen and stay quiet for the full two minutes. The silence is the exercise.",
      "Collect every answer around the room before revealing the six feelings. Cluster them out loud as you go.",
      "Then deliver Training Principle № 1: we don't measure an induction by information delivered, we measure it by how the client feels.",
    ],
    watch: [
      "If answers drift into tasks ('they know the lockers'), ask: and what does that make them feel?",
      "Protect the two minutes of silence — people will want to talk to each other. That's the whole point of doing it alone.",
    ],
    transition: "That's the target. Now here's the only framework you have to remember to hit it.",
  },

  m3: {
    purpose: "Teach The First 7 as one conversation in seven moves — and prove it fits in seven minutes.",
    timing: ["6 min teaching the seven moves", "7 min live demonstration", "2 min tally debrief"],
    say: [
      "Seven moves, one conversation. Not a script — an order.",
      "The bar widths on screen are proportional to time. Notice how little of it is you talking about policies.",
      "You already have CRM information. Don't repeat it back to them — use it to ask better questions.",
    ],
    run: [
      "Walk the seven moves once, quickly. Resist explaining each one in depth — Modules 4 to 6 do that.",
      "Then do the live demonstration yourself with a volunteer as the client. Run the on-screen clock so the room sees seven minutes is genuinely enough.",
      "Ask the room to keep a tally while they watch: how many questions did the associate ask vs. how many statements did they make?",
      "Debrief on the tally number, not on style.",
    ],
    watch: [
      "Demonstrate at normal speed, including the pauses. A rushed demo teaches the wrong thing.",
      "If you're not comfortable demoing, pre-brief your strongest associate before the session.",
    ],
    transition: "Everything in that demo started before the client arrived — on the CRM screen. Let's go there.",
  },

  m4: {
    purpose: "Turn CRM fields into questions. This is the technical core of the session.",
    timing: ["1 min silent profile read", "4 min on first questions", "6 min on Brooke's two fields", "5 min on the six verbs and the five things to scan for", "4 min optional live member record"],
    say: [
      "Sixty seconds. Read Brooke's profile. Don't plan a speech — plan a question.",
      "Fitness goal: get fit for a July 2026 wedding. What does that actually tell you? Almost nothing — until you ask.",
      "Health notes: asthma, limits intense cardio. Knowing is the start. Asking is the skill.",
      "Don't assume from data. Explore it.",
    ],
    run: [
      "Run the 60-second profile timer and keep the room silent.",
      "Take first questions around the room before revealing the breakthrough question.",
      "Work the two Brooke fields slowly — this is the moment the session clicks for most people.",
      "Leave the six verbs on screen while you work. Keep the five things to scan for visible at the end.",
      "If the room is fast, open Member Profiles and run the same exercise on a real record.",
    ],
    watch: [
      "The common failure: reciting the CRM back to the client ('I see you're getting married!'). Name it when you hear it.",
      "The second failure: diagnosing from a health note. We ask, we don't medicalise.",
      "Don't skip the verbs — people need language, not just encouragement.",
    ],
    transition: "You've got a good question. Now the hard part: not jumping straight to a recommendation.",
  },

  m5: {
    purpose: "Build the reflex of asking one more question before recommending anything.",
    timing: ["3 min setting up the temptation", "7 min rapid-fire around the room"],
    say: [
      "Someone says 'I want to lose weight.' The temptation is to recommend. Resist it.",
      "One level deeper. Before you recommend anything, ask one more useful question.",
      "No recommendation allowed. If a recommendation comes out of your mouth, you're out.",
    ],
    run: [
      "Draw statements on screen and go around the room at speed — five seconds per person, use the timer.",
      "Keep the energy high and the pace unforgiving. Momentum matters more than polish here.",
      "Call out the best follow-ups as you hear them and make the room repeat them.",
    ],
    watch: [
      "People will sneak in a recommendation disguised as a question ('have you tried Barre?'). That's a recommendation. Call it.",
      "If the room freezes, give them the stem: 'what makes you say that?' and restart.",
    ],
    transition: "Now that you've earned the right to recommend — here's how to say things without dumping information.",
  },

  m6: {
    purpose: "Fix the three places associates sound robotic: policies, formats and recommendations.",
    timing: ["3 min policies", "4 min class formats", "3 min recommendations"],
    say: [
      "Policies should sound like care, not like a contract.",
      "Explain the formats that are relevant to this client first — the others get one line.",
      "A recommendation without a reason is a guess. Say why.",
    ],
    run: [
      "Work the three transformations one at a time. For each, read the bad version out loud in a deliberately flat voice, then the good one.",
      "Ask the room for the difference before you explain it.",
      "Ask each person to say the cancellation policy out loud in their own words — that's the deliverable from this module.",
    ],
    watch: [
      "Don't let 'natural' become 'vague'. The policy information still has to be correct and complete.",
      "Some associates fear sounding unprofessional. Reassure: warm and accurate beats formal and forgettable.",
    ],
    transition: "You've now seen what good sounds like. Let's go the other way — for fun.",
  },

  m7: {
    purpose: "Release the tension and let the team name bad practice themselves, out loud.",
    timing: ["1 min setup", "5 min performance", "4 min debrief"],
    say: [
      "One client, one associate, everyone else is a judge. Associate: your mission is to commit as many crimes on that list as possible.",
      "Everyone else — every time you see poor servicing, call it out. Loudly.",
      "Last question, and be honest: have you ever seen a bit of this on our floor?",
    ],
    run: [
      "Cast your most confident people — this needs commitment to be funny.",
      "Keep the crime sheet on screen during the performance so observers can hunt.",
      "Debrief with the two reveal questions, then land the distinction: funny on stage, expensive in real life.",
    ],
    watch: [
      "Keep it about behaviour, never about a specific colleague's real induction. Don't let it turn personal.",
      "Cut the performance at five minutes even if it's going well — Module 8 needs its full twenty.",
    ],
    transition: "That's how not to do it. Now the real thing, in pairs.",
  },

  m8: {
    purpose: "Full induction practice against different personalities, with structured observation.",
    timing: ["2 min briefing and pairing", "7 min round one", "4 min feedback", "7 min round two (swap roles)"],
    say: [
      "In pairs: one Associate, one Client. Associates read only the CRM. Clients read your brief privately — do not show it.",
      "Seven minutes. Full induction, start to finish.",
      "Observers: five things only. Nobody scores personality.",
    ],
    run: [
      "Open the Role-Play Studio for live rounds — it auto-matches a persona to a real record and runs the debrief.",
      "Pair deliberately: put the quiet people with the patient people.",
      "Run the on-screen 7-minute clock for every round so pairs stay in sync.",
      "Swap roles for round two. Everyone must sit in the client's chair at least once.",
    ],
    watch: [
      "Circulate constantly and listen for the first question — that's where you'll coach.",
      "Keep feedback on the 5 Cs. Stop any feedback that starts with 'I would have…'.",
      "This module will overrun if you let it. Watch the clock from the start.",
    ],
    transition: "Real inductions don't stay this tidy. Let's add the interruptions.",
  },

  m9: {
    purpose: "Build composure — hold the thread of the induction while things go wrong around you.",
    timing: ["1 min setup", "7 min of curveballs", "2 min on 'let me find out for you'"],
    say: [
      "One person starts an induction. Every 45 to 60 seconds, a curveball lands — a client line or a studio interruption.",
      "The challenge isn't answering the curveball. It's getting back to where you were.",
      "'That's a great question — let me find out for you and come back.' That is infinitely better than confidently inventing an answer.",
    ],
    run: [
      "Draw curveballs on screen once the induction is underway, and let the timer dictate the next one.",
      "Swap the associate every two or three curveballs so pressure is shared.",
      "Finish by making the whole room say the 'let me find out for you' line out loud.",
    ],
    watch: [
      "Watch for invented answers — pause the round immediately and replay it the right way.",
      "If somebody loses the thread completely, that's a teaching moment, not a failure. Name it kindly.",
      "Set pressure to 'Chaos' in the Studio if the group wants one more run.",
    ],
    transition: "Last exercise — and the only scoreboard that matters.",
  },

  m10: {
    purpose: "Prove the gap between what we say and what the client retains.",
    timing: ["3 min final induction", "2 min memory capture and close"],
    say: [
      "One final induction. Then I'm only going to ask the client one question.",
      "What do you remember?",
      "Our job isn't to get through the induction. Our job is to make the induction get through to the client.",
    ],
    run: [
      "Capture both lists live on screen: what the client remembered, and what the associate actually said.",
      "Let the room look at the difference in silence for a few seconds before you say anything.",
      "Close on the final line and hand over to the CRM Loop.",
    ],
    watch: [
      "Pick a client who'll answer honestly, not kindly.",
      "Don't let the associate defend themselves — the gap is normal, and it's the lesson.",
    ],
    transition: "One last operational habit, and then we're done.",
  },

  studio: {
    purpose: "Live practice surface for Modules 8 and 9 — use it instead of paper briefs.",
    run: [
      "Pick a real member record, set the pressure level, and let the Studio match a secret persona to the data.",
      "Hidden truths only surface when the associate asks the right question — don't spoil them.",
      "Run the automatic debrief on screen so feedback stays on the 5 Cs.",
    ],
  },

  members: {
    purpose: "Real CRM records for the Module 4 exercise and for warm-ups.",
    run: [
      "Put a record on screen. Ask: what do you know, and what would you ask?",
      "Good for a five-minute warm-up at the start of any future shift briefing.",
    ],
  },

  loop: {
    purpose: "Close the operational loop — the conversation has to land back in the CRM.",
    say: [
      "Before: the CRM gives you a head start. During: the conversation enriches it. After: you write it back.",
      "The next associate shouldn't have to start from zero.",
    ],
    run: ["Show Brooke's record before and after. The before is true, thin, and useful to nobody tomorrow."],
    watch: ["Agree the standard out loud: notes updated the same day, not 'when there's time'."],
  },

  cheat: {
    purpose: "The one-page takeaway. Print it for the desk.",
    run: ["Tell the team this page exists and where it lives. Hand out or print the PDF export after the session."],
  },

  never: {
    purpose: "Remove ambiguity about the non-negotiables.",
    run: ["Read these out verbatim. This is the one part of the session that is a rule, not a technique."],
  },

  close: {
    purpose: "End on one idea and one personal commitment each.",
    say: [
      "The CRM gives us a head start — but it doesn't give us the person. That's what the conversation is for.",
      "Before you leave: what's one thing you'll do differently in your very next induction?",
    ],
    run: [
      "Capture every commitment on screen, named. Go around the room — nobody passes.",
      "Keep the list; open your next shift briefing with it.",
    ],
  },
};
