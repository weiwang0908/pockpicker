/**
 * SEO content constants for the Pokemon IV Calculator page.
 * Targets keywords: pokemon iv calculator, stat calculator, ivs, evs,
 * stat formula, 0 attack iv, trick room speed.
 */

export const HERO_TAGLINE =
  "Calculate your Pokémon's actual stats at any level. Enter base stats, IVs, EVs, level and nature to get accurate stat values using the Gen 3+ formula — with worked examples and competitive build guides.";

export const WHAT_ARE_IVS_TEXT =
  "Individual Values, or IVs, are hidden numbers between 0 and 31 attached to each of a Pokémon's six stats. They are rolled the moment a Pokémon appears in the wild, hatches from an egg, or is received from an NPC, and they never change for the lifetime of that creature (Hyper Training can mask them, but the underlying IVs stay the same for breeding purposes). At level 100, each IV point translates to exactly one stat point, so a 31-IV Attack Pokémon hits 31 points harder than an identical 0-IV one. IVs are the reason two wild Pidgey caught on the same route can have noticeably different stats after a few levels of training.";

export const WHAT_ARE_EVS_TEXT =
  "Effort Values, or EVs, are the second hidden layer. Every Pokémon you defeat awards EVs of a specific type — defeating a Zubat grants 1 Speed EV, while a Machop grants 1 Attack EV. A single stat can accumulate up to 252 EVs, and a Pokémon can hold at most 510 EVs in total. Since the formula divides EVs by 4, 252 EVs yield 63 extra stat points at level 100 — which is why 252/252/4 is the classic competitive spread. Unlike IVs, EVs are fully under your control: vitamins, feathers, and power items all speed up training, and EV-reducing berries can reset mistakes. If you want to verify your current EVs in-game, most modern titles show an EV graph on the Pokémon's summary screen.";

export const FORMULA_DERIVATION_TEXT =
  "From Generation 3 onward, every mainline Pokémon game uses the same two-part stat formula. For HP, the game computes floor((2 × Base + IV + floor(EV ÷ 4)) × Level ÷ 100) + Level + 10. For the five other stats, it computes floor((floor((2 × Base + IV + floor(EV ÷ 4)) × Level ÷ 100) + 5) × NatureModifier), where the nature modifier is 1.1 for a boosted stat, 0.9 for a reduced stat, and 1.0 otherwise. Two details trip people up constantly. First, EVs are divided by 4 and floored before anything else happens — 255 EVs is a wasted spread because floor(255 ÷ 4) = 63, same as 252. Second, the nature multiplier is applied after the inner flooring, so a 10% boost never produces fractional stats.";

export const WORKED_EXAMPLE_TEXT =
  "Here is the formula applied to a real competitive staple: a level 100 Garchomp with 31 IVs, 252 Speed EVs, and a Jolly nature (+10% Speed). Its base Speed is 102. The inner term is 2 × 102 + 31 + floor(252 ÷ 4) = 204 + 31 + 63 = 298. Scaling by level: 298 × 100 ÷ 100 = 298. Adding the flat 5 gives 303. Finally, Jolly multiplies by 1.1: 303 × 1.1 = 333.3, floored to 333 — exactly the famous 333 Speed stat that lets Jolly Garchomp outrun base 100 scarfers by one point. You can verify every step by entering the same numbers into the calculator above and watching the stat update live.";

export const ZERO_IV_BUILDS_TEXT =
  "Competitive players deliberately hunt for 0 IVs in two stats, which surprises newcomers. A 0 Attack IV minimizes damage taken from Foul Play (which uses the target's own Attack) and from confusion self-hits, so special attackers and stally walls run it whenever possible. A 0 Speed IV, meanwhile, is the backbone of Trick Room teams: in Trick Room, the slowest Pokémon moves first, so a 0-IV, -Speed-nature build turns lumbering giants like Copperajah into lightning-fast sweepers for five turns. Minimum Speed also maximizes Gyro Ball damage, which scales inversely with the user's Speed. Use the calculator to compare a 31-IV build against a 0-IV one before committing to breeding.";

