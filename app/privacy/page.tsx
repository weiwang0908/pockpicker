import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Privacy — PokePicker" },
  description:
    "PokePicker privacy policy. No accounts, no PII, only anonymous analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <StaticPageLayout title="Privacy Policy">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p>
          PokePicker is built privacy-first. This policy explains what we do —
          and what we don&apos;t — collect.
        </p>

        <Section title="No accounts, no registration">
          You can use every feature of PokePicker without creating an account or
          providing personal information. There is no login form on this site.
        </Section>

        <Section title="No personally identifiable information">
          We do not collect your name, email address, or a persistent IP
          address. The only time you share an email is if you choose to submit
          the contact form on{" "}
          <Link
            href="/contact"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            /contact
          </Link>
          .
        </Section>

        <Section title="Analytics cookies">
          We use Google Analytics 4 to understand aggregated, anonymous traffic
          patterns — which pages are popular, general geographic regions, and
          device categories. GA4 receives anonymized data and uses cookies to
          distinguish unique sessions. You can block these cookies via your
          browser settings without affecting PokePicker&apos;s functionality.
        </Section>

        <Section title="No data sales">
          We do not sell, rent, or share your data with third parties for
          marketing purposes. The only third-party processor with access to
          anonymous traffic data is Google Analytics.
        </Section>

        <Section title="Third-party resources">
          PokePicker fetches sprites and data from PokeAPI. Your browser may
          load images directly from PokeAPI&apos;s CDN; their privacy practices
          are beyond our control.
        </Section>

        <Section title="Updates">
          If this policy changes, we will update the date below and keep changes
          minimal.
        </Section>

        <p className="text-xs text-zinc-400">
          Last updated: July 2026. Questions?{" "}
          <Link
            href="/contact"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            Contact us &rarr;
          </Link>
        </p>
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
