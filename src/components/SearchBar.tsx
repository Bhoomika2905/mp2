import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <input
      type="text"
      className={styles.searchInput}
      value={value}
      placeholder={placeholder ?? 'Search...'}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search"
    />
  );
}
