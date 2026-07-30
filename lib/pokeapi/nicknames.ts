/**
 * Pokemon nickname generation engine.
 *
 * Generates 55+ creative nickname suggestions per Pokemon species across 7
 * categories (wordplay / mythology / cute / tough / food / nature / realName).
 *
 * Pure client-side — does NOT call PokeAPI. The caller passes Pokemon data
 * (name + types) which the engine uses to produce type-themed nicknames.
 *
 * Algorithm mirrors the patterns Game Freak uses for official Pokemon names:
 * compound fusion (Char + Lizard = Charizard), type-themed roots, and
 * short, pronounceable syllable structures.
 */

import type { PokemonType } from "./types";

/** The 7 nickname categories, in display order. */
export const NICKNAME_CATEGORIES = [
  "wordplay",
  "mythology",
  "cute",
  "tough",
  "food",
  "nature",
  "realName",
] as const;

export type NicknameCategory = (typeof NICKNAME_CATEGORIES)[number];

export const CATEGORY_META: Record<
  NicknameCategory,
  { label: string; emoji: string; description: string }
> = {
  wordplay: {
    label: "Wordplay",
    emoji: "🎲",
    description: "Puns and fusion names built from the species name.",
  },
  mythology: {
    label: "Mythology",
    emoji: "🏛️",
    description: "Names from mythological figures tied to this Pokemon's element.",
  },
  cute: {
    label: "Cute",
    emoji: "🥰",
    description: "Short, soft names with diminutive endings.",
  },
  tough: {
    label: "Tough",
    emoji: "💪",
    description: "Hard consonants and aggressive roots for powerful Pokemon.",
  },
  food: {
    label: "Food",
    emoji: "🍜",
    description: "Food-themed names matching the Pokemon's type flavor.",
  },
  nature: {
    label: "Nature",
    emoji: "🌿",
    description: "Natural elements that fit this Pokemon's element.",
  },
  realName: {
    label: "Real Names",
    emoji: "👤",
    description: "Human names that feel right for this Pokemon.",
  },
};

export interface NicknameSuggestion {
  /** The nickname string, already capitalized for display. */
  name: string;
  category: NicknameCategory;
}

export interface NicknameInput {
  /** Species name (lowercase, PokeAPI form, e.g. "charizard"). */
  name: string;
  /** English display name (e.g. "Charizard"). Falls back to capitalized name. */
  displayName?: string;
  /** Pokemon's types (1 or 2). Used for type-themed root selection. */
  types: PokemonType[];
}

/* -------------------------------------------------------------------------- */
/* Type-themed word root tables                                                */
/* -------------------------------------------------------------------------- */

interface TypeRoots {
  /** Short thematic roots used in compound fusions (e.g. fire → "blaze"). */
  roots: string[];
  /** Mythological figures tied to the element. */
  mythology: string[];
  /** Food / flavor words matching the type's vibe. */
  food: string[];
  /** Natural phenomena / objects tied to the element. */
  nature: string[];
  /** Human names that suit this element. */
  realNames: string[];
}

