'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Filters from './Filters';
import { PokemonCardList } from './PokemonCardList';
import { defaultFilter, type FilterOptions } from './Filters';
import { getRandomPokemon, pickSprite } from '@/lib/pokeapi/client';
import type {
  FilterOptions as ApiFilterOptions,
  Pokemon as ApiPokemon,
} from '@/lib/pokeapi/types';
import type { Pokemon as CardPokemon } from '@/app/lib/type-data';

/* -------------------------------------------------------------------------- */
/* Type bridges                                                                */
/* Filters.tsx exports its own FilterOptions (number|null / boolean).         */
/* lib/pokeapi/client expects the FilterOptions from lib/pokeapi/types         */
/* ("all" / "on"|"off"). Same story for Pokemon: client returns the rich       */
/* PokeAPI Pokemon, but PokemonCardList consumes the lean type-data Pokemon.   */
/* Existing components must not be modified, so we adapt at the boundary.     */
/* -------------------------------------------------------------------------- */

function toApiFilter(f: FilterOptions): ApiFilterOptions {
  return {
    generation: (f.generation ?? 'all') as ApiFilterOptions['generation'],
    type: (f.type ? f.type.toLowerCase() : 'all') as ApiFilterOptions['type'],
    legendary: f.legendary,
    shiny: f.shiny ? 'on' : 'off',
    starter: f.starter ? 'on' : 'off',
    count: f.count,
  };
}

