// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The header block every document opens with, read from the file.
//
// WHY THIS EXISTS
// `STD-004` says each document opens with a quoted block: Summary, Epistemic
// (what you learn by reading it), Pragmatic (what you can do with it) and
// Audience. It is the single most useful convention in the corpus and the
// home had no way to show it — so the home described the archive instead of
// showing how a document announces itself.
//
// This reads the block out of the canonical .md at build time. Nothing is
// transcribed: if the document's Epistemic line changes, the home changes
// with it, and if the block disappears the build fails rather than printing
// a stale sentence.
import fs from "node:fs";
import path from "node:path";

const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");

export interface DocHeader {
  summary: string;
  epistemic: string;
  pragmatic: string;
  audience: string;
}

/** The quoted header block of a corpus document, by repo-relative path. */
export function headerOf(relPath: string): DocHeader {
  const abs = path.join(ARCHIVE_ROOT, relPath);
  let raw: string;
  try {
    raw = fs.readFileSync(abs, "utf-8");
  } catch {
    throw new Error(
      `headerOf("${relPath}"): no such file under the archive root. ` +
        `A page quotes a document that has moved or been renamed.`,
    );
  }

  // Fields are one per line, may wrap onto continuation lines of the same
  // quoted block, and always start with "> **Name:**".
  const lines = raw.split("\n");
  const fields: Record<string, string> = {};
  let current: string | null = null;
  for (const line of lines) {
    if (!line.startsWith(">")) {
      if (current) break; // the block ended
      continue;
    }
    const body = line.replace(/^>\s?/, "");
    const start = body.match(/^\*\*(Summary|Epistemic|Pragmatic|Audience):\*\*\s*(.*)$/);
    if (start) {
      current = start[1].toLowerCase();
      fields[current] = start[2].trim();
    } else if (current) {
      fields[current] = `${fields[current]} ${body.trim()}`.trim();
    }
  }

  for (const key of ["summary", "epistemic", "pragmatic", "audience"]) {
    if (!fields[key]) {
      throw new Error(
        `headerOf("${relPath}"): the document has no **${key}** line. ` +
          `STD-004 requires it, and a page renders it.`,
      );
    }
  }

  return {
    summary: fields.summary,
    epistemic: fields.epistemic,
    pragmatic: fields.pragmatic,
    audience: fields.audience,
  };
}