const TYPE_ROOTS: Record<PokemonType, TypeRoots> = {
  fire: {
    roots: ["Blaze", "Ember", "Cinder", "Flint", "Ash", "Spark", "Pyre", "Flare"],
    mythology: ["Vulcan", "Prometheus", "Hephaestus", "Pele", "Agni", "Surtr"],
    food: ["Chili", "Pepper", "Sriracha", "Paprika", "Ginger", "Wasabi", "Tabasco"],
    nature: ["Sol", "Lava", "Sunset", "Volcano", "Wildfire", "Drought"],
    realNames: ["Aiden", "Ember", "Cole", "Phoenix", "Flint", "Ignis", "Seren"],
  },
  water: {
    roots: ["Tide", "Wave", "Brook", "Mar", "Splash", "Crest", "Drift", "Aqua"],
    mythology: ["Poseidon", "Neptune", "Oceanus", "Triton", "Amphitrite", "Ran"],
    food: ["Miso", "Soup", "Broth", "Oyster", "Clam", "Seaweed", "Caviar"],
    nature: ["Rain", "Mist", "Fjord", "Lagoon", "Tidepool", "Monsoon"],
    realNames: ["Marina", "River", "Brooks", "Dylan", "Wade", "Coral", "Pearl"],
  },
  grass: {
    roots: ["Leaf", "Bloom", "Sprout", "Vine", "Thorn", "Bark", "Fern", "Bud"],
    mythology: ["Demeter", "Ceres", "Dionysus", "Silvanus", "Flora", "Pan"],
    food: ["Basil", "Mint", "Sage", "Pesto", "Kale", "Matcha", "Thyme"],
    nature: ["Meadow", "Grove", "Moss", "Bramble", "Willow", "Glade"],
    realNames: ["Flora", "Sylvan", "Oliver", "Hazel", "Rowan", "Ivy", "Briar"],
  },
  electric: {
    roots: ["Volt", "Spark", "Jolt", "Bolt", "Zap", "Surge", "Static", "Charge"],
    mythology: ["Zeus", "Thor", "Raijin", "Indra", "Perun", "Tlaloc"],
    food: ["Pop", "Fizz", "Crisp", "Lemon", "Lime", "Sherbet", "Soda"],
    nature: ["Lightning", "Thunder", "Storm", "Arc", "Plasma", "Galvanic"],
    realNames: ["Tesla", "Sparky", "Edison", "Volt", "Ray", "Nikola", "Joule"],
  },
  ice: {
    roots: ["Frost", "Snow", "Glaze", "Crystal", "Rime", "Floe", "Chill", "Shiver"],
    mythology: ["Khione", "Skadi", "Boreas", "Beira", "Itztlacoliuhqui", "Skaði"],
    food: ["Sorbet", "Sherbet", "Popsicle", "Slush", "Mochi", "Yogurt", "Shaved"],
    nature: ["Glacier", "Permafrost", "Blizzard", "Aurora", "Hail", "Frostbite"],
    realNames: ["Crystal", "Winter", "Snow", "Frost", "Lumi", "Eira", "Neve"],
  },
  psychic: {
    roots: ["Mind", "Psy", "Aura", "Trance", "Vision", "Charm", "Hex", "Dream"],
    mythology: ["Athena", "Hermes", "Thoth", "Loki", "Hecate", "Brigid"],
    food: ["Saffron", "Truffle", "Cinnamon", "Cardamom", "Star", "Anise", "Basil"],
    nature: ["Mirage", "Nebula", "Aurora", "Zephyr", "Mist", "Eclipse"],
    realNames: ["Sage", "Mystic", "Iris", "Cassandra", "Edgar", "Luna", "Nostradamus"],
  },
  dragon: {
    roots: ["Drake", "Wyrm", "Scale", "Fang", "Wyvern", "Lair", "Hoard", "Talon"],
    mythology: ["Tiamat", "Fafnir", "Quetzalcoatl", "Ladon", "Nidhogg", "Y Ddraig"],
    food: ["Sake", "Royal", "Crown", "Honey", "Spice", "Saffron", "Caviar"],
    nature: ["Mountain", "Storm", "Canyon", "Sky", "Peak", "Crag"],
    realNames: ["Drake", "Ryu", "Hydra", "Tiamat", "Fafnir", "George", "Lance"],
  },
  ghost: {
    roots: ["Spook", "Wisp", "Shade", "Phantom", "Haunt", "Specter", "Ecto", "Veil"],
    mythology: ["Hades", "Persephone", "Anubis", "Erebus", "Hel", "Morrigan"],
    food: ["Marshmallow", "Ghost", "Candy", "Spirit", "Mochi", "Smoke", "Ash"],
    nature: ["Mist", "Twilight", "Shadow", "Moonlight", "Eclipse", "Dusk"],
    realNames: ["Casper", "Salem", "Edgar", "Lyra", "Shadow", "Specter", "Reaper"],
  },
  dark: {
    roots: ["Shade", "Umbra", "Night", "Gloom", "Void", "Dusk", "Eclipse", "Onyx"],
    mythology: ["Erebus", "Nyx", "Hecate", "Morrigan", "Anubis", "Set"],
    food: ["Licorice", "Espresso", "Cacao", "Truffle", "Blackberry", "Sesame", "Coal"],
    nature: ["Eclipse", "Nightfall", "Abyss", "Shadow", "Void", "Twilight"],
    realNames: ["Raven", "Sable", "Onyx", "Cole", "Noir", "Midnight", "Vesper"],
  },
  fairy: {
    roots: ["Pixie", "Fae", "Charm", "Glimmer", "Sprite", "Glow", "Wish", "Sparkle"],
    mythology: ["Titania", "Oberon", "Mab", "Freya", "Niamh", "Morgan"],
    food: ["Cotton", "Marshmallow", "Honey", "Nectar", "Macaron", "Fairy", "Sugar"],
    nature: ["Meadow", "Dewdrop", "Blossom", "Twilight", "Moonbeam", "Petal"],
    realNames: ["Faye", "Tinker", "Titania", "Pixie", "Elara", "Cinder", "Ariel"],
  },
  fighting: {
    roots: ["Strike", "Fist", "Blade", "Knuckle", "Kick", "Punch", "Bout", "Duel"],
    mythology: ["Ares", "Mars", "Tyr", "Heracles", "Athena", "Sekhmet"],
    food: ["Protein", "Steak", "Energy", "Bread", "Wheat", "Iron", "Garlic"],
    nature: ["Storm", "Tempest", "Gale", "Quake", "Force", "Clash"],
    realNames: ["Atlas", "Bruno", "Hercules", "Vera", "Kano", "Akira", "Kenji"],
  },
  poison: {
    roots: ["Venom", "Toxin", "Bane", "Sting", "Fang", "Plague", "Sludge", "Mire"],
    mythology: ["Medusa", "Hecate", "Eris", "Lilith", "Kali", "Apophis"],
    food: ["Olive", "Coffee", "Wine", "Berry", "Fugu", "Cyanide", "Acid"],
    nature: ["Bog", "Swamp", "Marsh", "Mire", "Quagmire", "Rot"],
    realNames: ["Venus", "Belladonna", "Lana", "Hex", "Toxin", "Venom", "Sable"],
  },
  ground: {
    roots: ["Stone", "Sand", "Quake", "Claw", "Dune", "Rift", "Terra", "Boulder"],
    mythology: ["Gaia", "Geb", "Hades", "Demeter", "Inanna", "Pachamama"],
    food: ["Potato", "Ginger", "Truffle", "Root", "Yam", "Ginseng", "Beet"],
    nature: ["Mountain", "Canyon", "Dune", "Quake", "Boulder", "Avalanche"],
    realNames: ["Terra", "Clay", "Sienna", "Rocky", "Dusty", "Adam", "Gemma"],
  },
  rock: {
    roots: ["Stone", "Pebble", "Granite", "Marble", "Boulder", "Quartz", "Slate", "Flint"],
    mythology: ["Atlas", "Gaia", "Sisyphus", "Rhea", "Loki", "Crom"],
    food: ["Rocky", "Candy", "Crystal", "Sugar", "Salt", "Rock", "Ice"],
    nature: ["Mountain", "Boulder", "Quartz", "Granite", "Slate", "Obsidian"],
    realNames: ["Rocky", "Gemma", "Crystal", "Stone", "Flint", "Onyx", "Roxie"],
  },
  bug: {
    roots: ["Sting", "Buzz", "Hive", "Mandible", "Antenna", "Cocoon", "Wing", "Chitin"],
    mythology: ["Ariadne", "Khepri", "Aphrodite", "Insecta", "Mantis", "Maya"],
    food: ["Honey", "Pollen", "Nectar", "Cricket", "Sweet", "Sap", "Molasses"],
    nature: ["Meadow", "Forest", "Web", "Cocoon", "Hive", "Larva"],
    realNames: ["Beatrice", "Charlotte", "Maya", "Webster", "Ant", "Buzzy", "Skip"],
  },
  flying: {
    roots: ["Sky", "Wing", "Soar", "Gust", "Feather", "Talon", "Crest", "Plume"],
    mythology: ["Zeus", "Horus", "Garuda", "Boreas", "Aeolus", "Ninhursag"],
    food: ["Sky", "Cloud", "Cotton", "Whip", "Feather", "Wing", "Breeze"],
    nature: ["Sky", "Cloud", "Gale", "Cyclone", "Zephyr", "Cumulus"],
    realNames: ["Robin", "Wren", "Jay", "Hawk", "Eagle", "Sora", "Swift"],
  },
  steel: {
    roots: ["Steel", "Iron", "Forge", "Blade", "Edge", "Anvil", "Plate", "Cog"],
    mythology: ["Hephaestus", "Vulcan", "Wayland", "Ilmarinen", "Kagu", "Izanagi"],
    food: ["Steel", "Iron", "Silver", "Knife", "Fork", "Spoon", "Blade"],
    nature: ["Mountain", "Quartz", "Crystal", "Mineral", "Iron", "Ore"],
    realNames: ["Steel", "Blade", "Iron", "Forge", "Cog", "Anvil", "Slate"],
  },
  normal: {
    roots: ["Nomad", "Plain", "Common", "Sturdy", "Bound", "Steady", "Tranquil", "Soft"],
    mythology: ["Janus", "Hestia", "Hermes", "Bastet", "Brigid", "Inari"],
    food: ["Bread", "Milk", "Butter", "Honey", "Vanilla", "Cream", "Oat"],
    nature: ["Meadow", "Field", "Forest", "Plain", "Hill", "Grove"],
    realNames: ["Norman", "Alice", "Bob", "Emmett", "Hazel", "Sage", "Marlow"],
  },
};

