import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — PokePicker" },
  description:
    "PokePicker privacy policy: no accounts, no PII, anonymous analytics, children's privacy protections, and how advertising cookies work on this site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <StaticPageLayout title="Privacy Policy">
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p>
          PokePicker is built privacy-first. This policy explains what we do —
          and what we don&apos;t — collect, how cookies are used, and the
          special protections that apply because our content is enjoyed by
          children as well as adults.
        </p>

        <Section title="No accounts, no registration">
          You can use every feature of PokePicker without creating an account
          or providing personal information. There is no login form on this
          site.
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

        <Section title="Children's privacy (COPPA)">
          Pokémon-themed content appeals to children, and we treat that
          responsibility seriously. PokePicker is treated as{" "}
          <strong>child-directed content</strong> under the U.S. Children&rsquo;s
          Online Privacy Protection Act (COPPA): we consider our audience
          likely to include children under 13 (under 16 in the EEA/UK), and we
          operate the site accordingly:
        </Section>
        <ul className="-mt-4 list-disc gap-2 pl-5 text-sm leading-relaxed">
          <li>
            We never knowingly collect personal information from children — no
            names, emails, ages, or contact details are requested anywhere on
            the site.
          </li>
          <li>
            We do not ask children (or anyone) for a name, email, age, or any
            personal detail to use our tools and games.
          </li>
          <li>
            There are no comment sections, chat features, or user-generated
            content areas where a child could share personal information.
          </li>
          <li>
            We do not knowingly collect personal information from children. If
            you believe a child has shared personal information with us (for
            example, through the contact form), contact us and we will delete
            it promptly.
          </li>
          <li>
            Because our audience includes children, advertising on this site is
            configured as non-personalized: no interest-based advertising, no
            remarketing, and no personalized ad profiles are built from visits
            to PokePicker.
          </li>
        </ul>

        <Section title="Analytics cookies">
          We use Google Analytics 4 to understand aggregated, anonymous traffic
          patterns — which pages are popular, general geographic regions, and
          device categories. GA4 receives anonymized data and uses cookies to
          distinguish unique sessions. You can block these cookies via your
          browser settings without affecting PokePicker&apos;s functionality.
        </Section>

        <Section title="Advertising and third-party cookies">
          PokePicker displays advertising served by Google AdSense. Third-party
          vendors, including Google, use cookies to serve ads based on your
          prior visits to this or other websites. Because this site is treated
          as child-directed content, Google&apos;s advertising cookies are used
          in non-personalized mode only — they serve contextual ads rather
          than ads based on your interests, and no remarketing lists are
          created from your visits. Google&apos;s use of advertising cookies
          (including the DoubleClick DART cookie) is described in its{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            advertising policy
          </a>
          . You can opt out of personalized advertising in general via{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline underline-offset-2 hover:opacity-80"
          >
            Google Ads Settings
          </a>
          .
        </Section>

        <Section title="Interest-based advertising disclosure">
          Some sites you visit use data to show interest-based advertising. On
          PokePicker, this practice is disabled: we do not permit
          interest-based advertising or audience-based remarketing on this
          site, and ad requests made from our pages do not build an
          interest profile from your visit. Ads you see here are matched to
          the page content (contextual advertising), not to a profile about
          you.
        </Section>

        <Section title="Visitors from the EEA and the UK">
          If you visit from the European Economic Area or the United Kingdom,
          you may see a consent banner provided by a Google-certified Consent
          Management Platform (CMP) when required. Where consent choices are
          offered, non-essential cookies (such as analytics and advertising
          cookies) are only set after you give consent, and you can change or
          withdraw your choice at any time via the banner&apos;s link. Basic
          site functionality never depends on accepting cookies.
        </Section>

        <Section title="No data sales">
          We do not sell, rent, or share your data with third parties for
          marketing purposes. The only third-party processors with access to
          anonymous traffic data are Google Analytics and, where ads are
          shown, Google AdSense as described above.
        </Section>

        <Section title="No location tracking">
          PokePicker never requests your precise location, never accesses
          device sensors, and does not deliver location-based content. The
          only geography we see is country-level and region-level statistics
          in anonymous analytics reports.
        </Section>

        <Section title="Third-party resources">
          PokePicker fetches sprites and data from PokeAPI. Your browser may
          load images directly from PokeAPI&apos;s CDN; their privacy practices
          are beyond our control.
        </Section>

        <Section title="Your choices">
          You can block or delete cookies through your browser settings at any
          time — every PokePicker feature keeps working without them. Common
          browser cookie controls are documented by Chrome, Safari, Firefox,
          and Edge under their respective privacy settings.
        </Section>

        <Section title="Updates">
          If this policy changes, we will update the date below and keep
          changes minimal.
        </Section>

        <p className="text-xs text-zinc-400">
          Last updated: August 2026. Questions?{" "}
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
