#!/usr/bin/env node
/**
 * Feather Themes CLI — Flawless 1-Command Theme Installer & WCAG Verifier
 *
 * Usage:
 *   node bin/feather-themes.mjs list [--state=calm] [--mode=dark] [--limit=20]
 *   node bin/feather-themes.mjs apply <theme-id> [--format=css|json|tailwind] [--out=<file>]
 *   node bin/feather-themes.mjs verify-all
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  COGNITIVE_STATES,
  contrastRatio,
  generateAllScientificThemes,
  toCssBlock,
} from "../src/engine.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FLAGSHIP_PATH = resolve(__dirname, "../themes/tokens.json");

function loadAllThemes() {
  const flagshipRaw = JSON.parse(readFileSync(FLAGSHIP_PATH, "utf8"));
  const flagships = Object.entries(flagshipRaw.themes).map(([id, t]) => ({
    id,
    label: t.label,
    state: "flagship",
    science: "Handcrafted Openflex flagship preset",
    mode: t.mode,
    tokens: {
      bg: t.bg,
      surface: t.surface,
      surfaceSolid: t.surfaceSolid,
      border: t.border,
      text: t.text,
      muted: t.muted,
      accent: t.accent,
    },
    wcag: {
      textContrast: contrastRatio(t.text, t.surface),
      mutedContrast: contrastRatio(t.muted, t.surface),
      aaPass:
        contrastRatio(t.text, t.surface) >= 4.5 &&
        contrastRatio(t.muted, t.surface) >= 4.5,
      aaaText: contrastRatio(t.text, t.surface) >= 7.0,
    },
  }));

  return [...flagships, ...generateAllScientificThemes()];
}

const args = process.argv.slice(2);
const cmd = args[0] || "help";
const getFlag = (name, fallback = null) => {
  const found = args.find((a) => a.startsWith(`--${name}=`));
  return found ? found.split("=").slice(1).join("=") : fallback;
};

const allThemes = loadAllThemes();

if (cmd === "verify-all") {
  let passCount = 0;
  let aaaCount = 0;
  const failures = [];

  for (const t of allThemes) {
    if (t.wcag.aaPass) passCount++;
    else failures.push(`${t.id} (text=${t.wcag.textContrast}, muted=${t.wcag.mutedContrast})`);
    if (t.wcag.aaaText) aaaCount++;
  }

  console.log(
    `[FEATHER THEMES WCAG AUDIT] Total: ${allThemes.length} | WCAG AA Pass: ${passCount}/${allThemes.length} | AAA Primary Text: ${aaaCount}/${allThemes.length}`
  );
  if (failures.length > 0) {
    console.error("Failures:", failures.slice(0, 10));
    process.exit(1);
  }
  process.exit(0);
}

if (cmd === "list") {
  const state = getFlag("state");
  const mode = getFlag("mode");
  const limit = Number(getFlag("limit", "25"));

  let filtered = allThemes;
  if (state) filtered = filtered.filter((t) => t.state === state);
  if (mode) filtered = filtered.filter((t) => t.mode === mode);

  console.log(
    `Showing ${Math.min(limit, filtered.length)} of ${filtered.length} matching themes (Total catalog: ${allThemes.length})`
  );
  console.log(
    `States: flagship, ${COGNITIVE_STATES.map((s) => s.id).join(", ")}\n`
  );
  for (const t of filtered.slice(0, limit)) {
    console.log(
      `  ${t.id.padEnd(28)} | ${t.mode.padEnd(5)} | text ${String(t.wcag.textContrast).padStart(5)}:1 | accent ${t.tokens.accent} | ${t.label}`
    );
  }
  process.exit(0);
}

if (cmd === "apply") {
  const themeId = args[1];
  const format = getFlag("format", "css");
  const outPath = getFlag("out");

  if (!themeId) {
    console.error("Usage: feather-themes apply <theme-id> [--format=css|json|tailwind] [--out=file]");
    process.exit(2);
  }

  const theme = allThemes.find((t) => t.id === themeId);
  if (!theme) {
    console.error(`Theme "${themeId}" not found. Run "feather-themes list" to browse ${allThemes.length} themes.`);
    process.exit(1);
  }

  let output = "";
  if (format === "json") {
    output = JSON.stringify(theme, null, 2);
  } else if (format === "tailwind") {
    output = `// Add inside tailwind.config.ts -> theme.extend.colors\nexport const featherTheme = ${JSON.stringify(theme.tokens, null, 2)};\n`;
  } else {
    output = `${toCssBlock(theme)}\n`;
  }

  if (outPath) {
    writeFileSync(resolve(process.cwd(), outPath), output, "utf8");
    console.log(`Applied "${theme.id}" (${format}) -> ${outPath}`);
  } else {
    console.log(output);
  }
  process.exit(0);
}

console.log(`Feather Themes v2.0 (${allThemes.length} WCAG-verified themes, 0 dependencies)
Commands:
  feather-themes list [--state=calm|focus|energy|romantic|morning|midday|dusk|night|grounded|executive] [--mode=dark|light]
  feather-themes apply <theme-id> [--format=css|json|tailwind] [--out=./theme.css]
  feather-themes verify-all`);
