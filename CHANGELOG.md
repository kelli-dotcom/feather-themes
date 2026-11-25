# Feather Themes — Changelog

All updates are opt-in. Nothing updates on its own. A dev reads this file
first, then chooses whether to update, and stays on the old version for
as long as they want.

## 2.0.3 — 2026-11-25

What changed in this release:

- Explorer now lists all 12 flagships: tokyo-night, catppuccin and
  dracula were missing from the picker in `preview/index.html`
  (sandstone was already there). Added the three with tokens copied
  exactly from `themes/tokens.json` and states assigned
  (tokyo-night -> night, catppuccin -> calm, dracula -> focus).
  All 12 flagships pass AA text, AAA text, and AA muted. No theme,
  token, or engine file changed.
- Versions synced: `themes/tokens.json` is now 2.0.3, matching
  `package.json` 2.0.3.

What breaks in 2.0.3:

- Nothing breaking. No theme id was removed or renamed. The `apply`
  command works exactly as it did before. The explorer simply shows
  three more flagships in its picker.

## 2.0.2 — 2026-11-25

What changed in this release:

- Duplicate colour sets fixed: 8 pairs of generated themes shared a
  colour set (morning and dusk light-crisp themes at the same hue).
  The 8 colliding dusk hues were nudged by 1 degree, so all 1,092
  themes now have a unique colour set (was 1,084). 48 dusk themes
  change colour slightly; no theme id was removed or renamed, and
  all 1,080 generated themes still pass AA text, AAA text, and
  AA muted (worst text 8.82, worst muted 5.43). Engine change only,
  commit c818fd6.
- Versions synced: `themes/tokens.json` is now 2.0.2, matching
  `package.json` 2.0.2.

What breaks in 2.0.2:

- Nothing breaking. No theme id was removed or renamed. The `apply`
  command works exactly as it did before. The 48 dusk themes that
  change colour keep the same ids and labels — the colours shift by
  one degree of hue, so a dev using one of those dusk themes will see
  a slightly different shade.

## 2.0.1 — 2026-11-25

What changed in this release:

- Engine shrunk: `src/engine.mjs` went from 7,963 bytes to 6,089 bytes,
  under the 6 KB budget (commit 210a0390). The three near-duplicate
  light/dim/dark branches are now one lookup table, and the science and
  wavelength wording is shorter. No token, colour, theme id, or theme
  output changed — every one of the 1,080 generated themes matches the
  old engine exactly.
- Preview wording brought in line: the nine hardcoded flagship wavelength
  lines in `preview/index.html` now match the engine's shorter wording
  exactly. The flagship descriptions and the state dropdown already read
  the engine live, so they show the shorter text too. Same meaning,
  fewer words. No colours changed.
- Versions synced: `themes/tokens.json` is now 2.0.1, matching
  `package.json` 2.0.1.

What breaks in 2.0.1:

- Nothing breaking. No theme id was removed or renamed. No token colour
  changed. The `apply` command works exactly as it did before.

## 2.0.0 — 2026-11-24

What changed in this release:

- Bug fixer added: `bin/feather-fix.mjs`. Run `node bin/feather-fix.mjs`
  for a dry run, or add `--fix` for the safe fixes only. It checks every
  theme for missing tokens, bad hex, contrast under 4.5:1, duplicate ids,
  and CSS and JSON out of sync. It fixes the safe ones and reports the
  rest by file and theme name. It never silently changes a brand colour.
- One-theme export added: `node bin/feather-themes.mjs export <theme-id>`
  with `--format=css|json|tailwind|swift|kotlin|dart`. One theme only,
  never the whole kit. JSON export is the flat 7 tokens only.
- Optional switcher menu added: `switcher/feather-switcher.js`, zero
  dependencies, no framework. It builds a small menu from the theme ids
  the dev passes in (default: the 12 flagships), switches with one
  `data-theme` flip, and saves the manual pick in localStorage.
- Auto time mode added: `auto/feather-auto-time.js`, browser only, zero
  dependencies. It reads the device clock on load, picks one of five
  windows (morning, midday, afternoon dip, evening, late night), and
  re-checks only at the next window boundary with one timer. A manual
  pick always wins and stops auto until the user taps Auto again.
- Calm wording fixed: calm is no longer listed as `440-475 nm`. It now
  reads "Low saturation + low brightness first", with the science text
  "Low-chroma, low-brightness cool tones calm first; hue is second, and
  blue near the 480 nm melanopsin peak alerts if bright, so calm is not
  a wavelength alone." This was a wording fix only, in `src/engine.mjs`
  and `README.md`. No colour, token, or theme id changed.
- Versions synced: `themes/tokens.json` is now 2.0.0, matching
  `package.json` 2.0.0.

What breaks in 2.0.0:

- Nothing breaking. No theme id was removed or renamed. No token colour
  changed. The `apply` command works exactly as it did before. The 12
  flagship themes are the same 12, with the same colours. No auto-update
  code was added, and nothing in this release phones home, downloads,
  or updates itself.

What a dev should check before updating:

- Read this entry first, then update only if they want the new bits.
- Install the pinned version: `npm install feather-themes@2.0.0`.
- Run `node bin/feather-fix.mjs` (dry run) and
  `node bin/feather-themes.mjs verify-all` after updating.
- If they use a pinned theme id, check it still exists with
  `node bin/feather-themes.mjs list`. All 12 flagships are still there.
- If they do not want any of this, they can stay on their old version.
  Nothing will change in their project until they run the update.
