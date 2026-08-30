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

## Numbers

Nothing that grows is typed by hand. Years are derived from the anchor in
`src/lib/facts.ts`; repo and blueprint counts are fetched during the build by
`scripts/stats.mjs` and fall back to the last committed values if the fetch
fails.
