/* ------------------------------------------------------------------ */
/* Speaker notes                                                       */
/* Shown on screen (toggle in the header, or press "N") and included   */
/* in the PDF export so the trainer can present from paper.            */
/* ------------------------------------------------------------------ */

export interface SpeakerNote {
  /** What this part of the session is for, in one line. */
  purpose: string;
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
    purpose: "Set the contract for the session before anyone feels lectured at.",
    say: [
      "Today is not a policy briefing. It's one skill: helping a new client feel welcome and supported.",
      "You'll be on your feet, in pairs, role-playing with real member records. Nothing here is theory.",
      "By the end you'll each leave with one thing you'll do differently in your very next induction.",
    ],
    run: [
      "Read the outcomes list out loud quickly — don't dwell, it's a map not a lesson.",
      "Point out the range of modules and explain how discussion, demonstration and practice will work together.",
    ],
    watch: ["If people arrive with laptops open, ask them to close them — this session is spoken, not read."],
    transition: "Before we talk about how to do an induction, let's agree on why it exists at all.",
  },

  m1: {
    purpose: "Make the room feel the client's confusion so the induction stops being a form-filling task.",
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
    transition: "So if that's the problem — what does 'solved' actually look like? How should a client feel after their induction?",
  },

  m2: {
    purpose: "Replace 'did I cover everything?' with 'how does the client feel?' as the measure of a good induction.",
    say: [
      "Post-it or paper. On your own, no talking: what should a client feel after their first induction with us?",
      "One word or one line each. Don't write what you'd say — write what they'd feel.",
    ],
    run: [
      "Give everyone quiet space to write before gathering answers. The silence is the exercise.",
      "Collect every answer around the room before revealing the six feelings. Cluster them out loud as you go.",
      "Then deliver Training Principle № 1: we don't measure an induction by information delivered, we measure it by how the client feels.",
    ],
    watch: [
      "If answers drift into tasks ('they know the lockers'), ask: and what does that make them feel?",
      "Protect the quiet reflection — people will want to talk to each other. That's the whole point of doing it alone.",
    ],
    transition: "That's the target. Now here's the only framework you have to remember to hit it.",
  },

  m3: {
    purpose: "Teach the seven-step induction as one conversation.",
    say: [
      "Seven moves, one conversation. Not a script — an order.",
      "Notice how little of the conversation is you talking about policies.",
      "You already have CRM information. Don't repeat it back to them — use it to ask better questions.",
    ],
    run: [
      "Walk the seven moves once. Resist explaining each one in depth — Modules 4 to 6 do that.",
      "Then do the live demonstration yourself with a volunteer as the client, modelling a natural and client-led conversation.",
      "Ask the room to keep a tally while they watch: how many questions did the associate ask vs. how many statements did they make?",
      "Debrief on the tally number, not on style.",
    ],
    watch: [
      "Demonstrate naturally, including pauses. Leave space for the client to respond.",
      "If you're not comfortable demoing, pre-brief your strongest associate before the session.",
    ],
    transition: "Everything in that demo started before the client arrived — on the CRM screen. Let's go there.",
  },

  m4: {
    purpose: "Turn CRM fields into questions. This is the technical core of the session.",
    say: [
      "Read Brooke's profile. Don't plan a speech — plan a question.",
      "Fitness goal: get fit for a July 2026 wedding. What does that actually tell you? Almost nothing — until you ask.",
      "Health notes: asthma, limits intense cardio. Knowing is the start. Asking is the skill.",
      "Don't assume from data. Explore it.",
    ],
    run: [
      "Give the group a quiet moment to review the profile before asking for their observations.",
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
    say: [
      "Someone says 'I want to lose weight.' The temptation is to recommend. Resist it.",
      "One level deeper. Before you recommend anything, ask one more useful question.",
      "No recommendation allowed. If a recommendation comes out of your mouth, you're out.",
    ],
    run: [
      "Draw statements on screen and invite the group to offer useful follow-up questions.",
      "Keep the energy high. Momentum matters more than polish here.",
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
      "Wrap the performance before the debrief so the group has room to reflect.",
    ],
    transition: "That's how not to do it. Now the real thing, in pairs.",
  },

  m8: {
    purpose: "Full induction practice against different personalities, with structured observation.",
    say: [
      "In pairs: one Associate, one Client. Associates read only the CRM. Clients read your brief privately — do not show it.",
      "Practise the full induction from start to finish.",
      "Observers: five things only. Nobody scores personality.",
    ],
    run: [
      "Open the Role-Play Studio for live rounds — it auto-matches a persona to a real record and runs the debrief.",
      "Pair deliberately: put the quiet people with the patient people.",
      "Let each pair move through the conversation naturally, then swap roles.",
      "Swap roles for round two. Everyone must sit in the client's chair at least once.",
    ],
    watch: [
      "Circulate constantly and listen for the first question — that's where you'll coach.",
      "Keep feedback on the 5 Cs. Stop any feedback that starts with 'I would have…'.",
      "Make sure each person has a chance to practise as both associate and client.",
    ],
    transition: "Real inductions don't stay this tidy. Let's add the interruptions.",
  },

  m9: {
    purpose: "Build composure — hold the thread of the induction while things go wrong around you.",
    say: [
      "One person starts an induction. The observer introduces client lines or studio interruptions when they feel natural.",
      "The challenge isn't answering the curveball. It's getting back to where you were.",
      "'That's a great question — let me find out for you and come back.' That is infinitely better than confidently inventing an answer.",
    ],
    run: [
      "Draw curveballs on screen once the induction is underway, and let the conversation guide when the next one lands.",
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
    say: [
      "One final induction. Then I'm only going to ask the client one question.",
      "What do you remember?",
      "Our job isn't to get through the induction. Our job is to make the induction get through to the client.",
    ],
    run: [
      "Capture both lists live on screen: what the client remembered, and what the associate actually said.",
      "Give the room a moment to reflect on the difference before you say anything.",
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
      "Good for a quick warm-up at the start of any future shift briefing.",
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
