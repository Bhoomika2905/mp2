import { useNavigate } from 'react-router-dom';
import type { PokemonDetail } from '../types/pokemon';
import TypeBadge from './TypeBadge';
import styles from './PokemonGalleryCard.module.css';

interface PokemonGalleryCardProps {
  pokemon: PokemonDetail;
}

export default function PokemonGalleryCard({ pokemon }: PokemonGalleryCardProps) {
  const navigate = useNavigate();
  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ?? pokemon.sprites.front_default;

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/pokemon/${pokemon.id}`);
      }}
    >
      {image && <img className={styles.image} src={image} alt={pokemon.name} loading="lazy" />}
      <span className={styles.name}>{pokemon.name}</span>
      <div className={styles.types}>
        {pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>
    </div>
  );
}
