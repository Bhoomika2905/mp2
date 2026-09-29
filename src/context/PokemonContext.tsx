import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { fetchAllPokemon } from '../api/pokeapi';
import type { PokemonDetail } from '../types/pokemon';

interface PokemonContextValue {
  pokemon: PokemonDetail[];
  loading: boolean;
  error: string | null;
}

const PokemonContext = createContext<PokemonContextValue>({
  pokemon: [],
  loading: true,
  error: null,
});

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemon, setPokemon] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchAllPokemon()
      .then((data) => {
        if (!cancelled) setPokemon(data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load Pokemon data. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, loading, error }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
