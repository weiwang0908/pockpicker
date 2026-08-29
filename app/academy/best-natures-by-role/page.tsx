import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "The Best Nature for Every Battle Role",
  description:
    "A complete role-by-role nature guide: physical sweepers, special attackers, walls, tanks, Trick Room enablers and speedtiers — with a full 25-nature reference table and priority rules.",
  alternates: { canonical: "/academy/best-natures-by-role" },
  openGraph: {
    title: "The Best Nature for Every Battle Role | PokePicker",
    description:
      "Pick the perfect nature for every team role — sweepers, walls, tanks and Trick Room builds — from the full 25-nature table.",
  },
};

const ROLE_TABLE: {
  role: string;
  nature: string;
  boost: string;
  hinder: string;
}[] = [
  {
    role: "Physical sweeper (fast)",
    nature: "Jolly",
    boost: "Speed",
    hinder: "Special Attack",
  },
  {
    role: "Physical sweeper (bulky)",
    nature: "Adamant",
    boost: "Attack",
    hinder: "Special Attack",
  },
  {
    role: "Special sweeper (fast)",
    nature: "Timid",
    boost: "Speed",
    hinder: "Attack",
  },
  {
    role: "Special sweeper (bulky)",
    nature: "Modest",
    boost: "Special Attack",
    hinder: "Attack",
  },
  {
    role: "Physical wall",
    nature: "Impish",
    boost: "Defense",
    hinder: "Special Attack",
  },
  {
    role: "Special wall",
    nature: "Calm",
    boost: "Special Defense",
    hinder: "Attack",
  },
  {
    role: "Mixed wall (physical bias)",
    nature: "Bold",
    boost: "Defense",
    hinder: "Attack",
  },
  {
    role: "Mixed wall (special bias)",
    nature: "Careful",
    boost: "Special Defense",
    hinder: "Special Attack",
  },
  {
    role: "Trick Room physical",
    nature: "Brave",
    boost: "Attack",
    hinder: "Speed",
  },
  {
    role: "Trick Room special",
    nature: "Quiet",
    boost: "Special Attack",
    hinder: "Speed",
  },
  {
    role: "Trick Room wall",
    nature: "Relaxed",
    boost: "Defense",
    hinder: "Speed",
  },
  {
    role: "Gyro Ball user",
    nature: "Relaxed / Brave",
    boost: "Defense or Attack",
    hinder: "Speed",
  },
];

const NATURE_TABLE: { nature: string; boosted: string; hindered: string }[] = [
  { nature: "Lonely", boosted: "Attack", hindered: "Defense" },
  { nature: "Adamant", boosted: "Attack", hindered: "Special Attack" },
  { nature: "Naughty", boosted: "Attack", hindered: "Special Defense" },
  { nature: "Brave", boosted: "Attack", hindered: "Speed" },
  { nature: "Bold", boosted: "Defense", hindered: "Attack" },
  { nature: "Impish", boosted: "Defense", hindered: "Special Attack" },
  { nature: "Lax", boosted: "Defense", hindered: "Special Defense" },
  { nature: "Relaxed", boosted: "Defense", hindered: "Speed" },
  { nature: "Modest", boosted: "Special Attack", hindered: "Attack" },
  { nature: "Mild", boosted: "Special Attack", hindered: "Defense" },
  { nature: "Rash", boosted: "Special Attack", hindered: "Special Defense" },
  { nature: "Quiet", boosted: "Special Attack", hindered: "Speed" },
  { nature: "Calm", boosted: "Special Defense", hindered: "Attack" },
  { nature: "Gentle", boosted: "Special Defense", hindered: "Defense" },
  { nature: "Careful", boosted: "Special Defense", hindered: "Special Attack" },
  { nature: "Sassy", boosted: "Special Defense", hindered: "Speed" },
  { nature: "Timid", boosted: "Speed", hindered: "Attack" },
  { nature: "Hasty", boosted: "Speed", hindered: "Defense" },
  { nature: "Jolly", boosted: "Speed", hindered: "Special Attack" },
  { nature: "Naive", boosted: "Speed", hindered: "Special Defense" },
  { nature: "Serious", boosted: "—", hindered: "—" },
  { nature: "Hardy", boosted: "—", hindered: "—" },
  { nature: "Docile", boosted: "—", hindered: "—" },
  { nature: "Bashful", boosted: "—", hindered: "—" },
  { nature: "Quirky", boosted: "—", hindered: "—" },
];

