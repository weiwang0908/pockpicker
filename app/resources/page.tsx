import type { Metadata } from "next";
import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Recommended Tools — PokePicker" },
  description:
    "Hand-picked tools and games we recommend alongside PokePicker — Pokémon-themed word games, app discovery platforms, and product directories.",
  alternates: { canonical: "/resources" },
};

interface ToolEntry {
  name: string;
  url: string;
  tagline: string;
  description: string;
  category: "Game" | "Directory" | "Tool";
  /** When true, the link is rendered dofollow (no `noreferrer`), passing full link equity. */
  dofollow?: boolean;
}

const TOOLS: ToolEntry[] = [
  {
    name: "Foodle",
    url: "https://foodlewordle.io",
    tagline: "Wordle × Pokémon",
    description:
      "A clever daily puzzle that fuses the Wordle mechanic with Pokémon guessing. Our team played it daily before building PokePicker — it's the perfect quick-break game for Pokémon fans.",
    category: "Game",
  },
  {
    name: "Ethnicity Guesser",
    url: "https://www.ethnicity-guesser.com",
    tagline: "Daily ethnicity quiz",
    description:
      "A free daily ethnoguessr-style game: look at a composite face, drop a pin on the world map, and learn about 240 human phenotypes — no sign-up needed.",
    category: "Game",
    dofollow: true,
  },
  {
    name: "Lovable",
    url: "https://lovableapp.org",
    tagline: "Discover apps",
    description:
      "A clean app-discovery platform where indie makers surface their work to real users. We discovered several inspiring fan tools there while researching PokePicker.",
    category: "Directory",
  },
  {
    name: "CurateClick",
    url: "https://curateclick.com",
    tagline: "Curated products",
    description:
      "A human-curated product directory that filters out the noise. Their picks tend to be genuinely useful small projects rather than SEO spam.",
    category: "Directory",
  },
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com",
    tagline: "Daily launches",
    description:
      "The flagship launch community for new products. Reading daily hunts is how we keep up with what indie makers ship — and how PokePicker itself will launch soon.",
    category: "Directory",
  },
];

const CATEGORY_LABEL: Record<ToolEntry["category"], string> = {
  Game: "Game",
  Directory: "Directory",
  Tool: "Tool",
};

export default function ResourcesPage() {
  return (
    <StaticPageLayout title="Recommended Tools">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p className="text-lg text-zinc-900 dark:text-zinc-100">
          Tools and games we genuinely recommend alongside PokePicker.
        </p>

        <p>
          We only list things we&apos;ve actually used and enjoyed. If you
          build a Pokémon-related tool or fan game and want to be considered
          for this page, reach out via our{" "}
          <a
            href="/contact"
            className="font-medium text-brand underline underline-offset-2 hover:opacity-80"
          >
            contact page
          </a>
          .
        </p>

        {/* 原创评测方法：为什么这份清单可信 */}
        <div className="mt-10 space-y-6">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              How we evaluate tools
            </h2>
            <p className="mt-2">
              Thousands of Pokémon fan tools exist, and most of them fail the
              same three tests. Before anything earns a spot on this page, we
              use it for at least two weeks and score it against the same
              criteria we applied to PokePicker itself. First, speed to value:
              a good tool does its job within seconds of landing on the page,
              with no signup wall, no tutorial overlay, and no cookie maze
              before the first click. Second, respect for data: tools that
              demand accounts for features that plainly don&apos;t need one,
              or that silently hoard more browser data than the feature
              requires, get cut immediately. Third, craft: we look for the
              small tells of genuine care — fast loads on mobile networks,
              dark mode that doesn&apos;t break sprites, and error states that
              don&apos;t leave you staring at a blank screen.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              What we deliberately avoid
            </h2>
            <p className="mt-2">
              This page will never list ad-heavy re-skins of Bulbapedia
              content, &ldquo;generators&rdquo; that are just a random name
              picker with 12 popup ads, or sites that embed other
              people&apos;s YouTube videos and call it content. We also skip
              tools with paywalled basics — a random Pokémon picker behind a
              subscription is not a product we can recommend with a straight
              face. Every listing below passed the same two-week trial, and
              we re-test the list quarterly; tools that decay, change hands,
              or get stuffed with ads get removed without ceremony.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Categories on this page
            </h2>
            <p className="mt-2">
              <strong className="text-zinc-900 dark:text-zinc-100">Games</strong>{" "}
              are playable daily puzzles — quick, self-contained rounds that
              fit a coffee break, in the same spirit as our own{" "}
              <a
                href="/games/whos-that-pokemon"
                className="font-medium text-brand underline underline-offset-2 hover:opacity-80"
              >
                Who&apos;s That Pokémon
              </a>{" "}
              game.{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                Directories
              </strong>{" "}
              are where indie makers launch and discover each other&apos;s
              work — we monitor them to keep track of the fan-tool ecosystem
              and to find inspiration for PokePicker&apos;s own roadmap.{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">Tools</strong>{" "}
              are utilities that solve a specific Pokémon problem well enough
              that we stopped needing an alternative.
            </p>
          </div>
        </div>

        <ul className="mt-8 space-y-6">
          {TOOLS.map((tool) => (
            <li
              key={tool.url}
              className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel={tool.dofollow ? "noopener" : "noopener noreferrer"}
                      className="text-lg font-semibold text-zinc-900 hover:text-brand dark:text-zinc-100"
                    >
                      {tool.name}
                    </a>
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {CATEGORY_LABEL[tool.category]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-brand">
                    {tool.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel={tool.dofollow ? "noopener" : "noopener noreferrer"}
                  className="inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-brand hover:text-brand dark:border-zinc-700 dark:text-zinc-300"
                  aria-label={`Visit ${tool.name}`}
                >
                  Visit &rarr;
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-900">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            About this page
          </h2>
          <p className="mt-2 text-sm">
            These listings are unpaid editorial picks. We list them because
            we use them, not because anyone paid for placement. If a tool
            stops being useful or changes hands, we remove it.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
