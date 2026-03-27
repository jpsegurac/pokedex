import { useNavigate } from 'react-router-dom';
import type { ChainLink } from '../../api/types';
import { extractIdFromUrl, getSpriteUrl, padId } from '../../utils/pokemonId';

interface Props {
  chain: ChainLink;
}

function ChainNode({ link }: { link: ChainLink }) {
  const navigate = useNavigate();
  const id = extractIdFromUrl(link.species.url);
  const sprite = getSpriteUrl(id);

  const children = link.evolves_to;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
      {/* Current node */}
      <button
        onClick={() => navigate(`/pokemon/${link.species.name}`)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'var(--bg-card)',
          border: '2px solid var(--border-color)',
          padding: '0.5rem',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
          minWidth: 80,
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
      >
        <img
          src={sprite}
          alt={link.species.name}
          width={64}
          height={64}
          style={{ objectFit: 'contain' }}
        />
        <span style={{ fontSize: '0.6em', color: 'var(--text-muted)' }}>{padId(id)}</span>
        <span style={{
          fontSize: '0.65em',
          textTransform: 'capitalize',
          color: 'var(--text-primary)',
        }}>
          {link.species.name}
        </span>
      </button>

      {/* Arrow + evolutions */}
      {children.length > 0 && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {children.map(child => {
              const detail = child.evolution_details[0];
              return (
                <div key={child.species.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--accent)', fontSize: '1.2em' }}>→</div>
                    {detail?.min_level && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.6em' }}>
                        Lv.{detail.min_level}
                      </div>
                    )}
                    {detail?.trigger?.name === 'use-item' && detail?.item && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.6em', textTransform: 'capitalize' }}>
                        {detail.item.name.replace(/-/g, ' ')}
                      </div>
                    )}
                  </div>
                  <ChainNode link={child} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export function EvolutionChainDisplay({ chain }: Props) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <ChainNode link={chain} />
    </div>
  );
}
