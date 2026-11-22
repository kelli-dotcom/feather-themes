<h1 align="center">Feather Themes</h1>

<p align="center">
  <strong>1,092 scientifically calibrated, WCAG 2.1 AA/AAA verified themes across 10 human photobiology states — in under 6 KB with 0 dependencies.</strong><br />
  <em>Built by CRTA Tech Solutions · Powers all 12 built-in themes in <a href="https://github.com/kelli-dotcom/openflex">Openflex</a>.</em>
</p>

<p align="center">
  <a href="#-quick-start"><strong>Quick Start</strong></a> ·
  <a href="#-10-photobiology--cognitive-states"><strong>Color Science</strong></a> ·
  <a href="#-built-for-speed-and-feeling"><strong>Who It's For</strong></a> ·
  <a href="preview/index.html"><strong>Live Explorer</strong></a> ·
  <a href="https://github.com/kelli-dotcom/feather-themes/issues"><strong>Request Theme</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Themes-1%2C092_Verified-8b5cf6?style=for-the-badge" alt="1,092 Themes" />
  <img src="https://img.shields.io/badge/WCAG_2.1-1092%2F1092_AAA-10b981?style=for-the-badge" alt="WCAG AAA" />
  <img src="https://img.shields.io/badge/Dependencies-0-0ea5e9?style=for-the-badge" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/Used_in-Openflex-059669?style=for-the-badge" alt="Used in Openflex" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <img src="assets/demo.gif" alt="Feather Themes Live Theme Switching Demo" width="90%" />
</p>

```bash
# Browse 1,092 photobiology themes by cognitive state & apply in 1 command:
node bin/feather-themes.mjs list --state=calm --mode=dark
node bin/feather-themes.mjs apply calm-01-dark-crisp --out=./src/app/theme.css
node bin/feather-themes.mjs verify-all   # 1092/1092 WCAG 2.1 AA & AAA Pass
```

---

## ✨ Built for Speed *and* Feeling

Most UI theme libraries ship megabytes of runtime CSS-in-JS or washed-out light modes that fail contrast checks. **Feather Themes** is crafted for solo founders, frontend engineers, mobile app builders, and AI coding agents who want rich, mood-aware personalization with **zero repo bloat**.

