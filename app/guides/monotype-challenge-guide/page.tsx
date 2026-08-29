import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: "The Complete Monotype Challenge Guide — Rules, Teams & Strategy",
  description:
    "Everything you need to run a monotype challenge: the rules, all 18 types ranked by difficulty, how to roll a type-locked team with a random generator, a worked Water run, and strategy for covering your weaknesses.",
  alternates: { canonical: "/guides/monotype-challenge-guide" },
};

const TYPE_TIERS: { tier: string; types: string; desc: string }[] = [
  {
    tier: "Comfortable",
    types: "Water, Steel, Flying, Normal",
    desc: "Huge species pools and flexible defensive profiles. Water alone has 130+ species including bulky walls, fast sweepers, and every role in between; Steel resists ten types and laughs at early gyms. These runs are about restraint, not survival.",
  },
  {
    tier: "Balanced",
    types: "Fire, Dragon, Psychic, Fairy, Ground, Grass, Dark, Fighting",
    desc: "Workable pools with real weaknesses. Fire struggles against water-heavy endgames; Psychic and Fairy lean offensive and lack physical walls. These types teach you to plan around a hole rather than patch it.",
  },
  {
    tier: "Brutal",
    types: "Ice, Bug, Poison, Rock, Ghost, Electric",
    desc: "Ice and Bug are the classic nightmare runs: tiny pools, five-plus weaknesses, and evolutionary lines that peak early. Ghost and Electric are mid-tier on paper but starve you of early-game options in most titles. Choose these for war stories.",
  },
];

