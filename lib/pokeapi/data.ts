/**
 * PokeAPI 预计算静态数据 + 首次启动 fetch 全量列表
 *
 * - 静态数据：18 属性元数据、Gen 1-9 范围表、Starter IDs、Legendary/Mythical IDs
 * - 全量列表（id + name + types + generation）：首次启动从 PokeAPI fetch + 内存缓存，
 *   底层每个 fetch 请求都会被 cachedFetch 的 24h ISR 缓存
 */

import {
  FETCH_BATCH_SIZE,
  POKEAPI_BASE,
  TOTAL_POKEMON_COUNT,
  cachedFetch,
} from "./cache";
import type {
  Generation,
  GenerationRange,
  PokemonListItem,
  PokemonType,
  TypeMeta,
} from "./types";

/* -------------------------------------------------------------------------- */
/* 18 个属性元数据                                                              */
/* -------------------------------------------------------------------------- */

export const TYPE_METADATA: TypeMeta[] = [
  { id: 1, name: "normal", color: "#A8A878", emoji: "⚪", displayNameEn: "Normal", displayNameZh: "一般" },
  { id: 2, name: "fighting", color: "#C03028", emoji: "🥊", displayNameEn: "Fighting", displayNameZh: "格斗" },
  { id: 3, name: "flying", color: "#A890F0", emoji: "🪽", displayNameEn: "Flying", displayNameZh: "飞行" },
  { id: 4, name: "poison", color: "#A040A0", emoji: "☠️", displayNameEn: "Poison", displayNameZh: "毒" },
  { id: 5, name: "ground", color: "#E0C068", emoji: "⛰️", displayNameEn: "Ground", displayNameZh: "地面" },
  { id: 6, name: "rock", color: "#B8A038", emoji: "🪨", displayNameEn: "Rock", displayNameZh: "岩石" },
  { id: 7, name: "bug", color: "#A8B820", emoji: "🐛", displayNameEn: "Bug", displayNameZh: "虫" },
  { id: 8, name: "ghost", color: "#705898", emoji: "👻", displayNameEn: "Ghost", displayNameZh: "幽灵" },
  { id: 9, name: "steel", color: "#B8B8D0", emoji: "⚙️", displayNameEn: "Steel", displayNameZh: "钢" },
  { id: 10, name: "fire", color: "#F08030", emoji: "🔥", displayNameEn: "Fire", displayNameZh: "火" },
  { id: 11, name: "water", color: "#6890F0", emoji: "💧", displayNameEn: "Water", displayNameZh: "水" },
  { id: 12, name: "grass", color: "#78C850", emoji: "🌿", displayNameEn: "Grass", displayNameZh: "草" },
  { id: 13, name: "electric", color: "#F8D030", emoji: "⚡", displayNameEn: "Electric", displayNameZh: "电" },
  { id: 14, name: "psychic", color: "#F85888", emoji: "🔮", displayNameEn: "Psychic", displayNameZh: "超能力" },
  { id: 15, name: "ice", color: "#98D8D8", emoji: "❄️", displayNameEn: "Ice", displayNameZh: "冰" },
  { id: 16, name: "dragon", color: "#7038F8", emoji: "🐉", displayNameEn: "Dragon", displayNameZh: "龙" },
  { id: 17, name: "dark", color: "#705848", emoji: "🌑", displayNameEn: "Dark", displayNameZh: "恶" },
  { id: 18, name: "fairy", color: "#EE99AC", emoji: "🧚", displayNameEn: "Fairy", displayNameZh: "妖精" },
];

/** name -> meta 查找表 */
export const TYPE_MAP: Record<PokemonType, TypeMeta> = Object.fromEntries(
  TYPE_METADATA.map((t) => [t.name, t]),
) as Record<PokemonType, TypeMeta>;

/* -------------------------------------------------------------------------- */
/* Gen 1-9 id 范围表（已查证准确）                                              */
/* -------------------------------------------------------------------------- */

