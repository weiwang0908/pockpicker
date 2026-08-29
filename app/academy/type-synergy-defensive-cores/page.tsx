import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "Type Synergy: Defensive Cores Explained",
  description:
    "Why some type pairs resist almost everything together. We compute the classic defensive cores — Steel/Water, Grass/Fire, Electric/Fire — and show exactly what each pair likes to switch into.",
  alternates: { canonical: "/academy/type-synergy-defensive-cores" },
  openGraph: {
    title: "Type Synergy: Defensive Cores Explained | PokePicker",
    description:
      "The classic defensive cores decoded — which type pairs cover each other's weaknesses and why they're so hard to break.",
  },
};

const CORES: {
  name: string;
  pairing: string;
  swichins: string;
  hole: string;
}[] = [
  {
    name: "The classic: Steel + Water",
    pairing: "A bulky Water and a Steel wall",
    swichins:
      "Steel resists or absorbs Electric, Grass and Rock — Water's three real threats; Water returns the favor by resisting Fire and Ground attacks aimed at Steel.",
    hole: "Still caught by a strong Ground or Fighting move that neither resists — the pair compensates with a blessed third type on one member whenever possible.",
  },
  {
    name: "The elemental duo: Grass + Fire",
    pairing: "A Grass wall and a Fire attacker",
    swichins:
      "Grass shrugs off the Water and Ground problems Fire faces; Fire crisps the Bug, Ice and Grass attacks Grass fears. Together they cover each other's type counters entirely.",
    hole: "Ground and Flying moves still worry both, so the physical Rock-type bird that threatens Grass and is hit neutrally by Fire needs a third slot.",
  },
  {
    name: "The defensive total: Electric + Fire",
    pairing: "An Electric pivot and a Fire check",
    swichins:
      "Electric threatens the Water and Ground types Fire randomly eats Stone-versus, while Fire answers the Grass and Bug attacks that pressure Electric. The electrical typeness also shuts down paralysis bait.",
    hole: "Both are fragile to Rock and Ground hazards — a Stealth Rock weakness makes this duo lean on hazard control.",
  },
  {
    name: "The modern pair: Fairy + Steel",
    pairing: "A Fairy wall and a Steel partner",
    swichins:
      "Steel resists the Poison and Steel that trouble Fairy, and Fairy threatens the Fighting and Dark (plus Dragon) that break Steel. The most splash-proof defensive duo of recent generations.",
    hole: "Both are pressed by Ground and Fire — which is why Fairy/Steel adds a Water or Flying third almost any chance it gets.",
  },
];

export default function TypeSynergyPage() {
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
          Type Synergy: Defensive Cores Explained
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A team doesn&apos;t win because two Pokémon are individually bulky; it
          wins because their types cover each other&apos;s weaknesses until
          the opponent runs out of super-effective buttons. This is the
          concept of a <em>defensive core</em>, and it is the highest-leverage
          idea in team building. Here is how it works, the classic pairs, and
          how to read any type chart to build your own.
        </p>

        <div className="mt-8 space-y-6">
          <Section title="What a defensive core actually is">
            <p>
              A defensive core is two (sometimes three) Pokémon whose resist
              lists fill each other&apos;s gaps. The test is simple: find the
              attacks of each type the opponent can throw, and check whether
              every common attacking type is resisted, absorbed, or at least
              never hits both members super-effectively. A core that covers
              both neutral damage and the specific super-effectives of the
              meta holds long enough for the rest of the team to do its job.
              Cores are judged on two axes: <strong>coverage</strong> (how
              many attacking types the pair neutralizes) and{" "}
              <strong>splash-ability</strong> (how many species can fill the
              roles). The best cores are common because their member types
              appear on hundreds of viable Pokémon.
            </p>
          </Section>

          <Section title="The classic defensive cores">
            {null}
          </Section>
          <div className="-mt-3 space-y-5">
            {CORES.map((c) => (
              <div key={c.name} className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-800">
                <h3 className="font-semibold text-foreground">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="font-medium text-foreground">What it likes:</span>{" "}
                  {c.swichins}
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  <span className="font-medium text-foreground">Its hole:</span>{" "}
                  {c.hole}
                </p>
              </div>
            ))}
          </div>

          <Section title="How to read a type chart for a core">
            <p>
              You don&apos;t memorize twenty-eight pairs; you read the{" "}
              <Link
                href="/pokemon-type-chart"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                type chart
              </Link>{" "}
              with one question in mind: <em>for each attacking type, does
              anything in my pair resist it?</em> Start with your
              would-be-wall&apos;s weaknesses, then look for a partner whose
              resist list includes exactly those weaknesses. Saying &ldquo;my
              Water wall fears Electric and Grass&rdquo; immediately points at
              a Steel or Ground partner that eats both. The second pass checks
              the pair&apos;s shared weaknesses — if both members fear Ground,
              you haven&apos;t built a core, you&apos;ve built a stacked wall
              with a hole. Use our{" "}
              <Link
                href="/random-pokemon-team-generator"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                team generator
              </Link>{" "}
              to practice: generate a random pair and try to name the 
              attacking types that break both members before you click again.
            </p>
          </Section>

          <Section title="The three-type rhythm">
            <p>
              Most strong teams don&apos;t run two-type cores; they run a
              rhythm of three where the third member covers the pair&apos;s
              hole. The Steel/Water core adds a Ground-or-Fairy-resistant piece,
              the Grass/Fire core adds an answer to Rock and Flying. This is
              why the strongest defensive cores become almost archetypal —
              Landorus, Ferrothorn and Corviknight twisting around each
              other&apos;s resistances is a geometry metagame all its own. When
              you review your own team, look for the one attacking type that
              hits three of your six super-effectively; fixing that single
              hole does more than any individual stat change.
            </p>
          </Section>

          <Section title="From theory to your team">
            <p>
              The fastest way to internalize cores is to see them fail.
              Generate a{" "}
              <Link
                href="/random-pokemon-team-generator"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                random six
              </Link>
              , list the attacking types that hit the most members
              super-effectively, and note which single type change would fix
              it. In Nuzlocke runs this is the exact planning the{" "}
              <Link
                href="/guides/nuzlocke-random-team-challenge"
                className="text-brand underline underline-offset-2 hover:opacity-80"
              >
                random team guide
              </Link>{" "}
              preaches before the first badge — a roster with one mid-core
              beats a roster of six highlights every time. Cores are not
              decoration; they are the reason some random teams coast through
              dragon-heavy endgames and others die at the third gym.
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
            href="/pokemon-type-chart"
            className="transition-colors hover:text-brand"
          >
            Type Chart
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