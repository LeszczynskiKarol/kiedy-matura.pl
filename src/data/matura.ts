/* =====================================================================
   kiedy-matura.pl — DANE
   ---------------------------------------------------------------------
   ŹRÓDŁO TERMINÓW:
   CKE publikuje oficjalny harmonogram matury 2027 do 20 sierpnia 2026.
   Do tego czasu poniższe daty są PRZEWIDYWANE — odwzorowane 1:1 na
   strukturze realnego harmonogramu 2026 (start w pierwszy dzień roboczy
   po 3 maja, ten sam układ dni tygodnia, te same godziny).
   Po komunikacie CKE: podmień OFFICIAL na true i popraw daty w EXAMS.
   ===================================================================== */

export const OFFICIAL = false; // ← ustaw true, gdy CKE ogłosi harmonogram 2027

/* --- Egzaminy pisemne, termin główny (maj 2027) ---------------------- */
export const EXAMS = [
  { d: '2027-05-04', t: '09:00', s: 'Język polski',            lvl: 'PP', core: true,
    note: 'Otwarcie sezonu. Wszyscy, cała Polska, ten sam arkusz, ta sama cisza.' },

  { d: '2027-05-05', t: '09:00', s: 'Matematyka',              lvl: 'PP', core: true,
    note: 'Dzień, w którym karta wzorów staje się najbliższą Ci osobą.' },
  { d: '2027-05-05', t: '14:00', s: 'Język łaciński i kultura antyczna', lvl: 'PR' },
  { d: '2027-05-05', t: '14:00', s: 'Język kaszubski',         lvl: 'PR' },
  { d: '2027-05-05', t: '14:00', s: 'Język łemkowski',         lvl: 'PR' },

  { d: '2027-05-06', t: '09:00', s: 'Język angielski',         lvl: 'PP', core: true,
    note: 'Najłatwiejszy obowiązkowy egzamin, o którym i tak będziesz się stresować.' },
  { d: '2027-05-06', t: '09:00', s: 'Język niemiecki',         lvl: 'PP' },
  { d: '2027-05-06', t: '09:00', s: 'Język francuski',         lvl: 'PP' },
  { d: '2027-05-06', t: '09:00', s: 'Język hiszpański',        lvl: 'PP' },
  { d: '2027-05-06', t: '09:00', s: 'Język rosyjski',          lvl: 'PP' },
  { d: '2027-05-06', t: '09:00', s: 'Język włoski',            lvl: 'PP' },
  { d: '2027-05-06', t: '09:00', s: 'Język ukraiński (jako obcy)', lvl: 'PP' },
  { d: '2027-05-06', t: '14:00', s: 'Matematyka w języku obcym', lvl: 'PP', bil: true },
  { d: '2027-05-06', t: '15:35', s: 'Geografia w języku obcym',  lvl: 'PR', bil: true },

  { d: '2027-05-07', t: '09:00', s: 'Język angielski',         lvl: 'PR',
    note: 'Rozszerzenie, które wybiera pół rocznika „bo i tak umiem”.' },
  { d: '2027-05-07', t: '09:00', s: 'Język angielski',         lvl: 'DJ' },
  { d: '2027-05-07', t: '09:00', s: 'Historia muzyki',         lvl: 'PR' },

  { d: '2027-05-10', t: '09:00', s: 'Biologia',                lvl: 'PR',
    note: 'Medycyna zaczyna się tutaj. I tutaj też się dla wielu kończy.' },
  { d: '2027-05-10', t: '09:00', s: 'Filozofia',               lvl: 'PR' },

  { d: '2027-05-11', t: '09:00', s: 'Matematyka',              lvl: 'PR',
    note: 'Cztery godziny. Politechniki patrzą.' },
  { d: '2027-05-11', t: '09:00', s: 'Język rosyjski',          lvl: 'PR' },
  { d: '2027-05-11', t: '09:00', s: 'Język rosyjski',          lvl: 'DJ' },

  { d: '2027-05-12', t: '09:00', s: 'Wiedza o społeczeństwie', lvl: 'PR' },
  { d: '2027-05-12', t: '09:00', s: 'Język niemiecki',         lvl: 'PR' },
  { d: '2027-05-12', t: '09:00', s: 'Język niemiecki',         lvl: 'DJ' },

  { d: '2027-05-13', t: '09:00', s: 'Chemia',                  lvl: 'PR',
    note: 'Egzamin, po którym rocznik zbiorowo zmienia plany życiowe.' },
  { d: '2027-05-13', t: '09:00', s: 'Historia sztuki',         lvl: 'PR' },

  { d: '2027-05-14', t: '09:00', s: 'Informatyka',             lvl: 'PR' },
  { d: '2027-05-14', t: '09:00', s: 'Język ukraiński (jako obcy)', lvl: 'PR' },
  { d: '2027-05-14', t: '09:00', s: 'Język ukraiński (jako obcy)', lvl: 'DJ' },

  { d: '2027-05-17', t: '09:00', s: 'Geografia',               lvl: 'PR',
    note: 'Najpopularniejsze rozszerzenie w kraju. Tak, wciąż.' },
  { d: '2027-05-17', t: '09:00', s: 'Języki mniejszości narodowych', lvl: 'PR' },

  { d: '2027-05-18', t: '09:00', s: 'Historia',                lvl: 'PR' },
  { d: '2027-05-18', t: '09:00', s: 'Język francuski',         lvl: 'PR' },
  { d: '2027-05-18', t: '09:00', s: 'Język francuski',         lvl: 'DJ' },

  { d: '2027-05-19', t: '09:00', s: 'Fizyka',                  lvl: 'PR' },
  { d: '2027-05-19', t: '09:00', s: 'Język hiszpański',        lvl: 'PR' },
  { d: '2027-05-19', t: '09:00', s: 'Język hiszpański',        lvl: 'DJ' },

  { d: '2027-05-20', t: '09:00', s: 'Język polski',            lvl: 'PR',
    note: 'Ostatni duży. Dla wielu — ostatni w ogóle.' },
  { d: '2027-05-20', t: '09:00', s: 'Język włoski',            lvl: 'PR' },
  { d: '2027-05-20', t: '09:00', s: 'Język włoski',            lvl: 'DJ' },

  { d: '2027-05-21', t: '09:00', s: 'Języki mniejszości narodowych', lvl: 'PP' },
  { d: '2027-05-21', t: '09:00', s: 'Chemia w języku obcym',   lvl: 'PR', bil: true },
  { d: '2027-05-21', t: '10:35', s: 'Fizyka w języku obcym',   lvl: 'PR', bil: true },
  { d: '2027-05-21', t: '12:10', s: 'Biologia w języku obcym', lvl: 'PR', bil: true },
  { d: '2027-05-21', t: '13:45', s: 'Historia w języku obcym', lvl: 'PR', bil: true },
];

