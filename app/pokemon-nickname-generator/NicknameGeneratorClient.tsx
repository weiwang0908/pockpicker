"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchPokemonForNicknameAction, type NicknamePokemon } from "@/app/lib/actions";
import { TYPE_MAP } from "@/lib/pokeapi/data";
import {
  CATEGORY_META,
  NICKNAME_CATEGORIES,
  generateNicknames,
  groupByCategory,
  type NicknameSuggestion,
} from "@/lib/pokeapi/nicknames";
import { HERO_TAGLINE } from "./seo-content";

interface NicknameGeneratorClientProps {
  /** Pre-loaded minimal list for search autocomplete */
  pokemonList: { id: number; name: string }[];
}

interface SelectedPokemon extends NicknamePokemon {
  displayName: string;
}

export default function NicknameGeneratorClient({
  pokemonList,
}: NicknameGeneratorClientProps) {
  const [search, setSearch] = useState("Pikachu");
  const [selected, setSelected] = useState<SelectedPokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<NicknameSuggestion[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [seed, setSeed] = useState(0); // bump to re-roll

  const autocomplete = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (q === "") return [];
    return pokemonList
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [pokemonList, search]);

  const handleSelect = async (name: string) => {
    const displayName = name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setSearch(displayName);
    setShowSuggestions(false);
    setLoading(true);
    setError(null);
    setSelected(null);
    setSuggestions([]);
    try {
      const result = await Promise.race([
        fetchPokemonForNicknameAction(name),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 10000),
        ),
      ]);
      if (!result) {
        setError(`"${displayName}" not found. Try another name.`);
      } else {
        const sel: SelectedPokemon = {
          ...result,
          displayName: result.name,
        };
        setSelected(sel);
        // Auto-generate first batch
        setSuggestions(
          generateNicknames(
            { name: result.name, displayName: result.name, types: result.types },
            7,
          ),
        );
        setSeed((s) => s + 1);
      }
    } catch (err) {
      if ((err as Error).message === "timeout") {
        setError("Request timed out. Please check your connection and try again.");
      } else {
        setError("Failed to load Pokemon data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generate button next to the search input.
   * Prefers the first autocomplete match (normalized name),
   * falls back to the raw search string (lowercased, hyphenated).
   */
  const handleGenerate = () => {
    const normalized = search.toLowerCase().trim();
    if (normalized === "") return;
    const name = autocomplete[0]?.name ?? normalized.replace(/\s+/g, "-");
    handleSelect(name);
  };

  // Auto-generate first batch with Pikachu on mount
  useEffect(() => {
    handleSelect("pikachu");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegenerate = () => {
    if (!selected) return;
    setSuggestions(
      generateNicknames(
        { name: selected.name, displayName: selected.displayName, types: selected.types },
        7,
      ),
    );
    setSeed((s) => s + 1);
    setCopiedName(null);
  };

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 1500);
    } catch {
      // Clipboard API may be blocked; silently fail
    }
  };

  const grouped = useMemo(() => groupByCategory(suggestions), [suggestions]);
  const hasList = pokemonList.length > 0;
  const totalSuggestions = suggestions.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Pokemon Nickname Generator
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
          {HERO_TAGLINE}
        </p>
      </section>

      {/* Search */}
      <section className="mt-8">
        <div className="relative">
          <div className="flex gap-2">
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
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              placeholder="Search a Pokemon (e.g. garchomp, pikachu, charizard)..."
              aria-label="Search a Pokemon for nickname suggestions"
              className="h-12 min-w-0 flex-1 rounded-xl border border-zinc-200 bg-surface px-4 text-sm text-foreground placeholder:text-zinc-400 focus:border-brand focus:outline-none dark:border-zinc-700"
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || search.trim() === ""}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "..." : "⚡ Generate"}
            </button>
          </div>
          {showSuggestions && search.trim() !== "" && (
            <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-zinc-200 bg-surface shadow-lg dark:border-zinc-700">
              {autocomplete.length > 0 ? (
                autocomplete.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelect(p.name);
                      }}
                      className="flex h-11 w-full items-center px-4 text-left text-sm text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <span className="capitalize">
                        {p.name.replace(/-/g, " ")}
                      </span>
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

        {/* Status */}
        {loading && (
          <p className="mt-4 text-sm text-zinc-500">Loading Pokemon data...</p>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {!loading && !error && !selected && (
          <p className="mt-4 text-sm text-zinc-500">
            Search for a Pokemon to get 55+ type-themed nickname suggestions.
          </p>
        )}
      </section>

      {/* Selected Pokemon + Generate button */}
      {selected && !loading && (
        <section className="mt-6">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-100 bg-surface p-4 dark:border-zinc-800">
            {selected.sprite && (
              <img
                src={selected.sprite}
                alt={selected.displayName}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0"
                loading="lazy"
              />
            )}
            <div className="min-w-0 flex-1">
              <span className="font-semibold capitalize text-foreground">
                {selected.displayName}
              </span>
              {selected.genus && (
                <p className="mt-0.5 text-xs text-zinc-500">{selected.genus}</p>
              )}
              <div className="mt-1 flex flex-wrap gap-1.5">
                {selected.types.map((t) => {
                  const meta = TYPE_MAP[t];
                  if (!meta) return null;
                  return (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: meta.color }}
                    >
                      <span>{meta.emoji}</span>
                      {meta.displayNameEn}
                    </span>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              onClick={handleRegenerate}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              🔄 Re-roll
            </button>
          </div>

          {/* Total count badge */}
          {totalSuggestions > 0 && (
            <p className="mt-3 text-center text-xs text-zinc-500">
              {totalSuggestions} nickname suggestions across {NICKNAME_CATEGORIES.length}{" "}
              categories
              {seed > 1 ? ` · batch ${seed}` : ""}
            </p>
          )}
        </section>
      )}

      {/* Results grouped by category */}
      {totalSuggestions > 0 && (
        <section className="mt-8 space-y-6">
          {NICKNAME_CATEGORIES.map((category) => {
            const items = grouped[category];
            if (items.length === 0) return null;
            const meta = CATEGORY_META[category];
            return (
              <div
                key={category}
                className="rounded-xl border border-zinc-100 bg-surface p-4 dark:border-zinc-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">
                    {meta.emoji}
                  </span>
                  <h2 className="text-base font-bold text-foreground">
                    {meta.label}
                  </h2>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{meta.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((s, i) => {
                    const isCopied = copiedName === s.name;
                    return (
                      <button
                        key={`${s.name}-${i}`}
                        type="button"
                        onClick={() => handleCopy(s.name)}
                        className="group inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-foreground transition-colors hover:border-brand hover:bg-brand/5 dark:border-zinc-700 dark:bg-zinc-900"
                        aria-label={`Copy nickname ${s.name}`}
                      >
                        <span>{s.name}</span>
                        <span
                          className="text-xs text-zinc-400 transition-colors group-hover:text-brand"
                          aria-hidden="true"
                        >
                          {isCopied ? "✓" : "📋"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {copiedName && (
            <p className="text-center text-xs text-zinc-500">
              Copied <span className="font-semibold">{copiedName}</span> to clipboard
            </p>
          )}
        </section>
      )}
    </div>
  );
}
