import type { Metadata } from "next";

import { StaticPageLayout } from "@/app/components/StaticPageLayout";
import { ContactForm } from "./ContactForm";

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
          Have a question, bug report, or feature idea? Reach out — we read
          everything.
        </p>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Email
          </h2>
          <p className="mt-2">
            <a
              href="mailto:hello@pokepicker.com"
              className="font-medium text-brand underline underline-offset-2 hover:opacity-80"
            >
              hello@pokepicker.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Send a message
          </h2>
          <div className="mt-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