/* --- Kamienie milowe roku maturalnego -------------------------------- */
export const MILESTONES = [
  { d: '2026-09-30', label: 'Deklaracja wstępna',
    desc: 'Deklarujesz przedmioty, będąc jeszcze zupełnie inną osobą niż ta, która do nich podejdzie.' },
  { d: '2027-01-23', label: 'Studniówka', approx: true,
    desc: 'Sto dni przed. Jedyny egzamin tego roku, do którego wszyscy przygotowali się sumiennie.' },
  { d: '2027-02-07', label: 'Deklaracja ostateczna',
    desc: 'Podpis, którego nie da się cofnąć. Od teraz rozszerzenie jest twoje na dobre i na złe.' },
  { d: '2027-05-04', label: 'Start matury', main: true,
    desc: 'Godzina 9:00. Dwa długopisy. Dowód. Cała reszta to już tylko literatura.' },
  { d: '2027-05-21', label: 'Koniec sesji pisemnej',
    desc: 'Ostatni arkusz oddany. Zaczyna się najdłuższy miesiąc w twoim życiu.' },
  { d: '2027-07-07', label: 'Wyniki', approx: true,
    desc: 'Logowanie o 8:30, serwer pada o 8:31. Klasyka gatunku.' },
  { d: '2027-08-24', label: 'Poprawka', approx: true,
    desc: 'Druga szansa istnieje. Tylko z jednego przedmiotu, ale istnieje.' },
];

