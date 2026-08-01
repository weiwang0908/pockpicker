"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { fetchPokemonStatsAction } from "@/app/lib/actions";
import {
  NATURE_INFOS,
  STAT_DISPLAY,
  getNatureMultiplier,
  type BattleStat,
} from "@/lib/pokeapi/natures";
import { trackEvent } from "@/app/lib/analytics";

interface StatRow {
  name: string;
  baseStat: number;
}

const STAT_ORDER = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

function calcStat(
  base: number,
  iv: number,
  ev: number,
  level: number,
  statName: string,
  nature: string,
): number {
  if (statName === "hp") {
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
  }
  const natureMod = getNatureMultiplier(
    nature,
    statName as BattleStat,
  );
  return (
    Math.floor(
      (Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5) *
        natureMod,
    )
  );
}

export function IVCalculatorClient() {
  const [pokemonName, setPokemonName] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState<{
    name: string;
    sprite: string;
    stats: StatRow[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [level, setLevel] = useState(50);
  const [nature, setNature] = useState("Hardy");
  const [ivs, setIvs] = useState<Record<string, number>>({
    hp: 31,
    attack: 31,
    defense: 31,
    "special-attack": 31,
    "special-defense": 31,
    speed: 31,
  });
  const [evs, setEvs] = useState<Record<string, number>>({
    hp: 0,
    attack: 0,
    defense: 0,
    "special-attack": 0,
    "special-defense": 0,
    speed: 0,
  });

  const handleFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonStatsAction(pokemonName.toLowerCase().trim());
      if (!data) {
        setError(`Pokémon "${pokemonName}" not found.`);
        setPokemonData(null);
        return;
      }
      setPokemonData(data);
      trackEvent("iv_calculator_fetch", { pokemon: data.name });
    } catch {
      setError("Failed to fetch Pokémon data.");
    } finally {
      setLoading(false);
    }
  }, [pokemonName]);

  return (
    <div className="flex flex-col gap-8">
      {/* Pokemon selector */}
      <section className="mx-auto w-full max-w-3xl px-6">
        <div className="rounded-2xl border border-zinc-100 bg-surface p-5 shadow-sm sm:p-6">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
            Pokémon name
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetch()}
              placeholder="e.g. pikachu, charizard, mewtwo"
              className="h-11 flex-1 rounded-lg border border-zinc-200 px-4 text-sm text-foreground focus:border-brand focus:outline-none"
            />
            <button
              type="button"
              onClick={handleFetch}
              disabled={loading}
              className="inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Loading…" : "Load"}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
      </section>

      {pokemonData && (
        <>
          {/* Pokemon info + controls */}
          <section className="mx-auto w-full max-w-3xl px-6">
            <div className="flex flex-col gap-6 rounded-2xl border border-zinc-100 bg-surface p-5 shadow-sm sm:flex-row sm:p-6">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pokemonData.sprite}
                  alt={pokemonData.name}
                  width={96}
                  height={96}
                  className="h-20 w-20 object-contain"
                />
                <div>
                  <h2 className="text-xl font-bold capitalize text-foreground">
                    {pokemonData.name}
                  </h2>
                  <p className="text-sm text-muted">
                    Base stats loaded
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-wrap gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
                    Level
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={level}
                    onChange={(e) =>
                      setLevel(Math.max(1, Math.min(100, Number(e.target.value) || 1)))
                    }
                    className="mt-1 h-11 w-20 rounded-lg border border-zinc-200 px-3 text-sm focus:border-brand focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
                    Nature
                  </label>
                  <select
                    value={nature}
                    onChange={(e) => setNature(e.target.value)}
                    className="mt-1 h-11 w-full min-w-[10rem] rounded-lg border border-zinc-200 px-3 text-sm focus:border-brand focus:outline-none"
                  >
                    {NATURE_INFOS.map((n) => (
                      <option key={n.name} value={n.name}>
                        {n.name}
                        {n.increased ? ` (+${STAT_DISPLAY[n.increased]})` : ""}
                        {n.decreased ? ` (-${STAT_DISPLAY[n.decreased]})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Stats table */}
          <section className="mx-auto w-full max-w-3xl px-6">
            <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-surface shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50 text-xs uppercase tracking-wide text-muted">
                    <th className="px-4 py-3 text-left">Stat</th>
                    <th className="px-4 py-3 text-center">Base</th>
                    <th className="px-4 py-3 text-center">IV (0-31)</th>
                    <th className="px-4 py-3 text-center">EV (0-252)</th>
                    <th className="px-4 py-3 text-center">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {STAT_ORDER.map((statKey) => {
                    const base =
                      pokemonData.stats.find((s) => s.name === statKey)?.baseStat ?? 0;
                    const iv = ivs[statKey] ?? 0;
                    const ev = evs[statKey] ?? 0;
                    const result = calcStat(base, iv, ev, level, statKey, nature);
                    return (
                      <tr key={statKey} className="border-b border-zinc-50 last:border-0">
                        <td className="px-4 py-3 font-medium text-foreground">
                          {STAT_DISPLAY[statKey]}
                        </td>
                        <td className="px-4 py-3 text-center text-muted">{base}</td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            min={0}
                            max={31}
                            value={iv}
                            onChange={(e) =>
                              setIvs((prev) => ({
                                ...prev,
                                [statKey]: Math.max(0, Math.min(31, Number(e.target.value) || 0)),
                              }))
                            }
                            className="h-9 w-16 rounded border border-zinc-200 px-2 text-center text-sm focus:border-brand focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            min={0}
                            max={252}
                            value={ev}
                            onChange={(e) =>
                              setEvs((prev) => ({
                                ...prev,
                                [statKey]: Math.max(0, Math.min(252, Number(e.target.value) || 0)),
                              }))
                            }
                            className="h-9 w-16 rounded border border-zinc-200 px-2 text-center text-sm focus:border-brand focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-3 text-center text-lg font-bold text-brand">
                          {result}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              Total EVs:{" "}
              {Object.values(evs).reduce((a, b) => a + b, 0)} / 510 · Formula
              follows Gen 3+ mechanics.
            </p>
          </section>
        </>
      )}

      {/* SEO cross-links */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-8">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Pick the right nature for your build on our{" "}
          <Link href="/pokemon-natures" className="text-brand underline">
            Pokemon natures chart
          </Link>
          , check type coverage with the{" "}
          <Link href="/pokemon-type-chart" className="text-brand underline">
            type chart
          </Link>
          , or build a full team with the{" "}
          <Link href="/pokemon-team-builder" className="text-brand underline">
            team builder
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
