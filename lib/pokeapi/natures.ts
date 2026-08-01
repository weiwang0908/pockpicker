/**
 * Pokemon nature data used by:
 * - /pokemon-natures (nature chart + recommender + finder)
 * - /pokemon-iv-calculator (stat modifier lookup)
 *
 * This module exports two slightly different representations:
 * - `Nature` (with id, displayName, flavor info) for the natures page
 * - `NatureInfo` (simplified, no flavor) for the IV calculator
 */

/* -------------------------------------------------------------------------- */
/* 5 项可被性格修正的战斗属性                                                   */
/* -------------------------------------------------------------------------- */

export type BattleStat =
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export const BATTLE_STATS: BattleStat[] = [
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

/** 6 项属性的显示名（包含 HP） */
export const STAT_DISPLAY: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

/* -------------------------------------------------------------------------- */
/* Nature 数据（完整版，给 natures 页面用）                                       */
/* -------------------------------------------------------------------------- */

export type Flavor = "spicy" | "sour" | "sweet" | "dry" | "bitter";

export interface Nature {
  id: number;
  name: string;
  displayName: string;
  /** 增加的属性（neutral natures 为 null） */
  increased: BattleStat | null;
  /** 减少的属性（neutral natures 为 null） */
  decreased: BattleStat | null;
  likesFlavor: Flavor;
  hatesFlavor: Flavor;
}

export const NATURES: Nature[] = [
  {
    id: 1,
    name: "hardy",
    displayName: "Hardy",
    increased: "attack",
    decreased: "attack",
    likesFlavor: "spicy",
    hatesFlavor: "spicy",
  },
  {
    id: 2,
    name: "lonely",
    displayName: "Lonely",
    increased: "attack",
    decreased: "defense",
    likesFlavor: "spicy",
    hatesFlavor: "sour",
  },
  {
    id: 3,
    name: "brave",
    displayName: "Brave",
    increased: "attack",
    decreased: "speed",
    likesFlavor: "spicy",
    hatesFlavor: "sweet",
  },
  {
    id: 4,
    name: "adamant",
    displayName: "Adamant",
    increased: "attack",
    decreased: "special-attack",
    likesFlavor: "spicy",
    hatesFlavor: "dry",
  },
  {
    id: 5,
    name: "naughty",
    displayName: "Naughty",
    increased: "attack",
    decreased: "special-defense",
    likesFlavor: "spicy",
    hatesFlavor: "bitter",
  },
  {
    id: 6,
    name: "bold",
    displayName: "Bold",
    increased: "defense",
    decreased: "attack",
    likesFlavor: "sour",
    hatesFlavor: "spicy",
  },
  {
    id: 7,
    name: "docile",
    displayName: "Docile",
    increased: "defense",
    decreased: "defense",
    likesFlavor: "sour",
    hatesFlavor: "sour",
  },
  {
    id: 8,
    name: "relaxed",
    displayName: "Relaxed",
    increased: "defense",
    decreased: "speed",
    likesFlavor: "sour",
    hatesFlavor: "sweet",
  },
  {
    id: 9,
    name: "impish",
    displayName: "Impish",
    increased: "defense",
    decreased: "special-attack",
    likesFlavor: "sour",
    hatesFlavor: "dry",
  },
  {
    id: 10,
    name: "lax",
    displayName: "Lax",
    increased: "defense",
    decreased: "special-defense",
    likesFlavor: "sour",
    hatesFlavor: "bitter",
  },
  {
    id: 11,
    name: "timid",
    displayName: "Timid",
    increased: "speed",
    decreased: "attack",
    likesFlavor: "sweet",
    hatesFlavor: "spicy",
  },
  {
    id: 12,
    name: "hasty",
    displayName: "Hasty",
    increased: "speed",
    decreased: "defense",
    likesFlavor: "sweet",
    hatesFlavor: "sour",
  },
  {
    id: 13,
    name: "serious",
    displayName: "Serious",
    increased: "speed",
    decreased: "speed",
    likesFlavor: "sweet",
    hatesFlavor: "sweet",
  },
  {
    id: 14,
    name: "jolly",
    displayName: "Jolly",
    increased: "speed",
    decreased: "special-attack",
    likesFlavor: "sweet",
    hatesFlavor: "dry",
  },
  {
    id: 15,
    name: "naive",
    displayName: "Naive",
    increased: "speed",
    decreased: "special-defense",
    likesFlavor: "sweet",
    hatesFlavor: "bitter",
  },
  {
    id: 16,
    name: "modest",
    displayName: "Modest",
    increased: "special-attack",
    decreased: "attack",
    likesFlavor: "dry",
    hatesFlavor: "spicy",
  },
  {
    id: 17,
    name: "mild",
    displayName: "Mild",
    increased: "special-attack",
    decreased: "defense",
    likesFlavor: "dry",
    hatesFlavor: "sour",
  },
  {
    id: 18,
    name: "quiet",
    displayName: "Quiet",
    increased: "special-attack",
    decreased: "speed",
    likesFlavor: "dry",
    hatesFlavor: "sweet",
  },
  {
    id: 19,
    name: "bashful",
    displayName: "Bashful",
    increased: "special-attack",
    decreased: "special-attack",
    likesFlavor: "dry",
    hatesFlavor: "dry",
  },
  {
    id: 20,
    name: "rash",
    displayName: "Rash",
    increased: "special-attack",
    decreased: "special-defense",
    likesFlavor: "dry",
    hatesFlavor: "bitter",
  },
  {
    id: 21,
    name: "calm",
    displayName: "Calm",
    increased: "special-defense",
    decreased: "attack",
    likesFlavor: "bitter",
    hatesFlavor: "spicy",
  },
  {
    id: 22,
    name: "gentle",
    displayName: "Gentle",
    increased: "special-defense",
    decreased: "defense",
    likesFlavor: "bitter",
    hatesFlavor: "sour",
  },
  {
    id: 23,
    name: "sassy",
    displayName: "Sassy",
    increased: "special-defense",
    decreased: "speed",
    likesFlavor: "bitter",
    hatesFlavor: "sweet",
  },
  {
    id: 24,
    name: "careful",
    displayName: "Careful",
    increased: "special-defense",
    decreased: "special-attack",
    likesFlavor: "bitter",
    hatesFlavor: "dry",
  },
  {
    id: 25,
    name: "quirky",
    displayName: "Quirky",
    increased: "special-defense",
    decreased: "special-defense",
    likesFlavor: "bitter",
    hatesFlavor: "bitter",
  },
];

export function isNeutral(nature: Nature): boolean {
  return nature.increased === nature.decreased;
}

/* -------------------------------------------------------------------------- */
/* IV 计算器用的简化数据结构                                                     */
/* -------------------------------------------------------------------------- */

export interface NatureInfo {
  name: string;
  increased: BattleStat | null;
  decreased: BattleStat | null;
}

/** IV 计算器可直接遍历的 25 性格列表（不带 flavor 信息） */
export const NATURE_INFOS: NatureInfo[] = NATURES.map((n) => ({
  name: n.displayName,
  increased: n.increased,
  decreased: n.decreased,
}));

/** 根据性格名和属性名获取修正倍率 (1.1 / 0.9 / 1.0) */
export function getNatureMultiplier(
  natureName: string,
  stat: BattleStat,
): number {
  const nature = NATURES.find(
    (n) => n.displayName.toLowerCase() === natureName.toLowerCase(),
  );
  if (!nature) return 1;
  if (nature.increased === stat && nature.decreased !== stat) return 1.1;
  if (nature.decreased === stat && nature.increased !== stat) return 0.9;
  return 1;
}

/* -------------------------------------------------------------------------- */
/* Nature recommender（基于 base stats 推荐最佳性格）                            */
/* -------------------------------------------------------------------------- */

export interface NatureRecommendation {
  nature: Nature;
  reason: string;
}

/** 根据 base stats 推荐前几个性格 */
export function recommendNatures(
  stats: { name: string; baseStat: number }[],
): NatureRecommendation[] {
  // 排除 HP，只考虑 5 项战斗属性
  const battleStats = stats.filter((s) => s.name !== "hp");
  if (battleStats.length === 0) return [];

  // 找出最高和最低基础值
  const sorted = battleStats.slice().sort((a, b) => b.baseStat - a.baseStat);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  // 推荐优先级：
  // 1. 提升最高项、降低最低项
  // 2. 提升最高项、降低无用项（如果最低项不是攻击/特攻）
  // 3. 常见泛用性格：固执、爽朗、胆小、内敛、大胆、淘气等
  const candidates: NatureRecommendation[] = [];

  function push(natureName: string, reason: string) {
    const nature = NATURES.find((n) => n.displayName === natureName);
    if (nature && !candidates.some((c) => c.nature.id === nature.id)) {
      candidates.push({ nature, reason });
    }
  }

  if (highest && lowest) {
    // 找到对应的性格：提升 highest.name，降低 lowest.name
    const best = NATURES.find(
      (n) =>
        !isNeutral(n) &&
        n.increased === highest.name &&
        n.decreased === lowest.name,
    );
    if (best) {
      candidates.push({
        nature: best,
        reason: `Optimal for ${STAT_DISPLAY[highest.name]} while dropping ${STAT_DISPLAY[lowest.name]}, which is already this Pokemon's lowest base stat.`,
      });
    }
  }

  // 通用物攻/特攻推荐
  const attackStat = battleStats.find((s) => s.name === "attack");
  const spAtkStat = battleStats.find((s) => s.name === "special-attack");
  const speedStat = battleStats.find((s) => s.name === "speed");

  if (attackStat && spAtkStat) {
    if (attackStat.baseStat >= spAtkStat.baseStat + 15) {
      push(
        "Adamant",
        `High Attack (${attackStat.baseStat}) and lower Special Attack make Adamant a strong physical attacker nature.`,
      );
      push(
        "Jolly",
        `Good Attack and Speed (${speedStat?.baseStat ?? "?"}) — Jolly is ideal for fast physical sweepers.`,
      );
    } else if (spAtkStat.baseStat >= attackStat.baseStat + 15) {
      push(
        "Modest",
        `High Special Attack (${spAtkStat.baseStat}) and lower Attack make Modest ideal for special attackers.`,
      );
      push(
        "Timid",
        `Good Special Attack and Speed (${speedStat?.baseStat ?? "?"}) — Timid is great for fast special sweepers.`,
      );
    }
  }

  // 防御型推荐
  const defenseStat = battleStats.find((s) => s.name === "defense");
  const spDefStat = battleStats.find((s) => s.name === "special-defense");
  if (defenseStat && spDefStat) {
    if (defenseStat.baseStat >= spDefStat.baseStat + 15) {
      push(
        "Impish",
        `High Defense (${defenseStat.baseStat}) — Impish boosts physical bulk while dropping less-used Special Attack.`,
      );
    } else if (spDefStat.baseStat >= defenseStat.baseStat + 15) {
      push(
        "Careful",
        `High Special Defense (${spDefStat.baseStat}) — Careful boosts special bulk while dropping Special Attack.`,
      );
    }
  }

  // 兜底：如果太少，补一个勇敢/冷静（低速高攻）
  if (candidates.length < 3 && speedStat && speedStat.baseStat < 60) {
    if (attackStat && attackStat.baseStat >= (spAtkStat?.baseStat ?? 0)) {
      push(
        "Brave",
        `Low Speed (${speedStat.baseStat}) and high Attack — Brave is a good Trick Room physical attacker nature.`,
      );
    } else {
      push(
        "Quiet",
        `Low Speed (${speedStat.baseStat}) and high Special Attack — Quiet works well under Trick Room.`,
      );
    }
  }

  return candidates.slice(0, 3);
}
