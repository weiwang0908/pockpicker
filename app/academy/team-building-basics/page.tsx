import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "Team Building 101: Roles, Coverage and Win Conditions",
  description:
    "A practical framework for building a six-Pokémon team: lead, wall, pivot and win condition; coverage analysis; and how to apply it to any roster — including the random ones. Framework anyone can use.",
  alternates: { canonical: "/academy/team-building-basics" },
  openGraph: {
    title: "Team Building 101: Roles, Coverage and Win Conditions | PokePicker",
    description:
      "Build any six-Pokémon team with a practical roles-and-coverage framework — including how to salvage a random roster.",
  },
};

const SLOTS: { slot: string; priority: string; note: string }[] = [
  {
    slot: "Lead / lead attacker",
    priority: "First out",
    note: "Sets the tempo — hazards, Taunt, or an immediate threat. Picks a matchup it wins on turn one.",
  },
  {
    slot: "Physical wall",
    priority: "High",
    note: "Takes physical hits, chips back with status or phazing. The same species shown in the defensive cores article.",
  },
  {
    slot: "Special wall",
    priority: "High",
    note: "The partner to the physical wall, covering the special side. Together they form a core.",
  },
  {
    slot: "Physical sweeper",
    priority: "Medium",
    note: "Late-game cleaner that outspeeds and chunks weakened teams. Wins games by momentum.",
  },
  {
    slot: "Special sweeper / wallbreaker",
    priority: "Medium",
    note: "Punches holes in the wall the opponent relies on. Exists to break the opponent's core.",
  },
  {
    slot: "Utility / pivot / win condition",
    priority: "Flex",
    note: "The glue — hazard remover, status sponge, or a boosted setup sweeper that wins once the field is clear.",
  },
];

export default function TeamBuildingBasicsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      <article className="mx-auto w-full max-w-3xl px-6 py-10">
        <Link
          href="/academy"
          className="text-sm font-medium text-brand hover:opacity-80"
        >
          &larr; Back to Academy
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Team Building 101: Roles, Coverage and Win Conditions
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A team of six isn&apos;t six strong Pokémon; it&apos;s six roles that
          happen to work together. This is the framework we use to build it —
          and, crucially, to salvage the random rosters you get from a{" "}
          <Link
            href="/random-pokemon-team-generator"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            team generator
          </Link>{" "}
          in Nuzlocke runs. Start with the roles, then check coverage, then
          name your win condition.
        </p>

        <div className="mt-8 space-y-6">
          <Section title="Step 1: assign the six roles">
            <p>
              Every complete team performs six jobs. Slots can overlap — one
              species can be both a physical wall and the lead — but a team
              missing a role entirely has a hole the opponent will find. Here
              is the template:
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Slot
                    </th>
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Priority
                    </th>
                    <th className="py-2 font-semibold text-foreground">
                      Job
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {SLOTS.map((r) => (
                    <tr key={r.slot}>
                      <td className="py-2 pr-4 align-top font-medium text-foreground">
                        {r.slot}
                      </td>
                      <td className="py-2 pr-4 align-top">{r.priority}</td>
                      <td className="py-2 align-top">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Step 2: build a defensive core first">
            <p>
              Before you worry about how to knock people out, worry about how
              to stay alive to try. Pick a physical wall and a special wall
              whose types cover each other — the full method is in{" "}
              <Link
                href="/academy/type-synergy-defensive-cores"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                Type Synergy: Defensive Cores
              </Link>
              . If the two wall types form a known core (Steel + Water,
              Grass + Fire, Fairy + Steel), the rest of the team gets a stable
              platform. If you build offense first and the core second, you
              tend to find the six-damage-and-no-bulk wall that loses to
              everything neutral. Core first.
            </p>
          </Section>

          <Section title="Step 3: check coverage, not just type matchups">
            <p>
              Coverage means your attackers can damage every type in the game
              with at least one neutral-to-super-effective move. The classic
              test: can the team handle a Steel, a Dragon, a Ghost, a Fairy,
              and a Flying-type answer without a single member hard-stalling?
              Spread <em>moves</em>, not just types — one well-placed Ice Beam
              on a mid-tier wall often covers a dragon threat the base types
              overlook. Use the{" "}
              <Link
                href="/pokemon-type-chart"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                type chart
              </Link>{" "}
              to map your six attackers&apos; collective super-effective reach;
              if some type has no answer anywhere on the team, that is
              tomorrow&apos;s fixed hole.
            </p>
          </Section>

          <Section title="Step 4: name your win condition">
            <p>
              A team-slog, whirlwind draw is a team with no plan. Choose what a
              win <em>looks like</em>: &ldquo;I chip with hazards until my
              Jolly Garchomp can sweep,&rdquo; or &ldquo;I stall out opposing
              walls and win on PP,&rdquo; or &ldquo;I set up a Swords Dance and
              click until they die.&rdquo; If you can&apos;t say your win
              condition in one sentence, the team lacks focus. Every role
              decision — the nature, the EV spread, the last moveslot — should
              serve that single sentence. Cross-reference the nature that fits
              each role using{" "}
              <Link
                href="/academy/best-natures-by-role"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                the best nature for every role
              </Link>{" "}
              and the stat ceilings from the{" "}
              <Link
                href="/academy/understanding-base-stats"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                base stats guide
              </Link>
              .
            </p>
          </Section>

          <Section title="Salvaging a random roster">
            <p>
              The whole framework applies to random rolls with a twist: you
              can&apos;t swap members, so you assign the six roles to whatever
              you generated and cover the gaps with items, moves and play —
              not with a better catch. A random team usually has more
              attackers than walls; make your two bulkiest members the
              impromptu core and let a coverage TM on a mid-tier role-player
              patch the biggest hole. This is exactly the planning the{" "}
              <Link
                href="/guides/random-team-nuzlocke-walkthrough"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                Nuzlocke walkthrough
              </Link>{" "}
              does camp-by-camp, and why a six-with-a-plan beats a
              six-of-highlights every time.
            </p>
          </Section>

          <Section title="Put it together">
            <p>
              Build a test team with the{" "}
              <Link
                href="/random-pokemon-team-generator"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                generator
              </Link>
              , then run the four steps: assign roles, build the core, check
              coverage, name the win condition. Do this twice and the
              framework becomes instinct. When you want the numbers under the
              roles, the{" "}
              <Link
                href="/academy/iv-ev-natures-guide"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                IVs, EVs and natures guide
              </Link>{" "}
              is where the math meets the sketch.
            </p>
          </Section>
        </div>
      </article>

      <footer className="mt-auto border-t border-zinc-100">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-4 px-6 py-6 text-sm text-zinc-500">
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <Link href="/academy" className="transition-colors hover:text-brand">
            Academy
          </Link>
          <Link
            href="/academy/iv-ev-natures-guide"
            className="transition-colors hover:text-brand"
          >
            Foundation Guide
          </Link>
        </div>
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {children}
      </div>
    </section>
  );
}