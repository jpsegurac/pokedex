import { useState } from 'react';
import type { PokemonSprites } from '../../api/types';

interface Props {
  sprites: PokemonSprites;
  name: string;
}

type Tab = 'artwork' | 'artwork-shiny' | 'front' | 'back' | 'front-shiny' | 'back-shiny';

export function SpriteGallery({ sprites, name }: Props) {
  const [tab, setTab] = useState<Tab>('artwork');

  const sources: Record<Tab, string | null> = {
    'artwork':       sprites.other['official-artwork'].front_default,
    'artwork-shiny': sprites.other['official-artwork'].front_shiny,
    'front':         sprites.front_default,
    'back':          sprites.back_default,
    'front-shiny':   sprites.front_shiny,
    'back-shiny':    sprites.back_shiny,
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'artwork',       label: 'Art' },
    { key: 'artwork-shiny', label: '✨ Art' },
    { key: 'front',         label: 'Front' },
    { key: 'back',          label: 'Back' },
    { key: 'front-shiny',   label: '✨ Front' },
    { key: 'back-shiny',    label: '✨ Back' },
  ];

  const src = sources[tab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{
        width: 220,
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-secondary)',
        border: '2px solid var(--border-color)',
      }}>
        {src ? (
          <img
            src={src}
            alt={`${name} ${tab}`}
            style={{
              width: tab === 'artwork' || tab === 'artwork-shiny' ? 200 : 120,
              height: tab === 'artwork' || tab === 'artwork-shiny' ? 200 : 120,
              objectFit: 'contain',
              imageRendering: tab.startsWith('artwork') ? 'auto' : 'pixelated',
            }}
          />
        ) : (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75em' }}>No sprite</span>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '0.25rem 0.5rem',
              background: tab === t.key ? 'var(--accent)' : 'var(--bg-card)',
              color: tab === t.key ? '#000' : 'var(--text-secondary)',
              border: `1px solid ${tab === t.key ? 'var(--accent)' : 'var(--border-color)'}`,
              cursor: 'pointer',
              fontFamily: 'var(--font-main)',
              fontSize: '0.7em',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
