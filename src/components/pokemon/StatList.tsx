import type { PokemonStat } from '../../api/types';
import { StatBar } from './StatBar';

interface Props {
  stats: PokemonStat[];
}

export function StatList({ stats }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {stats.map(s => (
        <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
      ))}
      <div style={{
        marginTop: '0.5rem',
        paddingTop: '0.5rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'var(--text-muted)',
        fontSize: '0.75em',
      }}>
        <span>Total</span>
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
          {stats.reduce((sum, s) => sum + s.base_stat, 0)}
        </span>
      </div>
    </div>
  );
}
