import type { PokemonAbility } from '../../api/types';

interface Props {
  abilities: PokemonAbility[];
}

export function AbilityList({ abilities }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {abilities.map(a => (
        <div
          key={a.ability.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.75rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <span style={{
            textTransform: 'capitalize',
            color: 'var(--text-primary)',
            fontSize: '0.85em',
          }}>
            {a.ability.name.replace(/-/g, ' ')}
          </span>
          {a.is_hidden && (
            <span style={{
              fontSize: '0.65em',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
              padding: '0.1rem 0.35rem',
              marginLeft: 'auto',
            }}>
              hidden
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
