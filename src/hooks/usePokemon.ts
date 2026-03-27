import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from '../api/pokemon';

export function usePokemon(nameOrId: string | number | undefined) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId!),
    enabled: !!nameOrId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}
