# Feather Themes

**Zero-dependency, ultra-lightweight (~300 bytes/theme) CSS & JSON design-token theme kit + AI agent skill for Web and Mobile apps.**  
*Built by [CRTA Tech Solutions](https://github.com/kelli-dotcom) — used to power all 12 lightweight themes in [Openflex](https://github.com/kelli-dotcom/openflex).*

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-10b981.svg)](themes/themes.css)
[![Themes: 12](https://img.shields.io/badge/Themes-12_Included-8b5cf6.svg)](themes/tokens.json)
[![Used in Openflex](https://img.shields.io/badge/Used_in-Openflex-0ea5e9.svg)](https://github.com/kelli-dotcom/openflex)

---

## Why Feather Themes?

Most UI theme libraries pull in heavy runtime CSS-in-JS bundles, megabytes of presets, or framework lock-in. **Feather Themes** uses **7 semantic tokens per theme** (`bg`, `surface`, `surfaceSolid`, `border`, `text`, `muted`, `accent`) so you can ship **12 curated dark, light, and mood-boosting themes in ~2 KB total** with **0 npm dependencies** and **0ms switching**.

> **Real-World Production Proof:** Used to power all 12 instant-switch themes in **[Openflex](https://github.com/kelli-dotcom/openflex)** (CRTA Tech Solutions' zero-cost, anti-ghost remote job board).

---

## Included Themes (12 Presets)

### Mood & Professional Themes
| Theme ID | Name | Mode | Mood / Use Case |
| :--- | :--- | :---: | :--- |
| `obsidian` | **Obsidian** *(Default)* | Dark | Crisp, high-contrast developer utility |
| `morning-rose` | **Morning Rose** | Light | Soft romantic blush-ivory for calm mornings |
| `midday-sunlit` | **Midday Sunlit** | Light | Warm daylight clarity for midday focus boosts |
| `golden-hour` | **Golden Hour** | Dark | Cozy romantic espresso-plum evening elegance |
| `calm-lavender` | **Calm Lavender** | Dark | Soothing twilight indigo to reduce stress |

### Classic Developer & Light Themes
| Theme ID | Name | Mode | Palette Feel |
| :--- | :--- | :---: | :--- |
| `tokyo-night` | **Tokyo Night** | Dark | Deep navy + electric cyan |
| `catppuccin` | **Catppuccin** | Dark | Warm charcoal + mint |
| `dracula` | **Dracula** | Dark | Deep plum-slate + neon green |
| `forest` | **Forest** | Dark | Deep pine-black + emerald |
| `nord` | **Nord** | Dark | Arctic slate + frost blue |
| `paper-light` | **Paper Light** | Light | Crisp neutral daylight |
| `sandstone` | **Sandstone Light** | Light | Warm cream paper + espresso ink |

---

## 30-Second Quick Start

### Web (CSS Variables — Works with Tailwind, Next.js, Vite, Plain HTML)
1. Copy [`themes/themes.css`](themes/themes.css) into your project's global stylesheet.
2. Switch themes at runtime in 1 line:
   ```ts
   document.documentElement.dataset.theme = "morning-rose";
   localStorage.setItem("app-theme", "morning-rose");
   ```

### Mobile / Cross-Platform Apps (React Native, Flutter, SwiftUI, Android Compose)
Import [`themes/tokens.json`](themes/tokens.json) directly and map the 7 semantic keys (`bg`, `surface`, `surfaceSolid`, `border`, `text`, `muted`, `accent`) to your native theme provider.

---

## AI Agent Skill & Spec Included

- **Reusable Agent Skill:** [`skills/lightweight-themes/SKILL.md`](skills/lightweight-themes/SKILL.md) — drop into any AI coding agent workspace so it generates WCAG AA-compliant, zero-bloat themes automatically.
- **Technical Specification:** [`design-spec/THEME_SPEC.md`](design-spec/THEME_SPEC.md) — token schema, contrast guardrails, light/dark surface rules, and cross-platform mapping.

---

## Project Structure

```text
feather-themes/
├── AGENTS.md                        # Agent governance & lightweight rules
├── HANDOFF.md                       # Active repo state & next steps
├── mistakes.md                      # Contrast & theme-bloat guardrails
├── LICENSE                          # MIT License (CRTA Tech Solutions)
├── design-spec/
│   └── THEME_SPEC.md                # Web + App zero-bloat theme specification
├── skills/
│   └── lightweight-themes/
│       └── SKILL.md                 # Reusable AI agent skill for web & app themes
├── themes/
│   ├── themes.css                   # All 12 themes (~2 KB, 0 dependencies)
│   └── tokens.json                  # Cross-platform JSON tokens (Web, RN, Flutter, iOS, Android)
└── README.md
```

---

## License
Distributed under the **MIT License** — free for personal and commercial use. Copyright © 2026 CRTA Tech Solutions.
