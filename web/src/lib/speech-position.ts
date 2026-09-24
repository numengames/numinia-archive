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
