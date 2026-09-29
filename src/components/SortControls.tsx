import type { SortKey, SortOrder } from '../types/pokemon';
import styles from './SortControls.module.css';

interface SortOption {
  key: SortKey;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { key: 'id', label: 'National No.' },
  { key: 'name', label: 'Name' },
  { key: 'height', label: 'Height' },
  { key: 'weight', label: 'Weight' },
  { key: 'base_experience', label: 'Base Experience' },
];

interface SortControlsProps {
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortKeyChange: (key: SortKey) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

export default function SortControls({
  sortKey,
  sortOrder,
  onSortKeyChange,
  onSortOrderChange,
}: SortControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.label}>
        Sort by
        <select
          className={styles.select}
          value={sortKey}
          onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        Order
        <select
          className={styles.select}
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}
