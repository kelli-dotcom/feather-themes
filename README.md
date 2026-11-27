[![Feather Themes — Approved Scientific Photobiology Color Engine](assets/hero-banner.svg)](https://kelli-dotcom.github.io/feather-themes/preview/)

# Feather Themes

Come in. Everything here has its place, and nothing is missing.

1,092 WCAG 2.1 AA/AAA themes in 10 photobiology states. Light on low-RAM devices. Zero dependencies.

- `themes/` — the 12 flagships (`themes.css`, `tokens.json`); the engine builds the other 1,080.
- `src/engine.mjs` — builds the 1,080 generated themes.
- `bin/feather-themes.mjs` — list, apply, and verify themes.
- `ui/` — fonts, buttons, icons (12), forms, layout, navigation, animations, graphics.
- `skills/lightweight-themes/` — the agent skill for theming any app.
- `skills/theme-contrast/` — the agent skill that keeps text visible when themes change.
- [Live Use-Case Studio](https://kelli-dotcom.github.io/feather-themes/preview/) — interactive theme explorer, web or offline.

Use it: `node bin/feather-themes.mjs apply morning-rose --format=css --out=./theme.css`

Details: `docs/START_HERE.md`, `design-spec/THEME_SPEC.md`. MIT, see `LICENSE`.
