"use client";

import { useState } from "react";

/**
 * Optional contact form. Submission does NOT send an email — it only flips
 * local state to show a confirmation message, per the static-pages spec
 * (real email delivery is out of Phase 1 scope).
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        Thanks! We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-3"
    >
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Email
        </span>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="mt-1 block w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 sm:text-sm"
        />
      </label>
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Message
        </span>
        <textarea
          required
          rows={4}
          placeholder="What's on your mind?"
          className="mt-1 block w-full resize-y rounded-lg border border-zinc-200 px-3 py-2.5 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 sm:text-sm"
        />
      </label>
      <button
        type="submit"
        className="min-h-[44px] rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Send message
      </button>
    </form>
  );
}
