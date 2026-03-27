import { formatStatName } from '../../utils/formatStatName';

interface Props {
  name: string;
  value: number;
  max?: number;
  highlight?: boolean;
  reverse?: boolean;
}

export function StatBar({ name, value, max = 255, highlight = false, reverse = false }: Props) {
  const pct = Math.round((value / max) * 100);

  const barColor = highlight ? 'var(--stat-win)' : 'var(--stat-bar)';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexDirection: reverse ? 'row-reverse' : 'row',
    }}>
      <span style={{
        minWidth: '3.5rem',
        color: 'var(--text-muted)',
        fontSize: '0.75em',
        textAlign: reverse ? 'left' : 'right',
      }}>
        {formatStatName(name)}
      </span>
      <span style={{
        minWidth: '2rem',
        fontWeight: 600,
        color: highlight ? 'var(--stat-win)' : 'var(--text-primary)',
        fontSize: '0.85em',
        textAlign: reverse ? 'right' : 'left',
      }}>
        {value}
      </span>
      <div style={{
        flex: 1,
        height: 8,
        background: 'var(--stat-bg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
      }}>
        <div style={{
          width: `${pct}%`,
          background: barColor,
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}
