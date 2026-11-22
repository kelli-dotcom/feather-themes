# Feather Themes

**1,092 scientifically calibrated, WCAG 2.1 AA/AAA verified themes across 10 cognitive & emotional states — in under 6 KB with 0 dependencies.**  
*Built by [CRTA Tech Solutions](https://github.com/kelli-dotcom) — used to power all 12 lightweight themes in [Openflex](https://github.com/kelli-dotcom/openflex).*

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](LICENSE)
[![Themes: 1,092](https://img.shields.io/badge/Themes-1%2C092_Verified-8b5cf6.svg)](src/engine.mjs)
[![WCAG AA/AAA](https://img.shields.io/badge/WCAG_2.1-1092%2F1092_Pass-10b981.svg)](bin/feather-themes.mjs)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-0ea5e9.svg)](package.json)
[![Used in Openflex](https://img.shields.io/badge/Used_in-Openflex-059669.svg)](https://github.com/kelli-dotcom/openflex)

---

## Built For Builders Who Care About Speed *and* Feeling

**Feather Themes** is crafted for solo founders, frontend engineers, mobile app makers, and AI coding agents who want users to personalize their experience—without dragging megabytes of runtime CSS-in-JS or broken contrast into their repository.

- **Best Used For:** Job boards, SaaS dashboards, focus/study apps, wellness tools, internal portals, and consumer web/mobile apps where calming anxiety, lifting midday energy, or softening late-night glare makes people love coming back.
- **When It Shines:** Reach for it at project kickoff (to bake in effortless theming from day one) or during a UX polish pass when your app needs morning, midday, romantic dusk, and zero-glare night modes without bloating your bundle.
- **Runs Everywhere:** Drop native CSS variables into **Next.js, Tailwind CSS, Vite, or plain HTML**, or export flat JSON tokens for **React Native, Flutter, SwiftUI, and Jetpack Compose**.
- **Proven in Production:** Powers all 12 instant-switch themes inside **[Openflex](https://github.com/kelli-dotcom/openflex)** (CRTA Tech Solutions' zero-cost, anti-ghost remote job board).

---

## 10 Scientific Cognitive & Emotional States (`1,080` Generated + `12` Flagships = `1,092` Themes)

Every generated theme combines **10 color-psychology states × 18 harmonic base hues × 3 luminance modes (`dark`, `dim`, `light`) × 2 contrast tiers (`soft`, `crisp`)**, mathematically verified against **WCAG 2.1** (`1,092 / 1,092` pass AA & AAA primary text contrast):

| State | Color Science & Psychological Effect | Ideal Moment |
| :--- | :--- | :--- |
| **`calm`** | Low-cortisol cool blues & lavenders | Stressful workflows (job search, finance, triage) |
| **`focus`** | Sustained-attention teals & balanced slates | Deep coding, writing, analytical dashboards |
| **`energy`** | Dopamine-lifting warm corals, ambers & citrine | Creative brainstorming, sprint kickoffs |
| **`romantic`** | Warm blush rose, velvet plum & champagne | Warm, inviting editorial & personal spaces |
| **`morning`** | Circadian wake warmth with soft rose-gold clarity | Gentle morning start without harsh white glare |
| **`midday`** | Peak-alertness high-clarity daylight & crisp emerald/cyan | Bright-room midday productivity boosts |
| **`dusk`** | Low-blue-light golden hour & twilight tones | Evening wind-down and melatonin protection |
| **`night`** | Ultra-low-luminance obsidian & midnight tones | Late-night zero-glare sessions |
| **`grounded`** | Biophilic pine, moss, sage & warm earth | Long reading sessions & mental restoration |
| **`executive`** | High-trust monochrome graphite, navy & surgical accents | Enterprise, legal, and financial clarity |

Plus **12 handcrafted Openflex flagship presets** (`obsidian`, `morning-rose`, `midday-sunlit`, `golden-hour`, `calm-lavender`, `tokyo-night`, `catppuccin`, `dracula`, `forest`, `nord`, `paper-light`, `sandstone`) in [`themes/themes.css`](themes/themes.css) and [`themes/tokens.json`](themes/tokens.json).

---

## Flawless 1-Command Setup (Apply Any Theme in Seconds)

### 1. Browse & Preview All 1,080+ Themes Visually
Open [`preview/index.html`](preview/index.html) via any local static server (`npx serve .` or `python3 -m http.server`), filter by cognitive state (`Calm`, `Focus`, `Romantic`, `Morning`, etc.), click any card to preview live in 0ms, and click **Copy Active CSS** or **Copy Active JSON**.

### 2. Apply Any Theme via Zero-Dependency CLI
```bash
# Browse themes by cognitive state
node bin/feather-themes.mjs list --state=calm --mode=dark

# Write a ready-to-import CSS variable file directly into your web app
node bin/feather-themes.mjs apply calm-01-dark-crisp --out=./src/app/theme.css

# Export JSON tokens for React Native / Flutter / SwiftUI / Android Compose
node bin/feather-themes.mjs apply morning-rose --format=json --out=./theme.json

# Export a Tailwind theme color object
node bin/feather-themes.mjs apply golden-hour --format=tailwind

# Verify WCAG 2.1 AA/AAA contrast across all 1,092 themes
node bin/feather-themes.mjs verify-all
```

### 3. Switch Themes Instantly at Runtime (1 Line of JS)
```ts
document.documentElement.dataset.theme = "calm-01-dark-crisp";
localStorage.setItem("app-theme", "calm-01-dark-crisp");
```

---

## AI Agent Skill & Technical Spec Included

- **Reusable AI Agent Skill:** [`skills/lightweight-themes/SKILL.md`](skills/lightweight-themes/SKILL.md)
- **Web & App Theme Specification:** [`design-spec/THEME_SPEC.md`](design-spec/THEME_SPEC.md)
- **Governance & Guardrails:** [`AGENTS.md`](AGENTS.md), [`HANDOFF.md`](HANDOFF.md), [`mistakes.md`](mistakes.md)

---

## License
Distributed under the **MIT License** — free for personal and commercial use. Copyright © 2026 CRTA Tech Solutions.
