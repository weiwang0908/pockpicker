"use client";

import { useState } from "react";
import {
  BATTLE_STATS,
  isNeutral,
  STAT_DISPLAY,
  type Nature,
} from "@/lib/pokeapi/natures";

interface NatureMatrixProps {
  natures: Nature[];
}

const FLAVOR_DISPLAY: Record<string, string> = {
  spicy: "Spicy",
  sour: "Sour",
  sweet: "Sweet",
  dry: "Dry",
  bitter: "Bitter",
};

export default function NatureMatrix({ natures }: NatureMatrixProps) {
  const [selected, setSelected] = useState<Nature | null>(null);

  // Build lookup: increased + decreased → nature
  const lookup = new Map<string, Nature>();
  for (const n of natures) {
    lookup.set(`${n.increased}|${n.decreased}`, n);
  }

  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
        Rows = stat increased, columns = stat decreased. Tap a cell for details.
      </p>

      {/* Scrollable matrix for mobile */}
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-surface"></th>
              {BATTLE_STATS.map((dec) => (
                <th
                  key={dec}
                  className="min-w-[64px] rounded-md bg-zinc-50 px-2 py-2 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  -{STAT_DISPLAY[dec]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BATTLE_STATS.map((inc) => (
              <tr key={inc}>
                <th
                  className="sticky left-0 z-10 min-w-[64px] rounded-md bg-zinc-50 px-2 py-3 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  +{STAT_DISPLAY[inc]}
                </th>
                {BATTLE_STATS.map((dec) => {
                  const nature = lookup.get(`${inc}|${dec}`);
                  if (!nature) return <td key={dec} />;
                  const neutral = isNeutral(nature);
                  const isSelected = selected?.id === nature.id;
                  return (
                    <td key={dec}>
                      <button
                        onClick={() => setSelected(nature)}
                        aria-label={`${nature.displayName}: increases ${STAT_DISPLAY[inc]}, decreases ${STAT_DISPLAY[dec]}`}
                        className={`flex h-11 min-w-[64px] items-center justify-center rounded-md px-2 py-3 text-[11px] font-medium transition-colors ${
                          isSelected
                            ? "bg-brand text-white"
                            : neutral
                              ? "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                              : "bg-surface text-foreground ring-1 ring-zinc-100 hover:ring-brand dark:ring-zinc-800"
                        }`}
                      >
                        {nature.displayName}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected nature detail */}
      {selected && (
        <div className="mt-4 rounded-xl border border-zinc-100 bg-surface p-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {selected.displayName}
            </span>
            {isNeutral(selected) && (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800">
                Neutral
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Increases <strong>{STAT_DISPLAY[selected.increased]}</strong> (+10%)
            {" — "}
            Decreases <strong>{STAT_DISPLAY[selected.decreased]}</strong> (-10%)
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Likes {FLAVOR_DISPLAY[selected.likesFlavor]} berries, hates{" "}
            {FLAVOR_DISPLAY[selected.hatesFlavor]} berries.
          </p>
        </div>
      )}
    </div>
  );
}