/* --- FAZY: bohaterowie odliczania ------------------------------------ */
/* max = do ilu dni przed maturą faza obowiązuje (włącznie, licząc w dół) */
export const PHASES = [
  {
    id: 'niesmiertelnosc', max: Infinity, min: 241,
    mascot: 'ziewak',
    kicker: 'Faza 1 · Nieśmiertelność',
    title: 'Matura? Jaka matura.',
    lead: 'Zostało tyle czasu, że w tym oknie zdąży powstać cały sezon serialu, który obejrzysz zamiast się uczyć. I to jest jedyny moment w roku, w którym mówimy szczerze: spokojnie, naprawdę jest spokojnie.',
    quote: 'Wrzesień to miesiąc, w którym matura jest teoretyczna, jak podatki albo emerytura.',
    c1: '#7CE0C3', c2: '#4FB3FF',
  },
  {
    id: 'postanowienie', max: 240, min: 181,
    mascot: 'planista',
    kicker: 'Faza 2 · Wielkie Postanowienie',
    title: 'Kupiłeś zeszyt. To już prawie nauka.',
    lead: 'Zrobiłeś plan. Pokolorowałeś go. Dobrałeś czcionkę i podzieliłeś tydzień na bloki po 45 minut z przerwami na oddech. Dzień, w którym powstał ten plan, pozostanie najbardziej produktywnym dniem całego roku szkolnego i nikt Ci go nie odbierze.',
    quote: 'Plan nauki wykonano w 4%. Plan wyglądał ślicznie w 100%.',
    c1: '#8FD6FF', c2: '#A78BFA',
  },
  {
    id: 'hibernacja', max: 180, min: 131,
    mascot: 'kocyk',
    kicker: 'Faza 3 · Hibernacja',
    title: 'W grudniu się nie da i wszyscy to wiedzą.',
    lead: 'Za oknem ciemno o 15:30, więc organizm słusznie zakłada, że to noc, a nocą się nie powtarza lektur. Wracamy do tematu w styczniu. Albo w lutym. Zobaczymy, jak wyjdzie.',
    quote: 'Ferie to nie przerwa od nauki. To przerwa od myślenia o nauce.',
    c1: '#9FB0FF', c2: '#6E7BFF',
  },
  {
    id: 'stodni', max: 130, min: 96,
    mascot: 'studniowkowy',
    kicker: 'Faza 4 · Sto dni',
    title: 'Studniówka: jedyny egzamin, do którego wszyscy się przygotowali.',
    lead: 'Garnitur skrojony, buty dobrane, poloneza przećwiczony czterdzieści razy pod okiem osoby, która nie odpuszcza. Wniosek o przeniesienie tej energii na chemię rozszerzoną rozpatrzono odmownie.',
    quote: 'Sto dni to dużo. Sto dni to bardzo mało. Oba zdania są prawdziwe jednocześnie.',
    c1: '#CBA6FF', c2: '#FF9ED8',
  },
  {
    id: 'podpis', max: 95, min: 71,
    mascot: 'deklarant',
    kicker: 'Faza 5 · Podpis',
    title: 'Deklaracja ostateczna. Słowo „ostateczna” zrobiło się nagle bardzo duże.',
    lead: 'Podpisujesz papier, że naprawdę przyjdziesz i naprawdę zdajesz to rozszerzenie, które wybrałeś w pierwszej klasie, będąc kimś zupełnie innym. Papier o tym nie wie. Papier nie chce wiedzieć.',
    quote: 'Do 7 lutego można jeszcze zmienić zdanie. Po 7 lutego można już tylko zmienić nastawienie.',
    c1: '#FFD98A', c2: '#C9B8FF',
  },
  {
    id: 'zludzenie', max: 70, min: 46,
    mascot: 'prokrastynator',
    kicker: 'Faza 6 · Wiosenne złudzenie',
    title: 'Jest jeszcze mnóstwo czasu. Tylko trochę mniej niż wczoraj.',
    lead: 'Po raz pierwszy liczba dni mieści się w głowie bez kalkulatora i to jest pierwszy sygnał ostrzegawczy. Otwierasz repetytorium na stronie 4. Czytasz spis treści. Zamykasz. To się liczy jako sesja nauki, bo tak zdecydowałeś.',
    quote: 'Marzec jest jak korytarz: przechodzisz przez niego i nie pamiętasz, co tam było.',
    c1: '#B6F09C', c2: '#5FD6A8',
  },
  {
    id: 'kalendarz', max: 45, min: 22,
    mascot: 'kalendarz',
    kicker: 'Faza 7 · Kalendarz się skurczył',
    title: 'Kwiecień robi rzecz, której nie robił przez cały rok: mija.',
    lead: 'Ten sam kalendarz, który we wrześniu wyglądał jak nieskończona autostrada, teraz wygląda jak parking pod blokiem. Robisz plan nauki po raz drugi — tym razem bez kolorów, bo na kolory nie ma już czasu.',
    quote: 'Zakończenie roku, ostatni dzwonek, i nagle nie ma się gdzie schować przed majem.',
    c1: '#FFD166', c2: '#FFA45B',
  },
  {
    id: 'przyspieszenie', max: 21, min: 9,
    mascot: 'kofeinowy',
    kicker: 'Faza 8 · Przyspieszenie',
    title: 'Dwa tygodnie. Nagle wszystko jest ważne.',
    lead: 'Odkrywasz, że w podstawie programowej były rzeczy, o których nie słyszałeś, i że nauczycielka jednak nie żartowała w listopadzie. Kupujesz trzeci zakreślacz. Ten będzie inny. Ten zadziała.',
    quote: 'Nauka w tym tempie nie jest zdrowa, ale jest imponująca i o tym porozmawiamy za dziesięć lat.',
    c1: '#FFB35C', c2: '#FF7A59',
  },
  {
    id: 'panika', max: 8, min: 3,
    mascot: 'panika',
    kicker: 'Faza 9 · Panika Premium',
    title: 'Tydzień. Śpisz gorzej, ale za to krócej.',
    lead: 'Przeglądarka ma otwartych czterdzieści jeden kart: sześć to „ile trzeba na 30 procent z polskiego”, dwanaście to memy o maturze, reszta to lektury w streszczeniu. Formalnie to nadal są przygotowania i nikt Ci tego nie odbierze.',
    quote: 'Na tym etapie powtarzanie i przewijanie w telefonie wyglądają identycznie od zewnątrz.',
    c1: '#FF8A76', c2: '#FF4D6D',
  },
  {
    id: 'przypomnienie', max: 2, min: 2,
    mascot: 'przypominacz',
    kicker: 'Faza 10 · Przypomnienie',
    title: 'Dwa dni.',
    lead: 'To jest ten moment, w którym zaczynasz sobie przypominać, że w ogóle w tym roku czeka Cię jakiś egzamin. Witamy. Idzie Ci naprawdę świetnie, biorąc pod uwagę okoliczności.',
    quote: 'Świadomość przyszła. Trochę późno, ale przyszła i to się liczy.',
    c1: '#FF5C8A', c2: '#C13BFF',
  },
  {
    id: 'jutro', max: 1, min: 1,
    mascot: 'sowa',
    kicker: 'Faza 11 · Jutro',
    title: 'Jutro. Serio jutro.',
    lead: 'Dziś nauczysz się więcej niż przez ostatnie osiem miesięcy. Naukowo to nieprawda. Emocjonalnie — całkowita prawda. Przygotuj dowód, dwa czarne długopisy i odrobinę mniej rozpaczy, niż planowałeś.',
    quote: 'Idź spać. Naprawdę. To jest jedyna rada z tej strony, która ma pokrycie w badaniach.',
    c1: '#FF6B6B', c2: '#8B5CF6',
  },
  {
    id: 'dzis', max: 0, min: 0,
    mascot: 'maturzysta',
    kicker: 'Faza 12 · Dziś',
    title: 'Dziś. Godzina 9:00.',
    lead: 'Nic już nie doczytasz i to jest dobra wiadomość. Dwa długopisy, woda bez etykiety, dowód osobisty. Wejdź, usiądź, przeczytaj polecenie dwa razy — naprawdę dwa razy. Tu kończą się żarty: powodzenia.',
    quote: 'Cokolwiek się dziś wydarzy, za pięć lat będzie z tego anegdota.',
    c1: '#FFE66D', c2: '#FFB800',
  },
  {
    id: 'sesja', max: -1, min: -1, // stan techniczny: trwa sesja
    mascot: 'kofeinowy',
    kicker: 'Trwa sesja maturalna',
    title: 'Jesteś w środku. Nie ma już czego odliczać, jest co przeżyć.',
    lead: 'Kolejne arkusze, kolejne poranki, kolejne „jak Ci poszło” zadawane przez ludzi, którzy naprawdę chcą dobrze. Odliczamy do ostatniego egzaminu i do dnia, w którym odłożysz długopis na dobre.',
    quote: 'Zasada sesji: nie sprawdzamy odpowiedzi w internecie po wyjściu. Nigdy. Nikt jej nie przestrzega.',
    c1: '#FFC94D', c2: '#FF8A3D',
  },
  {
    id: 'wolnosc', max: -2, min: -Infinity, // po sesji
    mascot: 'wolny',
    kicker: 'Po wszystkim',
    title: 'Wolność. A teraz najgorsza część: czekanie.',
    lead: 'Egzaminy oddane, długopisy wyrzucone, plecak schowany. Zostało już tylko odliczanie do wyników i obowiązujący do odwołania zakaz analizowania, co dokładnie wpisałeś w zadaniu dwunastym.',
    quote: 'Lipiec zweryfikuje wszystko. Do lipca — masz prawo do spokoju.',
    c1: '#6EE7B7', c2: '#38BDF8',
  },
];

