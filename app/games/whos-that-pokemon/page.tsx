import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/SiteHeader";
import { WhosThatPokemonClient } from "./WhosThatPokemonClient";
import {
  HERO_TAGLINE,
  HISTORY_TEXT,
  HOW_TO_PLAY_STEPS,
  DIFFICULTY_TIERS,
  IDENTIFICATION_TIPS,
  WHY_PLAY_TEXT,
  FAQ_ITEMS,
} from "./seo-content";

export const metadata: Metadata = {
  title: "Who's That Pokémon? — Free Guessing Game",
  description:
    "Play the classic Who's That Pokémon guessing game for free. Identify all 1025 Pokémon from their silhouettes, build your streak, and learn shape-recognition tips. No signup required.",
  alternates: { canonical: "/games/whos-that-pokemon" },
  openGraph: {
    title: "Who's That Pokémon? — Free Guessing Game | PokePicker",
    description:
      "Play the classic Who's That Pokémon guessing game for free. Identify all 1025 Pokémon from their silhouettes, build your streak, and learn shape-recognition tips. No signup required.",
  },
};

export default function WhosThatPokemonPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="mx-auto w-full max-w-3xl px-6 py-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Who&rsquo;s That Pokémon?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {HERO_TAGLINE}
        </p>
      </section>

      <WhosThatPokemonClient />

      {/* SEO: history */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground">
          The history of Who&rsquo;s That Pokémon
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {HISTORY_TEXT}
        </p>
      </section>

      {/* SEO: how to play */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">How to play</h2>
        <ul className="mt-4 list-disc gap-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {HOW_TO_PLAY_STEPS.map((step) => (
            <li key={step} className="mt-1">
              {step}
            </li>
          ))}
        </ul>
      </section>

      {/* SEO: difficulty tiers */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Three difficulty tiers, from mascots to mysteries
        </h2>
        <div className="mt-4 divide-y divide-zinc-100">
          {DIFFICULTY_TIERS.map((tier) => (
            <div key={tier.title} className="py-4">
              <h3 className="font-semibold text-foreground">{tier.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {tier.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO: identification tips */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          How to identify any Pokémon by silhouette
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {IDENTIFICATION_TIPS.map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-800"
            >
              <h3 className="font-semibold text-foreground">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO: why play */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Why guessing games are good practice
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {WHY_PLAY_TEXT}
        </p>
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
            href="/games/pokemon-fusion"
            className="transition-colors hover:text-brand"
          >
            Pokemon Fusion
          </Link>
          <Link
            href="/pokemon-team-builder"
            className="transition-colors hover:text-brand"
          >
            Team Builder
          </Link>
        </div>
      </footer>
    </main>
  );
}
