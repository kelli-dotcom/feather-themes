// Feather Themes — Optional Switcher Menu (zero dependencies, no framework)
// Usage:
//   <script type="module">
//     import { createFeatherSwitcher } from "./switcher/feather-switcher.js";
//     createFeatherSwitcher({ container: "#theme-menu" });
//   </script>
// Or with your own list:
//   createFeatherSwitcher({ container: document.body, themes: ["obsidian", "nord", "paper-light"] });
//
// What it does: builds a small <select> menu from the theme ids you pass
// in (default: the 12 flagships), switches with one data-theme flip, and
// saves the manual pick in localStorage. That manual pick wins over auto
// mode: it sets localStorage "feather-theme-mode" to "manual", so the
// auto-time file will not override it until the dev calls startAuto again.
// No auto behaviour in this file. Nothing is fetched, nothing is sent
// anywhere. If you do not want a menu, do not include this file — just
// take the tokens and use them as branding in your own site or app.

export const FEATHER_FLAGSHIPS = [
  "obsidian",
  "morning-rose",
  "midday-sunlit",
  "golden-hour",
  "calm-lavender",
  "tokyo-night",
  "catppuccin",
  "dracula",
  "forest",
  "nord",
  "paper-light",
  "sandstone",
];

export const FEATHER_THEME_KEY = "feather-theme";
export const FEATHER_MODE_KEY = "feather-theme-mode";

export function getSavedTheme() {
  try {
    return window.localStorage.getItem(FEATHER_THEME_KEY);
  } catch (_err) {
    return null;
  }
}

export function setFeatherTheme(themeId, options = {}) {
  const save = options.save !== false;
  document.documentElement.dataset.theme = themeId;
  if (save) {
    try {
      window.localStorage.setItem(FEATHER_THEME_KEY, themeId);
      window.localStorage.setItem(FEATHER_MODE_KEY, "manual");
    } catch (_err) {
      // Private browsing / storage blocked: the theme still switches
      // for this visit, it just is not remembered.
    }
  }
  if (typeof options.onChange === "function") options.onChange(themeId);
  return themeId;
}

export function createFeatherSwitcher(options = {}) {
  const themes = Array.isArray(options.themes) && options.themes.length > 0
    ? options.themes
    : FEATHER_FLAGSHIPS;
  const container = typeof options.container === "string"
    ? document.querySelector(options.container)
    : options.container || document.body;
  if (!container) throw new Error("Feather switcher: container not found.");

  const label = document.createElement("label");
  label.textContent = options.label || "Theme";
  label.setAttribute("for", "feather-theme-select");

  const select = document.createElement("select");
  select.id = "feather-theme-select";
  select.setAttribute("aria-label", options.label || "Theme");
  for (const id of themes) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = id;
    select.appendChild(option);
  }

  const saved = getSavedTheme();
  const current = saved && themes.includes(saved)
    ? saved
    : document.documentElement.dataset.theme || themes[0];
  select.value = current;
  if (saved && themes.includes(saved)) {
    document.documentElement.dataset.theme = saved;
  }

  select.addEventListener("change", () => {
    setFeatherTheme(select.value, { onChange: options.onChange });
  });

  label.appendChild(select);
  container.appendChild(label);
  return select;
}

// Browser global for non-module use:
//   <script src="./switcher/feather-switcher.js"></script>
//   <script>FeatherSwitcher.createFeatherSwitcher({ container: "#theme-menu" });</script>
if (typeof window !== "undefined") {
  window.FeatherSwitcher = {
    createFeatherSwitcher,
    setFeatherTheme,
    getSavedTheme,
    FEATHER_FLAGSHIPS,
  };
}
