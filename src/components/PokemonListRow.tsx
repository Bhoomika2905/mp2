import { useNavigate } from 'react-router-dom';
import type { PokemonDetail } from '../types/pokemon';
import TypeBadge from './TypeBadge';
import styles from './PokemonListRow.module.css';

interface PokemonListRowProps {
  pokemon: PokemonDetail;
}

export default function PokemonListRow({ pokemon }: PokemonListRowProps) {
  const navigate = useNavigate();
  const sprite = pokemon.sprites.front_default;

  return (
    <div
      className={styles.row}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/pokemon/${pokemon.id}`);
      }}
    >
      {sprite && <img className={styles.sprite} src={sprite} alt={pokemon.name} />}
      <span className={styles.number}>#{String(pokemon.id).padStart(3, '0')}</span>
      <span className={styles.name}>{pokemon.name}</span>
      <div className={styles.types}>
        {pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>
    </div>
  );
}
