# Feather Themes — Changelog

All updates are opt-in. Nothing updates on its own. A dev reads this file
first, then chooses whether to update, and stays on the old version for
as long as they want.

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
