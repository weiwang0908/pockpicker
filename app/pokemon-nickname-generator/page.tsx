import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import NicknameGeneratorClient from "./NicknameGeneratorClient";
import {
  WHAT_IS_TEXT,
  NAMING_CONVENTIONS_TEXT,
  NUZLOCKE_TEXT,
  FAN_GAME_TEXT,
  USE_CASES_ITEMS,
  HOW_TO_STEPS,
  FAQ_ITEMS,
} from "./seo-content";
import { fetchAllPokemonList } from "@/lib/pokeapi/data";
import { SiteHeader } from "@/app/components/SiteHeader";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pokepicker.app";

const WEB_APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pokemon Nickname Generator",
  url: `${baseUrl}/pokemon-nickname-generator`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  description:
    "Generate 55+ creative Pokemon nicknames per species across wordplay, mythology, cute, tough, food, nature, and real-name categories. Type-themed suggestions for any of the 1,025 Pokemon. Free, no signup.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${baseUrl}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pokemon Nickname Generator",
      item: `${baseUrl}/pokemon-nickname-generator`,
    },
  ],
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const metadata: Metadata = {
  title: {
    absolute:
      "Pokemon Nickname Generator — 55+ Names Per Species | PokePicker",
  },
  description:
    "Generate 55+ creative Pokemon nicknames per species across wordplay, mythology, cute, tough, food, nature, and real-name categories. Type-themed suggestions for any Pokemon. Free, no signup.",
  alternates: { canonical: "/pokemon-nickname-generator" },
  openGraph: {
    title:
      "Pokemon Nickname Generator — 55+ Names Per Species | PokePicker",
    description:
      "Generate 55+ creative Pokemon nicknames per species across wordplay, mythology, cute, tough, food, nature, and real-name categories. Type-themed suggestions for any Pokemon. Free, no signup.",
  },
};

export const revalidate = 3600;

export default async function PokemonNicknameGeneratorPage() {
  // Pre-load the full Pokemon list for the search autocomplete (cached 24h via PokeAPI client)
  let pokemonList: { id: number; name: string }[] = [];
  try {
    const list = await fetchAllPokemonList();
    pokemonList = list.map((p) => ({ id: p.id, name: p.name }));
  } catch {
    // Fallback to empty list; search will show no suggestions
  }

  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      <NicknameGeneratorClient pokemonList={pokemonList} />

      {/* SEO: What is */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold text-foreground">
          What is a Pokemon nickname generator?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {WHAT_IS_TEXT}
        </p>
      </section>

      {/* SEO: How to use */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          How to use the nickname generator
        </h2>
        <ol className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
          {HOW_TO_STEPS.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-bold text-brand">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* SEO: Use cases */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Who uses a Pokemon nickname generator?
        </h2>
        <ul className="mt-4 space-y-3">
          {USE_CASES_ITEMS.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-zinc-100 bg-surface p-4"
            >
              <span className="font-semibold text-foreground">{item.title}</span>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* SEO: Naming conventions explained */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Pokemon naming conventions explained
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {NAMING_CONVENTIONS_TEXT}
        </p>
      </section>

      {/* SEO: Best nicknames for Nuzlocke */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Best Pokemon nicknames for Nuzlocke runs
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {NUZLOCKE_TEXT}
        </p>
      </section>

      {/* SEO: Names for fan games */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Creating names for fan games and ROM hacks
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {FAN_GAME_TEXT}
        </p>
      </section>

      {/* Cross-link to related tools */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-8">
        <h2 className="text-2xl font-bold text-foreground">Related tools</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Once you&rsquo;ve found the perfect nickname, build a team around your
          Pokémon with our{' '}
          <Link href="/pokemon-team-builder" className="text-brand underline">
            Pokemon team builder
          </Link>
          , check type matchups on the{' '}
          <Link href="/pokemon-type-chart" className="text-brand underline">
            Pokemon type chart
          </Link>
          , or find the best nature for any species with our{' '}
          <Link href="/pokemon-natures" className="text-brand underline">
            Pokemon natures chart
          </Link>
          .
        </p>
      </section>

      {/* SEO: FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-zinc-100">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q}>
              {item.a}
            </FaqItem>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-zinc-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-6 text-sm text-zinc-500">
          <span>&copy; 2026 PokePicker</span>
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <Link href="/random-pokemon-team-generator" className="transition-colors hover:text-brand">
            Team Generator
          </Link>
          <Link href="/pokemon-team-builder" className="transition-colors hover:text-brand">
            Team Builder
          </Link>
          <Link href="/pokemon-type-chart" className="transition-colors hover:text-brand">
            Type Chart
          </Link>
          <Link href="/pokemon-natures" className="transition-colors hover:text-brand">
            Natures Chart
          </Link>
          <Link href="/about" className="transition-colors hover:text-brand">
            About
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-brand">
            Privacy
          </Link>
          <Link href="/contact" className="transition-colors hover:text-brand">
            Contact
          </Link>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APP_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
    </main>
  );
}

function FaqItem({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium text-foreground [&::-webkit-details-marker]:hidden">
        {q}
        <span
          aria-hidden="true"
          className="ml-2 text-zinc-400 transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        {children}
      </div>
    </details>
  );
}
