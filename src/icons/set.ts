// ─────────────────────────────────────────────────────────────────────────
// WŁASNY ZESTAW IKON — ręcznie rysowany, per-projekt. ZERO lucide/heroicons.
// ─────────────────────────────────────────────────────────────────────────
//
// TWARDY WYMÓG (patrz CLAUDE.md "Ikony — własne SVG" + playbook 05 §5):
// na każdej stronie ikony pochodzą z TEGO pliku, nie z gotowej biblioteki.
// `astro-icon`, `@iconify-json/*` NIE są w zależnościach i nie wolno ich dodawać.
//
// Każdy wpis = wnętrze elementu <svg> (same `<path>` / `<circle>` / `<rect>`…),
// na siatce 24×24, `stroke = currentColor`, bez `fill` (linie dziedziczą kolor
// tekstu). Komponent `src/components/Icon.astro` dokleja wrapper <svg> z
// viewBox, stroke i linecap — tu wpisujesz TYLKO geometrię.
//
// JAK Z TEGO KORZYSTAĆ W NOWYM PROJEKCIE:
//   1. Wejście (`arrow-right`, `chevron-down`, `x`, `menu`, `check`, `external-link`,
//      `phone`, `map-pin`, `mail`) to neutralne prymitywy UI — zostaw jak są.
//   2. Ikony tematyczne poniżej (`zap`, `wrench`, `shield`…) to PRZYKŁADY scaffoldu.
//      PRZEPROJEKTUJ je pod branżę domeny: stolarka → piła/heblarka/słoje drewna,
//      audio → fala/głośnik/EQ, prawo → waga/paragraf/pieczęć, dentysta → ząb/szczoteczka.
//      Rysuj WŁASNĄ geometrię — nie kopiuj 1:1 path-data z lucide. To ma być
//      rozpoznawalny, autorski zestaw spójny z resztą designu (grubość kreski,
//      poziom uproszczenia, ten sam grid), nie zlepek ikon z różnych bibliotek.
//   3. Brakującą ikonę DODAJESZ tutaj (nowy klucz) — `<Icon>` rzuca błędem na
//      nieznaną nazwę, więc literówka/brak wyjdzie przy buildzie, nie po deployu.
//
// Spójność > liczba ikon. Lepiej 12 ikon w jednym stylu niż 40 zlepionych.

export const icons = {
  // ── Prymitywy UI (neutralne — zostawiamy) ──────────────────────────────
  "arrow-right": `<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>`,
  "arrow-left": `<path d="M20 12H5"/><path d="m11 6-6 6 6 6"/>`,
  "chevron-down": `<path d="m6 9 6 6 6-6"/>`,
  "chevron-right": `<path d="m9 6 6 6-6 6"/>`,
  "x": `<path d="M6 6 18 18"/><path d="M18 6 6 18"/>`,
  "menu": `<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>`,
  "check": `<path d="m5 12 4 4 10-10"/>`,
  "external-link": `<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>`,
  "phone": `<path d="M5 4h3l2 5-2 1a10 10 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`,
  "map-pin": `<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`,
  "mail": `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>`,

  // ── Ikony tematyczne (PRZYKŁADY — przeprojektuj pod branżę) ─────────────
  "zap": `<path d="M13 2 4 14h7l-1 8 10-13h-7l0-7z"/>`,
  "wrench": `<path d="M14.5 5.5a3.5 3.5 0 0 0-4.6 4.4l-5.6 5.6 2.8 2.8 5.6-5.6a3.5 3.5 0 0 0 4.4-4.6l-2.3 2.3-2.1-2.1z"/>`,
  "shield": `<path d="M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6z"/>`,
  "gauge": `<path d="M5 18a8 8 0 1 1 14 0"/><path d="M12 14 16 9"/><circle cx="12" cy="14" r="1.1"/>`,
  "clock": `<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>`,
  "badge-check": `<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>`,
  "check-circle": `<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>`,
  "layers": `<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/>`,
  "git-branch": `<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="8" r="2.5"/><path d="M6 8.5v7"/><path d="M18 10.5a6 6 0 0 1-6 6H8.5"/>`,
  "upload-cloud": `<path d="M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17 18"/><path d="M12 12v7"/><path d="m9 15 3-3 3 3"/>`,
  "loader": `<path d="M21 12a9 9 0 1 1-6.2-8.5"/>`,
} as const;

export type IconName = keyof typeof icons;
