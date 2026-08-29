import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: "Nuzlocke Random Team Challenge — Rules, Variants & Odds",
  description:
    "A complete guide to the Nuzlocke random team challenge: the five most popular variant rulesets, how random-team odds actually work, and strategy for surviving with what the generator gives you.",
  alternates: { canonical: "/guides/nuzlocke-random-team-challenge" },
};

const VARIANTS: { title: string; body: string }[] = [
  {
    title: "Standard Nuzlocke",
    body: "The 2010 classic: you may only catch the first Pokémon you encounter on each route, and any Pokémon that faints is considered dead and must be released or permanently boxed. Add our random team generator on top and the first-catch rule becomes a full-team roll — six species drawn from all 1025, no rerolls. The standard variant is the best starting point because the difficulty curve is brutal but fair: no single bad roll dooms a run, but every gym becomes a puzzle of patching holes you didn't choose.",
  },
  {
    title: "Shiny mode",
    body: "Shiny rules grant one free reroll per gym if — and only if — your generated team contains at least one shiny-eligible species you actually keep. This variant exists because full random teams occasionally produce six overlapping roles (three Water-types, no pivot, no hazard control). Shiny mode keeps the spirit of randomness while softening genuinely unwinnable boards. House rule we recommend: the reroll must replace exactly one Pokémon, not the whole team, or the challenge collapses.",
  },
  {
    title: "Type-lock",
    body: "Before rolling, each player is assigned two random types (use a die or our picker's type filter). Your team of six must consist only of Pokémon carrying at least one of those types. Type-lock produces the strangest tactical problems in the entire format: a Rock/Ghost lock forces you to evaluate fossil Pokémon and Gholdengo-line builds you would never otherwise touch. It is also the best training ground for learning the type chart cold, because your coverage options are systematically crippled.",
  },
  {
    title: "Generation-lock",
    body: "The entire team is rolled from a single generation — 151 candidates for Gen 1, 156 for Gen 5, and so on. Generation-lock is the nostalgia format, but it has a hidden competitive edge: smaller candidate pools mean you learn each generation's meta roster intimately. Gen 1 generation-lock is the hardest mainstream option, because the type distribution of 1996 (no Dark, no Steel, no Fairy, and Psychic's original dominance) punishes teams that lack a strong Normal resist.",
  },
  {
    title: "Full random (chaos mode)",
    body: "No filters, no mercy: six Pokémon from all 1025 species, legendaries included, and you must keep the exact team you roll. Chaos mode is less a strategy format and more a storytelling engine — the community's most-shared runs come from chaos mode, where a Pecharunt, a Magikarp, and a Squawkabilly walk into Levincia Gym. Our advice: accept the narrative. Chaos runs you win are memorable; chaos runs you lose are legendary.",
  },
];

