import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "PokePicker Academy — Master Team Building, IVs, EVs and Natures",
  description:
    "Structured guides that turn raw Pokémon data into real skill. Learn how base stats work, how to build a competitive Pokémon, pick the best nature per role, and read the type synergy behind defensive cores.",
  alternates: { canonical: "/academy" },
  openGraph: {
    title: "PokePicker Academy — Master Team Building, IVs, EVs and Natures | PokePicker",
    description:
      "Structured guides that turn raw Pokémon data into real skill. Learn how base stats work, build competitive Pokémon, and read type synergy.",
  },
};

const ARTICLES: { href: string; title: string; excerpt: string }[] = [
  {
    href: "/academy/iv-ev-natures-guide",
    title: "IVs, EVs and Natures: Building the Perfect Competitive Pokémon",
    excerpt:
      "The complete foundation — where every stat point comes from, how the formula combines IVs, EVs, level and nature, and a worked build from start to finish.",
  },
  {
    href: "/academy/best-natures-by-role",
    title: "The Best Nature for Every Battle Role",
    excerpt:
      "A full role-by-role nature table — physical sweepers, tanks, Trick Room enablers — with the boosted and hindered stats that optimize each job.",
  },
  {
    href: "/academy/type-synergy-defensive-cores",
    title: "Type Synergy: Defensive Cores Explained",
    excerpt:
      "Why some type pairs resist nearly everything together. We compute the classic defensive cores and show what makes them hard to break.",
  },
  {
    href: "/academy/understanding-base-stats",
    title: "How to Read Base Stats Like a Pro",
    excerpt:
      "Base stats decide a Pokémon's entire identity. Learn the breakpoints, the 100-ballpark, and how to judge power, bulk and speed at a glance.",
  },
  {
    href: "/academy/team-building-basics",
    title: "Team Building 101: Roles, Coverage and Win Conditions",
    excerpt:
      "The six-member puzzle solved: build a lead, a wall, a pivot and a win condition. A practical framework you can apply to any roster — including random ones.",
  },
];

export default function AcademyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      <section className="mx-auto w-full max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          PokePicker Academy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Our tools roll dice and calculate stats. These guides teach you what
          those numbers mean. Every article is written by us, edited to be
          practical, and every table is drawn from real game data — no
          copy-paste, no fluff. Start with the foundation, then build upward.
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Start here
        </h2>
        <div className="mt-4 space-y-4">
          {ARTICLES.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="block rounded-2xl border border-zinc-100 p-5 transition-colors hover:border-brand/50 dark:border-zinc-800"
            >
              <h3 className="font-semibold text-foreground">{article.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-zinc-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-6 text-sm text-zinc-500">
          <span>&copy; 2026 PokePicker</span>
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <Link
            href="/random-pokemon-team-generator"
            className="transition-colors hover:text-brand"
          >
            Team Generator
          </Link>
          <Link
            href="/pokemon-iv-calculator"
            className="transition-colors hover:text-brand"
          >
            IV Calculator
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-brand">
            Privacy
          </Link>
        </div>
      </footer>
    </main>
  );
}