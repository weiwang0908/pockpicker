import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import NaturesClient from "./NaturesClient";
import {
  WHAT_IS_TEXT,
  HOW_TO_STEPS,
  NATURE_CHART_TEXT,
  COMPETITIVE_TEXT,
  COMPETITIVE_ITEMS,
  FAQ_ITEMS,
} from "./seo-content";
import { fetchAllPokemonList } from "@/lib/pokeapi/data";
import { SiteHeader } from "@/app/components/SiteHeader";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pokepicker.app";

const WEB_APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pokemon Natures Guide",
  url: `${baseUrl}/pokemon-natures`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  description:
    "Every Pokemon nature explained. See all 25 natures, which stat each one raises and lowers, and get the best nature recommendation for any Pokemon.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
      "Pokemon Natures — Complete List & Best Nature Guide | PokePicker",
  },
  description:
    "Every Pokemon nature explained. See all 25 natures, which stat each one raises and lowers, and get the best nature recommendation for any Pokemon. Free, no signup.",
  alternates: { canonical: "/pokemon-natures" },
  openGraph: {
    title:
      "Pokemon Natures — Complete List & Best Nature Guide | PokePicker",
    description:
      "Every Pokemon nature explained. See all 25 natures, which stat each one raises and lowers, and get the best nature recommendation for any Pokemon. Free, no signup.",
  },
};

export const revalidate = 3600;

export default async function PokemonNaturesPage() {
  // Pre-load the full Pokemon list for the recommender search (cached 24h via PokeAPI client)
  let pokemonList: { id: number; name: string }[] = [];
  try {
    const list = await fetchAllPokemonList();
    pokemonList = list.map((p) => ({ id: p.id, name: p.name }));
  } catch {
    // Fallback to empty list; recommender search will show no suggestions
  }

  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      <NaturesClient pokemonList={pokemonList} />

      {/* SEO: What are */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold text-foreground">
          What are Pokemon natures?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {WHAT_IS_TEXT}
        </p>
      </section>

      {/* SEO: How to choose */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          How to choose the best nature
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

      {/* SEO: Nature chart explained */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Pokemon nature chart explained
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {NATURE_CHART_TEXT}
        </p>
      </section>

      {/* SEO: Best natures for competitive */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Best natures for competitive play
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {COMPETITIVE_TEXT}
        </p>
        <ul className="mt-4 space-y-3">
          {COMPETITIVE_ITEMS.map((item) => (
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

      {/* Cross-link to Team Generator */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-8">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Once you&rsquo;ve picked the right nature, why not put it to the test?
          Use our{' '}
          <Link href="/random-pokemon-team-generator" className="text-brand underline">
            random Pokemon team generator
          </Link>{' '}
          to roll a full squad and see how your nature choices play out in battle.
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
