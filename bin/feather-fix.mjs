#!/usr/bin/env node
/**
 * Feather Themes — Bug Fixer (`bin/feather-fix.mjs`)
 *
 * Zero-dependency, zero-runtime-cost checker and safe fixer for the
 * 12 flagship themes in `themes/tokens.json` and `themes/themes.css`.
 *
 * Approved job, in exact words:
 * check every theme for missing tokens, bad hex, contrast under 4.5,
 * duplicate ids, and CSS and JSON out of sync. Fix the safe ones,
 * report the rest by file and theme name, and never silently change
 * a brand color.
 *
 * Usage:
 *   node bin/feather-fix.mjs [--dry-run] [--fix] [--path=<repo-root>]
 *
 *   --dry-run   Default. Check only, change nothing.
 *   --fix       Apply safe fixes only, then re-check.
 *   --path=...  Repo root to check. Default is the repo root
 *               above this file (two levels up from bin/).
 *   --help      Show usage.
 *
 * Safe fixes only (everything else is reported, never changed):
 *   1. surfaceSolid missing -> copy surface. In the engine this is
 *      already the rule: surfaceSolid defaults to surface.
 *   2. color-scheme missing in CSS -> add it from the JSON mode
 *      ("dark" or "light").
 *   3. Hex case normalisation -> lowercase hex, no colour change.
 *   4. CSS token out of sync with JSON, except --ft-surface ->
 *      copy the JSON value into CSS. JSON is canonical for the
 *      flagships. --ft-surface is excluded because the CSS file
 *      deliberately stores it as rgba(surface, alpha) while the
 *      JSON file stores the solid hex; only its RGB part is compared.
 *
 * Never auto-fixed (reported by file and theme id):
 *   - a missing token other than surfaceSolid (no colour to invent)
 *   - a bad hex value (no colour to guess)
 *   - contrast under 4.5:1 (changing it would change a brand colour)
 *   - a duplicate theme id (ambiguous which copy is right)
 *   - a --ft-surface RGB mismatch (the rgba translucency is a
 *     design choice, so a human decides which side is right)
 *
 * Exit codes: 0 = clean, 1 = errors remain, 2 = usage or unreadable file.
 * Contrast is WCAG 2.1: text and muted must be >= 4.5:1 against bg
 * and against surfaceSolid. Text under 7:1 is a warning only
 * (AAA preferred, AA mandatory).
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TOKENS = ["bg", "surface", "surfaceSolid", "border", "text", "muted", "accent"];
const CSS_VAR = {
  bg: "--ft-bg",
  surface: "--ft-surface",
  surfaceSolid: "--ft-surface-solid",
  border: "--ft-border",
  text: "--ft-text",
  muted: "--ft-muted",
  accent: "--ft-accent",
};
const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const RGBA_RE = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9.]+))?\s*\)$/;

function normaliseHex(value) {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!HEX_RE.test(v)) return null;
  let hex = v.slice(1).toLowerCase();
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  return "#" + hex;
}

function parseColour(value) {
  if (typeof value !== "string") return null;
  const v = value.trim();
  const hex = normaliseHex(v);
  if (hex) {
    return {
      rgb: [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)],
      hex,
      alpha: 1,
    };
  }
  const m = v.match(RGBA_RE);
  if (m) {
    const rgb = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (rgb.some((n) => n < 0 || n > 255)) return null;
    return { rgb, hex: "#" + rgb.map((n) => n.toString(16).padStart(2, "0")).join(""), alpha: m[4] === undefined ? 1 : Number(m[4]) };
  }
  return null;
}

function relativeLuminance(rgb) {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(rgbA, rgbB) {
  const l1 = relativeLuminance(rgbA);
  const l2 = relativeLuminance(rgbB);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}

function parseCssBlocks(cssText) {
  const blocks = new Map();
  const duplicates = [];
  const re = /\[data-theme="([^"]+)"\]\s*\{([^}]*)\}/g;
  let match;
  while ((match = re.exec(cssText)) !== null) {
    const id = match[1];
    const body = match[2];
    if (blocks.has(id)) {
      duplicates.push(id);
      continue;
    }
    const vars = {};
    let scheme = null;
    for (const line of body.split(";")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const colon = trimmed.indexOf(":");
      if (colon === -1) continue;
      const key = trimmed.slice(0, colon).trim();
      const val = trimmed.slice(colon + 1).trim();
      if (key === "color-scheme") scheme = val;
      else if (key.startsWith("--ft-")) vars[key] = val;
    }
    blocks.set(id, { vars, scheme, rawBody: body });
  }
  return { blocks, duplicates };
}

export function checkThemes({ jsonText, cssText }) {
  const errors = [];
  const warnings = [];
  const safeFixes = [];
  let json;
  try {
    json = JSON.parse(jsonText);
  } catch (err) {
    return { errors: [`themes/tokens.json: invalid JSON: ${err.message}`], warnings, safeFixes, themes: [] };
  }
  const themes = json.themes && typeof json.themes === "object" ? json.themes : {};
  const { blocks: cssBlocks, duplicates: cssDuplicates } = parseCssBlocks(cssText);
  const jsonIds = Object.keys(themes);
  const cssIds = [...cssBlocks.keys()];

  for (const id of cssDuplicates) {
    errors.push(`themes/themes.css: duplicate theme id "${id}"`);
  }
  const seenJson = new Set();
  for (const id of jsonIds) {
    if (seenJson.has(id)) errors.push(`themes/tokens.json: duplicate theme id "${id}"`);
    seenJson.add(id);
  }
  for (const id of jsonIds) {
    if (!cssBlocks.has(id)) errors.push(`themes/themes.css: theme "${id}" is in tokens.json but missing from themes.css`);
  }
  for (const id of cssIds) {
    if (!Object.prototype.hasOwnProperty.call(themes, id)) errors.push(`themes/tokens.json: theme "${id}" is in themes.css but missing from tokens.json`);
  }

  for (const id of jsonIds) {
    const t = themes[id];
    if (!t || typeof t !== "object") {
      errors.push(`themes/tokens.json: theme "${id}" is not an object`);
      continue;
    }
    // Missing tokens and bad hex, in JSON.
    for (const key of TOKENS) {
      if (!(key in t) || t[key] === undefined || t[key] === null || String(t[key]).trim() === "") {
        if (key === "surfaceSolid" && typeof t.surface === "string" && normaliseHex(t.surface)) {
          safeFixes.push({ file: "themes/tokens.json", id, kind: "surfaceSolid", detail: `surfaceSolid missing, copy surface ${normaliseHex(t.surface)}` });
        } else {
          errors.push(`themes/tokens.json: theme "${id}" is missing token "${key}"`);
        }
        continue;
      }
      const parsed = parseColour(String(t[key]));
      if (!parsed) {
        errors.push(`themes/tokens.json: theme "${id}" has bad hex for "${key}": ${JSON.stringify(t[key])}`);
      } else if (String(t[key]) !== parsed.hex) {
        safeFixes.push({ file: "themes/tokens.json", id, kind: "hex-case", detail: `"${key}" ${String(t[key])} -> ${parsed.hex}` });
      }
    }
    if (t.mode !== "dark" && t.mode !== "light") {
      errors.push(`themes/tokens.json: theme "${id}" has bad mode ${JSON.stringify(t.mode)} (must be "dark" or "light")`);
    }

    const css = cssBlocks.get(id);
    if (!css) continue;
    // Missing tokens and bad values, in CSS.
    for (const key of TOKENS) {
      const cssVar = CSS_VAR[key];
      if (!(cssVar in css.vars)) {
        if (key === "surfaceSolid") {
          safeFixes.push({ file: "themes/themes.css", id, kind: "surfaceSolid", detail: `${cssVar} missing, add from tokens.json` });
        } else {
          errors.push(`themes/themes.css: theme "${id}" is missing token "${cssVar}"`);
        }
        continue;
      }
      const parsed = parseColour(css.vars[cssVar]);
      if (!parsed) {
        errors.push(`themes/themes.css: theme "${id}" has bad value for "${cssVar}": ${JSON.stringify(css.vars[cssVar])}`);
        continue;
      }
      const jsonParsed = parseColour(String(t[key] || ""));
      if (!jsonParsed) continue;
      if (key === "surface") {
        // CSS stores surface as rgba(surface, alpha); only RGB must match.
        if (parsed.hex !== jsonParsed.hex) {
          errors.push(`themes/themes.css: theme "${id}" --ft-surface RGB ${parsed.hex} does not match tokens.json surface ${jsonParsed.hex} (human decides which side is right)`);
        }
        continue;
      }
      if (parsed.hex !== jsonParsed.hex) {
        // Never sync CSS to a JSON text/muted value that itself
        // fails contrast. That would spread a bad colour, not fix it.
        // The contrast error below is the human fix; re-run after it.
        let jsonValueIsSafe = true;
        if (key === "text" || key === "muted") {
          const bgParsed = parseColour(String(t.bg || ""));
          const solidParsed = parseColour(String(t.surfaceSolid || t.surface || ""));
          if (bgParsed && contrastRatio(jsonParsed.rgb, bgParsed.rgb) < 4.5) jsonValueIsSafe = false;
          if (solidParsed && contrastRatio(jsonParsed.rgb, solidParsed.rgb) < 4.5) jsonValueIsSafe = false;
        }
        if (jsonValueIsSafe) {
          safeFixes.push({ file: "themes/themes.css", id, kind: "sync", detail: `${cssVar} ${parsed.hex} -> ${jsonParsed.hex} (from tokens.json)` });
        } else {
          errors.push(`themes/themes.css: theme "${id}" ${cssVar} ${parsed.hex} does not match tokens.json ${jsonParsed.hex}, and the JSON value fails contrast, so no auto-sync (human decides)`);
        }
      } else if (css.vars[cssVar].trim() !== parsed.hex && css.vars[cssVar].trim().toLowerCase().startsWith("#")) {
        safeFixes.push({ file: "themes/themes.css", id, kind: "hex-case", detail: `${cssVar} ${css.vars[cssVar].trim()} -> ${parsed.hex}` });
      }
    }
    if (!css.scheme) {
      if (t.mode === "dark" || t.mode === "light") {
        safeFixes.push({ file: "themes/themes.css", id, kind: "color-scheme", detail: `color-scheme missing, add ${t.mode}` });
      } else {
        errors.push(`themes/themes.css: theme "${id}" is missing color-scheme`);
      }
    } else if ((t.mode === "dark" || t.mode === "light") && css.scheme !== t.mode) {
      errors.push(`themes/themes.css: theme "${id}" color-scheme "${css.scheme}" does not match tokens.json mode "${t.mode}"`);
    }

    // Contrast, using solid surfaces only (rgba surface is translucent).
    const bg = parseColour(String(t.bg || ""));
    const solid = parseColour(String(t.surfaceSolid || t.surface || ""));
    const text = parseColour(String(t.text || ""));
    const muted = parseColour(String(t.muted || ""));
    if (bg && text) {
      const r = contrastRatio(text.rgb, bg.rgb);
      if (r < 4.5) errors.push(`themes/tokens.json: theme "${id}" text vs bg is ${r}:1, under 4.5:1 (do not auto-change a brand colour)`);
      else if (r < 7) warnings.push(`themes/tokens.json: theme "${id}" text vs bg is ${r}:1, under 7:1 AAA (warning only)`);
    }
    if (solid && text) {
      const r = contrastRatio(text.rgb, solid.rgb);
      if (r < 4.5) errors.push(`themes/tokens.json: theme "${id}" text vs surface is ${r}:1, under 4.5:1 (do not auto-change a brand colour)`);
      else if (r < 7) warnings.push(`themes/tokens.json: theme "${id}" text vs surface is ${r}:1, under 7:1 AAA (warning only)`);
    }
    if (bg && muted) {
      const r = contrastRatio(muted.rgb, bg.rgb);
      if (r < 4.5) errors.push(`themes/tokens.json: theme "${id}" muted vs bg is ${r}:1, under 4.5:1 (do not auto-change a brand colour)`);
    }
    if (solid && muted) {
      const r = contrastRatio(muted.rgb, solid.rgb);
      if (r < 4.5) errors.push(`themes/tokens.json: theme "${id}" muted vs surface is ${r}:1, under 4.5:1 (do not auto-change a brand colour)`);
    }
  }

  return { errors, warnings, safeFixes, themes: jsonIds };
}

function applySafeFixes({ jsonText, cssText, safeFixes }) {
  let json = JSON.parse(jsonText);
  let jsonOut = jsonText;
  let css = cssText;
  let fixedCount = 0;

  // JSON fixes are surgical text edits only, so the file keeps its
  // original formatting and key order. A full rewrite would reformat
  // all 12 themes for one small fix.
  function jsonThemeSpan(id) {
    const start = jsonOut.indexOf(`"${id}"`);
    if (start === -1) return null;
    const open = jsonOut.indexOf("{", start);
    const close = jsonOut.indexOf("}", open);
    if (open === -1 || close === -1) return null;
    return { start: open, end: close + 1, text: jsonOut.slice(open, close + 1) };
  }
  function replaceInTheme(id, pattern, replacement) {
    const span = jsonThemeSpan(id);
    if (!span) return false;
    const updated = span.text.replace(pattern, replacement);
    if (updated === span.text) return false;
    jsonOut = jsonOut.slice(0, span.start) + updated + jsonOut.slice(span.end);
    return true;
  }

  for (const fix of safeFixes) {
    if (fix.file === "themes/tokens.json" && fix.kind === "surfaceSolid") {
      const t = json.themes[fix.id];
      if (t && !t.surfaceSolid && normaliseHex(t.surface)) {
        const solid = normaliseHex(t.surface);
        // Insert surfaceSolid right after surface, in original order.
        if (replaceInTheme(fix.id, /("surface":\s*"#[0-9a-fA-F]{3,6}")/, `$1, "surfaceSolid": "${solid}"`)) fixedCount++;
        t.surfaceSolid = solid;
      }
    }
    if (fix.file === "themes/tokens.json" && fix.kind === "hex-case") {
      const t = json.themes[fix.id];
      if (!t) continue;
      for (const key of TOKENS) {
        const parsed = parseColour(String(t[key] || ""));
        if (parsed && String(t[key]) !== parsed.hex && String(t[key]).trim().toLowerCase().startsWith("#")) {
          if (replaceInTheme(fix.id, new RegExp(`("${key}":\\s*")${String(t[key]).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), `$1${parsed.hex}"`)) fixedCount++;
          t[key] = parsed.hex;
        }
      }
    }
    if (fix.file === "themes/themes.css" && fix.kind === "surfaceSolid") {
      const t = json.themes[fix.id];
      if (!t || !t.surfaceSolid) continue;
      const re = new RegExp(`(\\[data-theme="${fix.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\][^}]*?--ft-surface:\\s*[^;]+;)`);
      if (re.test(css) && !css.includes(`--ft-surface-solid`)) {
        // Only insert if this block lacks it; handled per-block below.
      }
      // Surgical per-block insert: find the block, then insert after --ft-surface.
      css = css.replace(
        new RegExp(`(\\[data-theme="${fix.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\][^}]*?)(--ft-surface:\\s*[^;]+;)([^}]*?)(--ft-surface-solid:\\s*[^;]+;)?`, "s"),
        (whole, head, surfaceLine) => {
          if (whole.includes("--ft-surface-solid:")) return whole;
          fixedCount++;
          return `${head}${surfaceLine}\n  --ft-surface-solid: ${t.surfaceSolid};`;
        }
      );
    }
    if (fix.file === "themes/themes.css" && fix.kind === "color-scheme") {
      const t = json.themes[fix.id];
      if (!t || (t.mode !== "dark" && t.mode !== "light")) continue;
      css = css.replace(
        new RegExp(`(\\[data-theme="${fix.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\]\\s*\\{)`, "s"),
        (whole) => {
          fixedCount++;
          return `${whole}\n  color-scheme: ${t.mode};`;
        }
      );
      // The :root obsidian block already has color-scheme; the regex above
      // only runs when the block lacked it, checked by the caller list.
    }
    if (fix.file === "themes/themes.css" && (fix.kind === "sync" || fix.kind === "hex-case")) {
      const t = json.themes[fix.id];
      if (!t) continue;
      for (const key of TOKENS) {
        if (key === "surface") continue;
        const cssVar = CSS_VAR[key];
        const parsed = parseColour(String(t[key] || ""));
        if (!parsed) continue;
        const blockRe = new RegExp(`(\\[data-theme="${fix.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\][^}]*?${cssVar}:\\s*)([^;]+)(;)`, "s");
        if (blockRe.test(css)) {
          const before = css;
          css = css.replace(blockRe, `$1${parsed.hex}$3`);
          if (css !== before) fixedCount++;
        }
      }
    }
  }

  return { jsonText: jsonOut, cssText: css, fixedCount };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node bin/feather-fix.mjs [--dry-run] [--fix] [--path=<repo-root>]");
    console.log("  --dry-run  Default. Check only, change nothing.");
    console.log("  --fix      Apply safe fixes only, then re-check.");
    process.exit(0);
  }
  const doFix = args.includes("--fix");
  const pathArg = args.find((a) => a.startsWith("--path="));
  const root = resolve(pathArg ? pathArg.slice("--path=".length) : dirname(fileURLToPath(import.meta.url)) + "/..");
  const jsonPath = resolve(root, "themes/tokens.json");
  const cssPath = resolve(root, "themes/themes.css");
  let jsonText;
  let cssText;
  try {
    jsonText = readFileSync(jsonPath, "utf8");
  } catch (err) {
    console.error(`Cannot read ${jsonPath}: ${err.message}`);
    process.exit(2);
  }
  try {
    cssText = readFileSync(cssPath, "utf8");
  } catch (err) {
    console.error(`Cannot read ${cssPath}: ${err.message}`);
    process.exit(2);
  }

  const first = checkThemes({ jsonText, cssText });
  console.log(`[FEATHER FIX] Checked ${first.themes.length} themes in themes/tokens.json and themes/themes.css`);
  if (first.safeFixes.length > 0) {
    console.log(`Safe fixes available: ${first.safeFixes.length}`);
    for (const f of first.safeFixes) console.log(`  FIXABLE ${f.file}: theme "${f.id}" — ${f.detail}`);
  }
  if (first.warnings.length > 0) {
    console.log(`Warnings: ${first.warnings.length}`);
    for (const w of first.warnings) console.log(`  WARN ${w}`);
  }
  if (first.errors.length > 0) {
    console.log(`Errors that need a human: ${first.errors.length}`);
    for (const e of first.errors) console.log(`  ERROR ${e}`);
  }
  if (!doFix) {
    console.log("Dry run only, nothing changed. Run with --fix to apply safe fixes.");
    process.exit(first.errors.length > 0 ? 1 : 0);
  }

  if (first.safeFixes.length === 0) {
    console.log("No safe fixes to apply.");
    process.exit(first.errors.length > 0 ? 1 : 0);
  }
  const applied = applySafeFixes({ jsonText, cssText, safeFixes: first.safeFixes });
  writeFileSync(jsonPath, applied.jsonText, "utf8");
  writeFileSync(cssPath, applied.cssText, "utf8");
  console.log(`Applied ${applied.fixedCount} safe fix(es). Re-checking...`);
  const second = checkThemes({ jsonText: applied.jsonText, cssText: applied.cssText });
  if (second.errors.length > 0) {
    console.log(`Still needs a human: ${second.errors.length}`);
    for (const e of second.errors) console.log(`  ERROR ${e}`);
  }
  if (second.warnings.length > 0) {
    for (const w of second.warnings) console.log(`  WARN ${w}`);
  }
  console.log(second.errors.length === 0 ? "Clean after safe fixes." : "Safe fixes applied, human fixes remain.");
  process.exit(second.errors.length > 0 ? 1 : 0);
}
