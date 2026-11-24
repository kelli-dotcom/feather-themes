// Feather Themes — Auto Time Mode (browser only, zero dependencies)
// Usage:
//   <script type="module">
//     import { startAuto } from "./auto/feather-auto-time.js";
//     startAuto(); // user taps Auto, or the site starts in auto for new visitors
//   </script>
//   <button id="auto-btn">Auto</button>
//   <script type="module">
//     import { startAuto, stopAuto } from "./auto/feather-auto-time.js";
//     document.getElementById("auto-btn").addEventListener("click", startAuto);
//   </script>
//
// What it does: reads the device clock once on load, picks one window,
// and sets the theme with one data-theme flip. It re-checks only at the
// next window boundary, with one timer. It never drifts minute by minute,
// never polls, and uses no location, no sunrise API, and no network.
// Windows (device local time):
//   morning      05:00-11:00 -> morning-rose
//   midday       11:00-14:00 -> midday-sunlit
//   afternoon    14:00-17:00 -> sandstone (afternoon dip, lower saturation)
//   evening      17:00-21:00 -> golden-hour
//   late night   21:00-05:00 -> obsidian
// Manual pick always wins: a manual pick saves localStorage
// "feather-theme-mode" as "manual", and auto stops. Auto only runs again
// when the user taps Auto (startAuto). Reduced motion is respected: this
// file never adds a transition or animation, the theme changes in one
// instant flip, with no smooth colour drift.

export const FEATHER_THEME_KEY = "feather-theme";
export const FEATHER_MODE_KEY = "feather-theme-mode";

export const FEATHER_WINDOWS = [
  { name: "morning", startHour: 5, endHour: 11, theme: "morning-rose" },
  { name: "midday", startHour: 11, endHour: 14, theme: "midday-sunlit" },
  { name: "afternoon", startHour: 14, endHour: 17, theme: "sandstone" },
  { name: "evening", startHour: 17, endHour: 21, theme: "golden-hour" },
  { name: "late night", startHour: 21, endHour: 5, theme: "obsidian" },
];

export function getWindowForHour(hour) {
  const h = ((hour % 24) + 24) % 24;
  for (const w of FEATHER_WINDOWS) {
    if (w.startHour < w.endHour) {
      if (h >= w.startHour && h < w.endHour) return w;
    } else if (h >= w.startHour || h < w.endHour) {
      return w;
    }
  }
  return FEATHER_WINDOWS[FEATHER_WINDOWS.length - 1];
}

export function getThemeForHour(hour) {
  return getWindowForHour(hour).theme;
}

export function getWindowForDate(date) {
  return getWindowForHour(date.getHours());
}

export function msUntilNextBoundary(date) {
  const now = date instanceof Date ? date : new Date();
  const boundaries = [5, 11, 14, 17, 21];
  for (const hour of boundaries) {
    const next = new Date(now);
    next.setHours(hour, 0, 0, 0);
    if (next.getTime() > now.getTime()) return next.getTime() - now.getTime();
  }
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(5, 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
}

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (_err) {
    return false;
  }
}

let timerId = null;

function applyAutoTheme(now) {
  // A manual pick since auto started wins: stop, do not override it.
  try {
    if (window.localStorage.getItem(FEATHER_MODE_KEY) === "manual") {
      stopAuto();
      return null;
    }
  } catch (_err) {
    // Storage blocked: still apply for this visit.
  }
  const windowInfo = getWindowForDate(now || new Date());
  // Reduced motion: no transition is added anywhere in this file, so
  // the change is always one instant flip, never a smooth drift.
  void prefersReducedMotion();
  document.documentElement.dataset.theme = windowInfo.theme;
  try {
    window.localStorage.setItem(FEATHER_THEME_KEY, windowInfo.theme);
    window.localStorage.setItem(FEATHER_MODE_KEY, "auto");
  } catch (_err) {
    // Private browsing / storage blocked: theme still applies now.
  }
  return windowInfo;
}

export function startAuto() {
  stopAuto();
  try {
    window.localStorage.setItem(FEATHER_MODE_KEY, "auto");
  } catch (_err) {
    // Storage blocked: auto still runs for this visit.
  }
  const windowInfo = applyAutoTheme(new Date());
  if (!windowInfo) return null;
  // One timer only, firing at the next window boundary.
  timerId = setTimeout(() => {
    const next = applyAutoTheme(new Date());
    if (next) startAuto();
  }, msUntilNextBoundary(new Date()));
  return windowInfo;
}

export function stopAuto() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
}

export function isAutoRunning() {
  return timerId !== null;
}

// Browser global for non-module use:
//   <script src="./auto/feather-auto-time.js"></script>
//   <script>FeatherAutoTime.startAuto();</script>
if (typeof window !== "undefined") {
  window.FeatherAutoTime = {
    startAuto,
    stopAuto,
    isAutoRunning,
    getThemeForHour,
    getWindowForHour,
    FEATHER_WINDOWS,
  };
}
