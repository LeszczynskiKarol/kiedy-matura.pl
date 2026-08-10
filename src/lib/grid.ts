// Symetryczne rzędy kart (feedback Karola 2026-07-11): układ kolumn dobierany
// do LICZBY elementów, rzędy zawsze symetryczne — nigdy 3-1 z sierotą w rogu.
//   lg:  n%3===0 → 3/rząd (6 → 3-3, 9 → 3-3-3)
//        n===4   → 2/rząd (2-2; opcja fourAcross daje 4 w jednym rzędzie)
//        n%4===0 → 4/rząd (8 → 4-4)
//        inne parzyste → 2/rząd (10 → 5×2)
//        nieparzyste (5, 7…) → 3/rząd, ostatni niepełny rząd WYŚRODKOWANY
//        (5 → 3 + 2 wyśrodkowane, 7 → 3 + 3 + 1 wyśrodkowany)
//   sm/md: 2/rząd; przy nieparzystym n ostatni element wyśrodkowany.
//   mobile: 1 kolumna (opcjonalnie 2 dla kompaktowych elementów, np. StatBlock).
//
// Technika: kontener `grid grid-cols-12`, elementy dostają `col-span-*`, a
// KONKRETNE elementy ostatniego niepełnego rzędu — `col-start-*` wyliczone
// per-index (helper zna n oraz i, więc żadnych sztuczek nth-child).
//
// KRYTYCZNE — Tailwind 4 skanuje źródła po LITERALNYCH stringach klas.
// Każda użyta klasa MUSI występować w tym pliku jako pełny literał (mapy
// poniżej). NIGDY nie sklejaj klas szablonowo (`lg:col-span-${x}`) — purge
// nie zobaczy takiego stringa i wytnie klasę z builda.

type Tier = "base" | "sm" | "lg";

// perRow → klasa span (12 / perRow kolumn z 12).
const SPAN: Record<Tier, Record<number, string>> = {
  base: { 1: "col-span-12", 2: "col-span-6" },
  sm: { 2: "sm:col-span-6" },
  lg: { 2: "lg:col-span-6", 3: "lg:col-span-4", 4: "lg:col-span-3" },
};

// kolumna startowa → klasa. Tylko wartości osiągalne przy powyższych regułach
// (2/rząd sierota → start 4; 3/rząd reszta 1 → start 5; reszta 2 → starty 3 i 7).
// "auto" resetuje odziedziczony col-start z niższego breakpointu.
const START: Record<Tier, Record<string, string>> = {
  base: { "4": "col-start-4" },
  sm: { "4": "sm:col-start-4", auto: "sm:col-start-auto" },
  lg: {
    "3": "lg:col-start-3",
    "5": "lg:col-start-5",
    "7": "lg:col-start-7",
    auto: "lg:col-start-auto",
  },
};

export interface BalancedGridOptions {
  /** Kolumny na mobile (default 1). Kompaktowe elementy (StatBlock) → 2. */
  mobileCols?: 1 | 2;
  /** n===4 → 4 w jednym rzędzie zamiast 2-2 (kompaktowe elementy). */
  fourAcross?: boolean;
}

export interface BalancedGrid {
  /** Klasy kontenera — dołóż własne gapy/marginesy przez class:list. */
  container: string;
  /** Klasy elementu o indeksie i (0-based). */
  item: (i: number) => string;
}

function lgPerRow(n: number, fourAcross: boolean): number {
  if (n % 3 === 0) return 3;
  if (n === 4) return fourAcross ? 4 : 2;
  if (n % 4 === 0) return 4;
  if (n % 2 === 0) return 2;
  return 3; // nieparzyste → 3/rząd z wyśrodkowanym ostatnim rzędem
}

// Kolumna startowa (1-based, grid 12-kolumnowy) dla elementu i, jeśli należy
// do ostatniego niepełnego rzędu i rząd da się wyśrodkować; inaczej null
// (element płynie naturalnie).
function startCol(n: number, i: number, perRow: number): number | null {
  const rest = n % perRow;
  if (rest === 0 || i < n - rest) return null;
  const span = 12 / perRow;
  const pad = (12 - rest * span) / 2;
  if (!Number.isInteger(pad)) return null;
  return pad + (i - (n - rest)) * span + 1;
}

export function balancedGrid(
  n: number,
  opts: BalancedGridOptions = {}
): BalancedGrid {
  const mobileCols = opts.mobileCols ?? 1;
  const lgP = lgPerRow(n, opts.fourAcross ?? false);

  return {
    container: "grid grid-cols-12",
    item(i: number): string {
      const classes: string[] = [SPAN.base[mobileCols]];

      const push = (cls: string | undefined) => {
        if (cls) classes.push(cls);
      };

      const baseStart = mobileCols === 2 ? startCol(n, i, 2) : null;
      if (baseStart !== null) push(START.base[String(baseStart)]);

      // sm: 2/rząd. Przy mobileCols=2 układ identyczny z base — nic nie emitujemy.
      const smStart = startCol(n, i, 2);
      if (mobileCols !== 2) {
        push(SPAN.sm[2]);
        if (smStart !== null) push(START.sm[String(smStart)]);
      }

      // lg: span zawsze jawnie (nadpisuje sm), col-start tylko gdy różni się
      // od odziedziczonego z sm/base (w tym reset do auto, np. n=3: sierota
      // wyśrodkowana na sm nie może ciągnąć col-start-4 w pełny rząd lg).
      push(SPAN.lg[lgP]);
      const inherited = smStart ?? baseStart;
      const lgStart = startCol(n, i, lgP);
      if (lgStart !== inherited) {
        push(lgStart !== null ? START.lg[String(lgStart)] : START.lg.auto);
      }

      return classes.join(" ");
    },
  };
}
