import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';
import TypeBadge from '../components/TypeBadge';
import { getStatWidthClass } from '../utils/statBar';
import styles from './DetailPage.module.css';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemon();

  const currentIndex = useMemo(
    () => pokemon.findIndex((p) => p.id === Number(id)),
    [pokemon, id],
  );
  const current = currentIndex >= 0 ? pokemon[currentIndex] : undefined;

  if (loading) return <p className={styles.status}>Loading Pokemon...</p>;
  if (error) return <p className={styles.status}>{error}</p>;
  if (!current) return <p className={styles.status}>Pokemon not found.</p>;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < pokemon.length - 1;
  const image =
    current.sprites.other?.['official-artwork']?.front_default ?? current.sprites.front_default;

  function goTo(offset: number) {
    const target = pokemon[currentIndex + offset];
    if (target) navigate(`/pokemon/${target.id}`);
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        &larr; Back to list
      </Link>

      <div className={styles.card}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(-1)}
          disabled={!hasPrev}
          aria-label="Previous Pokemon"
        >
          &#8592;
        </button>

        <div className={styles.content}>
          {image && <img className={styles.image} src={image} alt={current.name} />}
          <h1 className={styles.name}>
            #{String(current.id).padStart(3, '0')} {current.name}
          </h1>

          <div className={styles.types}>
            {current.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Height</span>
              <span className={styles.statValue}>{current.height / 10} m</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Weight</span>
              <span className={styles.statValue}>{current.weight / 10} kg</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Base Experience</span>
              <span className={styles.statValue}>{current.base_experience}</span>
            </div>
          </div>

          <h2 className={styles.subheading}>Abilities</h2>
          <ul className={styles.abilityList}>
            {current.abilities.map((a) => (
              <li key={a.ability.name}>
                {a.ability.name}
                {a.is_hidden ? ' (hidden)' : ''}
              </li>
            ))}
          </ul>

          <h2 className={styles.subheading}>Base Stats</h2>
          <div className={styles.statsList}>
            {current.stats.map((s) => (
              <div key={s.stat.name} className={styles.statRow}>
                <span className={styles.statName}>{s.stat.name}</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles[getStatWidthClass(s.base_stat)]}`} />
                </div>
                <span className={styles.statNumber}>{s.base_stat}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(1)}
          disabled={!hasNext}
          aria-label="Next Pokemon"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
