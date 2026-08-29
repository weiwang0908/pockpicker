import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "IVs, EVs and Natures: Building the Perfect Competitive Pokémon",
  description:
    "A complete guide to IVs, EVs and natures: where every stat point comes from, the full stat formula broken down, and a step-by-step build that combines all three systems for competitive play.",
  alternates: { canonical: "/academy/iv-ev-natures-guide" },
  openGraph: {
    title: "IVs, EVs and Natures: Build the Perfect Pokémon | PokePicker",
    description:
      "Where every competitive stat point comes from — IVs, EVs and natures — with a worked build from scratch.",
  },
};

const EV_SPREADS: { name: string; spread: string; purpose: string }[] = [
  {
    name: "252 / 252 / 4",
    spread: "252 in two stats, 4 in a third",
    purpose: "The default. Max two stats that matter, the bonus 4 points often land in HP for the odd extra point at level 50.",
  },
  {
    name: "Bulk 252 HP",
    spread: "252 HP / 128 Def / 128 SpD",
    purpose: "Balanced physical and special bulk so no neutral hit cleanly 2HKOs. Common on walls and slow tanks.",
  },
  {
    name: "Speed-tier tuned",
    spread: "Custom to outspeed one threat",
    purpose: "Enough Speed EVs to beat a target number (e.g. base 100s) then the rest into offense — bleeding-edge EV play.",
  },
  {
    name: "Physical wall",
    spread: "252 HP / 252 Def / 4 SpD",
    purpose: "Maximum physical durability while the nature boosts Defense further, the default on pure physical walls.",
  },
];