export const GENERATION_RANGES: GenerationRange[] = [
  { generation: 1, startId: 1, endId: 151, region: "kanto", displayNameEn: "Kanto", displayNameZh: "关都" },
  { generation: 2, startId: 152, endId: 251, region: "johto", displayNameEn: "Johto", displayNameZh: "城都" },
  { generation: 3, startId: 252, endId: 386, region: "hoenn", displayNameEn: "Hoenn", displayNameZh: "丰缘" },
  { generation: 4, startId: 387, endId: 493, region: "sinnoh", displayNameEn: "Sinnoh", displayNameZh: "神奥" },
  { generation: 5, startId: 494, endId: 649, region: "unova", displayNameEn: "Unova", displayNameZh: "合众" },
  { generation: 6, startId: 650, endId: 721, region: "kalos", displayNameEn: "Kalos", displayNameZh: "卡洛斯" },
  { generation: 7, startId: 722, endId: 809, region: "alola", displayNameEn: "Alola", displayNameZh: "阿罗拉" },
  { generation: 8, startId: 810, endId: 905, region: "galar", displayNameEn: "Galar", displayNameZh: "伽勒尔" },
  { generation: 9, startId: 906, endId: 1025, region: "paldea", displayNameEn: "Paldea", displayNameZh: "帕底亚" },
];

/** 根据 Pokemon id 推断世代（无需 fetch species，纯 id 范围匹配） */
export function getGenerationById(id: number): Generation | null {
  const range = GENERATION_RANGES.find((g) => id >= g.startId && id <= g.endId);
  return range?.generation ?? null;
}

/** 根据世代获取范围条目 */
export function getGenerationRange(
  generation: Generation,
): GenerationRange | undefined {
  return GENERATION_RANGES.find((g) => g.generation === generation);
}

/** 获取指定世代的 id 区间 [start, end] */
export function getGenerationIdRange(
  generation: Generation,
): { startId: number; endId: number } {
  const range = getGenerationRange(generation);
  if (!range) {
    throw new Error(`Unknown generation: ${generation}`);
  }
  return { startId: range.startId, endId: range.endId };
}

/* -------------------------------------------------------------------------- */
/* Starter Pokemon id 列表（每代御三家及其进化链）                               */
/* -------------------------------------------------------------------------- */

export const STARTER_POKEMON_IDS: number[] = [
  // Gen 1: Bulbasaur / Ivysaur / Venusaur, Charmander / Charmeleon / Charizard, Squirtle / Wartortle / Blastoise
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  // Gen 2: Chikorita / Bayleef / Meganium, Cyndaquil / Quilava / Typhlosion, Totodile / Croconaw / Feraligatr
  152, 153, 154, 155, 156, 157, 158, 159, 160,
  // Gen 3: Treecko / Grovyle / Sceptile, Torchic / Combusken / Blaziken, Mudkip / Marshtomp / Swampert
  252, 253, 254, 255, 256, 257, 258, 259, 260,
  // Gen 4: Turtwig / Grotle / Torterra, Chimchar / Monferno / Infernape, Piplup / Prinplup / Empoleon
  387, 388, 389, 390, 391, 392, 393, 394, 395,
  // Gen 5: Snivy / Servine / Serperior, Tepig / Pignite / Emboar, Oshawott / Dewott / Samurott
  495, 496, 497, 498, 499, 500, 501, 502, 503,
  // Gen 6: Chespin / Quilladin / Chesnaught, Fennekin / Braixen / Delphox, Froakie / Frogadier / Greninja
  650, 651, 652, 653, 654, 655, 656, 657, 658,
  // Gen 7: Rowlet / Dartrix / Decidueye, Litten / Torracat / Incineroar, Popplio / Brionne / Primarina
  722, 723, 724, 725, 726, 727, 728, 729, 730,
  // Gen 8: Grookey / Thwackey / Rillaboom, Scorbunny / Raboot / Cinderace, Sobble / Drizzile / Inteleon
  810, 811, 812, 813, 814, 815, 816, 817, 818,
  // Gen 9: Sprigatito / Floragato / Meowscarada, Fuecoco / Crocalor / Skeledirge, Quaxly / Quaxwell / Quaquaval
  906, 907, 908, 909, 910, 911, 912, 913, 914,
];

/** Starter id 快速查找集合 */
export const STARTER_ID_SET: Set<number> = new Set(STARTER_POKEMON_IDS);

/* -------------------------------------------------------------------------- */
/* Legendary + Mythical Pokemon id 列表（含 sub-legendary + mythical + UB）     */
/* -------------------------------------------------------------------------- */

