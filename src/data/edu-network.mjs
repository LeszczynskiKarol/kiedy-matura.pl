// Serwisy edukacyjne tego samego autora (Karol Leszczyński, karol-leszczynski.pl).
// Ten sam plik żyje w każdym repo sieci — zmieniając listę, zmień ją wszędzie.
// Zasady linkowania (2026-09): anchor = nazwa marki, bez fraz kluczowych;
// każdy serwis pokazuje własny, ograniczony wybór (SITE_PICKS), nie całą listę.
export const EDU_NETWORK = {
  'osmoklasista-online': { name: 'Ósmoklasista Online', href: 'https://www.osmoklasista-online.pl/', desc: 'egzamin ósmoklasisty: zadania, arkusze, diagnoza' },
  'zdaj-angielski':      { name: 'Zdaj Angielski',      href: 'https://www.zdaj-angielski.pl/',      desc: 'angielski w formacie egzaminu' },
  'matury-online':       { name: 'Matury Online',       href: 'https://www.matury-online.pl/',       desc: 'zadania i arkusze maturalne' },
  'maturapolski':        { name: 'MaturaPolski.pl',     href: 'https://www.maturapolski.pl/',        desc: 'lektury, epoki, motywy' },
  'maturalnie':          { name: 'Maturalnie.pl',       href: 'https://www.maturalnie.pl/',          desc: 'narzędzia i daty matur' },
  'matura-online':       { name: 'Matura-Online.pl',    href: 'https://www.matura-online.pl/',       desc: 'rozwiązania zadań CKE' },
  'maturarozszerzona':   { name: 'MaturaRozszerzona.pl', href: 'https://www.maturarozszerzona.pl/',  desc: 'matura rozszerzona' },
  'kiedy-matura':        { name: 'Kiedy Matura',        href: 'https://www.kiedy-matura.pl/',        desc: 'odliczanie i harmonogram' },
  'matmanamature':       { name: 'MatmaNaMaturę',       href: 'https://www.matmanamature.pl/',       desc: 'matematyka na maturze' },
  'akademiamaturalna':   { name: 'Akademia Maturalna',  href: 'https://www.akademiamaturalna.pl/',   desc: 'korepetycje z polskiego' },
};

// Który serwis pokazuje które (kolejność = kolejność w stopce).
export const SITE_PICKS = {
  'osmoklasista-online': ['zdaj-angielski', 'matury-online', 'maturapolski', 'maturalnie', 'kiedy-matura'],
  'zdaj-angielski':      ['osmoklasista-online', 'matury-online', 'maturapolski', 'maturalnie', 'matura-online'],
  'matury-online':       ['osmoklasista-online', 'zdaj-angielski', 'maturapolski', 'maturalnie', 'matura-online', 'maturarozszerzona'],
  // maturapolski: stopka ma już 4 linki do matury-online.pl (kolumna Trening), więc tu bez niego
  'maturapolski':        ['osmoklasista-online', 'maturalnie', 'zdaj-angielski', 'matura-online', 'akademiamaturalna'],
  'maturalnie':          ['osmoklasista-online', 'matury-online', 'maturapolski', 'kiedy-matura', 'matura-online', 'maturarozszerzona'],
  // matura-online: przycisk do matury-online.pl już jest w stopce
  'matura-online':       ['osmoklasista-online', 'maturarozszerzona', 'matmanamature', 'maturalnie', 'maturapolski'],
  // maturarozszerzona: ECOSYSTEM w stopce linkuje już matury-online, matura-online i maturalnie
  'maturarozszerzona':   ['osmoklasista-online', 'matmanamature', 'maturapolski', 'zdaj-angielski'],
  'kiedy-matura':        ['osmoklasista-online', 'maturalnie', 'matury-online', 'maturapolski', 'zdaj-angielski'],
  'matmanamature':       ['osmoklasista-online', 'matury-online', 'matura-online', 'maturarozszerzona', 'maturalnie'],
  'akademiamaturalna':   ['osmoklasista-online', 'maturapolski', 'matury-online', 'maturalnie'],
};

export function eduLinksFor(site) {
  return (SITE_PICKS[site] ?? []).map((k) => EDU_NETWORK[k]).filter(Boolean);
}
