import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';
import { getRandomPokemon } from '@/lib/pokeapi/client';
import { toCardPokemon } from '@/app/lib/pokemon-mapper';
import type { Pokemon as CardPokemon } from '@/app/lib/type-data';

/**
 * ISR: 每 5 分钟在服务端重新生成一次首屏随机 Pokemon。
 * - 首次冷启动拉取 PokeAPI 后，HTML 被缓存，后续访客秒开
 * - 5 分钟窗口内的访客看到相同首屏，但点 reroll / 改 filter 仍走
 *   Server Action 实时拉新数据，体验上仍是"每次随机"
 */
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Random Pokemon Picker — Pick Any of 1025 Pokémon in One Click | PokePicker',
  description:
    'Generate a random Pokémon from all 1025 species in one click. Filter by generation, type, starter or legendary. Free, no signup. Perfect for team building, Nuzlocke challenges and art prompts.',
  alternates: { canonical: '/' },
};

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'What is a random Pokemon picker?',
    a: 'A free tool that picks a Pokémon at random from all 1025 species — great for challenges, team building and fun.',
  },
  {
    q: 'How does this random Pokemon picker work?',
    a: 'It randomly selects from all 1025 Pokémon via PokeAPI. Filter by generation, type, starter or legendary status.',
  },
  {
    q: 'How many Pokémon are included?',
    a: 'All 1025 Pokémon across generations 1 to 9 are included. Pick from the full Pokédex or filter to a specific generation.',
  },
  {
    q: 'Can I pick a specific generation?',
    a: 'Yes. Use the Generation filter to pick from Gen 1–9, or leave it on All to pick across every generation.',
  },
  {
    q: 'Can I exclude legendaries?',
    a: 'Yes. Set Legendary to Any to include them, or Only to pick exclusively from legendary Pokémon.',
  },
  {
    q: 'Can I generate only Gen 1 Pokémon?',
    a: 'Yes. Select Gen 1 in the Generation filter and every pick will come from the original 151 Pokémon.',
  },
  {
    q: 'Can I share my generated Pokémon?',
    a: 'Yes. Click the Share button on any result card to download a shareable image with the Pokémon art, type and Pokédex number.',
  },
  {
    q: 'Is it free to use?',
    a: 'Yes, completely free. No sign-up, no ads. Just open the page and pick a Pokémon instantly.',
  },
];

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default async function Home() {
  // 服务端预生成首屏结果：用户落地即见 6 只 Pokemon，0 等待。
  // PokeAPI 数据由 cachedFetch 缓存 24h，只有随机选择是 per-request。
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
    // PokeAPI 不可用时降级为空结果，用户点按钮仍可触发 Server Action
  }

  return (
    <>
      <HomeClient faqItems={FAQ_ITEMS} initialResults={initialResults} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
    </>
  );
}
