import type { ReactNode } from "react";
import { sections, outcomes, runOfShow } from "../data";
import { PrintContext } from "./printContext";
import { SpeakerNotes } from "./SpeakerNotes";
import { Overview } from "./Overview";
import { Module1, Module2, Module3 } from "./Modules1to3";
import { Module4 } from "./Module4";
import { Module5, Module6 } from "./Modules5to6";
import { Module7, Module8 } from "./Modules7to8";
import { Module9, Module10 } from "./Modules9to10";
import { CrmLoop, CheatSheet, NeverDo, Closing } from "./Toolkit";
import { PolicyPack } from "./PolicyPack";

const noop = () => {};

/** Every exportable section, in session order. The Studio is live-only. */
const PRINTABLE: { id: string; render: () => ReactNode }[] = [
  { id: "overview", render: () => <Overview go={noop} /> },
  { id: "m1", render: () => <Module1 section={byId("m1")} /> },
  { id: "m2", render: () => <Module2 section={byId("m2")} /> },
  { id: "m3", render: () => <Module3 section={byId("m3")} /> },
  { id: "m4", render: () => <Module4 section={byId("m4")} go={noop} /> },
  { id: "m5", render: () => <Module5 section={byId("m5")} /> },
  { id: "m6", render: () => <Module6 section={byId("m6")} /> },
  { id: "m7", render: () => <Module7 section={byId("m7")} /> },
  { id: "m8", render: () => <Module8 section={byId("m8")} go={noop} /> },
  { id: "m9", render: () => <Module9 section={byId("m9")} go={noop} /> },
  { id: "m10", render: () => <Module10 section={byId("m10")} /> },
  { id: "loop", render: () => <CrmLoop section={byId("loop")} /> },
  { id: "policy", render: () => <PolicyPack section={byId("policy")} /> },
  { id: "cheat", render: () => <CheatSheet section={byId("cheat")} /> },
  { id: "never", render: () => <NeverDo section={byId("never")} /> },
  { id: "close", render: () => <Closing section={byId("close")} go={noop} /> },
];

function byId(id: string) {
  return sections.find((s) => s.id === id)!;
}

function Cover() {
  return (
    <section className="print-page flex min-h-[260mm] flex-col justify-between">
      <div>
        <div className="font-display text-sm font-semibold uppercase tracking-[0.3em]">Physique 57 India</div>
        <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-500">New Client Induction Training</div>

        <h1 className="mt-16 font-display text-5xl font-light leading-[1.05] tracking-tight">
          From First Visit
          <br />
          <span className="text-coral-500">→ First Connection</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-600">
          Complete trainer pack — all ten modules, the toolkit, and speaker notes for every section.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500">By the end, every associate can…</div>
            <ul className="mt-4 space-y-1.5 text-sm text-ink-700">
              {outcomes.map((o, i) => (
                <li key={o} className="flex gap-2.5">
                  <span className="font-mono text-xs text-coral-500">{String(i + 1).padStart(2, "0")}</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500">Run of show</div>
            <ul className="mt-4 space-y-1.5 text-sm">
              {runOfShow.map((m) => (
                <li key={m.id} className="flex gap-3 border-b border-ink-900/10 pb-1.5">
                  <span className="flex-1">
                    {m.num}. {m.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
        Trainer pack · contains speaker notes · not for distribution to clients
      </div>
    </section>
  );
}

/**
 * The entire training content laid out as a document, with speaker notes under
 * every section. Hidden on screen; only the printer (or "Save as PDF") sees it.
 */
export function PrintDoc({ withNotes = true }: { withNotes?: boolean }) {
  return (
    <PrintContext.Provider value={true}>
      <div className="print-doc">
        <Cover />
        {PRINTABLE.map(({ id, render }) => (
          <section key={id} className="print-page space-y-10">
            {render()}
            {withNotes && <SpeakerNotes id={id} className="mt-12" />}
          </section>
        ))}
      </div>
    </PrintContext.Provider>
  );
}
