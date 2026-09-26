#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Design System kit publisher (MIS-068 first case: the emitter publishes).
//
// The source is the package `machine/packages/design-kit/` — sistema.css, sistema.js,
// sistema.tokens.json, sistema.prompt.txt — versioned by its own
// package.json. This script publishes it under the public path with a
// sha256 manifest:
//
//   web/public/design/kit/sistema.{css,js,tokens.json,prompt.txt}
//   web/public/design/kit/manifest.json
//
// The path carries no version (Oracle ruling 2026-09-05); the manifest does.
//
// Until ADR-044 the CSS and JS lived as fenced blocks inside the design
// standard and were extracted by `<!-- kit:css -->` markers. A stylesheet in
// a Markdown file cannot be installed by another repository, so nwos-deploy
// and numinia-web kept hand copies that drifted (v5.0.0 under a v6.0.0
// master). The package is the source; every consumer, this site included,
// takes the file from it.
//
// Run from anywhere: node machine/tools/generate-design-kit.mjs
//   --check   verify the published kit is byte-identical to the source
//             (exit 1 on drift) instead of writing it.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkgDir = path.join(root, "packages", "design-kit");
// root is machine/; the site lives beside it, at the repository root.
const kitDir = path.join(root, "..", "web", "public", "design", "kit");
const check = process.argv.includes("--check");

const pkgPath = path.join(pkgDir, "package.json");
if (!fs.existsSync(pkgPath))
  throw new Error(`Design kit package not found: machine/packages/design-kit/package.json`);
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
const version = pkg.version;
if (!/^\d+\.\d+\.\d+$/.test(version))
  throw new Error(`machine/packages/design-kit/package.json version is not semver: ${version}`);

const read = (name) => {
  const p = path.join(pkgDir, name);
  if (!fs.existsSync(p)) throw new Error(`Missing in the package: machine/packages/design-kit/${name}`);
  return fs.readFileSync(p, "utf-8");
};

const stamp = `/* GENERADO de machine/packages/design-kit (@numengames/design-kit v${version}) — no editar aquí: la fuente es el paquete */\n`;

// The tokens are re-stamped with the package version so a consumer reading
// only the JSON knows which kit it holds.
const tokens = JSON.parse(read("sistema.tokens.json"));
tokens["$description"] = `Numinia Design System · v${version} · Solar 40 / Steam 40 / Cyber 20`;

const files = {
  "sistema.css": stamp + read("sistema.css"),
  "sistema.js": stamp + read("sistema.js"),
  "sistema.tokens.json": JSON.stringify(tokens, null, 2) + "\n",
  "sistema.prompt.txt": read("sistema.prompt.txt"),
};

const sha = (s) => createHash("sha256").update(s).digest("hex");
const manifest = {
  sistema: "Numinia Design System",
  version,
  source: {
    package: pkg.name,
    path: "machine/packages/design-kit",
    url: "https://github.com/numengames/numinia-archive/tree/main/machine/packages/design-kit",
  },
  rules: {
    id: "STD-008",
    url: "https://numinia.org/standards/std-008-design-tokens",
  },
  system: {
    id: "SYS-009",
    url: "https://numinia.org/design",
  },
  files: {},
};
for (const [name, content] of Object.entries(files)) manifest.files[name] = sha(content);
const manifestOut = JSON.stringify(manifest, null, 2) + "\n";

if (check) {
  const drift = [];
  for (const [name, content] of Object.entries({ ...files, "manifest.json": manifestOut })) {
    const p = path.join(kitDir, name);
    if (!fs.existsSync(p) || fs.readFileSync(p, "utf-8") !== content) drift.push(name);
  }
  if (drift.length) {
    console.error(`generate-design-kit --check: published kit differs from machine/packages/design-kit for: ${drift.join(", ")}`);
    console.error("Run `node machine/tools/generate-design-kit.mjs` and commit the result (GIT-027).");
    process.exit(1);
  }
  console.log(`generate-design-kit --check: kit v${version} is byte-identical to the package.`);
  process.exit(0);
}

fs.mkdirSync(kitDir, { recursive: true });
for (const [name, content] of Object.entries(files)) fs.writeFileSync(path.join(kitDir, name), content);
fs.writeFileSync(path.join(kitDir, "manifest.json"), manifestOut);
console.log(`kit v${version} → web/public/design/kit/`);
for (const [f, h] of Object.entries(manifest.files)) console.log(`${h.slice(0, 12)}…  ${f}`);
