/**
 * Pokemon Natures 静态数据（Gen 3 引入，25 个性格，数据固定不变）
 *
 * 数据来源：Bulbapedia 官方性格表 + PokeAPI /nature 端点结构
 * 参照 type-chart.ts 模式：静态常量，无运行时 fetch
 */

/** 5 个受性格影响的战斗能力 */
export type BattleStat = "attack" | "defense" | "sp-atk" | "sp-def" | "speed";

/** 5 种口味（对应树果偏好） */
export type Flavor = "spicy" | "sour" | "sweet" | "dry" | "bitter";

/** 单个性格数据 */
export interface Nature {
  id: number;
  /** 小写 name，如 "adamant" */
  name: string;
  /** 首字母大写显示名 */
  displayName: string;
  /** 增加的能力，null 仅用于类型防御；中性性格 increased === decreased */
  increased: BattleStat;
  /** 减少的能力；中性性格 decreased === increased */
  decreased: BattleStat;
  /** 喜欢的口味 */
  likesFlavor: Flavor;
  /** 讨厌的口味 */
  hatesFlavor: Flavor;
}

/** 口味 → 能力 映射 */
export const FLAVOR_STAT_MAP: Record<Flavor, BattleStat> = {
  spicy: "attack",
  sour: "defense",
  sweet: "speed",
  dry: "sp-atk",
  bitter: "sp-def",
};

/** 能力 → 口味 反向映射 */
export const STAT_FLAVOR_MAP: Record<BattleStat, Flavor> = {
  attack: "spicy",
  defense: "sour",
  "sp-atk": "dry",
  "sp-def": "bitter",
  speed: "sweet",
};

/** 能力显示名 */
export const STAT_DISPLAY: Record<BattleStat, string> = {
  attack: "Attack",
  defense: "Defense",
  "sp-atk": "Sp. Atk",
  "sp-def": "Sp. Def",
  speed: "Speed",
};

/** 5 个战斗能力（矩阵行/列顺序） */
export const BATTLE_STATS: BattleStat[] = [
  "attack",
  "defense",
  "sp-atk",
  "sp-def",
  "speed",
];

/**
 * 25 个性格完整列表（id 与 PokeAPI /nature/{id} 一致）
 *
 * 矩阵布局（行 = increased，列 = decreased）：
 *           -Atk   -Def   -SpA   -SpD   -Spe
 * +Atk      Hardy Lonely Adamant Naughty Brave
 * +Def      Bold  Docile Impish  Lax    Relaxed
 * +SpA      Modest Mild  Bashful Rash   Quiet
 * +SpD      Calm  Gentle Careful Quirky Sassy
 * +Spe      Timid Hasty Jolly   Naive  Serious
 */
