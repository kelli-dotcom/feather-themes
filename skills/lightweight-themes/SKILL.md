---
name: lightweight-themes
description: Design and implement zero-dependency, ultra-lightweight (~300 bytes/theme) CSS-variable and JSON-token themes for web and mobile apps with WCAG AA contrast, mood palettes, and instant localStorage persistence.
---

# Lightweight Web & App Themes Skill

Use this skill whenever adding personalization themes to a web app (Next.js, Tailwind, Vite, HTML) or mobile app (React Native, Flutter, SwiftUI, Compose) without weighing down the repository or bundle.

## Rules
1. **Zero Extra Dependencies:** Use native CSS Custom Properties (`[data-theme="..."]`) on web and a single flat `tokens.json` file on native apps. Never install heavy runtime theme packages.
2. **7 Semantic Tokens Only:** Every theme defines strictly `bg`, `surface`, `surfaceSolid`, `border`, `text`, `muted`, and `accent` plus `color-scheme: light | dark`.
3. **WCAG AA Contrast Gate:** Verify primary text has `>= 4.5:1` contrast (ideally `>= 7:1`) on both `bg` and `surface`. For light themes (`Paper Light`, `Sandstone Light`, `Morning Rose`, `Midday Sunlit`), always remap light pastel status text (`text-emerald-300`, `text-amber-300`, `text-rose-300`) to deeper 700-level shades so badges stay crisp and readable.
4. **Curated Mood Coverage:** Offer a balanced mix of:
   - Default signature dark (`Obsidian`)
   - Romantic / mood-calming & focus palettes (`Morning Rose`, `Midday Sunlit`, `Golden Hour`, `Calm Lavender`)
   - Beloved developer classics (`Tokyo Night`, `Catppuccin`, `Dracula`, `Forest`, `Nord`)
   - Clean light modes (`Paper Light`, `Sandstone Light`)
5. **Instant Persistence:** Save the chosen theme ID in `localStorage` (web) or `AsyncStorage`/`SharedPreferences` (mobile) and apply it to `document.documentElement.dataset.theme` with zero page reload.

## Reference Implementation
- **Live Production Example:** [kelli-dotcom/openflex](https://github.com/kelli-dotcom/openflex) (`src/app/globals.css` + `src/components/JobBoard.tsx`).
- **Drop-In Assets:** `themes/themes.css` and `themes/tokens.json` in this repository.
