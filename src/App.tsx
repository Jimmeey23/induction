import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X, Play, Pause, RotateCcw, Keyboard, FileDown, Mic, MicOff, Loader2 } from "lucide-react";
import { sections, SESSION_MINUTES } from "./data";
import { cn } from "./utils/cn";
import { Overview } from "./components/Overview";
import { Module1, Module2, Module3 } from "./components/Modules1to3";
import { Module4 } from "./components/Module4";
import { Module5, Module6 } from "./components/Modules5to6";
import { Module7, Module8 } from "./components/Modules7to8";
import { Module9, Module10 } from "./components/Modules9to10";
import { CrmLoop, CheatSheet, NeverDo, Closing } from "./components/Toolkit";
import { RolePlayStudio } from "./components/studio/RolePlayStudio";
import { MemberProfiles } from "./components/MemberProfiles";
import { SpeakerNotes } from "./components/SpeakerNotes";
import { PrintDoc } from "./components/PrintDoc";

/* ------------------------------------------------------------------ */
/* Session clock (elapsed stopwatch against the 2-hour plan)           */
/* ------------------------------------------------------------------ */

function fmtClock(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function SessionClock({ onJump }: { onJump: (id: string) => void }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    ref.current = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => {
      if (ref.current) window.clearInterval(ref.current);
    };
  }, [running]);

  const minutes = elapsed / 60;
  const scheduled = useMemo(() => {
    const mods = sections.filter((s) => s.kind === "module");
    return [...mods].reverse().find((m) => (m.startMin ?? 0) <= minutes) ?? mods[0];
  }, [minutes]);
  const pct = Math.min(100, (minutes / SESSION_MINUTES) * 100);
  const over = minutes > SESSION_MINUTES;

  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex flex-col items-end">
        <button type="button" onClick={() => onJump(scheduled.id)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500 hover:text-coral-600 transition-colors">
          On schedule · Module {scheduled.num}
        </button>
        <div className="mt-1 h-1 w-32 overflow-hidden rounded-full bg-cream-300">
          <div className={cn("h-full transition-all", over ? "bg-coral-500" : "bg-ink-900")} style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className={cn("flex items-center gap-1 rounded-full border bg-white pl-3 pr-1 py-1", over ? "border-coral-500" : "border-cream-300")}>
        <span className={cn("font-mono text-sm font-bold tabular-nums", over && "text-coral-600")}>{fmtClock(elapsed)}</span>
        <span className="text-[10px] font-bold text-ink-400 mr-1">/ 2:00:00</span>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-cream-50 hover:bg-ink-700 transition-colors"
          aria-label={running ? "Pause session clock" : "Start session clock"}
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-px" />}
        </button>
        {elapsed > 0 && (
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setElapsed(0);
            }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-cream-200 transition-colors"
            aria-label="Reset session clock"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* PDF export (renders the whole deck, then hands it to the printer)   */
/* ------------------------------------------------------------------ */

function ExportMenu({ onExport, busy }: { onExport: (withNotes: boolean) => void; busy: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-700 transition-colors hover:border-ink-900/40 disabled:opacity-60"
        aria-label="Export the training content as a PDF"
      >
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileDown className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{busy ? "Preparing…" : "Export PDF"}</span>
      </button>
      {open && !busy && (
        <div className="animate-fade-in absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-lift">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onExport(true);
            }}
            className="block w-full px-4 py-3 text-left hover:bg-cream-100"
          >
            <span className="block text-sm font-semibold">Trainer pack</span>
            <span className="block text-xs text-ink-500">All modules + toolkit, with speaker notes</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onExport(false);
            }}
            className="block w-full border-t border-cream-200 px-4 py-3 text-left hover:bg-cream-100"
          >
            <span className="block text-sm font-semibold">Participant pack</span>
            <span className="block text-xs text-ink-500">Same content, speaker notes removed</span>
          </button>
          <p className="border-t border-cream-200 bg-cream-100 px-4 py-2.5 text-[11px] leading-relaxed text-ink-500">
            Your browser's print dialog opens — choose <strong>Save as PDF</strong>, and turn on background graphics.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

const ids = sections.map((s) => s.id);

function readHash(): string {
  const h = window.location.hash.replace("#", "");
  return ids.includes(h) ? h : "overview";
}

export default function App() {
  const [view, setView] = useState<string>(() => readHash());
  const [menuOpen, setMenuOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(() => localStorage.getItem("p57.notes") === "1");
  const [printing, setPrinting] = useState<null | { withNotes: boolean }>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const index = ids.indexOf(view);
  const section = sections[index];
  const prev = index > 0 ? sections[index - 1] : null;
  const next = index < sections.length - 1 ? sections[index + 1] : null;

  const go = useCallback((id: string) => {
    if (!ids.includes(id)) return;
    setView(id);
    setMenuOpen(false);
    window.location.hash = id;
  }, []);

  useEffect(() => {
    const onHash = () => setView(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    localStorage.setItem("p57.notes", notesOpen ? "1" : "0");
  }, [notesOpen]);

  // Mount the print document, let the browser paint it, then open the dialog.
  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(null);
    window.addEventListener("afterprint", done);
    const id = window.setTimeout(() => {
      window.print();
      // Safari never fires afterprint reliably — clear anyway.
      window.setTimeout(done, 500);
    }, 350);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("afterprint", done);
    };
  }, [printing]);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    window.scrollTo({ top: 0 });
  }, [view]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (view === "studio" || view === "members") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        if (next) go(next.id);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (prev) go(prev.id);
      } else if (e.key === "n" || e.key === "N") {
        setNotesOpen((n) => !n);
      } else if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, view]);

  const content = (() => {
    switch (view) {
      case "overview":
        return <Overview go={go} />;
      case "m1":
        return <Module1 section={section} />;
      case "m2":
        return <Module2 section={section} />;
      case "m3":
        return <Module3 section={section} />;
      case "m4":
        return <Module4 section={section} go={go} />;
      case "m5":
        return <Module5 section={section} />;
      case "m6":
        return <Module6 section={section} />;
      case "m7":
        return <Module7 section={section} />;
      case "m8":
        return <Module8 section={section} go={go} />;
      case "m9":
        return <Module9 section={section} go={go} />;
      case "m10":
        return <Module10 section={section} />;
      case "studio":
        return null; // kept mounted below so a live round survives navigation
      case "members":
        return <MemberProfiles section={section} go={go} />;
      case "loop":
        return <CrmLoop section={section} />;
      case "cheat":
        return <CheatSheet section={section} />;
      case "never":
        return <NeverDo section={section} />;
      case "close":
        return <Closing section={section} go={go} />;
      default:
        return null;
    }
  })();

  const modules = sections.filter((s) => s.kind === "module");
  const practice = sections.filter((s) => s.kind === "practice");
  const toolkit = sections.filter((s) => s.kind === "toolkit");

  const Nav = (
    <nav className="flex h-full flex-col">
      <div className="px-6 pt-7 pb-5">
        <button type="button" onClick={() => go("overview")} className="text-left">
          <div className="font-display text-base font-semibold tracking-[0.3em] uppercase text-cream-50">Physique 57</div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-cream-400">India · Induction Training</div>
        </button>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-6">
        <NavItem active={view === "overview"} onClick={() => go("overview")} label="Overview" meta="Outcomes & run of show" />

        <div className="mt-5 mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">The session</div>
        <div className="space-y-0.5">
          {modules.map((m) => (
            <NavItem key={m.id} active={view === m.id} onClick={() => go(m.id)} num={m.num} label={m.label} meta={m.time} />
          ))}
        </div>

        <div className="mt-5 mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-coral-400">Practice</div>
        <div className="space-y-0.5">
          {practice.map((t) => (
            <NavItem key={t.id} active={view === t.id} onClick={() => go(t.id)} label={t.label} meta={t.format} accent />
          ))}
        </div>

        <div className="mt-5 mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">Toolkit</div>
        <div className="space-y-0.5">
          {toolkit.map((t) => (
            <NavItem key={t.id} active={view === t.id} onClick={() => go(t.id)} label={t.label} />
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-[11px] text-ink-400">
        <div className="flex items-center gap-2">
          <Keyboard className="h-3.5 w-3.5" />
          <span>
            Use <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-cream-200">←</kbd> <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-cream-200">→</kbd> to move between modules
          </span>
        </div>
      </div>
    </nav>
  );

  return (
    <>
    <div className="screen-root min-h-screen bg-cream-100 lg:grid lg:grid-cols-[288px_1fr]">
      {/* Desktop sidebar */}
      <aside className="no-print hidden lg:block sticky top-0 h-screen bg-ink-950 text-cream-50">{Nav}</aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <aside className="animate-fade-in absolute inset-y-0 left-0 w-[85%] max-w-xs bg-ink-950 text-cream-50 shadow-lift">
            <button type="button" onClick={() => setMenuOpen(false)} className="absolute right-3 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
            {Nav}
          </aside>
        </div>
      )}

      {/* Main */}
      <div ref={mainRef} className="flex min-h-screen flex-col">
        <header className="no-print sticky top-0 z-40 border-b border-ink-900/10 bg-cream-100/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
            <div className="flex items-center gap-3 min-w-0">
              <button type="button" onClick={() => setMenuOpen(true)} className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </button>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500">
                  {section.kind === "module" ? `Module ${section.num} of 10` : section.kind === "toolkit" ? "Toolkit" : section.kind === "practice" ? "Practice" : "Session"}
                  {section.time && <span className="ml-2 text-ink-400">· {section.time}</span>}
                </div>
                <div className="truncate font-display text-base md:text-lg font-medium tracking-tight">{section.label}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNotesOpen((n) => !n)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
                  notesOpen ? "border-ink-900 bg-ink-900 text-cream-50" : "border-cream-300 bg-white text-ink-700 hover:border-ink-900/40"
                )}
                aria-pressed={notesOpen}
                title="Toggle speaker notes (N)"
              >
                {notesOpen ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">Notes</span>
              </button>
              <ExportMenu busy={printing !== null} onExport={(withNotes) => setPrinting({ withNotes })} />
              <SessionClock onJump={go} />
            </div>
          </div>
          {/* Progress */}
          <div className="h-0.5 w-full bg-cream-200">
            <div className="h-full bg-coral-500 transition-all duration-500" style={{ width: `${((index + 1) / sections.length) * 100}%` }} />
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-8 md:py-14">
          {view !== "studio" && (
            <div key={view} className="animate-fade-up">
              {content}
            </div>
          )}
          {notesOpen && <SpeakerNotes id={view} className="no-print mt-14" />}
          <div className={view === "studio" ? "animate-fade-up" : "hidden"}>
            <RolePlayStudio section={sections.find((s) => s.id === "studio")!} />
          </div>

          {/* Prev / Next */}
          <div className="no-print mt-20 grid gap-4 border-t border-ink-900/10 pt-8 md:grid-cols-2">
            {prev ? (
              <button type="button" onClick={() => go(prev.id)} className="group flex items-center gap-4 rounded-2xl border border-cream-200 bg-white p-5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-ink-900/30">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-200 text-ink-700 transition-colors group-hover:bg-ink-900 group-hover:text-cream-50">
                  <ChevronLeft className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500">Previous</span>
                  <span className="block truncate font-display text-lg font-medium tracking-tight">
                    {prev.num ? `${prev.num}. ` : ""}
                    {prev.label}
                  </span>
                </span>
              </button>
            ) : (
              <div />
            )}
            {next ? (
              <button type="button" onClick={() => go(next.id)} className="group flex items-center justify-end gap-4 rounded-2xl bg-ink-900 p-5 text-right text-cream-50 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-ink-800">
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-cream-400">Next</span>
                  <span className="block truncate font-display text-lg font-medium tracking-tight">
                    {next.num ? `${next.num}. ` : ""}
                    {next.label}
                  </span>
                </span>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-500 text-white transition-transform group-hover:translate-x-0.5">
                  <ChevronRight className="h-5 w-5" />
                </span>
              </button>
            ) : (
              <div />
            )}
          </div>
        </main>

        <footer className="no-print border-t border-ink-900/10 px-5 py-6 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">
            <span>Physique 57 India · New Client Induction Training</span>
            <span>From First Visit → First Connection</span>
          </div>
        </footer>
      </div>
    </div>
    {printing && <PrintDoc withNotes={printing.withNotes} />}
    </>
  );
}

function NavItem({ active, onClick, label, meta, num, accent }: { active: boolean; onClick: () => void; label: string; meta?: string; num?: number; accent?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
        active ? "bg-white/10 text-cream-50" : "text-cream-300 hover:bg-white/5 hover:text-cream-50"
      )}
    >
      {num !== undefined ? (
        <span className={cn("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-xs transition-colors", active ? "bg-coral-500 text-white" : "bg-white/10 text-cream-200 group-hover:bg-white/15")}>
          {num}
        </span>
      ) : (
        <span className={cn("h-7 w-1 shrink-0 rounded-full", active ? "bg-coral-500" : accent ? "bg-coral-500/50" : "bg-white/10")} />
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold leading-tight">{label}</span>
        {meta && <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">{meta}</span>}
      </span>
    </button>
  );
}
