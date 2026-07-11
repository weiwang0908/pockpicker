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

import { fetchPokemonByName, getRandomPokemon, pickSprite } from "@/lib/pokeapi/client";
import { toCardPokemon } from "@/app/lib/pokemon-mapper";
import type {
  FilterOptions as DataFilterOptions,
  Generation,
  PokemonType,
} from "@/lib/pokeapi/types";
import type { FilterOptions as UIFilterOptions } from "@/app/components/Filters";
import type { Pokemon as CardPokemon } from "@/app/lib/type-data";

/** 简化卡片 Pokemon（team builder 用，只含选择面板需要的字段） */
export interface TeamBuilderPokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprite: string;
  generation: number;
  abilities: string[];
}

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

/**
 * 首页 Random Pokemon Picker：使用 filter.count（1 / 3 / 6）。
 * 首屏结果由 page.tsx 服务端预生成，此 Action 用于 reroll / filter change。
 */
export async function generateRandomAction(
  uiFilter: UIFilterOptions,
): Promise<CardPokemon[]> {
  const dataFilter = uiToDataFilter(uiFilter);
  const pokemons = await getRandomPokemon(dataFilter, uiFilter.count);
  return pokemons.map((p) => toCardPokemon(p, uiFilter.shiny));
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

/* -------------------------------------------------------------------------- */
/* Pokemon Team Builder Actions                                                */
/* -------------------------------------------------------------------------- */

/**
 * 按名称查询 Pokemon（team builder 选择面板 + URL hash 恢复用）。
 * 返回简化结构（TeamBuilderPokemon），只含类型分析需要的字段。
 */
export async function fetchPokemonByNameAction(
  name: string,
): Promise<TeamBuilderPokemon | null> {
  try {
    const p = await fetchPokemonByName(name);
    return {
      id: p.id,
      name: p.species.displayNameEn || p.name,
      types: p.types,
      sprite: pickSprite(p.sprites, false) ?? "",
      generation: p.generation,
      abilities: p.abilities.map((a) => a.name),
    };
  } catch {
    return null;
  }
}

/**
 * 批量按名称查询 Pokemon（URL hash 恢复用）。
 * 无效名称静默跳过。
 */
export async function fetchTeamByNamesAction(
  names: string[],
): Promise<TeamBuilderPokemon[]> {
  const results = await Promise.all(
    names.map((n) => fetchPokemonByNameAction(n)),
  );
  return results.filter((p): p is TeamBuilderPokemon => p !== null);
}

/**
 * 随机生成 6 只 Pokemon（team builder Random Team 按钮用）。
 */
export async function generateRandomTeamAction(): Promise<TeamBuilderPokemon[]> {
  const dataFilter: DataFilterOptions = {
    generation: "all",
    type: "all",
    legendary: "any",
    shiny: "off",
    starter: "off",
    count: 6,
  };
  const pokemons = await getRandomPokemon(dataFilter, 6);
  return pokemons.map((p) => ({
    id: p.id,
    name: p.species.displayNameEn || p.name,
    types: p.types,
    sprite: pickSprite(p.sprites, false) ?? "",
    generation: p.generation,
    abilities: p.abilities.map((a) => a.name),
  }));
}

/* -------------------------------------------------------------------------- */
/* Pokemon Natures Page Actions                                                */
/* -------------------------------------------------------------------------- */

/** 推荐器返回的最小结构（含种族值） */
export interface NatureRecommenderPokemon {
  id: number;
  name: string;
  sprite: string;
  stats: { name: string; baseStat: number }[];
}

/**
 * 按名称查询 Pokemon 种族值（natures 推荐器用）。
 * 返回 stats 数组（PokeAPI stat.name: attack/defense/special-attack/...）。
 */
export async function fetchPokemonStatsAction(
  name: string,
): Promise<NatureRecommenderPokemon | null> {
  try {
    const p = await fetchPokemonByName(name);
    return {
      id: p.id,
      name: p.species.displayNameEn || p.name,
      sprite: pickSprite(p.sprites, false) ?? "",
      stats: p.stats.map((s) => ({ name: s.name, baseStat: s.baseStat })),
    };
  } catch {
    return null;
  }
}
