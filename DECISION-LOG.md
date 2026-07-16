# Decision log

A light history of non-trivial changes to this site. After each one, add a short
dated entry: what changed and why, in a sentence or two. Newest at the top.

## 2026-07-16 — Add Claude Code config

Added a lean Claude Code setup: a thin `CLAUDE.md` index, three rule files
(`brand-voice.md`, `website-content.md`, `web-design.md`), and two spawnable review
agents (`copy-reviewer`, `web-design-reviewer`), plus this log. The rules were
grounded in the real site: Astro 5, plain CSS tokens in `src/styles/global.css`,
DM Sans and DM Mono, the dark red palette, and the existing on-brand copy. Purpose:
keep copy and design consistent and on-brand as the site grows, without the app
repo's heavier machinery.
