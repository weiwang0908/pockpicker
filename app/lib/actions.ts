"use server";

/**
 * 工具页 Server Actions
 *
 * 这里做两件桥接工作（因为 UI 层与数据层类型不兼容）：
 * 1. 把 Filters.tsx 的 FilterOptions（null/boolean）转成 lib/pokeapi/types 的 FilterOptions（"all"/"on"/"off"）
 * 2. 把 getRandomPokemon 返回的完整 Pokemon 映射成 PokemonCardList 期望的简化 Pokemon（type-data.ts）
 *
 * 所有导出必须是 async（"use server" 文件约束）；内部辅助函数可为同步。
 */

import { getRandomPokemon, pickSprite } from "@/lib/pokeapi/client";
import type {
  FilterOptions as DataFilterOptions,
  Generation,
  Pokemon as FullPokemon,
  PokemonType,
} from "@/lib/pokeapi/types";
import type { FilterOptions as UIFilterOptions } from "@/app/components/Filters";
import type { Pokemon as CardPokemon } from "@/app/lib/type-data";

/** UI FilterOptions → data FilterOptions */
function uiToDataFilter(ui: UIFilterOptions): DataFilterOptions {
  return {
    generation: ui.generation === null ? "all" : (ui.generation as Generation),
    type: ui.type === null ? "all" : (ui.type.toLowerCase() as PokemonType),
    legendary: ui.legendary,
    shiny: ui.shiny ? "on" : "off",
    starter: ui.starter ? "on" : "off",
    count: ui.count,
  };
}

/** 完整 Pokemon → 简化卡片 Pokemon（PokemonCardList/PokemonCard 期望的结构） */
function toCardPokemon(p: FullPokemon, shiny: boolean): CardPokemon {
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

/**
 * Random Pokemon Team Generator：固定 count = 6。
 */
export async function generateTeamAction(
  uiFilter: UIFilterOptions,
): Promise<CardPokemon[]> {
  const dataFilter = uiToDataFilter({ ...uiFilter, count: 6 });
  const pokemons = await getRandomPokemon(dataFilter, 6);
  return pokemons.map((p) => toCardPokemon(p, uiFilter.shiny));
}

/**
 * Pokemon Starter Picker：固定 starter = true、count = 1。
 */
export async function pickStarterAction(
  uiFilter: UIFilterOptions,
): Promise<CardPokemon[]> {
  const dataFilter = uiToDataFilter({ ...uiFilter, starter: true, count: 1 });
  const pokemons = await getRandomPokemon(dataFilter, 1);
  return pokemons.map((p) => toCardPokemon(p, uiFilter.shiny));
}
