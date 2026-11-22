# Feather Themes — Mistakes & Guardrails (`mistakes.md`)

### 1. Pastel Badge Text Washing Out on Light Themes
- **What Happened:** Dark-mode status classes like `text-emerald-300`, `text-amber-300`, and `text-rose-300` lose readability on light themes (`Paper Light`, `Sandstone Light`, `Morning Rose`, `Midday Sunlit`).
- **Never Repeat:** Always pair every light theme selector with deeper 700-level status text overrides (`#047857`, `#0369a1`, `#6d28d9`, `#b45309`, `#be123c`) so WCAG AA contrast holds across every badge.