- **Best Used For:** Job boards, SaaS dashboards, focus/study apps, wellness tools, and consumer web/mobile apps where calming anxiety, boosting midday focus, or softening late-night glare directly improves retention.
- **When It Shines:** Drop it in at project kickoff or during a UX polish pass to ship morning, midday, romantic dusk, and zero-glare night modes in under 60 seconds.
- **Runs Everywhere:** Native CSS variables for **Next.js, Tailwind CSS, Vite, and plain HTML**, plus flat JSON tokens for **React Native, Flutter, SwiftUI, and Jetpack Compose**.
- **Production Proof:** Powers all 12 instant-switch themes inside **[Openflex](https://github.com/kelli-dotcom/openflex)**.

---

## 🧠 10 Photobiology & Cognitive States (`1,080` Generated + `12` Flagships)

Every generated theme combines **10 light-wavelength states × 18 harmonic base hues × 3 luminance modes (`dark`, `dim`, `light`) × 2 contrast tiers (`soft`, `crisp`)**, mathematically audited against **WCAG 2.1** (`1,092 / 1,092` pass AA & AAA primary text contrast):

| State | Wavelength Band | Human Photobiology Effect | Ideal Moment |
| :--- | :---: | :--- | :--- |
| **`calm`** | `440–475 nm` *(low-chroma)* | Reduces visual agitation without harsh glare | High-stress workflows (job search, finance) |
| **`focus`** | `490–540 nm` | Near the `555 nm` human photopic peak for low eye strain | Deep coding, writing, analytics |
| **`energy`** | `585–625 nm` | Warm amber & coral tones lift alertness & creativity | Sprint kickoffs, brainstorming |
| **`romantic`** | `610–660 nm` | Long-wave rose & plum minimize blue-light stress | Warm editorial & personal spaces |
| **`morning`** | `570–620 nm` *(high-L)* | Warm sunrise spectrum eases circadian wake-up | Gentle morning sessions |
| **`midday`** | `475–520 nm` *(peak)* | Short/mid-wave clarity near the `480 nm` melanopsin band | Bright-room midday productivity |
| **`dusk`** | `595–650 nm` *(low-blue)* | Avoids `480 nm` blue spikes to protect evening melatonin | Evening wind-down (`Golden Hour`) |
| **`night`** | `<10%` luminance | Ultra-low irradiance prevents nocturnal pupil glare | Late-night zero-glare coding |
| **`grounded`** | `520–565 nm` *(photopic)* | Biophilic greens sit at peak human cone sensitivity | Long reading & mental restoration |
| **`executive`** | Achromatic + accent | Low-saturation neutrals minimize cognitive load | Enterprise, legal & financial tools |

---

## 🚀 Quick Start

```bash
# 1. Clone Feather Themes
git clone https://github.com/kelli-dotcom/feather-themes.git && cd feather-themes

# 2. Export any of the 1,092 themes to CSS, JSON (mobile), or Tailwind
node bin/feather-themes.mjs apply morning-rose --format=css --out=./theme.css
node bin/feather-themes.mjs apply golden-hour --format=json --out=./theme.json
node bin/feather-themes.mjs apply calm-01-dark-crisp --format=tailwind

# 3. Or visually browse & copy all 1,080+ themes live in your browser
npx serve .   # open /preview/index.html
```

Switch themes at runtime in 1 line:
```ts
document.documentElement.dataset.theme = "morning-rose";
localStorage.setItem("app-theme", "morning-rose");
```

---

## 🤖 AI Agent Skill & Spec Included

- **Reusable AI Agent Skill:** [`skills/lightweight-themes/SKILL.md`](skills/lightweight-themes/SKILL.md)
- **Web & App Photobiology Spec:** [`design-spec/THEME_SPEC.md`](design-spec/THEME_SPEC.md)
- **Governance & Guardrails:** [`AGENTS.md`](AGENTS.md) · [`HANDOFF.md`](HANDOFF.md) · [`mistakes.md`](mistakes.md)

---

## 🤝 Contributing

We welcome new photobiology wavelength palettes, zero-dependency framework exporters (Tailwind, Expo, SwiftUI, Compose), and preview improvements from both **human developers** and **AI coding agents**:

```bash
# 1. Fork & create a feature branch
git checkout -b feat/your-theme-or-exporter

# 2. Build & verify 100% WCAG 2.1 AA/AAA contrast compliance (0 errors required)
node bin/feather-themes.mjs build && node bin/feather-themes.mjs verify
```

Read the full guide in **[`CONTRIBUTING.md`](CONTRIBUTING.md)** · **[Open an Issue](https://github.com/kelli-dotcom/feather-themes/issues)** · **[Submit a Pull Request](https://github.com/kelli-dotcom/feather-themes/pulls)**

---

## 🌐 CRTA Tech Solutions Open-Source Ecosystem

| Repository | What It Does |
| :--- | :--- |
| **[openflex](https://github.com/kelli-dotcom/openflex)** | Zero-cost, anti-ghost, Remote-Truth job board *(powered by Feather Themes)* |
| **[feather-themes](https://github.com/kelli-dotcom/feather-themes)** | 1,092 photobiology-calibrated, 0-dep WCAG AA/AAA themes *(this repo)* |
| **[agent-etiquette](https://github.com/kelli-dotcom/agent-etiquette)** | Multi-agent workflow rules, JSON handoff schemas & Rule of 2 loop caps |
| **[archetype-agent-vault](https://github.com/kelli-dotcom/archetype-agent-vault)** | 7 character-driven AI coding agent suites (27 specialists) |
| **[github-trending-kit](https://github.com/kelli-dotcom/github-trending-kit)** | AI agent & skill kit for top-GitHub READMEs, SEO topics & launch copy |

## 📄 License
MIT License — free for personal and commercial use. Copyright © 2026 **CRTA Tech Solutions**.
