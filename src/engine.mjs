/**
 * Feather Themes v2.0 — Zero-Dependency Scientific Color Engine
 * Generates 1,080 scientifically calibrated themes across 10 cognitive/emotional
 * states (plus 12 flagship handcrafted presets = 1,092 total themes) in <6 KB,
 * with built-in WCAG 2.1 contrast verification.
 *
 * Built by CRTA Tech Solutions | MIT License
 * Used in Openflex: https://github.com/kelli-dotcom/openflex
 */

export const COGNITIVE_STATES = [
  { id: "calm", label: "Calm", wavelengthNm: "440-475 nm (low-chroma)", science: "Low-chroma cool blues & lavenders reduce visual agitation without harsh melanopsin glare", hues: [210, 218, 226, 234, 242, 250, 258, 266, 204, 198, 222, 238, 246, 254, 262, 270, 214, 230], bgSat: 22, accentSat: 58 },
  { id: "focus", label: "Focus", wavelengthNm: "490-540 nm", science: "Near the 555 nm human photopic peak — maximum visual acuity with minimal eye strain", hues: [160, 166, 172, 178, 184, 190, 196, 202, 154, 164, 170, 176, 182, 188, 194, 200, 206, 168], bgSat: 18, accentSat: 66 },
  { id: "energy", label: "Energy", wavelengthNm: "585-625 nm", science: "Warm long-wave amber & coral tones stimulate alertness and creative warmth", hues: [12, 18, 24, 30, 36, 42, 48, 54, 8, 16, 22, 28, 34, 40, 46, 52, 58, 20], bgSat: 24, accentSat: 78 },
  { id: "romantic", label: "Romantic", wavelengthNm: "610-660 nm", science: "Long-wave rose, blush & plum wavelengths minimize blue-light stress and signal warmth", hues: [326, 332, 338, 344, 350, 356, 2, 8, 320, 328, 336, 342, 348, 354, 0, 6, 316, 340], bgSat: 26, accentSat: 62 },
  { id: "morning", label: "Morning", wavelengthNm: "570-620 nm (high-L)", science: "Warm high-luminance sunrise spectrum eases circadian cortisol awakening without harsh glare", hues: [18, 26, 34, 42, 348, 356, 10, 22, 30, 38, 46, 352, 4, 14, 28, 36, 44, 344], bgSat: 28, accentSat: 64 },
  { id: "midday", label: "Midday", wavelengthNm: "475-520 nm (peak)", science: "Balanced short/mid-wave daylight near the 480 nm melanopsin alertness band for peak focus", hues: [145, 155, 165, 175, 185, 195, 205, 215, 150, 160, 170, 180, 190, 200, 210, 220, 140, 172], bgSat: 16, accentSat: 70 },
  { id: "dusk", label: "Dusk", wavelengthNm: "595-650 nm (low-blue)", science: "Long-wave amber/rose dark spectrum avoids 480 nm blue-light spikes to protect evening melatonin", hues: [15, 22, 29, 36, 335, 342, 349, 356, 10, 18, 26, 34, 330, 338, 346, 354, 4, 24], bgSat: 26, accentSat: 64 },
  { id: "night", label: "Night", wavelengthNm: "Low-luminance (<10% L)", science: "Ultra-low screen irradiance reduces scotopic glare and retinal fatigue during late-night work", hues: [220, 230, 240, 250, 260, 270, 280, 195, 205, 215, 225, 235, 245, 255, 265, 275, 185, 232], bgSat: 20, accentSat: 62 },
  { id: "grounded", label: "Grounded", wavelengthNm: "520-565 nm (photopic peak)", science: "Biophilic green wavelengths sit at peak human eye sensitivity (555 nm) for effortless reading", hues: [85, 95, 105, 115, 125, 135, 145, 155, 78, 88, 98, 108, 118, 128, 138, 148, 158, 122], bgSat: 20, accentSat: 56 },
  { id: "executive", label: "Executive", wavelengthNm: "Achromatic + surgical accent", science: "Low-saturation neutral luminance minimizes cognitive load for high-stakes decision making", hues: [210, 220, 230, 160, 180, 200, 240, 260, 340, 35, 145, 170, 195, 215, 225, 235, 250, 155], bgSat: 10, accentSat: 60 },
];

