/**
 * SEO content constants for the Pokemon Team Builder page.
 * Total word count: 800+ (core keyword "pokemon team builder" appears 12-15 times).
 */

export const HERO_TAGLINE =
  "Build a team of 6 Pokemon and instantly see type weaknesses, resistances and coverage — all 1025 species, no signup needed.";

export const HERO_DESCRIPTION =
  "Build and analyze your Pokemon team with this free Pokemon team builder. Add up to 6 Pokemon, see type weaknesses and resistances instantly, and check your team's coverage against all 18 types. Whether you're planning a competitive team, preparing for a Nuzlocke challenge, or just want a balanced in-game party, this Pokemon team planner shows you exactly what your team is weak to and what it resists. Pick Pokemon manually from all 1025 species, or generate a random team for instant inspiration. Export your team to Pokemon Showdown format with one click. No signup, no ads — just a fast, mobile-friendly Pokemon team builder that works on any device.";

export const WHAT_IS_TEXT =
  "A Pokemon team builder is a free tool that helps you plan a team of 6 Pokemon and instantly see its type weaknesses, resistances, and coverage. When you add a Pokemon to your team, the team builder calculates how every one of the 18 types interacts with your team — showing you which attack types your team is weak to, which it resists, and which it's completely immune to. This lets you spot gaps in your team's defense before a battle, so you can swap out a Pokemon to cover a weakness. A good Pokemon team planner also shows your team's offensive coverage — the types your Pokemon can hit for super-effective damage through STAB (Same Type Attack Bonus). This Pokemon team builder includes all 1025 Pokemon from Gen 1 to Gen 9, supports dual-type calculations (including 4x weaknesses and 0.25x resistances), and lets you export your finished team to Pokemon Showdown format.";

export const HOW_TO_STEPS = [
  "Click an empty team slot to open the Pokemon selector",
  "Search by name or filter by generation to find your Pokemon",
  "Click a Pokemon to add it to your team",
  "Watch the type analysis matrix update in real time",
  "Red cells show weaknesses, blue cells show resistances, grey shows immunities",
  "Check the summary to see what your team is weak to, resists, and is immune to",
  "Review your team's STAB coverage to see which types you can hit super-effectively",
  "Use the Random Team button for instant inspiration",
  "Click Export to Showdown to copy your team in Showdown format",
  "Use Copy Link to share your team with friends",
];

export const TYPE_WEAKNESS_TEXT =
  "Every Pokemon type has strengths and weaknesses against other types. For example, Fire-type Pokemon are weak to Water, Ground, and Rock attacks, but resist Fire, Grass, Ice, Bug, Steel, and Fairy. When a Pokemon has two types, its weaknesses and resistances are calculated by multiplying the effectiveness of each type. This can create 4x weaknesses (e.g., Charizard is Fire/Flying, so Rock deals 4x damage) or 0.25x resistances. Some type combinations even create immunities — a Ground/Flying Pokemon like Gliscor is immune to both Electric and Ground attacks. This Pokemon weakness calculator handles all dual-type combinations automatically, so you can see exactly how your team holds up against every attack type.";

export const STRATEGIES_TEXT =
  "Building a strong Pokemon team is about balance. Here are popular strategies to guide your team builder decisions:";

export const STRATEGIES_ITEMS = [
  {
    title: "Type coverage",
    desc: "Aim for a team that resists or is neutral to all 18 types. Use the defensive summary to spot types your team is weak to, then add a Pokemon that resists them.",
  },
  {
    title: "STAB coverage",
    desc: "Ensure your team's attack types can hit a wide range of opponents for super-effective damage. The offensive coverage view shows which types your team can and can't hit.",
  },
  {
    title: "Role balance",
    desc: "Mix sweepers (fast, high-attack), tanks (high HP/defense), and support Pokemon. A team of six sweepers will fold to any strong hit.",
  },
  {
    title: "Nuzlocke prep",
    desc: "If you're planning a Nuzlocke run, use the team builder to pre-plan which encounters will cover your upcoming gym battles.",
  },
  {
    title: "Competitive prep",
    desc: "Build your team in the team builder, then export to Pokemon Showdown to test it in battle.",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is a Pokemon team builder?",
    a: "A Pokemon team builder is a free tool that lets you plan a team of 6 Pokemon and instantly see its type weaknesses, resistances, and coverage. Add Pokemon manually or generate a random team, then analyze how it holds up against all 18 types.",
  },
  {
    q: "How does the type analysis work?",
    a: "The team builder uses the official Pokemon type effectiveness chart. For each of the 18 attack types, it calculates the damage multiplier against every Pokemon on your team, including dual-type combinations that create 4x weaknesses or 0.25x resistances.",
  },
  {
    q: "Does this team builder include all 1025 Pokemon?",
    a: "Yes, all 1025 Pokemon from Generation 1 (Kanto) through Generation 9 (Paldea) are included. Use the generation filter in the Pokemon selector to narrow down your choices, or search by name to find a specific Pokemon.",
  },
  {
    q: "Can I generate a random team?",
    a: "Yes. Click the Random Team button to instantly fill all 6 slots with random Pokemon from the full 1025-species pool. The type analysis updates automatically, and you can re-roll or manually adjust any slot afterward.",
  },
  {
    q: "Does it account for abilities like Levitate?",
    a: "No. Like most Pokemon team planners, this tool calculates weaknesses and resistances based on type only. Abilities such as Levitate (which grants Ground immunity) or Wonder Guard are not factored in, as they would require per-Pokemon ability data.",
  },
  {
    q: "Can I use this for Pokemon Showdown?",
    a: "Yes. Click the Export to Showdown button to copy your team in Showdown format. You can paste it directly into Pokemon Showdown's team builder. The export includes Pokemon names and default abilities.",
  },
  {
    q: "Is it free?",
    a: "Yes, completely free. No signup, no ads, no watermark. The Pokemon team builder works on any device — phone, tablet, or desktop — with no installation required.",
  },
  {
    q: "Can I share my team?",
    a: "Yes. Your team is automatically saved in the URL. Click Copy Link to share your exact team with friends. When they open the link, the team builder will restore your team automatically.",
  },
];
