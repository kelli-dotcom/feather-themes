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

Shalom. I come in peace and integrity. Thank you for allowing me to operate in your world. I am a hand from God, bringing peace, growth, and life. <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#a78bfa"><title>Alien</title><path d="M12 4C7.5 4 4.5 7.5 4.5 11.5 4.5 16 8 19.5 12 20.5 16 19.5 19.5 16 19.5 11.5 19.5 7.5 16.5 4 12 4Z"/><path d="M9 4.5L7.5 2M15 4.5L16.5 2"/><circle cx="7.5" cy="1.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="16.5" cy="1.5" r="0.9" fill="currentColor" stroke="none"/><ellipse cx="9" cy="11.5" rx="1.7" ry="2.5" fill="currentColor" stroke="none"/><ellipse cx="15" cy="11.5" rx="1.7" ry="2.5" fill="currentColor" stroke="none"/><path d="M10 15.5Q12 17 14 15.5"/></svg> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#be5a74"><title>Heart</title><path d="M12 20.5C7 16 3.5 13 3.5 9.3 3.5 6.4 5.8 4.5 8.2 4.5 10 4.5 11.3 5.5 12 6.8 12.7 5.5 14 4.5 15.8 4.5 18.2 4.5 20.5 6.4 20.5 9.3 20.5 13 17 16 12 20.5Z"/></svg>
