'use client';

import { useMemo, useState } from 'react';
import { TYPE_DATA, type PokemonType } from '@/app/lib/type-data';
import {
  TYPE_CHART,
  getEffectiveness,
} from '@/lib/pokeapi/type-chart';

const TYPE_LIST = Object.keys(TYPE_DATA) as PokemonType[];

export default function TypeChartClient() {
  const [attackType, setAttackType] = useState<PokemonType>('fire');
  const [defenderTypes, setDefenderTypes] = useState<PokemonType[]>(['water']);

  const result = useMemo(() => {
    return getEffectiveness(attackType, defenderTypes);
  }, [attackType, defenderTypes]);

  const toggleDefenderType = (type: PokemonType) => {
    setDefenderTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }
      if (prev.length >= 2) {
        return [prev[1], type];
      }
      return [...prev, type];
    });
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-10 text-center sm:py-14">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Pokemon Type Chart
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Complete type effectiveness chart for all 18 Pokemon types. Check
          attack matchups, defensive weaknesses, and dual-type calculations
          instantly.
        </p>
      </section>

      {/* Interactive matchup checker */}
      <section className="mx-auto w-full max-w-3xl px-6">
        <div className="rounded-2xl border border-zinc-100 bg-surface p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-foreground">
            Type Matchup Checker
          </h2>
          <p className="mt-1 text-xs text-muted">
            Pick an attacking type and up to two defending types to see the
            damage multiplier.
          </p>

          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {/* Attacker */}
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Attacking type
              </div>
              <div className="flex flex-wrap gap-2">
                {TYPE_LIST.map((type) => {
                  const meta = TYPE_DATA[type];
                  const selected = attackType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAttackType(type)}
                      aria-pressed={selected}
                      className={typeChipClass(selected)}
                      style={selected ? { backgroundColor: meta.color } : {}}
                    >
                      <span aria-hidden="true">{meta.emoji}</span>
                      <span className="capitalize">{meta.displayName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Defender */}
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Defending type(s)
              </div>
              <div className="flex flex-wrap gap-2">
                {TYPE_LIST.map((type) => {
                  const meta = TYPE_DATA[type];
                  const selected = defenderTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleDefenderType(type)}
                      aria-pressed={selected}
                      className={typeChipClass(selected)}
                      style={selected ? { backgroundColor: meta.color } : {}}
                    >
                      <span aria-hidden="true">{meta.emoji}</span>
                      <span className="capitalize">{meta.displayName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="mt-6 flex flex-col items-center rounded-xl border border-zinc-100 bg-zinc-50/60 px-6 py-5 text-center dark:bg-zinc-900/40">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
              <TypeBadge type={attackType} />
              <span>vs</span>
              {defenderTypes.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
            <div
              className="mt-3 text-4xl font-extrabold"
              style={{ color: multiplierColor(result) }}
            >
              {formatMultiplier(result)}
            </div>
            <p className="mt-1 text-xs text-muted">{multiplierText(result)}</p>
          </div>
        </div>
      </section>

      {/* Full type chart matrix */}
      <section className="mx-auto w-full max-w-5xl px-6">
        <h2 className="text-xl font-bold text-foreground">
          Full Type Effectiveness Chart
        </h2>
        <p className="mt-1 text-xs text-muted">
          Attacking types are rows; defending types are columns. 2x = super
          effective, 0.5x = resisted, 0x = immune, blank = neutral.
        </p>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-100 bg-surface shadow-sm">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 min-w-[4.5rem] border-b border-r border-zinc-100 bg-surface p-2 text-left font-semibold text-foreground">
                  Attack
                </th>
                {TYPE_LIST.map((type) => (
                  <th
                    key={type}
                    className="min-w-[2.75rem] border-b border-zinc-100 p-2 text-center font-semibold"
                  >
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs"
                      style={{
                        backgroundColor: TYPE_DATA[type].color,
                        color: textColorForBg(TYPE_DATA[type].color),
                      }}
                      title={TYPE_DATA[type].displayName}
                    >
                      {TYPE_DATA[type].emoji}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TYPE_LIST.map((attack) => (
                <tr key={attack}>
                  <th className="sticky left-0 z-10 border-r border-zinc-100 bg-surface p-2 text-left font-medium text-foreground">
                    <span className="flex items-center gap-1.5">
                      <span aria-hidden="true">{TYPE_DATA[attack].emoji}</span>
                      <span className="capitalize">{attack}</span>
                    </span>
                  </th>
                  {TYPE_LIST.map((defense) => {
                    const multiplier = TYPE_CHART[attack]?.[defense] ?? 1;
                    return (
                      <td
                        key={defense}
                        className="border-b border-zinc-50 p-1.5 text-center sm:p-2"
                      >
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full font-semibold sm:h-8 sm:w-8"
                          style={{
                            backgroundColor:
                              multiplier === 1
                                ? 'transparent'
                                : cellBgColor(multiplier),
                            color: cellTextColor(multiplier),
                          }}
                        >
                          {multiplier === 1 ? '' : formatMultiplier(multiplier)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function TypeBadge({ type }: { type: PokemonType }) {
  const meta = TYPE_DATA[type];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
      style={{ backgroundColor: meta.color }}
    >
      <span aria-hidden="true">{meta.emoji}</span>
      <span className="capitalize">{meta.displayName}</span>
    </span>
  );
}

function typeChipClass(selected: boolean) {
  return (
    'inline-flex min-h-[36px] items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-medium transition-colors ' +
    (selected
      ? 'border-transparent text-white'
      : 'border-zinc-200 bg-surface text-foreground hover:border-brand hover:text-brand')
  );
}

function formatMultiplier(value: number) {
  if (value === 0) return '0x';
  if (value === 0.25) return '¼x';
  if (value === 0.5) return '½x';
  if (value === 1) return '1x';
  if (value === 2) return '2x';
  if (value === 4) return '4x';
  return `${value}x`;
}

function multiplierText(value: number) {
  if (value === 0) return 'No effect — immune to this type.';
  if (value < 1) return 'Not very effective — reduced damage.';
  if (value === 1) return 'Neutral damage.';
  return 'Super effective — increased damage.';
}

function multiplierColor(value: number) {
  if (value === 0) return '#6b7280';
  if (value < 1) return '#f59e0b';
  if (value === 1) return '#22c55e';
  return '#ef4444';
}

function cellBgColor(value: number) {
  if (value === 0) return '#e5e7eb';
  if (value < 1) return '#fef3c7';
  return '#fee2e2';
}

function cellTextColor(value: number) {
  if (value === 0) return '#374151';
  if (value < 1) return '#92400e';
  return '#991b1b';
}

function textColorForBg(hex: string) {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155 ? '#171717' : '#ffffff';
}
