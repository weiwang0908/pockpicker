"use client";

import { useState } from "react";
import Filters, {
  defaultFilter,
  type FilterOptions,
} from "@/app/components/Filters";
import { PokemonCardList } from "@/app/components/PokemonCardList";
import type { Pokemon } from "@/app/lib/type-data";
import { pickStarterAction } from "@/app/lib/actions";

/** Starter mode: starter locked on, count locked to 1. */
const STARTER_DEFAULT: FilterOptions = {
  ...defaultFilter,
  starter: true,
  count: 1,
};

export default function StarterPickerClient() {
  const [filter, setFilter] = useState<FilterOptions>(STARTER_DEFAULT);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleFilterChange = (newFilter: FilterOptions) => {
    // starter stays on, count stays 1 regardless of user input.
    setFilter({ ...newFilter, starter: true, count: 1 });
  };

  const handlePick = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await pickStarterAction(filter);
      setPokemons(result);
      setHasGenerated(true);
    } catch {
      setError(
        "Something went wrong while picking your starter. Please try again.",
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
          Pokemon Starter Picker — PokePicker
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-500 dark:text-zinc-400">
          Pick a random starter Pokémon from any generation in one click.
          Perfect for challenge runs, Nuzlockes, and starting a fresh playthrough
          with a surprise partner.
        </p>
        <button
          type="button"
          onClick={handlePick}
          disabled={loading}
          aria-busy={loading}
          className="mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Picking…" : "Pick a Starter"}
        </button>
      </section>

      {/* Result */}
      <section aria-live="polite" className="mt-12">
        {error ? (
          <p className="text-center text-sm text-red-600">{error}</p>
        ) : loading && pokemons.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">
            Picking your starter…
          </p>
        ) : pokemons.length > 0 ? (
          <div className="flex flex-col items-center gap-8">
            <PokemonCardList pokemons={pokemons} />
            <button
              type="button"
              onClick={handlePick}
              disabled={loading}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-zinc-200 bg-surface px-6 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
            >
              {loading ? "Picking…" : "Pick Another"}
            </button>
          </div>
        ) : hasGenerated ? (
          <p className="text-center text-sm text-zinc-500">
            No starter matches your filters. Try a different generation.
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
