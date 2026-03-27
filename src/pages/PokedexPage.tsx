import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonType, fetchAllPokemonNames } from '../api/pokemon';
import { PokemonCard } from '../components/pokemon/PokemonCard';
import { SearchInput } from '../components/ui/SearchInput';
import { TypeFilter } from '../components/ui/TypeFilter';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import type { NamedAPIResource } from '../api/types';

const PAGE_SIZE = 24;

export function PokedexPage() {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite query for the default grid (no filter/search)
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: loadingInfinite,
    isError: errorInfinite,
    refetch: refetchInfinite,
  } = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length * PAGE_SIZE : undefined,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  // All names for search
  const { data: allNamesData } = useQuery({
    queryKey: ['all-pokemon-names'],
    queryFn: fetchAllPokemonNames,
    staleTime: 60 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
  });

  // Type queries (only when types are selected)
  const typeQueries = selectedTypes.map(type =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ['type', type],
      queryFn: () => fetchPokemonType(type),
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    })
  );

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Derive displayed pokemon
  const isFiltering = search.length > 0 || selectedTypes.length > 0;

  let displayedPokemon: NamedAPIResource[] = [];

  if (!isFiltering) {
    displayedPokemon = infiniteData?.pages.flatMap(p => p.results) ?? [];
  } else {
    let base: NamedAPIResource[] = allNamesData?.results ?? [];

    // Filter by type (union of selected types)
    if (selectedTypes.length > 0) {
      const typeLoadedAll = typeQueries.every(q => q.isSuccess);
      if (typeLoadedAll) {
        const typeSets = typeQueries.map(q =>
          new Set(q.data!.pokemon.map(tp => tp.pokemon.name))
        );
        base = base.filter(p => typeSets.some(s => s.has(p.name)));
      } else {
        base = []; // still loading type data
      }
    }

    // Filter by search
    if (search) {
      base = base.filter(p => p.name.includes(search));
    }

    displayedPokemon = base;
  }

  const loadingTypes = typeQueries.some(q => q.isLoading);

  if (loadingInfinite) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (errorInfinite) {
    return <ErrorMessage message="Failed to load Pokémon." onRetry={refetchInfinite} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Filters */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1rem',
        background: 'var(--bg-secondary)',
        border: '2px solid var(--border-color)',
      }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search Pokémon by name..." />
        <TypeFilter selected={selectedTypes} onChange={setSelectedTypes} />
      </div>

      {/* Count */}
      <div style={{ color: 'var(--text-muted)', fontSize: '0.75em' }}>
        {isFiltering
          ? `${displayedPokemon.length} result${displayedPokemon.length !== 1 ? 's' : ''}`
          : `${infiniteData?.pages[0]?.count ?? 0} total`
        }
      </div>

      {/* Grid */}
      {loadingTypes ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <LoadingSpinner size={40} />
        </div>
      ) : displayedPokemon.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontSize: '0.85em' }}>
          No Pokémon found.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '0.75rem',
        }}>
          {displayedPokemon.map(p => (
            <PokemonCard key={p.name} pokemon={p} />
          ))}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      {!isFiltering && (
        <div ref={sentinelRef} style={{ height: 48, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isFetchingNextPage && <LoadingSpinner size={32} />}
        </div>
      )}
    </div>
  );
}
