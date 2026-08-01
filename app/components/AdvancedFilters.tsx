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

const SHINY_OPTIONS: { value: FilterOptions['shiny']; label: string }[] = [
  { value: 'off', label: 'Off' },
  { value: 'random-4096', label: '1/4096' },
  { value: 'random-512', label: '1/512' },
  { value: 'random-100', label: '1/100' },
  { value: 'always', label: 'Always' },
];

const REGION_OPTIONS: { value: FilterOptions['region']; label: string }[] = [
  { value: null, label: 'All' },
  { value: 'kanto', label: 'Kanto' },
  { value: 'johto', label: 'Johto' },
  { value: 'hoenn', label: 'Hoenn' },
  { value: 'sinnoh', label: 'Sinnoh' },
  { value: 'unova', label: 'Unova' },
  { value: 'kalos', label: 'Kalos' },
  { value: 'alola', label: 'Alola' },
  { value: 'galar', label: 'Galar' },
  { value: 'paldea', label: 'Paldea' },
];

const FORM_OPTIONS: { value: FilterOptions['form']; label: string }[] = [
  { value: null, label: 'All' },
  { value: 'default', label: 'Default' },
  { value: 'mega', label: 'Mega' },
  { value: 'gigantamax', label: 'Gigantamax' },
  { value: 'regional', label: 'Regional' },
  { value: 'alolan', label: 'Alolan' },
  { value: 'galarian', label: 'Galarian' },
  { value: 'hisuian', label: 'Hisuian' },
  { value: 'paldean', label: 'Paldean' },
];

const EVOLUTION_OPTIONS: { value: FilterOptions['evolutionStage']; label: string }[] = [
  { value: null, label: 'All' },
  { value: 'unevolved', label: 'Unevolved' },
  { value: 'evolved-once', label: 'Evolved Once' },
  { value: 'evolved-twice', label: 'Evolved Twice' },
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
          <Row label="Mythical">
            <Segmented
              options={BOOL_OPTIONS}
              value={filter.mythical}
              onChange={(v) => update('mythical', v)}
            />
          </Row>
          <Row label="Shiny">
            <Segmented
              options={SHINY_OPTIONS}
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
          <Row label="Region">
            <Segmented
              options={REGION_OPTIONS}
              value={filter.region}
              onChange={(v) => update('region', v)}
            />
          </Row>
          <Row label="Evolution">
            <Segmented
              options={EVOLUTION_OPTIONS}
              value={filter.evolutionStage}
              onChange={(v) => update('evolutionStage', v)}
            />
          </Row>
          <Row label="Forms">
            <Segmented
              options={FORM_OPTIONS}
              value={filter.form}
              onChange={(v) => update('form', v)}
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

function Segmented<T extends string | number | boolean | null>({
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
