import { useState } from 'react';
import { useAllPokemonNames } from '../../hooks/useAllPokemonNames';
import { usePokemon } from '../../hooks/usePokemon';
import { getSpriteUrl, extractIdFromUrl, padId } from '../../utils/pokemonId';
import { TypeBadge } from '../pokemon/TypeBadge';
import { SearchInput } from './SearchInput';
import { LoadingSpinner } from './LoadingSpinner';

interface Props {
  label: string;
  selected: string | null;
  onSelect: (name: string) => void;
}

export function PokemonPicker({ label, selected, onSelect }: Props) {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: allNames } = useAllPokemonNames();
  const { data: pokemon, isLoading: loadingPokemon } = usePokemon(selected ?? undefined);

  const filtered = allNames?.results
    .filter(p => p.name.includes(search))
    .slice(0, 8) ?? [];

  function handleRandom() {
    const id = Math.floor(Math.random() * 1010) + 1;
    if (allNames?.results[id - 1]) {
      onSelect(allNames.results[id - 1].name);
      setSearch('');
      setShowDropdown(false);
    }
  }

  function handleSelect(name: string) {
    onSelect(name);
    setSearch('');
    setShowDropdown(false);
  }

  return (
    <div style={{
      flex: 1,
      minWidth: 260,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      background: 'var(--bg-card)',
      border: '2px solid var(--border-color)',
      padding: '1rem',
    }}>
      <div style={{ color: 'var(--accent)', fontSize: '0.8em', fontFamily: 'var(--font-main)' }}>
        {label}
      </div>

      {/* Search + random */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <SearchInput
            value={search}
            onChange={v => { setSearch(v); setShowDropdown(true); }}
            placeholder="Search..."
          />
          {/* Dropdown */}
          {showDropdown && search && filtered.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-color)',
              zIndex: 200,
              maxHeight: 240,
              overflowY: 'auto',
            }}>
              {filtered.map(p => {
                const id = extractIdFromUrl(p.url);
                return (
                  <button
                    key={p.name}
                    onClick={() => handleSelect(p.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.4rem 0.75rem',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.75em',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={p.name}
                      width={32}
                      height={32}
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <span style={{ textTransform: 'capitalize' }}>{p.name}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.85em' }}>
                      {padId(id)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <button
          onClick={handleRandom}
          title="Random Pokémon"
          style={{
            padding: '0.6rem 0.75rem',
            background: 'var(--bg-card)',
            border: '2px solid var(--accent)',
            color: 'var(--accent)',
            cursor: 'pointer',
            fontFamily: 'var(--font-main)',
            fontSize: '0.75em',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--accent)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--bg-card)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
        >
          🎲 Random
        </button>
      </div>

      {/* Selected pokemon preview */}
      {selected && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
        }}>
          {loadingPokemon ? (
            <LoadingSpinner size={32} />
          ) : pokemon ? (
            <>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default ?? getSpriteUrl(pokemon.id)}
                alt={pokemon.name}
                width={120}
                height={120}
                style={{ objectFit: 'contain' }}
              />
              <span style={{
                color: 'var(--text-muted)',
                fontSize: '0.65em',
              }}>{padId(pokemon.id)}</span>
              <span style={{
                textTransform: 'capitalize',
                color: 'var(--text-primary)',
                fontSize: '0.85em',
                fontWeight: 600,
              }}>{pokemon.name}</span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {pokemon.types.map(t => (
                  <TypeBadge key={t.type.name} type={t.type.name} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
