import { useQuery } from '@tanstack/react-query';
import { fetchEvolutionChain } from '../api/pokemon';

export function useEvolutionChain(url: string | undefined) {
  return useQuery({
    queryKey: ['evolution-chain', url],
    queryFn: () => fetchEvolutionChain(url!),
    enabled: !!url,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}
