// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// When each version of the site shipped, and from which commit — read from
// git at build time, never typed by hand.
//
// A version is born in the commit that first writes `version: "vX.Y.Z"` into
// web/src/data/updates.ts. On main every pull request lands as one squashed
// commit, so that commit IS the build the version names, and its commit time
// is when it reached production. /updates prints both beside each version:
// the hour in Central European Time and the short SHA linked to GitHub.
//
// A shallow checkout has no history to read. The build then asks origin for
// the rest once (`git fetch --unshallow`); if that fails too — no network,
// no remote — the versions keep their date and simply show no hour or
// commit. A missing stamp never breaks the build.
import { execFileSync } from "node:child_process";
import { REPO_URL } from "./build-info";

export interface UpdateStamp {
  /** Full commit SHA of the build that shipped the version. */
  readonly sha: string;
  /** Seven-character SHA, what the page prints. */
  readonly short: string;
  readonly url: string;
  /** ISO 8601 commit time, with its offset. */
  readonly iso: string;
  /** Wall-clock time in Central European Time, "HH:MM CEST" / "HH:MM CET". */
  readonly time: string;
}

// The build runs inside web/, so the working directory is inside the
// repository; ":/" anchors the path at its root, wherever the bundle lives.
const FILE = ":/web/src/data/updates.ts";

function git(args: string[]): string {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function ensureHistory(): boolean {
  try {
    if (git(["rev-parse", "--is-shallow-repository"]) !== "true") return true;
    git(["fetch", "--quiet", "--unshallow", "origin"]);
    return git(["rev-parse", "--is-shallow-repository"]) !== "true";
  } catch {
    return false;
  }
}

const CET = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Madrid",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZoneName: "short",
});

/** "16:58 CEST" — the zone's own short name (CET in winter, CEST in summer). */
function cet(d: Date): string {
  const parts = CET.formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const zone = get("timeZoneName").replace(/^GMT\+2$/, "CEST").replace(/^GMT\+1$/, "CET");
  return `${get("hour")}:${get("minute")} ${zone}`;
}

/** Map version → the commit that introduced it. Empty when git is absent. */
export function readUpdateStamps(versions: readonly string[]): Map<string, UpdateStamp> {
  const out = new Map<string, UpdateStamp>();
  if (!ensureHistory()) return out;
  for (const v of versions) {
    let line = "";
    try {
      line = git(["log", "--reverse", "--format=%H %cI", `-Sversion: "${v}"`, "--", FILE]).split("\n")[0] ?? "";
    } catch {
      continue;
    }
    const [sha, iso] = line.split(" ");
    if (!sha || !iso) continue;
    out.set(v, {
      sha,
      short: sha.slice(0, 7),
      url: `${REPO_URL}/commit/${sha}`,
      iso,
      time: cet(new Date(iso)),
    });
  }
  return out;
}
