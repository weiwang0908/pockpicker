import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: "Random Team Nuzlocke: A Complete Run Walkthrough",
  description:
    "A gym-by-gym walkthrough of a random team Nuzlocke run: how we planned around a rolled roster, where the run nearly died, the tactics that saved it, and a damage-control checklist for your own run.",
  alternates: { canonical: "/guides/random-team-nuzlocke-walkthrough" },
};

const DEATH_LOG: { member: string; cause: string; lesson: string }[] = [
  {
    member: "Drifblim",
    cause: "An Electric gym leader's crit Thunderbolt on the switch",
    lesson: "A 4x weakness is a 4x weakness even at +3 levels. Unburden speed means nothing if you never get a turn.",
  },
  {
    member: "Luxray",
    cause: "Confusion self-hit into a Flinch chain",
    lesson: "Never leave your only physical wall in against confusion damage. Switch the confusion away.",
  },
  {
    member: "Marshtomp (replaced Drifblim via deathbox draft)",
    cause: "Survived — carried the elite four",
    lesson: "Deathbox replacements deserve real training time immediately, not bench-warming until the next crisis.",
  },
];

export default function RandomTeamWalkthroughPage() {
  return (
    <StaticPageLayout title="Random Team Nuzlocke: A Complete Run Walkthrough">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p className="text-lg text-zinc-900 dark:text-zinc-100">
          The rules of the random team Nuzlocke are one paragraph; surviving
          one is a campaign. This is a complete walkthrough of a real run —
          the roster we rolled, how we planned each phase, where three team
          members died, and the checklist we&apos;d hand you before your
          first attempt. For the ruleset itself and the five variant formats,
          read the{" "}
          <Link
            href="/guides/nuzlocke-random-team-challenge"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            random team challenge guide
          </Link>{" "}
          first.
        </p>

        <Section title="The roster we rolled">
          We locked the{" "}
          <Link
            href="/random-pokemon-team-generator"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            team generator
          </Link>{" "}
          to no filters, standard random, and rolled: <strong>Gardevoir</strong>,{" "}
          <strong>Luxray</strong>, <strong>Drifblim</strong>,{" "}
          <strong>Clauncher</strong>, <strong>Golem</strong>, and{" "}
          <strong>Leavanny</strong>. Before the first badge, we wrote the
          one-line profile every rolled team deserves: two special attackers
          (Gardevoir, Clauncher), one physical sweeper (Luxray), one physical
          wall with a 4x Water weakness (Golem), one pivot with a 4x Electric
          weakness (Drifblim), and a Bug/Grass glass cannon (Leavanny) that
          would define the run&apos;s entire middle act. Note what that
          profile lacks: no healer, no hazard control, no Ground immunity.
          Every crisis in this run traces back to one of those three
          absences. Write the profile before you play — it is the single
          highest-leverage ten minutes of any random run.
        </Section>

        <Section title="Early game (badges 1–2): resist the urge to fix">
          The rolled roster means your early game is a fixed puzzle: you
          cannot catch your way out of a bad start, so the temptation is to
          grind everyone five levels over the first gym. Don&apos;t. Our
          first gym was Rock-flavored, and Leavanny — usually a liability —
          soloed it at level parity because Bug and Grass both resist Rock.
          The lesson generalizes: in the early game, one type matchup
          outweighs five levels, so consult the{" "}
          <Link
            href="/pokemon-type-chart"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            type chart
          </Link>{" "}
          and lead the member whose resistances fit, not your strongest
          attacker. We left badge two with zero deaths and a deliberately
          under-leveled bench — levels spent early are levels you cannot
          spend on the run&apos;s actual wall.
        </Section>

        <Section title="Mid game (badges 3–5): the crisis phase">
          The mid game is where random team runs die, because opponent
          rosters diversify faster than your six fixed members can cover. Our
          crisis arrived at badge three: an Electric gym. Drifblim&apos;s 4x
          weakness made it unplayable; Golem&apos;s Ground STAB was our only
          clean answer, and the leader&apos;s coverage move threatened it.
          We won on items — a well-timed X Speed on Golem turned a
          two-hit-kill race into a one-sided sweep — but Drifblim died on a
          hard read we didn&apos;t need to make. That death bought the
          run&apos;s most important lesson: in a format with no replacements
          you choose, the correct play is almost always the boring one.
          Switch to the resist, take the small damage, win the long game.
          Hero reads are for formats with a bench.
        </Section>

        <Section title="The death log">
          Three deaths across the run. Each one is a pattern you will meet:
        </Section>
        <div className="-mt-4 divide-y divide-zinc-100">
          {DEATH_LOG.map((d) => (
            <div key={d.member} className="py-4">
              <h3 className="font-semibold text-foreground">{d.member}</h3>
              <p className="mt-1 text-sm leading-relaxed">
                <span className="text-zinc-500">Cause:</span> {d.cause}
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                <span className="text-zinc-500">Lesson:</span> {d.lesson}
              </p>
            </div>
          ))}
        </div>

        <Section title="Late game (badges 6–8) and the elite four">
          By badge six, the run had stabilized around a simple rule set:
          Gardevoir leads every fight it doesn&apos;t lose instantly, Luxray
          cleans up weakened teams, Golem sits on physical attackers, and
          Marshtomp — the deathbox-draft replacement for Drifblim — became
          the MVP nobody planned for. This is the quiet truth of random team
          runs: your win condition is rarely the Pokémon you were excited
          about at the roll screen. The elite four came down to resource
          accounting. We entered with a level 52 average against aces at 56,
          spent the entire item economy on full restores and one X Sp. Atk,
          and won the final fight with three members standing and zero
          revives. A random team that reaches the league healthy has already
          done the hard part; the league is just arithmetic and discipline.
        </Section>

        <Section title="The pre-run checklist">
          Run this checklist after rolling and before your first badge:
        </Section>
        <ul className="-mt-4 list-disc gap-2 pl-5 text-sm leading-relaxed">
          <li>
            Write the one-line role profile: attackers, walls, pivots — and
            the three things the team <em>lacks</em>.
          </li>
          <li>
            List the next three bosses whose aces you cannot outspeed or
            OHKO. Those fights get your item budget.
          </li>
          <li>
            Identify your &ldquo;unplayable&rdquo; matchups (the 4x
            weaknesses) and decide now — not mid-fight — whether the answer
            is a sacrificial lead, an item play, or a level lead.
          </li>
          <li>
            Pick the two members you will never let faint and plan their
            EV spreads accordingly; everything else is expendable by
            design.
          </li>
          <li>
            Agree on your deathbox rule before the first death. Ours: one
            rerolled replacement per death, no choosing.
          </li>
        </ul>

        <Section title="Frequently asked questions">
          {null}
        </Section>
        <div className="-mt-4 divide-y divide-zinc-100">
          {[
            {
              q: "Is this run format harder than standard Nuzlocke?",
              a: "The early game is easier (a full six from badge one) but the mid game is harder — you cannot catch to cover a hole. Overall difficulty is comparable; the skills stressed are different.",
            },
            {
              q: "What if my rolled team has no wall?",
              a: "Then items are your wall. Budget heals and X-items for the fights your profile loses on paper, and keep your whole team within two levels of the lead so any member can pivot.",
            },
            {
              q: "How do deaths work with a rolled team?",
              a: "Use the deathbox draft: each death triggers exactly one rolled replacement, no choosing. It keeps the randomness honest through the late game.",
            },
            {
              q: "Should I roll legendaries?",
              a: "Filter them out for a first run. They mask the planning skills the format is built to teach, and a mid-roll Zacian trivializes the last third of any game.",
            },
            {
              q: "What's the single biggest mistake in this format?",
              a: "Over-leveling one carry. One crit ends a solo-hero strategy; six evenly-leveled members with a plan survive the whole campaign.",
            },
            {
              q: "Can I use this walkthrough's team?",
              a: "The roster above is documented as a worked example — roll your own with the generator and build your own death log. The story is the content.",
            },
          ].map((item) => (
            <div key={item.q} className="py-4">
              <h3 className="font-semibold text-foreground">{item.q}</h3>
              <p className="mt-1 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-400">
          Roll your own roster and start your death log:{" "}
          <Link
            href="/random-pokemon-team-generator"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            generate a random team of six &rarr;
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
