# Design system audit

Read-only audit of the Iron Forge design system: the documented tokens and rules
against what the code actually does. No code was changed to produce this report.

- **Date:** 2026-08-26
- **Reference (documentation):** `.claude/rules/web-design.md`
- **Reference (tokens):** `src/styles/global.css` `:root` (lines 2-31)
- **Scope searched:** all `.astro`, `.css`, `.html` and `.svg` under `src/`,
  `public/` and `emails/`.

Each list below is sorted smallest-effort-first, as requested.

---

## 0. Scope note: the intended reference file is missing

Prompt 1 asks to read `.claude/rules/design-system.md`. That file does not exist,
and neither does the `handoff/` folder it was meant to be copied from
(`handoff/design-system.md`, `handoff/global.css.additions.css`). The setup step
that would have created them never ran.

By decision, this audit is run against the design system **as it exists in the
repo today**: the prose in `.claude/rules/web-design.md` plus the tokens in
`src/styles/global.css`. One consequence worth stating up front: `web-design.md`
is a lighter document than the intended `design-system.md` would have been (no
spacing scale, no type-size tokens, no component-level rules). So sections 4
(gaps) and 5 (conflicts) measure against a thinner baseline than planned; several
"gaps" below are things the richer doc was probably meant to define.

---

## 1. Token inventory

18 tokens in `:root`, five groups. "Used in" lists the files that reference the
token via `var(--…)`; email templates cannot use custom properties and so appear
nowhere here by design (see section 2).

### Brand

| Token | Value | Used in |
|---|---|---|
| `--red` | `#e63946` | global.css, index, thanks, privacy, legal (all pages) |
| `--red-hover` | `#f04a56` | **nowhere — unused** |
| `--red-deep` | `#d12b38` | index.astro (submit hover) |
| `--red-glow` | `rgba(230,57,70,0.35)` | global.css only, and only inside the `--shadow-red` definition |
| `--red-soft` | `rgba(230,57,70,0.12)` | global.css (alerts), thanks.astro |

### Surfaces

| Token | Value | Used in |
|---|---|---|
| `--surface-0` | `#0a0a0a` | global.css (body background) |
| `--surface-1` | `#121214` | thanks.astro |
| `--surface-2` | `#1a1a1e` | global.css (skip link) |
| `--surface-border` | `rgba(255,255,255,0.06)` | index.astro, thanks.astro |
| `--surface-border-strong` | `rgba(255,255,255,0.1)` | global.css, index, thanks, privacy, legal |

### Text

| Token | Value | Used in |
|---|---|---|
| `--text-primary` | `#ffffff` | global.css + all four pages (heavy use) |
| `--text-secondary` | `#b8b8bd` | all four pages |
| `--text-muted` | `#8b8b91` | index, thanks, privacy, legal |

### Elevation

| Token | Value | Used in |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.4)` | thanks.astro |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.5)` | **nowhere — unused** |
| `--shadow-red` | `0 8px 30px var(--red-glow)` | **nowhere — unused** |

### Radii

| Token | Value | Used in |
|---|---|---|
| `--radius-sm` | `6px` | **nowhere in `src/` — unused** (emails hardcode `6px`) |
| `--radius-md` | `10px` | global.css, index.astro, thanks.astro |
| `--radius-lg` | `14px` | **nowhere in `src/` — unused** (emails hardcode `14px`) |

### Unused tokens (flagged)

Five tokens are defined but referenced nowhere: **`--red-hover`, `--shadow-md`,
`--shadow-red`, `--radius-sm`, `--radius-lg`**. A sixth, **`--red-glow`**, is
referenced only inside `--shadow-red`, which is itself unused, so it is
transitively dead too.

These are not bugs; a small, deliberate token set that anticipates future use is
reasonable. But six of eighteen tokens (a third) currently carry no weight. Worth
a conscious decision: keep them as the intended palette, or prune. Note that
`--radius-sm` and `--radius-lg` *are* used in spirit — the email templates hardcode
`6px` and `14px` — so those two earn their place even though no `var()` reaches them.

---

## 2. Deviations: hardcoded values where a token exists

