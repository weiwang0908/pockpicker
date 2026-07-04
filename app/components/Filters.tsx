'use client';

import { useEffect, useState } from 'react';
import GenerationFilter from './GenerationFilter';
import TypeFilter from './TypeFilter';
import AdvancedFilters from './AdvancedFilters';

export interface FilterOptions {
  generation: number | null; // null = All
  type: string | null; // null = All
  legendary: 'any' | 'include' | 'only';
  shiny: boolean;
  starter: boolean;
  count: 1 | 3 | 6;
}

export const defaultFilter: FilterOptions = {
  generation: null,
  type: null,
  legendary: 'any',
  shiny: false,
  starter: false,
  count: 1,
};

interface FiltersProps {
  filter: FilterOptions;
  onChange: (newFilter: FilterOptions) => void;
}

function FiltersContent({
  filter,
  onChange,
  defaultAdvancedOpen,
}: FiltersProps & { defaultAdvancedOpen: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <GenerationFilter
        value={filter.generation}
        onChange={(generation) => onChange({ ...filter, generation })}
      />
      <TypeFilter
        value={filter.type}
        onChange={(type) => onChange({ ...filter, type })}
      />
      <AdvancedFilters
        filter={filter}
        onChange={onChange}
        defaultOpen={defaultAdvancedOpen}
      />
    </div>
  );
}

export default function Filters({ filter, onChange }: FiltersProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!sheetOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSheetOpen(false);
    };
    // Auto-close if the viewport grows past the mobile breakpoint while open.
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setSheetOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [sheetOpen]);

  return (
    <div className="w-full">
      {/* Mobile: trigger button */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-zinc-200 bg-surface px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-brand hover:text-brand"
        >
          Filters
          <span aria-hidden="true">▾</span>
        </button>
      </div>

      {/* Desktop: basic filters inline + advanced disclosure */}
      <div className="hidden md:block">
        <FiltersContent filter={filter} onChange={onChange} defaultAdvancedOpen={false} />
      </div>

      {/* Mobile sheet */}
      {sheetOpen && (
        <div
          className="md:hidden fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-pp-fade"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-surface p-6 shadow-2xl animate-pp-slide-up">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-zinc-200" aria-hidden="true" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-1.5 text-muted transition-colors hover:bg-zinc-100 hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <FiltersContent filter={filter} onChange={onChange} defaultAdvancedOpen />
          </div>
        </div>
      )}
    </div>
  );
}
