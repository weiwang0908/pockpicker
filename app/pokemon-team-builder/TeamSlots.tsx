"use client";

import type { TeamPokemon } from "./TeamBuilderClient";
import type { PokemonType } from "@/lib/pokeapi/types";
import { TYPE_MAP } from "@/lib/pokeapi/data";

interface TeamSlotsProps {
  team: (TeamPokemon | null)[];
  onSlotClick: (index: number) => void;
  onRemove: (index: number) => void;
}

function TypeBadge({ type }: { type: PokemonType }) {
  const meta = TYPE_MAP[type];
  if (!meta) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
      style={{ backgroundColor: meta.color }}
    >
      {meta.emoji} {meta.displayNameEn}
    </span>
  );
}

export default function TeamSlots({
  team,
  onSlotClick,
  onRemove,
}: TeamSlotsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
      {team.map((pokemon, index) => (
        <div key={index} className="relative">
          {pokemon ? (
            // Filled slot
            <div
              className="group relative flex aspect-[3/4] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-zinc-200 bg-surface p-2 transition-all hover:border-brand"
              onClick={() => onSlotClick(index)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(index);
                }}
                className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs text-zinc-600 transition-colors hover:bg-red-400 hover:text-white"
                aria-label={`Remove ${pokemon.name}`}
              >
                ✕
              </button>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                loading="lazy"
                width={80}
                height={80}
              />
              <span className="mt-1 line-clamp-1 text-center text-xs font-semibold text-foreground">
                {pokemon.name}
              </span>
              <div className="mt-1 flex flex-wrap justify-center gap-0.5">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t} type={t} />
                ))}
              </div>
            </div>
          ) : (
            // Empty slot
            <button
              onClick={() => onSlotClick(index)}
              className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-surface/50 text-zinc-400 transition-colors hover:border-brand hover:text-brand"
              aria-label={`Add Pokemon to slot ${index + 1}`}
            >
              <span className="text-2xl">+</span>
              <span className="mt-1 text-xs">Slot {index + 1}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
