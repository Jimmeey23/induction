/* ------------------------------------------------------------------ */
/* Member model                                                        */
/* ------------------------------------------------------------------ */

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  initials: string;
  email?: string;
  phone?: string;
  gender?: string;
  age?: number;
  dob?: string;
  location?: string;
  source?: string;
  joined?: string;
  lastVisit?: string;
  membership?: string;
  status?: string;
  visits: number;
  noShows: number;
  lateCancels: number;
  upcoming: number;
  formats: string[];
  tags: string[];
  goal?: string;
  experience?: string;
  preferredTime?: string;
  medical?: string;
  notes?: string;
  extra: { label: string; value: string }[];
  sample: boolean;
  completeness: number;
}

export type MemberInput = Partial<Omit<Member, "name" | "initials" | "completeness" | "visits" | "noShows" | "lateCancels" | "upcoming" | "formats" | "tags" | "extra" | "sample">> & {
  firstName: string;
  lastName?: string;
  visits?: number;
  noShows?: number;
  lateCancels?: number;
  upcoming?: number;
  formats?: string[];
  tags?: string[];
  extra?: { label: string; value: string }[];
  sample?: boolean;
};

export const DEFAULT_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWB61NR4oCS28r1jvOgTaWsUoz4eLFLOJqkeKOOdV-TRnWiOA2j0q7-KuOV6zOC22x3DKKDJrliE31/pub?output=tsv";

