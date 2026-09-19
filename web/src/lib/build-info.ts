// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// What the footer advertises: which version of this site you are looking at.
//
// WHY THIS EXISTS
// On 2026-08-25 the Workers Builds Git connection had silently dropped and
// production served a seven-day-old build. Nothing on the page said so, and
// telling "today's deploy" from "the one from a week ago" took ten minutes of
// probing URLs. A build that cannot say what it is forces that every time.
//
// NEITHER VALUE IS WRITTEN BY HAND.
//   version -> web/package.json, read at build time
//   sha     -> WORKERS_CI_COMMIT_SHA, injected by Workers Builds
//              (developers.cloudflare.com/workers/ci-cd/builds/configuration/
//               "system environment variables ... injected by default")
//
// Local builds have no SHA. That is normal, not an error: it degrades to "dev"
// rather than failing the build, because a developer running `astro dev`
// should not need CI variables present.
import { CURRENT_VERSION } from "../data/updates";

/**
 * The newest entry of the site's timeline (web/src/data/updates.ts). The one
 * place the number is maintained — package.json's stays at 0.0.1 and is not
 * what the footer prints: a version with no entry beside it says nothing.
 */
export const VERSION: string = CURRENT_VERSION;

/** Short commit SHA of the build, or "dev" when built outside Workers Builds. */
export const COMMIT_SHA: string = (() => {
  const sha =
    import.meta.env.WORKERS_CI_COMMIT_SHA ??
    process.env.WORKERS_CI_COMMIT_SHA ??
    "";
  return sha ? sha.slice(0, 7) : "dev";
})();

/** True when the SHA is real and can be linked to a commit on GitHub. */
export const HAS_SHA: boolean = COMMIT_SHA !== "dev";

/** The commit this build came from, when known. */
export const COMMIT_URL: string | null = HAS_SHA
  ? `https://github.com/numengames/numinia-archive/commit/${COMMIT_SHA}`
  : null;

/** What the footer prints: "v0.0.1 · a1b2c3d". */
export const BUILD_LABEL: string = `${VERSION} · ${COMMIT_SHA}`;

/** The repository this site mirrors. */
export const REPO_URL = "https://github.com/numengames/numinia-archive";

/**
 * Link from a rendered page back to the file it was rendered from.
 *
 * Every page here is a view of a markdown file that lives in the repo; the
 * repo is the original and this is the copy. A reader who wants history,
 * blame, or the raw source should be one click away from it, not left to
 * guess the path.
 *
 * Astro's `entry.filePath` is relative to the web/ project ("../canon/CAN-001…"),
 * but that prefix is an implementation detail of where the site sits inside
 * the repo. Anchoring on the known top-level folders instead survives a move:
 * whatever comes before them is dropped.
 *
 * Returns null rather than a wrong URL when the path is not recognised — a
 * broken link into GitHub is worse than no link.
 */
const REPO_DIRS =
  "agents|blueprints|canon|decisions|guilds|history|missions|operations|protocols|reports|standards|system|debt|web";

export function repoFileUrl(filePath: string, branch = "main"): string | null {
  const rel = String(filePath).replace(/\\/g, "/");
  const m = rel.match(new RegExp(`(?:^|/)((?:${REPO_DIRS})/.+)$`));
  return m ? `${REPO_URL}/blob/${branch}/${m[1]}` : null;
}
