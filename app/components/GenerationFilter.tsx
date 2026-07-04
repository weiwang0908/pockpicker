import type { ReactNode } from 'react';

const GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

interface GenerationFilterProps {
  value: number | null; // null = All
  onChange: (value: number | null) => void;
}

export default function GenerationFilter({ value, onChange }: GenerationFilterProps) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        Generation
      </div>
      <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:grid-cols-none">
        <Chip selected={value === null} onClick={() => onChange(null)}>
          All
        </Chip>
        {GENERATIONS.map((gen) => (
          <Chip key={gen} selected={value === gen} onClick={() => onChange(gen)}>
            Gen {gen}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        'min-h-[40px] rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ' +
        (selected
          ? 'border-brand bg-brand text-white shadow-sm'
          : 'border-zinc-200 bg-surface text-foreground hover:border-brand hover:text-brand')
      }
    >
      {children}
    </button>
  );
}
