import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use — PokePicker" },
  description:
    "Terms of use for PokePicker: acceptable use, intellectual property, disclaimers, and limitations of liability for our free Pokémon tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <StaticPageLayout title="Terms of Use">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p>
          Welcome to PokePicker. By accessing or using www.pokepicker.app (the
          &ldquo;Site&rdquo;), you agree to these Terms of Use. If you do not
          agree, please do not use the Site. These terms apply to all visitors,
          including children, but we encourage parents and guardians to review
          them together with young users.
        </p>

        <Section title="What PokePicker provides">
          PokePicker offers free, browser-based tools and games built around
          Pokémon data, including a random Pokémon picker, a team generator,
          a type chart, an IV calculator, and silhouette guessing games. All
          features are provided at no cost and require no account.
        </Section>

        <Section title="Acceptable use">
          You agree not to: (a) use the Site for any unlawful purpose;
          (b) attempt to disrupt, overload, or interfere with the Site&apos;s
          operation or infrastructure; (c) scrape the Site at rates that
          degrade service for other visitors; (d) misrepresent the Site&apos;s
          content as your own; or (e) use automated systems to access the Site
          in ways that bypass normal user-facing behavior.
        </Section>

        <Section title="Intellectual property and fan-site notice">
          PokePicker is an unofficial fan project. Pokémon and Pokémon
          character names are trademarks of Nintendo, Creatures Inc., and GAME
          FREAK Inc. PokePicker is not affiliated with, endorsed by, sponsored
          by, or officially connected to Nintendo, The Pokémon Company, GAME
          FREAK, or Creatures Inc. All Pokémon data and imagery referenced by
          the Site belongs to its respective owners and is used under
          fair-use principles for informational and educational purposes. The
          Site&apos;s original written guides, analyses, and code are the
          property of PokePicker.
        </Section>

        <Section title="Accuracy of data">
          Game mechanics, base stats, type matchups, and formulas are
          researched carefully but are provided &ldquo;as is&rdquo; and may
          contain errors or become outdated as new games are released. Always
          verify critical information against official sources before making
          decisions based on it.
        </Section>

        <Section title="Availability and changes">
          We may modify, suspend, or discontinue any part of the Site —
          including individual tools — at any time without notice. We may also
          update these terms from time to time; the &ldquo;last updated&rdquo;
          date below reflects the current version, and continued use of the
          Site after changes constitutes acceptance.
        </Section>

        <Section title="Limitation of liability">
          The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis, without warranties of any kind, express or
          implied. To the maximum extent permitted by law, PokePicker and its
          operators shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising from your use of, or
          inability to use, the Site.
        </Section>

        <Section title="Third-party links and services">
          The Site links to third-party websites and loads resources (such as
          sprites) from PokeAPI. We do not control and are not responsible for
          the content, policies, or practices of any third party. Your use of
          third-party services is governed by their own terms.
        </Section>

        <Section title="Contact">
          Questions about these terms? Reach us via our{" "}
          <Link
            href="/contact"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            contact page
          </Link>
          .
        </Section>

        <p className="text-xs text-zinc-400">Last updated: August 2026.</p>
      </div>
    </StaticPageLayout>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
