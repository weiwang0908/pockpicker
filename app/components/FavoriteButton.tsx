"use client";

import { useFavorites } from "@/app/lib/use-favorites";
import type { Pokemon } from "@/app/lib/type-data";

export function FavoriteButton({ pokemon }: { pokemon: Pokemon }) {
  const { hydrated, isFavorite, toggleFavorite } = useFavorites();
  const active = hydrated && isFavorite(pokemon.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(pokemon);
      }}
      aria-label={active ? `Remove ${pokemon.name} from favorites` : `Add ${pokemon.name} to favorites`}
      aria-pressed={active}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-lg transition-colors hover:bg-zinc-100"
    >
      <span className={active ? "text-red-500" : "text-zinc-300"}>{active ? "\u2665" : "\u2661"}</span>
    </button>
  );
}
