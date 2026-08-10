// Central per-project site config.
// Komponenty i layouty czytają stąd — nie rozsiewaj wartości po kodzie.

export const siteConfig = {
  // Brand
  name: "kiedy-matura.pl",
  shortName: "kiedy-matura.pl",
  logoImage: null as string | null,
  logoImageHidesName: false,
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
  },
  url: "https://www.kiedy-matura.pl",
  locale: "pl_PL",
  lang: "pl",

  legal: {
    adminName: "Ecopywriting.pl Karol Leszczyński",
    adminAddress: "Papowo Biskupie 119/18, 86-221 Papowo Biskupie",
    adminNip: "9562203948",
    adminEmail: "kontakt@kiedy-matura.pl",
  },

  features: {
    // GA4 property 549327122 (konto „Root dla zaplecz z astro generator").
    // Consent Mode v2 włącza się automatycznie razem z tym ID.
    ga4: "G-R2PW6W8N17" as string | null,
    contactForm: false,
    contactFormAttachments: false,
    hasShop: false,
    hasBlog: false,
    sitarioCredit: false,
  },

  contact: {
    email: "kontakt@kiedy-matura.pl",
    phone: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
