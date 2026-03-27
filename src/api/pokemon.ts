import { apiFetch } from './client';
import type {
  PokemonListResponse,
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  PokemonTypeDetail,
} from './types';

export function fetchPokemonList(offset: number, limit = 20): Promise<PokemonListResponse> {
  return apiFetch<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`);
}

export function fetchPokemon(nameOrId: string | number): Promise<Pokemon> {
  return apiFetch<Pokemon>(`/pokemon/${nameOrId}`);
}

export function fetchPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
  return apiFetch<PokemonSpecies>(`/pokemon-species/${nameOrId}`);
}

export function fetchEvolutionChain(url: string): Promise<EvolutionChain> {
  return apiFetch<EvolutionChain>(url);
}

export function fetchPokemonType(typeName: string): Promise<PokemonTypeDetail> {
  return apiFetch<PokemonTypeDetail>(`/type/${typeName}`);
}

export function fetchAllPokemonNames(): Promise<PokemonListResponse> {
  return apiFetch<PokemonListResponse>('/pokemon?limit=1025&offset=0');
}