export const LEGENDARY_POKEMON_IDS: number[] = [
  // Gen 1: Articuno, Zapdos, Moltres, Mewtwo, Mew(mythical)
  144, 145, 146, 150, 151,
  // Gen 2: Raikou, Entei, Suicune, Lugia, Ho-Oh, Celebi(mythical)
  243, 244, 245, 249, 250, 251,
  // Gen 3: Regirock, Regice, Registeel, Latias, Latios, Kyogre, Groudon, Rayquaza, Jirachi(mythical), Deoxys(mythical)
  377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
  // Gen 4: Uxie, Mesprit, Azelf, Dialga, Palkia, Heatran, Regigigas, Giratina, Cresselia, Phione(mythical), Manaphy(mythical), Darkrai(mythical), Shaymin(mythical), Arceus(mythical)
  480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493,
  // Gen 5: Victini(mythical), Cobalion, Terrakion, Virizion, Tornadus, Thundurus, Reshiram, Zekrom, Landorus, Kyurem, Keldeo(mythical), Meloetta(mythical), Genesect(mythical)
  494, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649,
  // Gen 6: Xerneas, Yveltal, Zygarde, Diancie(mythical), Hoopa(mythical), Volcanion(mythical)
  716, 717, 718, 719, 720, 721,
  // Gen 7: Type: Null, Silvally, Tapu Koko/Lele/Bulu/Fini, Cosmog, Cosmoem, Solgaleo, Lunala, Nihilego, Buzzwole, Pheromosa, Xurkitree, Celesteela, Kartana, Guzzlord, Necrozma, Magearna(mythical), Marshadow(mythical), Poipole, Naganadel, Stakataka, Blacephalon, Zeraora(mythical), Meltan(mythical), Melmetal(mythical)
  772, 773, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809,
  // Gen 8: Zacian, Zamazenta, Eternatus, Kubfu, Urshifu, Zarude(mythical), Regieleki, Regidrago, Glastrier, Spectrier, Calyrex, Enamorus(mythical)
  888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 905,
  // Gen 9: Wo-Chien, Chien-Pao, Ting-Lu, Chi-Yu, Koraidon, Miraidon, Terapagos(mythical), Pecharunt(mythical)
  1001, 1002, 1003, 1004, 1007, 1008, 1024, 1025,
];

/** Legendary/Mythical id 快速查找集合 */
export const LEGENDARY_ID_SET: Set<number> = new Set(LEGENDARY_POKEMON_IDS);

/* -------------------------------------------------------------------------- */
/* 全量 Pokemon 最小信息列表（首次启动 fetch + 内存缓存）                       */
/* -------------------------------------------------------------------------- */

/** PokeAPI /pokemon/{id} 端点的最小响应结构（仅取列表项需要的字段） */
interface PokeApiPokemonMinimal {
  id: number;
  name: string;
  types: Array<{ slot: number; type: { name: string } }>;
}

let cachedList: PokemonListItem[] | null = null;
let inflightPromise: Promise<PokemonListItem[]> | null = null;

/**
 * 拉取全量 1025 Pokemon 的最小信息列表（id + name + types + generation）。
 *
 * - 首次调用会按 50/批 从 PokeAPI fetch（约 21 批），完成后存入内存缓存
 * - 后续调用直接返回内存缓存
 * - 底层每个 fetch 都被 cachedFetch 的 24h ISR 缓存，所以即使内存缓存丢失，
 *   重新 fetch 也是命中 Next.js 数据缓存的（不会真的打到 PokeAPI）
 * - 并发安全：用 inflightPromise 合并同时进来的多次调用
 *
 * 注意：必须在服务端调用（RSC / Route Handler / Server Action）。
 */
export async function fetchAllPokemonList(): Promise<PokemonListItem[]> {
  if (cachedList) return cachedList;
  if (inflightPromise) return inflightPromise;

  inflightPromise = (async () => {
    const result: PokemonListItem[] = [];

    for (
      let batchStart = 1;
      batchStart <= TOTAL_POKEMON_COUNT;
      batchStart += FETCH_BATCH_SIZE
    ) {
      const batchEnd = Math.min(
        batchStart + FETCH_BATCH_SIZE - 1,
        TOTAL_POKEMON_COUNT,
      );

      const ids: number[] = [];
      for (let i = batchStart; i <= batchEnd; i++) ids.push(i);

      const items = await Promise.all(
        ids.map(async (id): Promise<PokemonListItem> => {
          const pokemon = await cachedFetch<PokeApiPokemonMinimal>(
            `${POKEAPI_BASE}/pokemon/${id}`,
          );
          return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types
              .slice()
              .sort((a, b) => a.slot - b.slot)
              .map((t) => t.type.name as PokemonType)
              .filter((t) => Boolean(TYPE_MAP[t])),
            generation: getGenerationById(pokemon.id) ?? 1,
          };
        }),
      );

      result.push(...items);
    }

    cachedList = result;
    return result;
  })();

  try {
    return await inflightPromise;
  } finally {
    inflightPromise = null;
  }
}

/** 重置内存缓存（仅测试 / 维护用） */
export function resetPokemonListCache(): void {
  cachedList = null;
  inflightPromise = null;
}
