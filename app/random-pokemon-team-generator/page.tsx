import type { Metadata } from 'next';
import HomeClient from '@/app/components/HomeClient';
import { ToolCard } from '@/app/components/HomeClient';
import { getRandomPokemon } from '@/lib/pokeapi/client';
import { toCardPokemon } from '@/app/lib/pokemon-mapper';
import type { Pokemon as CardPokemon } from '@/app/lib/type-data';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Random Pokemon Team Generator | PokePicker',
  description:
    'Random Pokemon team generator: build a full team of 6 Pokémon in one click. Filter by generation, type, legendary or shiny. Free, no signup.',
  alternates: { canonical: '/random-pokemon-team-generator' },
  openGraph: {
    title: 'Random Pokemon Team Generator | PokePicker',
    description:
      'Random Pokemon team generator: build a full team of 6 Pokémon in one click. Filter by generation, type, legendary or shiny. Free, no signup.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Pokemon Team Generator | PokePicker',
    description:
      'Random Pokemon team generator: build a full team of 6 Pokémon in one click. Filter by generation, type, legendary or shiny. Free, no signup.',
  },
};

const TEAM_FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'What is a random Pokemon team generator?',
    a: 'A free tool that builds a full team of six Pokémon at random from all 1025 species. Perfect for casual play, Nuzlocke challenges, or competitive practice teams.',
  },
  {
    q: 'How many Pokémon are on a generated team?',
    a: 'Each team consists of six Pokémon by default — the standard party size in every mainline Pokémon game. Use the Count filter to generate 1 or 3 instead.',
  },
  {
    q: 'Can I generate a team from a specific generation?',
    a: 'Yes. Use the Generation filter to limit your team to Gen 1–9. For example, select Gen 1 to build a team from the original 151 Pokémon.',
  },
  {
    q: 'Can I generate a team of only legendary Pokémon?',
    a: 'Yes. Set the Legendary filter to "Only" and every slot on your generated team will be filled with a legendary Pokémon.',
  },
  {
    q: 'Is the random team generator free?',
    a: 'Yes, completely free with no sign-up required. Just open the page and generate a team instantly.',
  },
  {
    q: 'Can I share my generated team?',
    a: 'Yes. Click the Share button on any Pokémon card to download a shareable image with the Pokémon art, type and Pokédex number.',
  },
  {
    q: 'Can I generate a shiny team?',
    a: 'Yes. Turn on the Shiny filter and every Pokémon on your generated team will use its shiny sprite.',
  },
  {
    q: 'Can I generate a type-themed team?',
    a: 'Yes. Use the Type filter to build a team of only Fire, Water, Grass, or any other type — great for monotype challenge runs.',
  },
  {
    q: 'How is this different from the random Pokemon picker?',
    a: 'The picker and team generator use the same engine, but the team generator is tuned for building a full six-Pokémon squad in one click. The picker is more flexible if you want 1 or 3 Pokémon.',
  },
  {
    q: 'Can I use this for Nuzlocke challenges?',
    a: 'Yes. Generate a random team to use as your Nuzlocke encounters, or roll a new team for each route to keep your run fresh.',
  },
];

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: TEAM_FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const WEB_APP_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Random Pokemon Team Generator',
  url: 'https://www.pokepicker.app/random-pokemon-team-generator',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  description:
    'Generate a random team of six Pokémon from all 1025 species. Filter by generation, type, legendary or shiny. Free, no signup.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default async function TeamGeneratorPage() {
  let initialResults: CardPokemon[] = [];
  try {
    const dataFilter = {
      generation: 'all' as const,
      type: 'all' as const,
      legendary: 'any' as const,
      shiny: 'off' as const,
      starter: 'off' as const,
      count: 6 as 1 | 3 | 6,
    };
    const pokemons = await getRandomPokemon(dataFilter, 6);
    initialResults = pokemons.map((p) => toCardPokemon(p, false));
  } catch {
    // 降级为空结果，用户点按钮仍可触发 Server Action
  }

  return (
    <>
      <HomeClient
        faqItems={TEAM_FAQ_ITEMS}
        initialResults={initialResults}
        heroTitle="Random Pokemon Team Generator"
        heroSubtitle="Generate a full team of six random Pokémon from all 1025 species in one click."
        heroHint="Default: 6 Pokémon per team · Use the Count filter to pick 1 or 3"
        popularTools={
          <section className="border-t border-zinc-100 bg-zinc-50/60">
            <div className="mx-auto w-full max-w-3xl px-6 py-16">
              <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">
                Popular Tools
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ToolCard href="/" title="Random Pokemon Picker" />
                <ToolCard href="/pokemon-natures" title="Pokemon Natures Guide" />
                <ToolCard href="/pokemon-team-builder" title="Pokemon Team Builder" />
              </div>
            </div>
          </section>
        }
        seoContent={
          <>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is a Random Pokemon Team Generator?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A random Pokemon team generator builds a complete team of six
              Pokémon for you in a single click. Instead of spending time
              browsing the Pokédex and agonizing over which Pokémon to pick,
              the generator rolls a fresh squad from all 1025 species across
              generations 1 to 9. Every team is different, and every slot is
              filled independently, so you might end up with a balanced mix of
              types or a wildly unbalanced roster — that&rsquo;s part of the fun.
              Use the filters to narrow the pool by generation, type, legendary
              status or shiny form before generating.
            </p>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
              How to Generate a Random Pokémon Team
            </h2>
            <ol className="mt-3 grid gap-3 text-sm text-muted sm:grid-cols-3">
              {[
                {
                  step: '1',
                  text: 'Optionally set filters — pick a generation, type, or restrict to legendary or shiny Pokémon.',
                },
                {
                  step: '2',
                  text: 'Click “Pick Random Pokémon” and the team generator instantly rolls six Pokémon from your filtered pool.',
                },
                {
                  step: '3',
                  text: 'Re-roll for a completely new team, tweak filters for a different pool, or share your squad with the share card.',
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
              Why Use a Random Team Generator?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Building a Pokémon team by hand takes time — you have to consider
              type coverage, synergy, and whether your favorites are actually
              viable together. A random team generator skips all that and hands
              you a squad you&rsquo;d never have chosen yourself. That surprise
              factor is exactly what makes it valuable: it pushes you out of your
              comfort zone, forces you to try Pokémon you normally ignore, and
              often leads to memorable battles. PokePicker&rsquo;s generator
              covers the entire National Pokédex, runs instantly with no signup,
              and works on both mobile and desktop.
            </p>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
              Team Generator vs Picker: Which Should You Use?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              If you want a full six-Pokémon party, the team generator is the
              right choice — it&rsquo;s pre-set to roll six at once and the
              surrounding content focuses on team building. If you only need a
              single random Pokémon — for an art prompt, a Nuzlocke encounter,
              or a quick decision — the{' '}
              <a href="/" className="text-brand underline">
                random Pokemon picker
              </a>{' '}
              lets you switch the Count filter to 1. Both tools share the same
              engine and the same full Pokédex, so pick whichever matches what
              you&rsquo;re trying to do.
            </p>

            <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
              Popular Ways to Use a Generated Team
            </h2>
            <ul className="mt-3 grid gap-3 text-sm text-muted sm:grid-cols-2">
              {[
                {
                  title: 'Casual playthrough',
                  desc: 'Roll a random team and play through a Pokémon game using only those six.',
                },
                {
                  title: 'Nuzlocke variant',
                  desc: 'Use the generator to assign your team members instead of catching them in the wild.',
                },
                {
                  title: 'Type-themed runs',
                  desc: 'Filter to a single type and generate a monotype team for an extra challenge.',
                },
                {
                  title: 'Competitive practice',
                  desc: 'Generate random teams to practice battling with unfamiliar Pokémon and strategies.',
                },
                {
                  title: 'Friend challenges',
                  desc: 'Each player generates a random team and battles — may the luckiest trainer win.',
                },
                {
                  title: 'Content creation',
                  desc: 'Streamers and YouTubers can roll a random team for a challenge run video.',
                },
              ].map((use) => (
                <li
                  key={use.title}
                  className="rounded-xl border border-zinc-100 bg-surface p-4"
                >
                  <span className="font-semibold text-foreground">
                    {use.title}
                  </span>
                  <p className="mt-1 text-muted">{use.desc}</p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              A random team generator is also a great icebreaker for Pokémon
              communities — share your rolled team in a Discord server or
              subreddit and compare with friends. Because the pool spans every
              generation, you might get a Gen 1 starter alongside an obscure
              Gen 8 Pokémon, which is part of what makes each roll unique.
            </p>
          </>
        }
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APP_JSON_LD) }}
      />
    </>
  );
}
