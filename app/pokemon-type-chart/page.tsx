import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import TypeChartClient from './TypeChartClient';
import {
  HERO_TAGLINE,
  WHAT_IS_TEXT,
  HOW_TO_READ_STEPS,
  DUAL_TYPE_TEXT,
  COMPETITIVE_TEXT,
  COMPETITIVE_ITEMS,
  FAQ_ITEMS,
} from './seo-content';
import { SiteHeader } from '@/app/components/SiteHeader';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pokepicker.app';

const WEB_APP_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pokemon Type Chart',
  url: `${baseUrl}/pokemon-type-chart`,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  description: HERO_TAGLINE,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export const metadata: Metadata = {
  title: {
    absolute: 'Pokemon Type Chart — All 18 Types & Matchups | PokePicker',
  },
  description: HERO_TAGLINE,
  alternates: { canonical: '/pokemon-type-chart' },
  openGraph: {
    title: 'Pokemon Type Chart — All 18 Types & Matchups | PokePicker',
    description: HERO_TAGLINE,
  },
};

export const revalidate = 3600;

export default function PokemonTypeChartPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />

      <TypeChartClient />

      {/* SEO: What is */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold text-foreground">
          What is the Pokemon type chart?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {WHAT_IS_TEXT}
        </p>
      </section>

      {/* SEO: How to read */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          How to read the type chart
        </h2>
        <ol className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
          {HOW_TO_READ_STEPS.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-bold text-brand">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* SEO: Dual-type */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Dual-type matchups explained
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {DUAL_TYPE_TEXT}
        </p>
      </section>

      {/* SEO: Competitive tips */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Type chart tips for competitive play
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {COMPETITIVE_TEXT}
        </p>
        <ul className="mt-4 space-y-3">
          {COMPETITIVE_ITEMS.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-zinc-100 bg-surface p-4"
            >
              <span className="font-semibold text-foreground">{item.title}</span>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Cross-link */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-8">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Ready to build a team around these matchups? Use our{' '}
          <Link href="/pokemon-team-builder" className="text-brand underline">
            Pokemon team builder
          </Link>{' '}
          to assemble a squad with strong defensive synergy and offensive
          coverage, or roll a random team with the{' '}
          <Link
            href="/random-pokemon-team-generator"
            className="text-brand underline"
          >
            random Pokemon team generator
          </Link>
          .
        </p>
      </section>

      {/* SEO: FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-zinc-100">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q}>
              {item.a}
            </FaqItem>
          ))}
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
            href="/pokemon-team-builder"
            className="transition-colors hover:text-brand"
          >
            Team Builder
          </Link>
          <Link href="/pokemon-natures" className="transition-colors hover:text-brand">
            Pokemon Natures Chart
          </Link>
          <Link href="/about" className="transition-colors hover:text-brand">
            About
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-brand">
            Privacy
          </Link>
          <Link href="/contact" className="transition-colors hover:text-brand">
            Contact
          </Link>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APP_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
    </main>
  );
}

function FaqItem({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium text-foreground [&::-webkit-details-marker]:hidden">
        {q}
        <span
          aria-hidden="true"
          className="ml-2 text-zinc-400 transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        {children}
      </div>
    </details>
  );
}
