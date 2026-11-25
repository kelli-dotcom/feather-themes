// Feather Themes — zero-dependency colour engine. CRTA Tech Solutions, MIT.
// 1,080 themes from 10 states (+ 12 flagships = 1,092). WCAG 2.1 contrast built in.

export const COGNITIVE_STATES = [
  { id: "calm", label: "Calm", wavelengthNm: "Low sat, low light", science: "Cool tones calm first.", hues: [210, 218, 226, 234, 242, 250, 258, 266, 204, 198, 222, 238, 246, 254, 262, 270, 214, 230], bgSat: 22, accentSat: 58 },
  { id: "focus", label: "Focus", wavelengthNm: "490-540 nm", science: "Sharpest at 555 nm.", hues: [160, 166, 172, 178, 184, 190, 196, 202, 154, 164, 170, 176, 182, 188, 194, 200, 206, 168], bgSat: 18, accentSat: 66 },
  { id: "energy", label: "Energy", wavelengthNm: "585-625 nm", science: "Warm amber lifts alertness.", hues: [12, 18, 24, 30, 36, 42, 48, 54, 8, 16, 22, 28, 34, 40, 46, 52, 58, 20], bgSat: 24, accentSat: 78 },
  { id: "romantic", label: "Romantic", wavelengthNm: "610-660 nm", science: "Rose, less blue stress.", hues: [326, 332, 338, 344, 350, 356, 2, 8, 320, 328, 336, 342, 348, 354, 0, 6, 316, 340], bgSat: 26, accentSat: 62 },
  { id: "morning", label: "Morning", wavelengthNm: "570-620 nm", science: "Sunrise, no glare.", hues: [18, 26, 34, 42, 348, 356, 10, 22, 30, 38, 46, 352, 4, 14, 28, 36, 44, 344], bgSat: 28, accentSat: 64 },
  { id: "midday", label: "Midday", wavelengthNm: "475-520 nm", science: "Daylight, peak focus.", hues: [145, 155, 165, 175, 185, 195, 205, 215, 150, 160, 170, 180, 190, 200, 210, 220, 140, 172], bgSat: 16, accentSat: 70 },
  { id: "dusk", label: "Dusk", wavelengthNm: "595-650 nm", science: "Amber saves melatonin.", hues: [15, 23, 29, 37, 335, 342, 349, 357, 11, 19, 27, 35, 330, 338, 346, 354, 5, 24], bgSat: 26, accentSat: 64 },
  { id: "night", label: "Night", wavelengthNm: "<10% luminance", science: "Low light, less glare.", hues: [220, 230, 240, 250, 260, 270, 280, 195, 205, 215, 225, 235, 245, 255, 265, 275, 185, 232], bgSat: 20, accentSat: 62 },
  { id: "grounded", label: "Grounded", wavelengthNm: "520-565 nm", science: "Green, peak sight.", hues: [85, 95, 105, 115, 125, 135, 145, 155, 78, 88, 98, 108, 118, 128, 138, 148, 158, 122], bgSat: 20, accentSat: 56 },
  { id: "executive", label: "Executive", wavelengthNm: "Achromatic + accent", science: "Neutral, less load.", hues: [210, 220, 230, 160, 180, 200, 240, 260, 340, 35, 145, 170, 195, 215, 225, 235, 250, 155], bgSat: 10, accentSat: 60 },
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
  const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function relativeLuminance(hex) {
  const [r, g, b] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((part) => {
    const v = parseInt(part, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA, hexB) {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  return Number(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2));
}

// Lightness per mode/tier, token order: bg, surface, border, text, muted, accent.
const LIGHTNESS = {
  light: { crisp: [98, 100, 80, 9, 30, 34], soft: [96, 100, 86, 14, 35, 38] },
  dim: { crisp: [13, 18, 30, 96, 74, 66], soft: [16, 21, 28, 92, 70, 62] },
  dark: { crisp: [6, 11, 24, 96, 72, 62], soft: [9, 14, 22, 92, 68, 58] },
};

export function generateTheme(stateObj, hueIndex, mode, tier) {
  const hue = stateObj.hues[hueIndex];
  const isLight = mode === "light";
  const { bgSat, accentSat } = stateObj;
  // Saturation per token; light caps the first three.
  const sats = isLight
    ? [Math.min(35, bgSat + 6), Math.min(25, bgSat), Math.min(24, bgSat), 18, 14, accentSat]
    : [bgSat, bgSat, bgSat, mode === "dim" ? 16 : 14, mode === "dim" ? 18 : 16, accentSat];
  const lights = LIGHTNESS[mode][tier];
  const [bg, surface, border, text, muted, accent] = sats.map((s, i) =>
    hslToHex(hue, s, lights[i])
  );
  const n = String(hueIndex + 1).padStart(2, "0");
  const id = `${stateObj.id}-${n}-${mode}-${tier}`;
  const label = `${stateObj.label} ${n} (${mode} · ${tier})`;

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
  for (const state of COGNITIVE_STATES) {
    for (let h = 0; h < state.hues.length; h++) {
      for (const mode of LUMINANCE_MODES) {
        for (const tier of CONTRAST_TIERS) {
          all.push(generateTheme(state, h, mode, tier));
        }
      }
    }
  }
  return all;
}

export function toCssBlock(theme) {
  const { id, mode, tokens: t } = theme;
  return `[data-theme="${id}"] {
  color-scheme: ${mode};
  --ft-bg: ${t.bg};
  --ft-surface: ${t.surface};
  --ft-surface-solid: ${t.surfaceSolid};
  --ft-border: ${t.border};
  --ft-text: ${t.text};
  --ft-muted: ${t.muted};
  --ft-accent: ${t.accent};
}`;
}
