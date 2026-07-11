"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Logo } from "./Logo";

interface Tool {
  href: string;
  label: string;
}

const TOOLS: Tool[] = [
  { href: "/pokemon-team-builder", label: "Pokemon Team Builder" },
  { href: "/pokemon-natures", label: "Pokemon Natures" },
];

export function SiteHeader({ showLogoText = true }: { showLogoText?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground"
        >
          <Logo className="h-5 w-5" />
          {showLogoText && <span>PokePicker</span>}
        </Link>

        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            onMouseEnter={() => setOpen(true)}
            className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-foreground"
            aria-expanded={open}
            aria-haspopup="true"
          >
            Tools
            <svg
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {open && (
            <div
              onMouseLeave={() => setOpen(false)}
              className="absolute right-0 top-full mt-1 w-56 rounded-xl border border-zinc-100 bg-surface py-1 shadow-lg"
            >
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-foreground"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
