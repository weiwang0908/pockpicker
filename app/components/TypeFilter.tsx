interface TypeFilterProps {
  value: string | null; // null = All
  onChange: (value: string | null) => void;
}

interface TypeInfo {
  name: string;
  emoji: string;
  color: string;
}

const TYPES: TypeInfo[] = [
  { name: 'Normal', emoji: '⭐', color: '#A8A878' },
  { name: 'Fire', emoji: '🔥', color: '#F08030' },
  { name: 'Water', emoji: '💧', color: '#6890F0' },
  { name: 'Grass', emoji: '🌿', color: '#78C850' },
  { name: 'Electric', emoji: '⚡', color: '#F8D030' },
  { name: 'Ice', emoji: '❄️', color: '#98D8D8' },
  { name: 'Fighting', emoji: '✊', color: '#C03028' },
  { name: 'Poison', emoji: '☠️', color: '#A040A0' },
  { name: 'Ground', emoji: '⛰️', color: '#E0C068' },
  { name: 'Flying', emoji: '🕊️', color: '#A890F0' },
  { name: 'Psychic', emoji: '🔮', color: '#F85888' },
  { name: 'Bug', emoji: '🐛', color: '#A8B820' },
  { name: 'Rock', emoji: '🪨', color: '#B8A038' },
  { name: 'Ghost', emoji: '👻', color: '#705898' },
  { name: 'Dragon', emoji: '🐉', color: '#7038F8' },
  { name: 'Dark', emoji: '🌙', color: '#705848' },
  { name: 'Steel', emoji: '⚙️', color: '#B8B8D0' },
  { name: 'Fairy', emoji: '✨', color: '#EE99AC' },
];

export default function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        Type
      </div>
      <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:grid-cols-none">
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-pressed={value === null}
          className={chipClass(value === null)}
        >
          All
        </button>
        {TYPES.map((t) => {
          const selected = value === t.name;
          return (
            <button
              key={t.name}
              type="button"
              onClick={() => onChange(t.name)}
              aria-pressed={selected}
              title={t.name}
              className={chipClass(selected)}
            >
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: t.color }}
              />
              <span aria-hidden="true">{t.emoji}</span>
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function chipClass(selected: boolean) {
  return (
    'inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-150 ' +
    (selected
      ? 'border-brand bg-brand text-white shadow-sm'
      : 'border-zinc-200 bg-surface text-foreground hover:border-brand hover:text-brand')
  );
}
