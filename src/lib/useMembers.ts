import { useCallback, useEffect, useState } from "react";
import { DEFAULT_SHEET_URL, parseMembers, sampleMembers, type Member, type ParseResult } from "./members";

export type SourceStatus = "loading" | "live" | "empty" | "error" | "pasted";

export interface MembersState {
  members: Member[];
  liveMembers: Member[];
  status: SourceStatus;
  message: string;
  headers: string[];
  rowCount: number;
  url: string;
  usingSamples: boolean;
  fetchedAt: number | null;
}

const URL_KEY = "p57.sheetUrl";
const PASTE_KEY = "p57.pastedData";

const listeners = new Set<(s: MembersState) => void>();
let state: MembersState = {
  members: sampleMembers,
  liveMembers: [],
  status: "loading",
  message: "Connecting to the member sheet…",
  headers: [],
  rowCount: 0,
  url: localStorage.getItem(URL_KEY) || DEFAULT_SHEET_URL,
  usingSamples: true,
  fetchedAt: null,
};
let started = false;

function setState(patch: Partial<MembersState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
}

function applyParse(res: ParseResult, status: SourceStatus, message: string) {
  const live = res.members;
  setState({
    liveMembers: live,
    members: live.length ? live : sampleMembers,
    usingSamples: live.length === 0,
    headers: res.headers,
    rowCount: res.rowCount,
    status: live.length ? status : status === "error" ? "error" : "empty",
    message,
    fetchedAt: Date.now(),
  });
}

export async function loadFromUrl(url: string) {
  setState({ status: "loading", message: "Connecting to the member sheet…", url });
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (/<html/i.test(text.slice(0, 200))) throw new Error("The link returned a web page, not TSV/CSV. Use a 'Publish to web' TSV or CSV link.");
    const parsed = parseMembers(text);
    if (parsed.members.length) {
      applyParse(parsed, "live", `Live sheet connected · ${parsed.members.length} member${parsed.members.length === 1 ? "" : "s"} loaded${parsed.mode === "rawBody" ? " (parsed from API payloads)" : ""}.`);
    } else {
      const hdr = parsed.headers.filter(Boolean).join(", ");
      applyParse(
        parsed,
        "empty",
        parsed.rowCount === 0
          ? `Sheet reachable, but it has no member rows yet${hdr ? ` (columns: ${hdr})` : ""}. Using sample members until data arrives.`
          : `Sheet reachable (${parsed.rowCount} rows) but no recognisable member fields${hdr ? ` in columns: ${hdr}` : ""}. Using sample members.`
      );
    }
  } catch (e) {
    applyParse({ members: [], headers: [], rowCount: 0, mode: "empty" }, "error", `Couldn't read the sheet (${e instanceof Error ? e.message : "network error"}). Using sample members.`);
  }
}

export function loadFromText(text: string) {
  const parsed = parseMembers(text);
  if (parsed.members.length) {
    localStorage.setItem(PASTE_KEY, text);
    applyParse(parsed, "pasted", `Pasted data loaded · ${parsed.members.length} member${parsed.members.length === 1 ? "" : "s"}.`);
    return parsed.members.length;
  }
  return 0;
}

export function clearPasted() {
  localStorage.removeItem(PASTE_KEY);
  void loadFromUrl(state.url);
}

export function setSheetUrl(url: string) {
  const u = url.trim() || DEFAULT_SHEET_URL;
  if (u === DEFAULT_SHEET_URL) localStorage.removeItem(URL_KEY);
  else localStorage.setItem(URL_KEY, u);
  localStorage.removeItem(PASTE_KEY);
  void loadFromUrl(u);
}

function start() {
  if (started) return;
  started = true;
  const pasted = localStorage.getItem(PASTE_KEY);
  if (pasted && loadFromText(pasted)) return;
  void loadFromUrl(state.url);
}

export function useMembers(): MembersState & { refresh: () => void } {
  const [s, setS] = useState(state);
  useEffect(() => {
    listeners.add(setS);
    start();
    setS(state);
    return () => {
      listeners.delete(setS);
    };
  }, []);
  const refresh = useCallback(() => {
    localStorage.removeItem(PASTE_KEY);
    void loadFromUrl(state.url);
  }, []);
  return { ...s, refresh };
}
