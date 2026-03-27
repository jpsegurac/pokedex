import { useQuery } from '@tanstack/react-query';
import { fetchPokemonType } from '../api/pokemon';

export function usePokemonType(typeName: string | null) {
  return useQuery({
    queryKey: ['type', typeName],
    queryFn: () => fetchPokemonType(typeName!),
    enabled: !!typeName,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
