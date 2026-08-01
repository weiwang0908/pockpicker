/**
 * SEO content constants for the Pokemon Type Chart page.
 * Targets keywords: pokemon type chart, type weakness, type effectiveness, type matchups.
 */

export const HERO_TAGLINE =
  "Complete Pokemon type chart for all 18 types. Check attack effectiveness, defensive weaknesses, and dual-type matchups in one interactive table.";

export const WHAT_IS_TEXT =
  "The Pokemon type chart is the core battle mechanic that determines how much damage one type deals to another. Every Pokemon has one or two types, and every attack has a type. When an attack type meets a defending type, the game applies a multiplier based on the type matchup: super-effective moves deal 2x damage (or 4x against a dual-type with two weaknesses), not-very-effective moves deal 0.5x (or 0.25x), and immune matchups deal no damage at all. This Pokemon type weakness chart covers all 18 types from Normal to Fairy across generations 1 to 9, so you can quickly look up whether Fire beats Grass, why Electric can't hit Ground, or how Steel resists so many types. Use it to plan teams, build coverage, or settle type-matchup debates.";

export const HOW_TO_READ_STEPS = [
  "Find the attacking type along the left column or select it in the interactive tool.",
  "Find the defending type across the top row or select it as the defender.",
  "Read the cell where the row and column meet: 2x means super effective, 0.5x means resisted, 0x means immune, and 1x means neutral damage.",
  "For dual-type Pokemon, multiply the two individual multipliers together. For example, Water (2x) against Ground/Rock (both weak) gives 4x damage.",
];

export const DUAL_TYPE_TEXT =
  "Dual-type Pokemon combine the matchups of both types, which can create dramatic strengths and weaknesses. A Ground/Electric type like Stunfisk is immune to Electric because Ground grants immunity, even though Electric normally resists itself. A Bug/Steel type picks up Fire's 4x weakness while gaining many resistances. When building a team, always consider the full defensive profile, not just one type.";

export const COMPETITIVE_TEXT =
  "In competitive play, the type chart drives almost every team decision. Offensive coverage means your team can hit common threats for super-effective damage. Defensive synergy means your resistances and immunes cover each other's weaknesses. A well-built team resists or immune to the types it is weak to, so one Pokemon's vulnerability is another's strength.";

export const COMPETITIVE_ITEMS = [
  {
    title: "STAB and coverage",
    desc: "Same-Type Attack Bonus (STAB) gives a 1.5x damage boost when a Pokemon uses a move matching its own type. Combine STAB with coverage moves that hit your counters super-effectively.",
  },
  {
    title: "Immunities reset momentum",
    desc: "Ground, Ghost, Normal, Fighting, Psychic, Dragon, and Poison all have 0x immunes. Switching an immune Pokemon into a predicted attack gives a free turn.",
  },
  {
    title: "Watch for 4x weaknesses",
    desc: "Dual-types like Ice/Grass or Rock/Ground can take 4x damage from a single type, making them easy to wall-break if you don't cover the weakness.",
  },
  {
    title: "Resist stacking",
    desc: "A team with multiple Steel types can wall many common attacking types, but shared Fire and Fighting weaknesses can be exploited if not covered.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "What is the Pokemon type chart?",
    a: "The Pokemon type chart shows how every attacking type interacts with every defending type. It determines whether a move is super effective (2x), not very effective (0.5x), immune (0x), or neutral (1x).",
  },
  {
    q: "How do dual-type Pokemon calculate weaknesses?",
    a: "Multiply the two type multipliers. If both types are weak to the attack, the result is 4x. If one is weak and one resists, they cancel to 1x. If either type is immune, the result is 0x.",
  },
  {
    q: "Which type has the most weaknesses?",
    a: "Ice and Rock are among the most vulnerable types, each weak to four common attacking types. Grass is also weak to five types, making it defensively challenging.",
  },
  {
    q: "Which type is immune to the most types?",
    a: "Normal is immune to Ghost, Ghost is immune to Normal and Fighting, Flying is immune to Ground, Ground is immune to Electric, Steel is immune to Poison, Fairy is immune to Dragon, and Dark is immune to Psychic.",
  },
  {
    q: "Does STAB stack with super-effective damage?",
    a: "Yes. STAB gives a 1.5x multiplier and super-effective gives 2x (or 4x), so a STAB super-effective move can deal massive damage. The multipliers are applied together.",
  },
  {
    q: "Is this type chart up to date for Gen 9?",
    a: "Yes. The chart includes all 18 types and follows the official type effectiveness rules through Generation 9, including the Fairy type introduced in Gen 6.",
  },
];