### Headline non-finding

The two deviations this audit was expected to surface — **`border-radius: 8px`**
and **raw `#fff` / `#FFF`** — **do not exist anywhere in the shipping source.**
They were remediated on 2026-07-16 (`DECISION-LOG.md:85-87`: `#fff` → `--text-primary`,
`8px` → `--radius-md`). The docs that still describe them as live problems are now
stale; that is captured in section 5.

### Real residual deviations (site source)

Sorted simplest-first.

1. **`public/favicon.svg:2`** — `fill="#e63946"` equals `--red`; **line 3** —
   `fill="#ffffff"` equals `--text-primary`. An SVG file cannot read CSS custom
   properties, so these cannot be swapped to `var()`. They are duplicated brand
   literals to keep in sync with the tokens by hand, not fixable violations.

2. **`src/layouts/Layout.astro:24`** — `<meta name="theme-color" content="#0a0a0a">`
   equals `--surface-0`. A `<meta>` `content` attribute cannot use `var()`;
   necessary hardcode, but a hand-synced dependency on the token.

3. **`src/styles/global.css:195`** — `color: #ffb3b8` on `.formkit-alert-error`.
   This is a genuine one-off: a pinkish-red with **no matching token**. Closest
   existing token is `--red-hover` (`#f04a56`), though it is not an exact visual
   match. Candidate for either a new token or reuse of the red family.

4. **`src/pages/privacy.astro`** — three near-miss white `rgba(255,255,255,…)`
   tints on the data table that sit close to, but not on, the border tokens:
   - `:181` — `border: 1px solid rgba(255,255,255,0.2) !important` (stronger than
     `--surface-border-strong` at `0.1`).
   - `:189` — `background: rgba(255,255,255,0.08)` (between `--surface-border` `0.06`
     and `--surface-border-strong` `0.1`; equals neither).
   - `:201` — `background: rgba(255,255,255,0.02)` (row-hover tint; no token).

   These were left raw on purpose in the 2026-07-16 pass, but they are the clearest
   "a token nearly fits" cases in the shipping pages.

### Email templates (`emails/*.html`) — deviation by necessity

Email clients do not support CSS custom properties, so the two Kit templates
hardcode every colour and radius. Per `DECISION-LOG.md 2026-07-23` these were
deliberately aligned to the token values. They are therefore **expected
hardcodes**, not violations. Two notes:

- The literals match tokens exactly (surfaces `#0a0a0a/#121214/#1a1a1e`, text
  `#ffffff/#b8b8bd/#8b8b91`, `rgba(230,57,70,0.12)` = `--red-soft`, the two white
  border tints), with one cosmetic drift: the brand red is written **uppercase
  `#E63946`** in the emails versus lowercase `#e63946` in the token.
- The footers use `#555555` and `#444444`, two greys **outside the palette** with
  no matching token. (These are the subject of a separate prompt; noted here only
  as token drift.)

---

## 3. Breakpoints

The documented goal is a single mobile breakpoint at **760px**. The code already
meets it.

Every `@media` query in the repo (five total):

| File:line | Query | Breakpoint |
|---|---|---|
| `src/pages/index.astro:275` | `@media (max-width:760px)` | 760px |
| `src/pages/thanks.astro:277` | `@media (max-width: 760px)` | 760px |
| `src/pages/privacy.astro:19` | `@media (max-width: 760px)` | 760px |
| `src/pages/legal.astro:19` | `@media (max-width: 760px)` | 760px |
| `src/styles/global.css:139` | `@media (prefers-reduced-motion: reduce)` | — (motion) |

- **Zero** `600px` and **zero** `768px` queries exist. The "three breakpoints"
  problem the docs describe is already gone.
- Only nit: `index.astro:275` writes `max-width:760px` with **no space** after the
  colon, versus the spaced form in the other three files. Cosmetic.
- Not a breakpoint: the emails contain `max-width: 560px` on a `<table>`
  (`launch-announcement.html:23`, `feature-announcement.html:16`). That is a fixed
  email-container width, not a responsive query.

---

## 4. Gaps: values in the code that the tokens/docs do not cover

