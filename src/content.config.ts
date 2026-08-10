// Content-driven architecture (patrz saas/edit-architecture.md w generatorze):
// strona = plik JSON w src/content/pages/ z listą instancji sekcji.
// Dodanie podstrony = dodanie pliku JSON — zero zmian w kodzie.
// Sekcje per-site dopisujesz tu (nowy wariant unii) + komponent w
// src/components/sections/ + wpis w registry (SectionRenderer.astro).

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const cta = z.object({ label: z.string(), href: z.string() });

// Tło sekcji — alternuj między sekcjami (hard rule: nigdy jednolite bg
// przez całą stronę). Wartości mapują się na zmienne z global.css.
const background = z.enum(["bg", "subtle", "elevated"]).optional();

const badge = z.object({
  icon: z.string(), // klucz z src/icons/set.ts
  label: z.string(),
  tone: z.enum(["accent", "muted"]).default("accent"),
});

const heroSection = z.object({
  type: z.literal("hero"),
  id: z.string().optional(),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  ctaPrimary: cta.optional(),
  ctaSecondary: cta.optional(),
  // Wariant <HeroIllustration>; per-site możesz dodać własne warianty.
  illustration: z.string().default("conceptual"),
  // Zdjęcie klienta zamiast <HeroIllustration> — nazwa pliku w src/assets/gallery/.
  image: z.string().optional(),
  // Max 1 mesh/spotlight NA CAŁĄ STRONĘ (hard rule no-glow).
  decor: z.enum(["mesh", "spotlight", "dots", "none"]).default("mesh"),
});

const statsSection = z.object({
  type: z.literal("stats"),
  id: z.string().optional(),
  background,
  items: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        accent: z.boolean().optional(),
      })
    )
    .min(2)
    .max(4),
});

const featuresSection = z.object({
  type: z.literal("features"),
  id: z.string().optional(),
  background,
  badge: badge.optional(),
  title: z.string(),
  intro: z.string().optional(),
  items: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      text: z.string(),
      accent: z.enum(["default", "highlight"]).default("default"),
    })
  ),
});

const processSection = z.object({
  type: z.literal("process"),
  id: z.string().optional(),
  background,
  badge: badge.optional(),
  title: z.string(),
  intro: z.string().optional(),
  decor: z.enum(["dots", "none"]).default("dots"),
  steps: z.array(z.object({ title: z.string(), text: z.string() })).min(2),
});

const faqSection = z.object({
  type: z.literal("faq"),
  id: z.string().optional(),
  background,
  badge: badge.optional(),
  title: z.string(),
  intro: z.string().optional(),
  items: z.array(z.object({ q: z.string(), a: z.string() })).min(1),
});

const testimonialsSection = z.object({
  type: z.literal("testimonials"),
  id: z.string().optional(),
  background,
  badge: badge.optional(),
  title: z.string(),
  // TYLKO prawdziwe opinie dostarczone przez właściciela — nigdy zmyślone.
  items: z.array(
    z.object({
      author: z.string(),
      role: z.string().optional(),
      text: z.string(),
    })
  ),
});

const contactSection = z.object({
  type: z.literal("contact"),
  id: z.string().default("kontakt"),
  background,
  badge: badge.optional(),
  title: z.string(),
  intro: z.string().optional(),
  // form=true wymaga siteConfig.features.contactForm + Lambd (playbook 08).
  // form=false renderuje kartę z danymi kontaktowymi z siteConfig.
  form: z.boolean().default(true),
  messageLabel: z.string().optional(),
  messagePlaceholder: z.string().optional(),
  // Odzwierciedla ExtraField z ContactForm.astro — trzymaj w sync.
  extraFields: z
    .array(
      z.object({
        name: z.string(),
        label: z.string(),
        type: z.enum(["text", "tel", "select", "textarea", "checkbox"]),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        options: z.array(z.string()).optional(),
        rows: z.number().optional(),
      })
    )
    .optional(),
});

