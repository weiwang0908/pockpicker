import type { Metadata } from "next";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: { absolute: "About — PokePicker" },
  description:
    "Learn about PokePicker's mission to build the best Pokémon random tool.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <StaticPageLayout title="About PokePicker">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p className="text-lg text-zinc-900 dark:text-zinc-100">
          Our mission: build the best Pokémon random tool on the web.
        </p>

        <p>
          PokePicker exists for one reason — to make picking a random Pokémon
          as fast and frictionless as possible. No accounts, no popups, no
          clutter.
        </p>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Why we built it
          </h2>
          <p className="mt-2">
            Most Pokémon picker sites bury the action behind ads, modals, and
            sign-up walls. We took the opposite path:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Minimal UX — one tap, one card.</li>
            <li>Implicit sharing — every pick generates a shareable card.</li>
            <li>Three seconds from intent to result.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Tech stack
          </h2>
          <p className="mt-2">
            Built with Next.js (App Router + React Server Components), powered
            by PokeAPI, and styled with Tailwind CSS. Shipped as a small, fast,
            open project — feel free to peek under the hood.
          </p>
        </div>

        <p>
          Built by developers, for developers and fans. Questions or ideas?{" "}
          <a
            href="/contact"
            className="font-medium text-brand underline underline-offset-2 hover:opacity-80"
          >
            Contact us &rarr;
          </a>
        </p>
      </div>
    </StaticPageLayout>
  );
}
