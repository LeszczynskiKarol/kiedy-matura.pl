// Weryfikacja wizualna hero-SVG (workflow 2026-07-17): agent MUSI obejrzeć
// ilustrację hero zanim strona pójdzie w świat. Bez przeglądarki: wyciągamy
// największy <svg> z dist/index.html (ilustracja hero), podstawiamy wartości
// CSS-vars z palety light (sharp nie zna var()) i rasteryzujemy do PNG.
//
//   npm run build && node scripts/shot-hero.mjs
//   → tmp/hero-check.png  (obejrzyj Readem; bazgroły nie przechodzą)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distIndex = resolve(ROOT, "dist", "index.html");
if (!existsSync(distIndex)) {
  console.error("✗ Brak dist/index.html — najpierw `npm run build`.");
  process.exit(1);
}
const html = readFileSync(distIndex, "utf8");

// Największy <svg> w dokumencie = ilustracja hero (ikony mają po ~200 znaków).
const svgs = [...html.matchAll(/<svg[\s\S]*?<\/svg>/g)].map((m) => m[0]);
if (!svgs.length) {
  console.error("✗ Brak <svg> w dist/index.html (hero na zdjęciu? wtedy weryfikacja zbędna).");
  process.exit(1);
}
let svg = svgs.sort((a, b) => b.length - a.length)[0];
if (svg.length < 800) {
  console.log("ℹ Największy SVG jest malutki (" + svg.length + " znaków) — hero pewnie używa zdjęcia; nic do weryfikacji.");
  process.exit(0);
}

// Paleta light: Tailwind 4 trzyma vary w @theme{...}; per-projekt bywa też
// :root. Bierzemy PIERWSZE wystąpienie każdej zmiennej (light przed dark).
const css = readFileSync(resolve(ROOT, "src", "styles", "global.css"), "utf8");
const vars = {};
for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;{}]+);/g)) {
  const val = m[2].trim();
  // Tylko bezpieczne wartości kolorów — vary fontowe zawierają cudzysłowy
  // i rozbijają atrybuty XML (glib parse error przy pierwszym teście).
  if (!(m[1] in vars) && !/["'<>]/.test(val)) vars[m[1]] = val;
}
svg = svg.replace(/var\((--[a-z0-9-]+)\)/g, (_, name) => vars[name] ?? "#888");
svg = svg.replace(/currentColor/g, vars["--color-text"] ?? "#1f2937");

// Tło strony pod ilustrację (przezroczystość myli ocenę).
const bg = vars["--color-bg"] ?? "#ffffff";
mkdirSync(resolve(ROOT, "tmp"), { recursive: true });
const out = resolve(ROOT, "tmp", "hero-check.png");
await sharp(Buffer.from(svg), { density: 144 })
  .resize({ width: 1000, fit: "inside" })
  .flatten({ background: bg })
  .png()
  .toFile(out);
console.log("✓ " + out + " — OBEJRZYJ ten plik (Read) i oceń ilustrację hero.");
