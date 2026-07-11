/**
 * 18×18 Pokemon type effectiveness chart + calculation functions.
 *
 * Data source: Bulbapedia official type chart.
 * Chart key = attacking type, value = { defending type → multiplier }.
 * Multipliers: 0 (immune), 0.5 (resist), 1 (normal, omitted), 2 (weak).
 */

import type { PokemonType } from "./types";

export const TYPE_CHART: Record<PokemonType, Partial<Record<PokemonType, number>>> = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5,
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5,
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5,
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5,
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2,
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5,
  },
};

/** All 18 types in canonical order (matches TYPE_METADATA in data.ts). */
export const ALL_TYPES: PokemonType[] = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

/**
 * Get the effectiveness multiplier for an attack type against a defender.
 * Handles dual-type defenders by multiplying the individual multipliers.
 *
 * @returns 0 | 0.25 | 0.5 | 1 | 2 | 4
 */
export function getEffectiveness(
  attackType: PokemonType,
  defenderTypes: PokemonType[],
): number {
  let multiplier = 1;
  for (const defType of defenderTypes) {
    const m = TYPE_CHART[attackType]?.[defType];
    if (m !== undefined) {
      multiplier *= m;
    }
  }
  return multiplier;
}

/** A single cell in the defensive matrix. */
export interface DefensiveCell {
  pokemonIndex: number;
  multiplier: number;
}

/** A row in the defensive matrix (one per attack type). */
export interface DefensiveRow {
  attackType: PokemonType;
  cells: DefensiveCell[];
}

/**
 * Calculate the full defensive matrix for a team.
 * Returns one row per attack type (18 rows), each with a cell per team member.
 */
export function getTeamDefensiveMatrix(
  team: { types: PokemonType[] }[],
): DefensiveRow[] {
  return ALL_TYPES.map((attackType) => ({
    attackType,
    cells: team.map((member, index) => ({
      pokemonIndex: index,
      multiplier: getEffectiveness(attackType, member.types),
    })),
  }));
}

/** Defensive summary: which types the team is collectively weak to / resists / immune to. */
export interface DefensiveSummary {
  weakTo: PokemonType[];
  resists: PokemonType[];
  immuneTo: PokemonType[];
}

/**
 * Calculate the defensive summary for a team.
 * - weakTo: at least 1 team member is weak (2x or 4x) to this type
 * - resists: at least 1 team member resists (0.5x or 0.25x) this type
 * - immuneTo: at least 1 team member is immune (0x) to this type
 */
export function getTeamDefensiveSummary(
  team: { types: PokemonType[] }[],
): DefensiveSummary {
  const weakTo: PokemonType[] = [];
  const resists: PokemonType[] = [];
  const immuneTo: PokemonType[] = [];

  for (const attackType of ALL_TYPES) {
    let hasWeak = false;
    let hasResist = false;
    let hasImmune = false;

    for (const member of team) {
      const m = getEffectiveness(attackType, member.types);
      if (m === 0) hasImmune = true;
      else if (m < 1) hasResist = true;
      else if (m > 1) hasWeak = true;
    }

    if (hasWeak) weakTo.push(attackType);
    if (hasResist) resists.push(attackType);
    if (hasImmune) immuneTo.push(attackType);
  }

  return { weakTo, resists, immuneTo };
}

/** Offensive coverage: which types the team can hit for super-effective STAB damage. */
export interface OffensiveCoverage {
  covered: PokemonType[];
  uncovered: PokemonType[];
}

/**
 * Calculate the team's offensive STAB coverage.
 * For each team member's type(s), check which defending types they can hit
 * for 2x damage. The union of all members' coverage = team coverage.
 */
export function getTeamOffensiveCoverage(
  team: { types: PokemonType[] }[],
): OffensiveCoverage {
  const coveredSet = new Set<PokemonType>();

  for (const member of team) {
    for (const attackType of member.types) {
      for (const defType of ALL_TYPES) {
        const m = TYPE_CHART[attackType]?.[defType];
        if (m !== undefined && m >= 2) {
          coveredSet.add(defType);
        }
      }
    }
  }

  const covered = ALL_TYPES.filter((t) => coveredSet.has(t));
  const uncovered = ALL_TYPES.filter((t) => !coveredSet.has(t));

  return { covered, uncovered };
}
