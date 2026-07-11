"use client";

import { useMemo } from "react";
import type { TeamPokemon } from "./TeamBuilderClient";
import type { PokemonType } from "@/lib/pokeapi/types";
import { TYPE_MAP } from "@/lib/pokeapi/data";
import {
  ALL_TYPES,
  getTeamDefensiveMatrix,
  getTeamDefensiveSummary,
  getTeamOffensiveCoverage,
} from "@/lib/pokeapi/type-chart";

interface TypeAnalysisMatrixProps {
  team: TeamPokemon[];
}

function cellStyle(multiplier: number): string {
  if (multiplier === 0) return "bg-zinc-300 text-zinc-600";
  if (multiplier === 0.25) return "bg-blue-200 text-blue-800";
  if (multiplier === 0.5) return "bg-blue-100 text-blue-700";
  if (multiplier === 2) return "bg-red-100 text-red-700";
  if (multiplier === 4) return "bg-red-300 text-red-900";
  return "bg-zinc-50 text-zinc-400";
}

function formatMultiplier(m: number): string {
  if (m === 0) return "0";
  if (m === 0.25) return "¼";
  if (m === 0.5) return "½";
  if (m === 1) return "1";
  if (m === 2) return "2";
  if (m === 4) return "4";
  return String(m);
}

function TypeChip({
  type,
  variant,
}: {
  type: PokemonType;
  variant: "weak" | "resist" | "immune" | "covered" | "uncovered";
}) {
  const meta = TYPE_MAP[type];
  if (!meta) return null;

  const variantStyles: Record<typeof variant, string> = {
    weak: "bg-red-100 text-red-700",
    resist: "bg-blue-100 text-blue-700",
    immune: "bg-zinc-200 text-zinc-600",
    covered: "bg-green-100 text-green-700",
    uncovered: "bg-zinc-100 text-zinc-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${variantStyles[variant]}`}
    >
      <span>{meta.emoji}</span>
      {meta.displayNameEn}
    </span>
  );
}

export default function TypeAnalysisMatrix({
  team,
}: TypeAnalysisMatrixProps) {
  const matrix = useMemo(
    () => (team.length > 0 ? getTeamDefensiveMatrix(team) : []),
    [team],
  );
  const summary = useMemo(
    () => (team.length > 0 ? getTeamDefensiveSummary(team) : null),
    [team],
  );
  const coverage = useMemo(
    () => (team.length > 0 ? getTeamOffensiveCoverage(team) : null),
    [team],
  );

  if (team.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-surface/50 px-6 py-12 text-center">
        <p className="text-sm text-zinc-500">
          Add Pokemon to your team to see type analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Defensive Matrix */}
      <div>
        <h2 className="mb-3 text-lg font-bold text-foreground">
          Type Weakness &amp; Resistance
        </h2>
        <p className="mb-4 text-xs text-zinc-500">
          ← Scroll horizontally on mobile →
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-100">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="sticky left-0 z-10 min-w-[80px] bg-zinc-50 px-3 py-2 text-left text-xs font-semibold text-zinc-600">
                  Attack Type
                </th>
                {team.map((p, i) => (
                  <th
                    key={i}
                    className="min-w-[60px] px-2 py-2 text-center text-xs font-semibold text-zinc-600"
                  >
                    <img
                      src={p.sprite}
                      alt={p.name}
                      className="mx-auto h-8 w-8 object-contain"
                      loading="lazy"
                      width={32}
                      height={32}
                    />
                    <span className="mt-0.5 block truncate text-[10px]">
                      {p.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => {
                const meta = TYPE_MAP[row.attackType];
                return (
                  <tr
                    key={row.attackType}
                    className="border-b border-zinc-50 last:border-0"
                  >
                    <td
                      className="sticky left-0 z-10 min-w-[80px] bg-surface px-3 py-2 text-xs font-medium"
                      style={{ color: meta?.color }}
                    >
                      {meta?.emoji} {meta?.displayNameEn}
                    </td>
                    {row.cells.map((cell) => (
                      <td
                        key={cell.pokemonIndex}
                        className={`px-2 py-2 text-center text-xs font-semibold ${cellStyle(cell.multiplier)}`}
                      >
                        {formatMultiplier(cell.multiplier)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Defensive Summary */}
      {summary && (
        <div className="grid gap-4 sm:grid-cols-3">
          {summary.weakTo.length > 0 && (
            <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
              <h3 className="mb-2 text-sm font-bold text-red-700">
                ⚠️ Weak To
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {summary.weakTo.map((t) => (
                  <TypeChip key={t} type={t} variant="weak" />
                ))}
              </div>
            </div>
          )}
          {summary.resists.length > 0 && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <h3 className="mb-2 text-sm font-bold text-blue-700">
                🛡️ Resists
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {summary.resists.map((t) => (
                  <TypeChip key={t} type={t} variant="resist" />
                ))}
              </div>
            </div>
          )}
          {summary.immuneTo.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <h3 className="mb-2 text-sm font-bold text-zinc-600">
                🚫 Immune To
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {summary.immuneTo.map((t) => (
                  <TypeChip key={t} type={t} variant="immune" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Offensive Coverage */}
      {coverage && (
        <div>
          <h2 className="mb-3 text-lg font-bold text-foreground">
            STAB Coverage
          </h2>
          <p className="mb-3 text-xs text-zinc-500">
            Types your team can hit for super-effective (2x) damage with STAB
            attacks.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-green-100 bg-green-50/50 p-4">
              <h3 className="mb-2 text-sm font-bold text-green-700">
                ✓ Covered ({coverage.covered.length}/{ALL_TYPES.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {coverage.covered.length > 0 ? (
                  coverage.covered.map((t) => (
                    <TypeChip key={t} type={t} variant="covered" />
                  ))
                ) : (
                  <span className="text-xs text-zinc-400">
                    No types covered
                  </span>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <h3 className="mb-2 text-sm font-bold text-zinc-500">
                ✗ Uncovered ({coverage.uncovered.length}/{ALL_TYPES.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {coverage.uncovered.length > 0 ? (
                  coverage.uncovered.map((t) => (
                    <TypeChip key={t} type={t} variant="uncovered" />
                  ))
                ) : (
                  <span className="text-xs text-zinc-400">
                    All types covered!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
