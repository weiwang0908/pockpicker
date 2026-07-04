/**
 * PokeAPI 客户端：fetch + transform + filter
 *
 * 全部函数必须在服务端调用（RSC / Route Handler / Server Action）。
 * 所有 fetch 通过 cachedFetch 自动获得 24h ISR 缓存。
 */

import { POKEAPI_BASE, cachedFetch } from "./cache";
import {
  LEGENDARY_ID_SET,
  STARTER_ID_SET,
  TYPE_MAP,
  fetchAllPokemonList,
  getGenerationById,
  getGenerationIdRange,
} from "./data";
import type {
  FilterOptions,
  Generation,
  Pokemon,
  PokemonAbility,
  PokemonListItem,
  PokemonSpecies,
  PokemonSprites,
  PokemonStat,
  PokemonType,
} from "./types";

/* -------------------------------------------------------------------------- */
/* PokeAPI 原始响应类型（仅取我们关心的字段）                                    */
/* -------------------------------------------------------------------------- */

interface PokeApiTypeRef {
  name: string;
}

interface PokeApiPokemonTypeSlot {
  slot: number;
  type: PokeApiTypeRef;
}

interface PokeApiAbilityRef {
  name: string;
}

interface PokeApiPokemonAbility {
  is_hidden: boolean;
  ability: PokeApiAbilityRef;
}

interface PokeApiStatRef {
  name: string;
}

interface PokeApiPokemonStat {
  base_stat: number;
  stat: PokeApiStatRef;
}

interface PokeApiSpritesOtherArtwork {
  front_default?: string | null;
  front_shiny?: string | null;
}

interface PokeApiSpritesOther {
  "official-artwork"?: PokeApiSpritesOtherArtwork | null;
}

interface PokeApiSprites {
  front_default?: string | null;
  front_shiny?: string | null;
  other?: PokeApiSpritesOther;
}

interface PokeApiPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokeApiPokemonTypeSlot[];
  abilities: PokeApiPokemonAbility[];
  stats: PokeApiPokemonStat[];
  sprites: PokeApiSprites;
}

interface PokeApiNameEntry {
  name: string;
  language: { name: string };
}

interface PokeApiGenusEntry {
  genus: string;
  language: { name: string };
}

interface PokeApiGenerationRef {
  name: string; // "generation-i" ... "generation-ix"
}

interface PokeApiSpeciesResponse {
  id: number;
  name: string;
  names: PokeApiNameEntry[];
  genera: PokeApiGenusEntry[];
  generation: PokeApiGenerationRef;
  is_legendary: boolean;
  is_mythical: boolean;
}

/* -------------------------------------------------------------------------- */
/* 内部工具函数                                                                 */
/* -------------------------------------------------------------------------- */

const ROMAN_TO_GENERATION: Record<string, Generation> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
};

/** 把 "generation-iii" 解析为 3 */
function parseGeneration(genName: string): Generation | null {
  const match = /^generation-([ivx]+)$/i.exec(genName);
  if (!match) return null;
  return ROMAN_TO_GENERATION[match[1].toLowerCase()] ?? null;
}

