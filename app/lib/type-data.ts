// 18 Pokemon types metadata + shared Pokemon type + helpers.
// NOTE: Pokemon type is defined locally here until the PokeAPI client is ready
// (see spec: "Pokemon 类型先本地定义"). Re-export from there once available.

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
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

export interface TypeMeta {
  name: PokemonType;
  displayName: string;
  color: string; // hex, applied to type icon / text / card border (NOT background)
  emoji: string;
}

export const TYPE_DATA: Record<PokemonType, TypeMeta> = {
  normal: { name: "normal", displayName: "Normal", color: "#A8A878", emoji: "⭐" },
  fire: { name: "fire", displayName: "Fire", color: "#F08030", emoji: "🔥" },
  water: { name: "water", displayName: "Water", color: "#6890F0", emoji: "💧" },
  grass: { name: "grass", displayName: "Grass", color: "#78C850", emoji: "🌿" },
  electric: { name: "electric", displayName: "Electric", color: "#F8B710", emoji: "⚡" },
  ice: { name: "ice", displayName: "Ice", color: "#98D8D8", emoji: "❄️" },
  fighting: { name: "fighting", displayName: "Fighting", color: "#C03028", emoji: "🥊" },
  poison: { name: "poison", displayName: "Poison", color: "#A040A0", emoji: "☠️" },
  ground: { name: "ground", displayName: "Ground", color: "#E0C068", emoji: "⛰️" },
  flying: { name: "flying", displayName: "Flying", color: "#A890F0", emoji: "🪽" },
  psychic: { name: "psychic", displayName: "Psychic", color: "#F85888", emoji: "🔮" },
  bug: { name: "bug", displayName: "Bug", color: "#A8B820", emoji: "🐛" },
  rock: { name: "rock", displayName: "Rock", color: "#B8A038", emoji: "🪨" },
  ghost: { name: "ghost", displayName: "Ghost", color: "#705898", emoji: "👻" },
  dragon: { name: "dragon", displayName: "Dragon", color: "#7038F8", emoji: "🐉" },
  dark: { name: "dark", displayName: "Dark", color: "#505050", emoji: "🌑" },
  steel: { name: "steel", displayName: "Steel", color: "#B8B8D0", emoji: "⚙️" },
  fairy: { name: "fairy", displayName: "Fairy", color: "#EE99AC", emoji: "🧚" },
};

const FALLBACK_TYPE: TypeMeta = TYPE_DATA.normal;

export function getTypeMeta(type: string | undefined | null): TypeMeta {
  if (!type) return FALLBACK_TYPE;
  const lower = type.toLowerCase();
  return (TYPE_DATA as Record<string, TypeMeta>)[lower] ?? FALLBACK_TYPE;
}

const ROMAN_NUMERALS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function generationToRoman(gen: number): string {
  if (gen >= 1 && gen < ROMAN_NUMERALS.length) return ROMAN_NUMERALS[gen];
  return String(gen);
}

export function formatPokedexNumber(id: number): string {
  return String(id).padStart(3, "0");
}

// PokeAPI returns height in decimeters and weight in hectograms.
export function formatHeight(decimeters?: number): string {
  if (decimeters == null) return "—";
  return `${(decimeters / 10).toFixed(1)} m`;
}

export function formatWeight(hectograms?: number): string {
  if (hectograms == null) return "—";
  return `${(hectograms / 10).toFixed(1)} kg`;
}

// Darken a hex color by `amount` (0..1) → returns rgb() string.
// Used for share-card gradient backgrounds.
export function darkenColor(hex: string, amount: number): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v * (1 - amount))));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}

// Local Pokemon type definition (re-export from PokeAPI client when ready).
export interface Pokemon {
  id: number; // pokedex number
  name: string; // display name, e.g. "Pikachu"
  types: PokemonType[]; // 1 or 2 types; first is primary
  sprite: string; // image URL
  generation: number; // 1..9
  height?: number; // decimeters (PokeAPI)
  weight?: number; // hectograms (PokeAPI)
  abilities?: string[];
  weaknesses?: PokemonType[];
}
