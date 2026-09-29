import { useMemo, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';
import PokemonListRow from '../components/PokemonListRow';
import LoadingSpinner from '../components/LoadingSpinner';
import type { SortKey, SortOrder } from '../types/pokemon';
import styles from './ListPage.module.css';

export default function ListPage() {
  const { pokemon, loading, error } = usePokemon();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const visible = useMemo(() => {
    const filtered = pokemon.filter((p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }
      return (aVal as number) - (bVal as number);
    });

    if (sortOrder === 'desc') sorted.reverse();
    return sorted;
  }, [pokemon, query, sortKey, sortOrder]);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Pokemon List</h1>

      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search Pokemon by name..." />
        <SortControls
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortKeyChange={setSortKey}
          onSortOrderChange={setSortOrder}
        />
      </div>

      {loading && <LoadingSpinner label="Loading Pokemon..." />}
      {error && <p className={styles.status}>{error}</p>}
      {!loading && !error && visible.length === 0 && (
        <p className={styles.status}>No Pokemon match your search.</p>
      )}

      <div className={styles.list}>
        {visible.map((p) => (
          <PokemonListRow key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}