export const NATURES: Nature[] = [
  { id: 1, name: "hardy", displayName: "Hardy", increased: "attack", decreased: "attack", likesFlavor: "spicy", hatesFlavor: "spicy" },
  { id: 2, name: "lonely", displayName: "Lonely", increased: "attack", decreased: "defense", likesFlavor: "spicy", hatesFlavor: "sour" },
  { id: 3, name: "adamant", displayName: "Adamant", increased: "attack", decreased: "sp-atk", likesFlavor: "spicy", hatesFlavor: "dry" },
  { id: 4, name: "naughty", displayName: "Naughty", increased: "attack", decreased: "sp-def", likesFlavor: "spicy", hatesFlavor: "bitter" },
  { id: 5, name: "brave", displayName: "Brave", increased: "attack", decreased: "speed", likesFlavor: "spicy", hatesFlavor: "sweet" },
  { id: 6, name: "bold", displayName: "Bold", increased: "defense", decreased: "attack", likesFlavor: "sour", hatesFlavor: "spicy" },
  { id: 7, name: "docile", displayName: "Docile", increased: "defense", decreased: "defense", likesFlavor: "sour", hatesFlavor: "sour" },
  { id: 8, name: "impish", displayName: "Impish", increased: "defense", decreased: "sp-atk", likesFlavor: "sour", hatesFlavor: "dry" },
  { id: 9, name: "lax", displayName: "Lax", increased: "defense", decreased: "sp-def", likesFlavor: "sour", hatesFlavor: "bitter" },
  { id: 10, name: "relaxed", displayName: "Relaxed", increased: "defense", decreased: "speed", likesFlavor: "sour", hatesFlavor: "sweet" },
  { id: 11, name: "modest", displayName: "Modest", increased: "sp-atk", decreased: "attack", likesFlavor: "dry", hatesFlavor: "spicy" },
  { id: 12, name: "mild", displayName: "Mild", increased: "sp-atk", decreased: "defense", likesFlavor: "dry", hatesFlavor: "sour" },
  { id: 13, name: "bashful", displayName: "Bashful", increased: "sp-atk", decreased: "sp-atk", likesFlavor: "dry", hatesFlavor: "dry" },
  { id: 14, name: "rash", displayName: "Rash", increased: "sp-atk", decreased: "sp-def", likesFlavor: "dry", hatesFlavor: "bitter" },
  { id: 15, name: "quiet", displayName: "Quiet", increased: "sp-atk", decreased: "speed", likesFlavor: "dry", hatesFlavor: "sweet" },
  { id: 16, name: "calm", displayName: "Calm", increased: "sp-def", decreased: "attack", likesFlavor: "bitter", hatesFlavor: "spicy" },
  { id: 17, name: "gentle", displayName: "Gentle", increased: "sp-def", decreased: "defense", likesFlavor: "bitter", hatesFlavor: "sour" },
  { id: 18, name: "careful", displayName: "Careful", increased: "sp-def", decreased: "sp-atk", likesFlavor: "bitter", hatesFlavor: "dry" },
  { id: 19, name: "quirky", displayName: "Quirky", increased: "sp-def", decreased: "sp-def", likesFlavor: "bitter", hatesFlavor: "bitter" },
  { id: 20, name: "sassy", displayName: "Sassy", increased: "sp-def", decreased: "speed", likesFlavor: "bitter", hatesFlavor: "sweet" },
  { id: 21, name: "timid", displayName: "Timid", increased: "speed", decreased: "attack", likesFlavor: "sweet", hatesFlavor: "spicy" },
  { id: 22, name: "hasty", displayName: "Hasty", increased: "speed", decreased: "defense", likesFlavor: "sweet", hatesFlavor: "sour" },
  { id: 23, name: "jolly", displayName: "Jolly", increased: "speed", decreased: "sp-atk", likesFlavor: "sweet", hatesFlavor: "dry" },
  { id: 24, name: "naive", displayName: "Naive", increased: "speed", decreased: "sp-def", likesFlavor: "sweet", hatesFlavor: "bitter" },
  { id: 25, name: "serious", displayName: "Serious", increased: "speed", decreased: "speed", likesFlavor: "sweet", hatesFlavor: "sweet" },
];

/** name → Nature 查找表 */
const NATURE_MAP: Record<string, Nature> = Object.fromEntries(
  NATURES.map((n) => [n.name, n]),
);

/** 判断是否为中性性格（increased === decreased，无实际效果） */
export function isNeutral(nature: Nature): boolean {
  return nature.increased === nature.decreased;
}

/** 按 name 查询性格 */
export function getNatureByName(name: string): Nature | undefined {
  return NATURE_MAP[name.toLowerCase().trim()];
}

/** 按 increased + decreased 查询性格（5×5 矩阵每个单元格唯一对应一个性格） */
export function getNatureByStats(
  increased: BattleStat,
  decreased: BattleStat,
): Nature {
  return NATURES.find(
    (n) => n.increased === increased && n.decreased === decreased,
  )!;
}

/** 按增加的能力筛选性格（包括中性性格，如 +Attack 含 Hardy） */
export function getNaturesByIncreased(stat: BattleStat): Nature[] {
  return NATURES.filter((n) => n.increased === stat);
}

/**
 * 简化的种族值 → 能力键映射
 * PokeAPI stat.name: "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed"
 */
type StatMap = Record<BattleStat, number>;

function mapStats(stats: { name: string; baseStat: number }[]): StatMap {
  const lookup: Record<string, BattleStat> = {
    attack: "attack",
    defense: "defense",
    "special-attack": "sp-atk",
    "special-defense": "sp-def",
    speed: "speed",
  };
  const result: StatMap = { attack: 0, defense: 0, "sp-atk": 0, "sp-def": 0, speed: 0 };
  for (const s of stats) {
    const key = lookup[s.name];
    if (key) result[key] = s.baseStat;
  }
  return result;
}