/* --- Wyrocznia: teksty po kliknięciu w bohatera ----------------------- */
export const ORACLE = [
  'Karta wzorów nie ugryzie. Otwórz ją wcześniej niż w dniu egzaminu.',
  'Streszczenie lektury to nie lektura, ale w kwietniu to już szczegół.',
  'Nikt nigdy nie zdał matury dzięki temu, że zrobił ładny plan nauki.',
  'Twoje rozszerzenie wybrała osoba, która miała szesnaście lat. Wybacz jej.',
  '„Jeszcze zdążę” to najdroższe zdanie polskiej edukacji.',
  'Progi rekrutacyjne sprawdzasz częściej niż zadania. Wiemy.',
  'Trzydzieści procent to nie ambicja. To minimum. Celuj wyżej.',
  'Matura ustna z polskiego trwa piętnaście minut. Stres — trzy miesiące.',
  'Jeden dobrze zrobiony arkusz to więcej niż sześć godzin scrollowania notatek.',
  'Nie ma czegoś takiego jak „lekki rok maturalny”. Jest tylko dobrze udawany.',
  'Termin poprawkowy istnieje. Nie planuj go, ale wiedz, że jest.',
  'Osoba, która mówi, że się nie uczyła, uczyła się.',
  'Zabierz wodę bez etykiety. Serio, sprawdzą.',
  'Legitymacja nie wystarczy. Dowód osobisty albo paszport.',
  'Do sali nie wchodzi telefon. Nie wchodzi też smartwatch.',
  'Czarny długopis. Nie niebieski. Nie żelowy w kolorze „grafit”.',
  'Ostatnia noc przed egzaminem służy do spania. To nie jest metafora.',
  'Więcej ludzi oblało przez nieprzeczytane polecenie niż przez nieznajomość materiału.',
  'Wyniki w lipcu. Do lipca żadna analiza niczego nie zmieni.',
  'Rekrutacja to osobny egzamin, o którym nikt Ci nie mówi. Sprawdź terminy uczelni.',
  'Zadanie, którego nie umiesz, nie jest karą. Jest po prostu następne.',
  'Nie porównuj swojego drugiego miesiąca z czyimś dwunastym.',
  'Matura jest ważna. Nie jest jedyna. Oba fakty mogą współistnieć.',
  'Jeśli czytasz to zamiast się uczyć — to też jest jakaś forma kontaktu z tematem.',
];
