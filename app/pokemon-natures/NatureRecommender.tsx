"use client";

import { useMemo, useState } from "react";
import {
  recommendNatures,
  STAT_DISPLAY,
  isNeutral,
  type NatureRecommendation,
} from "@/lib/pokeapi/natures";
import { fetchPokemonStatsAction } from "@/app/lib/actions";

interface NatureRecommenderProps {
  /** Pre-loaded minimal list for search autocomplete */
  pokemonList: { id: number; name: string }[];
}

interface SelectedPokemon {
  id: number;
  name: string;
  sprite: string;
  stats: { name: string; baseStat: number }[];
}

export default function NatureRecommender({
  pokemonList,
}: NatureRecommenderProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SelectedPokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (q === "") return [];
    return pokemonList
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [pokemonList, search]);

  const handleSelect = async (name: string) => {
    setSearch(name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
    setShowSuggestions(false);
    setLoading(true);
    setError(null);
    try {
      const result = await Promise.race([
        fetchPokemonStatsAction(name),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 10000),
        ),
      ]);
      if (!result) {
        setError(`"${name}" not found. Try another name.`);
        setSelected(null);
      } else {
        setSelected(result);
      }
    } catch (err) {
      if ((err as Error).message === "timeout") {
        setError("Request timed out. Please check your connection and try again.");
      } else {
        setError("Failed to load Pokemon data. Please try again.");
      }
      setSelected(null);
    } finally {
      setLoading(false);
    }
  };

  const recommendations: NatureRecommendation[] = useMemo(() => {
    if (!selected) return [];
    return recommendNatures(selected.stats);
  }, [selected]);

  const hasList = pokemonList.length > 0;

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
            setError(null);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            // Delay hiding so clicks on suggestions register
            setTimeout(() => setShowSuggestions(false), 150);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              e.preventDefault();
              handleSelect(suggestions[0].name);
            }
          }}
          placeholder="Search a Pokemon (e.g. garchomp, pikachu)..."
          aria-label="Search a Pokemon for nature recommendation"
          className="h-12 w-full rounded-xl border border-zinc-200 bg-surface px-4 text-sm text-foreground placeholder:text-zinc-400 focus:border-brand focus:outline-none dark:border-zinc-700"
        />
        {showSuggestions && search.trim() !== "" && (
          <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-zinc-200 bg-surface shadow-lg dark:border-zinc-700">
            {suggestions.length > 0 ? (
              suggestions.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(p.name);
                    }}
                    className="flex h-11 w-full items-center px-4 text-left text-sm text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <span className="capitalize">{p.name.replace(/-/g, " ")}</span>
                  </button>
                </li>
              ))
            ) : hasList ? (
              <li className="px-4 py-3 text-sm text-zinc-500">
                No Pokemon found. Try a different name.
              </li>
            ) : (
              <li className="px-4 py-3 text-sm text-zinc-500">
                Pokemon list still loading. Please wait or refresh.
              </li>
            )}
          </ul>
        )}
      </div>

      {/* States */}
      {loading && (
        <p className="mt-4 text-sm text-zinc-500">Loading stats...</p>
      )}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {!loading && !error && !selected && (
        <p className="mt-4 text-sm text-zinc-500">
          Search for a Pokemon to get nature recommendations based on its base
          stats.
        </p>
      )}

      {/* Selected Pokemon + recommendations */}
      {selected && !loading && (
        <div className="mt-4">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-surface p-4 dark:border-zinc-800">
            {selected.sprite && (
              <img
                src={selected.sprite}
                alt={selected.name}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0"
                loading="lazy"
              />
            )}
            <div>
              <span className="font-semibold capitalize text-foreground">
                {selected.name}
              </span>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
                {selected.stats
                  .filter((s) => s.name !== "hp")
                  .map((s) => (
                    <span key={s.name}>
                      {statLabel(s.name)}: {s.baseStat}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Top 3 recommendations */}
          <h3 className="mt-6 text-sm font-semibold text-foreground">
            Recommended natures
          </h3>
          <div className="mt-3 flex flex-col gap-3">
            {recommendations.map((rec, i) => (
              <RecommendationCard key={rec.nature.id} rec={rec} rank={i + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({
  rec,
  rank,
}: {
  rec: NatureRecommendation;
  rank: number;
}) {
  const neutral = isNeutral(rec.nature);
  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-surface p-4 dark:border-zinc-800">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {rec.nature.displayName}
          </span>
          {neutral ? (
            <span className="text-xs text-zinc-500">Neutral</span>
          ) : (
            <span className="text-xs text-zinc-500">
              +{STAT_DISPLAY[rec.nature.increased]} / -{STAT_DISPLAY[rec.nature.decreased]}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          {rec.reason}
        </p>
      </div>
    </div>
  );
}

/** Map PokeAPI stat names to display labels */
function statLabel(name: string): string {
  const map: Record<string, string> = {
    hp: "HP",
    attack: "Atk",
    defense: "Def",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "Spe",
  };
  return map[name] ?? name;
}
