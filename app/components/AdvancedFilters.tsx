import { useState } from 'react';
import type { ReactNode } from 'react';
import type { FilterOptions } from './Filters';

interface AdvancedFiltersProps {
  filter: FilterOptions;
  onChange: (newFilter: FilterOptions) => void;
  defaultOpen?: boolean;
}

const LEGENDARY_OPTIONS: { value: FilterOptions['legendary']; label: string }[] = [
  { value: 'any', label: 'Any' },
  { value: 'include', label: 'Include' },
  { value: 'only', label: 'Only' },
];

const BOOL_OPTIONS: { value: boolean; label: string }[] = [
  { value: false, label: 'Off' },
  { value: true, label: 'On' },
];

const COUNT_OPTIONS: { value: FilterOptions['count']; label: string }[] = [
  { value: 1, label: '1' },
  { value: 3, label: '3' },
  { value: 6, label: '6' },
];

export default function AdvancedFilters({
  filter,
  onChange,
  defaultOpen = false,
}: AdvancedFiltersProps) {
  const [open, setOpen] = useState(defaultOpen);

  const update = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) =>
    onChange({ ...filter, [key]: value });

  return (
    <div className="border-t border-zinc-100 pt-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand"
      >
        Advanced
        <span
          aria-hidden="true"
          className={'transition-transform duration-200 ' + (open ? 'rotate-180' : '')}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-4 flex flex-col gap-4 animate-pp-fade">
          <Row label="Legendary">
            <Segmented
              options={LEGENDARY_OPTIONS}
              value={filter.legendary}
              onChange={(v) => update('legendary', v)}
            />
          </Row>
          <Row label="Shiny">
            <Segmented
              options={BOOL_OPTIONS}
              value={filter.shiny}
              onChange={(v) => update('shiny', v)}
            />
          </Row>
          <Row label="Starter">
            <Segmented
              options={BOOL_OPTIONS}
              value={filter.starter}
              onChange={(v) => update('starter', v)}
            />
          </Row>
          <Row label="Count">
            <Segmented
              options={COUNT_OPTIONS}
              value={filter.count}
              onChange={(v) => update('count', v)}
            />
          </Row>
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted sm:w-24">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

interface SegmentedProps<T> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

function Segmented<T extends string | number | boolean>({
  options,
  value,
  onChange,
}: SegmentedProps<T>) {
  return (
    <>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className={
              'min-h-[40px] rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ' +
              (selected
                ? 'border-brand bg-brand text-white shadow-sm'
                : 'border-zinc-200 bg-surface text-foreground hover:border-brand hover:text-brand')
            }
          >
            {opt.label}
          </button>
        );
      })}
    </>
  );
}
