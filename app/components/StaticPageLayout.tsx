import Link from "next/link";
import type { ReactNode } from "react";

export interface StaticPageLayoutProps {
  title: string;
  children: ReactNode;
}

/**
 * Shared chrome for the 4 static pages (about / privacy / contact / api).
 * Renders a slim header (logo + back-to-home) and a footer that cross-links
 * the other static pages. Body is centered, max-w-2xl, py-12.
 */
export function StaticPageLayout({ title, children }: StaticPageLayoutProps) {
  return (
    <>
      <header className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-foreground"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full bg-brand"
              aria-hidden="true"
            />
            PokePicker
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center text-xs text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            &larr; Home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
      </main>

      <footer className="border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 text-xs text-zinc-500 sm:px-6">
          <Link
            href="/about"
            className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            Contact
          </Link>
          <Link
            href="/api"
            className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            API
          </Link>
        </div>
      </footer>
    </>
  );
}
