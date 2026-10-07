import { ChevronDown, Lightbulb } from "lucide-react";

export interface QuestionInference {
  evidence: string;
  inference: string;
  ask: string;
  follow: string;
}

export function QuestionInferenceGuide({ label, items }: { label: string; items: QuestionInference[] }) {
  return (
    <details className="group overflow-hidden rounded-2xl border border-cream-300 bg-white text-ink-900 shadow-soft">
      <summary className="flex cursor-pointer list-none items-start gap-3 p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-600">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-coral-700" />
        <span className="min-w-0 flex-1"><span className="block text-sm font-semibold leading-relaxed">{label}</span><span className="mt-1 block text-xs font-normal text-ink-500">Discuss your answer first, then expand to compare.</span></span>
        <ChevronDown className="mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
      </summary>
      <div className="space-y-4 border-t border-cream-200 p-5">
        <p className="text-xs leading-relaxed text-ink-500">Inferences are possibilities to explore. Confirm them with the community member before treating them as facts or documenting their voice.</p>
        {items.map((item) => <div key={item.evidence} className="rounded-xl bg-cream-100 p-4 text-sm leading-relaxed">
          <div className="text-[10px] font-bold uppercase tracking-wider text-coral-700">Recorded information / stated words</div><p className="mt-1 font-semibold">{item.evidence}</p>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-ink-500">Tentative inference</div><p className="mt-1">{item.inference}</p>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-sage-700">Ideal question</div><p className="mt-1 font-medium">“{item.ask}”</p>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-ink-500">Useful follow-up</div><p className="mt-1">“{item.follow}”</p>
        </div>)}
        <p className="text-xs leading-relaxed text-ink-500">Ask one question at a time. Listen to the answer and choose the follow-up that fits what the member actually shared.</p>
      </div>
    </details>
  );
}
