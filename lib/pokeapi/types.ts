/**
 * PokeAPI TypeScript 类型定义
 * 基于 https://pokeapi.co/ 实际响应结构
 */

/** 18 个 Pokemon 属性枚举（字符串字面量联合类型） */
export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

/** 属性元数据：name + 中英文显示名 + 颜色 + emoji */
export interface TypeMeta {
  id: number;
  name: PokemonType;
  color: string;
  emoji: string;
  displayNameEn: string;
  displayNameZh: string;
}

/** 世代枚举（Gen 1-9） */
export type Generation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/** 世代范围表条目 */
export interface GenerationRange {
  generation: Generation;
  startId: number;
  endId: number;
  region: string;
  displayNameEn: string;
  displayNameZh: string;
}

/** Legendary 过滤选项（三态） */
export type LegendaryFilter = "any" | "include" | "only";

/** Shiny 过滤选项（二态） */
export type ShinyFilter = "off" | "on";

/** Starter 过滤选项（二态） */
export type StarterFilter = "off" | "on";

/** Filter 维度（首页 + 工具页通用） */
export interface FilterOptions {
  /** 世代筛选，"all" 表示不限 */
  generation: Generation | "all";
  /** 属性筛选，"all" 表示不限 */
  type: PokemonType | "all";
  /** Legendary 筛选：any=任意 / include=包含 / only=仅传说 */
  legendary: LegendaryFilter;
  /** Shiny 形态：off=普通 / on=闪光 */
  shiny: ShinyFilter;
  /** Starter 筛选：off=不限 / on=仅御三家及其进化链 */
  starter: StarterFilter;
  /** 数量：1 / 3 / 6 */
  count: 1 | 3 | 6;
}

/** Pokemon 单项种族值 */
export interface PokemonStat {
  baseStat: number;
  name: string;
}

/** Pokemon 特性 */
export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

/** Pokemon 精灵图资源 */
export interface PokemonSprites {
  frontDefault: string | null;
  frontShiny: string | null;
  officialArtwork: string | null;
  officialArtworkShiny: string | null;
}

/** Pokemon 物种信息（来自 species API） */
export interface PokemonSpecies {
  isLegendary: boolean;
  isMythical: boolean;
  /** 英文 genus，如 "Mouse Pokémon" */
  genus: string;
  /** 简体中文 genus，如 "鼠宝可梦"，无则 null */
  genusZh: string | null;
  /** 简体中文显示名，无则 null */
  displayNameZh: string | null;
  /** 英文显示名（首字母大写） */
  displayNameEn: string;
}

/** 完整 Pokemon 数据（合并 pokemon + species 端点） */
export interface Pokemon {
  id: number;
  /** 英文 name（小写，PokeAPI 原始字段） */
  name: string;
  /** 显示名：优先简体中文，回退英文 */
  displayName: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  /** 高度（分米， PokeAPI 原始单位） */
  height: number;
  /** 重量（百克， PokeAPI 原始单位） */
  weight: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  generation: Generation;
  species: PokemonSpecies;
}

/** 最小信息列表项（用于本地筛选，无需 fetch species） */
export interface PokemonListItem {
  id: number;
  /** 英文 name（小写） */
  name: string;
  types: PokemonType[];
  generation: Generation;
}

/** 默认 FilterOptions（首页 basic + advanced 全默认值） */
export const DEFAULT_FILTER_OPTIONS: FilterOptions = {
  generation: "all",
  type: "all",
  legendary: "any",
  shiny: "off",
  starter: "off",
  count: 1,
};
