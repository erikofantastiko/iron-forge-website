# Iron Forge website

Marketing and waitlist site for Iron Forge, a workout tracker for serious lifters
(iOS, pre-launch). Built with Astro 5, plain CSS and TypeScript. Deployed to GitHub
Pages at [ironforge.app](https://ironforge.app).

## Commands

Run these from the project root.

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run check` | Type-check the project with `astro check` |

## Structure

- `src/pages/` — the four pages: `index` (home + waitlist), `thanks`, `legal`, `privacy`.
- `src/layouts/Layout.astro` — the shared HTML shell, `<head>`, SEO and Open Graph tags.
- `src/styles/global.css` — the design tokens (colours, type, radii, shadows) and base styles.
- `public/` — static assets served as-is (logo, favicon, `og.png`, `robots.txt`, `CNAME`).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which type-checks, builds
and publishes to GitHub Pages. The custom domain is set via `public/CNAME`.

## Working on this repo

Project rules, brand voice and content facts live in `CLAUDE.md` and `.claude/rules/`.
Read those before changing any user-facing text or design.
