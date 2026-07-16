# Decision log

A light history of non-trivial changes to this site. After each one, add a short
dated entry: what changed and why, in a sentence or two. Newest at the top.

## 2026-07-16 — Plain-English glosses for the method terms

Added short plain-English explanations for the training terms in the "What it does"
spec sheet, in the same inline-gloss style the page already uses for HRV and RPE.
Drop sets and myo-reps now get a one-line meaning in the Methods row; the Supersets
row opens by defining a superset; the Giant sets row replaces the unclear "Ragged
rounds." with a plain definition while keeping the real feature (each exercise can run
its own number of rounds). Definitions taken from the website-content glossary. The
copy-reviewer caught an early contradiction in the giant-sets wording ("one round" vs
"its own number of rounds"), which was reworded.

## 2026-07-16 — Copy fix on the homepage

The copy-reviewer flagged one Must-Fix: the Supersets spec row opened with
"Per-member configuration", jargon a first-time visitor cannot parse. Rewrote it
to "Set up each exercise on its own." Also aligned the homepage `<title>`
separator to the house-style middot ( · ) used elsewhere on the site.

## 2026-07-16 — Site review: SEO, design-token and correctness pass

Worked through a full review of the site. No redesign, only hygiene, consistency
and correctness.

Technik & SEO: added `@astrojs/sitemap` (filtered to the indexable home page only,
the noindex thanks/legal/privacy pages are excluded), a `robots.txt` pointing at the
sitemap, a proper branded 1200x630 `og.png` social card (replacing the reused logo)
and pointed the Open Graph/Twitter defaults at it, a `theme-color` meta, a
non-render-blocking Google Fonts load (`media="print"` swap with a `noscript`
fallback), an `astro check` step in CI plus a `check` npm script, a real README, and
set the empty `package.json` name.

Design-Konsistenz: converged the three mobile breakpoints (600/768px) onto the home
page's 760px; replaced raw `#fff` with `var(--text-primary)` and `border-radius: 8px`
with `var(--radius-md)` across the pages and globals; swapped duplicate `rgba()`
literals for the matching tokens; migrated legal and privacy off the legacy
`--gray`/`--light-gray` aliases (then removed those aliases) and gave both pages the
same `<picture>` WebP logo with explicit dimensions; added a site-wide
`:focus-visible` outline so keyboard focus is finally visible. Left privacy's
data-table `rgba` borders raw on purpose, as no token matches their functional need.

Inhalt & Korrektheit: switched the Kit waitlist form from an inline success message
to a redirect to the existing `/thanks` page, which was otherwise orphaned. Confirmed
with the owner that the differing legal "Last updated" dates are correct as-is (only
design changed, not policy) and that `ironforge.labs@gmail.com` is the intended
contact, so neither was touched. The Cloudflare Web Analytics claim in the legal and
privacy pages is correct: it runs via Cloudflare's automatic edge setup, which is why
no beacon script appears in the source.

## 2026-07-16 — Fix copy flagged by the self-check

The copy-reviewer pass flagged three Must-Fix items in the existing copy.
Explained "HRV" on first use on the landing and thanks pages, explained "RPE" on
the landing page (the website explains terms, unlike the app), and changed "toward"
to "towards" for British English. No claims or facts changed.

## 2026-07-16 — Add Claude Code config

Added a lean Claude Code setup: a thin `CLAUDE.md` index, three rule files
(`brand-voice.md`, `website-content.md`, `web-design.md`), and two spawnable review
agents (`copy-reviewer`, `web-design-reviewer`), plus this log. The rules were
grounded in the real site: Astro 5, plain CSS tokens in `src/styles/global.css`,
DM Sans and DM Mono, the dark red palette, and the existing on-brand copy. Purpose:
keep copy and design consistent and on-brand as the site grows, without the app
repo's heavier machinery.