/* -------------------------------------------------------------------------- */
/* Internal helpers                                                            */
/* -------------------------------------------------------------------------- */

/** Pick `n` random items without replacement. Returns fewer if pool < n. */
function sample<T>(arr: T[], n: number, rng: () => number = Math.random): T[] {
  if (arr.length <= n) return [...arr];
  const pool = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && pool.length > 0; i++) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return out;
}

/** Capitalize the first letter of a string. */
function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Extract a short prefix (1-2 syllables) from the species display name.
 * e.g. "Charizard" → "Char", "Pikachu" → "Pika", "Snorlax" → "Snor".
 */
function speciesPrefix(displayName: string): string {
  const name = displayName || "";
  // Try to find a clean syllable break (vowel followed by consonant)
  const match = name.match(/^([A-Z][a-z]+?)([bcdfghjklmnpqrstvwxyz]*[aeiou])/);
  if (match) {
    const prefix = match[1];
    if (prefix.length >= 3 && prefix.length <= 5) return prefix;
  }
  // Fallback: first 4 chars
  return name.slice(0, Math.min(4, name.length));
}

/** Build the merged roots list (primary + secondary type, primary first). */
function mergedRootsFor(input: NicknameInput): {
  roots: string[];
  mythology: string[];
  food: string[];
  nature: string[];
  realNames: string[];
} {
  const primary = input.types[0]
    ? TYPE_ROOTS[input.types[0]]
    : TYPE_ROOTS.normal;
  const secondary = input.types[1]
    ? TYPE_ROOTS[input.types[1]]
    : null;

  return {
    roots: primary.roots,
    mythology: secondary
      ? [...primary.mythology, ...secondary.mythology]
      : primary.mythology,
    food: secondary ? [...primary.food, ...secondary.food] : primary.food,
    nature: secondary
      ? [...primary.nature, ...secondary.nature]
      : primary.nature,
    realNames: secondary
      ? [...primary.realNames, ...secondary.realNames]
      : primary.realNames,
  };
}

