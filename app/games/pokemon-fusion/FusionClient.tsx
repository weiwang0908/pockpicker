"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  fetchPokemonForFusionAction,
  fetchRandomPokemonForGameAction,
  type FusionPokemon,
} from "@/app/lib/actions";
import { TYPE_DATA } from "@/app/lib/type-data";
import { trackEvent } from "@/app/lib/analytics";

function combineNames(a: string, b: string): string {
  const halfA = Math.ceil(a.length / 2);
  const halfB = Math.floor(b.length / 2);
  return (
    a.slice(0, halfA) + b.slice(halfB)
  );
}

function combineTypes(a: string[], b: string[]): string[] {
  const combined = [...a, ...b];
  return [...new Set(combined)].slice(0, 2);
}

export function FusionClient() {
  const [headName, setHeadName] = useState("bulbasaur");
  const [bodyName, setBodyName] = useState("charmander");
  const [head, setHead] = useState<FusionPokemon | null>(null);
  const [body, setBody] = useState<FusionPokemon | null>(null);
  const [loading, setLoading] = useState<"both" | "random" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadBoth = useCallback(async (h: string, b: string) => {
    setLoading("both");
    setError(null);
    try {
      const [hData, bData] = await Promise.all([
        fetchPokemonForFusionAction(h.toLowerCase().trim()),
        fetchPokemonForFusionAction(b.toLowerCase().trim()),
      ]);
      if (!hData) {
        setError(`Pokémon "${h}" not found.`);
        return;
      }
      if (!bData) {
        setError(`Pokémon "${b}" not found.`);
        return;
      }
      setHead(hData);
      setBody(bData);
      trackEvent("pokemon_fusion", { head: hData.name, body: bData.name });
    } catch {
      setError("Failed to fetch Pokémon data.");
    } finally {
      setLoading(null);
    }
  }, []);

  const handleRandom = useCallback(async () => {
    setLoading("random");
    setError(null);
    try {
      const mons = await fetchRandomPokemonForGameAction(2);
      if (mons.length < 2) return;
      const [hData, bData] = await Promise.all([
        fetchPokemonForFusionAction(mons[0].name),
        fetchPokemonForFusionAction(mons[1].name),
      ]);
      if (hData && bData) {
        setHeadName(hData.name);
        setBodyName(bData.name);
        setHead(hData);
        setBody(bData);
        trackEvent("pokemon_fusion_random", {
          head: hData.name,
          body: bData.name,
        });
      }
    } catch {
      setError("Failed to generate random fusion.");
    } finally {
      setLoading(null);
    }
  }, []);

  const fusedName = head && body ? combineNames(head.name, body.name) : null;
  const fusedTypes = head && body ? combineTypes(head.types, body.types) : [];

  return (
    <div className="flex flex-col gap-8">
      {/* Selectors */}
      <section className="mx-auto w-full max-w-3xl px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-100 bg-surface p-4 shadow-sm">
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
              Head Pokémon
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && loadBoth(headName, bodyName)
                }
                placeholder="e.g. pikachu"
                className="h-11 flex-1 rounded-lg border border-zinc-200 px-3 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-surface p-4 shadow-sm">
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
              Body Pokémon
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={bodyName}
                onChange={(e) => setBodyName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && loadBoth(headName, bodyName)
                }
                placeholder="e.g. charizard"
                className="h-11 flex-1 rounded-lg border border-zinc-200 px-3 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => loadBoth(headName, bodyName)}
            disabled={loading !== null}
            className="inline-flex h-11 items-center rounded-full bg-brand px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading === "both" ? "Fusing…" : "⚡ Fuse Pokémon"}
          </button>
          <button
            type="button"
            onClick={handleRandom}
            disabled={loading !== null}
            className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-surface px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
          >
            {loading === "random" ? "…" : "🎲 Random"}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-center text-sm text-red-500">{error}</p>
        )}
      </section>

      {/* Fusion result */}
      {head && body && (
        <section className="mx-auto w-full max-w-3xl px-6">
          <div className="rounded-2xl border border-zinc-100 bg-surface p-6 shadow-sm sm:p-8">
            {/* Parents */}
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={head.sprite}
                  alt={head.name}
                  width={80}
                  height={80}
                  className="mx-auto h-20 w-20 object-contain"
                />
                <p className="mt-1 text-xs font-medium capitalize text-muted">
                  {head.name}
                </p>
              </div>
              <span className="text-2xl text-zinc-300">+</span>
              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={body.sprite}
                  alt={body.name}
                  width={80}
                  height={80}
                  className="mx-auto h-20 w-20 object-contain"
                />
                <p className="mt-1 text-xs font-medium capitalize text-muted">
                  {body.name}
                </p>
              </div>
              <span className="text-2xl text-zinc-300">=</span>
              {/* Fused sprite: head on top, body on bottom, CSS blend */}
              <div className="relative text-center">
                <div className="relative h-20 w-20 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={head.sprite}
                    alt=""
                    width={80}
                    height={40}
                    className="absolute left-0 top-0 h-10 w-20 object-contain"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={body.sprite}
                    alt=""
                    width={80}
                    height={40}
                    className="absolute left-0 bottom-0 h-10 w-20 object-contain"
                    style={{ objectFit: "cover", objectPosition: "bottom" }}
                  />
                </div>
                <p className="mt-1 text-xs font-bold text-brand">
                  {fusedName}
                </p>
              </div>
            </div>

            {/* Fused info */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold capitalize text-foreground">
                {fusedName}
              </h2>
              <div className="mt-2 flex justify-center gap-2">
                {fusedTypes.map((t) => {
                  const meta = TYPE_DATA[t as keyof typeof TYPE_DATA];
                  if (!meta) return null;
                  return (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs font-medium text-white"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.emoji} {meta.displayName}
                    </span>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted">
                Fusion of {head.name}&rsquo;s head and {body.name}&rsquo;s body.
                Name combined from both parents.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SEO cross-links */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-8">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Want more Pokemon fun? Try our{" "}
          <Link href="/" className="text-brand underline">
            random Pokemon picker
          </Link>
          , play{" "}
          <Link
            href="/games/whos-that-pokemon"
            className="text-brand underline"
          >
            Who&rsquo;s That Pokémon
          </Link>
          , or check the{" "}
          <Link href="/pokemon-type-chart" className="text-brand underline">
            type chart
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