/** 把 "pikachu" 转成 "Pikachu" */
function capitalizeName(name: string): string {
  if (!name) return name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** 生成 [start, end] 闭区间整数序列 */
function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

/** 把 PokeAPI 原始响应转成项目内 Pokemon 类型 */
function transformPokemon(
  pokemonRes: PokeApiPokemonResponse,
  speciesRes: PokeApiSpeciesResponse,
): Pokemon {
  const types: PokemonType[] = pokemonRes.types
    .slice()
    .sort((a, b) => a.slot - b.slot)
    .map((t) => t.type.name as PokemonType)
    .filter((t) => Boolean(TYPE_MAP[t]));

  const sprites: PokemonSprites = {
    frontDefault: pokemonRes.sprites.front_default ?? null,
    frontShiny: pokemonRes.sprites.front_shiny ?? null,
    officialArtwork:
      pokemonRes.sprites.other?.["official-artwork"]?.front_default ?? null,
    officialArtworkShiny:
      pokemonRes.sprites.other?.["official-artwork"]?.front_shiny ?? null,
  };

  const enNameEntry = speciesRes.names.find((n) => n.language.name === "en");
  const zhNameEntry = speciesRes.names.find(
    (n) => n.language.name === "zh-Hans",
  );
  const displayNameEn = enNameEntry?.name ?? capitalizeName(pokemonRes.name);
  const displayNameZh = zhNameEntry?.name ?? null;

  const enGenusEntry = speciesRes.genera.find(
    (g) => g.language.name === "en",
  );
  const zhGenusEntry = speciesRes.genera.find(
    (g) => g.language.name === "zh-Hans",
  );

  const generation =
    parseGeneration(speciesRes.generation.name) ??
    getGenerationById(pokemonRes.id) ??
    1;

  const abilities: PokemonAbility[] = pokemonRes.abilities.map((a) => ({
    name: a.ability.name,
    isHidden: a.is_hidden,
  }));

  const stats: PokemonStat[] = pokemonRes.stats.map((s) => ({
    baseStat: s.base_stat,
    name: s.stat.name,
  }));

  const species: PokemonSpecies = {
    isLegendary: speciesRes.is_legendary,
    isMythical: speciesRes.is_mythical,
    genus: enGenusEntry?.genus ?? "",
    genusZh: zhGenusEntry?.genus ?? null,
    displayNameEn,
    displayNameZh,
  };

  return {
    id: pokemonRes.id,
    name: pokemonRes.name,
    displayName: displayNameZh ?? displayNameEn,
    types,
    sprites,
    height: pokemonRes.height,
    weight: pokemonRes.weight,
    abilities,
    stats,
    generation,
    species,
  };
}

/**
 * 取 sprite URL：优先 official_artwork，回退 front_default。
 * shiny=true 时优先取 shiny 版本。
 */
export function pickSprite(
  sprites: PokemonSprites,
  shiny: boolean,
): string | null {
  if (shiny) {
    return (
      sprites.officialArtworkShiny ??
      sprites.frontShiny ??
      sprites.officialArtwork ??
      sprites.frontDefault
    );
  }
  return (
    sprites.officialArtwork ??
    sprites.frontDefault ??
    sprites.officialArtworkShiny ??
    sprites.frontShiny
  );
}

/* -------------------------------------------------------------------------- */
/* 公共 fetch 函数                                                             */
/* -------------------------------------------------------------------------- */

/**
 * 拉取单只 Pokemon（合并 /pokemon/{id} + /pokemon-species/{id}）
 * @param id 1-1025
 */
export async function fetchPokemon(id: number): Promise<Pokemon> {
  const [pokemonRes, speciesRes] = await Promise.all([
    cachedFetch<PokeApiPokemonResponse>(`${POKEAPI_BASE}/pokemon/${id}`),
    cachedFetch<PokeApiSpeciesResponse>(
      `${POKEAPI_BASE}/pokemon-species/${id}`,
    ),
  ]);
  return transformPokemon(pokemonRes, speciesRes);
}

/**
 * 批量 fetch [startId, endId] 闭区间内的 Pokemon。
 * 用 Promise.all 按 50 一批控制并发（避免触发 PokeAPI 300/min 限流）。
 *
 * @param startId 起始 id（含）
 * @param endId 结束 id（含）
 */
export async function fetchPokemonRange(
  startId: number,
  endId: number,
): Promise<Pokemon[]> {
  if (startId > endId) {
    throw new Error(
      `fetchPokemonRange: startId (${startId}) > endId (${endId})`,
    );
  }

  const ids = range(startId, endId);
  const results: Pokemon[] = [];
  const BATCH_SIZE = 50;

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(fetchPokemon));
    results.push(...batchResults);
  }

  return results;
}