// Galeria zdjęć (realizacje, portfolio). `image` = nazwa pliku w
// src/assets/gallery/ — Gallery.astro renderuje przez astro:assets <Image>,
// więc build robi resize + WebP automatycznie (sharp). Oryginały wrzucamy
// do src/assets/gallery/ w dowolnym formacie (jpg/png/heic po konwersji).
const gallerySection = z.object({
  type: z.literal("gallery"),
  id: z.string().optional(),
  background,
  badge: badge.optional(),
  title: z.string(),
  intro: z.string().optional(),
  images: z
    .array(
      z.object({
        image: z.string(), // nazwa pliku w src/assets/gallery/, np. "lazienka-1.jpg"
        alt: z.string(), // wymagane (a11y)
        caption: z.string().optional(),
      })
    )
    .min(1),
});

// Dla podstron informacyjnych. html generowany przez agenta / edit mode —
// underline w linkach jest tu OK (kontener ma data-prose).
const proseSection = z.object({
  type: z.literal("prose"),
  id: z.string().optional(),
  background,
  html: z.string(),
});

// Opinie z wizytówki Google — dane 1:1 ze snapshotu backendu (5 najnowszych
// opinii, bez wybierania "lepszych"; nigdy zmyślone). profileUrl = googleMapsUri
// wizytówki. Atrybucja "Opinie z Google" + link do profilu są HARDCODED
// w GoogleReviews.astro (wymóg TOS Google) — nie są sterowane danymi.
const googleReviewsSection = z.object({
  type: z.literal("googleReviews"),
  id: z.string().optional(),
  background,
  heading: z.string().default("Opinie klientów"),
  rating: z.number().min(1).max(5), // średnia, np. 4.8
  total: z.number().int().positive(), // liczba opinii w Google
  profileUrl: z.string().url(), // link do profilu Google (googleMapsUri)
  reviews: z
    .array(
      z.object({
        author: z.string(),
        rating: z.number().min(1).max(5),
        text: z.string(), // może być pusta (opinia bez treści, sama ocena)
        date: z.string(), // jak w snapshocie, np. "2 miesiące temu"
      })
    )
    .min(1),
});

// Mapa dojazdu Google — click-to-load (RODO): bez kliknięcia zero requestów
// do Google. src = pełny URL https://www.google.com/maps/embed/v1/place?key=...&q=...
// Sekcja ląduje bezpośrednio po sekcji kontaktowej (decyzja brief-compilera).
const mapEmbedSection = z.object({
  type: z.literal("mapEmbed"),
  id: z.string().optional(),
  background,
  heading: z.string().optional(), // np. "Jak do nas trafić"
  src: z.string().url(),
  title: z.string().default("Mapa dojazdu"), // title iframe (a11y)
});

export const sectionSchema = z.discriminatedUnion("type", [
  heroSection,
  statsSection,
  featuresSection,
  processSection,
  faqSection,
  testimonialsSection,
  gallerySection,
  contactSection,
  proseSection,
  googleReviewsSection,
  mapEmbedSection,
]);

// Blog — wpisy Markdown w src/content/posts/. Strony /blog/* emitują się
// TYLKO gdy siteConfig.features.hasBlog === true (gate w
// src/pages/blog/[...slug].astro — przy false getStaticPaths zwraca []).
// Kolekcja może istnieć pusta; draft: true wyklucza wpis z builda.
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Obrazek wpisu (ścieżka w public/ lub URL) — trafia do JSON-LD BlogPosting.image;
    // brak = fallback na /og-image.jpg.
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(), // fraza kluczowa + kontekst; BaseLayout dokleja " | brand"
    description: z.string(),
    noindex: z.boolean().default(false),
    ogImage: z.string().optional(),
    jsonLd: z.union([z.record(z.any()), z.array(z.record(z.any()))]).optional(),
    sections: z.array(sectionSchema),
  }),
});

export const collections = { pages, posts };

export type SectionData = z.infer<typeof sectionSchema>;
export type HeroData = z.infer<typeof heroSection>;
export type StatsData = z.infer<typeof statsSection>;
export type FeaturesData = z.infer<typeof featuresSection>;
export type ProcessData = z.infer<typeof processSection>;
export type FaqData = z.infer<typeof faqSection>;
export type TestimonialsData = z.infer<typeof testimonialsSection>;
export type ContactData = z.infer<typeof contactSection>;
export type GalleryData = z.infer<typeof gallerySection>;
export type ProseData = z.infer<typeof proseSection>;
export type GoogleReviewsData = z.infer<typeof googleReviewsSection>;
export type MapEmbedData = z.infer<typeof mapEmbedSection>;
