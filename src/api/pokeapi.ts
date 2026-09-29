import axios from 'axios';
import type { PokemonDetail, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Gen 1 only (151 Pokemon) to keep request count / rate-limit risk low.
export const POKEMON_COUNT = 151;

const CACHE_KEY = 'mp2-pokemon-cache-v1';

const client = axios.create({ baseURL: BASE_URL });

function readCache(): PokemonDetail[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PokemonDetail[];
  } catch {
    return null;
  }
}

function writeCache(data: PokemonDetail[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage full or unavailable; ignore, caching is best-effort
  }
}

export async function fetchAllPokemon(): Promise<PokemonDetail[]> {
  const cached = readCache();
  if (cached && cached.length === POKEMON_COUNT) {
    return cached;
  }

  const listRes = await client.get<PokemonListResponse>('/pokemon', {
    params: { limit: POKEMON_COUNT, offset: 0 },
  });

  const details = await Promise.all(
    listRes.data.results.map(async (entry) => {
      const res = await client.get<PokemonDetail>(entry.url);
      return res.data;
    }),
  );

  details.sort((a, b) => a.id - b.id);
  writeCache(details);
  return details;
}
