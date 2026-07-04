import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import TeamGeneratorClient from "./TeamGeneratorClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is a random Pokemon team generator?",
    a: "A free tool that builds a team of 6 Pokémon in one click. Filter by generation, type, or legendary status, then re-roll until you find a team you like.",
  },
  {
    q: "How many Pokemon are in a team?",
    a: "Exactly 6 — the standard team size in every mainline Pokémon game. Every team this tool generates has 6 Pokémon, no matter your filters.",
  },
  {
    q: "Can I exclude legendaries from my team?",
    a: "Yes. Set Legendary to Any to mix regular and legendary Pokémon, or set it to Only to build an all-legendary team. The default keeps legendaries in the pool.",
  },
  {
    q: "Can I generate a team for Pokemon Showdown?",
    a: "Yes. Generate a team, note the six Pokémon and their types, then recreate the roster in Pokémon Showdown's team builder. Use type filtering to aim for specific coverage.",
  },
  {
    q: "Is this team generator free?",
    a: "Yes — 100% free, no login, no watermark. Every Pokémon from Gen 1 to Gen 9 is available.",
  },
];

const WEB_APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Random Pokemon Team Generator",
  url: `${baseUrl}/random-pokemon-team-generator`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  description:
    "Build a random team of 6 Pokémon instantly. Filter by generation, type, and legendary status.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const metadata: Metadata = {
  title: { absolute: "Random Pokemon Team Generator — PokePicker" },
  description:
    "Build a random team of 6 Pokémon instantly. Filter by generation, type, and legendary status.",
  alternates: { canonical: "/random-pokemon-team-generator" },
};

export default function TeamGeneratorPage() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-zinc-100">
        <div className="mx-auto flex max-w-5xl items-center px-6 py-4">
          <Link href="/" className="text-lg font-bold text-foreground">
            PokePicker
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <TeamGeneratorClient />

        {/* SEO: What is */}
        <section className="mt-24 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">
            What is a random Pokemon team generator?
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">
            A random Pokemon team generator is a free tool that instantly
            assembles a team of 6 Pokémon from all 1025 creatures across 9
            generations. Set a generation, type, or legendary filter, hit
            generate, and get a fresh team in one click — great for Nuzlocke
            challenges, draft leagues, and escaping team-building ruts.
          </p>
        </section>

        {/* SEO: Popular Uses */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">
            Popular ways to use the team generator
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-600 dark:text-zinc-300">
            <li>
              Nuzlocke &amp; challenge runs — randomize your six and play what
              you get.
            </li>
            <li>
              Draft leagues &amp; casual battles — generate fair, unpredictable
              teams.
            </li>
            <li>
              Art &amp; writing prompts — design a trainer around a random
              roster.
            </li>
            <li>
              Type-coverage experiments — lock a type and see what shows up.
            </li>
          </ul>
        </section>

        {/* SEO: FAQ */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">
            Frequently asked questions
          </h2>
          <div className="mt-4 divide-y divide-zinc-100">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q}>
                {item.a}
              </FaqItem>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-auto border-t border-zinc-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-6 text-sm text-zinc-500">
          <span>© 2026 PokePicker</span>
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <Link
            href="/pokemon-starter-picker"
            className="transition-colors hover:text-brand"
          >
            Starter Picker
          </Link>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APP_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
    </main>
  );
}

function FaqItem({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium text-foreground [&::-webkit-details-marker]:hidden">
        {q}
        <span
          aria-hidden="true"
          className="ml-2 text-zinc-400 transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="mt-2 text-zinc-600 dark:text-zinc-300">{children}</div>
    </details>
  );
}
