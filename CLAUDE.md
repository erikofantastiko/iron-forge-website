# Iron Forge website

This is the Iron Forge marketing site. It is a pre-launch waitlist site built with
Astro 5, plain CSS, and TypeScript. The app is a workout tracker for serious lifters.

This file is a thin index. It tells you which rules to read for a given task. Read
the rule file on demand, do not memorise everything up front.

## Read on demand

| When you are... | Read |
|---|---|
| Writing or editing any user-facing text (headlines, body, CTAs, meta, waitlist) | `.claude/rules/brand-voice.md` and `.claude/rules/website-content.md` |
| Changing layout, styling, or components (any `.astro` markup or CSS) | `.claude/rules/web-design.md` |

## Always-on rules

These apply to every change, without opening a rule file:

1. Write plain, understandable English. Short sentences, one idea each, active voice,
   everyday words. No marketing fluff.
2. Use common, familiar terms. When a gym term is genuinely needed, explain it in
   plain English the first time it appears on a page.
3. Before shipping any text, check it against the forbidden words in
   `.claude/rules/brand-voice.md`.
4. Use European (British) English: colour, favourite, analyse, centre, programme.
5. Log every non-trivial change in `DECISION-LOG.md`.

## How a task runs

Inspect the relevant files, draft the change, run the review agents, fix every
Must-Fix item, then finish.

- For any text change, spawn `.claude/agents/copy-reviewer.md`.
- For any visual change (layout, styling, components, a new page or section), spawn
  `.claude/agents/web-design-reviewer.md`.
- When a change touches both text and design, run both agents at the same time.

## Decision log

After every non-trivial change, add a short dated entry to `DECISION-LOG.md`: what
changed and why, in a sentence or two. This keeps a light history without ceremony.
Skip it only for trivial edits like a typo fix.