/**
 * 根据世代取整代 Pokemon（fetchPokemonRange 的语法糖）
 */
export async function fetchGeneration(
  generation: Generation,
): Promise<Pokemon[]> {
  const { startId, endId } = getGenerationIdRange(generation);
  return fetchPokemonRange(startId, endId);
}

/**
 * 在最小信息列表上应用 FilterOptions，返回筛选后的 PokemonListItem 数组。
 *
 * 注意：legendary / starter 标记基于本仓库预计算的 id 集合（含 sub-legendary +
 * mythical + Gen 7 ultra beasts），等价于 PokeAPI is_legendary || is_mythical。
 */
export function filterList(
  list: PokemonListItem[],
  filter: FilterOptions,
): PokemonListItem[] {
  return list.filter((item) => {
    if (filter.generation !== "all" && item.generation !== filter.generation) {
      return false;
    }
    if (filter.type !== "all" && !item.types.includes(filter.type)) {
      return false;
    }
    if (filter.starter === "on" && !STARTER_ID_SET.has(item.id)) {
      return false;
    }
    if (filter.legendary === "only" && !LEGENDARY_ID_SET.has(item.id)) {
      return false;
    }
    if (filter.legendary === "include") {
      // include = 包含（即不排除），不做任何额外筛选
      // 与 "any" 行为相同，保留分支以备未来 "exclude" 语义
    }
    return true;
  });
}

/**
 * 根据 FilterOptions 拉取全部筛选后的 Pokemon。
 *
 * 流程：
 * 1. fetchAllPokemonList() 拿最小信息列表（首次慢，后续命中内存/ISR 缓存）
 * 2. 在本地按 generation / type / starter / legendary 筛选 id
 * 3. 对每个 id 调 fetchPokemon(id)（Promise.all 按 50 一批控制并发）
 *
 * 注意：当筛选结果很大时（如 type=all + generation=all）会拉取全部 1025 Pokemon，
 * 通常用于"按 type 浏览"等工具页。首页随机抽取请用 getRandomPokemon。
 */
export async function fetchAllPokemon(
  filter: FilterOptions,
): Promise<Pokemon[]> {
  const list = await fetchAllPokemonList();
  const filtered = filterList(list, filter);
  const ids = filtered.map((item) => item.id);

  const results: Pokemon[] = [];
  const BATCH_SIZE = 50;
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(fetchPokemon));
    results.push(...batchResults);
  }
  return results;
}

/**
 * 从筛选池里随机选 count 只并拉取完整数据。
 *
 * 与 fetchAllPokemon 不同：先在最小信息列表上筛选 + 抽样，
 * 只对抽中的 id 发起 fetchPokemon，避免拉取全量。
 *
 * @param filter FilterOptions
 * @param count 抽样数量（1 / 3 / 6，默认取 filter.count）
 */
export async function getRandomPokemon(
  filter: FilterOptions,
  count?: number,
): Promise<Pokemon[]> {
  const n = count ?? filter.count;
  const list = await fetchAllPokemonList();
  const filtered = filterList(list, filter);

  if (filtered.length === 0) {
    return [];
  }

  // Fisher-Yates 部分洗牌：仅洗出前 n 个，避免对整个数组洗牌
  const arr = filtered.slice();
  const k = Math.min(n, arr.length);
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const picked = arr.slice(0, k);
  return Promise.all(picked.map((item) => fetchPokemon(item.id)));
}

/* -------------------------------------------------------------------------- */
/* Re-export 常用静态数据（方便调用方一处导入）                                 */
/* -------------------------------------------------------------------------- */

export {
  LEGENDARY_ID_SET,
  LEGENDARY_POKEMON_IDS,
  STARTER_ID_SET,
  STARTER_POKEMON_IDS,
  TYPE_MAP,
  TYPE_METADATA,
  GENERATION_RANGES,
  fetchAllPokemonList,
  getGenerationById,
  getGenerationIdRange,
  getGenerationRange,
} from "./data";