export default function MonotypeGuidePage() {
  return (
    <StaticPageLayout title="The Complete Monotype Challenge Guide">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p className="text-lg text-zinc-900 dark:text-zinc-100">
          The monotype challenge is Pokémon&apos;s most elegant self-imposed
          difficulty: beat the entire game using only Pokémon of a single
          type. This guide covers the rules, ranks all 18 types by difficulty,
          shows you how to roll a type-locked random team in seconds, and
          walks through a real Water-type run.
        </p>

        <Section title="What is a monotype challenge?">
          A monotype run restricts your entire party to Pokémon sharing one
          type — six Water types, six Ghosts, six Bugs, your pick. The format
          mirrors how gym leaders play the game: one theme, total commitment,
          and a glaring weakness everyone can see. That constraint is the
          whole point. A normal playthrough lets you patch every hole with a
          fresh catch; a monotype run forces you to win matchups the type
          chart says you should lose, using levels, items, and moveslots the
          game usually lets you ignore. Where a Nuzlocke tests your resource
          management under scarcity, monotype tests your understanding of the
          type chart itself — after a full Ice run, you will never look at
          Stealth Rock the same way again.
        </Section>

        <Section title="The rules">
          The core rule is one line: every Pokémon on your team must have your
          chosen type as one of its types. Beyond that, the community plays a
          few common variants:
        </Section>
        <ul className="-mt-4 list-disc gap-2 pl-5 text-sm leading-relaxed">
          <li>
            <strong>Dual-type allowed (standard).</strong> Empoleon
            (Water/Steel) counts for a Water run. This is the default —
            dual-types are your only source of defensive flexibility.
          </li>
          <li>
            <strong>Pure monotype (hard mode).</strong> Only single-type
            Pokémon allowed. Your Water run loses Gyarados, Empoleon, and
            most of your walls overnight.
          </li>
          <li>
            <strong>Starter clause.</strong> If your chosen type matches no
            available starter, you may use a starter until your first
            type-legal catch, then retire it.
          </li>
          <li>
            <strong>Gym-leader mode.</strong> Add Nuzlocke&apos;s first-catch
            and death rules on top for the hardest mainstream challenge in
            the series.
          </li>
          <li>
            <strong>Random team mode.</strong> Instead of hand-picking your
            six, generate the roster with a{" "}
            <Link
              href="/random-pokemon-team-generator"
              className="text-brand underline underline-offset-2 hover:opacity-80"
            >
              random team generator
            </Link>{" "}
            locked to your type — the format this guide&apos;s worked example
            uses.
          </li>
        </ul>

        <Section title="All 18 types, ranked by difficulty">
          Difficulty tracks three things: how many species carry the type
          (options), what the type resists (defense), and when those Pokémon
          become available (timing). Weighing all three, here is where each
          type lands. Treat this as our editorial take after running the
          format across multiple titles — argue with it in your own runs.
        </Section>
        <div className="-mt-4 divide-y divide-zinc-100">
          {TYPE_TIERS.map((t) => (
            <div key={t.tier} className="py-4">
              <h3 className="font-semibold text-foreground">
                {t.tier}: {t.types}
              </h3>
              <p className="mt-1 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <Section title="Step-by-step: rolling a monotype team">
          Random-team monotype combines the format&apos;s two best ideas — a
          locked theme and a roster you didn&apos;t choose. Here is the exact
          process using our generator:
        </Section>
        <ol className="-mt-4 list-decimal gap-2 pl-5 text-sm leading-relaxed">
          <li>
            Open the{" "}
            <Link
              href="/random-pokemon-team-generator"
              className="text-brand underline underline-offset-2 hover:opacity-80"
            >
              random Pokémon team generator
            </Link>
            .
          </li>
          <li>
            Set the <strong>Type filter</strong> to your chosen type. The pool
            instantly narrows to every species carrying it, across all nine
            generations.
          </li>
          <li>
            Optionally narrow by generation for a retro run (a Gen 1-only
            Water run is a genuinely different experience from a full-pool
            one), or exclude legendaries if your table bans them.
          </li>
          <li>
            Generate. You get six species — keep the exact roster. No rerolls
            is the honor system, but it&apos;s the whole game.
          </li>
          <li>
            Screenshot the team, then check each member against our{" "}
            <Link
              href="/pokemon-type-chart"
              className="text-brand underline underline-offset-2 hover:opacity-80"
            >
              type chart
            </Link>{" "}
            to map your defensive holes before the first badge.
          </li>
        </ol>

        <Section title="Worked example: a random Water run">
          To show what a rolled roster actually looks like, we locked the
          generator to Water and rolled six: <strong>Swampert</strong>,{" "}
          <strong>Starmie</strong>, <strong>Gyarados</strong>,{" "}
          <strong>Ferrothorn</strong>, <strong>Rotom-Wash</strong>, and{" "}
          <strong>Floatzel</strong>. This is a textbook demonstration of why
          dual-types carry the format: five of six members carry a second
          type, and those secondary types — Ground, Psychic, Flying, Grass,
          Electric — quietly patch Water&apos;s two weaknesses. Ferrothorn
          absorbs the Grass and Electric hits that threaten everyone else;
          Rotom-Wash is the pivot that keeps momentum when a rival Water
          switch-in stalls the sweep; Swampert is the physical wall with
          immunity to Electric entirely. The team&apos;s real weakness is a
          dedicated Grass sweeper with coverage — exactly the matchup the
          run&apos;s items and move tutors get spent on. That&apos;s monotype
          in miniature: the generator hands you a puzzle, and the secondary
          types decide how many of your weaknesses are load-bearing.
        </Section>

        <Section title="Strategy: winning matchups you should lose">
          <strong>Stack your resistances, not your damage.</strong> In a
          monotype run, your resist list is fixed at team selection — write
          it down before the first gym. Every fight you can&apos;t resist,
          you win with levels, items, and speed.{" "}
          <strong>Exploit dual-type secondaries ruthlessly.</strong> The
          moment a threat appears, ask which of your six resists it through a
          secondary typing; that answer is your switch.{" "}
          <strong>Buy coverage TMs early.</strong> Monotype teams chronically
          lack coverage — one well-placed Ice Beam or Earthquake on a
          role-player wins entire gyms. <strong>Over-level deliberately in
          bad stretches.</strong> A two-to-four level lead converts
          &ldquo;unwinnable&rdquo; gym fights into coin flips. And{" "}
          <strong>respect hazards.</strong> If your type is weak to Rock or
          Ground, Stealth Rock and Spikes will do more damage than any
          opponent&apos;s ace — pack a rapid spinner or defogger if your
          pool allows one.
        </Section>

        <Section title="Frequently asked questions">
          {null}
        </Section>
        <div className="-mt-4 divide-y divide-zinc-100">
          {[
            {
              q: "Which type should beginners pick?",
              a: "Water. It has the largest species pool in the game, every battle role is represented, and its two weaknesses (Grass, Electric) are easy to cover with dual-types. Steel and Flying are close seconds.",
            },
            {
              q: "Can I use dual-type Pokémon?",
              a: "In the standard ruleset, yes — any Pokémon carrying your chosen type counts. Pure monotype (single-typed species only) is a separate, harder variant.",
            },
            {
              q: "How does monotype compare to a Nuzlocke?",
              a: "Nuzlocke is about scarcity: limited catches and permanent deaths. Monotype is about constraint: a fixed theme. They stress different skills, and gym-leader mode combines both into the hardest mainstream challenge.",
            },
            {
              q: "Can I mix monotype with a random team?",
              a: "Yes — lock the team generator's Type filter to your type and roll. Our full writeup of the random-team format lives in the Nuzlocke random team guide.",
            },
            {
              q: "What's the hardest monotype type?",
              a: "Ice and Bug. Ice has a tiny pool, five weaknesses, and hazards that melt it; Bug peaks early and collapses against late-game Flying and Fire. Either one earns you bragging rights.",
            },
            {
              q: "Do legendaries break monotype runs?",
              a: "Rarely. Most type-locked legendaries arrive too late to carry the mid-game, and the format's difficulty is spread across every gym. Ban them by table agreement or filter them out when rolling.",
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
            Lock a type and generate your monotype team &rarr;
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
