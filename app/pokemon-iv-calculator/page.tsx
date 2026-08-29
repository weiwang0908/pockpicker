import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/SiteHeader";
import { IVCalculatorClient } from "./IVCalculatorClient";
import {
  HERO_TAGLINE,
  WHAT_ARE_IVS_TEXT,
  WHAT_ARE_EVS_TEXT,
  FORMULA_DERIVATION_TEXT,
  WORKED_EXAMPLE_TEXT,
  ZERO_IV_BUILDS_TEXT,
  MISTAKES_ITEMS,
  USE_CASE_ITEMS,
  FAQ_ITEMS,
} from "./seo-content";

export const metadata: Metadata = {
  title: "Pokemon IV Calculator — Stats for All 1025 Pokémon",
  description:
    "Calculate your Pokémon's actual stats with our free IV calculator. Enter base stats, IVs, EVs, level and nature to get accurate stat values. Includes formula breakdown, worked examples and 0-IV build guides.",
  alternates: { canonical: "/pokemon-iv-calculator" },
  openGraph: {
    title: "Pokemon IV Calculator — Stats for All 1025 Pokémon",
    description:
      "Calculate your Pokémon's actual stats with our free IV calculator. Enter base stats, IVs, EVs, level and nature to get accurate stat values. Includes formula breakdown, worked examples and 0-IV build guides.",
  },
};

export default function IVCalculatorPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="mx-auto w-full max-w-3xl px-6 py-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pokemon IV Calculator
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {HERO_TAGLINE}
        </p>
      </section>

      <IVCalculatorClient />

      {/* SEO: IVs vs EVs primer */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground">
          What are IVs and EVs?
        </h2>
        <h3 className="mt-6 text-lg font-bold text-foreground">
          Individual Values: the hidden lottery
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {WHAT_ARE_IVS_TEXT}
        </p>
        <h3 className="mt-6 text-lg font-bold text-foreground">
          Effort Values: training you control
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {WHAT_ARE_EVS_TEXT}
        </p>
      </section>

      {/* SEO: formula + worked example */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          How the stat formula works
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <strong>HP:</strong> floor((2 × Base + IV + floor(EV ÷ 4)) × Level ÷
          100) + Level + 10
        </p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <strong>Other stats:</strong> floor(floor((2 × Base + IV + floor(EV ÷
          4)) × Level ÷ 100) + 5) × Nature modifier
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {FORMULA_DERIVATION_TEXT}
        </p>
        <h3 className="mt-8 text-lg font-bold text-foreground">
          Worked example: the famous 333 Speed Garchomp
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {WORKED_EXAMPLE_TEXT}
        </p>
      </section>

      {/* SEO: 0-IV builds */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          When 0 IVs are better than 31
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {ZERO_IV_BUILDS_TEXT}
        </p>
      </section>

      {/* SEO: use cases */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          When to use this calculator
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {USE_CASE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-800"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO: common mistakes */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          5 common IV calculation mistakes
        </h2>
        <div className="mt-4 divide-y divide-zinc-100">
          {MISTAKES_ITEMS.map((item, i) => (
            <div key={item.title} className="py-4">
              <h3 className="font-semibold text-foreground">
                {i + 1}. {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-zinc-100">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="py-4">
              <h3 className="font-semibold text-foreground">{item.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-zinc-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-6 text-sm text-zinc-500">
          <span>&copy; 2026 PokePicker</span>
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <Link
            href="/pokemon-team-builder"
            className="transition-colors hover:text-brand"
          >
            Team Builder
          </Link>
          <Link
            href="/pokemon-type-chart"
            className="transition-colors hover:text-brand"
          >
            Type Chart
          </Link>
          <Link
            href="/pokemon-natures"
            className="transition-colors hover:text-brand"
          >
            Natures
          </Link>
        </div>
      </footer>
    </main>
  );
}
