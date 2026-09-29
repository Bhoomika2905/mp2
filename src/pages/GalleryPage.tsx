import { useMemo, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import TypeFilter from '../components/TypeFilter';
import PokemonGalleryCard from '../components/PokemonGalleryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './GalleryPage.module.css';

export default function GalleryPage() {
  const { pokemon, loading, error } = usePokemon();
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    pokemon.forEach((p) => p.types.forEach((t) => types.add(t.type.name)));
    return Array.from(types).sort();
  }, [pokemon]);

  const visible = useMemo(() => {
    if (selectedTypes.size === 0) return pokemon;
    return pokemon.filter((p) => p.types.some((t) => selectedTypes.has(t.type.name)));
  }, [pokemon, selectedTypes]);

  function toggleType(type: string) {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Pokemon Gallery</h1>

      <div className={styles.toolbar}>
        <TypeFilter allTypes={allTypes} selectedTypes={selectedTypes} onToggle={toggleType} />
      </div>

      {loading && <LoadingSpinner label="Loading Pokemon..." />}
      {error && <p className={styles.status}>{error}</p>}
      {!loading && !error && visible.length === 0 && (
        <p className={styles.status}>No Pokemon match the selected filters.</p>
      )}

      <div className={styles.grid}>
        {visible.map((p) => (
          <PokemonGalleryCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}
