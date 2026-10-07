import { useEffect, useRef, useState } from "react";
import { Mic, Minus, Plus, X } from "lucide-react";
import { speakerNotes } from "../lib/speakerNotes";
import { cn } from "../utils/cn";

function ScriptText({ id }: { id: string }) {
  return <div className="space-y-5">{speakerNotes[id]?.script.map((line, index) => <p key={`${id}-${index}`} className="leading-[1.8] text-ink-800">{line}</p>)}</div>;
}

/** Static script for the trainer's printed pack. */
export function SpeakerNotes({ id, className }: { id: string; className?: string }) {
  if (!speakerNotes[id]) return null;
  return <section className={cn("break-inside-avoid rounded-3xl border border-cream-300 bg-cream-50 p-6 md:p-8", className)}>
    <h2 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-700"><Mic className="h-4 w-4" /> Speaker script</h2>
    <ScriptText id={id} />
  </section>;
}

/**
 * The reader, docked as its own column beside the content — it never covers the
 * app. Navigation changes the script without remounting the panel.
 */
export function DockedSpeakerNotes({ id, label, onClose }: { id: string; label: string; onClose: () => void }) {
  const readerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(17);

  useEffect(() => { readerRef.current?.scrollTo({ top: 0 }); }, [id]);

  return (
    <aside
      id="speaker-script-panel"
      aria-label="Speaker script"
      className="no-print z-30 flex min-h-0 lg:order-3 flex-col overflow-hidden border-cream-300 bg-cream-50 max-lg:max-h-[55dvh] max-lg:border-b lg:sticky lg:top-0 lg:h-screen lg:border-l"
      onKeyDown={(event) => { if (["ArrowLeft", "ArrowRight", "PageUp", "PageDown"].includes(event.key)) event.stopPropagation(); }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-ink-900 px-3 py-3 text-cream-50">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10"><Mic className="h-4 w-4" /></span>
        <div className="min-w-0 flex-1"><h2 className="text-sm font-semibold">Speaker script</h2><p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-cream-400">Physique 57 India</p></div>
        <button type="button" onClick={() => setFontSize((size) => Math.max(14, size - 1))} disabled={fontSize <= 14} aria-label="Decrease script text size" className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-30"><Minus className="h-4 w-4" /></button>
        <button type="button" onClick={() => setFontSize((size) => Math.min(24, size + 1))} disabled={fontSize >= 24} aria-label="Increase script text size" className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-30"><Plus className="h-4 w-4" /></button>
        <button type="button" onClick={onClose} aria-label="Close speaker script" className="rounded-lg p-2 hover:bg-white/10"><X className="h-4 w-4" /></button>
      </div>
      <div className="border-b border-cream-200 bg-white px-5 py-3"><p className="text-xs font-semibold leading-relaxed text-coral-700">{label}</p></div>
      <div ref={readerRef} tabIndex={0} aria-label={`${label} spoken script`} className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-coral-600" style={{ fontSize }}>
        {speakerNotes[id] ? <ScriptText id={id} /> : <p className="text-sm text-ink-500">No script is available for this section.</p>}
      </div>
    </aside>
  );
}
