import { getTypeStyle } from '../../utils/typeColors';

const ALL_TYPES = [
  'fire','water','grass','electric','psychic','ice','dragon','dark','fairy',
  'fighting','poison','ground','rock','ghost','steel','bug','flying','normal',
];

interface Props {
  selected: string[];
  onChange: (types: string[]) => void;
}

export function TypeFilter({ selected, onChange }: Props) {
  function toggle(type: string) {
    if (selected.includes(type)) {
      onChange(selected.filter(t => t !== type));
    } else {
      onChange([...selected, type]);
    }
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
      {ALL_TYPES.map(type => {
        const style = getTypeStyle(type);
        const active = selected.includes(type);
        return (
          <button
            key={type}
            onClick={() => toggle(type)}
            style={{
              padding: '0.25rem 0.6rem',
              background: active ? style.bg : 'var(--bg-card)',
              color: active ? style.text : 'var(--text-secondary)',
              border: `2px solid ${active ? style.border : 'var(--border-color)'}`,
              cursor: 'pointer',
              fontFamily: 'var(--font-main)',
              fontSize: '0.75em',
              textTransform: 'capitalize',
              transition: 'all 0.15s',
            }}
          >
            {type}
          </button>
        );
      })}
      {selected.length > 0 && (
        <button
          onClick={() => onChange([])}
          style={{
            padding: '0.25rem 0.6rem',
            background: 'transparent',
            color: 'var(--text-muted)',
            border: '2px dashed var(--border-color)',
            cursor: 'pointer',
            fontFamily: 'var(--font-main)',
            fontSize: '0.75em',
          }}
        >
          ✕ clear
        </button>
      )}
    </div>
  );
}
