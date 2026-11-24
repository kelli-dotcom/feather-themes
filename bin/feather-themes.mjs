#!/usr/bin/env node
/**
 * Feather Themes CLI — Flawless 1-Command Theme Installer & WCAG Verifier
 *
 * Usage:
 *   node bin/feather-themes.mjs list [--state=calm] [--mode=dark] [--limit=20]
 *   node bin/feather-themes.mjs apply <theme-id> [--format=css|json|tailwind] [--out=<file>]
 *   node bin/feather-themes.mjs export <theme-id> [--format=css|json|tailwind|swift|kotlin|dart] [--out=<file>]
 *   node bin/feather-themes.mjs verify-all
 *
 * export is one theme only, never the whole kit. JSON export is the flat
 * 7 tokens only (bg, surface, surfaceSolid, border, text, muted, accent).
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

// Native-shape helpers for `export`. All outputs are one theme only:
// the flat 7 tokens, in the target language's own shape.
function hexToArgb(hex) {
  return "0xFF" + hex.replace("#", "").toUpperCase();
}

function hexToRgbComponents(hex) {
  const clean = hex.replace("#", "");
  const r = (parseInt(clean.slice(0, 2), 16) / 255).toFixed(3);
  const g = (parseInt(clean.slice(2, 4), 16) / 255).toFixed(3);
  const b = (parseInt(clean.slice(4, 6), 16) / 255).toFixed(3);
  return `red: ${r}, green: ${g}, blue: ${b}`;
}

function toSwift(theme) {
  const name = theme.id.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
  const lines = Object.entries(theme.tokens).map(
    ([key, hex]) => `    public static let ${key} = Color(${hexToRgbComponents(hex)})`
  );
  return `// Feather Themes — ${theme.id} (${theme.label})\n// SwiftUI. No helper needed: Color(red:green:blue:) is built in.\nimport SwiftUI\n\npublic enum Feather${name} {\n${lines.join("\n")}\n}\n`;
}

function toKotlin(theme) {
  const name = theme.id.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
  const lines = Object.entries(theme.tokens).map(
    ([key, hex]) => `    val ${key} = Color(${hexToArgb(hex)})`
  );
  return `// Feather Themes — ${theme.id} (${theme.label})\n// Jetpack Compose. Import androidx.compose.ui.graphics.Color.\nimport androidx.compose.ui.graphics.Color\n\nobject Feather${name} {\n${lines.join("\n")}\n}\n`;
}

function toDart(theme) {
  const name = theme.id.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
  const lines = Object.entries(theme.tokens).map(
    ([key, hex]) => `  static const ${key} = Color(${hexToArgb(hex)});`
  );
  return `// Feather Themes — ${theme.id} (${theme.label})\n// Flutter. Import package:flutter/material.dart for Color.\nimport 'package:flutter/material.dart';\n\nclass Feather${name} {\n${lines.join("\n")}\n}\n`;
}

function exportTheme(theme, format) {
  if (format === "json") {
    return JSON.stringify(theme.tokens, null, 2) + "\n";
  }
  if (format === "tailwind") {
    return `// Add inside tailwind.config.ts -> theme.extend.colors\nexport const featherTheme = ${JSON.stringify(theme.tokens, null, 2)};\n`;
  }
  if (format === "swift") return toSwift(theme);
  if (format === "kotlin") return toKotlin(theme);
  if (format === "dart") return toDart(theme);
  return `${toCssBlock(theme)}\n`;
}

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

if (cmd === "export") {
  const themeId = args[1];
  const format = getFlag("format", "css");
  const outPath = getFlag("out");
  const formats = ["css", "json", "tailwind", "swift", "kotlin", "dart"];

  if (!themeId) {
    console.error("Usage: feather-themes export <theme-id> [--format=css|json|tailwind|swift|kotlin|dart] [--out=file]");
    process.exit(2);
  }
  if (!formats.includes(format)) {
    console.error(`Unknown format "${format}". Use one of: ${formats.join(", ")}.`);
    process.exit(2);
  }

  const theme = allThemes.find((t) => t.id === themeId);
  if (!theme) {
    console.error(`Theme "${themeId}" not found. Run "feather-themes list" to browse ${allThemes.length} themes.`);
    process.exit(1);
  }

  const output = exportTheme(theme, format);
  if (outPath) {
    writeFileSync(resolve(process.cwd(), outPath), output, "utf8");
    console.log(`Exported "${theme.id}" (${format}) -> ${outPath} (${Buffer.byteLength(output, "utf8")} bytes)`);
  } else {
    console.log(output);
  }
  process.exit(0);
}

console.log(`Feather Themes v2.0 (${allThemes.length} WCAG-verified themes, 0 dependencies)
Commands:
  feather-themes list [--state=calm|focus|energy|romantic|morning|midday|dusk|night|grounded|executive] [--mode=dark|light]
  feather-themes apply <theme-id> [--format=css|json|tailwind] [--out=./theme.css]
  feather-themes export <theme-id> [--format=css|json|tailwind|swift|kotlin|dart] [--out=./theme.css]
  feather-themes verify-all`);
