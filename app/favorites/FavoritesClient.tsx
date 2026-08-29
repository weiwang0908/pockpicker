"use client";

import Link from "next/link";
import { useFavorites } from "@/app/lib/use-favorites";
import { PokemonCardList } from "@/app/components/PokemonCardList";

export function FavoritesClient() {
  const { favorites, hydrated, clearFavorites } = useFavorites();

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Your Favorite Pokémon
            </h1>
            <p className="mt-2 text-sm text-muted">
              {hydrated
                ? `${favorites.length} saved · stored locally on your device`
                : "Your saved Pokémon will appear here — no account needed."}
            </p>
          </div>
          {hydrated && favorites.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Remove all favorites?")) clearFavorites();
              }}
              className="inline-flex h-9 items-center rounded-full border border-zinc-200 px-4 text-sm font-medium text-muted transition-colors hover:border-red-400 hover:text-red-500"
            >
              Clear all
            </button>
          )}
        </div>
      </section>

      {/* 默认渲染空状态：首访/无 JS 用户看到引导而非 Loading；有收藏后水合替换 */}
      {hydrated && favorites.length > 0 ? (
        <section className="mx-auto w-full max-w-5xl px-6 pb-20">
          <PokemonCardList pokemons={favorites} />
        </section>
      ) : (
        <section className="mx-auto w-full max-w-3xl px-6 pb-20 text-center">
          <p className="text-lg text-muted">
            You haven&rsquo;t saved any Pokémon yet.
          </p>
          <p className="mt-2 text-sm text-muted">
            Use the heart button on any Pokémon card to save it here.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-brand px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Pick Random Pokémon
          </Link>
        </section>
      )}
    </>
  );
}
