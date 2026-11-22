# Feather Themes — Agent Governance (`AGENTS.md`)

- **Zero-Bloat Mandate:** Never add npm dependencies, runtime CSS-in-JS libraries, or image backgrounds. Every theme MUST stay `<= 400 bytes` of CSS.
- **7 Semantic Tokens Only:** `bg`, `surface`, `surfaceSolid`, `border`, `text`, `muted`, `accent` + `color-scheme`.
- **WCAG AA Contrast Gate:** Verify `>= 4.5:1` text contrast on both dark and light themes before committing.
- **Keep Synced:** Every theme added to `themes/themes.css` MUST also be added to `themes/tokens.json` and documented in `README.md` and `HANDOFF.md`.
