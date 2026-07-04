import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import StarterPickerClient from "./StarterPickerClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is a Pokemon starter picker?",
    a: "A free tool that randomly picks one starter Pokémon from any generation in a single click. Re-roll as many times as you like until you get a starter you want to play with.",
  },
  {
    q: "Which generation starters can I pick from?",
    a: "All of them — Gen 1 through Gen 9. Use the Generation filter to restrict the pool to a single generation, or leave it on All to pull from every starter at once.",
  },
  {
    q: "Can I get all three starters from one generation?",
    a: "This tool picks one starter at a time. Pick a generation, then re-roll repeatedly to cycle through that generation's three starters and their evolutions.",
  },
  {
    q: "Are starter evolutions included?",
    a: "Yes. The starter pool includes each starter's full evolution chain, so you can roll a first-stage partner or a fully evolved one.",
  },
  {
    q: "Is this starter picker free?",
    a: "Yes — 100% free, no login, no watermark. Every starter from Gen 1 to Gen 9 is available.",
  },
];

const WEB_APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pokemon Starter Picker",
  url: `${baseUrl}/pokemon-starter-picker`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  description:
    "Pick a random starter Pokémon from any generation. Perfect for challenge runs and new playthroughs.",
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
  title: { absolute: "Pokemon Starter Picker — PokePicker" },
  description:
    "Pick a random starter Pokémon from any generation. Perfect for challenge runs and new playthroughs.",
  alternates: { canonical: "/pokemon-starter-picker" },
};

export default function StarterPickerPage() {
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
        <StarterPickerClient />

        {/* SEO: What is */}
        <section className="mt-24 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">
            What is a Pokemon starter picker?
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">
            A Pokemon starter picker is a free tool that randomly selects one
            starter Pokémon from any generation — from Bulbasaur all the way to
            Sprigatito. Lock a generation or type, hit pick, and get a random
            starter for your next playthrough.
          </p>
        </section>

        {/* SEO: Popular Uses */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">
            Popular ways to use the starter picker
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-600 dark:text-zinc-300">
            <li>
              New playthroughs — let chance pick your first partner.
            </li>
            <li>
              Nuzlocke &amp; challenge runs — start with a random starter.
            </li>
            <li>
              Mono-type runs — lock a type and roll a starter that fits.
            </li>
            <li>
              Break decision paralysis between grass, fire, and water.
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
            href="/random-pokemon-team-generator"
            className="transition-colors hover:text-brand"
          >
            Team Generator
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
