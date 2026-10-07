// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The reader's day on /system/pipeline: which records are due today, in the
// next seven days, in a range of dates, or match a search. Plain JavaScript,
// no DOM, so the page's script and the tests run the same functions.
//
// Why this runs in the browser. A static site is built once and read on
// many days, so the build cannot know what "today" is for the reader. The
// tool computes every verdict about a record — its stage, its next step and
// date, its deadline, its chance — and the page carries them as data; this
// module only places those dates against the reader's calendar day: a step
// whose day has passed is late until the record's timeline moves on, and
// Today holds the late steps and the day's own.
//
// A row is { id, kind, open, next, closes, closed, chance, value, q }:
// days as YYYY-MM-DD (or "" when absent), `q` the lower-cased text a search
// reads.

export const AGENDAS = ['today', 'week', 'open', 'closed'];
export const RANGES = ['any', '7', '30', '90', 'custom'];
export const CHANCE_ORDER = { high: 0, medium: 1, low: 2 };

const pad = (n) => String(n).padStart(2, '0');
/** The reader's calendar day, YYYY-MM-DD, in their own time zone. */
export const localDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
/** A calendar day moved by n days. */
export function addDays(day, n) {
  const [y, m, d] = day.split('-').map(Number);
  return localDay(new Date(y, m - 1, d + n));
}
/** Whole days from `a` to `b` (both YYYY-MM-DD). */
export function daysBetween(a, b) {
  const t = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
  return Math.round((t(b) - t(a)) / 864e5);
}

/** The clock the page reads: the reader's day. */
export const clock = (now) => ({ today: localDay(now) });

/** Late: an open record whose next step's day has passed. */
export const isLate = (r, c) => !!(r.open && r.next && r.next < c.today);

/** Which group of the list a row sits in, by its next step against the reader's day. */
export function groupOf(r, c) {
  if (!r.open) return 'closed';
  if (!r.next) return 'later';
  if (r.next < c.today) return 'late';
  if (r.next === c.today) return 'today';
  return r.next <= addDays(c.today, 7) ? 'week' : 'later';
}

/** The four agenda buttons. */
export function inAgenda(r, agenda, c) {
  if (agenda === 'closed') return !r.open;
  if (!r.open) return false;
  if (agenda === 'today') return isLate(r, c) || r.next === c.today;
  if (agenda === 'week') {
    const end = addDays(c.today, 7);
    return (!!r.next && r.next <= end) || (!!r.closes && r.closes >= c.today && r.closes <= end);
  }
  return true;
}

/**
 * The When filter. A preset (7, 30, 90 days) keeps what falls between today
 * and that day — the next step or the deadline — and always keeps what is
 * already late. Custom keeps what falls between two days, either one open.
 * A closed record is placed by the day it closed.
 */
export function inRange(r, range, c, from = '', to = '') {
  if (range === 'any') return true;
  const custom = range === 'custom';
  const lo = custom ? from || '0000-00-00' : c.today;
  const hi = custom ? to || '9999-99-99' : addDays(c.today, Number(range));
  const days = r.open ? [r.next, r.closes].filter(Boolean) : [r.closed].filter(Boolean);
  if (days.some((d) => d >= lo && d <= hi)) return true;
  return !custom && !!r.open && !!r.next && r.next < c.today;
}

/** The search: every word must appear in the row's text. */
export function matches(r, q) {
  const words = String(q ?? '').toLowerCase().split(/\s+/).filter(Boolean);
  return words.every((w) => r.q.includes(w));
}

/** Sort by the next step's day (closed: newest first), or by the tool's chance, then the day. */
export function sortRows(rows, by) {
  const day = (r) => (r.open ? r.next || '9999' : r.closed || '');
  return [...rows].sort((a, b) => {
    if (a.open !== b.open) return a.open ? -1 : 1;
    if (!a.open) return day(b).localeCompare(day(a));
    if (by === 'chance') {
      const d = (CHANCE_ORDER[a.chance] ?? 9) - (CHANCE_ORDER[b.chance] ?? 9);
      if (d) return d;
    }
    return day(a).localeCompare(day(b)) || a.id.localeCompare(b.id);
  });
}

/** "3 days late", "today", "tomorrow", "in 5 days" — a day against the reader's. */
export function relative(day, c) {
  const n = daysBetween(c.today, day);
  if (n < -1) return `${-n} days late`;
  if (n === -1) return '1 day late';
  if (n === 0) return 'today';
  if (n === 1) return 'tomorrow';
  return `in ${n} days`;
}

/** The same, for a deadline: past ones are "passed". */
export const left = (day, c) => (day < c.today ? 'passed' : relative(day, c));

/** Every filter together: what the list and the timeline show. */
export const visible = (r, s, c) =>
  inAgenda(r, s.agenda, c) && (s.kind === 'all' || r.kind === s.kind) && inRange(r, s.range, c, s.from, s.to) && matches(r, s.q);
