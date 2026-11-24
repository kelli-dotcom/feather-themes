# Feather Themes — Fractal Agent Contract (`AGENTS.md`)

- **Pillar:** CRTA Tech Solutions (Public MIT Open-Source Toolkit)
- **North Star:** Ultra-lightweight (`<= 400B`/theme), zero-dependency, WCAG 2.1 AA/AAA photobiology theme kit built for low-RAM devices, school Chromebooks, and older phones.

## Hard Phase Locks & Guardrails
- **Zero-Bloat Mandate:** Never add npm dependencies, runtime CSS-in-JS, or background images.
- **7 Semantic Tokens Only:** `bg`, `surface`, `surfaceSolid`, `border`, `text`, `muted`, `accent` + `color-scheme`.
- **WCAG AA Contrast Gate:** Verify `>= 4.5:1` text contrast across all dark and light themes before committing.
- **Sync Invariant:** Every theme in `themes/themes.css` MUST stay synced with `themes/tokens.json`, `README.md`, and `HANDOFF.md`.

## Stack, Entry Points & Verification
- **Stack:** Zero-dependency CSS variables, JSON tokens, Node/Bun CLI.
- **Entry Points:** `themes/themes.css`, `themes/tokens.json`, `skills/lightweight-themes/SKILL.md`.
- **Verification:** `node --version` / contrast & byte-size audit (`<= 400B`/theme) + `node scripts/validate-handoff.mjs` if handoff changes.

## Pointers
- State & Index: [`HANDOFF.md`](HANDOFF.md) · [`mistakes.md`](mistakes.md) · [`llms.txt`](llms.txt)
- Rules & Skills: [`.agents/rules/theme-budget.md`](.agents/rules/theme-budget.md) · [`skills/lightweight-themes/SKILL.md`](skills/lightweight-themes/SKILL.md)
- Active Signature: `> 🟣 **𝐅𝐄𝐀𝐓𝐇𝐄𝐑-𝐓𝐇𝐄𝐌𝐄𝐒** · \`PHOTOBIOLOGY ENGINE\` — *Active on this step*`

## 4-Stage Loop
1. **Frame:** Anchor to photobiology clarity and low-RAM accessibility.
2. **Bridge:** Enforce `theme-budget.md` (`<= 400B`, 7 tokens, AA/AAA contrast).
3. **Proof:** Verify byte budget, CSS/JSON parity, and contrast ratios.
4. **Push-Off:** Update `HANDOFF.md` and note downstream impact on Openflex & CRTA apps.

## Live State & Next Action
- **State:** `v2.0` live (`1,092` WCAG themes powering Openflex).
- **Next Action:** Keep CSS/JSON token outputs synced when adding any new cognitive wavelength presets.
