import { useQuery } from '@tanstack/react-query';
import { fetchAllPokemonNames } from '../api/pokemon';

export function useAllPokemonNames() {
  return useQuery({
    queryKey: ['all-pokemon-names'],
    queryFn: fetchAllPokemonNames,
    staleTime: 60 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
  });
}
