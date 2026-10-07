import { Mic, Quote as QuoteIcon, ListChecks, AlertTriangle, ArrowRight } from "lucide-react";
import { speakerNotes } from "../lib/speakerNotes";
import { cn } from "../utils/cn";

function NoteList({ title, Icon, items, accent }: { title: string; Icon: typeof QuoteIcon; items?: string[]; accent?: boolean }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-2">
      <div className={cn("flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]", accent ? "text-coral-600" : "text-ink-500")}>
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      <ul className="space-y-1.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
            <span className={cn("mt-2 h-1 w-1 shrink-0 rounded-full", accent ? "bg-coral-500" : "bg-ink-300")} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Trainer-facing notes for a section. Rendered inline on screen when notes are
 * toggled on, and always rendered in the PDF export.
 */
export function SpeakerNotes({ id, className }: { id: string; className?: string }) {
  const note = speakerNotes[id];
  if (!note) return null;

  return (
    <aside className={cn("break-inside-avoid rounded-3xl border border-gold-200 bg-gold-200/25 p-6 md:p-8", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/30 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-cream-50">
            <Mic className="h-3.5 w-3.5" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-700">Speaker notes</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400">Trainer only · not on the client's screen</span>
      </div>

      <p className="mt-5 font-display text-xl md:text-2xl font-light leading-snug tracking-tight">{note.purpose}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <NoteList title="Say this" Icon={QuoteIcon} items={note.say} accent />
        <NoteList title="How to run it" Icon={ListChecks} items={note.run} />
        <NoteList title="Watch for" Icon={AlertTriangle} items={note.watch} />
      </div>

      {note.transition && (
        <div className="mt-6 flex gap-2.5 border-t border-gold-500/30 pt-4">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
          <p className="font-display text-base md:text-lg font-light italic tracking-tight text-ink-800">“{note.transition}”</p>
        </div>
      )}
    </aside>
  );
}
