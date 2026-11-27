# Feather Themes — Active Handoff (`HANDOFF.md`)

> **Owner:** CRTA Tech Solutions  
> **Repository:** `https://github.com/kelli-dotcom/feather-themes`  
> **Status:** `v2.0.3` — Preview page (`https://kelli-dotcom.github.io/feather-themes/preview/`) redesigned 2026-11-27 in plain language, feathericons.com structure: header, tagline, Get started → GitHub, Customize panel, clean theme grid. No jargon on the page, no theme colours altered. Powered by `themes/themes.css`, `ui/fonts.css` (`Lora` + `Source Sans 3`), `ui/buttons.css` (`.ft-btn` / `.ft-btn-secondary`), `auto/feather-auto-time.js`, and `src/engine.mjs`. Downstream: Openflex uses the themes, not the preview page — no impact on Openflex or CRTA apps.

## Verification Command
```bash
node bin/feather-fix.mjs && node bin/feather-themes.mjs verify-all
```
