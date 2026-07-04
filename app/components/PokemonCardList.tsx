"use client";

import { useEffect, useRef } from "react";
import { Pokemon } from "@/app/lib/type-data";
import { PokemonCard } from "./PokemonCard";

export interface PokemonCardListProps {
  pokemons: Pokemon[];
  /** When true, cards render as a 6-card team with staggered reveal + auto-scroll. */
  isTeamMode?: boolean;
}

export function PokemonCardList({
  pokemons,
  isTeamMode = false,
}: PokemonCardListProps) {
  const firstCardRef = useRef<HTMLDivElement>(null);

  // Team mode: after the staggered reveal finishes, smoothly scroll the
  // first card into view (per spec: "最后自动滚动到第一张").
  // Total animation time = (last index * 50ms stagger) + 400ms reveal.
  useEffect(() => {
    if (!isTeamMode || pokemons.length === 0) return;
    const lastDelay = (pokemons.length - 1) * 50;
    const total = lastDelay + 400 + 80; // small buffer for paint
    const timer = window.setTimeout(() => {
      firstCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, total);
    return () => window.clearTimeout(timer);
  }, [isTeamMode, pokemons.length]);

  if (pokemons.length === 0) return null;

  return (
    <div
      className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6"
      role="list"
      aria-label={isTeamMode ? "Your Pokémon team" : "Your Pokémon"}
    >
      {pokemons.map((pokemon, idx) => (
        <div
          key={`${pokemon.id}-${idx}`}
          ref={idx === 0 ? firstCardRef : undefined}
          role="listitem"
          className="w-full justify-self-center"
        >
          <PokemonCard pokemon={pokemon} index={idx} isTeamMode={isTeamMode} />
        </div>
      ))}
    </div>
  );
}
