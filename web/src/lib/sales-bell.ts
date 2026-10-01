// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The sales bell in the bar: every open opportunity's next step, as the
// pipeline tool computes it (its `due` list, through src/lib/pipeline.ts).
// Nothing here is typed: the date and the step are each record's `next`
// line, the address is the record's page.
//
// A static site is built once and read on many days, so the build cannot
// know which steps are due "today". The bell ships every open step with its
// day; the reader's browser shows a step from NOON of its day onwards
// (RING_HOUR, the Oracle's choice of 1 October 2026: the day's sales
// notifications arrive at 12) and keeps showing it, as overdue, until the
// record's timeline moves on.
//
// Read once per build: the bar is on every page, the tool runs once.
import { pipeline, KIND_LABEL, type Kind } from "@/lib/pipeline";

/** The hour, reader's local time, at which a day's steps ring. */
export const RING_HOUR = 12;

export interface BellItem {
  id: string;
  kind: Kind;
  kindLabel: string;
  title: string;
  /** the `next` line's day, YYYY-MM-DD */
  date: string;
  action: string;
  /** the record's page, made at build time */
  url: string;
}

let cached: BellItem[] | null = null;

/** Every open record's next step, earliest first. */
export function bellItems(): BellItem[] {
  if (cached) return cached;
  const F = pipeline();
  const byId = Object.fromEntries(F.records.map((r) => [r.id, r]));
  cached = F.due.map((d) => ({
    id: d.id,
    kind: d.kind,
    kindLabel: KIND_LABEL[d.kind],
    title: byId[d.id]?.title ?? d.id,
    date: d.date,
    action: d.action,
    url: byId[d.id]?.url ?? "/system/pipeline",
  }));
  return cached;
}
