const BASE_URL = 'https://pokeapi.co/api/v2';

export async function apiFetch<T>(url: string): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const res = await fetch(fullUrl);
  if (!res.ok) {
    throw new Error(`PokeAPI error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
