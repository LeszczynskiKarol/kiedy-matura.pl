/* Pomocniki dat i odmiany — używane w czasie builda (Astro) i po stronie
   klienta. Jedno źródło, żeby HTML z builda i późniejsze odświeżenie
   licznika nie rozjeżdżały się w słowach ani w liczbie dni. */

export const MS_DAY = 86400000;

export const DOW = ['niedziela','poniedziałek','wtorek','środa','czwartek','piątek','sobota'];
export const MON = ['stycznia','lutego','marca','kwietnia','maja','czerwca',
                    'lipca','sierpnia','września','października','listopada','grudnia'];

/** Parsuje „2027-05-04" + „09:00" jako czas lokalny (bez pułapek UTC). */
export function dt(dstr: string, tstr = '00:00'): Date {
  const [y, m, d] = dstr.split('-').map(Number);
  const [h, mi] = tstr.split(':').map(Number);
  return new Date(y, m - 1, d, h, mi, 0, 0);
}

export const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const daysBetween = (a: Date, b: Date) =>
  Math.round((midnight(b).getTime() - midnight(a).getTime()) / MS_DAY);

export const fmtDate = (d: Date) => `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`;
export const fmtShort = (d: Date) => `${d.getDate()} ${MON[d.getMonth()]}`;
export const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Polska odmiana: 1 dzień / 2 dni / 5 dni */
export function plural(n: number, one: string, few: string, many: string): string {
  const a = Math.abs(n), t = a % 10, h = a % 100;
  if (a === 1) return one;
  if (t >= 2 && t <= 4 && (h < 12 || h > 14)) return few;
  return many;
}
export const dniWord = (n: number) => plural(n, 'dzień', 'dni', 'dni');

/** Dwa dni wolne, przez które sesja startuje dopiero 4 maja. */
export const HOLIDAYS: Record<string, string> = {
  '2027-05-01': 'Święto Pracy',
  '2027-05-03': 'Święto Konstytucji 3 Maja',
};
