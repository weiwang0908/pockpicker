/**
 * SEO content constants for the Pokemon Natures page.
 * Total word count: 800+ (core keyword "pokemon natures" appears 12-15 times).
 */

export const HERO_TAGLINE =
  "All 25 Pokemon natures explained — search, filter, and find the best nature for any Pokemon based on its base stats.";

export const HERO_DESCRIPTION =
  "Pokemon natures are a core mechanic that determines how your Pokemon's stats grow. Each of the 25 natures raises one stat by 10% and lowers another by 10%, letting you optimize your Pokemon for its role. This Pokemon natures guide lists all 25 natures in a searchable chart, shows which stat each one increases and decreases, and recommends the best nature for any Pokemon based on its base stats. Whether you're building a competitive team, planning an in-game playthrough, or just want to understand what Adamant or Modest actually does, this Pokemon nature list has you covered. Search by name, filter by stat, or use the best nature recommender to find the perfect nature for your Pokemon — free, no signup, works on any device.";

export const WHAT_IS_TEXT =
  "Pokemon natures are a personality mechanic introduced in Generation 3 (Ruby and Sapphire) that affects how a Pokemon's stats grow. Each Pokemon has one nature, randomly assigned, chosen from 25 possible natures. Each nature increases one of five battle stats — Attack, Defense, Special Attack, Special Defense, or Speed — by 10%, and decreases another by 10% (by the time the Pokemon reaches level 100). Five of the 25 natures increase and decrease the same stat, so they have no effect — these are called neutral natures (Hardy, Docile, Bashful, Quirky, and Serious). Understanding Pokemon natures is essential for competitive play and efficient in-game team building, because the right nature can give your Pokemon a meaningful edge in battle. For example, a physical attacker like Garchomp benefits from an Adamant nature (Attack up, Special Attack down) because it boosts its strongest stat while lowering a stat it rarely uses. This Pokemon natures guide covers all 25 natures and helps you pick the best one for any Pokemon.";

export const HOW_TO_STEPS = [
  "Identify your Pokemon's role — physical attacker, special attacker, tank, or speed control",
  "Compare Attack vs Special Attack — higher Attack means physical, higher Special Attack means special",
  "Pick the boost — physical attackers want Adamant (+Atk) or Jolly (+Spe); special attackers want Modest (+SpA) or Timid (+Spe)",
  "Sacrifice the unused stat — physical attackers drop Special Attack; special attackers drop Attack",
  "Use the recommender above — enter your Pokemon to get the best nature automatically based on its base stats",
];

export const NATURE_CHART_TEXT =
  "The Pokemon nature chart is a 5x5 grid that maps every nature to the stat it increases (rows) and the stat it decreases (columns). The five stats are Attack, Defense, Special Attack, Special Defense, and Speed. Reading the chart is simple: find the row for the stat you want to increase, then find the column for the stat you're willing to decrease, and the cell gives you the nature name. The diagonal of the chart (where the increased and decreased stat are the same) contains the five neutral natures — Hardy, Docile, Bashful, Quirky, and Serious — which have no effect on stats. This Pokemon nature chart also shows each nature's flavor preferences, which determine which berries a Pokemon likes and dislikes. Use the interactive chart above to click any cell and see the full details for that nature.";

export const COMPETITIVE_TEXT =
  "In competitive Pokemon, the best natures are the ones that maximize your Pokemon's effectiveness in its role. Here are the most popular competitive natures and when to use them:";

export const COMPETITIVE_ITEMS = [
  {
    title: "Adamant (+Atk / -SpA)",
    desc: "The go-to nature for physical attackers like Garchomp, Tyranitar, and Scizor. Maximizes physical damage output.",
  },
  {
    title: "Modest (+SpA / -Atk)",
    desc: "The choice for special attackers like Alakazam, Gengar, and Togekiss. Boosts special damage while dropping the unused Attack.",
  },
  {
    title: "Jolly (+Spe / -SpA)",
    desc: "For fast physical attackers that need to outspeed opponents, like Weavile or Aerodactyl. Speed ties win games.",
  },
  {
    title: "Timid (+Spe / -Atk)",
    desc: "For fast special attackers that need speed control, like Greninja or Dragapult. Outspeeds opposing sweepers.",
  },
  {
    title: "Bold (+Def / -Atk)",
    desc: "For physical walls and tanks like Blissey or Skarmory that need extra Defense to take physical hits.",
  },
  {
    title: "Calm (+SpD / -Atk)",
    desc: "For special walls that prioritize Special Defense bulk, like Blissey or Goodra in special sets.",
  },
];

export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What are Pokemon natures?",
    a: "Pokemon natures are a mechanic introduced in Generation 3 that affects stat growth. Each of the 25 natures raises one stat by 10% and lowers another by 10%. Five neutral natures raise and lower the same stat, having no effect. The right nature gives your Pokemon a meaningful battle advantage.",
  },
  {
    q: "How many Pokemon natures are there?",
    a: "There are 25 Pokemon natures in total. Twenty of them increase one stat while decreasing a different stat, and five are neutral (Hardy, Docile, Bashful, Quirky, Serious) that increase and decrease the same stat, resulting in no net change.",
  },
  {
    q: "What is the best nature for my Pokemon?",
    a: "The best nature depends on your Pokemon's base stats and role. Physical attackers benefit from Adamant or Jolly, special attackers from Modest or Timid, and tanks from Bold or Calm. Use the best nature recommender above to get a personalized recommendation for any Pokemon.",
  },
  {
    q: "Do natures matter for casual play?",
    a: "For casual in-game playthroughs, natures have a smaller impact since the main story is beatable with any team. However, choosing a good nature still makes your Pokemon noticeably stronger, and it becomes essential for post-game content, battle facilities, and competitive play.",
  },
  {
    q: "What do neutral natures do?",
    a: "Neutral natures (Hardy, Docile, Bashful, Quirky, Serious) increase and decrease the same stat, so they have no effect on a Pokemon's stat growth. They're generally avoided in competitive play, where every stat point matters, but they're harmless in casual play.",
  },
  {
    q: "Can I change a Pokemon's nature?",
    a: "In Pokemon Sword and Shield onward, you can use Mints to change a Pokemon's effective nature without changing its actual nature. Mints apply the stat changes of a different nature, letting you correct a bad nature without breeding. Earlier games require breeding to get the desired nature.",
  },
  {
    q: "How do natures affect berries and flavors?",
    a: "Each Pokemon nature determines which berry flavors the Pokemon likes and dislikes. The five flavors map to the five stats: Spicy (Attack), Sour (Defense), Sweet (Speed), Dry (Special Attack), and Bitter (Special Defense). A nature's liked flavor matches its increased stat, and its disliked flavor matches its decreased stat.",
  },
  {
    q: "Are natures the same in every Pokemon game?",
    a: "Yes, the 25 natures and their effects have remained the same since their introduction in Generation 3 (Ruby and Sapphire). While later games added Mints to change a Pokemon's effective nature, the nature system itself — all 25 natures and their stat modifications — is identical across every generation from Gen 3 onward.",
  },
];