These are recurring hardcoded values with **no token to map to**. They are the
strongest argument for the token additions the later prompts propose.

1. **No type-size scale.** Font sizes are set per component with raw values
   everywhere: the hero `clamp(2.9rem, 6.4vw, 5.1rem)`, privacy headings
   `2.5rem / 1.5rem / 1rem / 0.9rem`, the logo `1.15rem`, index labels
   `.78rem / .92rem / .95rem / 1.05rem / 1.17rem / 1.2rem / 1.28rem`, and the
   Termly overrides `24px / 18px / 16px / 14px`. `web-design.md` acknowledges
   "no formal size token"; this is the single biggest undocumented surface.

2. **No spacing scale.** Padding, margin and gap values are ad-hoc: `40px`, `24px`,
   `22px`, `60px`, `12px`, `104px 0 96px`, `66px 0`, `98px 0`, and so on. There is
   no rhythm to enforce, so new spacing is guesswork.

3. **No container-width token.** The page widths are magic numbers: `1080px`
   (index), `900px` (legal, privacy), `700px` (thanks), plus character measures
   (`16ch`, `20ch`, `30ch`, `48ch`, `52ch`, `56ch`).

4. **No breakpoint token.** `760px` is repeated as a literal in four files
   (section 3). One token would remove the drift risk entirely.

5. **No z-index scale.** `global.css` uses `-2`, `-1` (ambient layers) and `100`
   (skip link) directly.

6. **Colours with no token.** `#ffb3b8` (alert text, `global.css:195`); the `#000`
   inside the mask gradients (`global.css:75-76`, intentionally pure black, not a
   surface); and the ambient-background tints `rgba(230,57,70,0.05)`
   (`global.css:61`), `rgba(255,255,255,0.02)` (`:62`) and `rgba(255,255,255,0.018)`
   (`:72-73`) — bespoke depth tints with distinct alphas and no token.

---

## 5. Conflicts: where the docs contradict the code

The code is the source of truth. These are the places the documentation is now
**wrong** and should be corrected (correcting them is a later prompt's job; this
audit only lists them).

1. **`.claude/rules/web-design.md:71`** — "Some components hardcode
   `border-radius: 8px`." **Stale.** No `8px` radius exists in the source.

2. **`.claude/rules/web-design.md:72-73`** — "There are three mobile breakpoints in
   use (600px, 760px, 768px)." **Stale.** Only `760px` exists; `600px` and `768px`
   are gone.

3. **`.claude/rules/web-design.md:74`** — "Some CSS uses raw `#fff` and rgba
   literals." **Half-stale.** Raw `#fff` is gone; rgba literals do remain (the
   privacy near-misses in section 2 and the ambient tints in section 4), so this
   line is right about rgba but wrong about `#fff`.

4. **`.claude/agents/web-design-reviewer.md:35`** — repeats the same stale claim
   ("hardcoded `8px` radii, raw `#fff`/rgba, extra breakpoints"). The reviewer
   agent is prompting itself to hunt for problems that no longer exist.

---

## Summary

The system is in noticeably better shape than its own documentation claims. The
big-ticket deviations the audit expected — `8px` radii, raw `#fff`, three
breakpoints — are **already fixed**. What remains:

- **Cleanup, small:** decide on the six dead tokens (section 1); fix the
  `index.astro:275` missing space; lowercase `#E63946` in the emails.
- **Genuine deviations, small:** the `#ffb3b8` alert colour and the three privacy
  table rgba near-misses (section 2) are the only real "token nearly fits" cases in
  the shipping pages.
- **Gaps, larger:** the absence of type-size, spacing, container-width, breakpoint
  and z-index scales (section 4) is the real opportunity, and the main thing the
  intended `design-system.md` was probably meant to define.
- **Docs, do first:** `web-design.md` and `web-design-reviewer.md` describe a repo
  that no longer exists (section 5). Correcting them is cheap and stops the reviewer
  chasing ghosts.

On the evidence here, a full file-by-file token migration (Prompt 3) has little to
bite on — the pages are already clean. The higher-value follow-ups are correcting
the stale docs and deciding whether to add the missing scales.
