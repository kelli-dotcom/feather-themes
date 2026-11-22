# Feather Themes — Master Web & App Theme Specification (`design-spec/THEME_SPEC.md`)

> **Owner:** CRTA Tech Solutions  
> **Production Reference:** Used in [Openflex](https://github.com/kelli-dotcom/openflex)

## 1. Core Budget & Performance Rules
- **0 Runtime Dependencies:** Never require CSS-in-JS, heavy theme frameworks, or image backgrounds.
- **Per-Theme Size Budget:** `<= 400 bytes` uncompressed CSS per theme (`7` semantic tokens + `color-scheme`).
- **Zero Layout Shift (CLS = 0):** Themes change colors only — never swap fonts, padding, or border widths.
- **Reduced Motion Safe:** Respect `@media (prefers-reduced-motion: reduce)` for any color transitions.

## 2. The 7 Semantic Tokens (Web & Native Apps)
Every theme MUST define these exact 7 keys:
1. `bg` (`--ft-bg`): Primary canvas / page background.
2. `surface` (`--ft-surface`): Card, panel, or modal background (may use subtle alpha on dark themes).
3. `surfaceSolid` (`--ft-surface-solid`): Opaque surface for dropdowns, tooltips, and native sheets.
4. `border` (`--ft-border`): Subtle 1px structural divider / card outline.
5. `text` (`--ft-text`): Primary headline & body copy (minimum **7:1** contrast against `bg`/`surface` preferred, **4.5:1 WCAG AA** mandatory).
6. `muted` (`--ft-muted`): Secondary metadata, timestamps, labels (minimum **4.5:1 WCAG AA**).
7. `accent` (`--ft-accent`): Primary interactive focus, CTA highlight, or active state indicator.

## 3. Human Photobiology & Light-Wavelength Grounding
Every theme state in `src/engine.mjs` maps directly to human retinal & circadian light biology:
- **Short-Wave Alertness Band (`~460–490 nm`, melanopsin peak `~480 nm`):** Activates ipRGC photoreceptors to boost alertness and suppress daytime drowsiness — used in **`Midday`** and crisp daylight accents, **strictly minimized in `Dusk` and `Night`**.
- **Photopic Comfort Peak (`~510–565 nm`, peak cone sensitivity `~555 nm`):** Green and teal wavelengths require the least ocular effort for sustained reading — used in **`Grounded`** and **`Focus`** (and Openflex's emerald accent).
- **Long-Wave Warmth & Melatonin-Safe Band (`~585–660 nm`):** Amber, rose, coral, and blush wavelengths preserve evening melatonin onset and reduce visual harshness — used in **`Morning`**, **`Romantic`**, **`Energy`**, and **`Dusk` (`Golden Hour`)**.
- **Low-Irradiance Nocturnal Band (`< 10%` luminance):** Prevents scotopic pupil glare during late-night work — used in **`Night`** and **`Obsidian`**.

## 4. Cross-Platform Mapping
- **Web (CSS / Tailwind / Next.js):** `[data-theme="<id>"]` on `<html>` persisted in `localStorage`.
- **React Native / Expo:** Load `themes/tokens.json` into React Context + `AsyncStorage`.
- **Flutter:** Map each `tokens.json` entry to `ThemeData(colorScheme: ColorScheme(...))`.
- **iOS (SwiftUI) / Android (Jetpack Compose):** Generate `Color` / `ColorScheme` structs directly from `themes/tokens.json`.