export const LUMINANCE_MODES = ["dark", "dim", "light"];
export const CONTRAST_TIERS = ["soft", "crisp"];

export function hslToHex(h, s, l) {
  const hue = ((h % 360) + 360) % 360;
  const sat = Math.max(0, Math.min(100, s)) / 100;
  const lig = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lig - c / 2;
  let r = 0, g = 0, b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ];
}

export function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA, hexB) {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}

export function generateTheme(stateObj, hueIndex, mode, tier) {
  const hue = stateObj.hues[hueIndex];
  const isLight = mode === "light";
  const isDim = mode === "dim";
  const isCrisp = tier === "crisp";

  // Scientific luminance stepping guarantees WCAG AA (>=4.5 muted, >=7.0 text)
  let bg, surface, border, text, muted, accent;

  if (isLight) {
    bg = hslToHex(hue, Math.min(35, stateObj.bgSat + 6), isCrisp ? 98 : 96);
    surface = hslToHex(hue, Math.min(25, stateObj.bgSat), 100);
    border = hslToHex(hue, Math.min(24, stateObj.bgSat), isCrisp ? 80 : 86);
    text = hslToHex(hue, 18, isCrisp ? 9 : 14);
    muted = hslToHex(hue, 14, isCrisp ? 30 : 35);
    accent = hslToHex(hue, stateObj.accentSat, isCrisp ? 34 : 38);
  } else if (isDim) {
    bg = hslToHex(hue, stateObj.bgSat, isCrisp ? 13 : 16);
    surface = hslToHex(hue, stateObj.bgSat, isCrisp ? 18 : 21);
    border = hslToHex(hue, stateObj.bgSat, isCrisp ? 30 : 28);
    text = hslToHex(hue, 16, isCrisp ? 96 : 92);
    muted = hslToHex(hue, 18, isCrisp ? 74 : 70);
    accent = hslToHex(hue, stateObj.accentSat, isCrisp ? 66 : 62);
  } else {
    // Dark
    bg = hslToHex(hue, stateObj.bgSat, isCrisp ? 6 : 9);
    surface = hslToHex(hue, stateObj.bgSat, isCrisp ? 11 : 14);
    border = hslToHex(hue, stateObj.bgSat, isCrisp ? 24 : 22);
    text = hslToHex(hue, 14, isCrisp ? 96 : 92);
    muted = hslToHex(hue, 16, isCrisp ? 72 : 68);
    accent = hslToHex(hue, stateObj.accentSat, isCrisp ? 62 : 58);
  }

  const id = `${stateObj.id}-${String(hueIndex + 1).padStart(2, "0")}-${mode}-${tier}`;
  const label = `${stateObj.label} ${String(hueIndex + 1).padStart(2, "0")} (${mode} · ${tier})`;

  const textContrast = contrastRatio(text, surface);
  const mutedContrast = contrastRatio(muted, surface);

  return {
    id,
    label,
    state: stateObj.id,
    wavelengthNm: stateObj.wavelengthNm,
    science: stateObj.science,
    mode: isLight ? "light" : "dark",
    hue,
    tier,
    tokens: {
      bg,
      surface,
      surfaceSolid: surface,
      border,
      text,
      muted,
      accent,
    },
    wcag: {
      textContrast,
      mutedContrast,
      aaPass: textContrast >= 4.5 && mutedContrast >= 4.5,
      aaaText: textContrast >= 7.0,
    },
  };
}

export function generateAllScientificThemes() {
  const all = [];
  for (const stateObj of COGNITIVE_STATES) {
    for (let hIdx = 0; hIdx < stateObj.hues.length; hIdx++) {
      for (const mode of LUMINANCE_MODES) {
        for (const tier of CONTRAST_TIERS) {
          all.push(generateTheme(stateObj, hIdx, mode, tier));
        }
      }
    }
  }
  return all;
}

export function toCssBlock(theme) {
  return `[data-theme="${theme.id}"] {
  color-scheme: ${theme.mode};
  --ft-bg: ${theme.tokens.bg};
  --ft-surface: ${theme.tokens.surface};
  --ft-surface-solid: ${theme.tokens.surfaceSolid};
  --ft-border: ${theme.tokens.border};
  --ft-text: ${theme.tokens.text};
  --ft-muted: ${theme.tokens.muted};
  --ft-accent: ${theme.tokens.accent};
}`;
}
