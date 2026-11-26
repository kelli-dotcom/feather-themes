# Tactile Button Press (`tactile-button-press`)

Add a crisp, physical press feel to every interactive button using ~200 bytes of pure CSS — zero JavaScript, zero dependencies, and zero colour changes to light or dark Feather Themes.

## CSS Recipe (~200 Bytes)

```css
button:not(:disabled),
a[role="button"] {
  touch-action: manipulation;
  transition: transform 90ms cubic-bezier(0.2, 0, 0, 1);
}

button:not(:disabled):active,
a[role="button"]:active {
  transform: translateY(1px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  button:not(:disabled):active,
  a[role="button"]:active {
    transform: none;
  }
}
```

## Rules

- **Preserve all theme colours:** Never alter background, border, or light-theme contrast tokens to fake a press effect — use `transform` only.
- **Mobile-first tap response:** Always include `touch-action: manipulation` to remove mobile tap delay.
- **Accessibility:** Always respect `@media (prefers-reduced-motion: reduce)` and skip `:disabled` buttons.
