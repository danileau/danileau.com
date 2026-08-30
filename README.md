# danileau.com

Personal portfolio site for Danilo Alessio Licitra.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Framer Motion

## Setup

```sh
npm install
npm run dev
```

## Build & Preview

```sh
npm run build
npm run preview
```

## Deploy

```sh
npm run deploy            # build, upload, switch, verify
npm run deploy -- --status    # read-only: what is live, what is held
npm run deploy -- --rollback  # point at an older release
```

The wizard builds from the current tree, uploads into a dated release
directory beside the live one, re-checksums it on the host, switches a
symlink atomically, then fetches the site to confirm the new build is
actually being served — and rolls back on its own if it is not.

The target is read from `deploy.conf`, which is not in git. Run the wizard
once and it writes a template. Apache's DocumentRoot points at
`$DEPLOY_ROOT/current`.

## Writing a note

Notes are Markdown, two files per note, in `src/content/notes/`:

```
src/content/notes/<slug>.en.md
src/content/notes/<slug>.de.md
```

Frontmatter needs `slug`, `no`, `title`, `standfirst`, `topic`, `date`. The body
is ordinary Markdown plus three conventions, all of which Obsidian already
renders, so a note previews in the editor it was written in:

```md
## 01 — The cache | The perfect tool nobody uses   heading: eyebrow | title
> a line on its own                                pull-out quote
> [!warning] Title                                 callout, cherry
> [!tip] Title                                     callout, mint
:::pull                                            the big centred line
one line per line
:::
```

Inline: `**bold**`, `*italic*`, `` `mono` ``.

`scripts/notes-plugin.mjs` parses them at build time into the shape `<Prose>`
renders, so no parser reaches the browser. **The build fails** if a note exists
in only one language, or if the two versions disagree on block structure — a
half-translated note must not be publishable. `npm run dev` reloads on save.

## Numbers

Nothing that grows is typed by hand. Years are derived from the anchor in
`src/lib/facts.ts`; repo and blueprint counts are fetched during the build by
`scripts/stats.mjs` and fall back to the last committed values if the fetch
fails.
