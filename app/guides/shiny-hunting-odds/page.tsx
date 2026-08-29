import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: "Shiny Hunting Odds Explained — Base Rates, Masuda & More",
  description:
    "A clear guide to shiny hunting odds: the base 1/4096 rate, how the Shiny Charm, Masuda Method, radar chains and outbreaks stack the numbers, expected attempts per method, and how to preview the odds risk-free.",
  alternates: { canonical: "/guides/shiny-hunting-odds" },
};

const ODDS_TABLE: {
  method: string;
  odds: string;
  note: string;
}[] = [
  {
    method: "Random encounter (Gen 6+)",
    odds: "1/4096",
    note: "The modern base rate. Generations 2 through 5 used 1/8192, which older guides still quote.",
  },
  {
    method: "Random encounter + Shiny Charm",
    odds: "1/1365",
    note: "The Charm adds two extra rolls of the dice. It requires completing the Pokédex in most titles.",
  },
  {
    method: "Masuda Method (Gen 6+)",
    odds: "1/683",
    note: "Breeding two Pokémon from different-language games. Six times better than base odds, no Charm needed.",
  },
  {
    method: "Masuda Method + Shiny Charm",
    odds: "1/512",
    note: "The standard competitive hunting setup for eggs — the numbers most hunters live by.",
  },
  {
    method: "Poké Radar chain 40+ (Gen 4 / BDSP)",
    odds: "≈1/200",
    note: "Breaking the chain resets everything. The highest non-breeding odds in the series' older titles.",
  },
  {
    method: "Consecutive fishing (Gen 6)",
    odds: "≈1/100",
    note: "Chain 20+ bites without missing. Reeling in with a Suction Cups lead makes chains far more stable.",
  },
  {
    method: "Outbreaks + Charm + Sandwich power (Gen 9)",
    odds: "up to ≈1/512",
    note: "Defeating 60+ outbreak Pokémon, then stacking Sparkling Power Lv. 3 — the modern hunting meta.",
  },
];

