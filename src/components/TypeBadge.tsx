import styles from './TypeBadge.module.css';

interface TypeBadgeProps {
  type: string;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
  const colorClass = styles[type] ?? styles.unknown;
  return <span className={`${styles.badge} ${colorClass}`}>{type}</span>;
}
