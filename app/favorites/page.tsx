import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/SiteHeader";
import { FavoritesClient } from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Your Favorite Pokémon — Saved Collection",
  description:
    "View and manage your saved favorite Pokémon. No signup required — your collection is stored locally on your device, never on our servers.",
  alternates: { canonical: "/favorites" },
  openGraph: {
    title: "Your Favorite Pokémon — Saved Collection | PokePicker",
    description:
      "View and manage your saved favorite Pokémon. No signup required — your collection is stored locally on your device, never on our servers.",
  },
};

export default function FavoritesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />
      <FavoritesClient />

      {/* SEO: 收藏夹功能说明（服务端渲染，保证无 JS 时也有实质内容） */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          How your favorites work
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Every Pokémon card across PokePicker has a heart button. Tap it once
          to save that species to this page, and tap it again to remove it.
          Your collection appears here instantly — no account, no email, no
          password to remember. When you return to this page on the same
          device and browser, your saved Pokémon are waiting for you.
        </p>
        <h3 className="mt-6 text-lg font-bold text-foreground">
          Stored on your device, not our servers
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Your favorites live in your browser&rsquo;s local storage on your own
          device. Nothing is uploaded to us: we never see which Pokémon you
          saved, when you saved them, or from which page. This also means
          clearing your browser data will clear your collection — if you rely
          on a favorites list for a project, consider taking a screenshot as a
          backup. For more detail, see our{" "}
          <Link
            href="/privacy"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            privacy policy
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          What people use favorites for
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-800">
            <h3 className="font-semibold text-foreground">Shortlists</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Roll random Pokémon with the{" "}
              <Link href="/" className="text-brand underline underline-offset-2">
                picker
              </Link>
              , heart the ones that catch your eye, and come back to compare
              them side by side before building a team.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-800">
            <h3 className="font-semibold text-foreground">Nuzlocke rosters</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Track the species your random challenge run has rolled so far —
              a quick reference list while you plan around your{" "}
              <Link
                href="/guides/nuzlocke-random-team-challenge"
                className="text-brand underline underline-offset-2"
              >
                Nuzlocke team
              </Link>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-800">
            <h3 className="font-semibold text-foreground">Drawing references</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Artists save the species they want to sketch next, then open this
              page as a compact visual queue of sprites and names.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-800">
            <h3 className="font-semibold text-foreground">Trade checklists</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Keep a running list of species you still need for a living
              Pokédex, and check entries off as trades come in.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-zinc-100">
          <div className="py-4">
            <h3 className="font-semibold text-foreground">
              Do I need an account to save favorites?
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              No. Favorites work instantly for every visitor — there is no
              signup, login, or email anywhere on PokePicker.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-foreground">
              Will my favorites sync across devices?
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              No. Because favorites are stored only in your browser&rsquo;s
              local storage, they are per-device and per-browser. Switching
              devices starts a fresh collection.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-foreground">
              How do I remove a single Pokémon?
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Tap the heart button again on any card — here or on the page
              where you saved it. &ldquo;Clear all&rdquo; removes the entire
              collection at once.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-foreground">
              Is there a limit on how many I can save?
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              All 1025 species can be saved at once. Local storage comfortably
              holds the full Pokédex, so heart away.
            </p>
          </div>
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
