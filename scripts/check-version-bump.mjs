#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-version-bump — a change to the site must say what it changed.
//
// THE RULE (Oracle, 2026-09-16): every pull request that touches web/src/**
// adds an entry to web/src/data/updates.ts and raises the version. The
// footer prints that version and links to /updates; a site whose version
// never moves tells the reader nothing, and a timeline nobody is forced to
// write goes stale in two weeks.
//
// HOW: compare the PR head against its merge base. If any file under
// web/src/ changed and the newest version in updates.ts is the same as on
// the base, fail with the exact instruction. Changes that touch only
// updates.ts itself (a correction to an entry) are allowed without a bump.
//
// Usage: node scripts/check-version-bump.mjs [--base <ref>]   (default origin/main)
import { execSync } from "node:child_process";
import { declareBlindSpots } from "./lib/blindness.mjs";
declareBlindSpots("check-version-bump");

const args = process.argv.slice(2);
const baseArg = args.indexOf("--base");
const base = baseArg >= 0 ? args[baseArg + 1] : "origin/main";
const UPDATES = "web/src/data/updates.ts";

const sh = (cmd) => execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

let mergeBase;
try {
  mergeBase = sh(`git merge-base ${base} HEAD`);
} catch {
  console.log(`check-version-bump: cannot resolve ${base}; skipping (not a PR context).`);
  process.exit(0);
}

const changed = sh(`git diff --name-only ${mergeBase} HEAD`).split("\n").filter(Boolean);
const siteChanged = changed.filter((f) => f.startsWith("web/src/") && f !== UPDATES);

if (siteChanged.length === 0) {
  console.log("check-version-bump: no change under web/src — nothing to record.");
  process.exit(0);
}

const versionOf = (source) => {
  // The first `version: "vX.Y.Z"` in the file is the newest (newest first).
  const m = /version:\s*"(v\d+\.\d+\.\d+)"/.exec(source);
  return m ? m[1] : null;
};

const headVersion = versionOf(sh(`git show HEAD:${UPDATES}`));
let baseVersion = null;
try {
  baseVersion = versionOf(sh(`git show ${mergeBase}:${UPDATES}`));
} catch {
  // updates.ts did not exist on the base: this is the PR that introduces it.
}

if (!headVersion) {
  console.error(`check-version-bump: ${UPDATES} has no version entry.`);
  process.exit(1);
}

if (baseVersion && baseVersion === headVersion) {
  console.error(
    `check-version-bump: ${siteChanged.length} file(s) under web/src changed and the version is still ${headVersion}.\n` +
      `  Add an entry at the top of ${UPDATES} with the next version and what this change does for a visitor.\n` +
      `  Changed: ${siteChanged.slice(0, 8).join(", ")}${siteChanged.length > 8 ? ", …" : ""}`,
  );
  process.exit(1);
}

console.log(`check-version-bump: ${baseVersion ?? "(none)"} → ${headVersion}, ${siteChanged.length} site file(s) changed.`);
