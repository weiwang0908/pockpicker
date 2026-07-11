"use client";

import { useMemo, useState } from "react";
import {
  isNeutral,
  STAT_DISPLAY,
  type BattleStat,
  type Nature,
} from "@/lib/pokeapi/natures";

interface NatureFinderProps {
  natures: Nature[];
}

type StatFilter = BattleStat | "all";

const FILTER_CHIPS: { value: StatFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "attack", label: "+Attack" },
  { value: "defense", label: "+Defense" },
  { value: "sp-atk", label: "+Sp. Atk" },
  { value: "sp-def", label: "+Sp. Def" },
  { value: "speed", label: "+Speed" },
];

export default function NatureFinder({ natures }: NatureFinderProps) {
  const [query, setQuery] = useState("");
  const [statFilter, setStatFilter] = useState<StatFilter>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return natures.filter((n) => {
      const matchesQuery = q === "" || n.displayName.toLowerCase().includes(q);
      const matchesStat =
        statFilter === "all" || n.increased === statFilter;
      return matchesQuery && matchesStat;
    });
  }, [natures, query, statFilter]);

  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
        Each nature raises one stat by 10% (green ↑) and lowers another by 10% (red ↓).{" "}
        <strong>Neutral</strong> natures have no effect — the bonus and penalty cancel out.
      </p>

      {/* Search + filter */}
      <div className="flex flex-col gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search natures (e.g. adamant, jolly)..."
          aria-label="Search natures"
          className="h-12 w-full rounded-xl border border-zinc-200 bg-surface px-4 text-sm text-foreground placeholder:text-zinc-400 focus:border-brand focus:outline-none dark:border-zinc-700"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setStatFilter(chip.value)}
              className={`inline-flex h-9 shrink-0 items-center rounded-full px-4 text-xs font-medium transition-colors ${
                statFilter === chip.value
                  ? "bg-brand text-white"
                  : "border border-zinc-200 bg-surface text-zinc-600 hover:border-brand hover:text-brand dark:border-zinc-700 dark:text-zinc-300"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-zinc-500">
          No natures match your search.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((nature) => (
            <NatureCard key={nature.id} nature={nature} />
          ))}
        </div>
      )}
    </div>
  );
}

function NatureCard({ nature }: { nature: Nature }) {
  const neutral = isNeutral(nature);
  const incLabel = STAT_DISPLAY[nature.increased];
  const decLabel = STAT_DISPLAY[nature.decreased];

  return (
    <div className="rounded-xl border border-zinc-100 bg-surface p-4 transition-shadow hover:shadow-md dark:border-zinc-800">
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-foreground">{nature.displayName}</span>
        {neutral && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800">
            Neutral
          </span>
        )}
      </div>
      {neutral ? (
        <p className="mt-2 text-xs text-zinc-500">
          No effect — the +10% and -10% to {incLabel} cancel out.
        </p>
      ) : (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            ↑ {incLabel} +10%
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
            ↓ {decLabel} -10%
          </span>
        </div>
      )}
    </div>
  );
}
