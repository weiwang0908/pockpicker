import type { Metadata } from "next";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Contact — PokePicker" },
  description: "Get in touch with the PokePicker team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <StaticPageLayout title="Contact">
      <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
        <p>
          Have a question, bug report, or feature idea? Email us — we read
          everything.
        </p>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Email
          </h2>
          <p className="mt-2">
            <a
              href="mailto:pokepicker@163.com"
              className="font-medium text-brand underline underline-offset-2 hover:opacity-80"
            >
              pokepicker@163.com
            </a>
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
