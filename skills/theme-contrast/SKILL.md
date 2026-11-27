# Theme Contrast — keep text visible when themes change

One job: make sure every word stays readable in every theme, light and dark.

## The rule

Every text color must contrast with the background it sits on, in every theme the app offers. Light enough to see on dark, dark enough to see on light. If a theme change makes any word hard to read, the theme is broken, not the word.

## How it breaks

A theme changes the background but not the text, or the text but not the background. The usual causes:
- A fixed light text color (white, pale cyan, pale yellow) on a background that turns light in a light theme.
- A fixed dark text color (near-black, dark gray) on a background that stays dark in a light theme.
- A background class with no theme override, so it keeps its dark color while the text flips dark.
- An accent color that is bright enough for dark themes but too pale for light themes, or dark enough for light themes but too dim for dark themes.

## The fix

Text and background come from the same theme. Never set a text color that assumes the background is light or dark. Use the theme variables for all text and all surfaces:
- Main text uses the theme text color.
- Secondary text uses the theme muted color.
- Accent text uses the theme accent color.
- Card and panel backgrounds use the theme surface color.
- Page background uses the theme background color.
- Borders use the theme border color.

A fixed bright color (for example a solid green button) keeps its own dark text, because the button color never changes with the theme. Only text on a themed background must use a theme color.

## Check

Switch to each theme, light and dark, and read every part of the page: the logo, the hero, the buttons, the cards, the pills, the badges, the footers. Every word must be easy to read. Check body text at 4.5 to 1 contrast or better, and large headings at 3 to 1 or better. If any word is hard to read in any theme, fix the color pair before shipping.

## Never

- Never ship a theme where any text is hard to read.
- Never use a fixed text color on a background that changes with the theme.
- Never add a new background color without a theme override for it.
- Never assume a theme is fine because it looks right in one mode. Check light and dark.
