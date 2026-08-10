# Content-driven pages — instrukcja dla agenta kodu

Strony NIE są plikami .astro. Strona = plik JSON w `pages/` z listą sekcji;
`src/pages/[...slug].astro` renderuje wszystkie przez rejestr w
`src/components/sections/SectionRenderer.astro`. Nawigacja i stopka w
`navigation.json`. Powody i pełny projekt: `saas/edit-architecture.md` w generatorze.

## Zasady podczas generacji strony

1. **Treść wpisujesz do JSON-ów**, nie do komponentów. Placeholdery
   (`HERO_TITLE_PLACEHOLDER` itd.) są w `pages/index.json` — podmień wszystkie.
   Komponenty sekcji customizujesz per-projekt (design system, ikony,
   ilustracje), ale copy trzymasz w danych.
2. **Nowa podstrona = nowy plik JSON** (np. `pages/uslugi/montaz.json` →
   `/uslugi/montaz`). Dodaj link do `navigation.json`. Zero zmian w kodzie.
3. **Galeria**: typ sekcji `gallery` jest w rejestrze — pliki zdjęć do
   `src/assets/gallery/`, wpisy `images[]` z wymaganym `alt` (opisowy PL).
   Build robi WebP responsive automatycznie (astro:assets). Sekcja istnieje
   TYLKO gdy są pliki — nigdy pusta, nigdy stock-placeholder.
4. **Nowy typ sekcji per-site** (np. cennik): komponent w
   `src/components/sections/` + wariant w unii `src/content.config.ts` + wpis
   w registry `SectionRenderer.astro`. Komponent MUSI przyjmować
   `{ data, editPath }` i emitować `editAttrs()` na sekcji i polach tekstowych
   (wzoruj się na `Features.astro`).
5. **Alternacja teł** polem `background` w danych sekcji (`bg`/`subtle`/`elevated`)
   — hard rule: nigdy jednolite tło przez całą stronę.
6. **Sekcje ze specjalną logiką** (regulamin z build-guardem, polityka
   prywatności z siteConfig.legal) zostają jako .astro w `src/pages/` — statyczne
   route'y mają pierwszeństwo przed `[...slug]`.
7. **Strony noindex spoza .astro**: jeśli tworzysz content-page z `noindex: true`
   (np. /dziekujemy), dopisz jej ścieżkę do filtra sitemap w `astro.config.mjs` —
   filtr nie czyta flagi z danych.
8. **Fakty**: żadna liczba/twierdzenie w JSON-ach nie może wykraczać poza
   "Dozwolone fakty" z brief.md. Brak danych → sekcja znika z listy, nie
   placeholder.

## Sekcja `googleReviews` — opinie z wizytówki Google (v16)

Dane biorą się 1:1 ze snapshotu backendu (`googleReviewsSnapshot` w zamówieniu):
`rating` (średnia, np. 4.8), `total` (liczba opinii w Google), `profileUrl`
(googleMapsUri profilu), `reviews[]` = 5 NAJNOWSZYCH opinii
(`{ author, rating 1-5, text, date }`) — nie wybieraj "lepszych", nie redaguj
treści, nigdy nie zmyślaj. `heading` opcjonalny (default "Opinie klientów"),
`background` jak w innych sekcjach. Atrybucja "Opinie z Google" + link
"Zobacz wszystkie opinie w Google" są HARDCODED w `GoogleReviews.astro`
(wymóg TOS Google) — przy customizacji per-projekt NIE usuwaj ich i nie
przenoś do danych. Gwiazdki i ikona linku to inline SVG w komponencie
(świadomie poza `src/icons/set.ts`).

```json
{ "type": "googleReviews", "background": "subtle",
  "rating": 4.8, "total": 37,
  "profileUrl": "https://maps.google.com/?cid=...",
  "reviews": [ { "author": "Jan K.", "rating": 5, "text": "…", "date": "2 miesiące temu" } ] }
```

## Sekcja `mapEmbed` — mapa dojazdu Google, click-to-load (v16)

RODO: bez kliknięcia strona NIE łączy się z Google — renderowany jest
placeholder (karta z ikoną, przyciskiem "Pokaż mapę Google" i notką o
ładowaniu z serwerów Google); iframe powstaje dopiero po kliknięciu (raw JS
w `is:inline`). `src` = pełny URL
`https://www.google.com/maps/embed/v1/place?key=...&q=...`. `heading`
opcjonalny (np. "Jak do nas trafić"), `title` = title iframe'a (default
"Mapa dojazdu"). Sekcję umieszczaj BEZPOŚREDNIO po sekcji kontaktowej
(lub na podstronie kontakt). Gdy mapa jest na stronie, polityka prywatności
musi wspominać Google Maps (ładowane po kliknięciu).

```json
{ "type": "mapEmbed", "heading": "Jak do nas trafić",
  "src": "https://www.google.com/maps/embed/v1/place?key=...&q=Firma+X" }
```

## Blog (`posts/`) — default OFF

Wpisy bloga to pliki Markdown w `posts/` (kolekcja `posts` w
`content.config.ts`). Strony `/blog/` (listing) i `/blog/<slug>/` (artykuł)
renderuje `src/pages/blog/[...slug].astro` — **emitują się TYLKO gdy
`siteConfig.features.hasBlog === true`** (default `false`; przy `false`
getStaticPaths zwraca `[]`, więc w `dist/` i w sitemap nie ma żadnej ścieżki
`/blog/*`). Nie włączaj bloga "na zapas" — tylko gdy Karol explicite poprosi.

Frontmatter wpisu:

```md
---
title: "Tytuł wpisu"            # wymagane
description: "Zajawka wpisu"    # opcjonalne (meta description + listing)
pubDate: 2026-07-10             # wymagane (data publikacji, sort desc)
updatedDate: 2026-07-12         # opcjonalne
draft: false                    # true = wpis w ogóle nie buduje się
---

Treść w Markdownie…
```

Slug = ścieżka pliku bez `.md` (np. `posts/jak-wybrac-piec.md` →
`/blog/jak-wybrac-piec/`). Przy `hasBlog: true` **dopisz link
`{ "label": "Blog", "href": "/blog/" }` do `navigation.json`** (header +
footer) — nav idzie z danych, więc nie ma automatycznego gate'a w komponencie;
przy `hasBlog: false` linka w `navigation.json` być NIE może.
