"use client";

import Link from "next/link";
import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { Logo } from "./Logo";

interface Tool {
  href: string;
  label: string;
}

interface NavSection {
  label: string;
  items: Tool[];
}

const NAV: NavSection[] = [
  {
    label: "Tools",
    items: [
      { href: "/random-pokemon-team-generator", label: "Random Team Generator" },
      { href: "/pokemon-team-builder", label: "Pokemon Team Builder" },
      { href: "/pokemon-type-chart", label: "Pokemon Type Chart" },
      { href: "/pokemon-iv-calculator", label: "Pokemon IV Calculator" },
      { href: "/pokemon-natures", label: "Pokemon Natures Chart" },
      { href: "/pokemon-nickname-generator", label: "Pokemon Nickname Generator" },
      { href: "/favorites", label: "Your Favorites" },
    ],
  },
  {
    label: "Games",
    items: [
      { href: "/games/whos-that-pokemon", label: "Who's That Pokémon?" },
      { href: "/games/pokemon-fusion", label: "Pokemon Fusion" },
    ],
  },
  {
    label: "Academy",
    items: [
      { href: "/academy", label: "Academy Hub" },
      { href: "/academy/iv-ev-natures-guide", label: "IVs, EVs & Natures" },
      { href: "/academy/best-natures-by-role", label: "Best Natures by Role" },
      { href: "/academy/type-synergy-defensive-cores", label: "Type Synergy & Cores" },
      { href: "/academy/understanding-base-stats", label: "Reading Base Stats" },
      { href: "/academy/team-building-basics", label: "Team Building 101" },
      { href: "/guides/monotype-challenge-guide", label: "Monotype Challenge" },
      { href: "/guides/shiny-hunting-odds", label: "Shiny Odds Guide" },
      { href: "/guides/random-team-nuzlocke-walkthrough", label: "Nuzlocke Walkthrough" },
    ],
  },
];

interface DropdownContextType {
  activeLabel: string | null;
  setActiveLabel: (label: string | null) => void;
}

const DropdownContext = createContext<DropdownContextType>({
  activeLabel: null,
  setActiveLabel: () => {},
});

function NavDropdown({ label, items }: { label: string; items: Tool[] }) {
  const { activeLabel, setActiveLabel } = useContext(DropdownContext);
  const open = activeLabel === label;
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setActiveLabel(null);
  }, [setActiveLabel]);

  const toggle = useCallback(() => {
    setActiveLabel(open ? null : label);
  }, [open, label, setActiveLabel]);

  const openDropdown = useCallback(() => {
    setActiveLabel(label);
  }, [label, setActiveLabel]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, close]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={openDropdown}
        className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
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
          onMouseLeave={close}
          className="absolute right-0 top-full mt-1 w-60 rounded-xl border border-zinc-100 bg-surface py-2 shadow-lg"
        >
          <div className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {label}
          </div>
          {items.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              onClick={close}
              className="block px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-foreground"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader({ showLogoText = true }: { showLogoText?: boolean }) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ activeLabel, setActiveLabel }}>
      <header className="sticky top-0 z-30 border-b border-zinc-100 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground"
          >
            <Logo className="h-5 w-5" />
            {showLogoText && <span>PokePicker</span>}
          </Link>

          <div className="relative flex items-center gap-1">
            {NAV.map((section) => (
              <NavDropdown
                key={section.label}
                label={section.label}
                items={section.items}
              />
            ))}
          </div>
        </div>
      </header>
    </DropdownContext.Provider>
  );
}
