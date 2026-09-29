import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <nav className={styles.navbar}>
      <span className={styles.brand}>
        <img src={`${import.meta.env.BASE_URL}pokeball.svg`} alt="" className={styles.logo} />
        PokeDex Explorer
      </span>
      <div className={styles.links}>
        <NavLink to="/" end className={linkClass}>
          List
        </NavLink>
        <NavLink to="/gallery" className={linkClass}>
          Gallery
        </NavLink>
      </div>
    </nav>
  );
}
