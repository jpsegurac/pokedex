import { useParams, useNavigate } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { usePokemonSpecies } from '../hooks/usePokemonSpecies';
import { useEvolutionChain } from '../hooks/useEvolutionChain';
import { TypeBadge } from '../components/pokemon/TypeBadge';
import { StatList } from '../components/pokemon/StatList';
import { AbilityList } from '../components/pokemon/AbilityList';
import { SpriteGallery } from '../components/pokemon/SpriteGallery';
import { EvolutionChainDisplay } from '../components/pokemon/EvolutionChain';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { padId } from '../utils/pokemonId';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{
        color: 'var(--accent)',
        fontFamily: 'var(--font-main)',
        fontSize: '0.75em',
        marginBottom: '0.75rem',
        paddingBottom: '0.4rem',
        borderBottom: '2px solid var(--border-color)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export function PokemonDetailPage() {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, isError, refetch } = usePokemon(nameOrId);
  const { data: species } = usePokemonSpecies(pokemon?.id);
  const { data: evoChain } = useEvolutionChain(species?.evolution_chain.url);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (isError || !pokemon) {
    return <ErrorMessage message="Pokémon not found." onRetry={refetch} />;
  }

  const flavorText = species?.flavor_text_entries
    .find(e => e.language.name === 'en')
    ?.flavor_text
    .replace(/\f/g, ' ')
    .replace(/\n/g, ' ');

  const genus = species?.genera.find(g => g.language.name === 'en')?.genus;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          alignSelf: 'flex-start',
          background: 'transparent',
          border: '2px solid var(--border-color)',
          color: 'var(--text-secondary)',
          padding: '0.3rem 0.75rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-main)',
          fontSize: '0.7em',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
      >
        ← Back
      </button>

      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        background: 'var(--bg-secondary)',
        border: '2px solid var(--border-color)',
        padding: '1.5rem',
      }}>
        {/* Sprites */}
        <div style={{ flex: '0 0 auto' }}>
          <SpriteGallery sprites={pokemon.sprites} name={pokemon.name} />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75em' }}>{padId(pokemon.id)}</div>
          <h1 style={{
            margin: 0,
            textTransform: 'capitalize',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-main)',
            fontSize: '1.4em',
            lineHeight: 1.3,
          }}>
            {pokemon.name}
          </h1>
          {genus && (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75em' }}>{genus}</div>
          )}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {pokemon.types.map(t => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          {flavorText && (
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.8em',
              lineHeight: 1.7,
              margin: 0,
            }}>
              {flavorText}
            </p>
          )}

          {/* Quick stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            marginTop: '0.5rem',
          }}>
            {[
              { label: 'Height', value: `${(pokemon.height / 10).toFixed(1)} m` },
              { label: 'Weight', value: `${(pokemon.weight / 10).toFixed(1)} kg` },
              { label: 'Base XP', value: pokemon.base_experience ?? '?' },
              ...(species ? [
                { label: 'Capture', value: `${species.capture_rate}/255` },
                { label: 'Gender', value: species.gender_rate === -1 ? 'Genderless' : `${Math.round((8 - species.gender_rate) / 8 * 100)}% M` },
                ...(species.is_legendary ? [{ label: 'Class', value: '★ Legendary' }] : []),
                ...(species.is_mythical ? [{ label: 'Class', value: '✦ Mythical' }] : []),
              ] : []),
            ].map(item => (
              <div key={item.label} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '0.4rem 0.6rem',
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.65em' }}>{item.label}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.8em', fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        <Section title="Base Stats">
          <StatList stats={pokemon.stats} />
        </Section>

        <Section title="Abilities">
          <AbilityList abilities={pokemon.abilities} />
        </Section>
      </div>

      {/* Moves */}
      <Section title={`Moves (${pokemon.moves.length})`}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35rem',
          maxHeight: 180,
          overflowY: 'auto',
        }}>
          {pokemon.moves.map(m => (
            <span
              key={m.move.name}
              style={{
                padding: '0.2rem 0.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.7em',
                textTransform: 'capitalize',
              }}
            >
              {m.move.name.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </Section>

      {/* Evolution chain */}
      {evoChain && (
        <Section title="Evolution Chain">
          <EvolutionChainDisplay chain={evoChain.chain} />
        </Section>
      )}
    </div>
  );
}
