// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// A link between two documents points at the page, not at the file.
//
// Some documents link their neighbours the way a repository does:
// `[Ursa](ursa/SOUL.md)`, `[Adigital](adigital.md)`. On GitHub that is right.
// On the site the browser resolves it against the page's own address, so
// /agents/ sent readers to /agents/ursa/SOUL.md and /stakeholders/readme/ to
// /stakeholders/readme/adigital.md — 22 links that 404'd (2026-10-10).
//
// This resolves every relative `.md` link against the source file's folder
// and writes the address the site serves that file at:
//   agents/INDEX.md          → /agents
//   agents/<id>/SOUL.md      → /agents/<id>
//   <folder>/<NAME>.md       → /<folder>/<name>   (lower case, as every series)
// The source file is not edited, so the link still works on GitHub.
// machine/scripts/test/internal-links.test.mjs holds the result on the build.

import path from "node:path";
import { visit } from "unist-util-visit";

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");

/** Repository path of a document (`agents/ursa/SOUL.md`) → the site address. */
export function siteAddressOf(repoPath) {
  const p = repoPath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (p === "agents/INDEX.md") return "/agents";
  const soul = /^agents\/([^/]+)\/SOUL\.md$/.exec(p);
  if (soul) return `/agents/${soul[1]}`;
  const doc = /^(.+)\.md$/i.exec(p);
  return doc ? `/${doc[1].toLowerCase()}` : null;
}

/** The repository path of the file being rendered, if the pipeline gives one. */
function sourceOf(file) {
  const abs = file?.path ?? file?.history?.[0];
  if (!abs) return null;
  const rel = path.relative(REPO_ROOT, path.resolve(abs)).split(path.sep).join("/");
  return rel.startsWith("..") ? null : rel;
}

export default function rehypeDocLinks() {
  return (tree, file) => {
    const source = sourceOf(file);
    if (!source) return;
    const folder = path.posix.dirname(source);
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string") return;
      const m = /^([^:#?]+\.md)(#.*)?$/i.exec(href);
      if (!m || href.startsWith("/")) return;
      const target = path.posix.normalize(path.posix.join(folder === "." ? "" : folder, m[1]));
      if (target.startsWith("..")) return;
      const address = siteAddressOf(target);
      if (address) node.properties.href = address + (m[2] ?? "");
    });
  };
}