function toCardPokemon(p: ApiPokemon, shiny: boolean): CardPokemon {
  return {
    id: p.id,
    name: p.displayName,
    types: p.types,
    sprite: pickSprite(p.sprites, shiny) ?? p.sprites.frontDefault ?? '',
    generation: p.generation,
    height: p.height,
    weight: p.weight,
    abilities: p.abilities.map((a) => a.name),
  };
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

interface HomeClientProps {
  faqItems: { q: string; a: string }[];
}

export default function HomeClient({ faqItems }: HomeClientProps) {
  const [filter, setFilter] = useState<FilterOptions>(defaultFilter);
  const [results, setResults] = useState<CardPokemon[]>([]);
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultKey, setResultKey] = useState(0);

  const resultRef = useRef<HTMLDivElement>(null);
  const scrollPendingRef = useRef(false);
  const hasStartedRef = useRef(false);
  const reqIdRef = useRef(0);

  const fetchResults = useCallback(
    async (f: FilterOptions, teamMode: boolean): Promise<CardPokemon[]> => {
      const apiFilter = toApiFilter(f);
      const count = teamMode ? 6 : f.count;
      const raw = await getRandomPokemon(apiFilter, count);
      return raw.map((p) => toCardPokemon(p, f.shiny));
    },
    [],
  );

  // Single source of truth for generation. A request token guards against
  // stale writes when filters change faster than the network resolves.
  const runGenerate = useCallback(
    async (f: FilterOptions, teamMode: boolean, opts: { scroll: boolean }) => {
      const id = ++reqIdRef.current;
      setIsGenerating(true);
      if (opts.scroll) scrollPendingRef.current = true;
      try {
        const r = await fetchResults(f, teamMode);
        if (id !== reqIdRef.current) return; // superseded
        setResults(r);
        setResultKey((k) => k + 1);
      } catch {
        /* keep previous results on error */
      } finally {
        if (id === reqIdRef.current) setIsGenerating(false);
      }
    },
    [fetchResults],
  );

  // Smooth-scroll to the result section after a CTA-triggered render.
  useEffect(() => {
    if (!scrollPendingRef.current) return;
    scrollPendingRef.current = false;
    const id = requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(id);
  }, [results, resultKey]);

  const handlePick = (teamMode: boolean) => {
    setIsTeamMode(teamMode);
    hasStartedRef.current = true;
    void runGenerate(filter, teamMode, { scroll: true });
  };

  const handleReroll = () => {
    void runGenerate(filter, isTeamMode, { scroll: false });
  };

  const handleFilterChange = (next: FilterOptions) => {
    setFilter(next);
    if (!hasStartedRef.current) return; // don't auto-generate before first pick
    void runGenerate(next, isTeamMode, { scroll: false });
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* Logo bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-100 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center px-6 py-3">
          <span className="text-base font-bold tracking-tight text-foreground">
            🎲 PokePicker
          </span>
        </div>
      </header>

      {/* 1. Hero */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-12 text-center sm:py-20 md:py-28">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Random Pokemon Picker
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
          Generate a random Pokémon instantly. Perfect for challenges, team
          building and fun.
        </p>
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => handlePick(false)}
            disabled={isGenerating}
            className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isGenerating ? 'Picking…' : 'Pick a Pokémon'}
          </button>
          <button
            type="button"
            onClick={() => handlePick(true)}
            disabled={isGenerating}
            className="inline-flex w-full max-w-md items-center justify-center rounded-full border border-zinc-200 bg-surface px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Pick a Team
          </button>
        </div>
      </section>

      {/* 2. Result */}
      <section
        ref={resultRef}
        className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-12"
      >
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">
          {isTeamMode ? 'Your Team' : 'Your Pokémon'}
        </h2>
        {results.length > 0 ? (
          // key forces remount → retriggers the card-reveal + 200ms fade.
          <div key={resultKey} className="animate-pp-fade">
            <PokemonCardList pokemons={results} isTeamMode={isTeamMode} />
          </div>
        ) : (
          <p className="text-center text-sm text-muted">
            {isGenerating
              ? 'Picking your Pokémon…'
              : 'Tap “Pick a Pokémon” to start.'}
          </p>
        )}
        {results.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleReroll}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-surface px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? 'Rerolling…' : '🔄 Re-roll'}
            </button>
          </div>
        )}
      </section>

      {/* 3. Filters */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-foreground">
          Filters
        </h2>
        <Filters filter={filter} onChange={handleFilterChange} />
      </section>

      {/* 4. Popular Tools */}
      <section className="border-t border-zinc-100 bg-zinc-50/60">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">
            Popular Tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ToolCard
              href="/random-pokemon-team-generator"
              title="Team Generator"
            />
            <ToolCard href="/pokemon-starter-picker" title="Starter Picker" />
            <ComingSoonCard title="Legendary Generator" />
            <ComingSoonCard title="Shiny Generator" />
          </div>
        </div>
      </section>

      {/* 5. SEO content */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          What is a Random Pokemon Picker?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          A random Pokemon picker is a free tool that selects a Pokémon for you
          at random from all 1025 species across generations 1 to 9. Pick a
          single Pokémon or generate a full team of six, with optional filters
          for generation, type, legendary status and shiny form. It&apos;s
          perfect for Nuzlocke challenges, team building, art prompts or any time
          you need a fair, instant random pick.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
          Popular Uses
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
          {['Team building', 'Nuzlocke challenges', 'Art prompts', 'Drawing inspiration'].map(
            (use) => (
              <li key={use} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-brand">
                  •
                </span>
                {use}
              </li>
            ),
          )}
        </ul>

        <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
          FAQ
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-zinc-100 bg-surface px-4 py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="ml-3 text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="text-sm font-bold text-foreground">
            🎲 PokePicker
          </div>
          <nav className="flex gap-5 text-sm text-muted">
            <a href="#" className="transition-colors hover:text-brand">
              About
            </a>
            <a href="#" className="transition-colors hover:text-brand">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-brand">
              Contact
            </a>
            <a href="#" className="transition-colors hover:text-brand">
              API
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Popular Tools sub-components                                                */
/* -------------------------------------------------------------------------- */

function ToolCard({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
    >
      <div className="text-base font-semibold text-foreground">{title}</div>
      <div className="mt-1 flex-1 text-xs text-muted">Try the tool →</div>
      <span className="mt-4 inline-flex w-fit rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white">
        Visit
      </span>
    </a>
  );
}

function ComingSoonCard({ title }: { title: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-dashed border-zinc-300 bg-surface/60 p-5">
      <div className="text-base font-semibold text-foreground">{title}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
        Coming soon
      </div>
      <div className="mt-4">
        <NotifyMe />
      </div>
    </div>
  );
}

function NotifyMe() {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <p className="text-xs font-medium text-brand">
        Thanks! We&apos;ll notify you.
      </p>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex flex-col gap-2"
    >
      <label className="sr-only" htmlFor="notify-email">
        Email
      </label>
      <input
        id="notify-email"
        type="email"
        required
        placeholder="you@example.com"
        className="min-w-0 rounded-full border border-zinc-200 bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-brand sm:text-xs sm:py-1.5"
      />
      <button
        type="submit"
        className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand sm:text-xs sm:py-1.5"
      >
        Notify me
      </button>
    </form>
  );
}
