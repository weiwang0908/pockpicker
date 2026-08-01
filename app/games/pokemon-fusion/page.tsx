import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/SiteHeader";
import { FusionClient } from "./FusionClient";

export const metadata: Metadata = {
  title: "Pokemon Fusion — Combine Two Pokémon Into One | PokePicker",
  description:
    "Fuse any two Pokémon together! Enter a head and body Pokémon to create a unique fusion with a combined name and types. Free, no signup required.",
  alternates: { canonical: "/games/pokemon-fusion" },
  openGraph: {
    title: "Pokemon Fusion — Combine Two Pokémon Into One | PokePicker",
    description:
      "Fuse any two Pokémon together! Enter a head and body Pokémon to create a unique fusion with a combined name and types. Free, no signup required.",
  },
};

export default function PokemonFusionPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="mx-auto w-full max-w-3xl px-6 py-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pokemon Fusion
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Combine two Pokémon to create a brand-new fusion! Pick a head and a
          body, then hit Fuse to see the result.
        </p>
      </section>

      <FusionClient />

      {/* SEO content */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground">
          What is Pokemon Fusion?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Pokemon Fusion is a fan-made concept that combines two different
          Pokémon into a single hybrid creature. The fusion takes the head of
          one Pokémon and the body of another, creating a brand-new design
          that&rsquo;s often hilarious, surprising, or unexpectedly cool. Our
          tool also generates a fused name by blending the two parent names and
          combines their types.
        </p>

        <h3 className="mt-8 text-lg font-bold text-foreground">How it works</h3>
        <ul className="mt-2 list-disc gap-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <li>Enter a head Pokémon name (e.g. Bulbasaur)</li>
          <li>Enter a body Pokémon name (e.g. Charmander)</li>
          <li>Click Fuse to see the combined result</li>
          <li>Or hit Random for two surprise Pokémon!</li>
          <li>The fused name is created by combining the first half of the
            head name with the second half of the body name</li>
        </ul>

        <h3 className="mt-8 text-lg font-bold text-foreground">
          Popular fusion ideas
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Try fusing Pikachu with Charizard for &ldquo;Charizardchu&rdquo;, or
          Mewtwo with Gengar for a spooky psychic-ghost hybrid. The
          possibilities are endless with all 1025 Pokémon available!
        </p>
      </section>

      <footer className="mt-auto border-t border-zinc-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-6 text-sm text-zinc-500">
          <span>&copy; 2026 PokePicker</span>
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <Link href="/games/whos-that-pokemon" className="transition-colors hover:text-brand">
            Who&rsquo;s That Pokémon
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
          <Link
            href="/pokemon-type-chart"
            className="transition-colors hover:text-brand"
          >
            Type Chart
          </Link>
        </div>
      </footer>
    </main>
  );
}
