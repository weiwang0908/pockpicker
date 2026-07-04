import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: { absolute: "API — PokePicker" },
  description:
    "PokePicker public REST API documentation. Free Pokemon data API with filters.",
  alternates: { canonical: "/api" },
};

export default function ApiPage() {
  return (
    <StaticPageLayout title="PokePicker API">
      <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
        <p className="text-lg text-zinc-900 dark:text-zinc-100">
          A free, public REST API for Pokémon data — ideal for side projects,
          prototypes, demos, and educational use.
        </p>

        <p>
          The PokePicker API exposes the same clean, normalized Pokémon data
          that powers this site. The public tier requires no API key and is
          suitable for low-to-medium traffic clients such as bots, classroom
          demos, and frontend prototypes. All responses are JSON and delivered
          over HTTPS.
        </p>

        <Section title="Base URL">
          <p>
            All endpoints are relative to the versioned base below. Always use
            HTTPS — plain HTTP requests are redirected but discouraged.
          </p>
          <CodeBlock>https://api.pokepicker.app/api/v1</CodeBlock>
        </Section>

        <Section title="Endpoints">
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Code>GET /api/v1/pokemon/random</Code> — returns a single random
              Pokémon.
            </li>
            <li>
              <Code>GET /api/v1/pokemon/random?count=6</Code> — returns a random
              team of up to 6 Pokémon. <Code>count</Code> must be between 1 and
              6.
            </li>
            <li>
              <Code>GET /api/v1/pokemon/:id</Code> — returns a single Pokémon by
              its National Pokédex ID (1–1025).
            </li>
            <li>
              <Code>GET /api/v1/pokemon?generation=1&amp;type=fire</Code> —
              returns a filtered, paginated list of Pokémon.
            </li>
          </ul>
        </Section>

        <Section title="Query Parameters">
          <p>
            All query parameters are optional and case-insensitive unless noted.
            Combine them freely; an empty filter set returns the default list.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
                  <th className="py-2 pr-4">Parameter</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                <ParamRow
                  name="generation"
                  type="integer 1–9"
                  desc="Filter by generation."
                />
                <ParamRow
                  name="type"
                  type="string"
                  desc="Filter by primary or secondary type (e.g. fire, water, grass)."
                />
                <ParamRow
                  name="count"
                  type="integer"
                  desc="Number of results to return (max 100). Default 20."
                />
                <ParamRow
                  name="legendary"
                  type="boolean"
                  desc="If true, only legendary Pokémon."
                />
                <ParamRow
                  name="shiny"
                  type="boolean"
                  desc="If true, return shiny sprite URLs."
                />
                <ParamRow
                  name="starter"
                  type="boolean"
                  desc="If true, only starter Pokémon."
                />
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Response Format">
          <p>
            All responses are JSON with a <Code>200 OK</Code> status on success.
            A single Pokémon object looks like:
          </p>
          <CodeBlock>{`{
  "id": 25,
  "name": "pikachu",
  "types": ["electric"],
  "generation": 1,
  "height": 4,
  "weight": 60,
  "abilities": ["static", "lightning-rod"],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "weaknesses": ["ground"]
}`}</CodeBlock>
          <p>
            List endpoints return an object with a <Code>results</Code> array
            and pagination cursors (<Code>next</Code>, <Code>previous</Code>).
          </p>
        </Section>

        <Section title="Rate Limiting">
          <p>
            The public API is limited to <strong>100 requests per minute</strong>{" "}
            per IP to keep the service free and stable. When the limit is
            exceeded, the API responds with <Code>429 Too Many Requests</Code>{" "}
            and a <Code>Retry-After</Code> header (in seconds) indicating when
            to retry. Cache responses client-side where possible, and consider
            backing off exponentially on 429. For higher limits, please{" "}
            <Link
              href="/contact"
              className="text-brand underline underline-offset-2 hover:opacity-80"
            >
              contact us
            </Link>
            .
          </p>
        </Section>

        <Section title="Error Handling">
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Code>400 Bad Request</Code> — invalid query parameter.
            </li>
            <li>
              <Code>404 Not Found</Code> — Pokémon ID or endpoint not found.
            </li>
            <li>
              <Code>429 Too Many Requests</Code> — rate limit exceeded.
            </li>
            <li>
              <Code>500 Internal Server Error</Code> — server error, retry
              with backoff.
            </li>
          </ul>
        </Section>

        <Section title="Examples">
          <p className="mb-2 text-sm">curl</p>
          <CodeBlock>{`curl "https://api.pokepicker.app/api/v1/pokemon/random"`}</CodeBlock>
          <p className="mb-2 mt-4 text-sm">JavaScript (fetch)</p>
          <CodeBlock>{`const res = await fetch(
  "https://api.pokepicker.app/api/v1/pokemon/random?count=6"
);
const team = await res.json();
console.log(team);`}</CodeBlock>
          <p className="mb-2 mt-4 text-sm">Python (requests)</p>
          <CodeBlock>{`import requests

res = requests.get(
    "https://api.pokepicker.app/api/v1/pokemon",
    params={"generation": 1, "type": "fire"},
)
data = res.json()
print(data)`}</CodeBlock>
        </Section>

        <Section title="Use Cases">
          <p>
            The API is designed for lightweight, read-heavy workloads. Common
            use cases include:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            <li>Daily Pokémon widgets for personal dashboards.</li>
            <li>Random team generators for fan sites and Discord bots.</li>
            <li>Type-effectiveness demos in programming tutorials.</li>
            <li>
              Prototyping frontends that need realistic, structured sample data.
            </li>
          </ul>
        </Section>

        <Section title="Versioning">
          <p>
            The API is versioned via the URL path (<Code>v1</Code>). Breaking
            changes will be published under a new version, leaving{" "}
            <Code>v1</Code> consumers unaffected. Deprecation notices will
            appear in this document at least 90 days before removal.
          </p>
        </Section>

        <Section title="Status">
          <p>
            The PokePicker API is currently in a{" "}
            <strong>documentation-only</strong> phase. The endpoints above
            describe the planned public API; the actual implementation is on
            the roadmap. Once live, this page will reflect real response data.
            For updates or questions,{" "}
            <Link
              href="/contact"
              className="text-brand underline underline-offset-2 hover:opacity-80"
            >
              contact us
            </Link>
            .
          </p>
        </Section>
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
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

function ParamRow({
  name,
  type,
  desc,
}: {
  name: string;
  type: string;
  desc: string;
}) {
  return (
    <tr>
      <td className="py-2 pr-4 font-mono text-xs text-zinc-800 dark:text-zinc-200">
        {name}
      </td>
      <td className="py-2 pr-4 text-xs text-zinc-500">{type}</td>
      <td className="py-2 text-sm">{desc}</td>
    </tr>
  );
}
