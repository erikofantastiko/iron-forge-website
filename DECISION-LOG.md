# Decision log

A light history of non-trivial changes to this site. After each one, add a short
dated entry: what changed and why, in a sentence or two. Newest at the top.

## 2026-07-23 — Add and align the two Kit newsletter templates

Added `emails/feature-announcement.html` and `emails/launch-announcement.html`, the
first repo copies of the marketing emails sent through Kit. Aligned both to the
current site: card/badge/text colours and radii now match the `global.css` tokens
instead of ad-hoc hex values, the em-dash sign-off ("— Erik") was dropped since
em-dashes are banned outright, and a stray feedback emoji was removed. The launch
email's feature list was rewritten to match the homepage's actual wording and current
load-bearing facts (giant sets added, recovery described as evidence-aligned HRV/sleep/
resting-heart-rate rather than vague "real recovery tracking", progression phrased as
suggestions not automation). The launch email keeps its "now live" framing on purpose:
it is meant to fire on the day the app actually ships, and its copy is flagged as the
reference text for a future post-launch homepage rewrite; nothing on the live site
changed, which still correctly reads "Pre-launch · iOS".

## 2026-07-23 — Grammar, readability and jargon check on the newsletter templates

Ran a grammar/readability/jargon pass on the two Kit templates. Fixed three things:
spelled out "HRV" as "heart-rate variability" in the launch email's feature list
(the site always glosses this term, the email bullet had dropped the explanation),
rewrote the two badges ("NEW UPDATE", "NOW LIVE") in sentence case in the HTML source
since CSS already applies the visual uppercase, which reads more naturally for screen
readers than hard-coded all-caps text, and normalised the launch email's `<title>` from
"Iron Forge is LIVE" to "Iron Forge is live" to match the site's restrained tone.
Everything else checked clean: grammar, apostrophe style and the missing Oxford comma
all already matched the rest of the site.

## 2026-07-16 — Correct the method glosses to match the product

The founder corrected two glosses for accuracy. Drop sets run one set into the next
at a lighter weight (set after set, not "keep a hard set going"). Myo-reps keep going
at the same weight after short rests to add volume, not "short bursts". Also confirmed
the set-type sizes: a superset is exactly two exercises and adding more makes it a
giant set, so the Giant sets row now says "Three or more exercises back to back" (was
the vaguer "Several ... repeated for rounds"), while the Supersets row's "Two
exercises" stays. Copy-reviewer passed.

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
