"use client";

import { useState } from "react";
import Filters, {
  defaultFilter,
  type FilterOptions,
} from "@/app/components/Filters";
import { PokemonCardList } from "@/app/components/PokemonCardList";
import type { Pokemon } from "@/app/lib/type-data";
import { generateTeamAction } from "@/app/lib/actions";

/** Team mode: count locked to 6. */
const TEAM_DEFAULT: FilterOptions = { ...defaultFilter, count: 6 };

export default function TeamGeneratorClient() {
  const [filter, setFilter] = useState<FilterOptions>(TEAM_DEFAULT);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleFilterChange = (newFilter: FilterOptions) => {
    // count is locked to 6 regardless of user input.
    setFilter({ ...newFilter, count: 6 });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateTeamAction(filter);
      setPokemons(result);
      setHasGenerated(true);
    } catch {
      setError(
        "Something went wrong while generating your team. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Random Pokemon Team Generator — PokePicker
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-500 dark:text-zinc-400">
          Build a random team of 6 Pokémon in one click. Filter by generation,
          type, or legendary status — perfect for Nuzlockes, draft leagues, and
          breaking out of team-building ruts.
        </p>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          aria-busy={loading}
          className="mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Generating…" : "Generate Team"}
        </button>
      </section>

      {/* Result */}
      <section aria-live="polite" className="mt-12">
        {error ? (
          <p className="text-center text-sm text-red-600">{error}</p>
        ) : loading && pokemons.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">
            Generating your team…
          </p>
        ) : pokemons.length > 0 ? (
          <div className="flex flex-col items-center gap-8">
            <PokemonCardList pokemons={pokemons} isTeamMode />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-zinc-200 bg-surface px-6 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
            >
              {loading ? "Generating…" : "Re-roll Team"}
            </button>
          </div>
        ) : hasGenerated ? (
          <p className="text-center text-sm text-zinc-500">
            No Pokémon match your filters. Try broadening them.
          </p>
        ) : null}
      </section>

      {/* Filters */}
      <section className="mt-16 w-full">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
          Filters
        </h2>
        <Filters filter={filter} onChange={handleFilterChange} />
      </section>
    </>
  );
}
