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
  "The Pokemon natures chart is a 5x5 grid that maps every nature to the stat it increases (rows) and the stat it decreases (columns). The five stats are Attack, Defense, Special Attack, Special Defense, and Speed. Reading the nature chart for Pokemon is simple: find the row for the stat you want to increase, then find the column for the stat you're willing to decrease, and the cell gives you the nature name. The diagonal of the chart (where the increased and decreased stat are the same) contains the five neutral natures — Hardy, Docile, Bashful, Quirky, and Serious — which have no effect on stats. This Pokemon nature chart also shows each nature's flavor preferences, which determine which berries a Pokemon likes and dislikes. You can also scroll down to the full Pokemon natures chart list below, which lays out all 25 natures in a simple table with their stat changes and flavor preferences. Use the interactive chart above to click any cell and see the full details for that nature.";

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
  {
    q: "What do natures do in Pokemon?",
    a: "Natures in Pokemon increase one stat by 10% and decrease another by 10%. For example, the Adamant nature raises Attack by 10% and lowers Special Attack by 10%. This means a level 100 Pokemon with Adamant will have 10% more Attack and 10% less Special Attack than one with a neutral nature. Five neutral natures (Hardy, Docile, Bashful, Quirky, Serious) raise and lower the same stat, so they have no effect.",
  },
  {
    q: "Does nature matter in Pokemon?",
    a: "Yes, nature matters a lot in competitive battles and post-game content, where a 10% stat difference can decide who goes first or survives a hit. In casual story playthroughs, nature is less critical since the main game is balanced for any team, but a good nature still makes your Pokemon noticeably stronger. If you play competitively or tackle battle facilities, choosing the right nature is essential.",
  },
  {
    q: "What is the best nature in Pokemon?",
    a: "There is no single best nature — it depends entirely on your Pokemon's base stats and battle role. Adamant and Jolly are best for physical attackers, Modest and Timid for special attackers, and Bold or Calm for defensive walls. Use the best nature recommender above to get a personalized recommendation for any Pokemon based on its base stats.",
  },
  {
    q: "Do natures work the same in Pokemon Emerald, Gen 3, and SoulSilver?",
    a: "Yes. Natures were introduced in Generation 3 (Ruby, Sapphire, and Emerald) and work identically in Gen 3, Gen 4 (Diamond, Pearl, Platinum, HeartGold, SoulSilver), and every generation since. The same 25 natures with the same stat changes apply across all games. The only addition in later games (Sword and Shield onward) is Mints, which let you change a Pokemon's effective nature without breeding.",
  },
  {
    q: "How do I read the Pokemon nature chart?",
    a: "The nature chart is a 5x5 grid. Rows represent the stat that increases (+10%), and columns represent the stat that decreases (-10%). Find the row for the stat you want to boost, then find the column for the stat you don't mind lowering — the cell where they intersect is the nature name. The diagonal cells (where the same stat is both increased and decreased) are the five neutral natures with no net effect.",
  },
];

/**
 * Detailed content for individual natures that have search volume.
 * Rendered as anchored sections so Google can index each nature by name.
 */
export interface NatureDetail {
  /** nature name (lowercase, used as anchor id) */
  name: string;
  displayName: string;
  /** short effect summary, e.g. "+Attack, -Special Attack" */
  effectSummary: string;
  /** 1-2 sentence description of what the nature does */
  description: string;
  /** Pokemon that benefit from this nature */
  bestFor: string;
  /** when you should pick this nature */
  whenToUse: string;
  /** comparison with a similar nature */
  comparison: string;
}

