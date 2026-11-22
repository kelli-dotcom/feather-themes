# Feather Themes — Agent Governance (`AGENTS.md`)

- **Zero-Bloat Mandate:** Never add npm dependencies, runtime CSS-in-JS libraries, or image backgrounds. Every theme MUST stay `<= 400 bytes` of CSS.
- **7 Semantic Tokens Only:** `bg`, `surface`, `surfaceSolid`, `border`, `text`, `muted`, `accent` + `color-scheme`.
- **WCAG AA Contrast Gate:** Verify `>= 4.5:1` text contrast on both dark and light themes before committing.
- **Keep Synced:** Every theme added to `themes/themes.css` MUST also be added to `themes/tokens.json` and documented in `README.md` and `HANDOFF.md`.

<!-- AGENT-ETIQUETTE:START version=v1.1.0 -->
## Agent Etiquette Protocol (Layer 3 — Pinned `v1.1.0`)
- **Hierarchy:** Platform constraints (Layer 1) → Repository rules above (Layer 2) → Agent Etiquette (Layer 3) → Task-specific skills (Layer 4) → Handoffs (Layer 5).
- **Behavioral Rules:** Load `skills/agent-etiquette/SKILL.md` (zero filler, verified actions only, Rule of 2 retry cap, max 3 concurrent specialists).
- **Handoff Contract:** Validate inter-agent handoffs against `schemas/handoff.json` (`node scripts/validate-handoff.mjs <file>`).
<!-- AGENT-ETIQUETTE:END -->
