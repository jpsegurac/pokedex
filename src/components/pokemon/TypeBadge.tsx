import { getTypeStyle } from '../../utils/typeColors';

interface Props {
  type: string;
  small?: boolean;
}

export function TypeBadge({ type, small = false }: Props) {
  const style = getTypeStyle(type);
  return (
    <span style={{
      display: 'inline-block',
      padding: small ? '0.15rem 0.4rem' : '0.2rem 0.55rem',
      background: style.bg,
      color: style.text,
      border: `1px solid ${style.border}`,
      borderRadius: 2,
      fontSize: small ? '0.65em' : '0.75em',
      fontFamily: 'var(--font-main)',
      textTransform: 'capitalize',
      letterSpacing: '0.05em',
    }}>
      {type}
    </span>
  );
}
