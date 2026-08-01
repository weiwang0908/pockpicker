import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/SiteHeader";
import { IVCalculatorClient } from "./IVCalculatorClient";

export const metadata: Metadata = {
  title: "Pokemon IV Calculator — Stat Calculator for All 1025 Pokémon",
  description:
    "Calculate your Pokémon's actual stats with our free IV calculator. Enter base stats, IVs, EVs, level and nature to get accurate stat values. No signup required.",
  alternates: { canonical: "/pokemon-iv-calculator" },
  openGraph: {
    title: "Pokemon IV Calculator — Stat Calculator for All 1025 Pokémon",
    description:
      "Calculate your Pokémon's actual stats with our free IV calculator. Enter base stats, IVs, EVs, level and nature to get accurate stat values. No signup required.",
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
          Enter a Pokémon name, adjust IVs, EVs, level and nature to calculate
          its actual stats. Uses the Gen 3+ stat formula.
        </p>
      </section>

      <IVCalculatorClient />

      {/* SEO content */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground">
          How does the IV calculator work?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Every Pokémon has six base stats determined by its species. On top of
          that, Individual Values (IVs) range from 0 to 31 per stat and are
          fixed when the Pokémon is obtained. Effort Values (EVs) are earned
          through battles and range from 0 to 252 per stat, with a maximum of
          510 total. The calculator combines these with the Pokémon&rsquo;s
          level and nature to compute the final stat numbers you see in-game.
        </p>

        <h3 className="mt-8 text-lg font-bold text-foreground">Stat formula</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <strong>HP:</strong> floor((2 × Base + IV + floor(EV ÷ 4)) × Level ÷
          100) + Level + 10
        </p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <strong>Other stats:</strong> floor(floor((2 × Base + IV + floor(EV ÷
          4)) × Level ÷ 100) + 5) × Nature modifier
        </p>

        <h3 className="mt-8 text-lg font-bold text-foreground">
          When to use this calculator
        </h3>
        <ul className="mt-2 list-disc gap-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <li>Planning competitive teams with specific EV spreads</li>
          <li>Checking if a newly caught Pokémon has perfect IVs</li>
          <li>Comparing different nature and EV combinations</li>
          <li>Theory-crafting builds for Nuzlocke or playthroughs</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-zinc-100">
          <div className="py-4">
            <h3 className="font-semibold text-foreground">
              What are IVs in Pokémon?
            </h3>
            <p className="mt-1 text-sm text-muted">
              Individual Values (IVs) are hidden stats ranging from 0 to 31 per
              stat. They are determined when a Pokémon is encountered and cannot
              be changed (except via Hyper Training in some games).
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-foreground">
              What are EVs in Pokémon?
            </h3>
            <p className="mt-1 text-sm text-muted">
              Effort Values (EVs) are stat points earned by defeating specific
              Pokémon. Each stat can hold up to 252 EVs, with a total cap of 510
              across all stats.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-foreground">
              How do natures affect stats?
            </h3>
            <p className="mt-1 text-sm text-muted">
              Each non-neutral nature increases one stat by 10% and decreases
              another by 10%. HP is never affected by nature. See our{" "}
              <Link
                href="/pokemon-natures"
                className="text-brand underline"
              >
                natures chart
              </Link>{" "}
              for the full list.
            </p>
          </div>
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
