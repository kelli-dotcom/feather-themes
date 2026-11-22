# Contributing to Feather Themes (`CONTRIBUTING.md`)

Thank you for helping make **Feather Themes** the cleanest zero-dependency photobiology theme engine on GitHub! Both **human developers** and **AI coding agents** are welcome to contribute.

---

## 1. High-Impact Ways to Contribute
- **New Photobiology / Wavelength Palettes:** Add new light or dark palettes in `src/engine.mjs` calibrated for eye comfort, dyslexia readability, or specific lighting conditions.
- **Framework Export Adapters:** Contribute zero-dependency token exporters (e.g., Tailwind v4 CSS variables, Expo/React Native JSON, SwiftUI/Compose tokens).
- **Interactive Preview Enhancements:** Improve `preview/index.html` while keeping the entire repo at **0 npm dependencies**.

## 2. Human & AI Agent Guardrails (`AGENTS.md` + `llms.txt`)
- **Zero Dependencies (`0` npm packages):** Never add external runtime dependencies.
- **100% WCAG 2.1 AA/AAA Contrast:** Every generated theme MUST pass the automated luminance and contrast verifier (`node bin/feather-themes.mjs verify`).
- **Visible Files Only:** Never place agent specs, skills, or handoffs in hidden dot-files.
- **Rule of 2:** If contrast verification fails twice on a palette change, document the contrast delta in your PR rather than weakening the WCAG threshold.

## 3. 60-Second Verification Gate (Required Before Every PR)
```bash
node bin/feather-themes.mjs build && node bin/feather-themes.mjs verify
```

## 4. 3-Step Pull Request Workflow
1. **Fork & Branch:** `git checkout -b feat/your-theme-or-fix`
2. **Verify Locally:** Run `node bin/feather-themes.mjs build && node bin/feather-themes.mjs verify` and confirm `0` contrast failures.
3. **Submit a Pull Request:** Open a PR against `main` with your verification output and a screenshot or swatch summary. *(Mobile contributors can also edit docs or `skills/lightweight-themes/SKILL.md` directly in the GitHub web/mobile UI.)*

## 5. IP Safety & MIT License
All contributions must be original clean-room work (no third-party proprietary palettes or competitor trademarks) and are licensed under the repository's [MIT License](LICENSE).
