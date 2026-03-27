import { useQuery } from '@tanstack/react-query';
import { fetchPokemonSpecies } from '../api/pokemon';

export function usePokemonSpecies(nameOrId: string | number | undefined) {
  return useQuery({
    queryKey: ['pokemon-species', nameOrId],
    queryFn: () => fetchPokemonSpecies(nameOrId!),
    enabled: !!nameOrId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}
