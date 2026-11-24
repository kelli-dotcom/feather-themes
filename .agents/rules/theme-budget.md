---
trigger: glob
globs:
  - "themes/**"
description: Enforce <=400B CSS theme budget, 7 semantic tokens, WCAG AA >=4.5:1 contrast, and CSS/JSON parity in feather-themes.
---

# Feather Themes Budget & Contrast Invariant

1. **Strict Size Cap:** Every individual theme MUST stay `<= 400 bytes` of CSS with zero runtime JS/CSS-in-JS dependencies or background images.
2. **7 Semantic Tokens Only:** Define only `bg`, `surface`, `surfaceSolid`, `border`, `text`, `muted`, `accent` plus `color-scheme`.
3. **WCAG AA Contrast Gate:** Verify `>= 4.5:1` foreground/background contrast across both dark and light modes before committing.
4. **CSS/JSON Parity:** Keep `themes/themes.css` and `themes/tokens.json` 100% synchronized.
