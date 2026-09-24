// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The pure half of the reading player (SpeechPlayer.astro): where a position
// in the spoken text falls, where a seek may land, and what the clock and the
// section label beside the ruler say. No DOM, no engine — arithmetic on the
// string the player speaks, so it is tested as that
// (machine/scripts/test/speech-position.test.mjs).

/** Sentence-ending marks. A seek never starts the voice after anything else. */
const TERMINAL = /[.!?…]/;

/**
 * The start of the sentence that holds `at`. A drop on the ruler goes here:
 * the voice starts at the head of a sentence, never mid-word or mid-clause.
 * Out-of-range positions are clamped, not thrown — a ruler can report -1 or
 * length+1 on a fast drag.
 */
export function sentenceStart(text: string, at: number): number {
  if (!text) return 0;
  let i = Math.max(0, Math.min(Math.floor(at), text.length - 1));
  // A position on the space after a mark belongs to the sentence that mark
  // closed; step back over whitespace first.
  while (i > 0 && text[i] === " ") i--;
  // The sentence begins after the nearest mark before `i` that is followed
  // by a space (so "3.5" or "e.g" mid-word does not split a sentence).
  for (let j = i - 1; j >= 0; j--) {
    if (TERMINAL.test(text[j]) && text[j + 1] === " ") {
      let s = j + 1;
      while (text[s] === " ") s++;
      return s;
    }
  }
  return 0;
}

/** Which chunk of the engine's queue holds `at`, and how far into it. */
export function locate(chunkStarts: readonly number[], at: number): { index: number; offset: number } {
  let index = 0;
  for (let k = 0; k < chunkStarts.length; k++) {
    if (chunkStarts[k] <= at) index = k;
    else break;
  }
  return { index, offset: Math.max(0, at - (chunkStarts[index] ?? 0)) };
}

/** m:ss, rounded to the second; never negative. */
export function clock(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Baseline speaking pace for every estimate the player shows. */
export const WPM = 180;

/** Seconds a document of `words` takes at `rate`. */
export function duration(words: number, rate: number): number {
  return (words / (WPM * rate)) * 60;
}

export interface Section {
  at: number;
  title: string;
}

/** The last section starting at or before `at` — what the dock names. */
export function sectionAt(sections: readonly Section[], at: number): { index: number; at: number; title: string } {
  if (!sections.length) return { index: 0, at: 0, title: "" };
  let index = 0;
  for (let k = 0; k < sections.length; k++) {
    if (sections[k].at <= at) index = k;
    else break;
  }
  return { index, at: sections[index].at, title: sections[index].title };
}

// ---- v4: sentence queue, spoken weight, gentle speeds -------------------

/** Longest utterance: engines cut long ones (Chrome at ~15 s). */
const MAX_UTTERANCE = 220;

/**
 * The queue the engine speaks: one sentence per utterance. Each utterance's
 * end is an exact, engine-reported moment, so the reading light re-syncs at
 * every sentence and an estimate can never drift more than one sentence.
 * A sentence longer than an engine will hold is cut at a comma, else a
 * space — never mid-word. Joined with single spaces, the parts are the text.
 */
export function sentences(text: string): string[] {
  const raw = text.match(/[^.!?…]+(?:[.!?…]+(?=\s|$)|$)|[.!?…]+/g) ?? [text];
  // Glue back what the regex split inside a word ("3.5", "e.g.x").
  const merged: string[] = [];
  let buf = "";
  for (const r of raw) {
    buf += r;
    if (/[.!?…]\s*$/.test(buf) || buf.length === 0) {
      merged.push(buf.trim());
      buf = "";
    }
  }
  if (buf.trim()) merged.push(buf.trim());
  const out: string[] = [];
  for (const s of merged.filter(Boolean)) {
    let rest = s;
    while (rest.length > MAX_UTTERANCE) {
      const head = rest.slice(0, MAX_UTTERANCE);
      let cut = head.lastIndexOf(", ");
      if (cut < MAX_UTTERANCE / 3) cut = head.lastIndexOf(" ");
      else cut += 1; // keep the comma with its clause
      if (cut <= 0) cut = MAX_UTTERANCE;
      out.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) out.push(rest);
  }
  return out;
}

/** Spoken length of one digit, in letters: "seven", "twenty" ≈ 5–6. */
const DIGIT = 5.5;

/**
 * How long a token takes to SAY, in letters of ordinary speech. A word
 * weighs its length; digits weigh what they are read out as ("1920" →
 * "nineteen twenty"), and a separator inside a number is a word of its own
 * ("point", "of"). This is what kept the light behind the voice on figures
 * and dates: they were counted as they are written.
 */
export function spokenWeight(token: string): number {
  let w = 0;
  for (let i = 0; i < token.length; i++) {
    const c = token[i];
    if (c >= "0" && c <= "9") w += DIGIT;
    else if (/[-/.:,]/.test(c) && /\d/.test(token[i - 1] ?? "") && /\d/.test(token[i + 1] ?? "")) w += 4;
    else w += 1;
  }
  return w;
}

/**
 * The character the voice has reached after `units` letters of speech
 * inside `sentence` — the estimate for engines that report no word
 * boundaries. Walks token by token by spoken weight; clamps to the end.
 */
export function charAtSpoken(sentence: string, units: number): number {
  let spent = 0;
  let i = 0;
  while (i < sentence.length) {
    let e = sentence.indexOf(" ", i);
    if (e < 0) e = sentence.length;
    const w = spokenWeight(sentence.slice(i, e)) + 1; // + the pause of the space
    if (spent + w > units) {
      const f = Math.max(0, units - spent) / w;
      return Math.min(e, i + Math.floor(f * (e - i)));
    }
    spent += w;
    i = e + 1;
  }
  return sentence.length;
}

/**
 * Speeds, in the order one button steps through them. From 1× the first
 * step is the gentle one (1.25); 1.75 is left out (nobody tells it from 2
 * and it is one more press); 0.75 closes the loop for whoever needs slower
 * (learning the language, reading difficulty).
 */
export const RATES = [1, 1.25, 1.5, 2, 0.75] as const;

export function nextRate(rate: number): number {
  const i = (RATES as readonly number[]).indexOf(rate);
  return i < 0 ? 1 : RATES[(i + 1) % RATES.length];
}
