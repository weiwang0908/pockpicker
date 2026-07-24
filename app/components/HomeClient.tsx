'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Filters from './Filters';
import { PokemonCardList } from './PokemonCardList';
import { defaultFilter, type FilterOptions } from './Filters';
import { generateRandomAction } from '@/app/lib/actions';
import { trackEvent } from '@/app/lib/analytics';
import type { Pokemon as CardPokemon } from '@/app/lib/type-data';
import { Logo } from './Logo';
import { SiteHeader } from './SiteHeader';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

interface HomeClientProps {
  faqItems: { q: string; a: string }[];
  /** 服务端预生成的首屏结果（用户落地即见，0 等待） */
  initialResults: CardPokemon[];
  /** 自定义 Hero 区域 H1 文案（默认面向首页关键词） */
  heroTitle?: string;
  /** 自定义 Hero 副标题 */
  heroSubtitle?: string;
  /** 自定义 CTA 按钮下方提示 */
  heroHint?: string;
  /** 自定义 SEO 内容区域（H2 段落、Popular Uses 等） */
  seoContent?: ReactNode;
  /** 自定义 Popular Tools 卡片列表（默认为首页的工具集） */
  popularTools?: ReactNode;
}

export default function HomeClient({
  faqItems,
  initialResults,
  heroTitle = 'Random Pokemon Picker &amp; Generator',
  heroSubtitle = 'Generate a random Pokémon from all 1025 species in one click.',
  heroHint = 'Default: 6 Pokémon · Use the Count filter below to pick 1 or 3',
  seoContent,
  popularTools,
}: HomeClientProps) {
  const [filter, setFilter] = useState<FilterOptions>(defaultFilter);
  const [results, setResults] = useState<CardPokemon[]>(initialResults);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultKey, setResultKey] = useState(0);
  // 区分「初始未操作」与「操作后筛选无匹配」两种空状态
  const [hasPicked, setHasPicked] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);
  const scrollPendingRef = useRef(false);
  const reqIdRef = useRef(0);

  // teamMode is derived from count, not separate state
  const isTeamMode = filter.count >= 3;

  // 调用 Server Action（服务端缓存生效），不再直接在浏览器里 fetch PokeAPI
  const runGenerate = useCallback(
    async (f: FilterOptions, opts: { scroll: boolean }) => {
      const id = ++reqIdRef.current;
      setIsGenerating(true);
      if (opts.scroll) scrollPendingRef.current = true;
      try {
        const r = await generateRandomAction(f);
        if (id !== reqIdRef.current) return; // superseded
        setHasPicked(true);
        setResults(r);
        setResultKey((k) => k + 1);
      } catch {
        /* keep previous results on error */
      } finally {
        if (id === reqIdRef.current) setIsGenerating(false);
      }
    },
    [],
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

  const handlePick = () => {
    trackEvent('pick_pokemon', {
      count: filter.count,
      generation: filter.generation ?? 'all',
      type: filter.type ?? 'all',
      legendary: filter.legendary,
      shiny: filter.shiny,
      starter: filter.starter,
    });
    void runGenerate(filter, { scroll: true });
  };

  const handleReroll = () => {
    trackEvent('reroll', { count: filter.count });
    void runGenerate(filter, { scroll: false });
  };

  const handleFilterChange = (next: FilterOptions) => {
    setFilter(next);
    trackEvent('filter_change', {
      field: 'mixed',
      generation: next.generation ?? 'all',
      type: next.type ?? 'all',
      count: next.count,
    });
    void runGenerate(next, { scroll: false });
  };

  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      {/* 1. Hero */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-10 text-center sm:py-14">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {heroTitle}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {heroSubtitle}
        </p>
        <div className="mt-6 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handlePick}
            disabled={isGenerating}
            className="inline-flex h-11 w-full max-w-md items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isGenerating ? 'Picking…' : 'Pick Random Pokémon'}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">
          {heroHint}
        </p>
      </section>

      {/* 2. Result */}
      <section
        ref={resultRef}
        className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-12"
      >
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">
          {isTeamMode ? 'Your Team' : 'Your Pokémon'}
        </h2>
        {isGenerating ? (
          <PokemonCardSkeleton count={filter.count} />
        ) : results.length > 0 ? (
          // key forces remount → retriggers the card-reveal + 200ms fade.
          <div key={resultKey} className="animate-pp-fade">
            <PokemonCardList pokemons={results} isTeamMode={isTeamMode} />
          </div>
        ) : hasPicked ? (
          <EmptyResults />
        ) : (
          <p className="text-center text-sm text-muted">
            Tap &ldquo;Pick Random Pokémon&rdquo; to start using PokePicker.
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
        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">
          Filters
        </h2>
        <p className="mb-6 text-center text-sm text-muted">
          Fine-tune your results by generation, type, legendary status,
          shiny form and team size.
        </p>
        <Filters filter={filter} onChange={handleFilterChange} />
      </section>

      {/* 4. Popular Tools */}
      {popularTools !== undefined ? (
        popularTools
      ) : (
        <section className="border-t border-zinc-100 bg-zinc-50/60">
          <div className="mx-auto w-full max-w-3xl px-6 py-16">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">
              Popular Tools
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ToolCard
                href="/random-pokemon-team-generator"
                title="Random Pokemon Team Generator"
              />
              <ToolCard
                href="/pokemon-team-builder"
                title="Pokemon Team Builder"
              />
              <ToolCard
                href="/pokemon-natures"
                title="Pokemon Natures Guide"
              />
              <ComingSoonCard title="Legendary Generator" />
            </div>
          </div>
        </section>
      )}

      {/* 5. SEO content */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        {seoContent !== undefined ? seoContent : (
          <>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is a Random Pokemon Picker?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A random Pokemon picker is a free tool that selects a Pokémon for you
              at random from all 1025 species across generations 1 to 9. Pick a
              single Pokémon or generate a full team of six, with optional filters
              for generation, type, legendary status and shiny form. Whether you
              need a quick pick for Nuzlocke challenges, team building, art prompts
              or drawing inspiration, you get a fair, instant selection every time —
              no login, no install, no waiting. The entire Pokédex from Bulbasaur
              to Pecharunt is available, and every pick is uniformly distributed,
              so every species has an equal chance of appearing.
            </p>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
              How to Use This Random Pokemon Picker
            </h2>
            <ol className="mt-3 grid gap-3 text-sm text-muted sm:grid-cols-3">
              {[
                {
                  step: '1',
                  text: 'Set your filters — choose a generation, type, legendary status or shiny form, or leave them on All for the full Pokédex.',
                },
                {
                  step: '2',
                  text: 'Click “Pick Random Pokémon” and the random Pokemon picker instantly selects up to six Pokémon from your filtered pool.',
                },
                {
                  step: '3',
                  text: 'Re-roll for new picks, adjust filters to narrow the pool, or share your favorite results with the built-in share card.',
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-xl border border-zinc-100 bg-surface p-4"
                >
                  <span className="font-bold text-brand">{item.step}.</span>{' '}
                  {item.text}
                </li>
              ))}
            </ol>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
              Why Use This Random Pokemon Picker?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              PokePicker covers every Pokémon from generations 1 through 9, so you
              always get a valid, fair pick from the full Pokédex. The picker is
              free, works without signup, and runs smoothly on both mobile and
              desktop. Advanced filters let you narrow results to a single
              generation, type, legendary pool or shiny form, while the default
              six-Pokémon team mode is perfect for quick team building. Results
              load instantly thanks to server-side rendering and a cached PokeAPI
              layer, so there&rsquo;s no spinner on the first pick. Each result card
              shows the Pokémon&rsquo;s name, type, Pokédex number, generation, height,
              weight, abilities and type weaknesses — everything you need to decide
              whether to keep or re-roll.
            </p>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
              Picker vs Generator: What&rsquo;s the Difference?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              People often use the words “picker” and “generator” interchangeably,
              but there&rsquo;s a subtle distinction. A picker selects from an existing
              pool — in this case, all 1025 Pokémon across every generation. A
              generator can imply creating something new, like a random team
              composition or a themed squad built around a specific type.
              PokePicker does both: it picks individual species at random and can
              also generate a full six-Pokémon team in a single click. Whether
              you call it a picker, a generator or simply a randomizer, the result
              is the same — a fair, unpredictable selection from the complete
              Pokédex, rendered as a shareable card with official artwork, type
              badges and dex metadata. You can think of it as a digital hat full
              of every Pokémon ever created, ready to draw from whenever you need
              inspiration or a fair random choice.
            </p>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
              Popular Uses
            </h2>
            <ul className="mt-3 grid gap-3 text-sm text-muted sm:grid-cols-2">
              {[
                {
                  title: 'Team building',
                  desc: 'Generate a balanced squad in seconds for casual or competitive play.',
                },
                {
                  title: 'Nuzlocke challenges',
                  desc: 'Let the tool decide your encounters and keep every run fresh and unpredictable.',
                },
                {
                  title: 'Art prompts',
                  desc: 'Get a random Pokémon to draw, paint or use as a design exercise.',
                },
                {
                  title: 'Drawing inspiration',
                  desc: 'Break creative block with an instant, unexpected Pokémon choice.',
                },
                {
                  title: 'Type-themed runs',
                  desc: 'Pick only Fire, Water or Grass types for a monotype challenge run.',
                },
                {
                  title: 'Trivia and games',
                  desc: 'Quiz friends on Pokémon names, types and dex numbers using random picks.',
                },
              ].map((use) => (
                <li key={use.title} className="rounded-xl border border-zinc-100 bg-surface p-4">
                  <span className="font-semibold text-foreground">{use.title}</span>
                  <p className="mt-1 text-muted">{use.desc}</p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              Beyond the use cases above, PokePicker is handy for classroom
              activities, Pokémon-themed party games, deciding which plushie to buy
              next, or simply killing time with friends. Because every pick is
              random and covers the full National Pokédex, the tool is suitable for
              fans of any generation — whether you grew up with Gen 1 classics or
              discovered the franchise through Gen 9&apos;s Paldea region. No matter
              how you use it, the result is always a surprise.
            </p>
          </>
        )}

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
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Logo className="h-4 w-4" />
            PokePicker
          </div>
          <nav className="flex gap-5 text-sm text-muted">
            <a href="/about" className="transition-colors hover:text-brand">
              About
            </a>
            <a href="/privacy" className="transition-colors hover:text-brand">
              Privacy
            </a>
            <a href="/contact" className="transition-colors hover:text-brand">
              Contact
            </a>
            <a href="/api" className="transition-colors hover:text-brand">
              API
            </a>
            <a
              href="/resources"
              className="transition-colors hover:text-brand"
            >
              Resources
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Skeleton loading (reroll 时展示，避免空白等待)                               */
/* -------------------------------------------------------------------------- */

function PokemonCardSkeleton({ count }: { count: number }) {
  return (
    <div
      className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6"
      role="status"
      aria-label="Loading Pokémon"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="mx-auto flex w-full max-w-[18rem] flex-col items-center rounded-2xl border border-zinc-100 bg-surface p-4 shadow-sm"
        >
          <div className="aspect-square w-full animate-pulse rounded-xl bg-zinc-100" />
          <div className="mt-3 h-5 w-28 animate-pulse rounded bg-zinc-100" />
          <div className="mt-2 h-3 w-20 animate-pulse rounded bg-zinc-100" />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 筛选无匹配：提示用户调整筛选条件                                              */
/* -------------------------------------------------------------------------- */

function EmptyResults() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 bg-surface/60 px-6 py-12 text-center">
      <span className="text-3xl" aria-hidden="true">
        🔍
      </span>
      <p className="text-sm font-semibold text-foreground">
        No Pokémon match your filters
      </p>
      <p className="text-xs text-muted">
        Try relaxing some filters below — for example, switch generation back to
        “All” or change the type.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Popular Tools sub-components                                                */
/* -------------------------------------------------------------------------- */

export function ToolCard({ href, title }: { href: string; title: string }) {
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
        <NotifyMe toolName={title} />
      </div>
    </div>
  );
}

function NotifyMe({ toolName }: { toolName: string }) {
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
        trackEvent('notify_me_subscribe', { tool: toolName });
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
