import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/SiteHeader";
import { FavoritesClient } from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Your Favorite Pokémon — Saved Collection",
  description:
    "View and manage your saved favorite Pokémon. No signup required — your collection is stored locally on your device.",
  alternates: { canonical: "/favorites" },
  openGraph: {
    title: "Your Favorite Pokémon — Saved Collection | PokePicker",
    description:
      "View and manage your saved favorite Pokémon. No signup required — your collection is stored locally on your device.",
  },
};

export default function FavoritesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />
      <FavoritesClient />
      <footer className="mt-auto border-t border-zinc-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-6 text-sm text-zinc-500">
          <span>&copy; 2026 PokePicker</span>
        </div>
      </footer>
    </main>
  );
}
