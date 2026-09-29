import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner({ label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
