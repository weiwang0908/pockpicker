"use client";

import { useRef } from "react";
import NatureFinder from "./NatureFinder";
import NatureMatrix from "./NatureMatrix";
import NatureRecommender from "./NatureRecommender";
import { HERO_TAGLINE } from "./seo-content";
import { NATURES, type Nature } from "@/lib/pokeapi/natures";

interface NaturesClientProps {
  pokemonList: { id: number; name: string }[];
}

export default function NaturesClient({ pokemonList }: NaturesClientProps) {
  const natures: Nature[] = NATURES;
  const recommenderRef = useRef<HTMLElement>(null);

  const scrollToRecommender = () => {
    recommenderRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Pokemon Natures Chart
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
          {HERO_TAGLINE}
        </p>
        {/* Quick CTA to the recommender */}
        <button
          onClick={scrollToRecommender}
          className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Find the best nature for your Pokemon →
        </button>
      </section>

      {/* Nature Finder */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Nature Finder
        </h2>
        <NatureFinder natures={natures} />
      </section>

      {/* Inline CTA between Finder and Chart */}
      <div className="mt-8 rounded-xl border border-brand/20 bg-brand/5 p-4 text-center">
        <p className="text-sm text-zinc-700 dark:text-zinc-200">
          Not sure which nature to pick?
        </p>
        <button
          onClick={scrollToRecommender}
          className="mt-1 text-sm font-semibold text-brand underline-offset-2 hover:underline"
        >
          Get a recommendation based on your Pokemon's stats →
        </button>
      </div>

      {/* Nature Chart (5×5 matrix) */}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Pokemon Nature Chart
        </h2>
        <NatureMatrix natures={natures} />
      </section>

      {/* Best Nature Recommender */}
      <section ref={recommenderRef} className="mt-12 scroll-mt-24">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Best Nature Recommender
        </h2>
        <NatureRecommender pokemonList={pokemonList} />
      </section>
    </div>
  );
}
