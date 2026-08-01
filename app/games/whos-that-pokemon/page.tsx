import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/SiteHeader";
import { WhosThatPokemonClient } from "./WhosThatPokemonClient";

export const metadata: Metadata = {
  title: "Who's That Pokémon? — Free Guessing Game | PokePicker",
  description:
    "Play the classic Who's That Pokémon guessing game for free. Identify Pokémon from their silhouettes and build your streak. No signup required.",
  alternates: { canonical: "/games/whos-that-pokemon" },
  openGraph: {
    title: "Who's That Pokémon? — Free Guessing Game | PokePicker",
    description:
      "Play the classic Who's That Pokémon guessing game for free. Identify Pokémon from their silhouettes and build your streak. No signup required.",
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
          Guess the Pokémon from its silhouette. Pick the right name from four
          options and build your streak!
        </p>
      </section>

      <WhosThatPokemonClient />

      {/* SEO content */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground">
          About Who&rsquo;s That Pokémon
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          &ldquo;Who&rsquo;s That Pokémon?&rdquo; is a beloved mini-game that
          originated from the Pokémon anime series. In each commercial break,
          viewers would see a silhouette of a Pokémon and try to guess its
          identity before the reveal. Our version brings this classic game to
          your browser with all 1025 Pokémon — from Bulbasaur to Pecharunt.
        </p>

        <h3 className="mt-8 text-lg font-bold text-foreground">How to play</h3>
        <ul className="mt-2 list-disc gap-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <li>Look at the black silhouette shown on screen</li>
          <li>Choose the correct Pokémon name from four options</li>
          <li>Correct answers increase your score and streak</li>
          <li>Use Skip if you&rsquo;re stuck — a new Pokémon will appear</li>
          <li>There&rsquo;s no time limit, so take your time and have fun!</li>
        </ul>

        <h3 className="mt-8 text-lg font-bold text-foreground">
          Why play guessing games?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Pokémon guessing games are a great way to test your knowledge of the
          Pokédex and learn about species you might not have encountered before.
          They&rsquo;re also perfect for sharing with friends — challenge
          someone to beat your streak and see who knows more Pokémon!
        </p>
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
