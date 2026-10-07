import { Children, isValidElement, useState } from "react";
import { ShieldAlert, Eye, EyeOff, Database, RefreshCw, Link2, ClipboardPaste, CheckCircle2, AlertTriangle, Loader2, X } from "lucide-react";
import { maskEmail, maskPhone, type Member } from "../../lib/members";
import { useMembers, setSheetUrl, loadFromText, clearPasted } from "../../lib/useMembers";
import { cn } from "../../utils/cn";

/* ------------------------------------------------------------------ */
/* CRM card                                                            */
/* ------------------------------------------------------------------ */

function Row({ k, v, hot }: { k: string; v?: string | number | null; hot?: boolean }) {
  if (v === undefined || v === null || v === "" ) return null;
  return (
    <div className={cn("grid grid-cols-[120px_1fr] gap-3 py-2 text-sm", hot && "bg-coral-500/5 -mx-3 px-3 rounded-lg")}>
      <dt className="pt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">{k}</dt>
      <dd className="font-medium text-ink-900 break-words">{v}</dd>
    </div>
  );
}

function Group({ title, children, tone = "neutral" }: { title: string; children: React.ReactNode; tone?: "neutral" | "warn" }) {
  const hasContent = Children.toArray(children).some((c) => {
    if (!isValidElement(c)) return false;
    const v = (c.props as { v?: unknown }).v;
    return v !== undefined && v !== null && v !== "";
  });
  if (!hasContent) return null;
  return (
    <div className={cn("rounded-2xl border px-4 py-2", tone === "warn" ? "border-gold-500/50 bg-gold-200/30" : "border-cream-200 bg-cream-100/60")}>
      <div className={cn("pt-1 pb-1 text-[10px] font-bold uppercase tracking-[0.2em]", tone === "warn" ? "text-ink-700" : "text-ink-400")}>{title}</div>
      <dl className="divide-y divide-cream-200/80">{children}</dl>
    </div>
  );
}

