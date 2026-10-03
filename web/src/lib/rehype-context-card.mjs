// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The context card: turn the corpus' four-line header into a readable block.
//
// 201 documents open with the same blockquote:
//
//   > **Summary:** ...
//   > **Epistemic:** ...
//   > **Pragmatic:** ...
//   > **Audience:** Agents · Oracles
//
// In markdown those are four lines of ONE paragraph, separated by soft breaks.
// Rendered, the browser reflows them into a single grey wall where the labels
// are indistinguishable from the prose — the reader cannot see where "what you
// learn" ends and "what you can do" begins. It is the first thing on every
// document page and the worst-formatted thing on it.
//
// This rewrites that blockquote into a definition list, one row per field,
// label and value on their own axes. Nothing is added or dropped: the same
// text, given structure. Styling lives in styles/global.css (.context-card).
//
// DELIBERATELY CONSERVATIVE. It fires only when the blockquote is a single
// paragraph whose first child is a <strong> ending in ":". Any other
// blockquote — a real quotation, a warning, a nested structure — is left
// exactly as it was. A false positive here would mangle principle text.
import { visit } from "unist-util-visit";

const isStrongLabel = (node) =>
  node?.type === "element" &&
  node.tagName === "strong" &&
  node.children?.length === 1 &&
  node.children[0].type === "text" &&
  /:\s*$/.test(node.children[0].value);

const textOf = (node) =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map(textOf).join("");

export default function rehypeContextCard() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "blockquote") return;

      const paras = node.children.filter(
        (c) => c.type === "element" && c.tagName === "p"
      );
      if (paras.length !== 1) return;

      const kids = paras[0].children.filter(
        (c) => !(c.type === "text" && !c.value.trim())
      );
      if (!isStrongLabel(kids[0])) return;

      // Split the flat run of children into [label, ...value] groups.
      const rows = [];
      for (const child of kids) {
        if (isStrongLabel(child)) {
          rows.push({ label: textOf(child).replace(/:\s*$/, ""), value: [] });
        } else if (rows.length) {
          rows[rows.length - 1].value.push(child);
        }
      }
      // Trim the soft line break that ends every value but the last.
      for (const row of rows) {
        while (
          row.value.length &&
          ((row.value.at(-1).type === "text" && !row.value.at(-1).value.trim()) ||
            (row.value.at(-1).type === "element" &&
              row.value.at(-1).tagName === "br"))
        ) {
          row.value.pop();
        }
        if (row.value[0]?.type === "text") {
          row.value[0] = {
            ...row.value[0],
            value: row.value[0].value.replace(/^\s+/, ""),
          };
        }
      }
      if (rows.length < 2) return;

      // Label each row with its own class instead of styling by position.
      // Not every document uses the four canonical fields -- audits carry
      // "Norm audited against", missions carry "Track" and "Effort" -- so
      // "the last row is the audience" is false in 62 of the 208 cards.
      // The slug says what a row IS; CSS can then treat Summary and Audience
      // specially and leave the rest in the default voice.
      const slug = (s) =>
        "ctx-" +
        s
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      node.tagName = "dl";
      node.properties = { className: ["context-card"] };
      node.children = rows.flatMap((row) => [
        {
          type: "element",
          tagName: "dt",
          properties: { className: [slug(row.label)] },
          children: [{ type: "text", value: row.label }],
        },
        {
          type: "element",
          tagName: "dd",
          properties: { className: [slug(row.label)] },
          children: row.value,
        },
      ]);
    });
  };
}