export default function IVEVNaturesGuidePage() {
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
          IVs, EVs and Natures: Building the Perfect Competitive Pokémon
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          This is the foundation article of the Academy. Read it once, and
          every other build guide on the internet stops being memorization and
          becomes arithmetic you actually understand.
        </p>

        <div className="mt-8 space-y-6">
          <Section title="The three hidden systems">
            <p>
              A Pokémon&apos;s in-game stats are the product of four inputs:
              <strong> base stats</strong> (fixed per species),{" "}
              <strong>IVs</strong> (0–31, rolled at encounter, permanent),{" "}
              <strong>EVs</strong> (0–252 per stat, earned by training), and{" "}
              <strong>nature</strong> (±10% on one stat, −10% on another).
              The base stats set the skeleton; the other three are the knobs
              every serious player turns. Am I a physical attacker or a
              special attacker? Slow and bulky, or fast and frail? How much
              Speed is enough to outrun the current meta? These three systems
              are how you answer those questions in exact numbers instead of
              vibes.
            </p>
          </Section>

          <Section title="IVs: the hidden lottery you can fix">
            <p>
              Individual Values (IVs) range from 0 to 31 and lock in the moment
              a Pokémon appears. Each IV point is worth exactly one stat point
              at level 100, so a 31-IV Attack means 31 more points than a 0-IV
              copy at the same level — the difference between Garchomp&apos;s
              earthquake cleanly 2HKOing Skarmory and missing the KO entirely.
              At level 50 the contribution halves, which is why level-50
              formats are so sensitive to IVs. Two numbers matter beyond the
              obvious &ldquo;max them all&rdquo;:{" "}
              <strong>0 Attack</strong> is prized on special attackers and
              walls because it minimizes Foul Play and confusion self-damage,{" "}
              <strong>and 0 Speed</strong> is the linchpin of Trick Room teams
              (slowest moves first) and maximizes Gyro Ball. Don&apos;t chase
              perfect IVs by the same blind rule — decide which stats you want
              low long before you breed.
            </p>
          </Section>

          <Section title="EVs: the training you control entirely">
            <p>
              Effort Values (EVs) are the most flexible of the three systems
              because they are fully under your control. Every defeated Pokémon
              awards EVs of a specific stat, vitamins and feathers provide them
              directly, and EV-reducing berries fix mistakes. What matters
              competitively is the arithmetic: the stat formula divides EVs by
              4 (floored) before adding them, so{" "}
              <strong>252 is the most EVs that ever pay off in one stat</strong>{" "}
              — running 255 wastes 3 points that do nothing. The shared cap is
              510 total, and every build is a budgeting problem spent across
              that cap. The classic spreads below cover 95% of what you will
              meet:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Spread
                    </th>
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Allocations
                    </th>
                    <th className="py-2 font-semibold text-foreground">
                      When to use
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {EV_SPREADS.map((row) => (
                    <tr key={row.name}>
                      <td className="py-2 pr-4 align-top font-medium text-foreground">
                        {row.name}
                      </td>
                      <td className="py-2 pr-4 align-top">{row.spread}</td>
                      <td className="py-2 align-top text-muted">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Natures: the 10% that changes breakpoints">
            <p>
              A nature multiplies one stat by 1.1 and another by 0.9. That
              10% looks small until it lands on the stat where a matchup is
              decided — a Jolly (+Spd, −SpAtk) Garchomp reaches 333 Speed and
              outruns Timid base-100 sweepers, flipping a 50/50 into a
              guaranteed out-and-move. The rule is simple:{" "}
              <strong>boost the stat that wins games, hinder the one you
              never use</strong>. Physical sweepers use Adamant/Jolly, special
              sweepers use Modest/Timid, walls use Bold/Impish/Careful/Calm,
              and Trick Room builds actively <em>reduce</em> speed (Brave,
              Quiet). HP is never affected by nature, so it is never hindered.
              For the full table mapped to roles, see our companion article{" "}
              <Link
                href="/academy/best-natures-by-role"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                The Best Nature for Every Battle Role
              </Link>
              .
            </p>
          </Section>

          <Section title="The full formula in plain language">
            <p>
              From Generation 3 onward every mainline game computes stats the
              same way. For HP:{" "}
              <em>
                floor((2 × Base + IV + floor(EV ÷ 4)) × Level ÷ 100) + Level +
                10
              </em>
              . For the other five stats:{" "}
              <em>
                floor(floor((2 × Base + IV + floor(EV ÷ 4)) × Level ÷ 100) + 5)
                × nature
              </em>
              . Read it as three stacked steps: first combine the base, IV and
              EV-derived number; then scale by level and add a flat 5; then
              apply the nature multiplier. The floors in the middle are why odd
              EV totals get silently wasted and why nature never produces
              fractional stats. You can feed these exact numbers into our{" "}
              <Link
                href="/pokemon-iv-calculator"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                IV calculator
              </Link>{" "}
              to see the whole formula run live on any build.
            </p>
          </Section>

          <Section title="Worked build: Garchomp from zero">
            <p>
              Let&apos;s build the famous Jolly Garchomp from scratch. Target:
              a physical attacker that outruns everything below base 110
              Speed, survives an Ice Shard, and hits hard enough to take
              chunks out of bulky walls. Start with base stats — its 130 Attack
              and 102 Speed are why we bother. Give it 31 IVs everywhere except
              Special Attack, which we set to 0 (a special move is never used;
              0 minimizes confusion and Foul Play chip). Then budget EVs: 252
              Speed to ensure the 333 Speed number, 252 Attack for power, 4 in
              HP for the free level-50 point. Finally a Jolly nature to boost
              Speed and hinder the unused Special Attack. Feed it to our{" "}
              <Link
                href="/pokemon-iv-calculator"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                IV calculator
              </Link>{" "}
              and you get exactly the 333 Speed / 394 Attack spread
              competitive Garchomp is famous for. Every competitive build is
              this same four-step process: define the target, set the IVs,
              budget the EVs, choose the nature.
            </p>
          </Section>

          <Section title="Common mistakes to avoid">
            <ul className="list-disc gap-2 pl-5 text-sm leading-relaxed">
              <li>
                <strong>Running 255 EVs</strong> — beyond 252 is wasted because
                everything gets floored at the ÷4 step.
              </li>
              <li>
                <strong>Applying nature to HP</strong> — no nature ever touches
                HP.
              </li>
              <li>
                <strong>Assuming Hyper Training changes IVs</strong> — it makes
                a stat behave like 31 but the stored IV is unchanged, so a
                &ldquo;trained&rdquo; 0-Attack Pokémon still puzzles breeders.
              </li>
              <li>
                <strong>Copying a spread you don&apos;t understand</strong> —
                a meta Speed tier changes every generation; tune your own EV
                number instead of trusting a season-old one.
              </li>
            </ul>
          </Section>

          <Section title="Where to go next">
            <p>
              Start with the companion articles in the Academy:{" "}
              <Link
                href="/academy/team-building-basics"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                Team Building 101
              </Link>{" "}
              turns this numbers foundation into a six-member plan, and{" "}
              <Link
                href="/academy/type-synergy-defensive-cores"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                Type Synergy: Defensive Cores
              </Link>{" "}
              shows how to make your bulk actually resist the meta.
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
            href="/pokemon-iv-calculator"
            className="transition-colors hover:text-brand"
          >
            IV Calculator
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