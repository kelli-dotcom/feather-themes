# Feather Themes

Come in. Everything here has its place, and nothing is missing.

1,092 WCAG 2.1 AA/AAA themes across 10 photobiology states, for apps that must stay light on low-RAM devices. Zero dependencies.

- `themes/` — the 12 flagship themes (`themes.css`, 2,976 bytes) and `tokens.json`; the engine generates the other 1,080.
- `src/engine.mjs` — builds the 1,080 generated themes.
- `bin/feather-themes.mjs` — list, apply, and verify themes from one command.
- `ui/` — fonts, buttons, graphics, icons, animations, layout, forms, navigation, each usable on its own.
- `skills/lightweight-themes/` — the agent skill for theming any app.
- `preview/index.html` — offline theme explorer, open it in a browser.

Use it: `node bin/feather-themes.mjs apply morning-rose --format=css --out=./theme.css`

Details live in `docs/START_HERE.md` and `design-spec/THEME_SPEC.md`. License: MIT, see `LICENSE`.
