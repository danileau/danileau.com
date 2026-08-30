/**
 * Notes are Markdown; the browser gets JSON.
 *
 * A Vite plugin reads src/content/notes/<slug>.<lang>.md at build time, parses
 * it into the Block shape <Prose> already renders, and serves it as the virtual
 * module "virtual:notes". No parser reaches the bundle, and `npm run dev`
 * reloads on save.
 *
 * The syntax is what Obsidian already renders, so a note is readable and
 * previewable in the editor it was written in:
 *
 *   ## 01 — The cache | The perfect tool nobody uses      heading, eyebrow | title
 *   > plain text                                          pull-out quote
 *   > [!warning] Title                                    callout, cherry
 *   > [!tip] Title                                        callout, mint
 *   :::pull                                               the big centred line
 *   one line per line
 *   :::
 *
 * Inline: **bold**, *italic*, `mono` — handled by <Prose>, not here.
 *
 * The build FAILS on a note that exists in one language and not the other, or
 * whose two versions disagree on block structure. A half-translated note must
 * not be publishable; that guarantee used to come from TypeScript and it is not
 * being given up just because the source is now prose.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/content/notes";
const TONE = { warning: "warn", caution: "warn", danger: "warn", tip: "fix", success: "fix", info: "fix" };
const REQUIRED = ["slug", "no", "title", "standfirst", "topic", "date"];

const splitFrontmatter = (raw, file) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter block`);
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const at = line.indexOf(":");
    if (at === -1) throw new Error(`${file}: frontmatter line is not "key: value" — ${line}`);
    meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  const missing = REQUIRED.filter((k) => !meta[k]);
  if (missing.length) throw new Error(`${file}: frontmatter missing ${missing.join(", ")}`);
  return [meta, m[2]];
};

/** Markdown body -> Block[] */
const parseBody = (body, file) => {
  const blocks = [];
  const chunks = body.split(/\r?\n[ \t]*\r?\n/);

  for (const raw of chunks) {
    const chunk = raw.trim();
    if (!chunk) continue;

    if (chunk.startsWith("## ")) {
      const [num, ...rest] = chunk.slice(3).split("|");
      if (!rest.length) throw new Error(`${file}: heading needs "eyebrow | title" — ${chunk}`);
      blocks.push({ t: "h2", num: num.trim(), text: rest.join("|").trim() });
      continue;
    }

    if (chunk.startsWith(":::pull")) {
      const lines = chunk
        .split(/\r?\n/)
        .slice(1)
        .filter((l) => l.trim() !== ":::" && l.trim() !== "");
      if (!lines.length) throw new Error(`${file}: empty :::pull block`);
      blocks.push({ t: "pull", lines: lines.map((l) => l.trim()) });
      continue;
    }

    if (chunk.startsWith(">")) {
      const inner = chunk.split(/\r?\n/).map((l) => l.replace(/^>[ \t]?/, ""));
      const callout = inner[0].match(/^\[!(\w+)\]\s*(.*)$/);
      if (callout) {
        const tone = TONE[callout[1].toLowerCase()];
        if (!tone) throw new Error(`${file}: unknown callout type [!${callout[1]}]`);
        const paras = inner
          .slice(1)
          .join("\n")
          .split(/\n\s*\n/)
          .map((p) => p.replace(/\s+/g, " ").trim())
          .filter(Boolean);
        if (!callout[2].trim()) throw new Error(`${file}: callout needs a title`);
        blocks.push({ t: "note", tone, title: callout[2].trim(), paras });
      } else {
        blocks.push({ t: "quote", text: inner.join(" ").replace(/\s+/g, " ").trim() });
      }
      continue;
    }

    blocks.push({ t: "p", text: chunk.replace(/\s+/g, " ").trim() });
  }
  return blocks;
};

const readNotes = (root) => {
  const dir = join(root, DIR);
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  const byLang = { en: [], de: [] };
  const seen = {};

  for (const file of files.sort()) {
    const m = file.match(/^(.+)\.(en|de)\.md$/);
    if (!m) throw new Error(`${file}: expected <slug>.en.md or <slug>.de.md`);
    const [, slug, lang] = m;
    const [meta, body] = splitFrontmatter(readFileSync(join(dir, file), "utf8"), file);
    if (meta.slug !== slug) throw new Error(`${file}: frontmatter slug "${meta.slug}" does not match the filename`);
    const note = { ...meta, blocks: parseBody(body, file) };
    byLang[lang].push(note);
    (seen[slug] ??= {})[lang] = note;
  }

  // A note must exist in both languages, with the same shape.
  for (const [slug, versions] of Object.entries(seen)) {
    for (const lang of ["en", "de"]) {
      if (!versions[lang]) throw new Error(`notes: "${slug}" has no ${lang} version — add ${slug}.${lang}.md`);
    }
    const shape = (n) => n.blocks.map((b) => b.t).join(",");
    if (shape(versions.en) !== shape(versions.de)) {
      throw new Error(
        `notes: "${slug}" differs in structure between languages\n` +
          `  en: ${shape(versions.en)}\n  de: ${shape(versions.de)}`,
      );
    }
    if (versions.en.no !== versions.de.no) throw new Error(`notes: "${slug}" has a different number per language`);
  }

  // Newest first, by the number rather than the printed date, which is localised.
  for (const lang of ["en", "de"]) byLang[lang].sort((a, b) => b.no.localeCompare(a.no));
  return byLang;
};

export const notesPlugin = () => {
  const VIRTUAL = "virtual:notes";
  const RESOLVED = "\0" + VIRTUAL;
  let root = process.cwd();

  return {
    name: "notes-markdown",
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      return id === VIRTUAL ? RESOLVED : null;
    },
    load(id) {
      if (id !== RESOLVED) return null;
      const notes = readNotes(root);
      const total = notes.en.length;
      this.info?.(`notes: ${total} note${total === 1 ? "" : "s"} in en + de`);
      return `export const notesEn = ${JSON.stringify(notes.en)};\nexport const notesDe = ${JSON.stringify(notes.de)};\n`;
    },
    handleHotUpdate({ file, server }) {
      if (!file.includes(DIR)) return;
      const mod = server.moduleGraph.getModuleById(RESOLVED);
      if (mod) server.moduleGraph.invalidateModule(mod);
      server.ws.send({ type: "full-reload" });
    },
  };
};
