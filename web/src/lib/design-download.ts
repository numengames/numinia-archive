// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The design system as one download: a zip a designer opens and works from.
//
// WHAT GOES IN, AND WHY IT IS NOT A LIST KEPT HERE
// Every document SYS-009 names, whole and as its own file, plus the whole
// system compiled into one design-system.md; every toolkit row (tokens, kit,
// fonts, icons, brand, pixel, matter, templates) copied as it is in the
// repository. Add a row to the register and the zip carries it next build.
//
// LICENCES ARE PER FILE
// The download mixes regimes — CC0 prose, MIT code, OFL fonts, Phosphor's
// MIT icons, and the scarab, which is a trademark and is licensed to nobody.
// So LICENSES.md lists every file with the licence it declares itself or, for
// a file that cannot hold a comment, the one REUSE.toml records for that exact
// path. Never one line for a folder: a folder holds more than one regime.
//
// NO DEPENDENCY
// A zip is a few headers and deflated bytes. Node has deflateRawSync and
// crc32 (22.2+; the site needs 22.12), so the writer below is forty lines
// and nothing is installed for it.
import fs from "node:fs";
import path from "node:path";
import { crc32, deflateRawSync } from "node:zlib";
import { parseAnnotations, licenceOfFile } from "../../../machine/scripts/lib/reuse.mjs";
import { entries, documents, compiled, REGISTER, DEFINITION, OPENING_QUOTE } from "@/lib/design-system";

const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");
export const ZIP_NAME = "numinia-design-system.zip";
const TOP = "numinia-design-system";

// Read here, not through reuse.mjs's own loader: bundled, that loader looks for
// REUSE.toml next to the chunk and silently finds none (machine-index.ts).
const ANNOTATIONS = parseAnnotations(fs.readFileSync(path.join(ARCHIVE_ROOT, "REUSE.toml"), "utf8"));

interface File {
  name: string;
  data: Buffer;
}

/** A minimal zip: deflate, one central directory, no zip64 (the kit is ~2 MB). */
export function zip(files: File[]): Buffer {
  const local: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  // A fixed timestamp keeps the zip byte-identical for identical content.
  const DOS_TIME = 0;
  const DOS_DATE = (2026 - 1980) << 9 | 1 << 5 | 1;
  for (const f of files) {
    const name = Buffer.from(f.name, "utf8");
    const packed = deflateRawSync(f.data, { level: 9 });
    const crc = crc32(f.data) >>> 0;
    const h = Buffer.alloc(30);
    h.writeUInt32LE(0x04034b50, 0);
    h.writeUInt16LE(20, 4);
    h.writeUInt16LE(0x0800, 6); // UTF-8 names
    h.writeUInt16LE(8, 8); // deflate
    h.writeUInt16LE(DOS_TIME, 10);
    h.writeUInt16LE(DOS_DATE, 12);
    h.writeUInt32LE(crc, 14);
    h.writeUInt32LE(packed.length, 18);
    h.writeUInt32LE(f.data.length, 22);
    h.writeUInt16LE(name.length, 26);
    h.writeUInt16LE(0, 28);
    local.push(h, name, packed);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0);
    c.writeUInt16LE(20, 4);
    c.writeUInt16LE(20, 6);
    c.writeUInt16LE(0x0800, 8);
    c.writeUInt16LE(8, 10);
    c.writeUInt16LE(DOS_TIME, 12);
    c.writeUInt16LE(DOS_DATE, 14);
    c.writeUInt32LE(crc, 16);
    c.writeUInt32LE(packed.length, 20);
    c.writeUInt32LE(f.data.length, 24);
    c.writeUInt16LE(name.length, 28);
    c.writeUInt32LE(offset, 42);
    central.push(c, name);
    offset += h.length + name.length + packed.length;
  }
  const dir = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(dir.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, dir, end]);
}

