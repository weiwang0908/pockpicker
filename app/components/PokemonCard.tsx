"use client";

import { useCallback, useState } from "react";
import {
  formatHeight,
  formatPokedexNumber,
  formatWeight,
  generationToRoman,
  getTypeMeta,
  Pokemon,
} from "@/app/lib/type-data";
import { ShareButton } from "./ShareButton";

export interface PokemonCardProps {
  pokemon: Pokemon;
  /** Position in the list, used to stagger the reveal animation (50ms per step). */
  index?: number;
  /** Whether this card is rendered as part of a 6-card team. */
  isTeamMode?: boolean;
}

const CARD_HEIGHT = 400; // px — image takes 60% (240px), info takes 40% (160px)
const IMAGE_HEIGHT = Math.round(CARD_HEIGHT * 0.6); // 240

export function PokemonCard({
  pokemon,
  index = 0,
  isTeamMode = false,
}: PokemonCardProps) {
  const [expanded, setExpanded] = useState(false);

  const primaryType = pokemon.types[0];
  const typeMeta = getTypeMeta(primaryType);
  const secondaryTypeMeta = pokemon.types[1]
    ? getTypeMeta(pokemon.types[1])
    : null;

  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  // The card is the click target for tap-to-expand (mobile).
  // Desktop hover is handled via CSS `group-hover:` on the expand panel.
  // Share button stops propagation so its click doesn't toggle the card.
  return (
    <div className="group mx-auto flex w-full max-w-[18rem] flex-col sm:w-72">
      <article
        className="animate-card-reveal flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        style={{
          borderColor: typeMeta.color,
          height: CARD_HEIGHT,
          animationDelay: `${index * 50}ms`,
        }}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label={`${pokemon.name} — ${typeMeta.displayName}. Tap to ${expanded ? "collapse" : "expand"} details.`}
        onClick={toggleExpand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpand();
          }
        }}
      >
        {/* Image — 60% of card height, centered */}
        <div
          className="flex shrink-0 items-center justify-center bg-zinc-50 p-4"
          style={{ height: IMAGE_HEIGHT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            width={475}
            height={475}
            className="h-full w-full object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Info — remaining 40% */}
        <div className="flex flex-1 flex-col px-4 py-3">
          {/* Type emoji + name */}
          <div className="flex items-center gap-1.5">
            <span className="text-lg leading-none" aria-hidden="true">
              {typeMeta.emoji}
            </span>
            <span className="truncate text-lg font-semibold text-zinc-900">
              {pokemon.name}
            </span>
          </div>

          {/* Type text (primary · secondary) */}
          <div className="mt-0.5 text-sm font-medium" style={{ color: typeMeta.color }}>
            <span>{typeMeta.displayName}</span>
            {secondaryTypeMeta ? (
              <>
                <span className="px-1 text-zinc-300">·</span>
                <span style={{ color: secondaryTypeMeta.color }}>
                  {secondaryTypeMeta.displayName}
                </span>
              </>
            ) : null}
          </div>

          {/* Pokédex # + Gen — pushed to the bottom */}
          <div className="mt-auto text-xs text-zinc-400">
            #{formatPokedexNumber(pokemon.id)} · Gen{" "}
            {generationToRoman(pokemon.generation)}
            {isTeamMode ? <span className="ml-1 text-zinc-300">· Team</span> : null}
          </div>

          {/* Share button — persistent, small, not visually prominent */}
          <div
            className="mt-2 flex justify-start"
            onClick={(e) => e.stopPropagation()}
          >
            <ShareButton pokemon={pokemon} />
          </div>
        </div>
      </article>

      {/* Expand panel — slides out BELOW the card without changing card size.
          Desktop: shown on group-hover. Mobile: shown when `expanded` is true.
          Uses CSS grid 0fr → 1fr trick to animate height: auto. */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 focus-within:grid-rows-[1fr] focus-within:opacity-100 ${
          expanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="mt-2 w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-zinc-400">
                  Height
                </div>
                <div className="font-medium text-zinc-800">
                  {formatHeight(pokemon.height)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-zinc-400">
                  Weight
                </div>
                <div className="font-medium text-zinc-800">
                  {formatWeight(pokemon.weight)}
                </div>
              </div>
            </div>

            {pokemon.abilities && pokemon.abilities.length > 0 ? (
              <div className="mt-2">
                <div className="text-[10px] uppercase tracking-wide text-zinc-400">
                  Abilities
                </div>
                <div className="font-medium capitalize text-zinc-800">
                  {pokemon.abilities.join(", ")}
                </div>
              </div>
            ) : null}

            {pokemon.weaknesses && pokemon.weaknesses.length > 0 ? (
              <div className="mt-2">
                <div className="text-[10px] uppercase tracking-wide text-zinc-400">
                  Weakness
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {pokemon.weaknesses.map((w) => {
                    const m = getTypeMeta(w);
                    return (
                      <span
                        key={w}
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                        style={{ backgroundColor: m.color }}
                      >
                        {m.emoji} {m.displayName}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
