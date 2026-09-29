import TypeBadge from './TypeBadge';
import styles from './TypeFilter.module.css';

interface TypeFilterProps {
  allTypes: string[];
  selectedTypes: Set<string>;
  onToggle: (type: string) => void;
}

export default function TypeFilter({ allTypes, selectedTypes, onToggle }: TypeFilterProps) {
  return (
    <div className={styles.filterList}>
      {allTypes.map((type) => {
        const isSelected = selectedTypes.has(type);
        return (
          <button
            key={type}
            type="button"
            className={isSelected ? `${styles.chip} ${styles.chipSelected}` : styles.chip}
            onClick={() => onToggle(type)}
            aria-pressed={isSelected}
          >
            <TypeBadge type={type} />
          </button>
        );
      })}
    </div>
  );
}