export const MISTAKES_ITEMS = [
  {
    title: "Forgetting the EV floor",
    desc: "EVs are divided by 4 and floored inside the formula. Running 255 EVs instead of 252 wastes 3 points that do absolutely nothing — always spread in multiples of 4.",
  },
  {
    title: "Applying nature to HP",
    desc: "No nature raises or lowers HP. If your hand calculation shows HP changing with nature, you have mixed up the two formulas.",
  },
  {
    title: "Using the wrong formula generation",
    desc: "Generations 1 and 2 used a completely different stat system (DVs from 0-15 and a doubling EV system). This calculator implements the Gen 3+ formula used from Ruby/Sapphire through Scarlet/Violet.",
  },
  {
    title: "Assuming Hyper Training changes IVs",
    desc: "Hyper Training with Bottle Caps boosts a stat as if the IV were 31, but the stored IV stays the same. The effect disappears in level-50 formats' breeding math and does not pass down when breeding.",
  },
  {
    title: "Ignoring level scaling",
    desc: "IV and EV contributions scale linearly with level. A 31-IV advantage is worth about 15 stat points at level 50 but only a few points at level 5 — relevant for Little Cup and low-level Nuzlocke planning.",
  },
];

export const USE_CASE_ITEMS = [
  {
    title: "Competitive team planning",
    desc: "Test whether a chosen EV spread outspeeds a specific threat or survives a calculated hit before spending hours breeding and training.",
  },
  {
    title: "Nuzlocke and playthrough theory-crafting",
    desc: "Estimate how a newly caught Pokémon will perform ten levels from now, and decide whether it deserves a team slot over your current staple.",
  },
  {
    title: "IV checking in-game",
    desc: "Plug in the stats you see on a summary screen, then adjust the IV sliders until the numbers match. The IVs that reproduce the in-game stats are your Pokémon's actual IVs.",
  },
  {
    title: "Comparing natures and builds",
    desc: "Instantly see the difference between Adamant and Jolly on the same base stats, or between 252/252 and a bulk-oriented 252 HP / 4 Atk / 252 Spe spread.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "What are IVs in Pokémon?",
    a: "Individual Values (IVs) are hidden stats ranging from 0 to 31 per stat. They are determined when a Pokémon is encountered and cannot be changed (except via Hyper Training in some games).",
  },
  {
    q: "What are EVs in Pokémon?",
    a: "Effort Values (EVs) are stat points earned by defeating specific Pokémon. Each stat can hold up to 252 EVs, with a total cap of 510 across all stats.",
  },
  {
    q: "How do natures affect stats?",
    a: "Each non-neutral nature increases one stat by 10% and decreases another by 10%. HP is never affected by nature. See our natures chart for the full list.",
  },
  {
    q: "What is a good IV?",
    a: "For competitive play, 31 (a 'perfect' IV) is the target in every stat you use. Attack is the exception for special attackers, where 0 is ideal, and Speed is reversed for Trick Room builds.",
  },
  {
    q: "How do I check my Pokémon's IVs in-game?",
    a: "In Scarlet/Violet, the Judge function unlocks after finishing the postgame and shows a rating per stat. Alternatively, enter your Pokémon's visible stats, level, nature and known EVs into this calculator and solve for the IVs.",
  },
  {
    q: "Does Hyper Training change IVs?",
    a: "No. Hyper Training sets a stat to behave as if its IV were 31, but the underlying IV value is unchanged — important if you plan to breed that Pokémon afterward.",
  },
  {
    q: "Why does 252 EVs give 63 stat points and not 252?",
    a: "The stat formula divides EVs by 4 and floors the result before adding it to the stat. That is also why running more than 252 EVs in one stat is always wasted.",
  },
  {
    q: "Do IVs matter for casual play?",
    a: "Less than competitive players fear. A 20-IV team clears any story mode comfortably. IVs mainly matter at level 50 competitive formats, Battle Tower-style streaks, and online ranked play.",
  },
];