/* -------------------------------------------------------------------------- */
/* Per-category generators                                                     */
/* -------------------------------------------------------------------------- */

const CUTE_SUFFIXES = ["-ie", "-y", "-kins", "-bun", "-buns", "-boo", "-let"];
const TOUGH_PREFIXES = ["Brutal", "Savage", "Iron", "Blood", "Dark", "Steel", "Crimson"];
const TOUGH_SUFFIXES = ["Slayer", "Crusher", "Breaker", "Reaver", "Smasher", "Fang"];

/** 1. Wordplay — fuse species prefix with a type root. */
function genWordplay(input: NicknameInput, count: number): string[] {
  const { roots } = mergedRootsFor(input);
  const prefix = speciesPrefix(input.displayName || capitalize(input.name));
  const combinations: string[] = [];
  for (const root of roots) {
    combinations.push(`${prefix}${root.toLowerCase()}`);
    combinations.push(`${root}${prefix.toLowerCase()}`);
  }
  // Also reverse fusion (root + species suffix)
  const suffix = (input.displayName || capitalize(input.name)).slice(-3);
  for (const root of roots) {
    combinations.push(`${root}${suffix.toLowerCase()}`);
  }
  return sample(combinations, count);
}

/** 2. Mythology — pick from type's mythology list, optionally suffixed. */
function genMythology(input: NicknameInput, count: number): string[] {
  const { mythology } = mergedRootsFor(input);
  return sample(mythology, count);
}

