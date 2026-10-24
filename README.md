# cold.ashtray portfolio

A private-first artist portfolio and archive built with Next.js and TypeScript.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Refresh the artwork archive

The import script reads filenames produced by the Instagram download extension, recovers post
dates from their Unix timestamps, groups carousel fragments by timestamp, creates optimized WebP
viewing files and thumbnails, and regenerates `app/generated/artworks.json`.

```bash
python3 scripts/prepare_art.py /absolute/path/to/ayamn_drawing .
```

The script never edits the source folder. Captions and titles are left empty when unavailable.

## Verification

```bash
npm run check
npm run build
```

## Vercel

Import this project into Vercel or deploy it with the Vercel CLI. The current metadata deliberately
sets `noindex` and `nofollow` because this build is the private reveal. Remove that robots setting
from `app/layout.tsx` only after the artist approves a public launch.