export default function BestNaturesByRolePage() {
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
          The Best Nature for Every Battle Role
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Natures are a 10% stat swing hiding behind a personality name — and
          the cheapest optimization in competitive Pokémon. Pick the right one
          and matchups that were 50/50 suddenly tilt; pick the wrong one and
          your sweepers lose on a couple of key stat points. This guide maps
          every role to its best nature, then lists the full 25 so you can
          decode any breed you catch.
        </p>

        <div className="mt-8 space-y-6">
          <Section title="The one rule that never changes">
            <p>
              Boost the stat that wins you games; hinder the one you never
              use. Every choice below is just that rule applied to a role.
              Two corollaries: <strong>never hinder the stat a move you run
              keys off</strong> (0-Attack special attackers still need their
              Speed), and <strong>HP is never affected by any nature</strong>,
              so no nature ever contains HP as boost or hindrance. If two
              roles argue over the same Pokémon, decide which one actually sees
              battle time — a wall that almost never attacks happily drops its
              offensive stat for extra Defense.
            </p>
          </Section>

          <Section title="Best nature by role">
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Role
                    </th>
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Nature
                    </th>
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Boosted
                    </th>
                    <th className="py-2 font-semibold text-foreground">
                      Hindered
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {ROLE_TABLE.map((row) => (
                    <tr key={row.role}>
                      <td className="py-2 pr-4 align-top font-medium text-foreground">
                        {row.role}
                      </td>
                      <td className="py-2 pr-4 align-top">{row.nature}</td>
                      <td className="py-2 pr-4 align-top">{row.boost}</td>
                      <td className="py-2 align-top">{row.hinder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Speed tiers decide the sweeper nature">
            <p>
              For physical and special sweepers, the fast (Jolly/Timid) versus
              bulky (Adamant/Modest) choice is decided by speed tiers, not
              preference. If a Pokémon&apos;s base Speed, with a positive Speed
              nature and maximum Speed EVs, outruns the relevant speed tier of
              the current meta, it takes the +Speed nature; if it can&apos;t
              meaningfully outrun anything important, a +Attack/SpAtk nature
              that lands it more KOs is worth more. Base 100 is the classic
              threshold — Timid/Jolly base-100s like Gengar and Garchomp are
              cheap-effort speedsters — while base-65-and-below physical
              attackers almost always prefer raw power because no Speed nature
              fixes a stat floor that low. Our{" "}
              <Link
                href="/pokemon-iv-calculator"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                IV calculator
              </Link>{" "}
              is the fastest way to check: load your spread, toggle the nature,
              and watch which stat value flips first.
            </p>
          </Section>

          <Section title="Trick Room and Gyro Ball reverse everything">
            <p>
              Two build types break the &ldquo;boost your speed&rdquo; default.
              Trick Room teams <em>want</em> to be slow — slower Pokémon move
              first under the field — so they run Brave (physical) or Quiet
              (special) to actively <em>reduce</em> Speed while gaining power,
              and Relaxed or Sassy for walls. Gyro Ball works the same way: the
              move&apos;s damage scales <em>inversely</em> with the user&apos;s
              Speed, so a high Speed stat makes Gyro Ball weaker. Slow, bulky
              Steel-types like Ferrothorn and Copperajah live on Relaxed or
              Brave. The principle is always the same — hinder the stat your
              strategy doesn&apos;t need — Trick Room just changes which stat
              that is.
            </p>
          </Section>

          <Section title="The full 25 natures, decoded">
            <p>
              Lightning-round versions of most teams only use the six or so
              natures above. This complete table covers every possibility so
              you can read any catch instantly:
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Nature
                    </th>
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Boosted
                    </th>
                    <th className="py-2 font-semibold text-foreground">
                      Hindered
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {NATURE_TABLE.map((row) => (
                    <tr key={row.nature}>
                      <td className="py-2 pr-4 align-top font-medium text-foreground">
                        {row.nature}
                      </td>
                      <td className="py-2 pr-4 align-top">{row.boosted}</td>
                      <td className="py-2 align-top">{row.hindered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              The five neutral natures (Serious, Hardy, Docile, Bashful,
              Quirky) have no effect — they appear when a Pokémon rolls a
              combination that cancels out, and are always worth breeding over
              if you need the 10%.
            </p>
          </Section>

          <Section title="How nature interacts with the rest of the build">
            <p>
              Nature is the last multiplier in the stat formula, applied after
              base, IV and EV are combined and scaled by level. That means it
              compounds: a 10% speed boost on a Pokémon that already maxed
              Speed EVs and IVs lands a much larger absolute number than the
              same nature on a poked speed stat. This is why you read the{" "}
              <Link
                href="/academy/iv-ev-natures-guide"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                IV/EV/nature guide
              </Link>{" "}
              before optimizing a build: optimize the base first, then let the
              nature push you over the breakpoint. A nature can never fix bad
              IVs or a wrong EV budget — it only multiplies what is already
              there.
            </p>
          </Section>

          <Section title="Quick-reference decision list">
            <ul className="list-disc gap-2 pl-5 text-sm leading-relaxed">
              <li>Fast physical attacker &rarr; <strong>Jolly</strong></li>
              <li>Bulky physical attacker &rarr; <strong>Adamant</strong></li>
              <li>Fast special attacker &rarr; <strong>Timid</strong></li>
              <li>Bulky special attacker &rarr; <strong>Modest</strong></li>
              <li>Physical wall &rarr; <strong>Impish</strong>; special wall &rarr; <strong>Calm</strong></li>
              <li>Trick Room attacker &rarr; <strong>Brave / Quiet</strong></li>
              <li>Gyro Ball user &rarr; <strong>Relaxed</strong></li>
              <li>Struggling? Start with <strong>Adamant or Modest</strong> — power is never wasted in casual play.</li>
            </ul>
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