/** 推荐结果条目 */
export interface NatureRecommendation {
  nature: Nature;
  reason: string;
}

/**
 * 基于种族值推荐最佳性格（Top 3）
 *
 * 推荐规则（简化但实用）：
 * 1. 比较 baseAttack vs baseSpAtk 判断物理/特殊攻击手
 * 2. 物理（Atk > SpA）：推荐 Adamant（+Atk/-SpA）；若 Speed 较高（>=100）推荐 Jolly（+Spe/-SpA）
 * 3. 特殊（SpA > Atk）：推荐 Modest（+SpA/-Atk）；若 Speed 较高推荐 Timid（+Spe/-Atk）
 * 4. 坦克（Def/SpD 高，Atk ≈ SpA）：推荐 Bold（+Def/-Atk）或 Calm（+SpD/-Atk）
 */
export function recommendNatures(
  stats: { name: string; baseStat: number }[],
): NatureRecommendation[] {
  const s = mapStats(stats);
  const isPhysical = s.attack >= s["sp-atk"];
  const isFast = s.speed >= 100;

  // Priority-ordered nature candidates for each attacking type.
  const physicalOrder = [
    getNatureByName("jolly")!,
    getNatureByName("adamant")!,
    getNatureByName("impish")!,
    getNatureByName("brave")!,
  ];
  const specialOrder = [
    getNatureByName("timid")!,
    getNatureByName("modest")!,
    getNatureByName("calm")!,
    getNatureByName("quiet")!,
  ];

  const order = isPhysical ? physicalOrder : specialOrder;
  const selected = new Set<string>();
  const recs: NatureRecommendation[] = [];

  function addReason(nature: Nature): void {
    let reason: string;
    if (nature.name === "jolly") {
      reason = isFast
        ? `${s.speed} base Speed makes this a fast physical attacker — Jolly outspeeds opponents.`
        : `Boosts Speed while dropping the unused Sp. Atk — great if outspeeding opponents matters.`;
    } else if (nature.name === "adamant") {
      reason = `Higher Attack (${s.attack}) than Sp. Atk (${s["sp-atk"]}) — Adamant maximizes physical damage.`;
    } else if (nature.name === "impish") {
      reason = s.defense >= 100
        ? `Solid Defense (${s.defense}) — Impish adds bulk while dropping the unused Sp. Atk.`
        : `Adds physical bulk and drops the unused Sp. Atk.`;
    } else if (nature.name === "brave") {
      reason = `Maximizes Attack without caring about Speed — Brave drops the unused Speed stat.`;
    } else if (nature.name === "timid") {
      reason = isFast
        ? `${s.speed} base Speed makes this a fast special attacker — Timid outspeeds opponents.`
        : `Boosts Speed while dropping the unused Attack — helpful for faster special sets.`;
    } else if (nature.name === "modest") {
      reason = `Higher Sp. Atk (${s["sp-atk"]}) than Attack (${s.attack}) — Modest maximizes special damage.`;
    } else if (nature.name === "calm") {
      reason = s["sp-def"] >= 100
        ? `Solid Special Defense (${s["sp-def"]}) — Calm adds bulk while dropping the unused Attack.`
        : `Adds special bulk and drops the unused Attack.`;
    } else if (nature.name === "quiet") {
      reason = `Maximizes Sp. Atk without caring about Speed — Quiet drops the unused Speed stat.`;
    } else {
      reason = `Boosts ${STAT_DISPLAY[nature.increased]} and drops ${STAT_DISPLAY[nature.decreased]}.`;
    }
    recs.push({ nature, reason });
  }

  // 1. Speed nature only if genuinely fast.
  if (isFast) {
    selected.add(order[0].name);
    addReason(order[0]);
  }

  // 2. Main damage nature.
  selected.add(order[1].name);
  addReason(order[1]);

  // 3. Bulk nature if relevant.
  const bulkStat = isPhysical ? s.defense : s["sp-def"];
  if (bulkStat >= 100) {
    selected.add(order[2].name);
    addReason(order[2]);
  }

  // 4. Fill to 3 with remaining candidates.
  for (const nature of order) {
    if (recs.length >= 3) break;
    if (selected.has(nature.name)) continue;
    selected.add(nature.name);
    addReason(nature);
  }

  return recs;
}