export function MemberCard({
  member,
  compact = false,
  highlight = false,
  className,
  title = "CRM · Client profile",
}: {
  member: Member;
  compact?: boolean;
  highlight?: boolean;
  className?: string;
  title?: string;
}) {
  const [showMedical, setShowMedical] = useState(false);
  const m = member;
  const statusLine = [m.membership, m.status].filter(Boolean).join(" · ");

  return (
    <div className={cn("overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-lift", className)}>
      <div className="flex items-center justify-between border-b border-cream-200 bg-cream-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-coral-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage-500" />
        </div>
        <div className="flex items-center gap-2">
          {m.sample && <span className="rounded-full bg-ink-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cream-50">Sample</span>}
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-500">{title}</span>
        </div>
      </div>

      <div className={cn("p-5", !compact && "md:p-6")}>
        <div className="flex items-start gap-4">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink-900 font-display text-xl text-cream-50">{m.initials}</span>
          <div className="min-w-0 flex-1">
            <div className="font-display text-2xl md:text-3xl font-medium tracking-tight leading-none">{m.name}</div>
            <div className="mt-1.5 text-sm text-ink-500">{statusLine || "Member"}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {m.tags.map((t) => (
                <span key={t} className="rounded-full bg-cream-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-700">
                  {t}
                </span>
              ))}
              {m.visits === 0 && <span className="rounded-full bg-coral-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-coral-700">0 visits</span>}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <Group title="Identity & account">
            <Row k="Studio" v={m.location} />
            <Row k="Joined" v={m.joined} />
            <Row k="Membership" v={m.membership} />
            <Row k="Source" v={m.source} hot={highlight && !!m.source} />
            {!compact && <Row k="Email" v={maskEmail(m.email)} />}
            {!compact && <Row k="Phone" v={maskPhone(m.phone)} />}
            {!compact && <Row k="Gender" v={m.gender} />}
            {!compact && <Row k="Age" v={m.age} />}
          </Group>

          <Group title="Goal & context">
            <Row k="Fitness goal" v={m.goal} hot={highlight && !!m.goal} />
            <Row k="Experience" v={m.experience} hot={highlight && !!m.experience} />
            <Row k="Preferred time" v={m.preferredTime} hot={highlight && !!m.preferredTime} />
            <Row k="Notes" v={m.notes} />
          </Group>

          {m.medical && (
            <div className="rounded-2xl border border-gold-500/50 bg-gold-200/30 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-700">
                  <ShieldAlert className="h-3.5 w-3.5 text-gold-500" /> Considerations · Sensitive — never read aloud
                </div>
                <button type="button" onClick={() => setShowMedical((s) => !s)} className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-700 shadow-soft hover:bg-cream-100">
                  {showMedical ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {showMedical ? "Hide" : "View"}
                </button>
              </div>
              <p className={cn("mt-2 text-sm font-medium transition-all", !showMedical && "blur-sm select-none")}>{showMedical ? m.medical : "Health note on file — tap View to read privately."}</p>
            </div>
          )}

          <Group title="Behaviour">
            <Row k="Visits" v={m.visits} />
            <Row k="Last visit" v={m.lastVisit} />
            <Row k="Upcoming" v={m.upcoming > 0 ? `${m.upcoming} booked` : undefined} hot={highlight && m.upcoming >= 4} />
            <Row k="No-shows" v={m.noShows > 0 ? m.noShows : undefined} hot={highlight && m.noShows > 0} />
            <Row k="Late cancels" v={m.lateCancels > 0 ? m.lateCancels : undefined} hot={highlight && m.lateCancels > 0} />
            <Row k="Formats" v={m.formats.length ? m.formats.join(", ") : undefined} />
          </Group>

          {!compact && m.extra.length > 0 && (
            <Group title="Other fields">
              {m.extra.map((e) => (
                <Row key={e.label} k={e.label} v={e.value} />
              ))}
            </Group>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Compact member tile                                                 */
/* ------------------------------------------------------------------ */

export function MemberTile({ member, active, onClick, meta }: { member: Member; active?: boolean; onClick?: () => void; meta?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
        active ? "border-coral-500 bg-coral-500/5 shadow-lift" : "border-cream-200 bg-white shadow-soft hover:-translate-y-0.5 hover:border-ink-900/30"
      )}
    >
      <span className={cn("inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm", active ? "bg-coral-500 text-white" : "bg-ink-900 text-cream-50")}>{member.initials}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate font-semibold">{member.name}</span>
          {member.sample && <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-ink-400">Sample</span>}
        </span>
        <span className="block truncate text-xs text-ink-500">{member.goal || member.membership || member.location || "—"}</span>
        <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-wider text-ink-400">
          {meta ?? `${member.visits} visit${member.visits === 1 ? "" : "s"}${member.medical ? " · health note" : ""}${member.noShows ? ` · ${member.noShows} no-show` : ""}`}
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Data source panel                                                   */
/* ------------------------------------------------------------------ */

export function DataSourcePanel({ className, defaultOpen = false }: { className?: string; defaultOpen?: boolean }) {
  const s = useMembers();
  const [open, setOpen] = useState(defaultOpen);
  const [url, setUrl] = useState(s.url);
  const [paste, setPaste] = useState("");
  const [pasteMsg, setPasteMsg] = useState<string | null>(null);

  const Icon = s.status === "loading" ? Loader2 : s.status === "live" || s.status === "pasted" ? CheckCircle2 : AlertTriangle;
  const tone = s.status === "loading" ? "text-ink-400" : s.status === "live" || s.status === "pasted" ? "text-sage-700" : "text-gold-500";

  return (
    <div className={cn("rounded-2xl border border-cream-200 bg-white shadow-soft", className)}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 px-5 py-3.5 text-left">
        <Database className="h-4 w-4 text-ink-400" />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Icon className={cn("h-4 w-4", tone, s.status === "loading" && "animate-spin")} />
            Member data · {s.usingSamples ? `${s.members.length} sample members` : `${s.members.length} live members`}
          </span>
          <span className="block truncate text-xs text-ink-500">{s.message}</span>
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-500">{open ? "Hide" : "Manage"}</span>
      </button>

      {open && (
        <div className="animate-fade-in space-y-5 border-t border-cream-200 px-5 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-500">
                <Link2 className="h-3.5 w-3.5" /> Published sheet link (TSV or CSV)
              </div>
              <textarea value={url} onChange={(e) => setUrl(e.target.value)} rows={3} className="w-full resize-none rounded-xl border border-cream-300 bg-cream-50 px-3 py-2 font-mono text-[11px] outline-none focus:border-ink-900" />
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setSheetUrl(url)} className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-bold text-cream-50 hover:bg-ink-700">
                  <RefreshCw className="h-3.5 w-3.5" /> Connect & refresh
                </button>
                {s.status === "pasted" && (
                  <button type="button" onClick={clearPasted} className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 px-4 py-2 text-xs font-bold hover:border-ink-900/40">
                    <X className="h-3.5 w-3.5" /> Clear pasted data
                  </button>
                )}
              </div>
              {s.headers.length > 0 && (
                <p className="text-[11px] text-ink-500">
                  Columns seen: <span className="font-mono">{s.headers.filter(Boolean).join(" · ")}</span>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-500">
                <ClipboardPaste className="h-3.5 w-3.5" /> Or paste rows straight from the sheet
              </div>
              <textarea
                value={paste}
                onChange={(e) => setPaste(e.target.value)}
                rows={3}
                placeholder={"First Name\tLast Name\tEmail\tMembership\tVisits\tGoal\tNotes…\nAnjali\tMehta\tanjali@…\tMonthly Unlimited\t0\tGet fitter\t…"}
                className="w-full resize-none rounded-xl border border-cream-300 bg-cream-50 px-3 py-2 font-mono text-[11px] outline-none focus:border-ink-900 placeholder:text-ink-300"
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const n = loadFromText(paste);
                    setPasteMsg(n ? `Loaded ${n} members from pasted data.` : "Couldn't find member rows — include a header row with names/emails.");
                    if (n) setPaste("");
                  }}
                  className="rounded-full border border-ink-900/15 px-4 py-2 text-xs font-bold hover:border-ink-900/40"
                >
                  Use pasted data
                </button>
                {pasteMsg && <span className="text-[11px] text-ink-500">{pasteMsg}</span>}
              </div>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-ink-500">
            Recognised columns include name, email, phone, membership, status, studio/location, source, joined, last visit, visits, no-shows, late cancels, upcoming bookings, goal, experience, preferred time, medical/health notes, tags and notes. Momence API payloads in a “Raw Body” column are parsed automatically. Emails and phone numbers are masked on screen.
          </p>
        </div>
      )}
    </div>
  );
}