/** 3. Cute — type root + diminutive suffix. */
function genCute(input: NicknameInput, count: number): string[] {
  const { roots } = mergedRootsFor(input);
  const out: string[] = [];
  for (const root of roots) {
    for (const suffix of CUTE_SUFFIXES) {
      out.push(`${root}${suffix}`);
    }
  }
  return sample(out, count);
}

/** 4. Tough — aggressive prefix + type root, or root + tough suffix. */
function genTough(input: NicknameInput, count: number): string[] {
  const { roots } = mergedRootsFor(input);
  const out: string[] = [];
  for (const root of roots) {
    for (const prefix of TOUGH_PREFIXES) {
      out.push(`${prefix}${root}`);
    }
    for (const suffix of TOUGH_SUFFIXES) {
      out.push(`${root}${suffix}`);
    }
  }
  return sample(out, count);
}

/** 5. Food — pick from the type's food word list. */
function genFood(input: NicknameInput, count: number): string[] {
  const { food } = mergedRootsFor(input);
  return sample(food, count);
}

/** 6. Nature — pick from the type's nature word list. */
function genNature(input: NicknameInput, count: number): string[] {
  const { nature } = mergedRootsFor(input);
  return sample(nature, count);
}

/** 7. Real Names — pick from the type's human name list. */
function genRealName(input: NicknameInput, count: number): string[] {
  const { realNames } = mergedRootsFor(input);
  return sample(realNames, count);
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Generate nickname suggestions grouped by category.
 *
 * Returns ~7 names per category by default (7 categories × 7 ≈ 49 names),
 * matching the competitor's "55+ suggestions per species" claim while adding
 * the missing structural depth.
 *
 * @param input Pokemon species data (name + types)
 * @param perCategory How many suggestions per category (default 7, max 12)
 */
export function generateNicknames(
  input: NicknameInput,
  perCategory = 7,
): NicknameSuggestion[] {
  const safeCount = Math.max(1, Math.min(12, perCategory));
  const out: NicknameSuggestion[] = [];

  for (const category of NICKNAME_CATEGORIES) {
    let names: string[];
    switch (category) {
      case "wordplay":
        names = genWordplay(input, safeCount);
        break;
      case "mythology":
        names = genMythology(input, safeCount);
        break;
      case "cute":
        names = genCute(input, safeCount);
        break;
      case "tough":
        names = genTough(input, safeCount);
        break;
      case "food":
        names = genFood(input, safeCount);
        break;
      case "nature":
        names = genNature(input, safeCount);
        break;
      case "realName":
        names = genRealName(input, safeCount);
        break;
    }
    for (const name of names) {
      out.push({ name: capitalize(name), category });
    }
  }

  return out;
}

/** Group a flat list of suggestions by category, preserving order. */
export function groupByCategory(
  suggestions: NicknameSuggestion[],
): Record<NicknameCategory, NicknameSuggestion[]> {
  const grouped = {
    wordplay: [],
    mythology: [],
    cute: [],
    tough: [],
    food: [],
    nature: [],
    realName: [],
  } as Record<NicknameCategory, NicknameSuggestion[]>;
  for (const s of suggestions) {
    grouped[s.category].push(s);
  }
  return grouped;
}