/** Every file under a repo-relative folder, sorted, as repo-relative paths. */
function walk(rel: string): string[] {
  const abs = path.join(ARCHIVE_ROOT, rel);
  if (!fs.statSync(abs).isDirectory()) return [rel];
  return fs
    .readdirSync(abs)
    .sort()
    .flatMap((n) => walk(path.posix.join(rel, n)));
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** The files of the download: where each comes from and where it lands. */
export function contents(): { from: string | null; to: string; data: Buffer }[] {
  const all = entries();
  const out: { from: string | null; to: string; data: Buffer }[] = [];
  out.push({ from: null, to: "design-system.md", data: Buffer.from(compiled(all)) });
  for (const d of documents(all)) {
    out.push({ from: d.path!, to: `documents/${d.path}`, data: fs.readFileSync(path.join(ARCHIVE_ROOT, d.path!)) });
  }
  const seen = new Set<string>();
  for (const t of all.filter((e) => e.part === "Toolkit" && e.path)) {
    const base = t.path!.replace(/\/$/, "");
    for (const rel of walk(base)) {
      if (seen.has(rel)) continue;
      // A folder row does not re-carry what a narrower row already placed.
      if (t.folder && all.some((o) => o !== t && o.path && o.path !== t.path && rel.startsWith(o.path.replace(/\/$/, "") + "/") && o.path.startsWith(base + "/"))) continue;
      seen.add(rel);
      const inside = t.folder ? path.posix.relative(base, rel) : path.posix.basename(rel);
      out.push({ from: rel, to: `${slug(t.chapter)}/${inside}`, data: fs.readFileSync(path.join(ARCHIVE_ROOT, rel)) });
    }
  }
  return out;
}

function readme(files: { to: string }[]): string {
  const folders = [...new Set(files.map((f) => f.to.split("/")[0]).filter((n) => !n.includes(".")))];
  return [
    "# The Numinia Design System",
    "",
    `> ${OPENING_QUOTE.text}`,
    `> — ${OPENING_QUOTE.author} (translated)`,
    "",
    DEFINITION,
    "",
    "## Start here",
    "",
    "- `design-system.md` — the whole system in one document: the core, the languages, every rule, every value, every recipe.",
    "- `documents/` — the same documents one by one, as the archive holds them.",
    ...folders.filter((f) => f !== "documents").map((f) => `- \`${f}/\` — from the toolkit.`),
    "- `LICENSES.md` — the licence of every file. The scarab and the wordmarks are trademarks: use them only as the brand, never as your own.",
    "",
    "## Where it comes from",
    "",
    `Compiled from the register \`${REGISTER}\` of https://github.com/numengames/numinia-archive at build time.`,
    "The documents are the source; this download is a view of them. Cite the documents, not this file.",
    "The living version is at https://numinia.org/design.",
    "",
  ].join("\n");
}

function licences(files: { from: string | null; to: string }[]): string {
  const rows = files.map((f) => {
    // A licence text is exempt by name in REUSE: it IS the declaration.
    const lic = !f.from
      ? "CC0-1.0 (compiled from CC0 documents)"
      : /(^|\/)LICENSE[^/]*$/.test(f.from)
        ? "the licence text itself"
        : licenceOfFile(f.from, { root: ARCHIVE_ROOT, annotations: ANNOTATIONS }) ?? "undeclared";
    return `| \`${f.to}\` | ${lic} | ${f.from ? `\`${f.from}\`` : "generated"} |`;
  });
  const undeclared = rows.filter((r) => r.includes("| undeclared |"));
  if (undeclared.length) {
    throw new Error(`design download: ${undeclared.length} file(s) with no declared licence:\n${undeclared.join("\n")}`);
  }
  return [
    "# Licences, file by file",
    "",
    "Every file of this download, with the licence it declares itself or the one REUSE.toml records",
    "for its exact path. There is no licence per folder: a folder can hold more than one.",
    "",
    "| File | Licence | From |",
    "|---|---|---|",
    ...rows,
    "",
  ].join("\n");
}

/** The zip, ready to serve. */
export function designZip(): Buffer {
  const files = contents();
  const all = [
    { to: "README.md", data: Buffer.from(readme(files)) },
    { to: "LICENSES.md", data: Buffer.from(licences(files)) },
    ...files,
  ];
  return zip(all.map((f) => ({ name: `${TOP}/${f.to}`, data: f.data })));
}
