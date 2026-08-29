import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "How to Read Base Stats Like a Pro",
  description:
    "Base stats decide a Pokémon's entire identity. Learn the breakpoints, the 100-ballpark, the 10s and the legendary 130s — and how to judge a species' judgment about power, bulk and speed at a glance.",
  alternates: { canonical: "/academy/understanding-base-stats" },
  openGraph: {
    title: "How to Read Base Stats Like a Pro | PokePicker",
    description:
      "Decode base stats at a glance — the breakpoints, the 100 ballpark, and how to judge a Pokémon's role before you ever play it.",
  },
};

const BREAKPOINTS: { band: string; meaning: string }[] = [
  {
    band: "100+",
    meaning:
      "An elite stat tier. The '100 ballpark' — two or more stats at 100+ usually marks a top-tier species like Garchomp (130 Atk / 102 Spe) or Tyranitar (134).",
  },
  {
    band: "80–99",
    meaning:
      "Competitive-friendly. An 80+ speed stat can outspeed mid-tier threats; 80+ bulk turns a wall into a staple. Most viable meta picks live here.",
  },
  {
    band: "60–79",
    meaning:
      "Workable with investment. An 70s attack with max EVs still hits hard; a 70s speed is often 'too slow' unless supported by Trick Room or priority moves.",
  },
  {
    band: "40–59",
    meaning:
      "A weakness you plan around. Sub-60 speed rarely moves first; sub-60 attack is a wasted EV sink. These are role-defining flaws, not stat noise.",
  },
  {
    band: "Below 40",
    meaning:
      "An extreme trade-off. Base 10 speed (on something like the Slow variants) only works in Slow Trick Room; base 20 HP exists on glass cannons that must never be touched.",
  },
];

export default function UnderstandingBaseStatsPage() {
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
          How to Read Base Stats Like a Pro
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Base stats are the skeleton every Pokémon is built around. One line
          of numbers sizes up a species&apos;s entire job before you ever play
          it. This guide teaches you the breakpoints that matter and the
          moment a base stat tells you how its holder should be built — without
          memorizing hundred species.
        </p>

        <div className="mt-8 space-y-6">
          <Section title="The six numbers and what each promises">
            <p>
              Every species carries six base stats, each a 0–255 rating that
              sets that stat&apos;s ceiling. <strong>HP</strong> is the bulk
              anchor — few 70-HP bases qualify as walls. <strong>Attack</strong>{" "}
              and <strong>Special Attack</strong> decide which damage side a
              species should lean on; a poor one tells you not to invest there
              at all. <strong>Defense</strong> and <strong>Special
              Defense</strong> separate walls from glass. <strong>Speed</strong>{" "}
              is often the most decisive stat in competitive play because
              moving first is moving de facto: +Speed nature, switch momentum
              and priority all hang on it. The pair of offense-stat scores tells
              you instantly whether something is a physical or special attacker
              — or, at 80/80, a genuine mixed threat.
            </p>
          </Section>

          <Section title="The breakpoints that matter">
            <p>
              You read base stats by band, not byte by byte. Learn these five
              tiers and you can rough-judge any species&apos;s role from memory:
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Band
                    </th>
                    <th className="py-2 font-semibold text-foreground">
                      What it means
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {BREAKPOINTS.map((r) => (
                    <tr key={r.band}>
                      <td className="py-2 pr-4 align-top font-medium text-foreground">
                        {r.band}
                      </td>
                      <td className="py-2 align-top">{r.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="The 100 ballpark and the legendary 100s">
            <p>
              There is a reason elite-tier Pokémon cluster around base 100. The
              100-mark in one or two stats is a soft qualification for
              top-tier play: Garchomp&apos;s 102 Speed, Aegislash&apos;s 100
              defensive spread, or a dragon at 100 base stats across the board
              all clear the bar modern metas set. When you see two or more
              100+ stats, treat that species as a candidate for a core team
              slot unless its flaws are glaring. Realizing &ldquo;everything
              relevant sits between 80 and 130,&rdquo; and that minmaxed roles
              happily sit at 130 in one stat and 70 everywhere else, is the
              moment base stats stop being six numbers and start being one
              profile.
            </p>
          </Section>

          <Section title="Stat totals punish nothing; distribution is everything">
            <p>
              New players compare species by total Base Stat Total (BST). That
              instinct is wrong. A 600-BST legendary can feel worse than a
              500-BST staple if its stats are spread evenly across a role that
              demands focus, while a 70/70/70/70/70/70 jack-of-all-trades is
              slower to grapple with than a 30/130/60/150/60/50 glass cannon
              that does one job brutally. The art is reading whether the
              distribution <em>matches</em> a role. High Attack and Speed with
              low bulk wants a Choice-scarf sweeper; high HP and both defenses
              with low speed wants to sit under Trick Room or phaze. A species
              whose stats fight each other — fast AND bulky AND weak offense —
              usually wants nothing, which is how good base stats can still
              produce an untiered Pokémon.
            </p>
          </Section>

          <Section title="From base stats to build: a checklist">
            <ul className="list-disc gap-2 pl-5 text-sm leading-relaxed">
              <li>
                <strong>Which offense is higher?</strong> That decides your
                EVs and nature focus; don&apos;t split damage across a weak
                side.
              </li>
              <li>
                <strong>Is Speed worth investing?</strong> Above ~70 base, a
                +Speed nature costs you real damage for real tempo; below that,
                accept it and invest in bulk or Trick Room.
              </li>
              <li>
                <strong>Can it take a hit?</strong> Two defensive stats at
                80+ makes a wall viable; one at 40 means it dies to everything
                and must never switch in raw.
              </li>
              <li>
                <strong>What role does the spread scream?</strong> Let the
                stat distribution, not the species&apos;s fame, pick the slot.
              </li>
            </ul>
            <p className="mt-3">
              Once you have the ceiling, the{" "}
              <Link
                href="/academy/iv-ev-natures-guide"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                IVs, EVs and natures guide
              </Link>{" "}
              shows how to push that ceiling to a specific number, and the{" "}
              <Link
                href="/academy/team-building-basics"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                team building article
              </Link>{""}
              turns the species into a slot.
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