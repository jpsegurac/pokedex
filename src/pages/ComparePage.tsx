import { useState } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonPicker } from '../components/ui/PokemonPicker';
import { TypeBadge } from '../components/pokemon/TypeBadge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { getSpriteUrl, padId } from '../utils/pokemonId';
import { formatStatName } from '../utils/formatStatName';
import type { PokemonStat } from '../api/types';

const STAT_ORDER = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

function getStat(stats: PokemonStat[], name: string): number {
  return stats.find(s => s.stat.name === name)?.base_stat ?? 0;
}

export function ComparePage() {
  const [leftName, setLeftName] = useState<string | null>(null);
  const [rightName, setRightName] = useState<string | null>(null);

  const { data: leftPokemon, isLoading: loadingLeft } = usePokemon(leftName ?? undefined);
  const { data: rightPokemon, isLoading: loadingRight } = usePokemon(rightName ?? undefined);

  const bothLoaded = leftPokemon && rightPokemon;

  const leftTotal = leftPokemon?.stats.reduce((s, st) => s + st.base_stat, 0) ?? 0;
  const rightTotal = rightPokemon?.stats.reduce((s, st) => s + st.base_stat, 0) ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Title */}
      <div>
        <h2 style={{
          margin: 0,
          fontFamily: 'var(--font-main)',
          color: 'var(--accent)',
          fontSize: '1em',
          letterSpacing: '0.08em',
        }}>
          VS COMPARE
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8em', marginTop: '0.5rem' }}>
          Pick two Pokémon to compare their base stats side by side.
        </p>
      </div>

      {/* Pickers */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <PokemonPicker label="← Player 1" selected={leftName} onSelect={setLeftName} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 48,
          color: 'var(--accent)',
          fontFamily: 'var(--font-pixel, var(--font-main))',
          fontSize: '1.2em',
        }}>
          VS
        </div>

        <PokemonPicker label="Player 2 →" selected={rightName} onSelect={setRightName} />
      </div>

      {/* Comparison section */}
      {(loadingLeft || loadingRight) && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <LoadingSpinner size={40} />
        </div>
      )}

      {bothLoaded && (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '2px solid var(--border-color)',
          padding: '1.5rem',
        }}>
          {/* Pokemon headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '1rem',
            marginBottom: '2rem',
            alignItems: 'center',
          }}>
            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <img
                src={leftPokemon.sprites.other['official-artwork'].front_default ?? getSpriteUrl(leftPokemon.id)}
                alt={leftPokemon.name}
                width={120}
                height={120}
                style={{ objectFit: 'contain' }}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.65em' }}>{padId(leftPokemon.id)}</span>
              <span style={{ textTransform: 'capitalize', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9em' }}>
                {leftPokemon.name}
              </span>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {leftPokemon.types.map(t => <TypeBadge key={t.type.name} type={t.type.name} small />)}
              </div>
              <div style={{
                color: leftTotal > rightTotal ? 'var(--stat-win)' : 'var(--text-muted)',
                fontSize: '0.75em',
                fontWeight: leftTotal > rightTotal ? 700 : 400,
              }}>
                Total: {leftTotal} {leftTotal > rightTotal ? '★' : ''}
              </div>
            </div>

            {/* VS badge */}
            <div style={{
              color: 'var(--accent)',
              fontFamily: 'var(--font-pixel, var(--font-main))',
              fontSize: '1.5em',
              textAlign: 'center',
            }}>
              VS
            </div>

            {/* Right */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <img
                src={rightPokemon.sprites.other['official-artwork'].front_default ?? getSpriteUrl(rightPokemon.id)}
                alt={rightPokemon.name}
                width={120}
                height={120}
                style={{ objectFit: 'contain' }}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.65em' }}>{padId(rightPokemon.id)}</span>
              <span style={{ textTransform: 'capitalize', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9em' }}>
                {rightPokemon.name}
              </span>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {rightPokemon.types.map(t => <TypeBadge key={t.type.name} type={t.type.name} small />)}
              </div>
              <div style={{
                color: rightTotal > leftTotal ? 'var(--stat-win)' : 'var(--text-muted)',
                fontSize: '0.75em',
                fontWeight: rightTotal > leftTotal ? 700 : 400,
              }}>
                {rightTotal > leftTotal ? '★ ' : ''}Total: {rightTotal}
              </div>
            </div>
          </div>

          {/* Mirrored stat bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {STAT_ORDER.map(statName => {
              const leftVal = getStat(leftPokemon.stats, statName);
              const rightVal = getStat(rightPokemon.stats, statName);
              const leftWins = leftVal > rightVal;
              const rightWins = rightVal > leftVal;
              const max = 255;

              return (
                <div key={statName} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  {/* Left bar (reversed) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      flex: 1,
                      height: 10,
                      background: 'var(--stat-bg)',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}>
                      <div style={{
                        width: `${(leftVal / max) * 100}%`,
                        background: leftWins ? 'var(--stat-win)' : 'var(--stat-bar)',
                        transition: 'width 0.4s ease',
                      }} />
                    </div>
                    <span style={{
                      minWidth: '2rem',
                      textAlign: 'right',
                      color: leftWins ? 'var(--stat-win)' : 'var(--text-primary)',
                      fontWeight: leftWins ? 700 : 400,
                      fontSize: '0.85em',
                    }}>
                      {leftVal}
                    </span>
                  </div>

                  {/* Stat name */}
                  <span style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.65em',
                    textAlign: 'center',
                    minWidth: '4rem',
                  }}>
                    {formatStatName(statName)}
                  </span>

                  {/* Right bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      minWidth: '2rem',
                      color: rightWins ? 'var(--stat-win)' : 'var(--text-primary)',
                      fontWeight: rightWins ? 700 : 400,
                      fontSize: '0.85em',
                    }}>
                      {rightVal}
                    </span>
                    <div style={{
                      flex: 1,
                      height: 10,
                      background: 'var(--stat-bg)',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${(rightVal / max) * 100}%`,
                        background: rightWins ? 'var(--stat-win)' : 'var(--stat-bar)',
                        transition: 'width 0.4s ease',
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prompt when nothing selected */}
      {!leftName && !rightName && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'var(--text-muted)',
          fontSize: '0.8em',
          border: '2px dashed var(--border-color)',
        }}>
          Search for Pokémon above or hit 🎲 Random to start comparing!
        </div>
      )}
    </div>
  );
}
