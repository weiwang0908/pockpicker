import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';

export const metadata: Metadata = {
  title: 'Random Pokemon Picker — Pick a Pokémon Instantly | PokePicker',
  description:
    'Generate a random Pokémon instantly. Perfect for challenges, team building and fun. Free random Pokemon picker with generation, type and legendary filters.',
  alternates: { canonical: '/' },
};

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'What is a random Pokemon picker?',
    a: 'A free tool that picks a Pokémon at random — great for challenges, team building and fun.',
  },
  {
    q: 'How does this random Pokemon picker work?',
    a: 'Randomly selects from all 1025 Pokémon via PokeAPI. Filter by generation, type or legendary.',
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

export default function Home() {
  return (
    <>
      <HomeClient faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
    </>
  );
}