export function normalizeMember(input: MemberInput, idx: number): Member {
  const firstName = (input.firstName || "").trim() || "Member";
  const lastName = (input.lastName || "").trim();
  const name = [firstName, lastName].filter(Boolean).join(" ");
  const initials = (firstName[0] || "") + (lastName[0] || firstName[1] || "");
  const keyFields = [input.goal, input.experience, input.preferredTime, input.medical, input.source, input.membership, input.joined, input.lastVisit, input.notes];
  const filled = keyFields.filter((f) => f && String(f).trim()).length;
  return {
    id: input.id || `m-${idx}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    firstName,
    lastName,
    name,
    initials: initials.toUpperCase(),
    email: input.email,
    phone: input.phone,
    gender: input.gender,
    age: input.age,
    dob: input.dob,
    location: input.location,
    source: input.source,
    joined: input.joined,
    lastVisit: input.lastVisit,
    membership: input.membership,
    status: input.status,
    visits: input.visits ?? 0,
    noShows: input.noShows ?? 0,
    lateCancels: input.lateCancels ?? 0,
    upcoming: input.upcoming ?? 0,
    formats: input.formats ?? [],
    tags: input.tags ?? [],
    goal: input.goal,
    experience: input.experience,
    preferredTime: input.preferredTime,
    medical: input.medical,
    notes: input.notes,
    extra: input.extra ?? [],
    sample: input.sample ?? false,
    completeness: filled / keyFields.length,
  };
}

/* ------------------------------------------------------------------ */
/* Privacy helpers                                                     */
/* ------------------------------------------------------------------ */

export function maskEmail(e?: string) {
  if (!e) return undefined;
  const [u, d] = e.split("@");
  if (!d) return e.slice(0, 2) + "•••";
  return `${u.slice(0, 2)}•••@${d}`;
}

export function maskPhone(p?: string) {
  if (!p) return undefined;
  const digits = p.replace(/\D/g, "");
  if (digits.length < 4) return "•••";
  return `${p.startsWith("+") ? "+" : ""}${digits.slice(0, 2)}••• •••${digits.slice(-3)}`;
}

/* ------------------------------------------------------------------ */
/* Parsing                                                             */
/* ------------------------------------------------------------------ */

function parseDelimited(text: string): string[][] {
  const clean = text.replace(/^\uFEFF/, "");
  const firstLine = clean.split(/\r?\n/)[0] ?? "";
  const delim = firstLine.includes("\t") ? "\t" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQ = false;
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (inQ) {
      if (ch === '"') {
        if (clean[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQ = false;
      } else cell += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === delim) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && clean[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

const norm = (k: string) => k.toLowerCase().replace(/[^a-z0-9]/g, "");

type Field =
  | "firstName"
  | "lastName"
  | "fullName"
  | "email"
  | "phone"
  | "gender"
  | "dob"
  | "age"
  | "joined"
  | "lastVisit"
  | "visits"
  | "noShows"
  | "lateCancels"
  | "upcoming"
  | "membership"
  | "status"
  | "location"
  | "source"
  | "tags"
  | "notes"
  | "goal"
  | "experience"
  | "preferredTime"
  | "medical"
  | "formats"
  | "id"
  | "ignore";

const aliases: Record<Field, string[]> = {
  id: ["id", "customerid", "memberid", "clientid", "uid"],
  firstName: ["firstname", "first", "givenname", "fname"],
  lastName: ["lastname", "surname", "last", "familyname", "lname"],
  fullName: ["name", "fullname", "customer", "customername", "member", "membername", "client", "clientname"],
  email: ["email", "emailaddress", "mail"],
  phone: ["phone", "phonenumber", "mobile", "mobilenumber", "contact", "contactnumber", "whatsapp"],
  gender: ["gender", "sex"],
  dob: ["dob", "dateofbirth", "birthday", "birthdate", "born"],
  age: ["age"],
  joined: ["createdat", "created", "joined", "joindate", "joinedat", "signupdate", "signedup", "membersince", "registered", "registrationdate", "dateadded"],
  lastVisit: ["lastvisit", "lastvisited", "lastattended", "lastseen", "lastclass", "lastcheckin", "lastbooking"],
  visits: ["visits", "numberofvisits", "visitcount", "attendance", "classesattended", "totalvisits", "checkins", "attended", "sessionsattended"],
  noShows: ["noshows", "noshow", "missed", "missedclasses", "noshowcount"],
  lateCancels: ["latecancels", "latecancellations", "latecancel", "latecancelcount"],
  upcoming: ["upcoming", "upcomingbookings", "bookings", "futurebookings", "booked", "upcomingclasses"],
  membership: ["membership", "memberships", "plan", "package", "product", "activemembership", "membershipname", "pack", "subscription", "currentmembership"],
  status: ["status", "membershipstatus", "accountstatus", "state"],
  location: ["location", "homelocation", "studio", "homestudio", "site", "branch", "centre", "center"],
  source: ["source", "leadsource", "howdidyouhear", "howdidyouhearaboutus", "referral", "referredby", "acquisition", "channel", "campaign"],
  tags: ["tags", "labels", "tag", "segments"],
  notes: ["notes", "note", "comments", "remarks", "internalnotes", "staffnotes"],
  goal: ["goal", "goals", "fitnessgoal", "fitnessgoals", "objective", "objectives", "whatareyourgoals", "primarygoal"],
  experience: ["experience", "fitnesslevel", "level", "workouthistory", "exercisehistory", "fitnessexperience", "currentactivity", "activitylevel"],
  preferredTime: ["preferredtime", "preferredschedule", "timing", "availability", "preferredslot", "preferredtiming", "bestime", "schedule"],
  medical: ["medical", "medicalconditions", "medicalnotes", "health", "healthnotes", "injury", "injuries", "conditions", "parq", "healthconditions", "medicalhistory", "limitations"],
  formats: ["formats", "classes", "classtypes", "formatsattended", "favouriteclass", "favoriteclass", "classesattendedtypes", "preferredformats", "classformat"],
  ignore: ["timestamp", "error", "password", "token"],
};

const lookup = new Map<string, Field>();
(Object.keys(aliases) as Field[]).forEach((f) => aliases[f].forEach((a) => lookup.set(a, f)));

function matchField(key: string): Field | undefined {
  const segs = key.split(".");
  const last = norm(segs[segs.length - 1]);
  if (lookup.has(last)) return lookup.get(last);
  const full = norm(key);
  if (lookup.has(full)) return lookup.get(full);
  // fuzzy contains
  for (const [alias, f] of lookup) {
    if (alias.length >= 5 && last.includes(alias)) return f;
  }
  return undefined;
}

function flatten(obj: unknown, prefix = "", out: Record<string, string> = {}): Record<string, string> {
  if (obj === null || obj === undefined) return out;
  if (Array.isArray(obj)) {
    if (obj.every((x) => typeof x !== "object" || x === null)) out[prefix] = obj.map(String).join(", ");
    else {
      const names = obj.map((x) => (x && typeof x === "object" ? (x as Record<string, unknown>).name ?? (x as Record<string, unknown>).title ?? (x as Record<string, unknown>).label : undefined)).filter(Boolean);
      if (names.length) out[prefix] = names.map(String).join(", ");
      obj.forEach((x, i) => flatten(x, `${prefix}.${i}`, out));
    }
    return out;
  }
  if (typeof obj === "object") {
    Object.entries(obj as Record<string, unknown>).forEach(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k, out));
    return out;
  }
  out[prefix] = String(obj);
  return out;
}

const toInt = (v?: string) => {
  if (!v) return 0;
  const n = parseInt(String(v).replace(/[^0-9-]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
};

const splitList = (v?: string) =>
  (v || "")
    .split(/[,;|/]+/)
    .map((s) => s.trim())
    .filter(Boolean);

const prettify = (k: string) => {
  const last = k.split(".").pop() || k;
  return last
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
};

function ageFromDob(dob?: string): number | undefined {
  if (!dob) return undefined;
  const d = new Date(dob);
  if (isNaN(d.getTime()) || d.getFullYear() < 1900) return undefined;
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) a--;
  return a > 0 && a < 110 ? a : undefined;
}

export function recordToMember(rec: Record<string, string>, idx: number): Member | null {
  const input: MemberInput = { firstName: "", extra: [] };
  let fullName = "";
  const extra: { label: string; value: string }[] = [];
  for (const [key, raw] of Object.entries(rec)) {
    const value = (raw ?? "").trim();
    if (!value) continue;
    const f = matchField(key);
    switch (f) {
      case "ignore":
        break;
      case "id":
        if (!input.id) input.id = value;
        break;
      case "firstName":
        input.firstName = input.firstName || value;
        break;
      case "lastName":
        input.lastName = input.lastName || value;
        break;
      case "fullName":
        fullName = fullName || value;
        break;
      case "email":
        input.email = input.email || value;
        break;
      case "phone":
        input.phone = input.phone || value;
        break;
      case "gender":
        input.gender = input.gender || value;
        break;
      case "dob":
        input.dob = input.dob || value;
        break;
      case "age":
        input.age = input.age || toInt(value) || undefined;
        break;
      case "joined":
        input.joined = input.joined || value;
        break;
      case "lastVisit":
        input.lastVisit = input.lastVisit || value;
        break;
      case "visits":
        input.visits = Math.max(input.visits ?? 0, toInt(value));
        break;
      case "noShows":
        input.noShows = toInt(value);
        break;
      case "lateCancels":
        input.lateCancels = toInt(value);
        break;
      case "upcoming":
        input.upcoming = toInt(value);
        break;
      case "membership":
        input.membership = input.membership || value;
        break;
      case "status":
        input.status = input.status || value;
        break;
      case "location":
        input.location = input.location || value;
        break;
      case "source":
        input.source = input.source || value;
        break;
      case "tags":
        input.tags = [...(input.tags ?? []), ...splitList(value)];
        break;
      case "notes":
        input.notes = input.notes ? `${input.notes} · ${value}` : value;
        break;
      case "goal":
        input.goal = input.goal || value;
        break;
      case "experience":
        input.experience = input.experience || value;
        break;
      case "preferredTime":
        input.preferredTime = input.preferredTime || value;
        break;
      case "medical":
        input.medical = input.medical ? `${input.medical} · ${value}` : value;
        break;
      case "formats":
        input.formats = [...(input.formats ?? []), ...splitList(value)];
        break;
      default:
        if (value.length <= 120 && extra.length < 12) extra.push({ label: prettify(key), value });
    }
  }
  if (!input.firstName && fullName) {
    const parts = fullName.split(/\s+/);
    input.firstName = parts[0];
    input.lastName = parts.slice(1).join(" ");
  }
  if (!input.firstName && !input.email) return null;
  if (!input.firstName && input.email) input.firstName = input.email.split("@")[0];
  if (!input.age) input.age = ageFromDob(input.dob);
  input.extra = extra;
  return normalizeMember(input, idx);
}

export interface ParseResult {
  members: Member[];
  headers: string[];
  rowCount: number;
  mode: "columns" | "rawBody" | "empty";
}

export function parseMembers(text: string): ParseResult {
  const rows = parseDelimited(text);
  if (rows.length === 0) return { members: [], headers: [], rowCount: 0, mode: "empty" };
  const headers = rows[0].map((h) => h.trim());
  const body = rows.slice(1);
  const normHeaders = headers.map(norm);
  const rawIdx = normHeaders.findIndex((h) => h === "rawbody" || h === "body" || h === "payload" || h === "json");

  if (rawIdx >= 0) {
    const members: Member[] = [];
    body.forEach((r, i) => {
      const raw = r[rawIdx];
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        list.forEach((item, j) => {
          const flat = flatten(item);
          const m = recordToMember(flat, i * 100 + j);
          if (m) members.push(m);
        });
      } catch {
        /* not JSON — ignore row */
      }
    });
    return { members: dedupe(members), headers, rowCount: body.length, mode: body.length ? "rawBody" : "empty" };
  }

  const members: Member[] = [];
  body.forEach((r, i) => {
    const rec: Record<string, string> = {};
    headers.forEach((h, j) => {
      if (h) rec[h] = r[j] ?? "";
    });
    const m = recordToMember(rec, i);
    if (m) members.push(m);
  });
  return { members: dedupe(members), headers, rowCount: body.length, mode: body.length ? "columns" : "empty" };
}

function dedupe(list: Member[]) {
  const seen = new Map<string, Member>();
  list.forEach((m) => {
    const key = (m.email || m.id || m.name).toLowerCase();
    const prev = seen.get(key);
    if (!prev || m.completeness > prev.completeness) seen.set(key, m);
  });
  return [...seen.values()];
}

/* ------------------------------------------------------------------ */
/* Sample members (used until the live sheet has member rows)          */
/* ------------------------------------------------------------------ */

const raw: MemberInput[] = [
  {
    firstName: "Brooke",
    lastName: "Fernandes",
    email: "brooke.f@gmail.com",
    phone: "+91 98201 44312",
    gender: "Female",
    age: 29,
    location: "Kwality House · Kemps Corner",
    source: "Instagram",
    joined: "This week",
    membership: "Monthly Unlimited",
    status: "Active · First visit today",
    goal: "Get fit for July 2026 wedding",
    medical: "Asthma. Tries to limit intense cardio.",
    extra: [{ label: "Shoe size", value: "38" }],
    tags: ["New client"],
  },
  {
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair91@outlook.com",
    phone: "+91 99870 21675",
    gender: "Female",
    age: 34,
    location: "Supreme HQ · Bandra",
    source: "Instagram reel",
    joined: "3 days ago",
    membership: "Intro Pack · 4 classes",
    status: "Active",
    goal: "Get fitter",
    experience: "None",
    notes: "Asked twice on the phone whether the class is 'for beginners'.",
    tags: ["New client", "Beginner"],
  },
  {
    firstName: "Aarav",
    lastName: "Kapoor",
    email: "aarav.kapoor@hexaworks.in",
    phone: "+91 98100 55820",
    gender: "Male",
    age: 31,
    location: "Supreme HQ · Bandra",
    source: "Google search",
    joined: "Last week",
    membership: "12-Class Pack",
    status: "Active",
    goal: "Build strength",
    experience: "Gym 4× / week for 6 years",
    preferredTime: "Evenings after 7pm",
    notes: "Bought the pack at the desk; said 'let's see if this is actually hard'.",
    tags: ["Experienced"],
  },
  {
    firstName: "Rohan",
    lastName: "Desai",
    email: "rohan.desai@kpcap.com",
    phone: "+91 98333 10944",
    gender: "Male",
    age: 42,
    location: "Kwality House · Kemps Corner",
    source: "Corporate tie-up",
    joined: "2 weeks ago",
    membership: "Monthly Unlimited",
    status: "Active",
    visits: 1,
    lastVisit: "Trial class · 9 days ago",
    goal: "Stay fit",
    preferredTime: "Early mornings · 6:30–7:30am",
    notes: "Travels 2 weeks a month. Assistant books on his behalf.",
    tags: ["Executive", "Travels"],
  },
  {
    firstName: "Meera",
    lastName: "Iyer",
    email: "meera.i@gmail.com",
    phone: "+91 98451 77230",
    gender: "Female",
    age: 27,
    location: "Kenkere House · Bengaluru",
    joined: "Yesterday",
    membership: "Intro Pack · 4 classes",
    status: "Active",
    goal: "General fitness",
    tags: ["New client"],
  },
  {
    firstName: "Kabir",
    lastName: "Shah",
    email: "kabir.shah22@gmail.com",
    phone: "+91 98191 00327",
    gender: "Male",
    age: 25,
    location: "Supreme HQ · Bandra",
    source: "Walk-in",
    joined: "Yesterday",
    membership: "Monthly Unlimited",
    status: "Active",
    upcoming: 6,
    goal: "Transform in 30 days",
    experience: "Home workouts · YouTube",
    preferredTime: "Anytime",
    notes: "Booked 6 classes across 5 days within an hour of signing up.",
    tags: ["New client", "High intent"],
  },
  {
    firstName: "Ananya",
    lastName: "Reddy",
    email: "ananya.reddy@yahoo.in",
    phone: "+91 98480 61209",
    gender: "Female",
    age: 33,
    location: "Kenkere House · Bengaluru",
    source: "Referral · member (Divya S.)",
    joined: "4 days ago",
    membership: "8-Class Pack",
    status: "Active",
    goal: "Return to exercise",
    experience: "Yoga and pilates before pregnancy",
    preferredTime: "Late mornings · 10–11:30am",
    medical: "Postnatal · 7 months. Doctor has cleared exercise.",
    tags: ["Returning to exercise"],
  },
  {
    firstName: "Vikram",
    lastName: "Malhotra",
    email: "vikram.m@gmail.com",
    phone: "+91 98110 43361",
    gender: "Male",
    age: 48,
    location: "Kwality House · Kemps Corner",
    source: "Doctor / physio recommendation",
    joined: "Last week",
    membership: "Monthly Unlimited",
    status: "Active",
    goal: "Rebuild strength and mobility",
    experience: "Ran marathons until 2 years ago",
    preferredTime: "Weekday mornings",
    medical: "Right knee · ACL reconstruction 14 months ago. Physio-cleared; avoids deep lunges and jumping.",
    tags: ["Injury-aware"],
  },
  {
    firstName: "Sana",
    lastName: "Qureshi",
    email: "sana.q@hotmail.com",
    phone: "+91 98200 93315",
    gender: "Female",
    age: 30,
    location: "Supreme HQ · Bandra",
    source: "Instagram",
    joined: "10 days ago",
    membership: "12-Class Pack",
    status: "Active",
    visits: 0,
    noShows: 1,
    lateCancels: 1,
    goal: "Lose weight before a holiday in 6 weeks",
    experience: "On and off for years",
    preferredTime: "Evenings",
    notes: "Missed first booking (no-show). Late-cancelled the second.",
    tags: ["At risk"],
  },
  {
    firstName: "Dev",
    lastName: "Patel",
    email: "devpatel@gmail.com",
    phone: "+91 98250 18076",
    gender: "Male",
    age: 28,
    location: "Supreme HQ · Bandra",
    source: "Referral · member (Nisha K.)",
    joined: "2 days ago",
    membership: "Intro Pack · 4 classes",
    status: "Active",
    goal: "Tone up",
    experience: "Football on weekends",
    preferredTime: "Weekday evenings",
    notes: "Referred by Nisha K. (member since 2023). Both booked into the same 7pm class on Thursday.",
    tags: ["Referral"],
  },
  {
    firstName: "Tara",
    lastName: "Bhatia",
    email: "tara.bhatia@gmail.com",
    phone: "+91 98103 56671",
    gender: "Female",
    age: 24,
    location: "Kwality House · Kemps Corner",
    source: "Friend (non-member)",
    joined: "This week",
    membership: "Monthly Unlimited",
    status: "Active",
    goal: "Stamina and a strong back",
    experience: "Trained Kathak for 12 years; stopped 3 years ago",
    preferredTime: "Evenings",
    formats: [],
    tags: ["Dancer"],
  },
  {
    firstName: "Nikhil",
    lastName: "Rao",
    email: "nikhil.rao@gmail.com",
    phone: "+91 98860 40218",
    gender: "Male",
    age: 52,
    location: "Kenkere House · Bengaluru",
    source: "Wife is a member",
    joined: "Last week",
    membership: "8-Class Pack",
    status: "Active",
    goal: "Body composition · lose belly fat",
    experience: "Morning walks",
    preferredTime: "Early mornings",
    medical: "Borderline blood pressure · on medication. Doctor advised strength training.",
    notes: "Asked at purchase: 'which class burns the most calories?'",
    tags: ["First group class"],
  },
];

export const sampleMembers: Member[] = raw.map((m, i) => normalizeMember({ ...m, sample: true }, i));