export default function ShinyOddsGuidePage() {
  return (
    <StaticPageLayout title="Shiny Hunting Odds Explained">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p className="text-lg text-zinc-900 dark:text-zinc-100">
          Every shiny hunter eventually asks the same question: how many
          encounters is this actually going to take? This guide explains
          where the odds come from, how every hunting method stacks them,
          what the math says you should expect, and how to feel the odds
          before committing a weekend to them.
        </p>

        <Section title="Where the 1/4096 comes from">
          A shiny is not a separate Pokémon — it&apos;s the same species with
          a rare palette swap, decided the instant it spawns. From Generation
          6 onward, the game rolls a 16-bit personality value and checks
          whether it falls in a tiny shiny window: 8 of 65,536 values qualify,
          which is exactly 1 in 4,096. Generations 2 through 5 used a
          narrower window of 1 in 8,192, which is why older guides quote a
          number twice as harsh — the base rate was cut in half with the 3DS
          era and has stayed there since. The key insight is that every
          encounter is an independent roll: seeing 4,096 Pokémon does not
          guarantee anything. The dice have no memory, which is exactly what
          makes the 3,000-encounter dry streak and the third shiny of the
          afternoon equally possible.
        </Section>

        <Section title="Every method, one table">
          Different hunting methods add extra rolls or reroll the dice
          multiple times per attempt. Here are the numbers that matter,
          condensed from across the series:
        </Section>
        <div className="-mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="py-2 pr-4 font-semibold text-foreground">
                  Method
                </th>
                <th className="py-2 pr-4 font-semibold text-foreground">
                  Odds
                </th>
                <th className="py-2 font-semibold text-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {ODDS_TABLE.map((row) => (
                <tr key={row.method}>
                  <td className="py-2 pr-4 align-top">{row.method}</td>
                  <td className="py-2 pr-4 align-top font-medium text-foreground">
                    {row.odds}
                  </td>
                  <td className="py-2 align-top text-muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Section title="What the odds actually feel like: expected attempts">
          Probabilities of the form 1/N have a clean interpretation: the
          expected number of attempts is N, but the spread around that
          expectation is enormous. At full 1/4096 odds, the average hunt takes
          4,096 encounters — but roughly one hunter in ten will still be
          hunting after 9,400 encounters, and about one in a hundred passes
          18,900. The same math that produces horror stories also produces
          lucky first-try shinies: about one hunter in fifty gets one within
          the first 85 encounters. This is why hunters track totals
          religiously — not because the count changes the odds, but because
          seeing &ldquo;2,140 eggs&rdquo; on the counter reframes a dry streak
          as statistically ordinary. Under the Masuda Method at 1/683, the
          median hunt ends around 473 eggs; with the Charm stacked to 1/512,
          around 355. Those are the numbers to plan an evening around.
        </Section>

        <Section title="Choosing a method by play style">
          <strong>Masuda breeding</strong> rewards patience and multitasking
          — hatch eggs while watching something, ideal if you want a specific
          species with competitive stats, since you can breed for nature and
          IVs alongside the shiny roll. <strong>Radar and chain fishing</strong>{" "}
          reward precision: a broken chain costs you everything, so they suit
          players who enjoy execution under pressure.{" "}
          <strong>Outbreak hunting</strong> (Scarlet/Violet) is the most
          active style — defeating 60+ spawn-crowd Pokémon then letting
          respawns roll — and pairs beautifully with sandwiches. The honest
          recommendation for a first hunt: Masuda with the Charm, a species
          you love at 1/512, and a podcast. Your first shiny should be a
          fond memory, not a repetitive strain injury.
        </Section>

        <Section title="Step-by-step: feel the odds before you hunt">
          You don&apos;t need to commit 4,096 encounters to understand what
          these odds feel like. Our{" "}
          <Link
            href="/random-pokemon-team-generator"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            random Pokémon generator
          </Link>{" "}
          has a shiny mode built exactly for this:
        </Section>
        <ol className="-mt-4 list-decimal gap-2 pl-5 text-sm leading-relaxed">
          <li>
            Open the{" "}
            <Link
              href="/random-pokemon-team-generator"
              className="text-brand underline underline-offset-2 hover:opacity-80"
            >
              team generator
            </Link>{" "}
            and expand the advanced filters.
          </li>
          <li>
            Set Shiny mode to <strong>1/4096</strong> — full hunting odds.
            Every generation now rolls the real dice, and the base rate
            applies per roll, exactly like wild encounters.
          </li>
          <li>
            Generate repeatedly and count how many teams it takes to see your
            first full-shiny roster. Roll six at a time and the expected wait
            is still hundreds of clicks — the odds compress only when you
            stack many attempts.
          </li>
          <li>
            Switch to <strong>1/512</strong> to feel the Masuda + Charm
            setup, or <strong>1/100</strong> for boosted rates like long
            fishing chains — the difference in frequency is immediately
            obvious.
          </li>
          <li>
            Curious what the payoff looks like? Set Shiny to{" "}
            <strong>Always</strong> and enjoy a full shiny team — no
            hunting required.
          </li>
        </ol>

        <Section title="Frequently asked questions">
          {null}
        </Section>
        <div className="-mt-4 divide-y divide-zinc-100">
          {[
            {
              q: "What are the odds of finding a shiny Pokémon?",
              a: "The base rate is 1/4096 per encounter from Generation 6 onward (1/8192 in Generations 2-5). Methods like the Masuda Method and Shiny Charm stack the odds down to 1/512 or better.",
            },
            {
              q: "Do shiny odds increase the more you encounter?",
              a: "No. Every encounter is an independent roll — encounter 4,097 is exactly as likely to be shiny as encounter 1. Odds only improve through methods that add extra rolls (Charm, Masuda, chains), not through volume alone.",
            },
            {
              q: "Is the Masuda Method worth it without the Shiny Charm?",
              a: "Yes — it improves odds to 1/683 on its own, six times better than base. The Charm only stacks it to 1/512, so breed first and complete the Pokédex later if the Charm is a slog.",
            },
            {
              q: "Can soft resetting improve shiny odds?",
              a: "Soft resetting just re-rolls the same 1/4096 dice on static encounters like legendaries. It's a valid hunt style, but the odds per reset never improve — it's pure volume.",
            },
            {
              q: "What's the longest a hunt can reasonably take?",
              a: "At 1/4096, about 1 in 100 hunts passes 18,900 encounters. At 1/512 Masuda odds, 1 in 100 passes 2,360 eggs. Dry streaks twice the expected length are statistically routine.",
            },
            {
              q: "Do shinies perform better in battle?",
              a: "No — a shiny differs only in coloration (Gen 2's stat-linked shininess is long gone). Hunting is about rarity and personal attachment, not power.",
            },
          ].map((item) => (
            <div key={item.q} className="py-4">
              <h3 className="font-semibold text-foreground">{item.q}</h3>
              <p className="mt-1 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-400">
          Want to preview the odds yourself?{" "}
          <Link
            href="/random-pokemon-team-generator"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            Open the generator and switch shiny modes &rarr;
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
