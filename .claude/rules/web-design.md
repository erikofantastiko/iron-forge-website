# Web design

Standards for the look of the site. Read this before any change to layout, styling,
or components. The site's own design system is the source of truth. Enforce
consistency with it. Do not impose arbitrary preferences.

## The design system (source of truth)

The tokens live in one place: `src/styles/global.css`, in the `:root` block. Use the
tokens. Do not hardcode a value when a token exists.

### Colour (dark theme)

- Brand red: `--red: #e63946`, hover `--red-hover: #f04a56`, plus `--red-glow` and
  `--red-soft` for glows and tints. Use `--red` for red text, links, icons and decor.
- Red fills: `--red-fill: #d92b3d`, hover `--red-fill-hover: #cd1b35`, pressed
  `--red-fill-active: #be002a`. Same hue as `--red`, only darker. Use these for every
  red surface with white text on it (buttons, badges, banners). Emails cannot use CSS
  variables, so they repeat these as uppercase hex (`#D92B3D`).
- Surfaces: `--surface-0: #0a0a0a` (page), `--surface-1: #121214` (cards),
  `--surface-2: #1a1a1e` (raised). Borders: `--surface-border` and
  `--surface-border-strong`.
- Text: `--text-primary: #ffffff`, `--text-secondary: #b8b8bd`, `--text-muted: #8b8b91`.

One red accent, near-black surfaces, three text shades. Do not add new accent colours.

Red contrast rule (the same rule as the iOS app, build of 8 Nov 2026): white on any red
fill must reach 4.5:1 (WCAG AA), at every state and every stop of a gradient.

The website shares the app's rule, not its hex values. The app's fill `#e31414` is a
more orange, more saturated red (CIEDE2000 9.3 from `#e63946`) and visibly clashes with
the logo and red text next to it. Keep fills on the brand hue. Do not swap in the app's
`#e31414`, `#dc2626` or `#b91c1c`.

- White on `--red-fill` is 4.81:1, on its hover 5.52:1, pressed 6.52:1. Pass.
- White on `--red` (`#e63946`) is only 4.17:1, and on the app's `#e23636` 4.36:1. Never
  put white text on either as a fill.
- `--red` stays for red text and icons on dark: 4.75:1 on `--surface-0`. Do not use
  `--red-fill` for text, which is only 4.11:1 there. On `--surface-1` cards `--red` is 4.49:1,
  so keep red text on cards to large text (bold 18.67px+) or icons.
- A white icon with no text on a red fill (the thanks checkmark) only needs 3:1, so it
  may stay on `--red`.
- `logo.png`, `favicon.svg` and `og.png` keep `#e63946`. Logos are exempt from WCAG
  text contrast.

### Type

Two families, both from Google Fonts:

- **DM Sans** for body and headings. Weights 400, 500, 600, 700.
- **DM Mono** for eyebrows, labels, and small mono accents. Weights 400, 500.

There is no formal size token; sizes are set per component. Display headings use fluid
`clamp()` (for example the hero `h1` is `clamp(2.9rem, 6.4vw, 5.1rem)`). Large display
text uses negative letter-spacing; mono uppercase labels use wide positive spacing.
Keep to two families. Do not introduce a third.

### Radii and shadows

- Radii tokens: `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 14px`.
- Shadow tokens: `--shadow-sm`, `--shadow-md`, `--shadow-red`.

### Layout

Content width is set by max-widths on the `.wrap` container (1080px on the home page,
narrower on legal and thanks pages) plus character measures like `max-width: 52ch`.
Horizontal padding is 40px on desktop, about 22px on mobile.

## Aesthetic

Dark, restrained, serious, confident. The anti-hype spirit applies to visuals too.

- No gimmicky gradients. The existing ambient background is subtle and fixed. Keep it that way.
- No clutter. Generous whitespace.
- Motion is smooth and quiet, never flashy. Honour `prefers-reduced-motion` (already
  handled globally).

## Standards to hold

- Clear visual hierarchy. The most important thing is the most prominent.
- One obvious primary action per screen. On this site that is the waitlist form.
- Consistent spacing rhythm. Do not eyeball new gaps that clash with the page.
- A limited type and colour set. See above.
- Strong mobile and responsive behaviour, from small phones to wide desktop.
- Accessible contrast (WCAG AA) for all text.
- Fast loading. This is a static Astro site; keep it light.
- Sharp imagery. Serve `webp` with a `png` fallback, as the logo already does.

## Known inconsistencies to converge on

Most of the earlier drift has been cleared (see `DECISION-LOG.md` and the point-in-time
`design-audit.md`): radii are on the `6/10/14px` tokens, the mobile breakpoint is a
single `760px`, and raw `#fff` is gone. Hold that line, and nudge the few remaining rough
edges toward the tokens when you touch nearby code:

- Keep radii on the `--radius-sm/md/lg` tokens. No stray `8px`.
- Keep the single `760px` mobile breakpoint. Do not add a second one.
- A few raw `rgba()` literals remain: the privacy data-table borders and the ambient
  background tints in `global.css`. Prefer the surface and border tokens where one fits.
- Spacing is still ad-hoc with no scale. Keep new spacing on the existing rhythm rather
  than inventing new values.
