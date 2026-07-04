import type { FilterOptions } from './Filters';

const COUNT_OPTIONS: { value: FilterOptions['count']; label: string }[] = [
  { value: 1, label: '1' },
  { value: 3, label: '3' },
  { value: 6, label: '6' },
];

interface CountFilterProps {
  value: FilterOptions['count'];
  onChange: (value: FilterOptions['count']) => void;
}

export default function CountFilter({ value, onChange }: CountFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        Count
      </div>
      <div className="flex flex-wrap gap-2">
        {COUNT_OPTIONS.map((opt) => {
          const selected = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={selected}
              className={
                'min-h-[40px] min-w-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ' +
                (selected
                  ? 'border-brand bg-brand text-white shadow-sm'
                  : 'border-zinc-200 bg-surface text-foreground hover:border-brand hover:text-brand')
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
