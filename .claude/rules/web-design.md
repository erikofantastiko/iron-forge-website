# Web design

Standards for the look of the site. Read this before any change to layout, styling,
or components. The site's own design system is the source of truth. Enforce
consistency with it. Do not impose arbitrary preferences.

## The design system (source of truth)

The tokens live in one place: `src/styles/global.css`, in the `:root` block. Use the
tokens. Do not hardcode a value when a token exists.

### Colour (dark theme)

- Brand red: `--red: #e63946`, hover `--red-hover: #f04a56`, deep `--red-deep: #d12b38`,
  plus `--red-glow` and `--red-soft` for glows and tints.
- Surfaces: `--surface-0: #0a0a0a` (page), `--surface-1: #121214` (cards),
  `--surface-2: #1a1a1e` (raised). Borders: `--surface-border` and
  `--surface-border-strong`.
- Text: `--text-primary: #ffffff`, `--text-secondary: #b8b8bd`, `--text-muted: #8b8b91`.

One red accent, near-black surfaces, three text shades. Do not add new accent colours.

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

The site has a few small inconsistencies. When you touch nearby code, nudge toward the
token, do not spread the inconsistency:

- Some components hardcode `border-radius: 8px`. Prefer the radius tokens (`6/10/14px`).
- There are three mobile breakpoints in use (600px, 760px, 768px). Prefer one when you
  can, and do not add a fourth.
- Some CSS uses raw `#fff` and rgba literals. Prefer the text and surface tokens.
- Spacing is ad-hoc with no scale. Keep new spacing on the existing rhythm rather than
  inventing new values.