export const NATURE_DETAILS: NatureDetail[] = [
  {
    name: "adamant",
    displayName: "Adamant",
    effectSummary: "+10% Attack, -10% Special Attack",
    description:
      "Adamant is a Pokemon nature that raises Attack by 10% and lowers Special Attack by 10%. It is the most popular nature for physical attackers — Pokemon that deal damage with physical moves like Earthquake, Close Combat, or Outrage. By boosting Attack and dropping Special Attack (which physical attackers rarely use), Adamant maximizes damage output without any real downside.",
    bestFor:
      "Adamant is best for physical attackers with high base Attack, including Garchomp, Tyranitar, Scizor, Metagross, Dragonite, Lucario, and Excadrill. These Pokemon rely on physical moves and almost never use Special Attack, so the -10% penalty is effectively free.",
    whenToUse:
      "Choose Adamant when your Pokemon has a higher Attack stat than Special Attack and you want maximum damage output. If your Pokemon is already fast enough to outspeed key threats, Adamant is usually better than Jolly because the extra Attack pays off in every matchup.",
    comparison:
      "Adamant vs Jolly: Both are great for physical attackers. Adamant gives +10% Attack (more damage), while Jolly gives +10% Speed (outspeed opponents). Pick Adamant if your Pokemon is already fast or tanky; pick Jolly if you need to win speed ties against common threats.",
  },
  {
    name: "modest",
    displayName: "Modest",
    effectSummary: "+10% Special Attack, -10% Attack",
    description:
      "Modest is a Pokemon nature that raises Special Attack by 10% and lowers Attack by 10%. It is the go-to nature for special attackers — Pokemon that deal damage with special moves like Surf, Thunderbolt, or Psychic. Since special attackers rarely use physical moves, the Attack penalty is negligible, making Modest a pure upgrade for damage.",
    bestFor:
      "Modest is best for special attackers with high base Special Attack, including Alakazam, Gengar, Togekiss, Magnezone, Espeon, Gardevoir, and Volcarona. These Pokemon use special moves exclusively and don't need Attack at all.",
    whenToUse:
      "Choose Modest when your Pokemon has higher Special Attack than Attack and you want maximum special damage. If your Pokemon is fast enough on its own, Modest is preferable to Timid because the extra Special Attack means more damage in every battle.",
    comparison:
      "Modest vs Timid: Both suit special attackers. Modest boosts Special Attack (+10% damage), while Timid boosts Speed (+10% to outspeed). Pick Modest when your Pokemon is already fast; pick Timid when you need to outspeed specific threats like opposing Garchomp or Dragapult.",
  },
  {
    name: "jolly",
    displayName: "Jolly",
    effectSummary: "+10% Speed, -10% Special Attack",
    description:
      "Jolly is a Pokemon nature that raises Speed by 10% and lowers Special Attack by 10%. It is the most popular Speed nature for physical attackers — by boosting Speed, your Pokemon gets to attack first, which can be the difference between winning and losing. The Special Attack penalty is irrelevant for physical attackers.",
    bestFor:
      "Jolly is best for fast physical attackers that need to outspeed opponents, including Weavile, Aerodactyl, Garchomp, Lopunny, Scolipede, and Hawlucha. It is also common on Pokemon with high base Speed that need to win speed ties against other fast threats.",
    whenToUse:
      "Choose Jolly when your physical attacker needs to outspeed a specific threat — for example, Jolly Garchomp outspeeds neutral-nature base 100 Speed Pokemon. If winning the speed race is more important than raw damage, Jolly is the right choice. If your Pokemon is slow anyway (like Snorlax), Jolly won't help — use Adamant instead.",
    comparison:
      "Jolly vs Adamant: Both boost physical attackers. Jolly gives +10% Speed (attack first), Adamant gives +10% Attack (more damage). Pick Jolly when you need to outspeed key opponents; pick Adamant when your Pokemon is already fast or when extra damage matters more than speed.",
  },
  {
    name: "timid",
    displayName: "Timid",
    effectSummary: "+10% Speed, -10% Attack",
    description:
      "Timid is a Pokemon nature that raises Speed by 10% and lowers Attack by 10%. It is the most popular Speed nature for special attackers — the Speed boost lets your Pokemon attack first, and the Attack penalty is irrelevant since special attackers use Special Attack, not Attack.",
    bestFor:
      "Timid is best for fast special attackers that need speed control, including Greninja, Dragapult, Gengar, Espeon, Noivern, and Accelgor. It is essential on special attackers that compete in the base 100+ Speed tier where every point matters.",
    whenToUse:
      "Choose Timid when your special attacker needs to outspeed specific threats. For example, Timid Greninja outspeeds Adamant Garchomp. If your Pokemon is already fast enough with a neutral nature, Modest may be better for extra damage. But in competitive play, going first often means surviving.",
    comparison:
      "Timid vs Modest: Both suit special attackers. Timid gives +10% Speed (attack first), Modest gives +10% Special Attack (more damage). Pick Timid when you need to win speed ties; pick Modest when your Pokemon is already fast and extra damage is more valuable.",
  },
  {
    name: "naive",
    displayName: "Naive",
    effectSummary: "+10% Speed, -10% Special Defense",
    description:
      "Naive is a Pokemon nature that raises Speed by 10% and lowers Special Defense by 10%. It is a niche nature used primarily by mixed attackers — Pokemon that use both physical and special moves. Unlike Jolly (which drops Special Attack) or Hasty (which drops Defense), Naive drops Special Defense, preserving both Attack and Special Attack for mixed sets.",
    bestFor:
      "Naive is best for fast mixed attackers, including Greninja (who uses both physical and special moves), Infernape, and Deoxys-S. It is also used on Pokemon that need Speed but don't want to sacrifice either offensive stat, accepting weaker Special Defense as a tradeoff.",
    whenToUse:
      "Choose Naive when your Pokemon uses both physical and special attacks and needs Speed. This is rare — most Pokemon are better off with a dedicated nature like Jolly or Timid. Naive is a specialist choice for mixed attackers that can't afford to lose either Attack or Special Attack.",
    comparison:
      "Naive vs Jolly: Both boost Speed. Naive drops Special Defense (keeps both Attack and Sp. Atk), while Jolly drops Special Attack. Pick Naive for mixed attackers that use both move types; pick Jolly for pure physical attackers that don't need Special Attack at all.",
  },
  {
    name: "hardy",
    displayName: "Hardy",
    effectSummary: "Neutral (no stat change)",
    description:
      "Hardy is a neutral Pokemon nature that increases and decreases Attack by 10%, resulting in no net stat change. It is one of five neutral natures (along with Docile, Bashful, Quirky, and Serious). Hardy has no effect on a Pokemon's stats and is generally avoided in competitive play where every stat point matters.",
    bestFor:
      "Hardy is not recommended for competitive battles — a nature that actually boosts a useful stat will always be better. However, Hardy is perfectly fine for casual playthroughs where the story is balanced for any team and the 10% difference is negligible.",
    whenToUse:
      "Use Hardy only if you don't care about optimization, such as during a casual playthrough or a Nuzlocke challenge where you work with what you catch. For any competitive or post-game content, switch to a nature that boosts your Pokemon's key stat.",
    comparison:
      "Hardy vs Adamant: Hardy is neutral (no boost), Adamant gives +10% Attack. For any physical attacker, Adamant is strictly better. The only reason to use Hardy is if you can't change the nature and don't want to breed or use Mints.",
  },
  {
    name: "brave",
    displayName: "Brave",
    effectSummary: "+10% Attack, -10% Speed",
    description:
      "Brave is a Pokemon nature that raises Attack by 10% and lowers Speed by 10%. It is the nature of choice for Trick Room teams, where being slow is actually an advantage — Trick Room makes the slower Pokemon attack first. Brave maximizes Attack while making the Pokemon even slower, which is ideal under Trick Room.",
    bestFor:
      "Brave is best for slow physical attackers on Trick Room teams, including Rhyperior, Snorlax, Escavalier, Copperajah, and Hatterene. These Pokemon have low base Speed anyway, so the -10% Speed penalty is harmless and the +10% Attack boost is pure gain.",
    whenToUse:
      "Choose Brave when building a Trick Room team or when your Pokemon is so slow that Speed doesn't matter. Brave is also viable on Gyro Ball users, where lower Speed means higher Gyro Ball damage. Never use Brave on fast physical attackers — use Adamant or Jolly instead.",
    comparison:
      "Brave vs Adamant: Both boost Attack. Brave drops Speed (good for Trick Room, bad otherwise), Adamant drops Special Attack (almost always better for physical attackers). Pick Brave only for Trick Room; pick Adamant for everything else.",
  },
  {
    name: "quiet",
    displayName: "Quiet",
    effectSummary: "+10% Special Attack, -10% Speed",
    description:
      "Quiet is a Pokemon nature that raises Special Attack by 10% and lowers Speed by 10%. Like Brave, it is primarily used on Trick Room teams where low Speed becomes an advantage. Quiet maximizes Special Attack for slow special attackers that benefit from attacking first under Trick Room.",
    bestFor:
      "Quiet is best for slow special attackers on Trick Room teams, including Magearna, Reuniclus, Slowking, Hatterene, and Torkoal. These Pokemon have low base Speed, so the penalty is irrelevant and the Special Attack boost is valuable.",
    whenToUse:
      "Choose Quiet when building a Trick Room team, or when your special attacker is so slow that Speed doesn't matter. Quiet is also useful on Gyro Ball users that deal special damage. Never use Quiet on fast special attackers — use Modest or Timid instead.",
    comparison:
      "Quiet vs Modest: Both boost Special Attack. Quiet drops Speed (good for Trick Room), Modest drops Attack (better for almost everything else). Pick Quiet only for Trick Room teams; pick Modest for regular special attackers.",
  },
  {
    name: "mild",
    displayName: "Mild",
    effectSummary: "+10% Special Attack, -10% Defense",
    description:
      "Mild is a Pokemon nature that raises Special Attack by 10% and lowers Defense by 10%. It is a less common alternative to Modest, used when you want to boost Special Attack but don't want to drop the Attack stat — for example, on Pokemon that sometimes use physical coverage moves. The tradeoff is reduced physical bulk.",
    bestFor:
      "Mild is occasionally used on special attackers that want to keep their Attack stat for coverage moves, or on mixed attackers with a special bias. Examples include Infernape and some Lucario sets. However, most special attackers are better off with Modest, which drops the completely unused Attack stat.",
    whenToUse:
      "Choose Mild only when your special attacker uses a physical coverage move that matters and you want to preserve Attack. In most cases, Modest is strictly better because it drops Attack (which special attackers don't use) instead of Defense (which every Pokemon uses to survive physical hits).",
    comparison:
      "Mild vs Modest: Both boost Special Attack. Mild drops Defense (you get hit harder by physical moves), Modest drops Attack (irrelevant for special attackers). Almost always pick Modest — only consider Mild if your special attacker needs a physical coverage move.",
  },
  {
    name: "careful",
    displayName: "Careful",
    effectSummary: "+10% Special Defense, -10% Special Attack",
    description:
      "Careful is a Pokemon nature that raises Special Defense by 10% and lowers Special Attack by 10%. It is a defensive nature used on special walls and tanks — Pokemon designed to absorb special hits. By boosting Special Defense and dropping Special Attack (which most walls don't use), Careful improves survivability without sacrificing offensive capability on the physical side.",
    bestFor:
      "Careful is best for special walls and tanks that prioritize Special Defense bulk, including Blissey, Goodra, Snorlax, Umbreon, and Tyranitar. These Pokemon need to survive special attacks and typically use physical moves or status moves, so the Special Attack penalty is negligible.",
    whenToUse:
      "Choose Careful when your Pokemon is a defensive wall that takes special hits and uses physical moves or status moves. If your wall uses special attacks, consider Calm instead (which drops Attack). Careful is common on Pokemon like Tyranitar that are physical attackers but also want extra Special Defense to survive special hits.",
    comparison:
      "Careful vs Calm: Both boost Special Defense. Careful drops Special Attack (good for physical walls), Calm drops Attack (good for special walls). Pick Careful if your wall uses physical moves; pick Calm if your wall uses special moves or doesn't attack at all.",
  },
];

