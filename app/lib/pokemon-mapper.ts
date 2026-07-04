/**
 * Pokemon 转换工具：PokeAPI 完整 Pokemon → 简化卡片 Pokemon
 *
 * 从 actions.ts 抽出，供 Server Component（page.tsx）和 Server Action（actions.ts）共用。
 * 注意：不能放在 "use server" 文件里导出（"use server" 要求所有导出为 async）。
 */

import { pickSprite } from "@/lib/pokeapi/client";
import type { Pokemon as FullPokemon } from "@/lib/pokeapi/types";
import type { Pokemon as CardPokemon } from "@/app/lib/type-data";

/** UI FilterOptions → 简化卡片 Pokemon（PokemonCardList/PokemonCard 期望的结构） */
export function toCardPokemon(p: FullPokemon, shiny: boolean): CardPokemon {
  return {
    id: p.id,
    name: p.species.displayNameEn || p.name,
    types: p.types,
    sprite: pickSprite(p.sprites, shiny) ?? "",
    generation: p.generation,
    height: p.height,
    weight: p.weight,
    abilities: p.abilities.map((a) => a.name),
  };
}
