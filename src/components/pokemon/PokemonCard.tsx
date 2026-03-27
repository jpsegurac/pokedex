import { useNavigate } from 'react-router-dom';
import { extractIdFromUrl, getSpriteUrl, padId } from '../../utils/pokemonId';
import type { NamedAPIResource } from '../../api/types';

interface Props {
  pokemon: NamedAPIResource;
}

export function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate();
  const id = extractIdFromUrl(pokemon.url);
  const sprite = getSpriteUrl(id);

  return (
    <button
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 0.75rem',
        background: 'var(--bg-card)',
        border: '2px solid var(--border-color)',
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s, transform 0.1s',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'var(--font-main)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.background = 'var(--bg-card-hover)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span style={{ color: 'var(--text-muted)', fontSize: '0.65em' }}>{padId(id)}</span>
      <img
        src={sprite}
        alt={pokemon.name}
        width={96}
        height={96}
        loading="lazy"
        style={{ objectFit: 'contain' }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }}
      />
      <span style={{
        textTransform: 'capitalize',
        color: 'var(--text-primary)',
        fontSize: '0.75em',
        lineHeight: 1.4,
      }}>
        {pokemon.name}
      </span>
    </button>
  );
}