export default function NuzlockeGuidePage() {
  return (
    <StaticPageLayout title="The Nuzlocke Random Team Challenge">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p className="text-lg text-zinc-900 dark:text-zinc-100">
          A complete guide to running Nuzlocke with a random team: the five
          most popular rulesets, what the odds actually look like, and how to
          survive the rolls you&apos;re dealt.
        </p>

        <Section title="What is a Nuzlocke random team challenge?">
          A traditional Nuzlocke run constrains <em>catching</em> — first
          encounter per route, faints are permanent. A random team challenge
          constrains <em>team building</em>: instead of catching as you go,
          your entire six-Pokémon roster is generated up front by a random
          team generator, and you must complete the game with what you get.
          The format was popularized by content creators who wanted Nuzlocke
          tension without the early-game grind, and it has since grown its own
          vocabulary of variants, house rules, and strategy. If you want to
          try it, roll your team with our{" "}
          <Link
            href="/random-pokemon-team-generator"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            random team generator
          </Link>{" "}
          — but read the odds section first so you know what you&apos;re
          signing up for.
        </Section>

        <Section title="The five variant rulesets">
          {null}
        </Section>
        <div className="-mt-4 space-y-5">
          {VARIANTS.map((v) => (
            <div key={v.title}>
              <h3 className="font-semibold text-foreground">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>

        <Section title="What the odds actually look like">
          Random teams are stranger than intuition suggests. With 1025 species
          in the pool, the chance that any two specific slots roll the same
          species is only 1 in 1025 — but across a six-slot team there are 15
          possible pairs, so roughly 1.4% of teams contain at least one
          duplicate before deduplication. Generation composition is the more
          interesting number: each slot independently lands in Generation 1
          with probability 151/1025 (about 14.7%), so the expected number of
          Gen 1 species on a random six is roughly 0.88 — meaning most random
          teams draw their roster fairly evenly across eras, and a team that
          happens to be all-Gen 1 is a genuine statistical event. Type
          coverage tells the strategic story: Water is the most common type in
          the Pokédex (over 130 species), so a random team almost always has
          Water damage available; Ice and Fairy specialists are far scarcer,
          which is why random teams chronically struggle against Dragon-heavy
          endgames. None of these odds require luck to manage — they require
          respect when you plan your EV spreads and move tutors.
        </Section>

        <Section title="Strategy: playing the hand you rolled">
          The single most common mistake in random team runs is evaluating a
          roster by its best Pokémon instead of its worst matchup. Start your
          planning by writing down the three gym leaders or bosses whose
          aces your team cannot outspeed or OHKO — those are the fights your
          entire item and move economy should be spent on. Second, resist
          the urge to over-level one carry: Nuzlocke death rules mean a
          single over-leveled ace is one crit away from ending the run, while
          six evenly-leled Pokémon trade power for redundancy. Third, spend
          TMs defensively — a random team&apos;s biggest weakness is usually
          not damage but coverage, and one well-chosen coverage TM on your
          mid-tier role player wins more fights than a power move on your
          star. Use our{" "}
          <Link
            href="/pokemon-type-chart"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            type chart
          </Link>{" "}
          to map your team&apos;s offensive gaps before the first badge.
        </Section>

        <Section title="House rules worth stealing">
          The community has converged on a few optional rules that make random
          runs fairer without breaking the format: <em>Free first box</em> —
          your lowest-rolled species may be swapped for one re-roll, once, to
          prevent dead-weight runs. <em>Level parity cap</em> — your party may
          never exceed the next gym leader&apos;s ace by more than 3 levels,
          which forces tactical play instead of grinding. <em>Deathbox
          draft</em> — when a team member dies, you roll exactly one
          replacement (no choosing), keeping the randomness honest through the
          late game. Any of these can be combined with the five variants
          above; just agree on them before the run starts, because the
          temptation to renegotiate mid-run is exactly what house rules exist
          to prevent.
        </Section>

        <Section title="Frequently asked questions">
          {null}
        </Section>
        <div className="-mt-4 divide-y divide-zinc-100">
          {[
            {
              q: "Is a random team harder than a standard Nuzlocke?",
              a: "Usually yes, but in a different way. Standard Nuzlocke difficulty is front-loaded (early routes, thin options); random team difficulty is distributed, because you may start with a strong roster and still hit a mid-game wall your six cannot answer.",
            },
            {
              q: "Can I reroll my team?",
              a: "That is between you and your ruleset. In strict full random, no. Most players allow one free reroll before the first badge — after that, the run is the run.",
            },
            {
              q: "Do legendaries break the format?",
              a: "Less than you would think. Many legendaries roll with restrictive movepools early, and Nuzlocke death rules make even Arceus mortal to a bad crit. If your table hates them, use the generator's legendary filter to exclude them before rolling.",
            },
            {
              q: "Which variant should beginners start with?",
              a: "Standard Nuzlocke with a random team, plus the free first box house rule. It teaches resource management without the curated cruelty of type-lock or generation-lock.",
            },
          ].map((item) => (
            <div key={item.q} className="py-4">
              <h3 className="font-semibold text-foreground">{item.q}</h3>
              <p className="mt-1 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-400">
          Ready to roll?{" "}
          <Link
            href="/random-pokemon-team-generator"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            Generate your random team &rarr;
          </Link>
        </p>
      </div>
    </StaticPageLayout>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </h2>
      {children ? <p className="mt-2">{children}</p> : null}
    </div>
  );
}
