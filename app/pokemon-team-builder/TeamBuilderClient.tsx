"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TeamSlots from "./TeamSlots";
import TypeAnalysisMatrix from "./TypeAnalysisMatrix";
import PokemonSelector from "./PokemonSelector";
import { HERO_TAGLINE } from "./seo-content";
import { trackEvent } from "@/app/lib/analytics";
import {
  fetchTeamByNamesAction,
  generateRandomTeamAction,
} from "@/app/lib/actions";
import type { PokemonType } from "@/lib/pokeapi/types";

/** A Pokemon on the team (client-side, no full fetch needed for type analysis). */
export interface TeamPokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprite: string;
  generation: number;
}

/** Item in the pre-loaded selector list (from SSR). */
export interface SelectorItem {
  id: number;
  name: string;
  types: string[];
  generation: number;
}

/** Build the jsdelivr CDN sprite URL from a Pokemon id. */
function spriteUrl(id: number): string {
  return `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${id}.png`;
}

const TEAM_SIZE = 6;

interface TeamBuilderClientProps {
  pokemonList: SelectorItem[];
}

export default function TeamBuilderClient({
  pokemonList,
}: TeamBuilderClientProps) {
  const [team, setTeam] = useState<(TeamPokemon | null)[]>(
    Array(TEAM_SIZE).fill(null),
  );
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "link" | "showdown">(
    "idle",
  );
  const [toast, setToast] = useState<string | null>(null);
  const urlRestoredRef = useRef(false);
  const teamSlotsRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------ */
  /* URL hash → team (on mount)                                         */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      urlRestoredRef.current = true;
      return;
    }

    const names = hash
      .split("+")
      .map((n) => decodeURIComponent(n.trim()))
      .filter(Boolean);

    if (names.length === 0) {
      urlRestoredRef.current = true;
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const fetched = await fetchTeamByNamesAction(names);
        if (cancelled) return;

        const newTeam: (TeamPokemon | null)[] = Array(TEAM_SIZE).fill(null);
        for (let i = 0; i < Math.min(fetched.length, TEAM_SIZE); i++) {
          const p = fetched[i];
          newTeam[i] = {
            id: p.id,
            name: p.name,
            types: p.types,
            sprite: spriteUrl(p.id),
            generation: p.generation,
          };
        }
        urlRestoredRef.current = true;
        setTeam(newTeam);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /* team → URL hash (on change, after initial restore)                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!urlRestoredRef.current) return;

    const names = team
      .filter((p): p is TeamPokemon => p !== null)
      .map((p) => p.name.toLowerCase().replace(/[^a-z0-9-]/g, ""));

    const newHash = names.length > 0 ? names.join("+") : "";
    const currentHash = window.location.hash.slice(1);

    if (newHash !== currentHash) {
      window.history.replaceState(
        null,
        "",
        newHash
          ? `${window.location.pathname}#${newHash}`
          : window.location.pathname,
      );
    }
  }, [team]);

  /* ------------------------------------------------------------------ */
  /* Actions                                                            */
  /* ------------------------------------------------------------------ */
  const handleSlotClick = useCallback(
    (index: number) => {
      setActiveSlot(index);
      trackEvent("team_builder_open_selector", { slot: index });

      // On desktop, scroll to the inline selector so the user sees where to pick
      if (team[index] === null) {
        requestAnimationFrame(() => {
          selectorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
    },
    [team],
  );

  const handleRemove = useCallback((index: number) => {
    setTeam((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    trackEvent("team_builder_remove", { slot: index });
  }, []);

  const handleSelect = useCallback(
    (item: SelectorItem) => {
      const pokemon: TeamPokemon = {
        id: item.id,
        name: item.name,
        types: item.types as PokemonType[],
        sprite: spriteUrl(item.id),
        generation: item.generation,
      };

      // Check if team is full (when no active slot replacement)
      if (activeSlot === null) {
        const hasEmpty = team.some((p) => p === null);
        if (!hasEmpty) {
          setToast("Your team is full. Remove a Pokemon to add a new one.");
          setTimeout(() => setToast(null), 3000);
          return;
        }
      }

      setTeam((prev) => {
        const next = [...prev];
        // Use active slot if set, otherwise fill first empty slot
        const slotIndex =
          activeSlot !== null
            ? activeSlot
            : next.findIndex((p) => p === null);
        if (slotIndex === -1) return prev; // team full
        next[slotIndex] = pokemon;
        return next;
      });
      setActiveSlot(null);
      trackEvent("team_builder_add", { pokemon: item.name });

      // Scroll to team slots so user sees the result immediately
      requestAnimationFrame(() => {
        teamSlotsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
    [activeSlot, team],
  );

  const handleSelectorClose = useCallback(() => {
    setActiveSlot(null);
  }, []);

  const handleRandomTeam = useCallback(async () => {
    setLoading(true);
    trackEvent("team_builder_random");
    try {
      const fetched = await generateRandomTeamAction();
      const newTeam: (TeamPokemon | null)[] = Array(TEAM_SIZE).fill(null);
      for (let i = 0; i < Math.min(fetched.length, TEAM_SIZE); i++) {
        const p = fetched[i];
        newTeam[i] = {
          id: p.id,
          name: p.name,
          types: p.types,
          sprite: spriteUrl(p.id),
          generation: p.generation,
        };
      }
      setTeam(newTeam);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCopyLink = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopyState("link");
      trackEvent("team_builder_copy_link");
      setTimeout(() => setCopyState("idle"), 2000);
    });
  }, []);

  const handleExportShowdown = useCallback(() => {
    const members = team.filter(
      (p): p is TeamPokemon => p !== null,
    );
    if (members.length === 0) return;

    const lines: string[] = [];
    for (const p of members) {
      lines.push(`${p.name}`);
      const ability = p.types.length > 0 ? "Ability: (default)" : "";
      if (ability) lines.push(ability);
      lines.push("");
    }

    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopyState("showdown");
      trackEvent("team_builder_export_showdown");
      setTimeout(() => setCopyState("idle"), 2000);
    });
  }, [team]);

  const filledTeam = team.filter(
    (p): p is TeamPokemon => p !== null,
  );

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Pokemon Team Builder
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
          {HERO_TAGLINE}
        </p>
      </section>

      {/* Team Slots + Actions */}
      <section ref={teamSlotsRef} className="mt-8 scroll-mt-4">
        <TeamSlots
          team={team}
          onSlotClick={handleSlotClick}
          onRemove={handleRemove}
        />

        {/* Action buttons */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleRandomTeam}
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-50"
          >
            {loading ? "Loading..." : "🎲 Random Team"}
          </button>
          <button
            onClick={handleExportShowdown}
            disabled={filledTeam.length === 0}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-surface px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand disabled:opacity-50"
          >
            {copyState === "showdown" ? "✓ Copied!" : "Export to Showdown"}
          </button>
          <button
            onClick={handleCopyLink}
            disabled={filledTeam.length === 0}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-surface px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand disabled:opacity-50"
          >
            {copyState === "link" ? "✓ Copied!" : "Copy Link"}
          </button>
        </div>
      </section>

      {/* Type Analysis */}
      <section className="mt-8">
        <TypeAnalysisMatrix team={filledTeam} />
      </section>

      {/* Pokemon Selector (inline on desktop) */}
      <section ref={selectorRef} className="mt-8 hidden scroll-mt-4 sm:block">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Add a Pokemon
        </h2>
        <PokemonSelector
          pokemonList={pokemonList}
          onSelect={handleSelect}
          onClose={handleSelectorClose}
          isMobile={false}
        />
      </section>

      {/* Pokemon Selector (mobile sheet) */}
      {activeSlot !== null && (
        <div
          className="fixed inset-0 z-50 sm:hidden"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={handleSelectorClose}
        >
          <div
            className="absolute bottom-0 left-0 right-0 h-[90vh] rounded-t-2xl bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
              <h2 className="text-lg font-bold text-foreground">
                Select Pokemon
              </h2>
              <button
                onClick={handleSelectorClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="h-[calc(90vh-60px)] overflow-hidden">
              <PokemonSelector
                pokemonList={pokemonList}
                onSelect={handleSelect}
                onClose={handleSelectorClose}
                isMobile
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
