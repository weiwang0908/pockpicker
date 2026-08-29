/**
 * SEO content constants for the Who's That Pokémon game page.
 * Targets keywords: who's that pokemon, pokemon silhouette quiz,
 * pokemon guessing game, identify pokemon by silhouette.
 */

export const HERO_TAGLINE =
  "Guess the Pokémon from its silhouette, pick the right name from four options, and build your streak — all 1025 species, from Bulbasaur to Pecharunt.";

export const HISTORY_TEXT =
  "\"Who's That Pokémon?\" began as a recurring segment in the original 1997 Pokémon anime broadcast: right before each commercial break, the show froze on a black silhouette, and viewers had to shout their guess before the colorful reveal after the ads. It became one of the most parodied formats in anime history, and the English dub's iconic answer chant — \"It's Pikachu!\" — turned a simple guessing game into a shared cultural memory. The format works because a silhouette strips away color, texture, and context, forcing your brain to rely on pure shape recognition — the same skill real trainers build when they learn to identify species at a glance in tall grass.";

export const HOW_TO_PLAY_STEPS = [
  "Study the black silhouette shown on screen — pay attention to overall proportion before fine details.",
  "Choose the correct Pokémon name from the four options before answering.",
  "Correct answers increase your score and your streak; a wrong answer resets the streak.",
  "Use Skip if you're completely stuck — a new Pokémon will appear immediately.",
  "There's no time limit, so take your time and have fun!",
];

export const DIFFICULTY_TIERS = [
  {
    title: "Beginner: mascot-tier silhouettes",
    desc: "Starters, legendaries from box art, and anime regulars — Pikachu, Charizard, Eevee, Mewtwo, Lucario, Greninja. Their outlines are famous enough that even casual fans recognize the tail shape of Charizard or Greninja's tongue-scarf silhouette instantly. If you can clear these at a 90% rate, you know your fundamentals.",
  },
  {
    title: "Intermediate: same-family lookalikes",
    desc: "The real challenge begins with evolution families and regional forms. Silhouettes of Oshawott vs. Dewott, or Alolan Vulpix vs. regular Vulpix, differ only in small proportions — ear length, tail volume, the presence of a mane. Learn to check the signature feature of each family: Clodsire's rounded squat, Zoroark's ponytail-like hair tuft, Scolipede's segmented centipede body.",
  },
  {
    title: "Master: object and abstract designs",
    desc: "Generations 5 through 9 introduced Pokémon based on objects, ice cream cones, trash bags, and cryptids. These silhouettes lack the familiar quadruped-or-biped body plan, so the usual heuristics fail. Mastery here means memorizing distinctive negative space — the gaps between Vine imply limbs, chandelier arms, or sword tassels. Few players can identify a silhouette like Sinistea or Poltchageist on the first try.",
  },
];

export const IDENTIFICATION_TIPS = [
  {
    title: "Count the limbs and tails first",
    desc: "The fastest signal in any silhouette is body plan: two legs or four? One tail, two tails, a fan, or none? This single check eliminates half the Pokédex before you look at anything else.",
  },
  {
    title: "Look for signature appendages",
    desc: "Wings, fins, horns, ears, and crests are unique to species. Noctowl's brow tufts, Luxray's mane, Dragapult's missile-heads-for-arms — appendages are the silhouette's fingerprint.",
  },
  {
    title: "Judge the proportions",
    desc: "A tall thin silhouette suggests a serpent or a biped like Sableye; a wide flat one suggests a crab or a tortoise. Head-to-body ratio separates beast-like Pokémon from humanoid ones.",
  },
  {
    title: "Learn by generation batches",
    desc: "Train your eye one generation at a time. Fans who grew up with Gen 1 often blank completely on Gen 8 silhouettes — a few rounds of generation-specific practice fixes this fast.",
  },
];

export const WHY_PLAY_TEXT =
  "Beyond nostalgia, silhouette quizzes are a genuinely effective memory exercise. Shape-first recognition is how speedrunners, competitive players, and long-time fans actually process the Pokédex — color and name come second. Regular play sharpens that instinct, and the four-option format teaches you to reason from elimination: if you know the silhouette isn't bipedal, two of the four answers usually die immediately. Teachers and parents also use the game as a vocabulary and reasoning exercise, since every round is a small deduction puzzle with no time pressure. Challenge a friend to beat your streak — identical rounds are rare across 1025 species, so every match plays differently.";

export const FAQ_ITEMS = [
  {
    q: "How many Pokémon are in the game?",
    a: "All 1025 species from Generations 1 through 9 are included, from Bulbasaur to Pecharunt. Every round picks a random species, so identical quizzes are extremely rare.",
  },
  {
    q: "Is there a time limit?",
    a: "No. You can study each silhouette for as long as you like, which makes the game suitable for all ages and perfect for learning unfamiliar generations.",
  },
  {
    q: "What happens when I guess wrong?",
    a: "The round simply moves on — but your streak resets. Your best streak is the number to beat, so accuracy matters more than speed.",
  },
  {
    q: "Does the game get harder?",
    a: "Difficulty is random by nature: iconic Gen 1 mascots are easy, while object-based designs from later generations can stump even veterans. Streak length is the real difficulty curve.",
  },
  {
    q: "Can kids play this game?",
    a: "Yes — the game has no timers, no accounts, and no chat. Reading ability is the only requirement, since answers are Pokémon names.",
  },
  {
    q: "How do I get better at recognizing silhouettes?",
    a: "Focus on body plan first (limbs, tails, wings), then signature appendages, then proportions. Playing a few rounds per day builds recognition faster than memorizing the Pokédex page by page.",
  },
];
